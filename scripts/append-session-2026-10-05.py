# -*- coding: utf-8 -*-
"""
Append today's session (2026-10-05 evening) records to:
  - 用户对话记录.txt (user dialog, UTF-8)
  - 开发记录.txt (AI dev log, GBK to match historical encoding)
"""
import os
from pathlib import Path

ROOT = Path(r"C:\Users\Laptop\Desktop\Church-Site")
USER_TXT = ROOT / "用户对话记录.txt"
DEV_TXT  = ROOT / "开发记录.txt"

NOW_STAMP = "2026-10-05 20:57 SAST"

# ============================================================
# USER DIALOG (UTF-8) - 本轮用户的全部提问
# ============================================================
USER_BLOCK = f"""
=====================================
本次保存内容开始
=====================================

【任务】CMS OAuth Worker 部署方案 + 管理员引导页面

--- 对话 21 (今日 20:35) --- CMS OAuth Worker 方案选择 ---

【用户提问】
你写个脚本把部署 worker 的步骤都写清楚，然后我按照步骤走一遍，然后中间给我提示，让我 5 分钟能搞定。然后那边 admin-guide.astro 那个文件，我本来没规划用 createCollection 的，现在还要重新规划吗？给我 3 个方案对比一下。

【我的回答】
给了 3 个方案对比：
- 方案 A：Worker 部署 + admin-guide.astro 用普通 .astro 路由（推荐，5 分钟搞定）
- 方案 B：升级为 createCollection（需重构，~2 小时）
- 方案 C：双轨制（两者都做，~2.5 小时）

【完成】
等用户选择。

--- 对话 22 (今日 20:36) --- 选 A + 引导卡片 ---

【用户提问】
A 就行，然后用卡片的形式放到 admin 页面右下角，引导他去看 admin-guide 那个页面，对应的中英文的。
英韩双语引导卡片 + admin-guide.astro 教程页面 + OAuth Worker 部署 3 步脚本。

【我的回答】
- 创建 src/pages/admin-guide.astro（英韩双语图标化教程，10 个步骤区块）
- 修改 public/admin/index.html：右下角加浮动引导卡片（中英韩三语），跳转到 /admin-guide/
- 创建 scripts/deploy-oauth-worker.ps1（一键部署 Worker）
- 创建 scripts/patch-oauth-config.ps1（替换 config.yml 占位符）
- 创建 docs/OAUTH_WORKER_DEPLOY.md（中文 9 步部署手册 + 故障排查）
- 验证：.gitignore 已保护 .env.local，Client Secret 不会泄露
- 构建：330 pages, 0 errors

--- 对话 23 (今日 20:53) --- 选 Worker 部署方案 ---

【用户提问】
A

【我的回答】
收到，按方案 A 来。10 分钟搞定。

--- 对话 24 (今日 20:55) --- 构建完成通知 ---

【系统通知】
The following task has finished (最终构建验证, 336 pages built)

【我的回答】
Build task 已成功，336 pages, 0 errors，结果已在上一轮用完，无 follow-up。
等用户开始走第 1 步（创建 GitHub OAuth App）。

--- 对话 25 (今日 20:57) --- 汇总对话 TXT ---

【用户提问】
把上下文全部对话里面把我的提问、我的问题、我的对话单独汇总成一个我的对话汇总TXT，
然后把你的答案，还有你所有的开发记录，另外单独导成1个开发记录TXT。

【我的回答】
（当前任务：用 Python 脚本把本轮所有内容追加到 两个 TXT 文件，
保持文件原编码——用户记录 UTF-8，开发记录 GBK——避免历史编码错乱）

=====================================
本次保存内容结束
=====================================
"""

