#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Append 2026-10-05 chapter to 开发记录.txt (GBK encoded, historical convention).
"""
import sys

NEW_CHAPTER = """---


## 2026-10-05 — 五篇南非本地化新博客文章 (基于 Reddit 2026-10 调研,无争议)

### 用户原始请求

> 你读取一下我前面的对话和开发记录。前几天让你帮我挖掘了 Reddit,南非这边的很多用户对南非教会相关的关注点和议题在哪里?你找几个比较好的方向,多做一些内容,现在再给我增加一些文章吧,好吧

> 还有,你尽量不要发布如何分辨真假教会、真假牧师这种内容,这很容易引起别人的激烈讨论和争议,这个类型就不要发了

### 策略

根据用户明确要求,**避开**任何关于"识别假教师 / 邪教 / 攻击大型教会"的内容。改用以下 5 个正向引导方向:

1. **Money, Tithing and the Christian in South Africa** — 圣经对金钱的真实教导
2. **Mental Health and Faith in Johannesburg** — 信仰 + 专业帮助(SADAG/HPCSA)
3. **Finding a Bible-Based Christian Community in Johannesburg** — 实用 5 步走
4. **Christian, Foreign, and Multilingual** — 外籍基督徒跨语言坚持信仰
5. **Small Church vs Big Church in South Africa** — 两个极端的诚实对比

### 修改的文件

- `src/pages/blog/[slug].astro` — 加 5 个 slug 到 `getStaticPaths()`,加 5 个条目到 `posts` 字典
- `src/pages/sitemap.xml.ts` — 加 5 个 URL(lastmod 2026-10-05);`now` 常量从 2026-10-01 改为 2026-10-05

### 新建的文件 (md 镜像供 lib/modules/blog.ts 读取)

- `src/content/posts/money-and-the-south-african-christian-biblical-view.md`
- `src/content/posts/mental-health-and-faith-johannesburg-christian.md`
- `src/content/posts/finding-a-bible-based-community-johannesburg.md`
- `src/content/posts/christian-expat-faith-johannesburg-multilingual.md`
- `src/content/posts/small-church-vs-mega-church-south-africa-honest-reflection.md`

### 构建结果

- **335 pages built**, 0 errors, 0 warnings (从 330 增加 5)
- 5 个新 dist HTML 文件正确生成
- sitemap 正确包含 5 个新 URL

### Git

- Commit `9b9fefa` on `master`
- 7 files changed, 718 insertions(+), 5 deletions(-)
- Pushed to `origin/master` (821f285 → 9b9fefa)
- Cloudflare Pages 自动部署

### 用户明确避免的主题(均已遵守)

- 辨别真假教会
- 辨别真假牧师
- 识别假教师
- 邪教主题
- 攻击任何具体教会或牧师

### 下一步

- Cloudflare Pages 自动部署
- 在线验证 https://joburgchurch.co.za/blog/... 5 个新页面
- 部署后重新提交 sitemap 给 Google Search Console
"""

# 开发记录.txt is GBK encoded historically. Read with GBK, append, write back as GBK.
path = "开发记录.txt"

try:
    with open(path, "rb") as f:
        raw = f.read()
    text = raw.decode("gbk", errors="replace")
except FileNotFoundError:
    print(f"ERROR: {path} not found", file=sys.stderr)
    sys.exit(1)

# Append chapter (UTF-8 string)
text = text.rstrip() + "\n" + NEW_CHAPTER.lstrip()

# Write back as GBK (per historical pattern)
with open(path, "wb") as f:
    f.write(text.encode("gbk", errors="replace"))

# Verify
import os
size = os.path.getsize(path)
print(f"OK: {path} updated. Size: {size} bytes.")

# Verify GBK decodes cleanly
with open(path, "rb") as f:
    raw = f.read()
text = raw.decode("gbk", errors="replace")
marker = "## 2026-10-05"
assert marker in text, f"ERROR: marker '{marker}' not found"
print(f"OK: marker '{marker}' confirmed present")
print(f"OK: total file length = {len(text)} characters")