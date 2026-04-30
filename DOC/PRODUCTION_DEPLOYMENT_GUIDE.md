# Production Deployment Guide for www.growrixos.com

## Quick Status ✅

**Domain:** www.growrixos.com  
**Frontend:** Production-ready  
**CMS:** Sanity (auto-configured)  
**Blog API:** Active and tested  
**Configuration:** Complete  

---

## Pre-Deployment Checklist

- [x] Domain: www.growrixos.com identified
- [x] Environment variables updated (.env.production, next.config.ts)
- [x] Sanity CMS configured (project 1tk4ulcx, production dataset)
- [x] CORS headers configured for live domain
- [x] SSL/TLS ready (use hosting provider's auto-SSL)
- [x] Build verified locally

---

## Deployment Options

### Option 1: Vercel (Recommended - 5 minutes)

**Why Vercel:**
- ✅ Optimized for Next.js
- ✅ Automatic SSL
- ✅ Global CDN (fast worldwide)
- ✅ One-click deployment
- ✅ Free tier available

**Steps:**

#### 1. Connect Repository to Vercel
```bash
# Navigate to https://vercel.com
# Click "New Project"
# Select "Agency" repository
# Framework: Next.js (auto-detected)
# Root directory: web/
```

#### 2. Environment Variables
```
In Vercel Dashboard → Settings → Environment Variables → Add:

NEXT_PUBLIC_SITE_URL=https://www.growrixos.com
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyAiDvmPIsjcMdjDbdBGi5GbQGGCAoch7sg
NEXT_PUBLIC_GOOGLE_PLACE_SEARCH_TEXT=Growrix OS, 82, 1 Rd-2, Niekton, Gulshan 1, Dhaka 1212, Bangladesh
NEXT_PUBLIC_GOOGLE_PLACE_ID=ChIJn2bmb6pYVTcR1QwQnQwQnQw
OPENAI_API_KEY=<set-in-hosting-secret-manager>
OPENAI_MODEL=o3-mini
RESEND_API_KEY=<set-in-hosting-secret-manager>
CONTACT_TO_EMAIL=growrixos@gmail.com
CONTACT_FROM_EMAIL=Growrix <hello@growrixos.com>
SUPABASE_URL=<set-in-hosting-secret-manager>
SUPABASE_ANON_KEY=<set-in-hosting-secret-manager>
SUPABASE_SECRET_KEY=<set-in-hosting-secret-manager>
AUTH_JWT_SECRET=<set-in-hosting-secret-manager>
ADMIN_EMAIL=<set-in-hosting-secret-manager>
ADMIN_PASSWORD=<set-in-hosting-secret-manager>
SANITY_PROJECT_ID=1tk4ulcx
SANITY_DATASET=production
SANITY_API_VERSION=2025-01-01
SANITY_API_TOKEN=<set-in-hosting-secret-manager>
REVALIDATE_SECRET=<set-in-hosting-secret-manager>
```

#### 3. Configure Build Settings
```
Build Command: npm run build
Output Directory: .next
Install Command: npm install --production
```

#### 4. Domain Setup
```
In Vercel Dashboard → Domains:
Add Domain: www.growrixos.com

Then update your DNS provider (Namecheap, GoDaddy, etc.):
CNAME: www.growrixos.com → cname.vercel-dns.com
(Exact CNAME provided by Vercel)
```

#### 5. Deploy
```bash
# Automatic on git push to main
git push origin main
# Vercel auto-builds and deploys
# Takes ~2-3 minutes
```

---

### Option 2: Netlify (Alternative)

```bash
npm install -g netlify-cli
cd web
netlify deploy --prod
```

---

### Option 3: Self-Hosted (Custom Server)

```bash
# Build
npm --prefix web run build

# Start production server
npm --prefix web run start

# Access at:
https://www.growrixos.com (with reverse proxy/SSL configured)
```

---

## Post-Deployment Verification

### 1. Check Homepage
```bash
curl https://www.growrixos.com
# Should return full HTML (not error)
```

### 2. Check Blog Works
```bash
curl https://www.growrixos.com/blog
# Should show blog post list from Sanity
```

### 3. Check API
```bash
curl https://www.growrixos.com/api/blog/posts
# Should return JSON array of posts
```

### 4. Check SSL
```bash
curl -I https://www.growrixos.com
# Should show: HTTP/2 200
# Should show: SSL/TLS enabled
```

### 5. Performance Test
```bash
# Use: https://pagespeed.web.dev
# Enter: www.growrixos.com
# Should score: >80
```

---

## Monitoring & Maintenance

### Daily Checks
```bash
# Verify site is up
curl -I https://www.growrixos.com

# Check blog posts loading
curl https://www.growrixos.com/api/blog/posts | jq '.length'
```

### Weekly Tasks
- [ ] Check error logs in hosting dashboard
- [ ] Verify Sanity API connectivity
- [ ] Test contact form
- [ ] Check Google Maps display

### Monthly Tasks
- [ ] Update dependencies: `npm update`
- [ ] Check security vulnerabilities: `npm audit`
- [ ] Performance analysis via PageSpeed
- [ ] Database backups (Supabase)

---

## Troubleshooting

### Issue: Homepage not loading
```bash
# Check environment variables are set
# Check NEXT_PUBLIC_SITE_URL is correct
# Check build logs in Vercel dashboard
```

### Issue: Blog posts not showing
```bash
# Verify Sanity API is accessible
curl "https://1tk4ulcx.api.sanity.io/v2025-01-01/data/query/production?query=%7B%22query%22:%22%2A%5B_type%20%3D%3D%20%27blogPost%27%5D%7B%20title%20%7D%22%7D"

# Should return: [{"title": "Your Post Title"}]
```

### Issue: Sanity post published but not live yet
```bash
# 1) Confirm the post is actually published (not draft only)
# 2) Confirm schedule is not in the future
#    scheduledPublishAt must be empty or <= current time

# 3) Trigger on-demand cache invalidation manually
curl -X POST "https://www.growrixos.com/api/revalidate?secret=$REVALIDATE_SECRET&type=blogPost"

# 4) Verify live routes
curl -I https://www.growrixos.com/blog
curl -I https://www.growrixos.com/blog/<your-slug>
```

Sanity webhook (recommended):
- URL: `https://www.growrixos.com/api/revalidate?secret=<REVALIDATE_SECRET>&type={_type}`
- Trigger on create/update/delete for `blogPost`, `caseStudy`, `shopItem`, `servicePage`, `siteSettings`.
- If `_type` is not passed by query, the endpoint also reads JSON payload `_type` as fallback.

Fallback strategy:
- Blog routes now use ISR (`revalidate = 60`), so new blog content appears within 60 seconds even if webhook delivery fails.
- Primary path remains webhook revalidation for near-instant updates.

### Issue: SSL certificate error
```
Wait 5-10 minutes after domain DNS update
Vercel auto-generates certificate (no action needed)
```

### Issue: Slow loading
```bash
# Check CDN cache
# Check Sanity API latency
curl -w "@curl-format.txt" -o /dev/null -s "https://www.growrixos.com/api/blog/posts"
# Should be <500ms
```

---

## Rollback (If Needed)

### Vercel
```bash
# In Vercel Dashboard → Deployments → Select previous deployment → Promote to Production
```

### Git
```bash
git revert HEAD
git push origin main
# Vercel auto-redeploys previous version
```

---

## Custom Domain Email Configuration

To use `hello@growrixos.com` for Resend emails:

1. **Add domain to Resend:**
   - Resend Dashboard → Domains → Add www.growrixos.com
   - Update MX records as instructed

2. **Update CONTACT_FROM_EMAIL:**
   ```
   CONTACT_FROM_EMAIL=Growrix <hello@growrixos.com>
   ```

3. **Verify SPF/DKIM:**
   ```bash
   dig +short growrixos.com txt | grep v=spf1
   # Should show Resend SPF record
   ```

---

## Security Checklist

- [x] HTTPS/SSL enabled
- [x] CSP headers configured
- [x] X-Frame-Options set to DENY
- [x] X-Content-Type-Options set to nosniff
- [x] Environment variables not exposed in frontend
- [x] Admin credentials not in source code
- [x] API tokens secured

---

## Sanity CMS Configuration for Live Domain

✅ **Already Configured:**
- Project ID: 1tk4ulcx
- Dataset: production
- API Version: 2025-01-01
- CORS: www.growrixos.com (pre-configured)

**To add Studio (optional):**
```
If you want cms.growrixos.com accessible from internet:
1. Deploy Studio (studio/ directory) to Vercel
2. Add domain: cms.growrixos.com
3. Update Sanity CORS allowlist
```

---

## Summary

```
┌──────────────────────────────────────────────────────────────┐
│         Production Deployment: www.growrixos.com             │
├──────────────────────────────────────────────────────────────┤
│ Frontend:        ✅ Ready (Next.js 16.2.4)                   │
│ CMS:             ✅ Sanity (configured)                      │
│ Blog:            ✅ Fully wired                              │
│ Domain:          ✅ www.growrixos.com                        │
│ SSL/TLS:         ✅ Auto (via Vercel)                        │
│ CDN:             ✅ Global (via Vercel)                      │
│ Monitoring:      ✅ Enabled                                  │
├──────────────────────────────────────────────────────────────┤
│ Action:          READY TO DEPLOY                            │
│ Recommended:     Use Vercel (5 minutes)                      │
│ Time Estimate:   5-15 minutes including DNS propagation    │
└──────────────────────────────────────────────────────────────┘
```

---

## Next Steps

1. **If using Vercel:**
   ```bash
   git push origin main
   # Vercel auto-deploys
   # Check https://vercel.com/dashboard
   ```

2. **If using other platform:**
   - Build: `npm --prefix web run build`
   - Start: `npm --prefix web run start`
   - Point domain via DNS/CNAME

3. **After deployment:**
   - Open www.growrixos.com in browser
   - Test /blog page
   - Create 2-3 posts in local Studio
   - Verify they appear on live domain

---

## Questions?

- **Blog not showing?** → Check Sanity API connectivity
- **Domain not resolving?** → Wait 5-10min for DNS propagation
- **Performance slow?** → Check CDN cache on Vercel dashboard
- **Need help?** → Check hosting provider's support dashboard

**Status:** ✅ **Production Configuration Complete - Ready to Deploy!**
