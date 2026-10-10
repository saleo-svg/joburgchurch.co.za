"""
Fix Chinese articles:
1. Change author field from "Mr. Sim" to "Mr Leo"
2. Remove inline references to "Mr. Sim" / "Ms. Dora" in body text
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

for filename in CHINESE_FILES:
    filepath = POSTS_DIR / filename
    if not filepath.exists():
        continue
    content = filepath.read_text(encoding="utf-8")
    original = content

    # 1) Change author field
    content = re.sub(r'^author:\s*"Mr\. Sim"\s*$', 'author: "Mr Leo"', content, flags=re.MULTILINE)

    # 2) Remove "或Ms. Dora" trailing from phrases like "Mr. Sim或Ms. Dora"
    content = re.sub(r'Mr\. Sim或Ms\. Dora', 'Mr Leo', content)

    # 3) Remove "或打电话给Mr. Sim" patterns
    content = re.sub(r'，请提前打电话给Mr\. Sim或Ms\. Dora。', '，请提前通过 WhatsApp 与我们联系。', content)

    # 4) Strip any remaining "**Mr. Sim**：+27 77 487 1295" / "**Ms. Dora**：+27 67 442 4461" lines (plain text form, not HTML)
    content = re.sub(r'\n\*\*Mr\. Sim\*\*[：:]\s*\+27 77 487 1295\s*\n?', '\n', content)
    content = re.sub(r'\n\*\*Ms\. Dora\*\*[：:]\s*\+27 67 442 4461\s*\n?', '\n', content)

    if content != original:
        filepath.write_text(content, encoding="utf-8")
        print(f"OK: {filename}")
    else:
        print(f"NO CHANGE: {filename}")
