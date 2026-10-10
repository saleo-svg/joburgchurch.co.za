text = open(r'src\pages\sitemap.xml.ts', encoding='utf-8').read()
idx = text.find("anxiety-and-the-south-african-christian")
print("SITEMAP:", repr(text[idx:idx+150]))

print()
md = open(r'src/content/posts/anxiety-and-the-south-african-christian.md', encoding='utf-8').read()
print("MD frontmatter:")
print(md[:200])
