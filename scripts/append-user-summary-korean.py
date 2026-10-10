# -*- coding: utf-8 -*-
"""Append 2026-10-01 Korean class fee user conversation summary."""

content = """

---

## 2026-10-01 对话记录：Korean class 收费化改动

### 用户原始请求
> https://joburgchurch.co.za/community-classes/korean/
> 你读取一下我所有的开发记录。我最近不是让你把 Korean class 所有关于"免费"的内容都去掉吗？
> 我之前写错了，以为是免费的，但是该教会组织告诉我其实不是免费的。这导致很多人一直拿这个网站的截图跟我们要免费课程，但实际上我们是没有免费的。
> 现在你要把所有关于免费韩国课程的内容都改掉，把"免费"去掉，好吧。

### 用户核心痛点
1. 网站之前将 Korean class 描述为"免费"(free)，导致访客截图投诉要求免费课程
2. 教会组织告知 Korean class 实际是**收费课程**，并非免费
3. Bible study 保持免费，但 Korean class 必须标明是收费
4. 要求系统化移除所有"免费"相关描述

### 已确认策略（用户交互选择）
- 定价策略：standard-course-fee (A course fee applies, contact us)
- 时间：保持 3:00pm (keep-3pm)
- URL：保留并解释 (keep-both-redirect-free)
- Blog slug：重命名 + 301 redirect (rename-redirect)

### 实施完成项
- 25+ 个页面文件已修改
- Schema.org Course isAccessibleForFree: true -> false
- 301 redirect /blog/free-korean-class-community/ -> /blog/korean-class-community/
- /free-korean-class-johannesburg/ 页面保留 URL + 改写内容说明收费
- 构建通过：330 pages, 0 errors
"""

from pathlib import Path

ROOT = Path(r"C:\Users\Laptop\Desktop\Church-Site")
p = ROOT / "用户对话汇总.md"
with open(p, "a", encoding="utf-8") as f:
    f.write(content)
print(f"appended, new size: {p.stat().st_size:,} bytes")
