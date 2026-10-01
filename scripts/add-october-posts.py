"""
Generate posts dictionary entries for blog/[slug].astro from markdown files.

Strategy: For each new markdown file, extract the body (after frontmatter),
convert it to an inline HTML string suitable for `<Fragment set:html={post.content}>`,
and inject it as a posts dictionary entry.

We follow the existing pattern of posts dict entries (which contain HTML content).
"""

from pathlib import Path
import re

SRC = Path(r"C:\Users\Laptop\Desktop\Church-Site")
POSTS_DIR = SRC / "src" / "content" / "posts"
SLUG_ASTRO = SRC / "src" / "pages" / "blog" / "[slug].astro"

NEW_POSTS = [
    # English SA-local posts
    {
        'slug': 'diwali-festival-south-africa-christian-neighbour',
        'title': "Diwali in South Africa: A Christian's Guide to Loving Hindu Neighbours Without Losing Your Faith",
        'date': '2026-10-01',
        'excerpt': "Diwali in Durban, Johannesburg and Cape Town is a five-day festival of lights that the Christian in South Africa is invited into — at the office Diwali party, at the children's school, on the street where the neighbours put up fairy lights. Here is what the Bible actually says about neighbouring across religions, and how the Sandton Bible study has begun to do it well.",
        'tags': ['Diwali', 'Hindu', 'neighbour', 'Sandton', 'Johannesburg', 'South Africa', 'interfaith', 'friendship', 'Bible study', 'love', 'evangelism', 'witness'],
        'language': 'en',
    },
    {
        'slug': 'johannesburg-water-crisis-faith-day-zero-memories',
        'title': "When the Taps Run Dry: A South African Christian's Reflection on the Water Crisis, Day Zero, and the God Who Holds the Rain",
        'date': '2026-10-01',
        'excerpt': "Day Zero in Cape Town was 2018. Johannesburg has had its own water crisis since 2022 — the reservoir levels, the Rand Water warnings, the hosepipe bans, the midnight pump schedules, the JoJo tanks on every driveway. Here is what the Bible actually says about water, about drought, and about the Christian who has to wash the dishes one day, and how the Sandton Bible study has begun to hold the Bible together in the crisis.",
        'tags': ['water crisis', 'Day Zero', 'Cape Town', 'Johannesburg', 'Sandton', 'South Africa', 'drought', 'Rand Water', 'Bible study', 'stewardship', 'creation care', 'prayer', 'rain'],
        'language': 'en',
    },
    {
        'slug': 'south-african-braai-and-the-table-grace',
        'title': "The South African Braai and the Table of Grace: A Christian's Guide to the Sunday Roast, the Firelight, and the God Who Loves a Good Meal",
        'date': '2026-10-01',
        'excerpt': "The braai is the South African church that happens in the garden on a Sunday afternoon. The meat on the fire. The children on the grass. The conversation that goes on too long. The prayer that no one says. Here is what the Bible actually says about the table, about the meal, about the braaivleis, and how the Christian in Johannesburg can turn the Sunday braai into a small piece of church.",
        'tags': ['braai', 'table', 'Sunday', 'Johannesburg', 'Sandton', 'South Africa', 'grace', 'meal', 'hospitality', 'friendship', 'family', 'church', 'Bible study', 'worship'],
        'language': 'en',
    },
    {
        'slug': 'retirement-village-faith-johannesburg-elderly',
        'title': "The Last Move: A Christian's Guide to the Retirement Village, the New Friends, and the God Who Goes With You",
        'date': '2026-10-01',
        'excerpt': "The move into the retirement village is one of the great moves of the Christian life. The house goes. The garden goes. The Sunday school goes. The book club goes. The Bible study group that has met in the front room for twenty years goes. And the new village has new faces. Here is what the Bible actually says about the last move, about the new neighbours in the retirement village, and how the Christian can begin the new chapter well.",
        'tags': ['retirement', 'elderly', 'retirement village', 'Sandton', 'Johannesburg', 'South Africa', 'old age', 'care home', 'community', 'neighbour', 'Bible study', 'psalm', 'loneliness', 'dignity'],
        'language': 'en',
    },
    {
        'slug': 'returning-to-church-after-long-absence-johannesburg',
        'title': "Coming Back to Church After a Long Absence: A South African's Honest Guide to the Sunday That Has Been Waiting",
        'date': '2026-10-01',
        'excerpt': "The Sunday morning after a long absence is one of the hardest Sundays of the South African Christian life. The parking lot is full of the people who never stopped coming. The hymns are different. The pastor knows your face. The clothes are different. Here is what the Bible says about the return, about the shame, about the welcome, and how the Christian in Johannesburg can come back without pretending the long absence did not happen.",
        'tags': ['church return', 'back to church', 'absence', 'shame', 'welcome', 'Sandton', 'Johannesburg', 'South Africa', 'repentance', 'grace', 'Bible study', 'loneliness', 'church hurt', 'Christian living'],
        'language': 'en',
    },
    # Chinese posts (only Mr Leo WhatsApp contact)
    {
        'slug': 'nanfei-liuxuesheng-jidutuan-shenghuo',
        'title': '在南非的中国留学生基督徒生活：约堡校园与信仰的相遇',
        'date': '2026-10-01',
        'excerpt': '在南非求学的中国留学生基督徒，如何在陌生的国度里保持信仰？如何在异文化的校园生活中活出基督徒的品格？本文探讨留学生基督徒的孤独、祷告生活、英语礼拜、小组会、学业压力与信仰的整合。',
        'tags': ['南非留学生', '约堡华人留学生', '留学生基督徒', '中国留学生信仰', '约堡校园', '英语礼拜', '留学生团契', '南非求学生涯'],
        'language': 'zh',
    },
    {
        'slug': 'nanfei-waipai-zinv-jidutuan-jiaoyu',
        'title': '在南非的外派子女：基督徒家庭如何教导孩子在跨国环境中持守信仰',
        'date': '2026-10-01',
        'excerpt': '外派到南非的中国家庭，子女在国际学校或当地学校就读，面对的是英文为主的教学环境、不同文化背景的同学、远离祖辈的中文母语环境。如何在这样的环境中教导孩子信仰？本文从圣经出发，探讨外派家庭信仰传承的挑战与实践。',
        'tags': ['南非外派', '约堡华人子女', '外派子女教育', '基督徒家庭', '信仰传承', '国际学校', '跨国华人家庭', '海外华人子女信仰'],
        'language': 'zh',
    },
    {
        'slug': 'nanfei-danshen-fumu-jidutuan-yangyu',
        'title': '在南非的单身基督徒父母：如何在异国独自抚养孩子又不失信仰',
        'date': '2026-10-01',
        'excerpt': '在南非独自抚养孩子的中国父母，父母在处理工作的同时还需要照顾孩子、教导信仰、应对成长延迟、感情陪伴等状况。本文从圣经出发，探讨单身基督徒父母的孤独、智慧、力量与喜乐。',
        'tags': ['南非单身父母', '约堡华人单亲', '单身基督徒父母', '约堡华裔家庭', '独自抚养', '信仰与育儿', '南非单亲', '华人基督徒晚生家庭'],
        'language': 'zh',
    },
    {
        'slug': 'nanfei-yuancheng-bangong-xinyang-jidutuan',
        'title': '在南非远程办公的基督徒华人：跨境工作与信仰的整合',
        'date': '2026-10-01',
        'excerpt': '在南非远程为亚洲、欧洲、北美公司工作的华人基督徒，如何在跨时区的工作中保持信仰？如何处理工作压力、时差、孤独、与同事的沟通？本文探讨远程工作基督徒的信仰生活。',
        'tags': ['南非远程办公', '约堡华人远程工作', '远程基督徒', '跨境工作信仰', '约堡华人软件科技', '家庭与远程工作', '华人基督徒职业', '在家办公信仰'],
        'language': 'zh',
    },
    {
        'slug': 'nanfei-zhongzi-qiye-jidutuan-zhiye',
        'title': '在南非的中资企业基督徒：如何在企业环境中活出信仰又不失见证',
        'date': '2026-10-01',
        'excerpt': '在中资企业（建筑、矿业、能源、制造业、贸易公司）工作的华人基督徒，如何在企业环境中活出信仰？如何处理加班、跨文化沟通、职场关系、签证压力？本文探讨中资企业基督徒的信仰实践与见证。',
        'tags': ['南非中资企业', '约堡华人企业', '企业基督徒', '跨文化职场', '约堡华人中资公司', '中资企业信仰', '在企业作见证', '华人基督徒职业'],
        'language': 'zh',
    },
]


