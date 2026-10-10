# -*- coding: utf-8 -*-
"""Append Korean class fee update entry to dev logs (2026-10-01)."""

import os
from pathlib import Path

ROOT = Path(r"C:\Users\Laptop\Desktop\Church-Site")

ENTRY_TXT = """
=====================================
本次保存内容开始
=====================================

【任务】Korean Class: 移除所有"免费"描述,改为课程收费

【背景】
- 网站之前将 Korean class 描述为 "Free" (免费),导致访客截图投诉要求免费
- 教会组织告知 Korean class 实际是收费课程,并非免费
- Bible study 保持免费,但 Korean class 必须标明是收费
- 用户要求:把所有"免费"的内容都改掉,把"免费"去掉

【改动策略】
1. Korean class 名称: "Free Korean Class" -> "Korean Language Class"
2. 所有提到 Korean class 的地方注明: "A course fee applies. Please call or WhatsApp for current fees."
3. Schema.org structured data: Course isAccessibleForFree: true -> false, priceRange 改为 "Bible study free; Korean class fee applies"
4. /free-korean-class-johannesburg/ 页面保留 URL(SEO 价值),内容改为明确说明课程是收费,网站之前写错了
5. Blog slug /blog/free-korean-class-community/ 重命名为 /blog/korean-class-community/,添加 301 redirect

【时间保持】
- Korean class: Sunday 3:00pm (保持不变)

【修改文件】
- src/pages/community-classes/korean.astro (主页)
- src/pages/community-classes/index.astro (课程列表)
- src/pages/free-korean-class-johannesburg.astro (SEO landing,内容改写)
- src/pages/visit.astro (参观指南)
- src/pages/contact.astro (联系页面)
- src/pages/locations/[slug].astro (Sandton 位置页面)
- src/pages/marriage-counselling-johannesburg.astro (费用 FAQ)
- src/pages/bible-study-for-depression-johannesburg.astro (费用 FAQ)
- src/pages/bible-study-randburg.astro (费用说明)
- src/pages/bible-study-soweto.astro (费用 FAQ)
- src/pages/bible-study-fourways.astro (费用 FAQ)
- src/pages/bible-study-alberton.astro (费用 FAQ)
- src/pages/bible-study-midrand.astro (费用 FAQ)
- src/pages/bible-study-roodepoort.astro (费用 FAQ)
- src/pages/korean-language-class-for-beginners-johannesburg.astro (FAQ 改写)
- src/pages/churches-in-sandton.astro (去除"free"行)
- src/pages/faq.astro (Korean class FAQ 改写)
- src/components/Footer.astro (footer 显示 "Course fee applies")
- src/pages/index.astro (主页 cost 改写)
- src/layouts/BaseLayout.astro (schema priceRange 改写)
- src/lib/modules/settings.ts (welcomeMessage)
- src/content/settings/general.md (welcome_message)
- src/pages/blog/[slug].astro (slug 重命名 + 内容改写)
- astro.config.mjs (添加 301 redirect)
- src/pages/sitemap.xml.ts (更新 blog URL + lastmod)

【301 重定向配置】
```javascript
// astro.config.mjs
redirects: {
  '/blog/free-korean-class-community/': '/blog/korean-class-community/',
}
```

【构建结果】
- 330 pages built in 38s
- 0 errors, 0 warnings
- dist/blog/free-korean-class-community/index.html 正确生成(包含 redirect meta)

【最终 grep 验证】
- src/ + dist/ 中已无 "free korean" 或 "korean.*free of charge" 等错误描述
- 保留的"free"均为:
  1. Bible study (正确:免费)
  2. FAQ 明确说明 Korean class 不是免费
  3. Hymn downloads (免费下载)

【用户验证】
- 用户已在线确认无错误"free korean"内容
- 已上传并部署 301 redirect 规则
=====================================
本次保存内容结束
=====================================
"""

