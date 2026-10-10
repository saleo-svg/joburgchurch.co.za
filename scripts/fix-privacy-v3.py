"""
Fix privacy.astro: add Mr Leo WhatsApp button.

The structure has Mr. Sim WhatsApp anchor followed by '. </p>'.
"""
import re
from pathlib import Path

PAGES_DIR = Path(r"C:\Users\Laptop\Desktop\Church-Site\src\pages")

SVG_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'


target = PAGES_DIR / "privacy.astro"
content = target.read_text(encoding="utf-8")

if "27792592607" in content:
    print("SKIP")
    raise SystemExit(0)

# Find the wa.me/27774871295 anchor + closing </p>
pattern = re.compile(
    r'(<a href="https://wa\.me/27774871295"[^>]*>\s*(?:.*?\n)*?\s*</a>[.\s]*?\n\s*</p>)',
    re.DOTALL,
)

# Find <p> indent
m_p = re.search(r'^(\s*)<p[^>]*>', content, re.MULTILINE)
if m_p:
    p_indent = m_p.group(1)
else:
    p_indent = "        "
inner_indent = p_indent + "  "

leo_anchor = (
    f'{inner_indent}<a href="https://wa.me/27792592607" target="_blank" rel="noopener noreferrer" '
    f'class="ml-2 inline-flex items-center gap-1 px-2 py-0.5 bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-semibold rounded transition-colors">\n'
    f'{inner_indent}  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="{SVG_PATH}"/></svg>\n'
    f'{inner_indent}  WhatsApp\n'
    f'{inner_indent}</a>'
)
leo_block = (
    f'\n{p_indent}<p>Mr. Leo: <a href="tel:+27792592607" class="text-blue-600 hover:underline">+27 79 259 2607</a>\n'
    f'{leo_anchor}\n'
    f'{p_indent}</p>'
)

new_content = content
matches = list(pattern.finditer(new_content))
print(f"Found {len(matches)} anchors")

for m in reversed(matches):
    insert_pos = m.end()
    new_content = new_content[:insert_pos] + leo_block + new_content[insert_pos:]

if new_content != content:
    target.write_text(new_content, encoding="utf-8")
    print("FIXED privacy.astro")
else:
    print("NO CHANGE")
