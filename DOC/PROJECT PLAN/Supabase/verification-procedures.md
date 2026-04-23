# Supabase Integration Verification Procedures

**Purpose:** Step-by-step validation that Supabase auth and persistence are working correctly after schema bootstrap.

**Status:** Ready to execute (SQL bootstrap: ✅ Complete)

---

## Pre-Verification Checklist

Before running these procedures, confirm:

- ✅ SQL schema executed: `public.app_state` table created in Supabase
- ✅ `.env.local` populated with SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SECRET_KEY
- ✅ `.env.local` contains AUTH_JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
- ✅ Build passes: `npm run build` (0 errors)
- ✅ Tests pass: `npm run test` (8/8 passing)

---

## Test Phase 1: Local Development Verification

### 1.1 Start Development Server

```bash
cd web
npm run dev
```

**Expected output:**
```
▲ Next.js 16.2.4 (Turbopack)
- Local:         http://localhost:5000
- Network:       http://0.0.0.0:5000
- Environments: .env.local
✓ Ready in 1263ms
```

**Troubleshooting:**
- If server won't start: Check for port 5000 conflicts; try `npm run dev -- -p 5001`
- If "Cannot find module" errors: Run `npm install` in `web/` directory
- If slow filesystem warning: This is normal on network drives; can ignore

---

### 1.2 Test User Registration

**Endpoint:** `POST /api/v1/auth/register`

**PowerShell Command:**
```powershell
$headers = @{'Content-Type'='application/json'}
$body = @{
  email='testuser1@example.com'
  password='TestPassword123!'
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri 'http://localhost:5000/api/v1/auth/register' `
  -Method POST -Headers $headers -Body $body
  
