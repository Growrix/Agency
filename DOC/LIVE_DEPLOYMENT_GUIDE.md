# Live Deployment Configuration Guide

## Current Status

✅ **What's Ready:**
- Frontend app wired to Sanity CMS API
- Mock blog data completely removed
- Local Studio running on `localhost:3333`
- Blog posts will auto-appear on any domain (live, local, staging)

---

## Frontend Live Deployment

### The Good News
Your frontend **automatically works on any domain** without extra setup:
- `localhost:5000` → Fetches from Sanity ✅
- `yourdomain.com` → Fetches from Sanity ✅
- `staging.yourdomain.com` → Fetches from Sanity ✅

**No special configuration needed** - the API endpoint is universal.

---

## Two Deployment Options

### Option A: Local Studio Only (Recommended - 90% of users)

```
Setup:
├─ Frontend: yourdomain.com (LIVE)
│  └─ Queries Sanity API automatically
└─ Studio: localhost:3333 (Your computer only)
   └─ You create/edit posts here
```

**Workflow:**
1. You (on your computer): `npm --prefix studio run dev`
2. You login to `localhost:3333` and create posts
3. Posts sync to Sanity cloud automatically
4. Anyone on the internet: visits `yourdomain.com` and sees your posts

**Pros:**
- No server costs for Studio hosting
- Simple setup (just one command)
- Studio never exposed to internet (safer)
- Instant deployment (just push frontend code)

**Cons:**
- Only you can edit (from your computer or VPN)
- Studio not accessible from live domain

**Use case:** Perfect for single author, small teams, or agencies managing multiple clients.

---

### Option B: Live Studio Deployment (Advanced)

```
Setup:
├─ Frontend: yourdomain.com (LIVE)
│  └─ Queries Sanity API automatically
└─ Studio: cms.yourdomain.com (LIVE)
   └─ Anyone with login can edit from anywhere
```

**Workflow:**
1. Deploy Studio to Vercel/Netlify/Custom server
2. Configure CORS for `cms.yourdomain.com`
3. Team members access `cms.yourdomain.com` and create posts
4. Posts sync to Sanity
5. Frontend shows posts automatically

**Pros:**
- Accessible from anywhere (no VPN needed)
- Team collaboration (multiple editors)
- Professional setup
- Looks like "branded CMS"

**Cons:**
- Extra hosting needed
- More complex setup
- Additional maintenance
- Costs if using paid hosting

**Use case:** When multiple team members need access, or you want branded CMS interface.

---

## Implementation Steps

### Quick Start (Option A - Local Studio)

```bash
# 1. Build frontend for production
npm --prefix web run build

# 2. Deploy to your hosting (Vercel, Netlify, etc.)
# Follow your hosting provider's instructions
# Example for Vercel:
vercel --prod

# 3. That's it! Your frontend is live.
# Keep running Studio locally:
npm --prefix studio run dev
```

**Verify it works:**
```bash
# From your live domain, check:
curl "https://yourdomain.com/blog"
# Should show published posts
```

---

### Advanced Setup (Option B - Live Studio)

**Step 1:** Add to root `package.json`:
```json
{
  "scripts": {
    "studio:deploy": "cd studio && npm run build && vercel deploy --prod"
  }
}
```

**Step 2:** In Sanity Project Settings add CORS origin:
```
https://cms.yourdomain.com
```

**Step 3:** Deploy Studio:
```bash
npm run studio:deploy
```

**Step 4:** Add DNS CNAME:
```
cms.yourdomain.com → your-vercel-domain.vercel.app
```

---

## Current Environment Variables

**In `web/.env.local` (frontend):**
```env
SANITY_PROJECT_ID=1tk4ulcx
SANITY_DATASET=production
SANITY_API_VERSION=2026-04-23
SANITY_API_TOKEN=[viewer-token]
```

✅ Already configured for live use (API is public-facing).

**In `studio/.env.local` (if needed):**
```env
SANITY_PROJECT_ID=1tk4ulcx
SANITY_DATASET=production
```

✅ Already inherited from `sanity.config.ts`

---

## API Endpoint Reference

Your Sanity API is:
```
https://1tk4ulcx.api.sanity.io/v2026-04-23/data/query/production
```

This endpoint:
- Works from any domain ✅
- Doesn't require authentication (viewer-level queries)
- Returns published posts only
- Cached at Sanity edge (fast globally)

---

## Testing Before Going Live

```bash
# 1. Test local build
npm --prefix web run build
npm --prefix web run preview

# 2. Test API connectivity
curl "https://1tk4ulcx.api.sanity.io/v2026-04-23/data/query/production?query=%7B%22query%22:%22%2A%5B_type%20%3D%3D%20%27blogPost%27%20%26%26%20defined%28publishedAt%29%5D%20%7C%20order%28publishedAt%20desc%29%5B0..5%5D%7B%20title,%20slug,%20excerpt%20%7D%22%7D"

# 3. Verify SSL certificate (if using custom domain)
curl -I https://yourdomain.com

# 4. Run E2E tests
npm --prefix web run test:e2e
```

---

## Troubleshooting Live Deployment

### Posts not showing on live domain

**Check 1:** Verify API connectivity
```bash
curl "https://yourdomain.com/api/blog/posts"
# Should return JSON array of posts
```

**Check 2:** Verify Sanity can reach your domain
```bash
# On Sanity Project Settings → API
# Check if yourdomain.com is in CORS whitelist
```

**Check 3:** Verify posts are published
```bash
# In Studio (localhost:3333)
# Make sure posts have "Publish" button clicked (not just saved)
```

### SSL certificate issues

**If using custom domain:**
```bash
# Generate SSL (Vercel handles automatically)
# Or use Let's Encrypt for self-hosted
```

### Slow blog loading

**Check 1:** Verify Sanity API response time
```bash
time curl "https://1tk4ulcx.api.sanity.io/v2026-04-23/data/query/production?query=..."
# Should be <500ms
```

**Check 2:** Check frontend build size
```bash
npm --prefix web run build
# Check .next/static/chunks size
# Should be <5MB total
```

---

## Next Steps Based on Your Choice

**You need to tell me:**

1. **Where is your live domain?**
   - Example: `growrixos.com`, `staging.growrix.com`, `example.com`

2. **Which deployment option?**
   - Option A (local Studio only) - recommended
   - Option B (live Studio deployment)

3. **Your hosting platform?**
   - Vercel, Netlify, custom server, etc.

**Once I have this info, I'll:**
- Generate exact deployment commands
- Configure environment variables
- Set up CORS if needed
- Verify live connectivity

---

## One-Line Summary

**Your frontend works on any domain automatically.** Keep Studio local (`localhost:3333`). You edit posts locally, world sees them live instantly. That's it.

Ready to deploy? Provide your domain and hosting info.
