# -*- coding: utf-8 -*-
"""
Verify that:
  1. The 2,784-byte UTF-8 block I appended to 用户对话记录.txt is readable
  2. The 4,105-byte GB18030 block I appended to 开发记录.txt is readable
  3. Historical content (the GBK portion of 开发记录.txt) is NOT corrupted
"""
import os
from pathlib import Path

ROOT = Path(r"C:\Users\Laptop\Desktop\Church-Site")
USER_TXT = ROOT / "用户对话记录.txt"
DEV_TXT  = ROOT / "开发记录.txt"

# ===== 1. User log: read as UTF-8, confirm new section is present =====
print("=" * 60)
print("STEP 1: 用户对话记录.txt (UTF-8)")
print("=" * 60)
user_bytes = USER_TXT.read_bytes()
user_text = user_bytes.decode("utf-8")
print(f"Total size: {len(user_bytes):,} bytes")
print(f"Total chars: {len(user_text):,}")

markers = [
    "本次保存内容开始",
    "对话 21 (今日 20:35)",
    "对话 22 (今日 20:36)",
    "对话 23 (今日 20:53)",
    "对话 25 (今日 20:57)",
    "本次保存内容结束",
]
for m in markers:
    ok = "OK" if m in user_text else "MISSING"
    print(f"  [{ok}] {m}")

# Show last 30 lines of the new section
lines = user_text.splitlines()
print(f"\n--- Last 8 lines of {USER_TXT.name} ---")
for line in lines[-8:]:
    print(f"  {line[:120]}")

# ===== 2. Dev log: decode whole file as GB18030, confirm new section =====
print()
print("=" * 60)
print("STEP 2: 开发记录.txt (GB18030 — superset of GBK)")
print("=" * 60)
dev_bytes = DEV_TXT.read_bytes()
dev_text = dev_bytes.decode("gb18030")
print(f"Total size: {len(dev_bytes):,} bytes")
print(f"Total chars: {len(dev_text):,}")

markers_dev = [
    "2026-10-05 晚间",                       # session header
    "CMS 管理员引导体系",                     # Chinese heading
    "sveltia-cms-auth",                      # ascii content
    "deploy-oauth-worker.ps1",               # filename
    "patch-oauth-config.ps1",
    "OAUTH_WORKER_DEPLOY.md",
    "GB18030",                               # my own annotation
    "GBK-compatible",                        # my own annotation
    "330 pages",                             # historical
    "336 pages",                             # new
    "0 errors",
]
for m in markers_dev:
    ok = "OK" if m in dev_text else "MISSING"
    print(f"  [{ok}] {m}")

# Show last 20 lines
lines = dev_text.splitlines()
print(f"\n--- Last 10 lines of {DEV_TXT.name} ---")
for line in lines[-10:]:
    print(f"  {line[:120]}")

# ===== 3. Historical content check: make sure GBK portion still decodes =====
print()
print("=" * 60)
print("STEP 3: Historical GBK content (first 30 lines) is still decodable")
print("=" * 60)
# The first 32,311 bytes are historical GBK
historical_bytes = dev_bytes[:32311]
hist_text = historical_bytes.decode("gb18030")
print(f"Historical portion: {len(historical_bytes):,} bytes -> {len(hist_text):,} chars")
hist_first_lines = hist_text.splitlines()[:8]
for line in hist_first_lines:
    print(f"  {line[:120]}")

# Spot check: Phase 11 should still be there
if "Phase 11" in hist_text:
    print("  [OK] Phase 11 (CMS) section still present and readable")
if "Korean Class" in hist_text:
    print("  [OK] Korean Class section still present and readable")

# ===== 4. Look for the separator markers around the new content =====
print()
print("=" * 60)
print("STEP 4: Boundary check — find where new section starts")
print("=" * 60)
new_section_marker = "## 2026-10-05 晚间"
idx = dev_text.find(new_section_marker)
if idx >= 0:
    print(f"  [OK] New section begins at char position {idx:,}")
    print(f"  Context (3 lines before + 1 line after marker):")
    start = max(0, dev_text.rfind("\n", 0, idx - 500) + 1)
    snippet = dev_text[start:idx + 200]
    for line in snippet.splitlines():
        print(f"    {line[:140]}")
else:
    print("  [MISSING] Could not locate the new session marker!")

print()
print("=" * 60)
print("All checks complete.")
print("=" * 60)
