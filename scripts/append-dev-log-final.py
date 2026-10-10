# -*- coding: utf-8 -*-
"""Append 2026-10-01 evening final dev log entry across all log files.

This entry documents:
1. Verification that all Korean class 'free' references were removed
2. Encoding fix for 开发记录.txt (GBK/UTF-8 mixed -> consistent GBK)
3. Final user request: '更新开发记录' (Update dev logs)
"""

import os
from pathlib import Path

ROOT = Path(r"C:\Users\Laptop\Desktop\Church-Site")

# ============================================================================
# Common entry content (in Chinese, mirroring user communication style)
# ============================================================================

NEW_ENTRY_TXT = """
=====================================
本次保存内容开始
=====================================

【任务】Korean Class 收费化 - 最终验收 + 日志更新

【用户请求时间线】
1. 09:28 PM 用户说: "更新开发记录"
2. 用户上一条: 完成 Korean class "免费" 移除,改为课程收费
3. 本次任务: 完整更新所有开发记录文件,确保编码一致

【编码修复 - 开发记录.txt】
- 问题: 文件之前是 GBK 编码(历史),但本次 Korean class 追加时使用 UTF-8
- 解决方案: 用 Python 脚本 scripts/fix-dev-log-encoding.py
  1. 检测混合编码边界(UTF-8 marker 【任务】Korean Class)
  2. GBK 部分 (51,875 bytes) 解码为字符串
  3. UTF-8 部分 (3,275 bytes) 解码为字符串
  4. 合并后重新编码为 GBK
  5. 文件大小: 55,150 -> 54,835 bytes
- 验证: 关键内容 "【任务】Korean Class" 和 "330 pages built" 均完整保留

【最终 grep 验证】
- src/ + dist/ 中已无任何 "free korean" / "korean.*free of charge" 错误描述
- 保留的"free"均为合法:
  1. Bible study (正确免费)
  2. FAQ 明确说明 Korean class **不是**免费
  3. Hymn downloads (免费下载)
  4. "Free State"(南非省份名,非相关)

【最终交付状态】
- 25+ 个页面文件已修改
- Schema.org Course isAccessibleForFree: true -> false
- priceRange: "Bible study free; Korean class fee applies"
- 301 redirect /blog/free-korean-class-community/ -> /blog/korean-class-community/
- /free-korean-class-johannesburg/ 页面保留 URL + 改写内容说明收费
- 330 pages built, 0 errors, 0 warnings
- redirect 文件 dist/blog/free-korean-class-community/index.html 正确生成
- 所有开发记录文件 (.md + .txt) 已更新本次会话
- 开发记录.txt 编码统一为 GBK(历史一致性)
- 其他开发记录文件 (.md) 保持 UTF-8(标准)

【文件状态清单】
- DEV_LOG.md (UTF-8, 303 lines) ← 已追加 ## 2026-10-01 完整章节
- 开发记录.md (UTF-8, 627 lines) ← 已追加 ## 2026-10-01 完整章节
- 开发记录.txt (GBK, 1199 lines) ← 已追加 【任务】章节 + 编码修复
- 用户对话记录.txt (UTF-8, 629 lines) ← 已追加 【任务】章节
- 用户对话汇总.md (UTF-8, 128 lines) ← 已追加 ## 2026-10-01 对话记录

【辅助脚本】
- scripts/append-dev-log-korean-fee.py (NEW: 追加 Korean fee 章节到所有日志)
- scripts/append-user-summary-korean.py (NEW: 追加用户对话摘要)
- scripts/fix-dev-log-encoding.py (NEW: 修复 开发记录.txt 编码)
- scripts/dump-dev-logs.py (NEW: 调试脚本,检查所有日志文件状态)

【下一步】
- 用户指示: commit + push + Cloudflare Pages deploy
- 在线验证 https://joburgchurch.co.za/community-classes/korean/ 不再显示"免费"
- 在线验证 https://joburgchurch.co.za/blog/free-korean-class-community/ 301 重定向到 /blog/korean-class-community/
=====================================
本次保存内容结束
=====================================
"""

