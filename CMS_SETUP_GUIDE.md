# Volunteer CMS Setup Guide — Sveltia CMS for Johannesburg Bible Study Church

**Goal:** Allow church volunteers to upload photos, write blog posts, publish events, and add videos — without touching code.

**Time to complete:** ~30 minutes (mostly waiting for GitHub and Cloudflare).

---

## What You Are Building

A no-code admin panel at `https://joburgchurch.co.za/admin/` where volunteers can:
- Log in with their GitHub account
- Upload photos to the Gallery
- Write and publish blog posts (in markdown)
- Add events to the calendar
- Embed YouTube videos
- Add sermon series and Bible study notes
- Submit hymn/song suggestions for review
- Update service times and contact info

When they publish, the change is automatically committed to GitHub and the site rebuilds within 1-2 minutes.

---

## Step 1: Create a GitHub OAuth App (5 minutes)

This lets your volunteers log in to the CMS using their GitHub accounts.

1. Go to: https://github.com/settings/developers
2. Click **"New OAuth App"**
3. Fill in:
   - **Application name:** `JHB Bible Study Church CMS`
   - **Homepage URL:** `https://joburgchurch.co.za`
   - **Application description:** `Content manager for the church website`
   - **Authorization callback URL:** `https://joburgchurch-cms-auth.YOUR_SUBDOMAIN.workers.dev/callback`
     - (Replace `YOUR_SUBDOMAIN` with your actual Cloudflare Workers subdomain — you will get this in Step 2)
     - If you do not have it yet, use `https://placeholder.workers.dev/callback` and update it later
4. Click **"Register application"**
5. On the next page, copy:
   - **Client ID** (long string)
   - **Generate a new client secret** → copy and save it securely

> **Tip:** Use a password manager (Bitwarden, 1Password) to save the Client Secret. You cannot view it again.

---

## Step 2: Deploy the OAuth Worker to Cloudflare (10 minutes)

The OAuth Worker is the bridge between your CMS UI and GitHub.

### Option A: One-Click Deploy (easiest)

1. Go to: https://github.com/sveltia/sveltia-cms-auth
2. Click the blue **"Deploy to Cloudflare Workers"** button
3. Sign in to Cloudflare if prompted
4. Cloudflare will fork the repo and deploy the worker
5. After deployment, copy the worker URL (looks like `https://sveltia-cms-auth.YOUR-SUBDOMAIN.workers.dev`)

### Option B: Manual Deploy (more control)

```bash
# Clone the auth worker
git clone https://github.com/sveltia/sveltia-cms-auth.git
cd sveltia-cms-auth

# Install dependencies
npm install

# Login to Cloudflare (opens browser)
npx wrangler login

# Deploy the worker
npx wrangler deploy
```

After deploy, the worker URL is printed. Copy it.

### Configure the Worker Environment Variables

1. Go to Cloudflare dashboard → **Workers & Pages**
2. Click on your newly deployed `sveltia-cms-auth` worker
3. Go to **Settings** → **Variables**
4. Add these two variables (mark them as **encrypted** secrets):
   - `GITHUB_CLIENT_ID` = (the Client ID from Step 1)
   - `GITHUB_CLIENT_SECRET` = (the Client Secret from Step 1)
5. Save

### Update the GitHub OAuth Callback

1. Go back to https://github.com/settings/developers
2. Click on your `JHB Bible Study Church CMS` app
3. Update **Authorization callback URL** to your actual worker URL + `/callback`
4. Save

---

## Step 3: Update Your CMS Config (2 minutes)

Edit `public/admin/config.yml` in your repository:

```yaml
backend:
  name: github
  repo: saleo-svg/joburgchurch.co.za
  branch: master
  base_url: https://sveltia-cms-auth.YOUR-ACTUAL-SUBDOMAIN.workers.dev  # ← paste your real worker URL
```

Save and push to GitHub. Cloudflare Pages will auto-deploy.

---

## Step 4: Invite Volunteers as GitHub Collaborators (5 minutes)

Anyone who logs into the CMS must be a GitHub collaborator on your repo.

1. Go to: https://github.com/saleo-svg/joburgchurch.co.za/settings/access
2. Click **"Add people"**
3. Enter each volunteer's GitHub username
4. Choose role: **Write** (they can push to the repo, which is what Sveltia needs)
5. Send the invitation

> The volunteer must accept the GitHub invitation email before they can log in to the CMS.

---

## Step 5: Test the Login Flow

1. Visit https://joburgchurch.co.za/admin/
2. Click **"Login with GitHub"**
3. Authorize the OAuth app
4. You should land in the Sveltia CMS dashboard with 7 collections visible:
   - Blog Posts
   - Sermons & Bible Studies
   - Events
   - Photo Gallery
   - Videos
   - Site Settings
   - Hymn Suggestions

