text = open('src/pages/sitemap.xml.ts', encoding='utf-8').read()
import re
slugs = [
    'anxiety-and-the-south-african-christian',
    'online-bible-study-discipline-in-2026',
    'christian-and-the-2026-south-african-budget',
    'marriage-after-the-honeymoon-johannesburg',
    'the-christian-mother-of-young-adults-johannesburg',
]
for slug in slugs:
    text = re.sub(
        r"url: '/blog/" + re.escape(slug) + r"/',\s*lastmod:\s*'2026-10-10'",
        f"url: '/blog/{slug}/', lastmod: 'DRAFT-2026-10-10'",
        text
    )
open('src/pages/sitemap.xml.ts', 'w', encoding='utf-8').write(text)
# verify
import subprocess
result = subprocess.run(['grep', '-c', 'DRAFT-2026', 'src/pages/sitemap.xml.ts'], capture_output=True, text=True)
print(f"DRAFT-2026 count: {result.stdout.strip()}")