def get_markdown_body(slug: str) -> str:
    """Read markdown body (after frontmatter)."""
    md_path = POSTS_DIR / f"{slug}.md"
    text = md_path.read_text(encoding="utf-8")
    if text.startswith("---"):
        parts = text.split("---", 2)
        if len(parts) >= 3:
            body = parts[2].lstrip("\n")
            return body
    return text


def md_body_to_inline_html(body: str) -> str:
    """Convert markdown body to inline HTML, line by line.

    The existing posts dict entries use raw HTML wrapped in template strings.
    For consistency, we keep the markdown content as HTML paragraphs and
    headings, similar to how the original posts are formatted.
    """
    lines = body.split("\n")
    out = []
    para_lines = []
    in_para = False

    def flush_para():
        nonlocal para_lines, in_para
        if para_lines:
            joined = " ".join(para_lines)
            # Strip the wrapper
            joined = re.sub(r"^<p>(.*)</p>$", r"\1", joined, flags=re.DOTALL)
            # Convert **bold** -> <strong>
            joined = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", joined)
            # Convert *italic* -> <em>
            joined = re.sub(r"(?<!\*)\*([^*]+?)\*(?!\*)", r"<em>\1</em>", joined)
            out.append(f"<p>{joined}</p>")
            para_lines = []
            in_para = False

    for line in lines:
        stripped = line.strip()
        if not stripped:
            flush_para()
            continue
        # Headers
        if stripped.startswith("### "):
            flush_para()
            out.append(f"<h3>{stripped[4:]}</h3>")
            continue
        if stripped.startswith("## "):
            flush_para()
            out.append(f"<h2>{stripped[3:]}</h2>")
            continue
        # Markdown image
        if stripped.startswith("!["):
            flush_para()
            m = re.match(r"!\[(.*?)\]\((.*?)\)", stripped)
            if m:
                alt, src = m.group(1), m.group(2)
                out.append(f'<img src="{src}" alt="{alt}" class="w-full rounded-lg my-6" />')
                continue
        # HTML block (already formatted)
        if stripped.startswith("<"):
            flush_para()
            out.append(stripped)
            continue
        # Plain text paragraph line
        para_lines.append(stripped)
        in_para = True
    flush_para()
    return "\n      ".join(out)


