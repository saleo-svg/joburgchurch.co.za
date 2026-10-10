"""Reconstruct 80 drafts from .md files (v2 with proper anchor)."""
import re
import json
from pathlib import Path

SRC = Path(r"C:\Users\Laptop\Desktop\Church-Site")
POSTS_DIR = SRC / "src" / "content" / "posts"
SLUG_ASTRO = SRC / "src" / "pages" / "blog" / "[slug].astro"
SITEMAP = SRC / "src" / "pages" / "sitemap.xml.ts"

md_files = sorted(POSTS_DIR.glob("*.md"))
print(f"Total .md files: {len(md_files)}")

DRAFT_SLUGS = []
DRAFT_DATA = {}

for md_path in md_files:
    text = md_path.read_text(encoding="utf-8")
    m = re.match(r"^---\n(.*?)\n---\n", text, re.DOTALL)
    if not m:
        continue
    fm = m.group(1)
    if "date: 2026-10-10" not in fm:
        continue
    if "status: draft" not in fm:
        continue
    slug = md_path.stem
    title_m = re.search(r'title: "(.*?)"', fm)
    excerpt_m = re.search(r'description: "(.*?)"', fm, re.DOTALL)
    tags_m = re.search(r'tags: \[(.*?)\]', fm, re.DOTALL)
    hero_m = re.search(r'heroImage: "(.*?)"', fm)
    if not (title_m and excerpt_m and tags_m and hero_m):
        continue
    title = title_m.group(1)
    excerpt = excerpt_m.group(1)
    tags = [t.strip().strip('"') for t in tags_m.group(1).split(",")]
    hero = hero_m.group(1)
    DRAFT_SLUGS.append(slug)
    DRAFT_DATA[slug] = {"title": title, "excerpt": excerpt, "tags": tags, "heroImage": hero}

print(f"80-batch drafts detected: {len(DRAFT_SLUGS)}")

# 1. Patch [slug].astro
astro_text = SLUG_ASTRO.read_text(encoding="utf-8")
all_slugs = set(DRAFT_SLUGS)

# Strip prior 80 entries (idempotent)
for slug in all_slugs:
    pattern = re.compile(
        r"\n  '" + re.escape(slug) + r"': \{[\s\S]*?\n  \},\n",
        re.MULTILINE
    )
    astro_text = pattern.sub("\n", astro_text, count=1)

# Strip prior 80 slugs from getStaticPaths
sp_open = "export function getStaticPaths() {\n  return [\n"
sp_close = "\n  ];\n}\n\nconst { slug } = Astro.params;"
if sp_open in astro_text and sp_close in astro_text:
    pre, post_block = astro_text.split(sp_open, 1)
    inner, post_close_block = post_block.split(sp_close, 1)
    keep_lines = []
    for line in inner.split("\n"):
        m = re.search(r"params: \{ slug: '([^']+)' \}", line)
        if m and m.group(1) in all_slugs:
            continue
        keep_lines.append(line)
    new_block_lines = keep_lines + [
        f"    {{ params: {{ slug: '{s}' }} }},"
        for s in DRAFT_SLUGS
    ]
    new_inner = "\n".join(new_block_lines)
    astro_text = pre + sp_open + new_inner + sp_close + post_close_block
    print(f"  [SP] getStaticPaths: {len(DRAFT_SLUGS)} slugs (replaced)")

# Insert new posts dict entries
def tiny_entry(slug, data):
    title = data["title"].replace("'", "\\'")
    excerpt = data["excerpt"].replace("'", "\\'")
    tags_str = "', '".join(data["tags"])
    hero = data["heroImage"]
    return f"""  '{slug}': {{
    title: '{title}',
    date: '2026-10-10',
    excerpt: '{excerpt}',
    tags: ['{tags_str}'],
    heroImage: '{hero}',
    status: 'draft',
    content: '',
  }},
"""

dict_close = "\n};\n\nconst post = posts[slug];"
if dict_close not in astro_text:
    raise RuntimeError("dict close not found")

new_entries = "\n".join(tiny_entry(s, DRAFT_DATA[s]) for s in DRAFT_SLUGS)
astro_text = astro_text.replace(
    dict_close,
    "\n" + new_entries + "\n};\n\nconst post = posts[slug];",
    1
)
print(f"  [PD] Added {len(DRAFT_SLUGS)} entries")
SLUG_ASTRO.write_text(astro_text, encoding="utf-8")

# 2. Sitemap
sitemap_text = SITEMAP.read_text(encoding="utf-8")

# Strip any existing DRAFT- entries
sitemap_text = re.sub(
    r"\n    \{ url: '/blog/[^']+/', lastmod: 'DRAFT-2026-10-10' \},",
    "\n",
    sitemap_text
)
print(f"  [SM-STRIP] Removed existing DRAFT- entries")

# Find the anchor (last published blog entry) followed by "  ];" with
# any amount of whitespace in between.
anchor = "    { url: '/blog/small-church-vs-mega-church-south-africa-honest-reflection/', lastmod: '2026-10-05' },"
m = re.search(re.escape(anchor) + r"\s*?\n  \];", sitemap_text)
if m:
    new_lines = "\n".join(
        f"    {{ url: '/blog/{s}/', lastmod: 'DRAFT-2026-10-10' }},"
        for s in DRAFT_SLUGS
    )
    sitemap_text = sitemap_text.replace(
        m.group(0),
        anchor + "\n" + new_lines + "\n  ];",
        1
    )
    print(f"  [SM] Added {len(DRAFT_SLUGS)} DRAFT URLs")
else:
    print(f"  [SM] WARNING: anchor not found")

SITEMAP.write_text(sitemap_text, encoding="utf-8")

# 3. Manifest
manifest = {
    s: {
        "title": DRAFT_DATA[s]["title"],
        "date": "2026-10-10",
        "excerpt": DRAFT_DATA[s]["excerpt"],
        "tags": DRAFT_DATA[s]["tags"],
        "heroImage": DRAFT_DATA[s]["heroImage"],
        "status": "draft",
    }
    for s in DRAFT_SLUGS
}
manifest_path = POSTS_DIR / "_drafts-80.json"
manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8")
print(f"  [MAN] Wrote {manifest_path}")

print(f"\nDone — {len(DRAFT_SLUGS)} drafts reconstructed.")
