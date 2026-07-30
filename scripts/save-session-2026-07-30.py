#!/usr/bin/env python3
"""Append today's session to user dialog record and dev record files."""
import sys

USER_DIALOG_PATH = r"C:\Users\Laptop\Desktop\Church-Site\用户对话记录.txt"
DEV_RECORD_PATH = r"C:\Users\Laptop\Desktop\Church-Site\开发记录.txt"

USER_DIALOG_APPEND = """
=====================================
用户对话记录 - Church Site 项目
更新时间: 2026-07-30 20:11 SAST
=====================================

--- 对话 18 (今天 20:03) --- 新一轮内容添加

【用户提问】
读取历史对话记录开发记录，然后再增加一些适当的文章内容，要求文章要有价值，不要泛泛而谈 不要general talking， 要面向针对南非本地群体的，而且文章内容严格遵守圣经，不要随意添加自己的理解

【我的回答】
理解了。我先读取了：
1. 用户对话记录.txt（涵盖 2026-06 到 2026-07-25 所有对话）
2. 开发记录.md / 开发记录.txt（涵盖 6 个开发会话 + Phase 12 反技术债架构）
3. 项目现有的 src/content/posts/ 中的 30+ 篇文章

从对话历史看到用户要求：
- 高价值干货、不泛泛而谈
- 100% 面向南非本地（Jozi / Sandton / Soweto / Pretoria）
- 避开教义争议（不涉及预定论、灵恩、末世论、成功神学）
- 严格遵守圣经、不随意添加自己的理解

我盘点已有 30+ 篇文章的话题，确认 5 个全新方向（不与已有重复）：

1. **Hospital Beds, Prayer, and the Long Wait** — 南非医院探望病人的圣经指南（独特 SA 痛点）
2. **Raising Children in Faith Across Two Languages** — 南非双语/多语家庭的信仰传承
3. **Forgiveness in a Country That Has Not Forgotten** — 历史的沉重 + 圣经宽恕观
4. **How to Recognise a False Teacher** — 南非宗教市场环境下的辨别指引（明确反对成功神学）
5. **Passing the Faith to the Next Generation** — Titus 2 代际门训模型

每篇：
- ~3500-4500 词
- 大量圣经经文（每篇 8-12 处 direct quote + citation）
- 真实南非地点（Baragwanath、Charlotte Maxeke、Parkmore、Soweto、Sandton）
- 实用实践 + 经文应用
- 无个人发挥、不添加未经圣经支持的教导

【完成】
- 5 篇 markdown 写好（src/content/posts/）
- 5 个新 slug 添加到 src/pages/blog/[slug].astro 的 getStaticPaths
- 5 个字典条目添加到 src/pages/blog/[slug].astro 的 posts 字典
- 5 个新 URL 添加到 src/pages/sitemap.xml.ts
- sitemap.xml.ts 的 now 常量从 2026-07-03 改为 2026-07-30
- Build: 278 pages, 0 errors, 0 warnings
- 自动归类到 sa-local band
- Git commit 97563ac + push origin/master
- Cloudflare Pages 部署完成：https://1586f4c9.joburgchurch.pages.dev

=====================================
文件结束
=====================================
"""

