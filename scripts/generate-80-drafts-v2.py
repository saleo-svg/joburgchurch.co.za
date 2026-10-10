"""Generate 80 draft posts (lightweight version).
The actual content is in src/content/posts/<slug>.md, loaded at
build time by [slug].astro. The posts dict entry only carries
metadata + a tiny status flag.
"""
import re
from pathlib import Path

SRC = Path(r"C:\Users\Laptop\Desktop\Church-Site")
POSTS_DIR = SRC / "src" / "content" / "posts"
SLUG_ASTRO = SRC / "src" / "pages" / "blog" / "[slug].astro"
SITEMAP = SRC / "src" / "pages" / "sitemap.xml.ts"

HERO_IMAGES = [
    '/images/posts/heritage-day-braai.jpg',
    '/images/posts/jozi-young-professional.jpg',
    '/images/posts/load-shedding-candlelight.jpg',
    '/images/posts/multilingual-worship.jpg',
    '/images/posts/township-bible-study.jpg',
    '/images/posts/ubuntu-south-africa.jpg',
]

# Common scripture pool
SCRIPTURES = {
    "peace": "**Philippians 4:6-7** — *\"Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.\"*",
    "grace": "**2 Corinthians 12:9** — *\"My grace is sufficient for you, for my power is made perfect in weakness.\"*",
    "perseverance": "**Romans 5:3-4** — *\"Not only so, but we also glory in our sufferings, because we know that suffering produces perseverance; perseverance, character; and character, hope.\"*",
    "love": "**1 Corinthians 13:4-7** — *\"Love is patient, love is kind. It does not envy, it does not boast, it is not proud.\"*",
    "forgiveness": "**Colossians 3:13** — *\"Bear with each other and forgive one another if any of you has a grievance against someone. Forgive as the Lord forgave you.\"*",
    "contentment": "**Philippians 4:11-12** — *\"I have learned to be content whatever the circumstances.\"*",
    "creation": "**Genesis 1:31** — *\"God saw all that he had made, and it was very good.\"*",
    "humility": "**James 4:6** — *\"God opposes the proud but shows favour to the humble.\"*",
    "patience": "**Galatians 5:22-23** — *\"But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.\"*",
    "providence": "**Matthew 6:26** — *\"Look at the birds of the air; they do not sow or reap or store away in barns, and yet your heavenly Father feeds them.\"*",
    "kindness": "**Psalm 136:1** — *\"Give thanks to the Lord, because he is good. His love endures forever.\"*",
    "faith": "**Hebrews 11:1** — *\"Now faith is confidence in what we hope for and assurance about what we do not see.\"*",
    "serve": "**Mark 10:45** — *\"For even the Son of Man did not come to be served, but to serve, and to give his life as a ransom for many.\"*",
    "stewardship": "**1 Peter 4:10** — *\"Each of you should use whatever gift you have received to serve others, as faithful stewards of God's grace in its various forms.\"*",
    "grief": "**1 Thessalonians 4:13** — *\"Brothers and sisters, we do not want you to be uninformed about those who sleep in death.\"*",
    "prayer": "**Jeremiah 29:12-13** — *\"Then you will call on me and come and pray to me, and I will listen to you.\"*",
    "wisdom": "**James 1:5** — *\"If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault.\"*",
    "hope": "**Romans 15:13** — *\"May the God of hope fill you with all joy and peace as you trust in him.\"*",
    "children": "**Proverbs 22:6** — *\"Start children off on the way they should go, and even when they are old they will not turn from it.\"*",
    "marriage": "**Ephesians 5:33** — *\"Each of you also must love his wife as he loves himself.\"*",
    "elderly": "**Psalm 92:12-14** — *\"The righteous will flourish like a palm tree.\"*",
    "sin": "**1 John 1:9** — *\"If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.\"*",
    "salvation": "**Romans 10:9** — *\"If you declare with your mouth, 'Jesus is Lord,' and believe in your heart that God raised him from the dead, you will be saved.\"*",
    "community": "**Acts 2:42-47** — *\"They devoted themselves to the apostles' teaching and to fellowship, to the breaking of bread and to prayer.\"*",
    "temptation": "**1 Corinthians 10:13** — *\"No temptation has overtaken you except what is common to mankind. And God is faithful; he will not let you be tempted beyond what you can bear.\"*",
    "healing": "**James 5:14-15** — *\"Is anyone among you sick? Let them call the elders of the church to pray over them.\"*",
    "joy": "**Nehemiah 8:10** — *\"Do not grieve, for the joy of the Lord is your strength.\"*",
    "honesty": "**Proverbs 12:22** — *\"The Lord detests lying lips, but he delights in people who are trustworthy.\"*",
    "generosity": "**2 Corinthians 9:6-7** — *\"Whoever sows sparingly will also reap sparingly, and whoever sows generously will also reap generously.\"*",
    "authority": "**Romans 13:1** — *\"Let everyone be subject to the governing authorities, for there is no authority except that which God has established.\"*",
    "gratitude": "**1 Thessalonians 5:18** — *\"Give thanks in all circumstances; for this is God's will for you in Christ Jesus.\"*",
    "discernment": "**Romans 12:2** — *\"Do not conform to the pattern of this world, but be transformed by the renewing of your mind.\"*",
    "comfort": "**Isaiah 49:13** — *\"Shout for joy, you heavens; rejoice, you earth; for the Lord comforts his people.\"*",
    "protection": "**Psalm 91:1-2** — *\"Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty.\"*",
    "witness": "**1 Peter 3:15** — *\"Always be prepared to give an answer to everyone who asks you to give the reason for the hope that you have.\"*",
    "light": "**John 8:12** — *\"I am the light of the world. Whoever follows me will never walk in darkness.\"*",
    "justice": "**Micah 6:8** — *\"He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.\"*",
    "lament": "**Psalm 34:18** — *\"The Lord is close to the brokenhearted and saves those who are crushed in spirit.\"*",
    "humility_serve": "**Philippians 2:3-4** — *\"Do nothing out of selfish ambition or vain conceit.\"*",
    "strength": "**Isaiah 40:31** — *\"But those who hope in the Lord will renew their strength.\"*",
    "fairness": "**Colossians 4:1** — *\"Masters, provide your slaves with what is right and fair.\"*",
    "witness2": "**Acts 1:8** — *\"You will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth.\"*",
    "shepherd": "**John 10:11** — *\"I am the good shepherd. The good shepherd lays down his life for the sheep.\"*",
}

