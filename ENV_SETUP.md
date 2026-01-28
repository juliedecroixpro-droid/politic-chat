# 🔐 Environment Variables Setup Guide

Complete reference for all environment variables needed across ÉluIA deployments.

---

## 🚂 Railway (Backend API)

Set these in **Railway Dashboard → Project → Variables**

### Required Variables

```env
# API Keys
ANTHROPIC_API_KEY=sk-ant-api03-...
```
- **Where to get:** [Anthropic Console](https://console.anthropic.com) → API Keys
- **Format:** `sk-ant-api03-` followed by alphanumeric string
- **Required:** ✅ Yes
- **Cost:** Usage-based (Claude Haiku ~$0.25/1M tokens)

```env
# Security
SECRET_KEY=your-secure-random-key-here
```
- **How to generate:** `python -c "import secrets; print(secrets.token_urlsafe(32))"`
- **Example:** `vGqXJ8KmN5pR3sT6wY9zB2cF5hK8mP1qT4vX7zA0bD3fG6j`
- **Required:** ✅ Yes
- **⚠️ NEVER use the default value in production!**

```env
# Database
DATABASE_URL=postgresql://user:password@host:port/database
```
- **Source:** Automatically provided by Railway PostgreSQL plugin
- **Format:** `postgresql://username:password@hostname:port/dbname`
- **Required:** ✅ Yes (auto-provided)
- **Note:** Don't set manually unless using external database

```env
# CORS Origins
CORS_ORIGINS=["https://eluia-landing.vercel.app","https://eluia-admin.vercel.app","https://eluia-chat.vercel.app"]
```
- **Format:** JSON array of allowed frontend URLs
- **Required:** ✅ Yes
- **⚠️ Update with your actual Vercel deployment URLs**
- **No trailing slashes!**
- **Example with custom domains:**
  ```
  ["https://eluia.fr","https://admin.eluia.fr","https://chat.eluia.fr"]
  ```

### Optional Variables

```env
# OpenAI API (Fallback)
OPENAI_API_KEY=sk-proj-...
```
- **Where to get:** [OpenAI Platform](https://platform.openai.com) → API Keys
- **Required:** ❌ No (but recommended for redundancy)
- **Used for:** Fallback when Anthropic is down

```env
# Rate Limiting
RATE_LIMIT_PER_DAY=20
```
- **Default:** 20 messages per IP per day
- **Recommended:** 20-50 for public chat
- **Type:** Integer

```env
# Cost Monitoring
DAILY_BUDGET_ALERT_USD=10.0
```
- **Default:** $10/day alert threshold
- **Purpose:** Log warning when daily API costs exceed this
- **Type:** Float

```env
# Document Processing
MAX_PAGES=100
MAX_FILE_SIZE_MB=50
```
- **Defaults:** 100 pages, 50MB
- **Purpose:** Limit program document size
- **Type:** Integer

```env
# LLM Configuration
PRIMARY_MODEL=claude-3-haiku-20240307
FALLBACK_MODEL=gpt-3.5-turbo
EMBEDDING_MODEL=text-embedding-3-small
```
- **Defaults:** As shown above
- **Options:**
  - Primary: `claude-3-haiku-20240307`, `claude-3-sonnet-20240229`, `claude-3-opus-20240229`
  - Fallback: `gpt-3.5-turbo`, `gpt-4`
  - Embeddings: `text-embedding-3-small`, `text-embedding-3-large`

```env
# Storage Paths
CHROMA_PERSIST_DIR=/app/data/chroma_db
```
- **Default:** `./chroma_db` (local dev)
- **Production:** Use persistent volume path
- **Railway:** `/app/data/chroma_db` (if volume mounted)

---

## 🌐 Vercel - Frontend Landing

Set these in **Vercel Dashboard → Project (eluia-landing) → Settings → Environment Variables**

### Required Variables

```env
VITE_API_URL=https://your-backend.railway.app
```
- **Value:** Your Railway backend deployment URL
- **Format:** `https://` (include protocol, no trailing slash)
- **Example:** `https://eluia-api.railway.app`
- **Environment:** Production
- **Required:** ✅ Yes

```env
VITE_ADMIN_URL=https://your-admin.vercel.app
```
- **Value:** Your admin dashboard Vercel URL
- **Format:** `https://` (include protocol, no trailing slash)
- **Example:** `https://eluia-admin.vercel.app`
- **Purpose:** Redirect users after signup
- **Environment:** Production
- **Required:** ✅ Yes

### How to Set in Vercel

**Via Dashboard:**
1. Go to Vercel Dashboard
2. Select `eluia-landing` project
3. Settings → Environment Variables
4. Add each variable:
   - Key: `VITE_API_URL`
   - Value: `https://your-backend.railway.app`
   - Environment: **Production** (check the box)
5. Click Save
6. Redeploy: Deployments → Latest → Redeploy

**Via CLI:**
```bash
cd frontend-landing
vercel env add VITE_API_URL production
# Enter value: https://your-backend.railway.app

vercel env add VITE_ADMIN_URL production
# Enter value: https://your-admin.vercel.app

# Redeploy
vercel --prod
```

---

## ⚙️ Vercel - Frontend Admin

Set these in **Vercel Dashboard → Project (eluia-admin) → Settings → Environment Variables**

### Configuration

**No environment variables needed!**

The admin frontend uses:
- Relative `/api/*` paths
- Vercel proxy (configured in `vercel.json`)
- Proxies to Railway backend automatically

### Important: Update vercel.json

Before deploying, ensure `frontend-admin/vercel.json` has correct backend URL:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://your-actual-backend.railway.app/api/:path*"
    }
  ]
}
```

Replace `your-actual-backend.railway.app` with your Railway URL.

---

## 💬 Vercel - Frontend Public Chat

Set these in **Vercel Dashboard → Project (eluia-chat) → Settings → Environment Variables**

### Configuration

**No environment variables needed!**

Similar to admin, uses:
- Relative `/api/*` paths
- Vercel proxy (configured in `vercel.json`)

### Important: Update vercel.json

Before deploying, ensure `frontend-public/vercel.json` has correct backend URL:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://your-actual-backend.railway.app/api/:path*"
    }
  ]
}
```

---

## 📋 Environment Variables Checklist

### Before First Deployment

- [ ] Generate secure SECRET_KEY
- [ ] Obtain Anthropic API key
- [ ] (Optional) Obtain OpenAI API key
- [ ] Create `.env` file locally for testing

### After Railway Deployment

- [ ] Note Railway backend URL
- [ ] Set ANTHROPIC_API_KEY in Railway
- [ ] Set SECRET_KEY in Railway
- [ ] Verify DATABASE_URL is auto-set
- [ ] Set initial CORS_ORIGINS (can update later)

### After Vercel Deployments

- [ ] Note all Vercel deployment URLs
- [ ] Update CORS_ORIGINS in Railway with all frontend URLs
- [ ] Set VITE_API_URL in landing frontend
- [ ] Set VITE_ADMIN_URL in landing frontend
- [ ] Update vercel.json files with Railway URL
- [ ] Redeploy frontends

### Production Ready

- [ ] All URLs use HTTPS
- [ ] SECRET_KEY is unique and secure
- [ ] CORS_ORIGINS matches exactly (no typos, no trailing slashes)
- [ ] Rate limiting configured appropriately
- [ ] Cost alerts set
- [ ] Test all flows end-to-end

---

## 🔒 Security Best Practices

### ✅ DO:
- Use environment variables for all secrets
- Generate unique SECRET_KEY per environment
- Rotate API keys periodically
- Use strict CORS origins (exact URLs only)
- Monitor usage and costs
- Enable 2FA on Railway and Vercel accounts

### ❌ DON'T:
- Commit `.env` files to Git
- Use default SECRET_KEY
- Share API keys publicly
- Use wildcard CORS origins (`*`)
- Store secrets in code
- Reuse keys across projects

---

## 🧪 Testing Environment Variables

### Test Locally

Create `.env` file:

```env
ANTHROPIC_API_KEY=sk-ant-test-key
SECRET_KEY=test-secret-key-do-not-use-in-prod
DATABASE_URL=sqlite:///./test.db
CORS_ORIGINS=["http://localhost:5173","http://localhost:3000"]
```

Run:
```bash
cd backend
python -c "from config import settings; print(f'API Key: {settings.ANTHROPIC_API_KEY[:10]}...')"
```

### Test Railway Variables

```bash
railway run env
```

Shows all environment variables in Railway.

### Test Vercel Variables

```bash
vercel env ls
```

Lists all environment variables per project.

---

## 🆘 Troubleshooting

### "Missing ANTHROPIC_API_KEY"

**Solution:** Set in Railway variables:
```bash
railway variables --set ANTHROPIC_API_KEY=sk-ant-...
```

### "CORS policy error"

**Symptoms:** Frontend shows CORS error in console

**Solution:**
1. Check CORS_ORIGINS in Railway exactly matches frontend URLs
2. Format: `["url1","url2"]` (valid JSON)
3. No trailing slashes
4. Restart Railway deployment

### "Invalid SECRET_KEY"

**Solution:** Generate new key:
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

Set in Railway:
```bash
railway variables --set SECRET_KEY=<generated-key>
```

### Environment Variable Not Working

**Check:**
1. Spelling (case-sensitive!)
2. Applied to correct environment (Production vs Preview)
3. Redeployed after setting
4. No extra spaces in value

---

## 📖 References

- [Railway Environment Variables](https://docs.railway.app/develop/variables)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [FastAPI Settings](https://fastapi.tiangolo.com/advanced/settings/)

---

**Last updated:** 2024
**Version:** 1.0

Need help? Check DEPLOYMENT.md for full deployment guide.
