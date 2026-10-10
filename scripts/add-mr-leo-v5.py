"""
Final correct version: Add Mr Leo WhatsApp button to all pages.

Strategy:
1. For files where Mr. Sim and Ms. Dora WhatsApp anchors are inside a <p>...</p>
   block (inline small style), insert a new <p>Mr. Leo...</p> right after the
   Ms. Dora's </p>.
2. For files where anchors are at the same indentation as siblings (medium/big style),
   insert a new anchor right after the last existing wa.me anchor.

We handle both cases.
"""
import re
from pathlib import Path

PAGES_DIR = Path(r"C:\Users\Laptop\Desktop\Church-Site\src\pages")

SVG_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'


def detect_style(content: str) -> str:
    if 'px-5 py-3 bg-[#25D366]' in content:
        return "big5"
    if 'px-6 py-3' in content:
        return "big6"
    if 'px-4 py-2' in content:
        return "medium"
    if 'px-3 py-1.5' in content:
        return "small1.5"
    if 'px-2 py-0.5' in content:
        return "small05"
    if 'px-2 py-1' in content:
        return "small1"
    return "none"


def build_mr_leo_anchor(style: str, indent: str) -> str:
    """Generate a Mr Leo WhatsApp <a> block matching the given style."""
    if style == "big5":
        return (
            f'{indent}<a href="https://wa.me/27792592607" target="_blank" rel="noopener noreferrer"\n'
            f'{indent}  class="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg">\n'
            f'{indent}  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="{SVG_PATH}"/></svg>\n'
            f'{indent}  WhatsApp Mr. Leo\n'
            f'{indent}</a>'
        )
    elif style == "big6":
        return (
            f'{indent}<a href="https://wa.me/27792592607" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] hover:bg-[#20BD5A] px-6 py-3 text-sm font-semibold text-white">\n'
            f'{indent}  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="{SVG_PATH}"/></svg>\n'
            f'{indent}  WhatsApp Mr. Leo\n'
            f'{indent}</a>'
        )
    elif style == "medium":
        return (
            f'{indent}<a href="https://wa.me/27792592607" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#20BD5A] text-white text-sm font-semibold rounded-lg transition-colors">\n'
            f'{indent}  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="{SVG_PATH}"/></svg>\n'
            f'{indent}  WhatsApp Mr. Leo\n'
            f'{indent}</a>'
        )
    elif style == "small1.5":
        return (
            f'{indent}<a href="https://wa.me/27792592607" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 mt-2 px-3 py-1.5 bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-semibold rounded-lg transition-colors">\n'
            f'{indent}  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="{SVG_PATH}"/></svg>\n'
            f'{indent}  WhatsApp Mr. Leo\n'
            f'{indent}</a>'
        )
    elif style == "small05":
        return (
            f'{indent}<a href="https://wa.me/27792592607" target="_blank" rel="noopener noreferrer" class="ml-2 inline-flex items-center gap-1 px-2 py-0.5 bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-semibold rounded transition-colors">\n'
            f'{indent}  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="{SVG_PATH}"/></svg>\n'
            f'{indent}  WhatsApp\n'
            f'{indent}</a>'
        )
    elif style == "small1":
        return (
            f'{indent}<a href="https://wa.me/27792592607" target="_blank" rel="noopener noreferrer" class="ml-2 inline-flex items-center gap-1 px-2 py-1 bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-semibold rounded transition-colors">\n'
            f'{indent}  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="{SVG_PATH}"/></svg>\n'
            f'{indent}  WhatsApp\n'
            f'{indent}</a>'
        )
    return ""


def add_mr_leo_inline(content: str, style: str) -> tuple[str, int]:
    """For inline style files where Mr. Sim/Ms. Dora are in <p>...</p> blocks.

    We insert a new <p>Mr. Leo: ...</p> right after the </p> that closes
    the Ms. Dora block (last contact).
    """
    inserted = 0
    new_content = content

    if "27792592607" in content:
        return content, 0

    # Find each Ms. Dora WhatsApp anchor and the </p> after it
    pattern = re.compile(
        r'(<a href="https://wa\.me/27674424461"[^>]*>\s*(?:.*?\n)*?\s*</a>)(\s*\n\s*</p>)',
        re.DOTALL,
    )

    # Find Ms. Dora <p> indent for the new block
    m_p = re.search(r'^(\s*)<p[^>]*>\s*\n?\s*Ms\. Dora:', content, re.MULTILINE)
    if not m_p:
        return content, 0
    p_indent = m_p.group(1)

    # Build new Mr Leo <p> block
    # Inside <p>, use p_indent + 2 spaces
    inner_indent = p_indent + "  "
    leo_anchor = build_mr_leo_anchor(style, inner_indent)
    leo_block = (
        f'\n{p_indent}<p>Mr. Leo: <a href="tel:+27792592607" class="text-blue-600 hover:underline">+27 79 259 2607</a>\n'
        f'{leo_anchor}\n'
        f'{p_indent}</p>'
    )

    matches = list(pattern.finditer(new_content))
    for m in reversed(matches):
        # Insert AFTER the </p> closing
        insert_pos = m.end()
        new_content = new_content[:insert_pos] + leo_block + new_content[insert_pos:]
        inserted += 1

    return new_content, inserted


def add_mr_leo_block(content: str, style: str) -> tuple[str, int]:
    """For block style files where Mr. Sim/Ms. Dora WhatsApp anchors are siblings.

    Insert a new anchor right after the last existing wa.me anchor.
    """
    inserted = 0

    if "27792592607" in content:
        return content, 0

    pattern = re.compile(
        r'(<a\s+href="https://wa\.me/(?P<num>27774871295|27674424461)"[^>]*>\s*'
        r'(?:.*?\n)*?\s*</a>)',
        re.DOTALL,
    )

    matches = list(pattern.finditer(content))
    if not matches:
        return content, 0

    new_content = content
    for m in reversed(matches):
        # Get indent
        line_start = new_content.rfind('\n', 0, m.start()) + 1
        line_end = new_content.find('\n', m.start())
        line = new_content[line_start:line_end]
        indent = line[:len(line) - len(line.lstrip())]
        leo_anchor = build_mr_leo_anchor(style, indent)
        insert_pos = m.end()
        new_content = new_content[:insert_pos] + "\n" + leo_anchor + new_content[insert_pos:]
        inserted += 1

    return new_content, inserted


def process_file(filepath: Path) -> str:
    content = filepath.read_text(encoding="utf-8")

    if "27792592607" in content:
        return "SKIP (already has Mr Leo)"
    if "wa.me/27774871295" not in content and "wa.me/27674424461" not in content:
        return "SKIP (no Sim/Dora WhatsApp)"

    style = detect_style(content)
    if style == "none":
        return "SKIP (no recognized style)"

    if style in ("small05", "small1"):
        new_content, count = add_mr_leo_inline(content, style)
    else:
        new_content, count = add_mr_leo_block(content, style)

    if count == 0:
        return f"NO MATCH ({style})"

    filepath.write_text(new_content, encoding="utf-8")
    return f"OK ({style}, inserted {count})"


SKIP_FILES = {"404.astro", "[slug].astro", "index.astro", "sitemap.xml.ts"}

for filepath in sorted(PAGES_DIR.rglob("*.astro")):
    name = filepath.name
    if name in SKIP_FILES:
        print(f"SKIP (skip list): {filepath.relative_to(PAGES_DIR)}")
        continue
    rel = filepath.relative_to(PAGES_DIR)
    result = process_file(filepath)
    print(f"{result}: {rel}")
