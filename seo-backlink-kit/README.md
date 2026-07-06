# SEO Backlink Kit — Joburgchurch.co.za

> 这是一份**合法的、长期的、有声誉的**外链建设工具包。
>
> **我不会帮你做 spam**：自动发论坛评论、买链接、link exchange、PBN、博客 spam。
> 这些表面看像外链，**实际会被 Google Penguin 惩罚**。
>
> 我会帮你做**SEO 行业公认有效**的：directory citations, guest posts, local partnerships, monitoring。

---

## 📁 文件清单

| 文件 | 作用 |
|------|------|
| `README.md` | 你正在读的 — 总入口 |
| `A-directory-submission-pack.md` | 26 个合法 SA 目录 + NAP 一致的填写模板 |
| `directories.csv` | 监控脚本要读的目录清单 (24 个 active) |
| `B-guest-post-articles.md` | 2 篇 ready-to-pitch 客座文章草稿 |
| `C-local-partner-outreach.md` | Sandton / Parkmore 本地合作清单 + 5 个邮件模板 |
| `D-monitor.py` | Python 监控脚本（每周跑） |
| `report-YYYY-MM-DD.md` | 上一次运行生成的健康报告 |

---

## 🚀 第一周必做 (60-90 min)

1. **打开 `A-directory-submission-pack.md`** → 复制 NAP 块
2. 去 **Google Business Profile** (https://www.google.com/business/) 注册教会 → 等 postcard (4-14 days)
3. **Bing Places** 同时注册（不用等 postcard）
4. 全部 24 个目录**分两周提交** (每天 2-3 个 — 提交过快会被反 spam 标记)
5. **打开 `B-guest-post-articles.md`** → pitch Article 1 给 The Christian Post Africa 或 Gateway News

## 第二周起

- **每周一**，跑 `D-monitor.py`：
  ```
  cd C:\Users\Laptop\Desktop\Church-Site\seo-backlink-kit
  python D-monitor.py
  ```
  生成 `report-2026-XX-XX.md`，过一遍"Action needed"清单。
- **每周**，从 `C-local-partner-outreach.md` 发 5 封 outreach 邮件。
- **每周**，Google Business Profile 发 1 个新 post（活动、照片、quote）。
- **每月**，从 Google Search Console 导出 `gsc-links-latest.csv` 放到此目录，监控脚本会算 new/lost 链接。

---

## ⏰ 想自动每周跑？两个选择

### 选项 1：Windows Task Scheduler（推荐 — 你已有 Windows）

1. 打开 **Task Scheduler** (`taskschd.msc`)
2. **Create Task**：
   - Name: `JBSC backlink monitor`
   - Trigger: Weekly, Monday 06:00
   - Action: Start a program
     - Program: `python`
     - Arguments: `D-monitor.py`
     - Start in: `C:\Users\Laptop\Desktop\Church-Site\seo-backlink-kit`
3. 测试时改成一次性 trigger（5 min 后），验证 `report-YYYY-MM-DD.md` 被写入。

### 选项 2：开机登录时跑（更简单）

1. 创建一个 `run-monitor.bat`：
   ```bat
   @echo off
   cd /d "C:\Users\Laptop\Desktop\Church-Site\seo-backlink-kit"
   python D-monitor.py > last-run.log 2>&1
   ```
2. 把 `.bat` 快捷方式放 **Startup** 文件夹 (`shell:startup`)。
3. 每次开电脑自动跑一次。

---

## 🛡️ 我**不会**帮你做的（再说一次）

| 你可能想要的 | 为什么不 | 风险 |
|--------------|---------|------|
| 自动在论坛贴链接留言 | Spam | Penguin 惩罚 |
| 买目录链接 | Google 政策 | 人工 + 算法惩罚 |
| PBN（私链网络）| 违反政策 | 域名整杀 |
| 链接交换 "你贴我也贴" | Link scheme | 双向惩罚 |
| 自动 mass-pitch outreach | ISP 标 spam | 整个域名发件人黑名单 |

我**会**帮你做的（在以上文件里都已经有）：

| 你需要的 | 在哪 | 时间投入 |
|---------|------|---------|
| 24 个合法目录注册 | `A-directory-submission-pack.md` | 一周分散做 |
| 2 篇客座文章投稿 | `B-guest-post-articles.md` | 总共 2 小时 review + pitch |
| 25 个本地合作 outreach | `C-local-partner-outreach.md` | 每周 1 小时 |
| 自动监控 24 个目录存活 | `D-monitor.py` | 0 分钟（自动） |

---

## 📈 预期效果

如果你**每周**做这件事：

| 时间 | 你会有 |
|------|---------|
| 第 1 个月 | 5-8 个目录引用 (citations) |
| 第 3 个月 | 1-2 篇客座文章发布 + 2-3 个本地合作链接 |
| 第 6 个月 | 20+ 高质量引用 + 永久外链 |
| 第 12 个月 | 5-10 个优质客座/合作链接，建立真人脉 |

这些**每一个**都是：
- ✅ 永久
- ✅ Google 算法友好
- ✅ 真人脉
- ✅ 对教会品牌有正面价值（而不是 spam 标签）

vs spam 方式的"短期效果 + 长期惩罚"。

---

## 🚨 紧急：如果你今天就要看到"行动"

请按这个顺序（不需要等任何回复我）：

1. **Google Business Profile 注册**（最关键）— 30 min
2. **从 `directories.csv` 拿前 5 个目录**（GBP, Bing Places, Apple Maps, Yellow Pages, Brabys）一次性提交 — 90 min
3. **复制 `B-guest-post-articles.md` 里的 Article 1**，把 Sim 改成你的真名（或你教会牧师的名字），**email 给** editor@gatewaynews.co.za — 20 min
4. **跑一次**：`python D-monitor.py`，看 `report-2026-07-04.md` — 30 sec

整个**下午做一次**，你就有 5 个真实引用 + 1 个投稿发出去了。

---

## 📞 Help / Questions

回到同一个 Cursor chat，回 "外链 step X 问..." 我会继续帮。