Write-Host "Status: $($response.StatusCode)"
Write-Host "Body: $($response.Content | ConvertFrom-Json | ConvertTo-Json)"
```

**Expected Response:**
```json
{
  "user": {
    "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "email": "testuser1@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Status Code:** 200 or 201

**Indicates:**
- ✅ Supabase Auth accepted user creation
- ✅ JWT token generated successfully
- ✅ app_state table is writable (session stored)

**Troubleshooting:**
- **500 error:** Check server logs; likely app_state table doesn't exist or RLS is blocking
- **400 error:** Invalid email format or password too weak
- **403 error:** Check SUPABASE_SECRET_KEY is correct and has service_role permissions

---

### 1.3 Test User Login

**Endpoint:** `POST /api/v1/auth/login`

**PowerShell Command:**
```powershell
$headers = @{'Content-Type'='application/json'}
$body = @{
  email='testuser1@example.com'
  password='TestPassword123!'
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri 'http://localhost:5000/api/v1/auth/login' `
  -Method POST -Headers $headers -Body $body
  
Write-Host "Status: $($response.StatusCode)"
Write-Host "Headers:"
$response.Headers | ForEach-Object { Write-Host "$_`: $($response.Headers[$_])" }
Write-Host "Body: $($response.Content | ConvertFrom-Json | ConvertTo-Json)"
```

**Expected Response:**
```json
{
  "user": {
    "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "email": "testuser1@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Headers Check:**
- Look for `Set-Cookie` header with session cookie (httpOnly, secure, sameSite)

**Status Code:** 200

**Indicates:**
- ✅ Supabase Auth verified credentials
- ✅ Session cookie set correctly
- ✅ JWT token issued by app

**Troubleshooting:**
- **401 error:** Email or password incorrect
- **500 error:** Check server logs for Supabase Auth connection issues
- **No Set-Cookie header:** Session cookie generation may be failing

---

### 1.4 Get Current User

**Endpoint:** `GET /api/v1/me`

**PowerShell Command:**
```powershell
$headers = @{'Content-Type'='application/json'}

# Use the token from login response
$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." # Replace with actual token

$response = Invoke-WebRequest -Uri 'http://localhost:5000/api/v1/me' `
  -Method GET -Headers @{'Authorization'="Bearer $token"}
  
Write-Host "Status: $($response.StatusCode)"
Write-Host "Body: $($response.Content | ConvertFrom-Json | ConvertTo-Json)"
```

**Expected Response:**
```json
{
  "user": {
    "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "email": "testuser1@example.com"
  }
}
```

**Status Code:** 200

**Indicates:**
- ✅ Session is valid
- ✅ User identity can be retrieved from token
- ✅ Auth middleware working correctly

---

## Test Phase 2: Persistence Verification

### 2.1 Query app_state in Supabase

**Method:** Supabase SQL Editor

1. Go to: [Supabase Dashboard](https://supabase.com/dashboard) → Growrix OS project
2. Click **SQL Editor** in left sidebar
3. Click **New Query**
4. Run this query:

```sql
select 
  id,
  jsonb_pretty(payload) as data,
  updated_at
from public.app_state
order by updated_at desc
limit 10;
```

**Expected Results:**
- Rows with application state from registration/login operations
- `payload` column contains JSON data
- `updated_at` shows recent timestamps

**Indicates:**
- ✅ app_state table is readable and populated
- ✅ Persistence layer working
- ✅ Data is stored in Supabase PostgreSQL

**Troubleshooting:**
- **No rows returned:** app_state is empty; registration may not have persisted
  - Check server logs for write errors
  - Verify SUPABASE_SECRET_KEY has INSERT permissions
- **Table doesn't exist:** SQL bootstrap didn't execute; run schema again
- **Permission denied:** RLS may be blocking; check that RLS is disabled

---

### 2.2 Verify Table Structure

**In Supabase SQL Editor:**

```sql
\d public.app_state
```

Or use the UI:
1. Click **Table Editor** in left sidebar
2. Find `app_state` table
3. Check columns: id, payload, updated_at

**Expected Structure:**
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | text | No | None |
| payload | jsonb | No | None |
| updated_at | timestamptz | No | now() |

---

## Test Phase 3: Build & Test Suite Validation

### 3.1 Rebuild and Verify Zero Errors

```bash
cd web
npm run build
```

**Expected:**
```
✓ Compiled successfully
✓ Ready for production
```

**Check:** No TypeScript errors, no webpack warnings (non-breaking)

---

### 3.2 Run Test Suite

```bash
npm run test
```

**Expected:**
```
Test Suites: 1 passed, 1 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        X.XXXs
```

**Indicates:**
- ✅ Auth flows work with local fallback (tests isolated from live env)
- ✅ Persistence works (file-backed in tests)
- ✅ No regressions introduced

**Troubleshooting:**
- **Test failures:** Check test output for specific errors
  - If "Cannot connect to Supabase": This is expected; tests use local fallback
  - If file I/O errors: Check `web/data/` directory is writable

---

## Test Phase 4: Admin Bootstrap Verification (Optional)

### 4.1 Check Admin User

**Query in Supabase SQL Editor:**

```sql
select * from auth.users where email = 'admin@growrixos.com';
```

**Expected:**
- Row exists with admin email
- Confirmed email_confirmed_at is set
- Role and metadata fields populated

**Indicates:**
- ✅ Admin account was seeded during initialization
- ✅ Admin can log in with ADMIN_PASSWORD

### 4.2 Test Admin Login

Same as 1.3 (Test User Login), but use:
- Email: `admin@growrixos.com`
- Password: (value from ADMIN_PASSWORD in .env.local)

---

## Verification Summary Checklist

After completing all phases, verify:

### Phase 1: Local Development
- [ ] Dev server starts without errors
- [ ] Registration returns 200 with user ID and token
- [ ] Login returns 200 with valid session cookie
- [ ] GET /me returns current user

### Phase 2: Persistence
- [ ] app_state table has entries in Supabase
- [ ] Table structure matches expected schema
- [ ] Queries return valid JSON data

### Phase 3: Build & Tests
- [ ] Build completes with 0 errors
- [ ] All 8 tests pass
- [ ] No TypeScript or webpack errors

### Phase 4: Admin (Optional)
- [ ] Admin user exists in Supabase Auth
- [ ] Admin can login with admin credentials

---

## Success Criteria

**✅ Integration is verified if:**

1. All three verification phases pass
2. User registration works (Supabase Auth)
3. User login works (JWT + session cookie)
4. Persistence works (app_state table)
5. Build clean, tests passing
6. No TypeScript errors reported

**Next Step:** Ready for production deployment

---

## Troubleshooting Matrix

| Symptom | Likely Cause | Solution |
|---|---|---|
| 500 on /register | app_state table missing or RLS blocking | Verify schema executed, RLS disabled |
| 401 on /login | Invalid credentials or no user in auth | Ensure registration succeeded first |
| No Set-Cookie header | Session encryption failing | Check AUTH_JWT_SECRET is set correctly |
| app_state table empty | Persistence not writing | Check SUPABASE_SECRET_KEY permissions |
| Build fails | TypeScript errors | Run `npm run build` and check errors |
| Tests fail | Test isolation not working | Verify env cleanup in beforeEach() |
| Cannot connect to Supabase | SUPABASE_URL incorrect or offline | Confirm endpoint in .env.local |

---

## Production Deployment

After verification succeeds:

1. **Set NEXT_PUBLIC_SITE_URL** to your production domain
2. **Configure deployment secrets** with all SUPABASE_* and AUTH_* values
3. **Run verification again** in production environment
4. **Monitor logs** for auth/persistence errors in first 24 hours
5. **Scale database** if needed (Supabase can auto-scale)

See [environment-configuration.md](./environment-configuration.md) for detailed deployment steps.

---

## References

- **Integration Status:** [integration-status.md](./integration-status.md)
- **Environment Setup:** [environment-configuration.md](./environment-configuration.md)
- **Schema Definition:** [web/supabase/schema.sql](../../../../web/supabase/schema.sql)
- **Code Integration:** [web/README.md](../../../../web/README.md)
