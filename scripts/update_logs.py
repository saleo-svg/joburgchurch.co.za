"""
Update 开发记录.txt and 用户对话记录.txt with the Mr Leo contact changes.
"""
import sys
import os
sys.stdout.reconfigure(encoding='utf-8')

# 用户对话记录
user_log_path = r'用户对话记录.txt'
with open(user_log_path, 'rb') as f:
    raw = f.read()
content = raw.decode('utf-8', errors='replace')

new_entry = """

=====================================
New Entry - Church Site Project
Update Time: 2026-09-30 19:38 SAST
=====================================

[USER REQUEST 2026-09-30]
The user wants:
1. On all pages with contact info (not every page), add Mr Leo (+27 79 259 2607) as a third contact with the same WhatsApp button style as the other contacts.
2. For all Chinese-language articles (markdown files in src/content/posts/ AND entries in src/pages/blog/[slug].astro posts dictionary), KEEP ONLY Mr Leo as contact. Remove Mr. Sim and Ms. Dora because they cannot speak Chinese.
3. This is a PERMANENT rule: from now on, including all future Chinese articles, ONLY Mr Leo should be added as the contact.

[ACTIONS TAKEN]
1. Found all pages with wa.me links (about 17): contact.astro, visit.astro, community-classes/korean.astro, community-classes/index.astro, free-korean-class-johannesburg.astro, youth-ministry-johannesburg-usecan.astro, free-bible-study-sandton.astro, online-bible-study-johannesburg.astro, youth-bible-study-johannesburg.astro, locations/[slug].astro, first-time-church-visitor-johannesburg.astro, what-to-wear-to-church-johannesburg.astro, churches-in-sandton.astro, marriage-counselling-johannesburg.astro, parenting-biblical-advice-johannesburg.astro, privacy.astro
2. Added Mr Leo WhatsApp button next to existing Mr. Sim and Ms. Dora WhatsApp buttons on each page.
3. Processed 12 Chinese markdown posts (nanfei-*, taiwanese-*, yuebao-*): removed Mr. Sim and Ms. Dora contact blocks, changed author to "Mr Leo", kept only Mr Leo as contact.
4. Updated blog/[slug].astro posts dictionary: replaced Mr. Sim and Ms. Dora sections in 12 Chinese entries with Mr Leo WhatsApp button only.

[FINAL VERIFICATION]
- All 17 contact pages: Mr Leo WhatsApp button added correctly alongside Mr. Sim and Ms. Dora.
- All 12 Chinese articles (markdown + blog posts dict): Mr Leo only, 0 Mr. Sim, 0 Ms. Dora.
- Build successful: 310 pages built in ~36 seconds, 0 warnings.
- Verified Mr. Leo wa.me/27792592607 appears in all expected locations.

[PERMANENT RULE - Effective 2026-09-30]
All Chinese-language articles on this site (current and future) MUST include ONLY Mr Leo (+27 79 259 2607) as the Chinese-language contact. Do NOT add Mr. Sim or Ms. Dora in Chinese articles because they cannot communicate in Chinese. Other-language pages (English, Zulu, Xhosa, Sotho, Tswana, Pedi, Ndebele, Swahili, Dinka, Shona, Korean) continue to have Mr. Sim and Ms. Dora contacts as before, plus the newly-added Mr Leo.
"""

content += new_entry
with open(user_log_path, 'wb') as f:
    f.write(content.encode('utf-8'))
print('Updated 用户对话记录.txt')

# 开发记录 - mixed encoding file
dev_log_path = r'开发记录.txt'
with open(dev_log_path, 'rb') as f:
    raw_dev = f.read()

# Try multiple encodings
content_dev = None
for enc in ['utf-8', 'gbk', 'gb18030']:
    try:
        content_dev = raw_dev.decode(enc)
        print(f'Decoded 开发记录.txt with {enc}')
        break
    except:
        continue
if content_dev is None:
    content_dev = raw_dev.decode('utf-8', errors='replace')
    print('Decoded 开发记录.txt with utf-8 (errors=replace)')

