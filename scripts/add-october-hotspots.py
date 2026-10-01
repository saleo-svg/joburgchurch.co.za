"""
Generate posts dictionary entries for blog/[slug].astro for the 10 hotspot
posts (5 English jacarandas/spring + 5 Chinese gold visa/return + dual language).
"""

from pathlib import Path
import re

SRC = Path(r"C:\Users\Laptop\Desktop\Church-Site")
POSTS_DIR = SRC / "src" / "content" / "posts"
SLUG_ASTRO = SRC / "src" / "pages" / "blog" / "[slug].astro"

NEW_POSTS = [
    # English SA-local jacarandas/spring hotspot posts
    {
        'slug': 'jacarandas-spring-joburg-second-bloom',
        'title': "The Jacarandas Are Out: A Christian Reflection on the Second Bloom, the Joburg Spring, and the God Who Gives You Another Start",
        'date': '2026-10-01',
        'excerpt': "Every October the jacarandas of Johannesburg turn purple. The city has been waiting twelve months for the bloom. The Christian in Johannesburg has been waiting too — for a second chance, a second calling, a second spring. Here is what the Bible actually says about the second bloom, and how the Sandton Bible study has learned to walk the purple streets.",
        'tags': ['jacarandas', 'spring', 'second chances', 'Sandton', 'Johannesburg', 'Pretoria', 'South Africa', 'renewal', 'Bible study', 'hope', 'October', 'new beginnings'],
        'language': 'en',
    },
    {
        'slug': 'joburg-spring-gardening-faith-cultivation',
        'title': "Planting Tomatoes in the Sandton Spring: A Christian Reflection on the Garden, the Soul, and the God Who Makes Seeds into Harvests",
        'date': '2026-10-01',
        'excerpt': "October in Johannesburg is the time to plant. The tomato seedlings, the basil, the rose bushes, the lawn. The Christian in Sandton in 2026 has begun to think about the garden as a small picture of the spiritual life. Here is what the Bible actually says about planting, about patience, about watering, about the God who makes seeds into harvests.",
        'tags': ['garden', 'gardening', 'spring', 'planting', 'Sandton', 'Johannesburg', 'South Africa', 'Bible study', 'patience', 'stewardship', 'harvest', 'faith'],
        'language': 'en',
    },
    {
        'slug': 'first-thunderstorm-spring-joburg-faith',
        'title': "The First Thunderstorm of Spring: A Christian Reflection on the Joburg Thunder, the Joburg Fear, and the God Who Speaks in the Storm",
        'date': '2026-10-01',
        'excerpt': "Every October the first thunderstorm comes. The dry winter air finally breaks. The lightning splits the night. The thunder rolls over the Magaliesberg. The Christian in Johannesburg has been waiting for the rain. The Christian in the shadow of the Eskom load-shedding has been waiting. Here is what the Bible actually says about the thunder, the lightning, the rain, and the God who is in all three.",
        'tags': ['thunderstorm', 'spring rain', 'lightning', 'Sandton', 'Johannesburg', 'South Africa', 'Bible study', 'storm', 'God presence', 'trust', 'October'],
        'language': 'en',
    },
    {
        'slug': 'october-light-and-late-sundown-joburg',
        'title': "The Long Daylight: A Christian Reflection on the Joburg October Light, the Late Sundown, and the Wisdom of Long Evenings",
        'date': '2026-10-01',
        'excerpt': "October in Johannesburg is the month when the days get long. The sun goes down at 6:30 pm at the start, by 7:05 pm at the end. The Christian in Johannesburg in 2026 has begun to think about the long daylight as a gift. Here is what the Bible actually says about light, about evening, about the wisdom of long evening.",
        'tags': ['daylight', 'evening', 'spring', 'Sandton', 'Johannesburg', 'South Africa', 'Bible study', 'evening', 'light', 'time', 'wisdom', 'DST'],
        'language': 'en',
    },
    {
        'slug': 'spring-cleaning-home-and-soul-johannesburg',
        'title': "Spring Cleaning in October: A South African Christian's Reflection on the Joburg Spring, the House, the Soul, and the God Who Renews All Things",
        'date': '2026-10-01',
        'excerpt': "October is the spring of Johannesburg. The Christian in Sandton in 2026 has begun to think about the spring cleaning as a small picture of the renewal of the soul. The Bible has a great deal to say about cleaning. Here is what the Bible actually says about spring, about cleaning, about the home, about the God who renews.",
        'tags': ['spring cleaning', 'home', 'renewal', 'Sandton', 'Johannesburg', 'South Africa', 'Bible study', 'house', 'soul', 'cleansing', 'repentance', 'October'],
        'language': 'en',
    },
    # Chinese hotspot posts — gold visa/return + dual language
    {
        'slug': 'nanfei-jinpian-haigui-jidutuan-shenfen',
        'title': '在南非的金签、华侨回国与基督徒身份：约堡华人侨民的回国思辨',
        'date': '2026-10-01',
        'excerpt': '在南非的中国基督徒侨民，如何看待金签（critical skills visa）、退休签证、华侨回国、落叶归根等问题？本文从圣经出发，探讨海外侨民的身份归属、回国适应、与信仰的关系。',
        'tags': ['南非金签', '约堡华人侨民', '华人回国', '落叶归根', '基督徒身份', '南非华人身份', '华侨回国适应', '金签基督徒'],
        'language': 'zh',
    },
    {
        'slug': 'nanfei-haiwai-qiaomin-laohui-jiating-jiuye',
        'title': '在南非的海外华人侨民：回国后的家庭团聚、再就业与信仰调整',
        'date': '2026-10-01',
        'excerpt': '在南非生活多年的华人基督徒，回中国后如何重新适应？如何处理与家人团聚后的关系？如何找到合适的工作？如何调整信仰生活？本文从圣经出发，探讨海外侨民回国后的现实问题与信仰回应。',
        'tags': ['南非华侨', '约堡华人回国', '海外侨民回国', '家庭团聚', '再就业', '回国适应', '南非华人基督徒', '海外华人信仰'],
        'language': 'zh',
    },
    {
        'slug': 'nanfei-haigui-jidutuan-laoling-jihua',
        'title': '在南非的归侨基督徒：如何规划海外养老、子女照护与信仰传承',
        'date': '2026-10-01',
        'excerpt': '在南非生活多年的华人基督徒，逐渐步入中老年。如何规划养老？如何与远在中国的父母养老保持联系？如何将信仰传承给下一代？本文从圣经出发，探讨归侨基督徒的养老、思乡与信仰传承。',
        'tags': ['南非归侨', '约堡华人中老年', '海外华人养老', '基督徒养老', '华侨思乡', '南非华人信仰传承', '海外子女照护', '归侨基督徒'],
        'language': 'zh',
    },
    {
        'slug': 'nanfei-haizi-zhongwen-jiaoyu-shuangyu-qiehuan',
        'title': '在南非的华人基督徒家庭：孩子的中文教育与双语切换',
        'date': '2026-10-01',
        'excerpt': '在南非外派的华人基督徒家庭，孩子在国际学校长大，中文渐渐减少。如何保持孩子的中文能力？如何实现双语切换？如何将中文与信仰结合？本文从圣经出发，探讨双语家庭的中文教育与信仰传承。',
        'tags': ['南非中文教育', '约堡华人子女', '外派双语', '国际学校中文', '中文阅读', '双语切换', '信仰中文', '华人基督徒双语'],
        'language': 'zh',
    },
]


