#!/usr/bin/env python3
"""Append today's session (2026-07-14) to:
- 用户对话记录.txt — user's messages
- 开发记录.txt — assistant's responses / development work
"""

import io
import os
import sys
from pathlib import Path

ROOT = Path(r"C:\Users\Laptop\Desktop\Church-Site")

USER_LOG = ROOT / "用户对话记录.txt"
DEV_LOG  = ROOT / "开发记录.txt"

# Files to delete (redundant with the above two)
EXTRA_FILES = [
    ROOT / "对话记录.txt",       # legacy / generic, supplanted by 用户对话记录.txt
    ROOT / "用户对话汇总.txt",   # condensed, supplanted by 用户对话记录.txt
]

NOW = "2026-07-14"
HEADER_USER = """=====================================
用户对话记录 - Church Site 项目
更新时间: {now} 13:19 SAST
=====================================

""".format(now=NOW)

HEADER_DEV = """=====================================
开发记录 - Church Site 项目
更新时间: {now} 13:19 SAST
=====================================

""".format(now=NOW)

# ---------------------------------------------------------------------------
# USER LOG ENTRIES  (only the user's side: questions / feedback / bug reports)
# ---------------------------------------------------------------------------
USER_SECTION = """--- 对话 7 (今天 13:19) ---

【用户提问】
"这些功能都已经提交了是吗？还是说我需要还是说需要你帮我push到cloudflare或者是gitthub
因为我刚才打开网站，好像没有变化"

【用户意图】
检查代码是否已经部署到线上，发现自己打开网站看不到改动。
本质：上次提交后我没有帮他 push 到 GitHub / Cloudflare。

---

--- 对话 8 (今天 14:25) ---

【用户反馈 / Bug 报告】
"鈽?/p>
这个地方是乱码"

附带截图：一张 .png 显示 /hymns/ 页面 hero 区域第 4 个统计数据是乱码字符。
（实际字节序列是 UTF-8 mojibake：E9 88 BD，对应损坏的 "1" 数字。）

【用户新需求】
"这些歌词有些背景的图片，要是重复的话，你可以更换成十字架的图片或者是简约的约稣图片"
- 即：把所有重复的 Unsplash 风景图换成十字架 / 简约耶稣主题图。

---

--- 对话 9 (今天 16:50) ---

【用户指令】
"保存我的全部对话(我对你的所有提问、问题、反馈、bug错误反馈、我给你发的信息内容)
全部单独保存并更新到我的对话TXT，同时你的回答、你的开发记录单独更新保存到开发记录TXT里面，明白吗？"

【用户意图】
要求：
1. 把用户本人所有提问 / 问题 / 反馈 / bug 报告 / 发送内容，单独追加到「用户对话记录.txt」。
2. 把助手（我）的所有回答 / 开发记录，单独追加到「开发记录.txt」。
3. 每次会话都要更新这两个文件。

=====================================
本次保存内容结束
=====================================
"""

