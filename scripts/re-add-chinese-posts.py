"""
Re-add 12 Chinese-language posts to the blog/[slug].astro posts dictionary.
These were lost when blog/[slug].astro was checked out from git.
"""
from pathlib import Path

TARGET = Path(r"C:\Users\Laptop\Desktop\Church-Site\src\pages\blog\[slug].astro")

SVG_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'


def make_chinese_post(slug: str, title: str, date: str, excerpt: str, tags: list[str],
                       body_html: str) -> str:
    tags_str = "', '".join(tags)
    return f'''  '{slug}': {{
    title: '{title}',
    date: '{date}',
    excerpt: '{excerpt}',
    tags: ['{tags_str}'],
    content: `
{body_html}
    `,
  }},
'''


# Read existing content
content = TARGET.read_text(encoding="utf-8")

WA_BUTTON = f'''
      <p><strong>Mr Leo（中文）：+27 79 259 2607</strong></p>
      <p>
        <a href="https://wa.me/27792592607" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="{SVG_PATH}"/></svg>
          WhatsApp: +27 79 259 2607
        </a>
      </p>
'''.strip()


# Build the 12 Chinese posts (concise Chinese body)
POSTS = [
    {
        "slug": "nanfei-huaren-jiaohui-zhunanjohannesburg-zhongwen-jidutuanfei",
        "title": "南非约翰内斯堡华人教会指南：在约堡寻找中文基督徒团契",
        "date": "2026-09-15",
        "excerpt": "在约翰内斯堡和桑顿地区寻找华人教会？本指南帮助在南非的华人基督徒找到合适的中文团契、礼拜聚会和查经班。无论你是台湾人、大陆华人还是本地出生的华人，都能找到属灵的家。",
        "tags": ["南非华人教会", "约堡华人教会", "约翰内斯堡教会", "桑顿中文教会", "华人基督徒", "团契", "查经班"],
        "body": """
      <p class=\"text-lg leading-relaxed mb-6\">对于在约翰内斯堡生活的华人来说，找到一个合适的中文教会不仅仅是找个地方做礼拜。它关乎你在异国他乡有一个属灵的家，关乎你能在中文环境下学习圣经，关乎你能在语言无障碍的情况下分享你生命中的高山和低谷。</p>
      <p class=\"mb-6\">在南非的华人群体多元而独特：有从台湾来的移民，有从大陆外派到这里工作的商务人士，有在本地出生的华人第二代，也有通过各种途径来到南非的华人基督徒。每个群体的需求都不尽相同，但都指向同一个渴望——在基督里找到归属感。</p>
      <h2>南非华人基督徒面临的特殊挑战</h2>
      <p>语言障碍、文化差异、地理分散、签证与身份问题——这些都是南非华人基督徒面临的真实挑战。圣经说：<em>「你们就是基督的身子，并且各自作肢体。」</em>（哥林多前书 12:27）我们虽然分散在各地，但在基督里是一体的。</p>
      <h2>我们的周三晚间中文查经班</h2>
      <p>每周三晚上7:30，我们通过Google Meet进行线上中文查经班，全中文进行，欢迎所有华人基督徒。</p>
      <h2>联系方式</h2>
{wa}
"""
    },
]

# For simplicity, let's just add the 12 slugs with minimal content + Mr Leo contact
# We'll read each markdown file to get the content
POSTS_DIR = Path(r"C:\Users\Laptop\Desktop\Church-Site\src\content\posts")
CHINESE_SLUGS = [
    "nanfei-huaren-jiaohui-zhunanjohannesburg-zhongwen-jidutuanfei",
    "nanfei-waipai-huaren-jidutuan-shenghuo-johannesburg",
    "taiwanese-christians-south-africa-johannesburg",
    "nanfei-huayi-erda-xinyang-shenfen-jiaohui",
    "nanfei-mianfei-xinli-zixun-huaren-jidutuan",
    "yuebao-huaren-libai-juhui-dian-zhinan",
    "nanfei-shengfen-huaren-jidutuan-ziyuan",
    "nanfei-huaren-hunyin-jiating-jiaohui",
    "nanfei-zuolibai-shicao-zhinan",
    "yuebao-huaren-chajingban-zhouwu",
    "nanfei-anquan-xinyang-jidutuan",
    "nanfei-zhichang-xinyang-jidutuan",
]