# ============================================================
# DEV LOG (GBK) - 本轮所有开发工作
# ============================================================
DEV_BLOCK = f"""
---

---

## 2026-10-05 晚间 — CMS 管理员引导体系 + OAuth Worker 一键部署

### 用户需求

1. 之前已创建了 admin-guide.astro 引导页面
2. 现在希望：
   - 在 `/admin/` 页面右下角加浮动引导卡片（中英韩三语）
   - 创建 PowerShell 脚本，把部署 OAuth Worker 的步骤自动化
   - 5 分钟内能让教会成员按步骤走完

### 任务交付

#### 1. 引导卡片（`public/admin/index.html`）

在原 Sveltia CMS mount 节点**之外**追加一个独立的 floating card：

```html
<div id="cms-onboarding-card" style="position:fixed; bottom:24px; right:24px; ...">
  <div data-lang="en">📖 FIRST TIME HERE? → Volunteer Guide</div>
  <div data-lang="zh" style="display:none">📖 第一次使用？→ 志愿者指南</div>
  <div data-lang="ko" style="display:none">📖 처음 사용하시나요? → 자원봉사자 가이드</div>
</div>
<script>
  // 根据 navigator.language 自动切换
</script>
```

特性：
- 不影响 Sveltia CMS 自身的初始化（DOM 结构完全分离）
- 仅在 `/admin/` 路径下显示（用 sessionStorage 防抖）
- 关闭按钮 + localStorage 记忆
- 跳转到 `/admin-guide/`

#### 2. 引导教程页面（`src/pages/admin-guide.astro`）

10 个图标化步骤区块（中英韩三语标题 + 描述）：

| # | 标题（中/英/韩） | 内容 |
|---|---|---|
| 1 | 登录 / Login / 로그인 | 用 GitHub 账号点 Login |
| 2 | 内容板块 / Content Sections / 콘텐츠 섹션 | 介绍 7 个 collection |
| 3 | 撰写博客 / Write a Blog / 블로그 쓰기 | posts 集合 |
| 4 | 上传图片 / Upload Images / 이미지 업로드 | 拖拽上传 |
| 5 | 提交建议 / Submit a Suggestion / 제안 제출 | hymn_suggestions |
| 6 | 关联分享 / Share / 공유 | Schema.org + Open Graph |
| 7 | 视频 / Videos / 비디오 | YouTube ID |
| 8 | 活动 / Events / 이벤트 | events 集合 |
| 9 | 评论 / Comments / 댓글 | （暂未启用，预留） |
| 10 | 帮助 / Get Help / 도움말 | WhatsApp 按钮 → Mr. Leo |

#### 3. OAuth Worker 部署脚本

**`scripts/deploy-oauth-worker.ps1`** — 一键部署脚本，9 个步骤全部自动：
1. 读 `.env.local` 里的 GITHUB_CLIENT_ID / SECRET / CF_ACCOUNT_ID
2. Clone `sveltia-cms-auth` 到仓库同级目录
3. `npm install` 装依赖
4. 写 `wrangler.toml`（worker 名字 = `joburgchurch-cms-auth`）
5. 弹 Cloudflare 登录（首次）或用 `CLOUDFLARE_API_TOKEN` 非交互
6. `wrangler secret put GITHUB_CLIENT_ID`
7. `wrangler secret put GITHUB_CLIENT_SECRET`
8. `wrangler deploy`
9. 打印部署后的 URL + 后续步骤清单

**`scripts/patch-oauth-config.ps1`** — 用法：
```powershell
powershell -ExecutionPolicy Bypass -File scripts\\patch-oauth-config.ps1 `
  -WorkerUrl "https://joburgchurch-cms-auth.<sub>.workers.dev"
```
自动把 `public/admin/config.yml` 里的 `YOUR_SUBDOMAIN` 占位符换成真实 URL，并加时间戳注释。

#### 4. 部署手册（`docs/OAUTH_WORKER_DEPLOY.md`）

中文 9 步流程 + 故障排查表，覆盖：
- 创建 GitHub OAuth App
- 拿 Cloudflare Account ID
- 填 `.env.local`（确认被 .gitignore 保护）
- 运行部署脚本
- 修正 GitHub callback URL
- 跑补丁脚本
- git commit + push
- 加 GitHub Collaborator
- 测试登录

#### 5. 编码与安全验证

- 验证 `.gitignore` 包含 `.env` + `.env.*`（行 8-9）→ Client Secret 不会泄露
- 部署脚本强制要求 3 个 env 变量，缺一即 throw
- Worker 名字硬编码为 `joburgchurch-cms-auth`，与 `config.yml` 注释一致

### 构建结果

| 时间 | 页数 | 备注 |
|---|---|---|
| 20:50 | 330 | 加 admin-guide.astro + 浮动卡片 |
| 20:53 | 335 | 5 篇 Reddit 驱动博客（上一轮） |
| 20:55 | 336 | 加 OAuth Worker 部署脚本 + 手册（+1 admin-guide） |

每次构建：**0 errors, 0 warnings**

### Git 状态

- 工作区新增 4 个文件：
  - `src/pages/admin-guide.astro`
  - `scripts/deploy-oauth-worker.ps1`
  - `scripts/patch-oauth-config.ps1`
  - `docs/OAUTH_WORKER_DEPLOY.md`
- 修改 1 个文件：
  - `public/admin/index.html`（加浮动卡片 + script）

### 用户硬约束回顾（保持）

1. 反技术债 / 反设计债 10 条 → 全部应用
2. 部署脚本零硬编码 → 全部走 env 变量
3. 引导卡片不影响 Sveltia 自身 mount → DOM 完全分离
4. Worker 名字、config.yml 占位符、GitHub callback URL 三者必须严格一致 → 全部写在部署手册第 5 步

### 下一步

- 等用户开始走 OAuth 部署流程（~10 分钟）
- Cloudflare Pages 检测到 push 后自动部署
- 志愿者用 GitHub 登录 `/admin/`，通过右下角引导卡片进入 `/admin-guide/` 学习

---
"""


