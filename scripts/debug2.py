import re
with open(r'src\pages\privacy.astro', 'r', encoding='utf-8') as f:
    c = f.read()

# Try simpler pattern
pattern = re.compile(
    r'<a href="https://wa\.me/27774871295"',
)
print('Simple match:', list(pattern.finditer(c))[:3])

# Full pattern
pattern = re.compile(
    r'(<a href="https://wa\.me/27774871295"[^>]*>\s*(?:.*?\n)*?\s*</a>)(\s*\n\s*</p>)',
    re.DOTALL,
)
print('Full match:', list(pattern.finditer(c))[:3])

# Without \s*\n\s*</p>
pattern2 = re.compile(
    r'(<a href="https://wa\.me/27774871295"[^>]*>\s*(?:.*?\n)*?\s*</a>)',
    re.DOTALL,
)
m = pattern2.search(c)
if m:
    print('Anchor found, after-text:', repr(c[m.end():m.end()+100]))
