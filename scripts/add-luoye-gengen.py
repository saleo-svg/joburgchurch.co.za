"""Add 1 missing Chinese hotspot post (luoye-gengen) to posts dict."""

from pathlib import Path
import re

SRC = Path(r"C:\Users\Laptop\Desktop\Church-Site")
POSTS_DIR = SRC / "src" / "content" / "posts"
SLUG_ASTRO = SRC / "src" / "pages" / "blog" / "[slug].astro"

POST = {
    'slug': 'nanfei-luoye-gengen-jidutuan-shenfen',
    'title': '在南非的落叶归根还是扎根南非：华人基督徒侨民的两种归属',
    'date': '2026-10-01',
    'excerpt': '在南非生活多年的华人基督徒，面临两种选择：回中国落叶归根，还是扎根南非？本文从圣经出发，探讨海外侨民的归属、思乡、回流与扎根之间找到信仰的智慧。',
    'tags': ['南非落叶归根', '约堡华人扎根', '华人侨民归属', '基督徒侨民', '华侨思乡', '华人回国适应', '南非华人身份', '华侨与扎根'],
    'language': 'zh',
}


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


slug = POST['slug']
title = POST['title'].replace("'", "\\'")
excerpt = POST['excerpt'].replace("'", "\\'")
date = POST['date']
tags_str = "', '".join(POST['tags'])

body = get_markdown_body(slug)
body_html = md_body_to_inline_html(body)

entry = f"""  '{slug}': {{
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

# Remove any existing
pattern = re.compile(
    rf"  '{re.escape(slug)}':\s*\{{\n(?:.*\n)*?\s*\}},\n\n",
    re.MULTILINE,
)
astro_text = pattern.sub("", astro_text)

marker = "  },\n};"
if marker not in astro_text:
    raise RuntimeError("Could not find marker")

replacement = "  },\n\n" + entry + "};"
new_astro_text = astro_text.replace(marker, replacement, 1)

SLUG_ASTRO.write_text(new_astro_text, encoding="utf-8")
print("OK - added", slug)