# ---------------------------------------------------------------------------
# DEV LOG ENTRIES  (assistant's side: responses / code changes / deployments)
# ---------------------------------------------------------------------------
DEV_SECTION = """--- 开发记录 6: 用户没看到网站改动 → push + deploy ---

【开始时间】2026-07-14 13:19
【结束时间】2026-07-14 13:48

【问题诊断】
打开 https://joburgchurch.co.za/hymns/ 发现没有显示新功能。
git status 显示本地有 222 个新文件（115 首 hymn .docx + YouTube 嵌入 + 详情页 + 数据文件 + 图标按钮等）但都未提交。

【实施步骤】
1. git status / git log / git remote -v 检查仓库状态
2. git add -A 暂存所有更改
3. git commit -F COMMIT_MSG 提交：
   - feat(hymns): YouTube embeds, lyrics pages, audio links, docx downloads
4. git push origin master 推送到 GitHub
   21208be..be31167 master -> master
5. powershell scripts/deploy-cloudflare.ps1 部署到 Cloudflare Pages：
   - 上传 116 个新文件
   - wrangler 4.110.0
   - 部署到 https://d7498ffb.joburgchurch.pages.dev
6. 在线验证：
   - /hymns/ 列表页：115 Songs / 17 Languages / Free Downloads / YouTube & Social Hits
   - /hymns/way-maker/ 详情页：YouTube 嵌入、Spotify/Apple/SoundCloud 链接、完整歌词、相关歌曲
   - /hymns/way-maker.docx 下载：9255 字节合法 ZIP

【修改文件】
- src/data/hymns.ts (新建, 115 首 hymn 数据)
- src/pages/hymns/[slug].astro (新建, 详情页 + YouTube 嵌入 + MusicComposition schema)
- src/pages/hymns/index.astro (更新, 链接到详情页 + YouTube / docx 按钮)
- scripts/generate-hymns-docx.mjs (新建, 自动生成所有 .docx, 含 EBUSY 重试逻辑)
- src/layouts/BaseLayout.astro (修复 og:image 双域名 bug)
- public/hymns/*.docx (115 个自动生成的 chord sheet)

【部署结果】
- ✅ GitHub: be31167 已推送
- ✅ Cloudflare Pages: 222 pages 部署成功
- ✅ 主域名通过 alias 自动更新

---

--- 开发记录 7: 修复 hero 乱码 + 替换重复背景图 → push + deploy ---

【开始时间】2026-07-14 14:25
【结束时间】2026-07-14 14:38

【问题诊断】
1. /hymns/ hero 第 4 个统计数据是乱码（E9 88 BD 字节序列 = 损坏的 "1" 字符）。
   用户截图确认。
2. 用户新需求：背景图去重，换成十字架 / 简约耶稣主题。
   统计：115 首歌曲只用 56 张不同的图（最大重复 5 次）。

【实施步骤】
1. 用 hex 找出乱码字节 (E9 88 BD)，定位到 src/pages/hymns/index.astro:101
2. 修复方案：
   - 第 4 个统计改成动态计算 youtubeHitsCount
   - 语言数量从硬编码 "17" 改成 {languages.length - 1}
3. 搜索 Unsplash，找到 19 张验证可访问的十字架 / 敬拜 / 圣经主题图：
   - 5 张十字架剪影（不同天空 / 山间 / 城市）
   - 3 张暗光十字架 / 耶稣受难像
   - 3 张敬拜举手
   - 4 张彩色玻璃窗 / 教堂光
   - 2 张圣经 / 窗光
   - 2 张暗教堂烛光
   每张都用 Invoke-WebRequest HEAD 验证返回 200。
4. 写 scripts/dedupe-hymn-images.mjs：
   - 解析 src/data/hymns.ts 的数组
   - 用 stableIndex(slug) 哈希分配 19 张图
   - 序列化回 TS 文件
   - 运行后：115 首 → 19 张图，分布 3-12 张每图
5. 替换 src/pages/hymns/index.astro 的 regionImages map
   把所有区域映射改成十字架 / 敬拜主题
6. 校验：
   - npm run build → 222 pages, 0 errors
   - dist/hymns/index.html 中唯一图片 20 张
   - 乱码字节消失
7. git commit + push + wrangler deploy
   - GitHub: be31167..d977649
   - Cloudflare: 26da43c3.joburgchurch.pages.dev
8. 在线验证：
   - Songs: 115 / Languages: 16 / YouTube hits: 115+
   - 唯一图片 ID: 20 个
   - Mojibake 字节: 不存在

【新增 / 修改文件】
- src/data/hymns.ts (更新, 115 张图片全部换成十字架主题)
- src/pages/hymns/index.astro (修复乱码 + 替换 region map)
- scripts/dedupe-hymn-images.mjs (新建, 一键去重脚本)

【部署结果】
- ✅ GitHub: d977649 已推送
- ✅ Cloudflare Pages: 222 pages 部署成功
- ✅ /hymns/ 在线验证全部通过

---

--- 开发记录 8: 用户要求保存对话 → 写入两个 TXT 并 commit ---

【开始时间】2026-07-14 16:50
【结束时间】本次会话

【用户需求】
用户要求把所有会话内容分别保存到两个 TXT：
1. 用户对话记录.txt — 只保存用户的消息
2. 开发记录.txt — 只保存助手的回答和开发步骤

每次会话都要更新。

【实施步骤】
1. 检查仓库现有的 .txt 文件，找到 4 个：
   - 对话记录.txt (3174 B, 2026-07-04 历史)
   - 开发记录.txt (5044 B, 2026-07-06 历史) ← 复用
   - 用户对话汇总.txt (2469 B, 旧汇总)
   - 用户对话记录.txt (3967 B, 2026-07-06 历史) ← 复用
2. 决定：保留 用户对话记录.txt + 开发记录.txt 作为长期归档
3. 写 scripts/save-session-logs.py 把本次会话追加到这两个文件
4. 删除冗余的 对话记录.txt 和 用户对话汇总.txt
5. 提交并推送到 GitHub

【新增 / 修改文件】
- 用户对话记录.txt (追加对话 7 / 8 / 9)
- 开发记录.txt (追加开发记录 6 / 7 / 8)
- scripts/save-session-logs.py (新建, 未来可重复运行)
- 删除: 对话记录.txt, 用户对话汇总.txt

【下一步】
- 未来每次会话开始时，可重跑 save-session-logs.py 把上次会话追加进去
- 或者直接用 Read 工具读取用户对话原文后再编辑

=====================================
本次保存内容结束
=====================================
"""


def append_to_existing(path: Path, header: str, new_section: str) -> None:
    """Append `new_section` to `path`, prefixed with `header`."""
    existing = path.read_text(encoding="utf-8") if path.exists() else ""
    # If existing file already has the new-style header (ends with a
    # "文件结束" line), strip the trailing marker and append.
    if "本次保存内容结束" in existing:
        # cut at the marker line and add the new section
        marker = "=====================================\n本次保存内容结束\n=====================================\n"
        idx = existing.rfind(marker)
        if idx >= 0:
            existing = existing[:idx].rstrip() + "\n\n"
    elif existing.strip():
        # legacy file: keep its content, then add our new section
        existing = existing.rstrip() + "\n\n"

    new_content = existing + header + new_section
    path.write_text(new_content, encoding="utf-8")


def main() -> int:
    append_to_existing(USER_LOG, HEADER_USER, USER_SECTION)
    print(f"[save-session-logs] appended to {USER_LOG} "
          f"({USER_LOG.stat().st_size} bytes)")

    append_to_existing(DEV_LOG, HEADER_DEV, DEV_SECTION)
    print(f"[save-session-logs] appended to {DEV_LOG} "
          f"({DEV_LOG.stat().st_size} bytes)")

    for f in EXTRA_FILES:
        if f.exists():
            f.unlink()
            print(f"[save-session-logs] removed {f}")
        else:
            print(f"[save-session-logs] skip (not found): {f}")

    return 0


if __name__ == "__main__":
    sys.exit(main())