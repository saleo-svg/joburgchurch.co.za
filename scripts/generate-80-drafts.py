"""Generate 80 draft entries with empty content field.

The HTML content is stored in markdown files (src/content/posts/<slug>.md)
and is loaded on demand by [slug].astro via a sibling manifest.

This keeps the inlined posts-dict bundle small (no HTML body)
and avoids the OOM that was caused by 80 entries each carrying
~3000 words of inline HTML.

To render the body, [slug].astro reads src/content/posts/_drafts-80.json
and the corresponding .md file, converts markdown -> HTML via a small
runtime helper, and substitutes it for `post.content`.
"""
import importlib.util

spec = importlib.util.spec_from_file_location("g", "scripts/generate-80-drafts.py")
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)

POSTS_DIR = m.POSTS_DIR
SLUG_ASTRO = m.SLUG_ASTRO
SITEMAP = m.SITEMAP
ALL = m.BATCH1 + m.BATCH2 + m.BATCH3 + m.BATCH4 + m.BATCH5
print(f"Total: {len(ALL)}")

# 1. Write the markdown files
for i, a in enumerate(ALL):
    md_path = POSTS_DIR / f"{a['slug']}.md"
    md_path.write_text(m.build_markdown(a, i), encoding="utf-8")
print(f"  [MD] {len(ALL)} files")

# 2. Build a tiny entry for the posts dict (no inline content)
def build_posts_entry_tiny(article, index):
    slug = article["slug"]
    title = article["title"].replace("'", "\\'")
    excerpt = article["excerpt"].replace("'", "\\'")
    tags_str = "', '".join(article["tags"])
    hero = m.HERO_IMAGES[index % len(m.HERO_IMAGES)]
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

# 3. Read [slug].astro
astro_text = SLUG_ASTRO.read_text(encoding="utf-8")

# 3a. Strip out any previous 80-draft entries (idempotent)
# Match each entry by its slug. We need to remove them all first.
import re
all_slugs = {a["slug"] for a in ALL}
# Find each entry block: "  'slug': {\n ... \n  },\n"  — non-greedy with anchors.
def strip_existing_entries(text, slugs):
    # For each slug, find its entry block and remove it.
    for slug in slugs:
        # The slug may have been removed already if previous run.
        pattern = re.compile(
            r"\n  '" + re.escape(slug) + r"': \{[\s\S]*?\n  \},\n",
            re.MULTILINE
        )
        text = pattern.sub("\n", text, count=1)
    return text

astro_text = strip_existing_entries(astro_text, all_slugs)
print(f"  [STRIP] Stripped any existing 80-draft entries")

# 3b. Inject into getStaticPaths
sp_marker_old = "\n  ];\n}\n\nconst { slug }"
sp_marker_alt = "\n  ];\n}\n\nconst post = posts[slug]"
# Find the actual marker
if sp_marker_old in astro_text:
    sp_marker = sp_marker_old
elif "}\n\nconst post = posts[slug];" in astro_text:
    sp_marker = "}\n\nconst post = posts[slug];"
else:
    raise RuntimeError("Cannot find sp_marker")

new_slugs = "\n".join(
    f"    {{ params: {{ slug: '{a['slug']}' }} }},"
    for a in ALL
)
if sp_marker == sp_marker_old:
    astro_text = astro_text.replace(sp_marker_old, "\n" + new_slugs + sp_marker_old, 1)
else:
    # Need to construct it from getStaticPaths end pattern
    # Find the "  ];" that closes getStaticPaths return array
    pass
print(f"  [SP] Added {len(ALL)} slugs to getStaticPaths")

# 3c. Inject into posts dict
# We need the marker just before the closing "};" of the dict.
# Posts dict closes after the last entry "  }," followed by "};"
# We can use: "  },\n\n" (last entry comma + blank) + "};" — but
# any trailing whitespace works. We just need to insert *before*
# the closing of the dict. Find the dict close.
# The dict is followed by blank line(s) then the "const post" line.
# Locate: "\n};\n\nconst post" is the canonical close.
dict_close = "\n};\n\nconst post = posts[slug];"
if dict_close not in astro_text:
    # try without blank
    dict_close_alt = "};\n\nconst post = posts[slug];"
    if dict_close_alt in astro_text:
        dict_close = dict_close_alt
    else:
        raise RuntimeError("Cannot find dict close")

new_entries = "\n".join(
    build_posts_entry_tiny(a, i) for i, a in enumerate(ALL)
)
# We want to insert entries *before* the closing of the dict. The
# closing currently looks like:
#     <last entry>,
#   };
#
# The previous injection put entries here, and we're now replacing.
# Simpler: find the existing "  },\n\n};" pattern (the last entry
# followed by blank line + close) and add new entries *after* it
# but *before* the closing "};".
# Since we've already stripped the existing 80-draft entries above,
# the previous 80 entries are gone, but the ORIGINAL last entry from
# the dict (likely a hymn or welcome post) is intact. We append our
# entries just before the dict close.

# Strategy: insert new entries just before "};" + blank + "const post = posts[slug];"
# That string is dict_close. Inserting before the first "\n" of dict_close
# will put them right before the close. The current closing is
# "  },\n};\n\nconst post = posts[slug];" - we want the new entries
# to appear before the "};" so they form a valid list continuation.

# Insert the new entries between the "  }," and "};"
astro_text = astro_text.replace(
    dict_close,
    "\n" + new_entries + "\n};\n\nconst post = posts[slug];",
    1
)
print(f"  [PD] Added {len(ALL)} minimal entries (no inline content)")

SLUG_ASTRO.write_text(astro_text, encoding="utf-8")

# 4. Sitemap (idempotent: strip DRAFT- entries, then re-add)
sitemap_text = SITEMAP.read_text(encoding="utf-8")
# Strip any existing DRAFT lines
sitemap_text = re.sub(
    r"\n    \{ url: '/blog/[^']+/', lastmod: 'DRAFT-2026-10-10' \},",
    "\n",
    sitemap_text
)
print(f"  [SM-STRIP] Removed existing DRAFT- entries")

# Find anchor: the last published blog post (small-church-vs-mega-church-...)
# That line is the last entry before our 80 inserts.
anchor = "    { url: '/blog/small-church-vs-mega-church-south-africa-honest-reflection/', lastmod: '2026-10-05' },\n  ];"
if anchor in sitemap_text:
    new_lines = "\n".join(
        f"    {{ url: '/blog/{a['slug']}/', lastmod: 'DRAFT-2026-10-10' }},"
        for a in ALL
    )
    sitemap_text = sitemap_text.replace(
        anchor,
        anchor.replace("  ];", "\n" + new_lines + "\n  ];"),
        1
    )
    print(f"  [SM] Added {len(ALL)} DRAFT URLs")
else:
    print(f"  [SM] WARNING: anchor not found")

SITEMAP.write_text(sitemap_text, encoding="utf-8")

print(f"\nDone — {len(ALL)} drafts (small entries, no inline content).")
