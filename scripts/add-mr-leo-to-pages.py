"""
Add Mr Leo contact (+27 79 259 2607) to all English/Afrikaans pages
that currently have Mr. Sim and Ms. Dora contact info.

Strategy:
- Find Ms. Dora block (the LAST contact in each file)
- After Ms. Dora block, add a Mr Leo block with same style
- For files using small button: small Mr Leo block
- For files using big button (contact.astro): big Mr Leo block
- Skip Chinese article .md files (handled separately)

We'll detect style from the existing WhatsApp anchor tag's class.
"""
import re
from pathlib import Path

PAGES_DIR = Path(r"C:\Users\Laptop\Desktop\Church-Site\src\pages")

# Files to skip (already handled or not a content page)
SKIP_FILES = {
    "[slug].astro",  # blog detail - handled
    "index.astro",  # home - check separately
    "404.astro",  # 404 page
    "sermons.astro",  # no phone numbers
    "videos.astro",  # no phone numbers
    "events.astro",  # might have phone - will check
    "gallery.astro",  # no phones
    "sitemap.xml.ts",  # not a page
}

# Big-button SVG path (used in contact.astro)
SVG_BIG = '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>'

# Small-button SVG path
SVG_SMALL = '<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>'

# Big block template (contact.astro style)
BLOCK_BIG = '''            <div class="flex flex-col sm:flex-row sm:items-center gap-4">
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
                {svg_big}
                WhatsApp
              </a>
            </div>
'''

# Small block template (inline style)
BLOCK_SMALL = '''              <p class="text-gray-700 mb-6">
                Mr. Leo: <a href="tel:+27792592607" class="text-blue-600 hover:underline">+27 79 259 2607</a>
                <a href="https://wa.me/27792592607" target="_blank" rel="noopener noreferrer" class="ml-2 inline-flex items-center gap-1 px-2 py-1 bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-semibold rounded transition-colors">
                  {svg_small}
                  WhatsApp
                </a>
              </p>
'''

BLOCK_BIG = BLOCK_BIG.replace("{svg_big}", SVG_BIG)
BLOCK_SMALL = BLOCK_SMALL.replace("{svg_small}", SVG_SMALL)


def detect_style(content: str) -> str:
    """Detect whether file uses big or small WhatsApp button style."""
    # Big style has 'px-5 py-3' and 'rounded-lg'
    if re.search(r'px-5 py-3.*rounded-lg', content):
        return "big"
    # Small style has 'px-2 py-1' and 'text-xs'
    if re.search(r'px-2 py-1.*text-xs', content):
        return "small"
    return "none"


def add_mr_leo(content: str, style: str) -> str:
    """Insert Mr Leo block right after Ms. Dora block."""
    if style == "big":
        # In contact.astro, the structure is:
        #   <div class="flex flex-col sm:flex-row sm:items-center gap-4">
        #     <div class="flex-1">
        #       <p>Ms. Dora</p>
        #       <a href="tel:+27674424461">+27 67 442 4461</a>
        #     </div>
        #     <a href="https://wa.me/27674424461" ...>WhatsApp</a>
        #   </div>
        # We find the Ms. Dora div and insert BLOCK_BIG before </div> that closes its outer container
        # Use a regex that matches the Ms. Dora <div ... flex-col sm:flex-row ... > ... </div> block
        pattern = re.compile(
            r'(\s*<div class="flex flex-col sm:flex-row sm:items-center gap-4">\s*'
            r'<div class="flex-1">\s*'
            r'<p class="text-sm font-medium text-gray-500 mb-1">Ms\. Dora</p>\s*'
            r'<a href="tel:\+27674424461"[^>]*>[^<]+</a>\s*'
            r'</div>\s*'
            r'<a\s+href="https://wa\.me/27674424461"[^>]*>\s*'
            r'(?:.*?\s*)*?'
            r'</a>\s*'
            r'</div>)',
            re.DOTALL,
        )
        match = pattern.search(content)
        if not match:
            return content  # no match
        # Insert BLOCK_BIG right after the match
        new_content = content[:match.end()] + "\n" + BLOCK_BIG + content[match.end():]
        return new_content

    elif style == "small":
        # In other pages, the structure is:
        #   <p class="text-gray-700 mb-6">
        #     Ms. Dora: <a href="tel:+27674424461">+27 67 442 4461</a>
        #     <a href="https://wa.me/27674424461" ...>WhatsApp</a>
        #   </p>
        pattern = re.compile(
            r'(              <p class="text-gray-700 mb-6">\s*\n?'
            r'                Ms\. Dora: <a href="tel:\+27674424461"[^>]*>[^<]+</a>\s*\n?'
            r'                <a href="https://wa\.me/27674424461" target="_blank" rel="noopener noreferrer" class="ml-2 inline-flex items-center gap-1 px-2 py-1 bg-\[#25D366\] hover:bg-\[#20BD5A\] text-white text-xs font-semibold rounded transition-colors">\s*\n?'
            r'                  <svg[^>]*><path[^/]*/></svg>\s*\n?'
            r'                  WhatsApp\s*\n?'
            r'                </a>\s*\n?'
            r'              </p>)',
        )
        match = pattern.search(content)
        if not match:
            return content
        new_content = content[:match.end()] + BLOCK_SMALL + content[match.end():]
        return new_content

    return content


def process_file(filepath: Path) -> str:
    content = filepath.read_text(encoding="utf-8")
    original = content

    # Check if Mr. Leo already exists
    if "27792592607" in content:
        return "SKIP (already has Mr Leo)"

    style = detect_style(content)
    if style == "none":
        return "SKIP (no recognized WhatsApp style)"

    new_content = add_mr_leo(content, style)
    if new_content == content:
        return "NO MATCH"

    filepath.write_text(new_content, encoding="utf-8")
    return f"OK ({style})"


# Walk all .astro files in src/pages
for filepath in sorted(PAGES_DIR.rglob("*.astro")):
    name = filepath.name
    if name in SKIP_FILES:
        print(f"SKIP (in skip list): {filepath.relative_to(PAGES_DIR)}")
        continue
    # Skip locations/[slug].astro dynamic - check
    rel = filepath.relative_to(PAGES_DIR)
    result = process_file(filepath)
    print(f"{result}: {rel}")
