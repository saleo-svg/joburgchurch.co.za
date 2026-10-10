"""
Properly add Mr Leo WhatsApp button to all pages with existing
Mr. Sim / Ms. Dora WhatsApp buttons.

Strategy:
1. For each file with wa.me buttons for Sim/Dora:
2. Find each `<p>Mr. Sim: ... <a WA Sim>...</a>...</p>` block (or Ms. Dora)
3. Find the line right after `</p>` (which is the next contact line or empty)
4. Insert a new `<p>Mr. Leo: tel <a WA Leo>...</a></p>` block
5. Use the same indentation and WhatsApp style as the surrounding block

We handle the "small" inline style (px-2 py-0.5 / px-2 py-1) for files like:
- community-classes/index.astro
- community-classes/korean.astro
- locations/[slug].astro
- privacy.astro
- visit.astro
And the larger button styles for others.
"""
import re
from pathlib import Path

PAGES_DIR = Path(r"C:\Users\Laptop\Desktop\Church-Site\src\pages")

SVG_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'


def detect_style(content: str) -> str:
    """Detect which WhatsApp button style is used."""
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


def build_mr_leo_button(style: str, indent: str) -> str:
    """Generate a Mr Leo WhatsApp <a> block matching the given style."""
    if style == "big5":
        # Same as contact.astro (Mr Leo big button)
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


def add_mr_leo_inline_small(content: str, style: str) -> tuple[str, int]:
    """For inline small button style (px-2 py-0.5 / px-2 py-1) files.

    Pattern in these files:
        <p>Mr. Sim: <a tel>+27 77 487 1295</a>
          <a wa.me Sim WhatsApp>...</a>
        </p>
        <p>Ms. Dora: <a tel>+27 67 442 4461</a>
          <a wa.me Dora WhatsApp>...</a>
        </p>

    We want to insert AFTER Ms. Dora </p>:
        <p>Mr. Leo: <a tel>+27 79 259 2607</a>
          <a wa.me Leo WhatsApp>...</a>
        </p>
    """
    inserted = 0
    new_content = content

    # Find the last </p> that closes the Ms. Dora block.
    # Pattern: <p>Ms. Dora: ... </p>  followed by some whitespace then next block
    # We use a more reliable anchor: find Ms. Dora's wa.me anchor (last one in file).
    # Find all wa.me/27674424461 anchors. For each, find the </p> that comes after.

    pattern = re.compile(
        r'(<a href="https://wa\.me/27674424461"[^>]*>\s*(?:.*?\n)*?\s*</a>\s*\n\s*</p>)',
        re.DOTALL,
    )

    # Get indent for the new <p>
    # The new <p> should have the same indent as the existing <p>Ms. Dora line.
    # Find the position of <p>Ms. Dora
    ms_dora_p_pattern = re.compile(r'^(\s*)<p>Ms\. Dora:', re.MULTILINE)
    m = ms_dora_p_pattern.search(content)
    if not m:
        return content, 0
    p_indent = m.group(1)

    # Build the Mr Leo <p> block
    leo_button = build_mr_leo_button(style, " " * (len(p_indent) + 2))  # 2-space inside <p>
    leo_block = (
        f'\n{p_indent}<p>Mr. Leo: <a href="tel:+27792592607" class="text-blue-600 hover:underline">+27 79 259 2607</a>\n'
        f'{leo_button}\n'
        f'{p_indent}</p>'
    )

    # Find each Ms. Dora WhatsApp anchor and insert after its </p>
    matches = list(pattern.finditer(new_content))
    for m in reversed(matches):
        # Insert after the closing </p>
        insert_pos = m.end()
        new_content = new_content[:insert_pos] + leo_block + new_content[insert_pos:]
        inserted += 1

    return new_content, inserted


def add_mr_leo_after_last_dora(content: str, style: str) -> tuple[str, int]:
    """For files where Mr. Sim and Ms. Dora are in the SAME container
    (e.g., <div class="card">) but each have their own <a>.
    We append Mr Leo as a new <a> right after Ms. Dora's WhatsApp <a>.

    This is the original v3 logic, but we make sure it doesn't break.
    """
    inserted = 0

    # Pattern: find existing wa.me anchors for Sim/Dora
    pattern = re.compile(
        r'(<a\s+href="https://wa\.me/(?P<num>27774871295|27674424461)"[^>]*>\s*'
        r'(?:.*?\n)*?\s*</a>)',
        re.DOTALL,
    )

    matches = list(pattern.finditer(content))
    if not matches:
        return content, 0
    if "27792592607" in content:
        return content, 0

    # Process last to first
    new_content = content
    for m in reversed(matches):
        # Get indent of the line containing the <a>
        line_start = new_content.rfind('\n', 0, m.start()) + 1
        line_end = new_content.find('\n', m.start())
        line = new_content[line_start:line_end]
        indent = line[:len(line) - len(line.lstrip())]

        # Build Mr Leo anchor with same indent
        leo_anchor = build_mr_leo_button(style, indent)

        # Insert right after the </a> of the current anchor
        # Add a newline before for clean formatting
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

    # Choose handler based on style
    if style in ("small05", "small1"):
        new_content, count = add_mr_leo_inline_small(content, style)
    else:
        new_content, count = add_mr_leo_after_last_dora(content, style)

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
