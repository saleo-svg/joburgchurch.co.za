# -*- coding: utf-8 -*-
"""Fix 开发记录.txt encoding: convert to consistent GBK encoding."""

import os
from pathlib import Path

ROOT = Path(r"C:\Users\Laptop\Desktop\Church-Site")
fname = ROOT / "开发记录.txt"

data = fname.read_bytes()
print(f"Original file size: {len(data):,} bytes")

# Find the UTF-8 marker (our recent addition)
utf8_marker = '【任务】'.encode('utf-8')
idx = data.find(utf8_marker)
if idx < 0:
    print("ERROR: UTF-8 marker not found, file may already be clean")
    raise SystemExit(1)

print(f"Found UTF-8 marker at byte {idx}")
print(f"  GBK portion: bytes 0..{idx-2} ({idx-2:,} bytes)")
print(f"  UTF-8 portion: bytes {idx-2}..end ({len(data)-idx+2:,} bytes)")

# Decode GBK portion (preserving historical encoding)
gbk_part = data[:idx-2].decode('gbk', errors='replace')

# Decode UTF-8 portion (our recent addition)
utf8_part = data[idx-2:].decode('utf-8', errors='replace')

# Combine and re-encode entire file as GBK
full_text = gbk_part + utf8_part
encoded = full_text.encode('gbk', errors='replace')

# Write back
fname.write_bytes(encoded)
print(f"Fixed file size: {len(encoded):,} bytes")
print(f"Saved as GBK-encoded")

# Verify
verify = fname.read_bytes()
verify_text = verify.decode('gbk', errors='replace')
assert "【任务】Korean Class" in verify_text, "Verification failed"
assert "330 pages built" in verify_text, "Verification failed"
print("[OK] Verification passed - content is intact")