def make_entry(post: dict) -> str:
    slug = post['slug']
    title = post['title'].replace("'", "\\'")
    excerpt = post['excerpt'].replace("'", "\\'")
    date = post['date']
    tags_str = "', '".join(post['tags'])

    body = get_markdown_body(slug)
    body_html = md_body_to_inline_html(body)

    return f"""  '{slug}': {{
    title: '{title}',
    date: '{date}',
    excerpt: '{excerpt}',
    tags: ['{tags_str}'],
    content: `
      {body_html}
    `,
  }},
"""


astro_text = SLUG_ASTRO.read_text(encoding="utf-8")

# Remove any existing entries with the same slugs (idempotency)
for p in NEW_POSTS:
    slug = p['slug']
    pattern = re.compile(
        rf"  '{re.escape(slug)}':\s*\{{\n(?:.*\n)*?\s*\}},\n\n",
        re.MULTILINE,
    )
    astro_text = pattern.sub("", astro_text)

new_entries = "".join(make_entry(p) for p in NEW_POSTS)

marker = "  },\n\n};"
if marker not in astro_text:
    raise RuntimeError("Could not find posts dict close marker in [slug].astro")

replacement = "  },\n\n" + new_entries + "};"
new_astro_text = astro_text.replace(
    marker,
    replacement,
    1,
)

SLUG_ASTRO.write_text(new_astro_text, encoding="utf-8")
print(f"OK - added {len(NEW_POSTS)} posts dictionary entries")