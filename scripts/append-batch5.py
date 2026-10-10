"""Append BATCH5 (12 articles) to existing setup (68 already generated)."""
import sys, importlib.util
spec = importlib.util.spec_from_file_location("g", "scripts/generate-80-drafts.py")
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)

BATCH5 = m.BATCH5
total = len(BATCH5)
print(f"Appending BATCH5: {total} articles")

POSTS_DIR = m.POSTS_DIR
SLUG_ASTRO = m.SLUG_ASTRO
SITEMAP = m.SITEMAP

# Read astro
astro_text = SLUG_ASTRO.read_text(encoding="utf-8")

# 1. Write 12 markdown files
for i, article in enumerate(BATCH5):
    slug = article["slug"]
    md_path = POSTS_DIR / f"{slug}.md"
    content = m.build_markdown(article, i + 68)  # continue hero image rotation
    md_path.write_text(content, encoding="utf-8")
    print(f"  [MD] {slug}.md")

# 2. Inject into getStaticPaths
sp_match = m.re.search(r"(\n  \];\n\}\n\nconst \{ slug \})", astro_text)
if sp_match:
    new_block = "\n" + "\n".join(
        f"    {{ params: {{ slug: '{a['slug']}' }} }},"
        for a in BATCH5
    ) + "\n  ];\n}\n\nconst { slug }"
    astro_text = astro_text.replace(sp_match.group(1), new_block, 1)
    print(f"  [SP] Added {total} slugs")
else:
    print("  [SP] WARNING: getStaticPaths not found")

# 3. Inject into posts dict
marker_close = "\n  },\n};"
if marker_close not in astro_text:
    raise RuntimeError("posts dict marker not found")

new_entries = "\n".join(m.build_posts_entry(a, i + 68) for i, a in enumerate(BATCH5))
astro_text = astro_text.replace(marker_close, "\n  },\n\n" + new_entries + "\n};", 1)
print(f"  [PD] Added {total} entries")
SLUG_ASTRO.write_text(astro_text, encoding="utf-8")

# 4. Sitemap
sitemap_text = SITEMAP.read_text(encoding="utf-8")
# Find the last DRAFT- entry to insert after
last_draft_line_pattern = m.re.compile(r"(\{ url: '/blog/[^']+/', lastmod: 'DRAFT-[^']+' \},\n)(  \];)")
# Find any DRAFT line
draft_lines = [l for l in sitemap_text.split("\n") if "DRAFT-" in l]
if draft_lines:
    last_draft = draft_lines[-1]
    new_lines = "\n".join(
        f"    {{ url: '/blog/{a['slug']}/', lastmod: 'DRAFT-2026-10-10' }},"
        for a in BATCH5
    )
    # Insert before "  ];" that follows the last DRAFT
    if "  ];" in sitemap_text:
        # Find position after last DRAFT line + before ];
        last_draft_idx = sitemap_text.rfind(last_draft)
        after_last_draft = last_draft_idx + len(last_draft)
        # Now find next "  ];" after that
        end_idx = sitemap_text.find("  ];", after_last_draft)
        sitemap_text = (
            sitemap_text[:end_idx]
            + new_lines
            + "\n  ];"
            + sitemap_text[end_idx + len("  ];"):]
        )
        print(f"  [SM] Added {total} URLs (DRAFT)")

SITEMAP.write_text(sitemap_text, encoding="utf-8")
print(f"\nDone — BATCH5 appended.")
