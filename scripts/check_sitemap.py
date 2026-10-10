text = open('src/pages/sitemap.xml.ts', encoding='utf-8').read()
import re
for slug in ['anxiety-and-the-south-african-christian', 'online-bible-study-discipline-in-2026', 'christian-and-the-2026-south-african-budget', 'marriage-after-the-honeymoon-johannesburg', 'the-christian-mother-of-young-adults-johannesburg']:
    pattern = r"url: '/blog/" + re.escape(slug) + r"/',[^,]+,"
    m = re.search(pattern, text)
    if m: print(slug, '->', m.group(0))
    else: print(slug, '-> NOT FOUND')