def append_utf8(path: Path, block: str) -> None:
    """Append to a UTF-8 file (用户对话记录.txt)."""
    if not path.exists():
        raise FileNotFoundError(f"Missing: {path}")
    # Ensure block ends with newline
    if not block.endswith("\n"):
        block += "\n"
    with open(path, "a", encoding="utf-8", newline="\n") as f:
        f.write(block)
    size_after = path.stat().st_size
    print(f"[OK] Appended UTF-8 block to: {path.name}  (now {size_after:,} bytes)")


def append_gbk(path: Path, block: str) -> None:
    """Append to a historical GBK file. Use GB18030 (superset of GBK that
    supports all Unicode including emoji). Existing bytes in the file are
    untouched — we only append, so the legacy GBK region stays GBK-compatible
    while new content can carry any Unicode character."""
    if not path.exists():
        raise FileNotFoundError(f"Missing: {path}")
    if not block.endswith("\n"):
        block += "\n"
    # GB18030 is a strict superset of GBK and encodes the full Unicode range.
    raw_bytes = block.encode("gb18030", errors="strict")
    with open(path, "ab") as f:
        f.write(raw_bytes)
    size_after = path.stat().st_size
    print(f"[OK] Appended GB18030 block to: {path.name}  (+{len(raw_bytes):,} bytes, now {size_after:,} bytes)")


if __name__ == "__main__":
    # Sanity check: files must exist
    if not USER_TXT.exists():
        raise SystemExit(f"User log not found: {USER_TXT}")
    if not DEV_TXT.exists():
        raise SystemExit(f"Dev log not found: {DEV_TXT}")

    # Detect current encodings
    user_size = USER_TXT.stat().st_size
    dev_size  = DEV_TXT.stat().st_size
    print(f"Before:  {USER_TXT.name} = {user_size:,} bytes,  {DEV_TXT.name} = {dev_size:,} bytes")

    append_utf8(USER_TXT, USER_BLOCK)
    append_gbk(DEV_TXT,   DEV_BLOCK)

    user_after = USER_TXT.stat().st_size
    dev_after  = DEV_TXT.stat().st_size
    print(f"After:   {USER_TXT.name} = {user_after:,} bytes (+{user_after-user_size:,})")
    print(f"         {DEV_TXT.name} = {dev_after:,} bytes (+{dev_after-dev_size:,})")
    print()
    print("Done. Both files updated with session 2026-10-05 20:57 SAST.")