def extract_md_front_matter(md_path: Path) -> dict:
    """Extract title, date, excerpt, tags, author from markdown front matter."""
    text = md_path.read_text(encoding="utf-8")
    if not text.startswith("---"):
        return {}
    parts = text.split("---", 2)
    if len(parts) < 3:
        return {}
    fm = parts[1]
    body = parts[2]

    out = {}
    for line in fm.split("\n"):
        line = line.strip()
        if line.startswith("title:"):
            out["title"] = line.split(":", 1)[1].strip().strip('"')
        elif line.startswith("date:"):
            out["date"] = line.split(":", 1)[1].strip()
        elif line.startswith("description:"):
            out["excerpt"] = line.split(":", 1)[1].strip().strip('"')
        elif line.startswith("tags:"):
            # [tag1, tag2, ...]
            out["tags"] = line.split(":", 1)[1].strip().strip('[]').replace('"', '').replace("'", "").split(",")

    out["body"] = body
    return out


# Build new posts entries
new_entries = []
for slug in CHINESE_SLUGS:
    md_file = POSTS_DIR / f"{slug}.md"
    if not md_file.exists():
        print(f"NOT FOUND: {slug}")
        continue
    fm = extract_md_front_matter(md_file)
    if not fm:
        print(f"NO FM: {slug}")
        continue
    title = fm.get("title", slug)
    date = fm.get("date", "2026-09-15")
    excerpt = fm.get("excerpt", fm.get("description", ""))
    tags = fm.get("tags", ["南非华人教会"])

    # Get the body content (the actual article)
    body_md = fm.get("body", "").strip()

    # Convert markdown to simple HTML (basic conversion for our needs)
    body_lines = body_md.split("\n")
    body_html_lines = []
    in_html = False
    for line in body_lines:
        # If line starts with < it's HTML, pass through
        if line.lstrip().startswith("<"):
            body_html_lines.append(line)
            in_html = True
            continue
        # If empty, pass through
        if not line.strip():
            body_html_lines.append(line)
            continue
        # If it's "---" separator, skip
        if line.strip() == "---":
            continue
        # If we're in HTML mode, pass through
        if in_html:
            body_html_lines.append(line)
            continue
        # Heading
        if line.startswith("## "):
            body_html_lines.append(f"<h2>{line[3:].strip()}</h2>")
        elif line.startswith("# "):
            body_html_lines.append(f"<h1>{line[2:].strip()}</h1>")
        elif line.startswith("!["):
            # image: ![alt](src)
            import re
            m = re.match(r'!\[([^\]]*)\]\(([^)]+)\)', line.strip())
            if m:
                alt, src = m.group(1), m.group(2)
                body_html_lines.append(f'<img src="{src}" alt="{alt}" class="w-full rounded-lg my-6" />')
            else:
                body_html_lines.append(line)
        elif line.startswith(">"):
            body_html_lines.append(f"<blockquote>{line[1:].strip()}</blockquote>")
        elif line.lstrip().startswith("- "):
            body_html_lines.append(f"<li>{line.lstrip()[2:]}</li>")
        else:
            # Regular paragraph
            body_html_lines.append(f"<p>{line.strip()}</p>")

    body_html = "\n      ".join(body_html_lines)

    # Insert the Mr Leo contact block at the end if not already present
    if "wa.me/27792592607" not in body_html:
        body_html += "\n      <h2>联系方式</h2>\n" + WA_BUTTON.replace("\n      ", "\n      ")

    tags_str = ", ".join(f"'{t.strip()}'" for t in tags)
    entry = (
        f"  '{slug}': {{\n"
        f"    title: {repr(title)},\n"
        f"    date: '{date}',\n"
        f"    excerpt: {repr(excerpt)},\n"
        f"    tags: [{tags_str}],\n"
        f"    content: `\n      {body_html}\n    `,\n"
        f"  }},\n"
    )
    new_entries.append(entry)

# Build the posts dict addition block
marker = "// 30 September 2026 Chinese-language posts for South African Chinese Christian community"
chinese_block = (
    f"\n  {marker}\n"
    + "\n".join(new_entries)
)

# Insert before the closing }; of posts dictionary
# Find: 'lunch-break-bible-study-sandton-workplace': { ... }, or similar
# We insert after the last entry in the posts dictionary

# Find the line "};" that closes the posts dictionary (after lunch-break entry)
# Approach: find the line that contains 'lunch-break-bible-study-sandton-workplace' entry closing
import re
# Find pattern: `  'lunch-break-bible-study-sandton-workplace': {` followed by content
# The posts dictionary closes after this entry

# Find the closing `};\n\n// Hymn region images`
m = re.search(r"(\};\s*\n\s*// Hymn region images)", content)
if not m:
    print("Could not find posts dictionary closing")
    raise SystemExit(1)

# Insert chinese_block before the };
new_content = content[:m.start()] + chinese_block + "\n" + content[m.start():]
TARGET.write_text(new_content, encoding="utf-8")
print(f"Added {len(new_entries)} Chinese posts to blog/[slug].astro")
