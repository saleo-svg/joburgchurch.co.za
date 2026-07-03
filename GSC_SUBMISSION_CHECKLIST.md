# Google Search Console — 5-Minute Submission Checklist
**Site:** https://joburgchurch.co.za
**Last updated:** 2026-07-03
**Time required:** 5–10 minutes
**Who does it:** Owner (you, with your Google account)

---

## ⚠️ Important Note

I cannot do this for you. Google requires you to be signed in to your own Google account to verify ownership. This document is the exact step-by-step. If anything is unclear, send me a screenshot and I will help you troubleshoot.

---

## What is Google Search Console (GSC)?

GSC is Google's free tool that tells you:
- Which of your pages Google has indexed
- Which search queries show your site
- How many people click from Google to your site
- Any errors Google found crawling your site

After you submit your sitemap, GSC will start indexing all 50+ pages within 24–48 hours. Without GSC, indexing can take 2–4 weeks.

---

## Step-by-Step (5 minutes)

### Step 1: Open Google Search Console

1. Open Chrome (or any browser)
2. Go to **https://search.google.com/search-console**
3. Click **"Start now"**

You will be prompted to sign in. Use the Google account that controls your church's email. Recommended: **leo123asante@gmail.com** (the email on file with your hosting).

---

### Step 2: Add Your Property

1. After signing in, you'll see a "Search Console" welcome screen
2. Look for **"URL Prefix"** in the "Add a property" section
3. In the box, type exactly: **`https://joburgchurch.co.za`**
4. Click **"Continue"**

> Why URL Prefix and not Domain? URL Prefix lets you use HTML tag verification, which is faster. Domain verification requires DNS access, which is more complex.

---

### Step 3: Verify Ownership (HTML tag method)

Google will offer several verification methods. Pick **"HTML tag"**.

1. You will see a meta tag that looks like this:
   ```html
   <meta name="google-site-verification" content="abc123XYZ..." />
   ```
2. **Copy the entire tag** (you'll paste it into your site)
3. Send this tag to me (your AI assistant) — I will add it to the site and redeploy within 5 minutes
4. Once deployed, come back to GSC and click **"Verify"**

Alternative: DNS TXT record (more advanced, but works without code changes)

If you prefer DNS verification:
1. Pick **"DNS record"** in the verification method
2. Google will show a TXT record like `google-site-verification=abc123XYZ...`
3. Log into **Cloudflare** → your domain → DNS → Records → Add record
4. Type: TXT, Name: @, Content: [the verification string], TTL: Auto
5. Click save and wait 5 minutes
6. Back in GSC, click "Verify"

---

### Step 4: Submit Your Sitemap

After verification (takes about 30 seconds after I redeploy with the HTML tag):

1. In the left sidebar of GSC, click **"Sitemaps"**
2. In the "Add a new sitemap" box, type: **`sitemap.xml`**
3. Click **"Submit"**

You should immediately see status: **"Success"** and the number of URLs discovered (will be 50+).

---

### Step 5: Check Initial Indexing (optional but useful)

1. In the left sidebar, click **"Pages"** (under "Indexing")
2. You will see a list of all pages Google has discovered
3. After 24–48 hours, you should see most of your pages listed as "Indexed"

If you see "Discovered - currently not indexed", that is normal for the first week. Google is queuing them.

---

### Step 6: Request Indexing for Key Pages (optional)

For your most important pages, you can manually request indexing:

1. In the top search bar of GSC, paste a URL:
   - `https://joburgchurch.co.za/`
   - `https://joburgchurch.co.za/free-bible-study-sandton/`
   - `https://joburgchurch.co.za/online-bible-study-johannesburg/`
   - `https://joburgchurch.co.za/free-korean-class-johannesburg/`
2. Press Enter to inspect that URL
3. Click **"Request Indexing"**
4. Repeat for each key page

This speeds up indexing for those specific URLs. Limit: 10–12 per day.

---

## What Happens Next

| When | What |
|------|------|
| Immediately | Google knows your site exists |
| 24–48 hours | First crawl of sitemap begins |
| 3–7 days | Most pages start showing in GSC as "Indexed" |
| 7–14 days | First impressions show in "Performance" tab |
| 14–30 days | First clicks from search |
| 30–60 days | Ranking data becomes meaningful |

After 30 days, check GSC weekly:
- **Performance** → see which queries show your site
- **Pages** → see which are indexed
- **Experience** → see Core Web Vitals

---

## Common Issues and Fixes

### "Verification failed"

- Make sure the meta tag is in the `<head>` section of your homepage HTML, not in the body
- Make sure there is no extra whitespace in the tag
- Wait 5 minutes after I redeploy before clicking Verify

### "Sitemap could not be read"

- Check the URL is exactly `sitemap.xml` (no slash, no https://)
- Open `https://joburgchurch.co.za/sitemap.xml` in your browser — it should show XML, not a 404
- If 404, tell me and I will check why

### "Pages indexed but not ranking"

- Normal for the first 30 days. Google takes time to evaluate content quality.
- Check that the page has unique content (300+ words) and good schema
- Backlinks help. See `BACKLINK_SOP.md`.

---

## After GSC: Also Do These (30 minutes total)

| Action | Where | Time |
|--------|-------|------|
| Submit to Bing Webmaster | https://www.bing.com/webmasters | 5 min |
| Create Google Business Profile | https://business.google.com | 10 min |
| Create social profiles (10 sites) | See BACKLINK_SOP.md Tier 1 | 60 min one-time |

The Google Business Profile is the next-biggest impact. It puts you on Google Maps. See `SEO_BACKLINK_CHECKLIST.md` section 2 for full instructions. **The postcard arrives in 14 days** — there is no way around this.

---

## What I (Your AI) Can and Cannot Do

| I can do | I cannot do |
|----------|-------------|
| Add the HTML verification tag to your site and redeploy | Log into your Google account |
| Wait for your sitemap to be valid and tell you if it is broken | Submit the sitemap on your behalf |
| Help you read GSC reports afterwards | Receive the GBP postcard |
| Diagnose ranking issues | Bypass Google's ownership verification |

So the only thing you need to do today is **5 minutes**:
1. Open GSC
2. Add property
3. Send me the verification tag
4. After I redeploy, click Verify
5. Submit sitemap

That's it. The rest of the SEO work happens automatically once Google starts crawling.

---

## Quick-Reference (one-line summary)

> **Go to search.google.com/search-console → add https://joburgchurch.co.za → verify (HTML tag, send to me) → submit sitemap.xml → done.**

---

## Updates & Notes

- **2026-07-03**: This document created. Owner follow-up pending.
- **Owner action required**: 5–10 minutes of clicking in GSC.
- **Goal**: 100% of pages indexed within 7 days of submission.