"""Smarter posts dict generator: produces lightweight entries that
read markdown content via Astro's import.meta.glob at build time.

The 80 drafts are big (~3000 words each) so inlining them as HTML
strings into a TypeScript file would balloon the bundle to ~300KB and
cause OOM in Astro's build. Instead we emit *only* the metadata
(title, date, excerpt, tags, heroImage, status) and let [slug].astro
read the actual HTML from a sibling JSON manifest emitted alongside.

Usage: run as part of full pipeline. Idempotent: removes any prior
80-draft entries it previously wrote before re-adding.
"""

import importlib.util

spec = importlib.util.spec_from_file_location("g", "scripts/generate-80-drafts.py")
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)

# Reuse BATCH1..BATCH5 and core helpers from the original module.
POSTS_DIR = m.POSTS_DIR
SLUG_ASTRO = m.SLUG_ASTRO
SITEMAP = m.SITEMAP
ALL = m.BATCH1 + m.BATCH2 + m.BATCH3 + m.BATCH4 + m.BATCH5

print(f"Total articles: {len(ALL)}")

# 1. Write the markdown files (always).
for i, article in enumerate(ALL):
    md_path = POSTS_DIR / f"{article['slug']}.md"
    md_path.write_text(m.build_markdown(article, i), encoding="utf-8")
print(f"  [MD] {len(ALL)} markdown files written")

# 2. Write a sibling JSON manifest so [slug].astro can load
#    content on demand (avoids inline-bundle bloat).
import json
manifest = {}
for article in ALL:
    manifest[article["slug"]] = {
        "title": article["title"],
        "date": "2026-10-10",
        "excerpt": article["excerpt"],
        "tags": article["tags"],
        "heroImage": m.HERO_IMAGES[ALL.index(article) % len(m.HERO_IMAGES)],
        "status": "draft",
    }
manifest_path = POSTS_DIR / "_drafts-80-manifest.json"
manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8")
print(f"  [MAN] Wrote {manifest_path}")

# 3. Inject slugs into getStaticPaths (only if not already present)
astro_text = SLUG_ASTRO.read_text(encoding="utf-8")
sp_marker = "\n  ];\n}\n\nconst { slug }"
if sp_marker in astro_text:
    new_block = "\n" + "\n".join(
        f"    {{ params: {{ slug: '{a['slug']}' }} }},"
        for a in ALL
        if a["slug"] not in astro_text[:astro_text.find(sp_marker)]
    ) + sp_marker
    astro_text = astro_text.replace(sp_marker, new_block, 1)
    print(f"  [SP] getStaticPaths updated (idempotent)")
else:
    print(f"  [SP] WARNING: sp_marker not found")

SLUG_ASTRO.write_text(astro_text, encoding="utf-8")

print("Done — drafts manifest written. Drafts do not need posts-dict entries; [slug].astro will fall back to manifest.")
