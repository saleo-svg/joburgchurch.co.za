"""Reorder Phone Numbers section: Mr. Leo first, then Mr. Sim, then Ms. Dora."""
import re
from pathlib import Path

path = Path(r"C:\Users\Laptop\Desktop\Church-Site\src\pages\contact.astro")
content = path.read_text(encoding="utf-8")

# Find the Phone Numbers card block (between <h3 class="heading-3 mb-4">Phone Numbers</h3> and the closing </div></div> that wraps the whole card)
start_marker = '<h3 class="heading-3 mb-4">Phone Numbers</h3>'
end_marker = '<h2 class="heading-2 mb-8">Frequently Asked Questions</h2>'

start_idx = content.index(start_marker)
end_idx = content.index(end_marker)
card_block = content[start_idx:end_idx]

# Extract the 3 person blocks
# Mr. Leo block - has 中文 / Chinese
mr_leo_pattern = re.compile(
    r'(<div class="border-t border-gray-200 pt-6 flex flex-col sm:flex-row sm:items-center gap-4">\s*'
    r'<div class="flex-1">\s*'
    r'<p class="text-sm font-medium text-gray-500 mb-1">Mr\. Leo.*?</a>\s*</div>\s*'
    r'<a\s+href="https://wa\.me/27792592607".*?</a>\s*</div>)',
    re.DOTALL,
)
mr_leo_match = mr_leo_pattern.search(card_block)
assert mr_leo_match, "Mr. Leo block not found"
mr_leo_block = mr_leo_match.group(1)

# Mr. Sim block - no border-t
mr_sim_pattern = re.compile(
    r'(<div class="flex flex-col sm:flex-row sm:items-center gap-4">\s*'
    r'<div class="flex-1">\s*'
    r'<p class="text-sm font-medium text-gray-500 mb-1">Mr\. Sim.*?</a>\s*</div>\s*'
    r'<a\s+href="https://wa\.me/27774871295".*?</a>\s*</div>)',
    re.DOTALL,
)
mr_sim_match = mr_sim_pattern.search(card_block)
assert mr_sim_match, "Mr. Sim block not found"
mr_sim_block = mr_sim_match.group(1)

# Ms. Dora block - no border-t
ms_dora_pattern = re.compile(
    r'(<div class="flex flex-col sm:flex-row sm:items-center gap-4">\s*'
    r'<div class="flex-1">\s*'
    r'<p class="text-sm font-medium text-gray-500 mb-1">Ms\. Dora.*?</a>\s*</div>\s*'
    r'<a\s+href="https://wa\.me/27674424461".*?</a>\s*</div>)',
    re.DOTALL,
)
ms_dora_match = ms_dora_pattern.search(card_block)
assert ms_dora_match, "Ms. Dora block not found"
ms_dora_block = ms_dora_match.group(1)

# Build new order: Mr. Leo (no top border, since it's first), then Mr. Sim and Ms. Dora (each with border-t separator)
# Take Mr. Leo block and remove the leading border-t class for it (since it's first)
mr_leo_clean = mr_leo_block.replace(
    '<div class="border-t border-gray-200 pt-6 flex flex-col sm:flex-row sm:items-center gap-4">',
    '<div class="flex flex-col sm:flex-row sm:items-center gap-4">',
    1,
)
# Add border-t to Mr. Sim (it's now second)
mr_sim_with_border = mr_sim_block.replace(
    '<div class="flex flex-col sm:flex-row sm:items-center gap-4">',
    '<div class="border-t border-gray-200 pt-6 flex flex-col sm:flex-row sm:items-center gap-4">',
    1,
)
# Add border-t to Ms. Dora (it's now third)
ms_dora_with_border = ms_dora_block.replace(
    '<div class="flex flex-col sm:flex-row sm:items-center gap-4">',
    '<div class="border-t border-gray-200 pt-6 flex flex-col sm:flex-row sm:items-center gap-4">',
    1,
)

new_block_inner = (
    f'<h3 class="heading-3 mb-4">Phone Numbers</h3>\n'
    f'          <div class="card space-y-6">\n'
    f'            {mr_leo_clean}\n'
    f'            {mr_sim_with_border}\n'
    f'            {ms_dora_with_border}\n'
    f'          </div>\n'
    f'        </div>\n'
    f'\n'
    f'        <div>\n'
    f'          '
)

new_content = new_block_inner.join(content.split(card_block)) if False else content.replace(card_block, new_block_inner, 1)

# Verify: the new_block_inner already includes the end marker portion up to "<div>" of FAQ, so re-check
# Actually I made new_block_inner end with "          " - need to add the FAQ heading. Let me fix.

# Re-do more carefully: new_block_inner should contain everything from Phone Numbers h3 up to but not including the FAQ h2
# Let me reconstruct
new_block_inner2 = (
    f'<h3 class="heading-3 mb-4">Phone Numbers</h3>\n'
    f'          <div class="card space-y-6">\n'
    f'            {mr_leo_clean}\n'
    f'            {mr_sim_with_border}\n'
    f'            {ms_dora_with_border}\n'
    f'          </div>\n'
    f'        </div>\n'
    f'\n'
    f'        <div>\n'
    f'          <h2 class="heading-2 mb-8">Frequently Asked Questions</h2>'
)

new_content = content.replace(card_block, new_block_inner2, 1)

path.write_text(new_content, encoding="utf-8")
print("OK - reordered Phone Numbers")
print(f"Mr. Leo starts at: {new_content.index('Mr. Leo')}")
print(f"Mr. Sim starts at: {new_content.index('Mr. Sim')}")
print(f"Ms. Dora starts at: {new_content.index('Ms. Dora')}")