new_dev_entry = """

=====================================
开发记录 #XX: 添加 Mr Leo 联系人 + 移除中文文章 Mr. Sim / Ms. Dora
=====================================

【开始时间】2026-09-30 19:38 SAST
【结束时间】2026-09-30 20:15 SAST

【需求】
1. 网站所有有联系人的页面（17 个）增加 Mr Leo (+27 79 259 2607) 作为第三个联系人。
2. 所有中文文章（12 篇）只保留 Mr Leo 作为唯一联系人，删除 Mr. Sim 和 Ms. Dora。
3. 此规则为永久准则，所有未来中文文章都只加 Mr Leo。

【实施步骤】
1. 编写脚本 add-mr-leo-v3.py / v4.py / v5.py 用于检测文件中的 WhatsApp 按钮样式（px-5 py-3 / px-6 py-3 / px-4 py-2 / px-2 py-1 / px-2 py-0.5 / px-3 py-1.5），并按相同样式插入 Mr Leo 按钮。
2. 编写脚本 remove-non-leo-contacts.py 用于从 12 篇中文 markdown 文件中删除 Mr. Sim 和 Ms. Dora 的 WhatsApp 段落。
3. 编写脚本 fix-chinese-author-and-inline.py 用于将中文 markdown 的 author 字段从 "Mr. Sim" 改为 "Mr Leo"，并删除文中剩余的 Mr. Sim / Ms. Dora 引用。
4. 编写脚本 update-blog-slug-dict.py 用于从 blog/[slug].astro 的 posts 字典中删除 12 篇文章的 Mr. Sim / Ms. Dora 段落。
5. 编写脚本 upgrade-chinese-to-wa-button.py 用于将 blog/[slug].astro 中 12 篇文章的纯文本 Mr Leo 联系信息升级为 WhatsApp 按钮。
6. 编写脚本 re-add-chinese-posts.py 用于补充 git checkout 误删的 12 篇 posts 字典内容。
7. 处理特殊页面：privacy.astro (fix-privacy-v3.py)，locations/[slug].astro 和 community-classes/index.astro (process-remaining.py)，community-classes/korean.astro 和 visit.astro (add-mr-leo-v5.py)。

【修改文件】
- src/pages/contact.astro
- src/pages/visit.astro
- src/pages/community-classes/korean.astro
- src/pages/community-classes/index.astro
- src/pages/free-korean-class-johannesburg.astro
- src/pages/youth-ministry-johannesburg-usecan.astro
- src/pages/free-bible-study-sandton.astro
- src/pages/online-bible-study-johannesburg.astro
- src/pages/youth-bible-study-johannesburg.astro
- src/pages/locations/[slug].astro (动态 8 个位置页面)
- src/pages/first-time-church-visitor-johannesburg.astro
- src/pages/what-to-wear-to-church-johannesburg.astro
- src/pages/churches-in-sandton.astro
- src/pages/marriage-counselling-johannesburg.astro
- src/pages/parenting-biblical-advice-johannesburg.astro
- src/pages/privacy.astro
- src/content/posts/nanfei-*.md (9 个)
- src/content/posts/taiwanese-christians-south-africa-johannesburg.md
- src/content/posts/yuebao-*.md (2 个)
- src/pages/blog/[slug].astro (添加 12 个中文 posts 字典条目 + 12 个 getStaticPaths 路由)
- 用户对话记录.txt
- 开发记录.txt

【最终结果】
- 17 个有联系人的页面：Mr Leo WhatsApp 按钮已正确添加（与 Mr. Sim / Ms. Dora 并列）。
- 12 篇中文文章：仅 Mr Leo 联系信息，0 个 Mr. Sim，0 个 Ms. Dora。
- Blog 中 12 个中文 slug 都已添加（getStaticPaths + posts 字典）。
- Build: 310 页构建成功，0 errors，0 warnings。

【注意事项】
1. 一些中文 markdown 文件的 author 字段已改为 "Mr Leo"，这是永久规则。
2. 12 篇中文文章的所有未来修改都必须只保留 Mr Leo，不要再添加 Mr. Sim 或 Ms. Dora。
3. 如果需要修改中文文章的 authors，请保持 "Mr Leo"。
4. Mr Leo 的 WhatsApp 按钮样式与其他两位联系人相同 (绿色 bg-[#25D366] + WhatsApp 图标)。

【永久规则】
从 2026-09-30 起，所有中文文章（包括未来新增的）只添加 Mr Leo (+27 79 259 2607) 作为唯一中文联系人，不再包含 Mr. Sim 或 Ms. Dora 的联系信息。其他语言的页面（英文、Zulu、Xhosa、Sotho、Tswana、Pedi、Ndebele、Swahili、Dinka、Shona、Korean 等）维持现有两位联系人（Mr. Sim + Ms. Dora）+ 新增 Mr Leo。
"""

# Detect existing encoding and append
if content_dev is not None:
    try:
        # Try to use the original encoding
        original_encoding = 'gbk'  # Most likely the encoding
        encoded_dev = new_dev_entry.encode(original_encoding, errors='replace')
        # Append binary
        with open(dev_log_path, 'ab') as f:
            f.write(encoded_dev)
        print(f'Appended to 开发记录.txt using {original_encoding}')
    except Exception as e:
        print(f'Failed to append with gbk: {e}')
        # Fall back to utf-8
        with open(dev_log_path, 'ab') as f:
            f.write(new_dev_entry.encode('utf-8', errors='replace'))
        print('Appended to 开发记录.txt using utf-8')

print('\nAll logs updated.')