FOOTER_CTA = (
    "*Johannesburg Bible Study Church meets online every Wednesday at 7:30pm "
    "for a Bible study that is intentionally local and biblically grounded. "
    "The Bible study is free, open to anyone, and free to join or to leave. "
    "Call Mr. Sim on +27 77 487 1295 or Ms. Dora on +27 67 442 4461.*"
)

# Load the 80 articles from the legacy file. We delegate the data
# extraction to the legacy module via direct exec.
import sys
sys.path.insert(0, str(SRC / "scripts"))
# Inline the data: import the legacy module by file path through
# importlib with a non-conflicting module name.
import importlib.util as _ilu
_LEG = "generate_80_data_legacy"
spec = _ilu.spec_from_file_location(_LEG, SRC / "scripts" / "generate-80-drafts-data.py")
if spec is None or spec.loader is None:
    # Fallback: try the original file
    spec = _ilu.spec_from_file_location(_LEG, SRC / "scripts" / "generate-80-drafts.py")
data_mod = _ilu.module_from_spec(spec)
spec.loader.exec_module(data_mod)

ALL = data_mod.BATCH1 + data_mod.BATCH2 + data_mod.BATCH3 + data_mod.BATCH4 + data_mod.BATCH5

print(f"Total: {len(ALL)}")

# 1. Markdown files (always)
for i, a in enumerate(ALL):
    md_path = POSTS_DIR / f"{a['slug']}.md"
    md_path.write_text(data_mod.build_markdown(a, i), encoding="utf-8")
print(f"  [MD] {len(ALL)} files written")

# 2. Build a tiny entry
def tiny_entry(article, index):
    slug = article["slug"]
    title = article["title"].replace("'", "\\'")
    excerpt = article["excerpt"].replace("'", "\\'")
    tags_str = "', '".join(article["tags"])
    hero = HERO_IMAGES[index % len(HERO_IMAGES)]
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

# 3. Patch [slug].astro
astro_text = SLUG_ASTRO.read_text(encoding="utf-8")
all_slugs = {a["slug"] for a in ALL}

# Strip any previous 80 entries (idempotent)
for slug in all_slugs:
    pattern = re.compile(
        r"\n  '" + re.escape(slug) + r"': \{[\s\S]*?\n  \},\n",
        re.MULTILINE
    )
    astro_text = pattern.sub("\n", astro_text, count=1)
print(f"  [STRIP] Stripped any prior 80-draft entries")

# Strip any prior 80 slugs from getStaticPaths (idempotent)
sp_open = "export function getStaticPaths() {\n  return [\n"
sp_close = "\n  ];\n}\n\nconst post = posts[slug];"
if sp_open in astro_text and sp_close in astro_text:
    pre, post_block = astro_text.split(sp_open, 1)
    inner, post_close_block = post_block.split(sp_close, 1)
    # Keep only slugs not in our 80
    keep_lines = []
    for line in inner.split("\n"):
        m = re.search(r"params: \{ slug: '([^']+)' \}", line)
        if m and m.group(1) in all_slugs:
            continue
        keep_lines.append(line)
    # Now add our 80
    new_block_lines = keep_lines + [
        f"    {{ params: {{ slug: '{a['slug']}' }} }},"
        for a in ALL
    ]
    new_inner = "\n".join(new_block_lines)
    astro_text = pre + sp_open + new_inner + sp_close + post_close_block
    print(f"  [SP] getStaticPaths: {len(ALL)} slugs (replaced existing)")

# Insert new posts dict entries just before the dict close
dict_close = "\n};\n\nconst post = posts[slug];"
if dict_close not in astro_text:
    raise RuntimeError("dict close not found")

new_entries = "\n".join(tiny_entry(a, i) for i, a in enumerate(ALL))
astro_text = astro_text.replace(
    dict_close,
    "\n" + new_entries + "\n};\n\nconst post = posts[slug];",
    1
)
print(f"  [PD] Added {len(ALL)} minimal entries")

SLUG_ASTRO.write_text(astro_text, encoding="utf-8")

# 4. Sitemap
sitemap_text = SITEMAP.read_text(encoding="utf-8")
sitemap_text = re.sub(
    r"\n    \{ url: '/blog/[^']+/', lastmod: 'DRAFT-2026-10-10' \},",
    "\n",
    sitemap_text
)
print(f"  [SM-STRIP] Removed existing DRAFT- entries")

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

SITEMAP.write_text(sitemap_text, encoding="utf-8")

print("\nDone — 80 drafts (tiny entries, content from markdown files).")