NEW_ENTRY_MD = """

---

## 2026-10-01 (晚上) — Korean Class 收费化最终验收 + 日志更新

### 用户请求时间线
1. 09:28 PM 用户说: **"更新开发记录"**
2. 用户上一条任务: 完成 Korean class "免费" 移除,改为课程收费
3. 本次任务: 完整更新所有开发记录文件,确保编码一致

### 编码修复 - 开发记录.txt
- **问题**: 文件之前是 GBK 编码(历史),但本次 Korean class 追加时使用 UTF-8,导致混合编码
- **解决方案**: 用 Python 脚本 `scripts/fix-dev-log-encoding.py`
  1. 检测混合编码边界(UTF-8 marker `【任务】Korean Class`)
  2. GBK 部分 (51,875 bytes) 解码为字符串
  3. UTF-8 部分 (3,275 bytes) 解码为字符串
  4. 合并后重新编码为 GBK
  5. 文件大小: `55,150` → `54,835` bytes
- **验证**: 关键内容 `【任务】Korean Class` 和 `330 pages built` 均完整保留

### 最终 grep 验证
- `src/` + `dist/` 中已无任何 "free korean" / "korean.*free of charge" 错误描述
- 保留的"free"均为合法:
  1. **Bible study** (正确免费)
  2. **FAQ 明确说明** Korean class **不是**免费
  3. **Hymn downloads** (免费下载)
  4. **"Free State"** (南非省份名,非相关)

### 最终交付状态
- 25+ 个页面文件已修改
- Schema.org Course `isAccessibleForFree: true` → `false`
- `priceRange: "Bible study free; Korean class fee applies"`
- 301 redirect `/blog/free-korean-class-community/` → `/blog/korean-class-community/`
- `/free-korean-class-johannesburg/` 页面保留 URL + 改写内容说明收费
- **330 pages built, 0 errors, 0 warnings**
- redirect 文件 `dist/blog/free-korean-class-community/index.html` 正确生成
- 所有开发记录文件 (.md + .txt) 已更新本次会话
- 开发记录.txt 编码统一为 GBK(历史一致性)
- 其他开发记录文件 (.md) 保持 UTF-8(标准)

### 文件状态清单
| 文件 | 编码 | 行数 | 状态 |
|------|------|------|------|
| `DEV_LOG.md` | UTF-8 | 303 | 已追加 ## 2026-10-01 完整章节 |
| `开发记录.md` | UTF-8 | 627 | 已追加 ## 2026-10-01 完整章节 |
| `开发记录.txt` | GBK | 1199 | 已追加 【任务】章节 + 编码修复 |
| `用户对话记录.txt` | UTF-8 | 629 | 已追加 【任务】章节 |
| `用户对话汇总.md` | UTF-8 | 128 | 已追加 ## 2026-10-01 对话记录 |

### 辅助脚本(新增)
- `scripts/append-dev-log-korean-fee.py` — 追加 Korean fee 章节到所有日志
- `scripts/append-user-summary-korean.py` — 追加用户对话摘要
- `scripts/fix-dev-log-encoding.py` — 修复 开发记录.txt 编码
- `scripts/dump-dev-logs.py` — 调试脚本,检查所有日志文件状态

### 下一步
- 用户指示: commit + push + Cloudflare Pages deploy
- 在线验证 https://joburgchurch.co.za/community-classes/korean/ 不再显示"免费"
- 在线验证 https://joburgchurch.co.za/blog/free-korean-class-community/ 301 重定向到 /blog/korean-class-community/
"""


def append_with_encoding(path: Path, content: str, encoding: str):
    """Append content using specified encoding (don't read existing file)."""
    if not path.exists():
        print(f"  ! {path.name} not found")
        return
    with open(path, "a", encoding=encoding, errors='replace') as f:
        f.write(content)
    size = path.stat().st_size
    line_count = len(open(path, 'r', encoding=encoding, errors='replace').read().split('\n'))
    print(f"  + {path.name}: {size:,} bytes, {line_count} lines (encoding={encoding})")


def main():
    print("Appending 2026-10-01 evening final entry to all dev logs...")
    print()

    # 开发记录.txt is GBK (fixed)
    append_with_encoding(ROOT / "开发记录.txt", NEW_ENTRY_TXT, "gbk")

    # 开发记录.md is UTF-8
    append_with_encoding(ROOT / "开发记录.md", NEW_ENTRY_MD, "utf-8")

    # 用户对话记录.txt is UTF-8
    append_with_encoding(ROOT / "用户对话记录.txt", NEW_ENTRY_TXT, "utf-8")

    # 用户对话汇总.md is UTF-8
    append_with_encoding(ROOT / "用户对话汇总.md", NEW_ENTRY_MD, "utf-8")

    # DEV_LOG.md is UTF-8
    append_with_encoding(ROOT / "DEV_LOG.md", NEW_ENTRY_MD, "utf-8")

    print()
    print("Done.")


if __name__ == "__main__":
    main()