If you see an error:
- **"OAuth failed"** → Check that `base_url` in `config.yml` matches your worker URL exactly
- **"Repository not found"** → Make sure the volunteer is added as a collaborator
- **"Bad credentials"** → Re-check the Client ID / Secret in Worker variables

---

## Step 6: Deploy This Setup (1 minute)

The `public/admin/` folder is already in your repo. Just push and Cloudflare Pages will deploy it automatically.

```bash
git add -A
git commit -m "Add Sveltia CMS admin panel"
git push
```

After Cloudflare deploys (~1 minute), visit `https://joburgchurch.co.za/admin/` and log in.

---

## Volunteer User Guide

After setup is complete, share this with your volunteers:

### How to Log In

1. Go to https://joburgchurch.co.za/admin/
2. Click "Login with GitHub"
3. Use your GitHub account (you must have been invited as a collaborator first)

### How to Upload a Photo

1. Click **Photo Gallery** in the left sidebar
2. Click **"New Photo"** (top right)
3. Fill in:
   - **Title** — e.g. "Parkmore Picnic 2026"
   - **Date** — when the photo was taken
   - **Photo** — drag and drop your image file
   - **Category** — Bible Study / Korean Class / Youth / Community / Other
   - **Caption** — one or two sentences
   - **Alt Text** — describe the photo for screen readers
4. Click **"Publish"**
5. Wait 1-2 minutes. The photo appears on the Gallery page automatically.

### How to Write a Blog Post

1. Click **Blog Posts** in the sidebar
2. Click **"New Blog Post"**
3. Fill in title, description, body (in markdown), tags
4. Click **"Publish"**

### How to Add an Event

1. Click **Events** in the sidebar
2. Click **"New Event"**
3. Fill in date, time, location, description
4. Click **"Publish"**

### How to Add a YouTube Video

1. Upload your video to YouTube first (if not already)
2. Copy the YouTube ID — the part after `youtu.be/` or `v=` in the URL
3. In Sveltia: **Videos** → **New Video** → paste the ID
4. Click **"Publish"**

### How to Submit a Hymn Suggestion

Volunteers can submit new song suggestions for review:
1. Click **Hymn Suggestions** in the sidebar
2. Click **"New Hymn Suggestion"**
3. Fill in song details (title, language, artist, chords, YouTube link, lyrics)
4. Click **"Publish"**
5. Admin will review and add approved songs to the main hymns collection

---

## Volunteer Permissions Summary

Volunteers have **full permissions** to:
- ✅ Create, edit, and delete blog posts (with images)
- ✅ Create, edit, and delete events (with images)
- ✅ Upload photos to the gallery
- ✅ Add YouTube videos
- ✅ Create sermon and Bible study entries
- ✅ Submit hymn/song suggestions
- ✅ Update site settings (contact info, service times)

**Review required** (admin only):
- Hymns added to main collection after review

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| "OAuth failed" | Verify `base_url` in `config.yml` exactly matches worker URL |
| Login button does nothing | Open browser DevTools (F12) → Console → check for errors |
| Volunteer cannot log in | They must accept the GitHub collaboration invitation email first |
| Image upload fails | Check image size (<5MB) and format (jpg, png, webp, gif) |
| Changes not appearing on site | Wait 1-2 minutes for Cloudflare Pages to rebuild |
| Permission denied on commit | Volunteer role on GitHub must be "Write", not "Read" |

---

## Cost

- **Cloudflare Workers free tier:** 100,000 requests/day — more than enough
- **GitHub:** Free for public repos; private repos are paid
- **Cloudflare Pages:** Free for static sites

**Total cost: $0/month** for unlimited volunteers.

---

## Security Notes

- Volunteer writes are committed directly to master branch
- For sensitive edits (about page, service times), keep editing as the repo owner
- Sveltia UI shows a diff before commit — volunteers can review their changes
- To restrict further: add a Cloudflare Access policy in front of `/admin/`

---

## Maintenance

You (the repo owner) do **not** need to do anything for volunteer content updates. Cloudflare Pages rebuilds and deploys automatically when Sveltia commits.

If you ever need to roll back a volunteer change:
1. Go to https://github.com/saleo-svg/joburgchurch.co.za/commits/master
2. Find the commit you want to revert
3. Click "Revert" → creates a new commit undoing that change
4. Cloudflare auto-deploys the revert

---

**Questions?** Email the Cloudflare Discord (https://discord.gg/cloudflaredev) or check Sveltia docs: https://sveltiacms.app