ENTRY_MD = """

---

## 2026-10-01 — Korean Class: 去除"免费"描述,改为课程收费

### 背景
- 网站之前将 Korean class 描述为 "Free" (免费),导致访客截图投诉要求免费课程
- 教会组织告知 Korean class 实际是**收费课程**,并非免费
- Bible study 保持免费,但 Korean class 必须标明是收费
- 用户原始请求: "把所有关于免费韩国课程的内容都改掉,把'免费'去掉"

### 改动策略
1. **重命名**: "Free Korean Class" -> "Korean Language Class"
2. **添加收费通知**: 所有提到 Korean class 的地方注明 "A course fee applies. Please call or WhatsApp for current fees."
3. **Schema.org 改写**: Course `isAccessibleForFree: true` -> `false`,`priceRange` 改为 "Bible study free; Korean class fee applies"
4. **SEO 页面改写**: `/free-korean-class-johannesburg/` URL 保留(SEO 价值),内容改为透明说明课程是收费 + 网站之前写错了
5. **Blog 重命名**: `/blog/free-korean-class-community/` -> `/blog/korean-class-community/`,添加 301 redirect

### 时间表
- Korean class: **Sunday 3:00pm** (保持不变)

### 修改文件清单
- `src/pages/community-classes/korean.astro` (主页)
- `src/pages/community-classes/index.astro` (课程列表)
- `src/pages/free-korean-class-johannesburg.astro` (SEO landing 改写)
- `src/pages/visit.astro` (参观指南)
- `src/pages/contact.astro` (联系页面)
- `src/pages/locations/[slug].astro` (Sandton 位置页面)
- `src/pages/marriage-counselling-johannesburg.astro` (费用 FAQ)
- `src/pages/bible-study-for-depression-johannesburg.astro` (费用 FAQ)
- `src/pages/bible-study-randburg.astro` (费用说明)
- `src/pages/bible-study-soweto.astro` (费用 FAQ)
- `src/pages/bible-study-fourways.astro` (费用 FAQ)
- `src/pages/bible-study-alberton.astro` (费用 FAQ)
- `src/pages/bible-study-midrand.astro` (费用 FAQ)
- `src/pages/bible-study-roodepoort.astro` (费用 FAQ)
- `src/pages/korean-language-class-for-beginners-johannesburg.astro` (FAQ 改写)
- `src/pages/churches-in-sandton.astro` (去除"free"行)
- `src/pages/faq.astro` (Korean class FAQ 改写)
- `src/components/Footer.astro` (footer "Course fee applies")
- `src/pages/index.astro` (主页 cost 改写)
- `src/layouts/BaseLayout.astro` (schema priceRange 改写)
- `src/lib/modules/settings.ts` (welcomeMessage)
- `src/content/settings/general.md` (welcome_message)
- `src/pages/blog/[slug].astro` (slug 重命名 + 内容改写)
- `astro.config.mjs` (添加 301 redirect)
- `src/pages/sitemap.xml.ts` (更新 blog URL + lastmod)

### 301 重定向配置
```javascript
// astro.config.mjs
redirects: {
  '/blog/free-korean-class-community/': '/blog/korean-class-community/',
}
```

### 构建结果
- **330 pages built in 38s**
- 0 errors, 0 warnings
- `dist/blog/free-korean-class-community/index.html` 正确生成(包含 redirect meta)

### 最终 grep 验证
- `src/` + `dist/` 中已无 "free korean" 或 "korean.*free of charge" 等错误描述
- 保留的"free"均为:
  1. Bible study (正确:免费)
  2. FAQ 明确说明 Korean class **不是**免费
  3. Hymn downloads (免费下载)
"""


def append(path: Path, content: str, encoding: str):
    if not path.exists():
        print(f"  ! {path.name} not found")
        return
    with open(path, "a", encoding=encoding) as f:
        f.write(content)
    size = path.stat().st_size
    print(f"  + {path.name} appended ({size:,} bytes, encoding={encoding})")


def main():
    print("Appending Korean class fee update entry to dev logs...")
    append(ROOT / "开发记录.txt", ENTRY_TXT, "utf-8")
    append(ROOT / "开发记录.md", ENTRY_MD, "utf-8")
    append(ROOT / "用户对话记录.txt", ENTRY_TXT, "utf-8")
    append(ROOT / "用户对话记录.md", ENTRY_MD, "utf-8")
    print("Done.")


if __name__ == "__main__":
    main()
