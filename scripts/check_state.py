text = open(r'src\pages\blog\[slug].astro', encoding='utf-8').read()
import re
entries = re.findall(r"^  '([^']+)': \{$", text, re.MULTILINE)
print(f"total posts dict entries: {len(entries)}")
# Sample
drafts_in_pd = [e for e in entries if e in ['anxiety-and-the-south-african-christian', 'the-christian-and-the-ai', 'christian-and-the-farm']]
print(f"sample drafts in pd: {drafts_in_pd}")
# Check the dict close
dict_close_idx = text.find("\n};\n\nconst post = posts[slug];")
print(f"dict close found: {dict_close_idx > 0}")
