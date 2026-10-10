"""
Remove Mr. Sim and Ms. Dora contact sections from Chinese articles.
Keep only Mr Leo section.
"""
import re
from pathlib import Path

POSTS_DIR = Path(r"C:\Users\Laptop\Desktop\Church-Site\src\content\posts")

CHINESE_FILES = [
    "nanfei-huaren-jiaohui-zhunanjohannesburg-zhongwen-jidutuanfei.md",
    "nanfei-waipai-huaren-jidutuan-shenghuo-johannesburg.md",
    "taiwanese-christians-south-africa-johannesburg.md",
    "nanfei-huayi-erda-xinyang-shenfen-jiaohui.md",
    "nanfei-mianfei-xinli-zixun-huaren-jidutuan.md",
    "yuebao-huaren-libai-juhui-dian-zhinan.md",
    "nanfei-shengfen-huaren-jidutuan-ziyuan.md",
    "nanfei-huaren-hunyin-jiating-jiaohui.md",
    "nanfei-zuolibai-shicao-zhinan.md",
    "yuebao-huaren-chajingban-zhouwu.md",
    "nanfei-anquan-xinyang-jidutuan.md",
    "nanfei-zhichang-xinyang-jidutuan.md",
]

# Pattern: from "**Mr. Sim**" line to end of "</a>" that closes that section
# Each block starts with **Mr. Sim** or **Ms. Dora**, contains an <a>...</a>, ends with </a>
# We need to remove the block entirely, plus the blank line before/after it

# More robust: find each "**Mr. Sim**" or "**Ms. Dora**" section and the trailing </a>\n
# Then remove the whole thing including the blank line before

# We'll match: optional blank line + **Mr. Sim** block ... + trailing </a>\n + blank line
PATTERN = re.compile(
    r"\n*\n\*\*Mr\. Sim\*\*\n<a href=\"https://wa\.me/27774871295\"[^>]*>\n"
    r"(?:.*?\n)*?\s*</a>\n"
    r"\n\*\*Ms\. Dora\*\*\n<a href=\"https://wa\.me/27674424461\"[^>]*>\n"
    r"(?:.*?\n)*?\s*</a>\n",
    re.MULTILINE,
)

for filename in CHINESE_FILES:
    filepath = POSTS_DIR / filename
    if not filepath.exists():
        print(f"NOT FOUND: {filename}")
        continue
    content = filepath.read_text(encoding="utf-8")
    new_content, count = PATTERN.subn("\n", content)
    if count == 0:
        print(f"NO MATCH: {filename}")
        continue
    filepath.write_text(new_content, encoding="utf-8")
    print(f"OK ({count} block removed): {filename}")
