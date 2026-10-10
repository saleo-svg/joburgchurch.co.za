"""
Add Mr Leo (+27 79 259 2607) WhatsApp button to all pages with existing
Mr. Sim and Ms. Dora WhatsApp buttons.

Strategy: Find "WhatsApp Ms. Dora" anchor closing </a> line and insert
a Mr Leo WhatsApp button right after it (with same style as the
surrounding block).

We detect the style of the existing WhatsApp button by its CSS class
(px-5 py-3 / px-4 py-2 / px-2 py-1) and replicate it for Mr Leo.
"""
import re
from pathlib import Path

PAGES_DIR = Path(r"C:\Users\Laptop\Desktop\Church-Site\src\pages")

SKIP_FILES = {
    "404.astro",
    "[slug].astro",  # blog/hymns detail - special
    "index.astro",  # home - check
    "sitemap.xml.ts",
}


def detect_style(content: str) -> str:
    """Detect which WhatsApp button style is used in the file."""
    # Order matters: check big first, then medium, then small
    if 'px-5 py-3 bg-[#25D366]' in content:
        return "big"
    if 'px-4 py-2 bg-[#25D366]' in content:
        return "medium"
    if 'px-2 py-1 bg-[#25D366]' in content:
        return "small"
    return "none"


def add_mr_leo(content: str, style: str) -> tuple[str, int]:
    """Insert Mr Leo WhatsApp link/button right after Ms. Dora's section.
    Returns (new_content, count_inserted)."""
    if "27792592607" in content:
        return content, 0

    count_inserted = 0

    if style == "big":
        # Pattern: <a href="https://wa.me/27674424461" ... > ... WhatsApp ... </a>
        # The block ends with </a>\n then </div> closing the flex container
        # We find the Ms. Dora wa link + WhatsApp text + </a> and add Mr Leo right after
        pattern = re.compile(
            r'(<a\s+href="https://wa\.me/27674424461"[^>]*>\s*'
            r'(?:.*?\n)*?\s*</a>)\s*'
            r'(\s*</div>)',
            re.DOTALL,
        )
        # For big style (contact.astro), the structure is:
        # <a href="https://wa.me/27674424461" ...> WhatsApp </a>
        # </div>  <-- closes the "flex flex-col sm:flex-row..."
        # So we insert before </div>

        def replacer(match):
            nonlocal count_inserted
            count_inserted += 1
            # match.group(1) = the <a>...</a>
            # match.group(3) = </div> with leading whitespace
            mr_leo_block = '''            <div class="flex flex-col sm:flex-row sm:items-center gap-4">
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-500 mb-1">Mr. Leo</p>
                <a href="tel:+27792592607" class="text-xl font-bold text-blue-700 hover:underline">+27 79 259 2607</a>
              </div>
              <a
                href="https://wa.me/27792592607"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
            </div>
'''
            return match.group(1) + "\n" + mr_leo_block + match.group(3)

        new_content = pattern.sub(replacer, content)
        return new_content, count_inserted

    elif style == "medium":
        # Pattern: <a href="https://wa.me/27674424461" ...> ... WhatsApp Ms. Dora </a>
        pattern = re.compile(
            r'(<a\s+href="https://wa\.me/27674424461"[^>]*>\s*'
            r'(?:.*?\n)*?\s*WhatsApp\s*Ms\.\s*Dora\s*'
            r'</a>)',
        )

        def replacer(match):
            nonlocal count_inserted
            count_inserted += 1
            mr_leo_block = '''          <a href="https://wa.me/27792592607" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#20BD5A] text-white text-sm font-semibold rounded-lg transition-colors">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp Mr. Leo
          </a>
'''
            return match.group(1) + "\n" + mr_leo_block

        new_content = pattern.sub(replacer, content)
        return new_content, count_inserted

    elif style == "small":
        # Pattern in small style: inline <a href="https://wa.me/27674424461" ...> WhatsApp </a>
        # ends with </a> within <p>...</p>
        pattern = re.compile(
            r'(<p class="text-gray-700 mb-\d+">\s*\n?'
            r'\s*Ms\. Dora: <a href="tel:\+27674424461"[^>]*>[^<]+</a>\s*\n?'
            r'\s*<a href="https://wa\.me/27674424461" target="_blank" rel="noopener noreferrer" class="ml-2 inline-flex items-center gap-1 px-2 py-1 bg-\[#25D366\] hover:bg-\[#20BD5A\] text-white text-xs font-semibold rounded transition-colors">\s*\n?'
            r'\s*<svg[^>]*><path[^/]*/></svg>\s*\n?'
            r'\s*WhatsApp\s*\n?'
            r'\s*</a>\s*\n?'
            r'\s*</p>)',
        )

        def replacer(match):
            nonlocal count_inserted
            count_inserted += 1
            mr_leo_block = '''              <p class="text-gray-700 mb-6">
                Mr. Leo: <a href="tel:+27792592607" class="text-blue-600 hover:underline">+27 79 259 2607</a>
                <a href="https://wa.me/27792592607" target="_blank" rel="noopener noreferrer" class="ml-2 inline-flex items-center gap-1 px-2 py-1 bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-semibold rounded transition-colors">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
              </p>
'''
            return match.group(1) + "\n" + mr_leo_block

        new_content = pattern.sub(replacer, content)
        return new_content, count_inserted

    return content, 0


def process_file(filepath: Path) -> str:
    content = filepath.read_text(encoding="utf-8")

    if "27792592607" in content:
        return "SKIP (already has Mr Leo)"

    style = detect_style(content)
    if style == "none":
        return "SKIP (no recognized WhatsApp style)"

    new_content, count = add_mr_leo(content, style)
    if count == 0:
        return f"NO MATCH ({style})"

    filepath.write_text(new_content, encoding="utf-8")
    return f"OK ({style}, inserted {count})"


for filepath in sorted(PAGES_DIR.rglob("*.astro")):
    name = filepath.name
    if name in SKIP_FILES:
        print(f"SKIP (skip list): {filepath.relative_to(PAGES_DIR)}")
        continue
    rel = filepath.relative_to(PAGES_DIR)
    result = process_file(filepath)
    print(f"{result}: {rel}")
