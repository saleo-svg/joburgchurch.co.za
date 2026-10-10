text = open(r'src\pages\sitemap.xml.ts', encoding='utf-8').read()
# Find "small-church-vs-mega-church" and show 30 chars after
idx = text.find("small-church-vs-mega-church")
print(f"idx: {idx}")
# Look for "  ];" after that
for i in range(idx, min(idx+200, len(text))):
    if text[i:i+4] == "  ];":
        print(f"  '];' at {i}")
        print(f"  context: {repr(text[i-30:i+10])}")
        break
