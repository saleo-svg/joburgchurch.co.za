import re
with open(r'src\pages\privacy.astro', 'r', encoding='utf-8') as f:
    c = f.read()

# Find wa.me/27774871295 anchor
m = re.search(r'<a href="https://wa\.me/27774871295"', c)
print('Anchor at:', m.start() if m else None)
if m:
    print(repr(c[max(0, m.start()-200):m.end()+50]))

# Find <p indent
print('\n=== <p> pattern ===')
m2 = re.search(r'^(\s*)<p[^>]*>', c, re.MULTILINE)
print('<p indent:', repr(m2.group(1)) if m2 else None)
