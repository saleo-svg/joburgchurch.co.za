"""
Process special pages that were in skip list but do have WhatsApp buttons:
- locations/[slug].astro (dynamic)
- community-classes/index.astro
- blog/index.astro
- index.astro (home page)

These files use the inline small-button style (px-2 py-0.5 or px-2 py-1).
"""
import re
from pathlib import Path

PAGES_DIR = Path(r"C:\Users\Laptop\Desktop\Church-Site\src\pages")

SVG_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'


def find_existing_wa_blocks(content: str) -> list[dict]:
    blocks = []
    pattern = re.compile(
        r'(?P<full><a\s+href="https://wa\.me/(?P<num>27774871295|27674424461)"[^>]*?class="(?P<cls>[^"]+)"[^>]*>\s*'
        r'<svg class="(?P<svg_size>w-\d+\s+h-\d+)"[^>]*><path[^/]*/></svg>\s*'
        r'(?P<label>WhatsApp[^<]*)'
        r'\s*</a>)',
        re.DOTALL,
    )
    for m in pattern.finditer(content):
        blocks.append({
            "start": m.start(),
            "end": m.end(),
            "full": m.group("full"),
            "num": m.group("num"),
            "cls": m.group("cls"),
            "svg_size": m.group("svg_size"),
            "label": m.group("label"),
        })
    return blocks


def get_line_indent(content: str, pos: int) -> str:
    line_start = content.rfind('\n', 0, pos) + 1
    line = content[line_start:content.find('\n', pos)]
    return line[:len(line) - len(line.lstrip())]


def make_leo_block(block: dict, indent: str) -> str:
    cls = block["cls"]
    svg_size = block["svg_size"]
    label = "WhatsApp Mr. Leo" if ("Mr. Sim" in block["label"] or "Ms. Dora" in block["label"]) else "WhatsApp"
    return (
        f'{indent}<a href="https://wa.me/27792592607" target="_blank" rel="noopener noreferrer" '
        f'class="{cls}">\n'
        f'{indent}  <svg class="{svg_size}" fill="currentColor" viewBox="0 0 24 24"><path d="{SVG_PATH}"/></svg>\n'
        f'{indent}  {label}\n'
        f'{indent}</a>'
    )


def add_mr_leo(content: str) -> tuple[str, int]:
    blocks = find_existing_wa_blocks(content)
    if not blocks:
        return content, 0
    if "27792592607" in content:
        return content, 0
    inserted = 0
    for block in reversed(blocks):
        indent = get_line_indent(content, block["start"])
        leo_block = make_leo_block(block, indent)
        insertion_point = block["end"]
        content = content[:insertion_point] + "\n" + leo_block + content[insertion_point:]
        inserted += 1
    return content, inserted


TARGETS = [
    "locations/[slug].astro",
    "community-classes/index.astro",
    "blog/index.astro",
    "index.astro",
]

for name in TARGETS:
    filepath = PAGES_DIR / name
    if not filepath.exists():
        print(f"NOT FOUND: {name}")
        continue
    content = filepath.read_text(encoding="utf-8")
    if "27792592607" in content:
        print(f"SKIP (already): {name}")
        continue
    new_content, count = add_mr_leo(content)
    if count == 0:
        print(f"NO MATCH: {name}")
        continue
    filepath.write_text(new_content, encoding="utf-8")
    print(f"OK (inserted {count}): {name}")