DEV_RECORD_APPEND = """
=====================================
开发记录 12: 5 篇南非本地化高价值博客（2026-07-30）
=====================================

【开始时间】2026-07-30 20:03
【结束时间】2026-07-30 20:11

【需求】
延续 2026-07-21 和 2026-07-25 的两批内容任务，添加第三批 5 篇全新的高价值本地化、非争议性「干货」博客：
- 高价值，不泛泛而谈
- 100% 面向南非本地群体
- 严格遵守圣经，不随意添加个人理解

【话题选择原则】
- 100% 本地化（Jozi / Sandton / Soweto / Charlotte Maxeke / Baragwanath 等真实地点）
- 避开教义争议
- 与已有 30+ 篇文章话题不重复
- 大量 direct scripture citation，每篇 8-12 处经文
- 严格基于圣经文本，不添加未经圣经支持的教导

【5 篇新博客】

1. **Hospital Beds, Prayer, and the Long Wait: A South African Christian's Guide to Visiting the Sick**
   - slug: hospital-visit-south-africa-christian
   - 主题：南非医院独特场景（Baragwanath casualty、Charlotte Maxeke 走廊、Netcare Sandton、家庭送餐）+ 圣经探望病人教导
   - 核心经文：Matt 25:36, James 5:14-15, Mark 1:30-31, Acts 9:36-43, Luke 10:30-35, 2 Tim 1:7, Job 2:13, Rom 8:26
   - 长度：~4000 字
   - 自动归类：sa-local band

2. **Raising Children in Faith Across Two Languages: A South African Parent's Guide**
   - slug: raising-children-faith-multilingual-south-africa
   - 主题：南非 11 种官方语言现实下，双语/多语家庭的信仰传承（家庭语言作为祈祷语言、祖父母作用、双圣经等）
   - 核心经文：Deut 6:6-7, Psalm 78:4-7, Prov 22:6, 2 Tim 3:14-15, Eph 6:4, Psalm 22:3, 1 Cor 14:15
   - 长度：~4500 字
   - 自动归类：sa-local band

3. **Forgiveness in a Country That Has Not Forgotten: A South African Christian's Honest Conversation**
   - slug: forgiveness-south-africa-historical-weight
   - 主题：南非独特历史背景下的圣经宽恕观（明确区分宽恕与忘记、与和解、与公义的关系）
   - 核心经文：Matt 18:21-22, Eph 4:32, Col 3:13, Matt 6:14-15, Luke 23:34, Acts 7:60, Psalm 137, Micah 6:8, Luke 19:8, James 5:16, Matt 5:44, 1 Tim 5:1-2
   - 长度：~5000 字
   - 自动归类：sa-local band

4. **How to Recognise a False Teacher: A South African Christian's Biblical Guide**
   - slug: discerning-false-teachers-south-africa
   - 主题：南非宗教市场环境下辨别假师傅的 7 个圣经标记（明确反对成功神学）
   - 核心经文：Matt 7:15-20, 1 John 4:1, 2 Tim 4:3-4, 2 Cor 11:13-15, 2 Peter 2:1-3, Gal 1:8-9, Acts 17:11, 1 Thess 5:21, Matt 24:4-5, James 1:27, Heb 13:17, Matt 10:16
   - 长度：~5000 字
   - 自动归类：sa-local band

5. **Passing the Faith to the Next Generation: A Biblical Model for South African Families and Churches**
   - slug: intergenerational-discipleship-south-africa
   - 主题：Titus 2 代际门训模型在南非家庭和教会的应用
   - 核心经文：Titus 2:1-8, 2 Tim 2:2, Deut 6:6-7, Psalm 71:18, 1 Tim 5:1-2, 1 Peter 5:5, Prov 20:29
   - 长度：~5000 字
   - 自动归类：sa-local band

【实施步骤】
1. 读取所有历史对话和开发记录（用户对话记录.txt + 开发记录.txt + 开发记录.md）
2. 检查 src/content/posts/ 已有 30+ 篇文章避免重复
3. 选择 5 个全新方向
4. 为每篇创建 markdown 文件（完整 frontmatter + 3500-5000 词正文）
5. 更新 src/pages/blog/[slug].astro 的 posts[] 字典（5 个新条目）
6. 更新 src/pages/blog/[slug].astro 的 getStaticPaths()（5 个新 slug）
7. 更新 src/pages/sitemap.xml.ts（5 个新 URL + now 常量改为 2026-07-30）

【修改文件】
- src/content/posts/hospital-visit-south-africa-christian.md（NEW）
- src/content/posts/raising-children-faith-multilingual-south-africa.md（NEW）
- src/content/posts/forgiveness-south-africa-historical-weight.md（NEW）
- src/content/posts/discerning-false-teachers-south-africa.md（NEW）
- src/content/posts/intergenerational-discipleship-south-africa.md（NEW）
- src/pages/blog/[slug].astro（修改：添加 5 个 slug + 5 个字典条目）
- src/pages/sitemap.xml.ts（修改：添加 5 个 URL + 更新 now 常量）

【架构原则遵循】
- 数据写入 src/content/posts/*.md → 通过 lib/modules/blog.ts 的 listBlogPosts() 自动显示
- Astro build 自动读取 markdown frontmatter，验证 Zod schema（src/content/config.ts）
- 新内容自动归类到正确的 BlogBand（sa-local）
- 无新增模块、无破坏性 schema 变更、无新概念发明
- 5 篇博客全部用 Markdown 格式，符合现有博客风格
- detail 页内容仍然通过 posts[] 字典（不读 markdown 正文）—— 保持向后兼容

【内容质量保证】
- 严格基于圣经：每篇 8-12 处直接经文引用 + 出处
- 不添加未经圣经支持的教导：所有 practice 都引用具体经文
- 不涉及教义争议：避开预定论、灵恩、末世论、成功神学、教派分歧
- 明确反对成功神学（discerning-false-teachers 一篇用 7 个圣经标记明确批判）
- 真实本地化：南非医院名称（Baragwanath、Charlotte Maxeke、Netcare Sandton）、真实地点（Parkmore、Soweto）、真实文化背景（Ubuntu、TRC、11 种官方语言）

【验证结果】
- Build: 0 errors, 0 warnings, 0 invalid content
- 278 个页面（之前 273 + 5 新博客）
- Blog index 自动按 5 个 band 分组显示新文章
  - Devotionals & Reflections (2)
  - South African Life & Faith (22)  ← 5 篇新文章都归入此 band
  - For Beginners (1)
  - Pastoral Reflections (1)
  - Hymns & Worship (10)
- Sitemap 包含 5 个新 URL（lastmod 2026-07-30）
- 已有 30+ 篇文章保持正常显示

【与 Phase 12 架构的关系】
- 完全复用 lib/modules/blog.ts 的 listBlogPosts() 接口
- 零新增模块、零硬编码、零破坏性 schema 变更
- 符合 Anti-Design-Debt 全部 10 条硬约束
- Markdown frontmatter 自动通过 Zod 校验

【Git Commits】
- 97563ac feat(blog): 5 new SA-localised posts (hospital, multilingual parenting, forgiveness, discernment, intergenerational)

【部署结果】
- ✅ GitHub: 97563ac 已推送到 origin/master
- ✅ Cloudflare Pages: 278 pages 部署成功
- ✅ Live: https://1586f4c9.joburgchurch.pages.dev
- ✅ 主域名通过 alias 自动更新到 https://joburgchurch.co.za

=====================================
本次保存内容结束
=====================================
"""

with open(USER_DIALOG_PATH, 'a', encoding='utf-8') as f:
    f.write(USER_DIALOG_APPEND)
print(f"Appended to {USER_DIALOG_PATH}")

with open(DEV_RECORD_PATH, 'a', encoding='utf-8') as f:
    f.write(DEV_RECORD_APPEND)
print(f"Appended to {DEV_RECORD_PATH}")