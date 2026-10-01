"""
Append Phase 14 entry to 开发记录.txt as binary.
Reads the existing file in binary mode (preserves mixed encoding),
appends UTF-8 content for the new entry.
"""
from pathlib import Path

TARGET = Path(r"C:\Users\Laptop\Desktop\Church-Site\开发记录.txt")

new_entry = """

=====================================
开发记录 15: 10 篇新博客 (5 英文 + 5 中文) (2026-10-01)
=====================================

【开始时间】2026-10-01 17:29 SAST
【结束时间】2026-10-01 17:50 SAST

【需求】
延续前几轮 (07-21 / 07-25 / 07-30 / 09-20 / 09-27 / 09-30) 的批量内容任务,
添加第六批 10 篇全新的高价值本地化、非争议性博客:
- 5 篇英文 SA-local 文章(面向南非本地基督徒)
- 5 篇中文文章(面向南非华人基督徒不同群体)

【主题选择原则】
- 100% 本地化 (Jozi / Sandton / Parkmore / Pretoria / Cape Town / Durban 等真实地点)
- 避开教义争议 (不涉及预定论、灵恩、末世论、成功神学、教派分歧)
- 与已有 60+ 篇文章话题不重复
- 严格基于圣经文本

【10 篇新博客】

英文 (5) - 自动归类 sa-local band:

1. diwali-festival-south-africa-christian-neighbour
   主题: Diwali 节期 + 基督徒与印度邻居跨信仰友谊
   长度: ~4500 词 / 8 处直接经文引用
   核心经文: Lev 19:34, Deut 10:18-19, Ruth 1:16, Luke 10:33-34,
              Matt 5:44, Rom 12:18, 1 Pet 3:15, Acts 17:26-27

2. johannesburg-water-crisis-faith-day-zero-memories
   主题: Jozi 水危机 / Day Zero 阴影,信仰回应
   长度: ~5000 词 / 18 处经文引用
   核心经文: Gen 1:2, 1:6-7, 2:10, 9:11, Ex 14:21-22, Num 20:11,
              Deut 11:11-12, 1 Kings 18:41-45, Ps 147:8, Isa 55:10-11,
              John 4:14, 7:38, Rev 22:1, Deut 28:23-24, 1 Kings 17:1,
              Ps 32:4, Jer 14:1-6, Hag 1:10-11

3. south-african-braai-and-the-table-grace
   主题: 南非 braai 文化 + 餐桌上的恩典
   长度: ~4800 词 / 16 处经文引用
   核心经文: Gen 18:1-8, Luke 24:30-31, Acts 2:46-47, Luke 14:15,
              Rev 3:20, 1 Cor 10:16-17, Gen 9:3, 1 Tim 4:4-5,
              Rom 14:2-3, Rom 12:13, 1 Pet 4:9, Heb 13:2,
              Lev 19:34, Deut 6:6-7, Ex 12:26-27, Prov 22:6

4. retirement-village-faith-johannesburg-elderly
   主题: 退休村/养老院中的信仰生活 (与 caring-aging-parents 区分)
   长度: ~5000 词 / 24 处经文引用
   核心经文: Lev 19:32, Ps 71:9, 71:18, Prov 16:31, 20:29,
              Isa 46:4, Titus 2:2-4, Job 12:12, Gen 12:1, Josh 1:9,
              Heb 13:14, Phil 3:13-14, Ps 25:16, 68:6, Isa 41:10,
              John 14:18, Ps 23:4, Ex 20:12, Eph 6:2-3,
              1 Tim 5:4, 5:8, 2 Tim 4:6-8, Phil 1:21, Rev 14:13

5. returning-to-church-after-long-absence-johannesburg
   主题: 长时间未去教会后回归教会的真实挣扎
   长度: ~5000 词 / 24 处经文引用
   核心经文: Luke 15:18-20, Hos 14:1, Joel 2:12-13, Jer 31:18-19,
              James 4:8, 1 John 1:9, Isa 54:4, Rom 8:1, Heb 12:1-2,
              Ps 103:12, 1 John 3:20-21, Rom 15:7, Gal 6:1-2,
              2 Cor 2:7-8, Matt 9:13, Matt 18:6, Luke 17:1-2,
              Rom 12:19, Heb 12:15, 2 Cor 1:3-4, Ps 34:18, 147:3,
              Matt 11:28-30

中文 (5) - 仅 Mr Leo 联系方式:

6. nanfei-liuxuesheng-jidutuan-shenghuo
   主题: 在南非的中国留学生基督徒生活
   长度: ~4500 词

7. nanfei-waipai-zinv-jidutuan-jiaoyu
   主题: 在南非的外派子女基督徒教育与信仰传承
   长度: ~4500 词

8. nanfei-danshen-fumu-jidutuan-yangyu
   主题: 在南非的单身基督徒父母独自抚养孩子
   长度: ~5000 词

9. nanfei-yuancheng-bangong-xinyang-jidutuan
   主题: 在南非远程办公的基督徒华人
   长度: ~4500 词

10. nanfei-zhongzi-qiye-jidutuan-zhiye
    主题: 在南非中资企业基督徒如何在企业环境中作见证
    长度: ~5000 词

【实施步骤】
1. 读取所有开发记录(开发记录.md + 开发记录.txt)
2. 检查现有 60+ 篇 posts 文件夹,避免主题重复
3. 选择 10 个全新方向(5 英文 + 5 中文)
4. 为每篇创建 markdown 文件(含完整 frontmatter + 4000-5000 词正文)
5. 编写 Python 脚本 scripts/add-october-posts.py
   - 解析每篇 markdown 的 body
   - 转换为 inline HTML(## -> <h2>, **bold** -> <strong>, *italic* -> <em>)
   - 注入到 blog/[slug].astro 的 posts 字典
6. blog/[slug].astro 添加 10 个 getStaticPaths 条目
7. sitemap.xml.ts 添加 10 个 URL,now 改为 2026-10-01
8. npx astro build (跳过 build:hymns 因 docx 文件锁)
9. 验证 320 pages built, 0 errors

【修改文件】
- src/content/posts/diwali-festival-south-africa-christian-neighbour.md (NEW)
- src/content/posts/johannesburg-water-crisis-faith-day-zero-memories.md (NEW)
- src/content/posts/south-african-braai-and-the-table-grace.md (NEW)
- src/content/posts/retirement-village-faith-johannesburg-elderly.md (NEW)
- src/content/posts/returning-to-church-after-long-absence-johannesburg.md (NEW)
- src/content/posts/nanfei-liuxuesheng-jidutuan-shenghuo.md (NEW)
- src/content/posts/nanfei-waipai-zinv-jidutuan-jiaoyu.md (NEW)
- src/content/posts/nanfei-danshen-fumu-jidutuan-yangyu.md (NEW)
- src/content/posts/nanfei-yuancheng-bangong-xinyang-jidutuan.md (NEW)
- src/content/posts/nanfei-zhongzi-qiye-jidutuan-zhiye.md (NEW)
- src/pages/blog/[slug].astro (+10 slug + 10 posts dict)
- src/pages/sitemap.xml.ts (+10 URL + now=2026-10-01)
- scripts/add-october-posts.py (NEW: posts dict automation)
- scripts/append-dev-log-october.py (NEW: dev log appender)
- 开发记录.md (Phase 14 appended)
- 开发记录.txt (this entry)

【架构原则遵循】
- 完全复用 lib/modules/blog.ts 的 listBlogPosts() 接口
- 零新增模块、零硬编码、零破坏性 schema 变更
- 符合 Anti-Design-Debt 全部 10 条硬约束
- Markdown frontmatter 自动通过 Zod 校验
- blog index 自动通过 bandOf() 归类(5 英文文章自动归 sa-local band)
- 与已有 60+ 篇 SA-local 文章并存

【内容质量保证】
- 严格基于圣经:每篇 6-24 处直接经文引用 + 出处
- 不添加未经圣经支持的教导
- 不涉及教义争议
- 真实本地化:Sandton, Parkmore, Randburg, Midrand, Soweto, Pretoria, Cape Town, Durban, WITS, UJ
- 真实文化:braai, jacarandas, Day Zero, Diwali, heritage, load-shedding
- Mr Leo 永久规则:5 篇中文文章仅含 Mr Leo WhatsApp 联系方式

【关键架构决定】
- blog INDEX: lib/modules/blog.ts 的 listBlogPosts(), 从 astro:content 读取 markdown frontmatter
- blog DETAIL: [slug].astro 的 posts 字典(Markdown + Astro content collection 后置 fallback)
- 每篇博客必须既有 markdown 文件,又在 posts 字典中
- 自动化脚本 add-october-posts.py 从 markdown 解析 body 转 inline HTML,注入 posts 字典

【验证结果】
- Build: 320 pages built in 37.63s
- 0 errors, 0 warnings
- 10 个新页面(5 英文 + 5 中文)全部在 dist/blog/ 正确生成
- Blog index 自动列出 10 个新 slug
- Sitemap 包含 10 个新 URL(lastmod 2026-10-01)
- 已有 60+ 篇文章保持正常显示

【下一步】
- 用户指示 commit + push + Cloudflare Pages deploy
- 在线验证 10 篇博客在 https://joburgchurch.co.za/blog/ 可访问

=====================================
本次保存内容结束
=====================================

"""

new_bytes = new_entry.encode("utf-8")
existing = TARGET.read_bytes()
with TARGET.open("wb") as f:
    f.write(existing)
    f.write(new_bytes)
print(f"OK - 开发记录.txt updated (appended {len(new_bytes)} bytes UTF-8)")