"""
Update blog/[slug].astro posts dictionary:
Remove Mr. Sim and Ms. Dora contact lines from each Chinese post entry.
Also change author from "Mr. Sim" to "Mr Leo" if present.
"""
import re
from pathlib import Path

TARGET = Path(r"C:\Users\Laptop\Desktop\Church-Site\src\pages\blog\[slug].astro")

content = TARGET.read_text(encoding="utf-8")
original = content

# Map of Chinese slugs to update
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

# Pattern: removes the 2 contact blocks (Mr. Sim and Ms. Dora) inside the content
# In [slug].astro, content uses escaped quotes (\"), and the WhatsApp buttons use the
# same long SVG path.
# We'll find the patterns: '<p><strong>Mr. Sim：...</strong></p>' and similar
# And the strong tag ones.

# Strong text pattern in HTML: <p><strong>Mr. Sim：+27 77 487 1295</strong></p>
content = re.sub(
    r'<p><strong>Mr\. Sim[：:]\s*\+27 77 487 1295</strong></p>\s*',
    '',
    content,
)

content = re.sub(
    r'<p><strong>Ms\. Dora[：:]\s*\+27 67 442 4461</strong></p>\s*',
    '',
    content,
)

# Also try plain text variants
content = re.sub(
    r'<p>\*\*Mr\. Sim\*\*[：:]\s*\+27 77 487 1295</p>\s*',
    '',
    content,
)

content = re.sub(
    r'<p>\*\*Ms\. Dora\*\*[：:]\s*\+27 67 442 4461</p>\s*',
    '',
    content,
)

# Change author field "Mr. Sim" -> "Mr Leo" only for Chinese posts
# We'll process each Chinese slug block: from '<slug>': { ... author: '...', ... }
# To be safe, just replace all instances in the file, since we know all Chinese posts
# are at the end of the file.
# We use a position-based replacement: change author only after the line containing '// 30 September 2026 Chinese-language posts'
marker = "// 30 September 2026 Chinese-language posts for South African Chinese Christian community"
idx = content.find(marker)
if idx > 0:
    before = content[:idx]
    after = content[idx:]
    after = after.replace('author: \'Mr. Sim\'', 'author: \'Mr Leo\'')
    after = after.replace('author: "Mr. Sim"', 'author: "Mr Leo"')
    content = before + after

if content != original:
    TARGET.write_text(content, encoding="utf-8")
    print("OK: blog/[slug].astro updated")
else:
    print("NO CHANGE: blog/[slug].astro")