def get_markdown_body(slug: str) -> str:
    md_path = POSTS_DIR / f"{slug}.md"
    text = md_path.read_text(encoding="utf-8")
    if text.startswith("---"):
        parts = text.split("---", 2)
        if len(parts) >= 3:
            body = parts[2].lstrip("\n")
            return body
    return text


def md_body_to_inline_html(body: str) -> str:
    lines = body.split("\n")
    out = []
    para_lines = []
    in_para = False

    def flush_para():
        nonlocal para_lines, in_para
        if para_lines:
            joined = " ".join(para_lines)
            joined = re.sub(r"^<p>(.*)</p>$", r"\1", joined, flags=re.DOTALL)
            joined = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", joined)
            joined = re.sub(r"(?<!\*)\*([^*]+?)\*(?!\*)", r"<em>\1</em>", joined)
            out.append(f"<p>{joined}</p>")
            para_lines = []
            in_para = False

    for line in lines:
        stripped = line.strip()
        if not stripped:
            flush_para()
            continue
        if stripped.startswith("### "):
            flush_para()
            out.append(f"<h3>{stripped[4:]}</h3>")
            continue
        if stripped.startswith("## "):
            flush_para()
            out.append(f"<h2>{stripped[3:]}</h2>")
            continue
        if stripped.startswith("!["):
            flush_para()
            m = re.match(r"!\[(.*?)\]\((.*?)\)", stripped)
            if m:
                alt, src = m.group(1), m.group(2)
                out.append(f'<img src="{src}" alt="{alt}" class="w-full rounded-lg my-6" />')
                continue
        if stripped.startswith("<"):
            flush_para()
            out.append(stripped)
            continue
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

for p in NEW_POSTS:
    slug = p['slug']
    pattern = re.compile(
        rf"  '{re.escape(slug)}':\s*\{{\n(?:.*\n)*?\s*\}},\n\n",
        re.MULTILINE,
    )
    astro_text = pattern.sub("", astro_text)

new_entries = "".join(make_entry(p) for p in NEW_POSTS)

marker = "  },\n};"
if marker not in astro_text:
    raise RuntimeError("Could not find posts dict close marker")

replacement = "  },\n\n" + new_entries + "};"
new_astro_text = astro_text.replace(marker, replacement, 1)

SLUG_ASTRO.write_text(new_astro_text, encoding="utf-8")
print(f"OK - added {len(NEW_POSTS)} hotspot posts dictionary entries")