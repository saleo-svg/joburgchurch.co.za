# 🚀 OAuth Worker 部署手册（10 分钟）

目标：让教会成员能真正用 `https://joburgchurch.co.za/admin/` 登录进去。

---

## 第 1 步：创建 GitHub OAuth App（约 5 分钟）

1. 用仓库主账号（`saleo-svg`）打开：<https://github.com/settings/developers>
2. 点 **"New OAuth App"**
3. 填写：
   | 字段 | 值 |
   |------|---|
   | Application name | `JHB Bible Study Church CMS` |
   | Homepage URL | `https://joburgchurch.co.za` |
   | Authorization callback URL | `https://placeholder.workers.dev/callback` *(部署后改)* |
4. 点 **"Register application"**
5. 在下一页复制：
   - **Client ID** ← 保存
   - **Generate a new client secret** → 复制并保存（只显示一次！）

---

## 第 2 步：拿到 Cloudflare 账号 ID（约 1 分钟）

1. 登录 <https://dash.cloudflare.com/>
2. 右上角点你的头像 → "My Profile" → 页面右侧有 **Account ID**，复制保存。

---

## 第 3 步：填写 `.env.local`（约 1 分钟）

在仓库根目录新建 `.env.local` 文件（已有则补充）：

```env
GITHUB_CLIENT_ID=把你刚才复制的 Client ID 粘贴进来
GITHUB_CLIENT_SECRET=把你刚才复制的 Client Secret 粘贴进来
CF_ACCOUNT_ID=把你刚才复制的 Account ID 粘贴进来
```

⚠️ 这个文件**已经在 `.gitignore` 里**，不会被提交。

---

## 第 4 步：运行部署脚本（约 3 分钟）

在 PowerShell 里：

```powershell
cd "C:\Users\Laptop\Desktop\Church-Site"
powershell -ExecutionPolicy Bypass -File scripts\deploy-oauth-worker.ps1
```

脚本会自动：

1. ✅ 克隆 `sveltia-cms-auth` 到仓库同级目录
2. ✅ 装依赖
3. ✅ 写入 `wrangler.toml`（worker 名字 = `joburgchurch-cms-auth`）
4. ✅ 弹出 Cloudflare 登录窗口（首次需要授权）
5. ✅ 把 Client ID / Secret 加密上传到 Worker
6. ✅ `wrangler deploy` 部署

成功后打印类似：

```
================================================
  WORKER DEPLOYED SUCCESSFULLY
  URL: https://joburgchurch-cms-auth.<你的子域>.workers.dev
================================================
```

**记下这个 URL。**

---

## 第 5 步：修正 GitHub OAuth 回调地址（约 30 秒）

回到 <https://github.com/settings/developers>，点你的 OAuth App，把 **Authorization callback URL** 改成：

```
https://joburgchurch-cms-auth.<你的子域>.workers.dev/callback
```

---

## 第 6 步：把 Worker URL 写入 `config.yml`（约 30 秒）

```powershell
powershell -ExecutionPolicy Bypass -File scripts\patch-oauth-config.ps1 `
  -WorkerUrl "https://joburgchurch-cms-auth.<你的子域>.workers.dev"
```

它会自动替换 `public/admin/config.yml` 里的 `YOUR_SUBDOMAIN` 占位符。

---

## 第 7 步：提交 + 推送（约 1 分钟）

```powershell
git add public/admin/config.yml scripts/deploy-oauth-worker.ps1 scripts/patch-oauth-config.ps1 docs/OAUTH_WORKER_DEPLOY.md
git commit -m "feat(cms): deploy OAuth worker + add bilingual admin guide"
git push
```

Cloudflare Pages 检测到 push 后会自动重新部署（约 1 分钟）。

---

## 第 8 步：邀请志愿者（GitHub Collaborators）

每个需要登录后台的成员，都必须在仓库里被加为 Collaborator（**Write** 角色）：

1. 打开 <https://github.com/saleo-svg/joburgchurch.co.za/settings/access>
2. 点 **"Add people"**
3. 输入成员的 GitHub 用户名 → 角色选 **Write**
4. 邀请发出后，成员会收到邮件，必须点 **"Accept invitation"** 才能登录。

---

## 第 9 步：测试登录

打开 <https://joburgchurch.co.za/admin/>：

1. 右下角应该能看到 **"📖 FIRST TIME HERE? → Volunteer Guide"** 引导卡片
2. 点 **"Login with GitHub"** → 授权 → 进入 Sveltia CMS 后台
3. 左侧应该看到 7 个板块 ✅

---

## ❓ 故障排查

| 问题 | 原因 / 解决 |
|------|------------|
| `wrangler login` 弹不出浏览器 | 用 `CLOUDFLARE_API_TOKEN` 走非交互式登录：<https://dash.cloudflare.com/profile/api-tokens> → 选 "Edit Cloudflare Workers" 模板 → 创建 → 把 token 加进 `.env.local` |
| 部署后还是 OAuth failed | 检查 GitHub OAuth App 的 callback URL 末尾有没有 `/callback`，且与 `base_url` 完全一致 |
| 成员登录显示 404 | 成员还没接受 GitHub 邀请邮件；让他/她查邮箱（含垃圾邮件） |
| 部署脚本里 `git pull` 报错 | 第一次运行不会有这个；第二次运行如果本地有未提交改动会失败——可以忽略 |
| Worker 部署成功但 `config.yml` 没改 | 重新跑第 6 步的 `patch-oauth-config.ps1` |

---

## 🔁 之后

部署一次就好。后续志愿者的内容更新会自动 commit 到 master → Cloudflare Pages 自动构建（约 1-2 分钟生效）。**你不需要做任何运维**。

如果你之后想撤销某个成员的写权限，去 <https://github.com/saleo-svg/joburgchurch.co.za/settings/access> 把他的 Collaborator 移除即可——他下次访问 `/admin/` 就会被拒。

---

## 💰 费用

- Cloudflare Workers 免费额度：每天 100,000 次请求（远超一个教会网站用量）
- Cloudflare Pages：免费
- GitHub：公开仓库免费

**总成本：$0/月。**