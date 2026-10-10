text = open('src/pages/blog/[slug].astro', encoding='utf-8').read()
# count draft entries
import re
matches = re.findall(r"^    \{ params: \{ slug: '([^']+)' \} \},", text, re.MULTILINE)
draft_count = sum(1 for m in matches if not m.startswith('2026'))
print(f"Total getStaticPaths slugs: {len(matches)}")
print(f"First 5: {matches[:5]}")
print(f"Last 5: {matches[-5:]}")
