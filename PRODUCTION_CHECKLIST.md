# ✅ Production Deployment Checklist

Complete checklist before deploying ÉluIA to production.

---

## 🔧 Pre-Deployment

### Backend Configuration

- [ ] **Environment Variables Set**
  - [ ] ANTHROPIC_API_KEY
  - [ ] SECRET_KEY (unique, random, 32+ chars)
  - [ ] DATABASE_URL (auto-provided by Railway)
  - [ ] CORS_ORIGINS (placeholder, will update after frontend deployment)
  - [ ] RATE_LIMIT_PER_DAY (default: 20)
  - [ ] DAILY_BUDGET_ALERT_USD (default: 10.0)

- [ ] **Railway Setup**
  - [ ] Railway CLI installed: `npm install -g @railway/cli`
  - [ ] Logged in: `railway login`
  - [ ] Project initialized: `railway init`
  - [ ] PostgreSQL plugin added: `railway add --plugin postgresql`

- [ ] **Files Ready**
  - [ ] `railway.json` exists
  - [ ] `Procfile` exists
  - [ ] `runtime.txt` exists
  - [ ] `requirements.txt` updated with pinned versions
  - [ ] `.railwayignore` created
  - [ ] `alembic.ini` configured

### Frontend Configuration

- [ ] **Vercel Setup**
  - [ ] Vercel CLI installed: `npm install -g vercel`
  - [ ] Logged in: `vercel login`
  - [ ] Account verified

- [ ] **Frontend Landing**
  - [ ] `vercel.json` created
  - [ ] `.vercelignore` created
  - [ ] `.env.production` template ready
  - [ ] API calls updated to use environment variables

- [ ] **Frontend Admin**
  - [ ] `vercel.json` created (with proxy configuration)
  - [ ] `.vercelignore` created
  - [ ] Uses relative `/api/*` paths

- [ ] **Frontend Public Chat**
  - [ ] `vercel.json` created (with proxy configuration)
  - [ ] `.vercelignore` created
  - [ ] Uses relative `/api/*` paths

---

## 🚀 Deployment Steps

### 1. Deploy Backend

- [ ] Navigate to backend directory: `cd backend`
- [ ] Deploy: `railway up`
- [ ] Check deployment status: `railway status`
- [ ] Note Railway URL (e.g., `https://eluia-api.railway.app`)
- [ ] Test health endpoint: `curl https://your-url.railway.app/health`
- [ ] Verify database connected: `curl https://your-url.railway.app/api/health`

### 2. Update Frontend Configs

- [ ] Update `frontend-admin/vercel.json` with Railway URL
- [ ] Update `frontend-public/vercel.json` with Railway URL
- [ ] Commit changes to Git (optional, for CI/CD)

### 3. Deploy Frontend Landing

- [ ] Navigate: `cd frontend-landing`
- [ ] Deploy: `vercel --prod`
- [ ] Note Vercel URL
- [ ] Set environment variables in Vercel dashboard:
  - [ ] VITE_API_URL = Railway backend URL
  - [ ] VITE_ADMIN_URL = (will set after admin deployment)
- [ ] Redeploy: `vercel --prod`
- [ ] Test: Open URL in browser

### 4. Deploy Frontend Admin

- [ ] Navigate: `cd frontend-admin`
- [ ] Deploy: `vercel --prod`
- [ ] Note Vercel URL
- [ ] Update `VITE_ADMIN_URL` in landing frontend
- [ ] Redeploy landing: `cd ../frontend-landing && vercel --prod`
- [ ] Test: Open admin URL, try login

### 5. Deploy Frontend Public Chat

- [ ] Navigate: `cd frontend-public`
- [ ] Deploy: `vercel --prod`
- [ ] Note Vercel URL
- [ ] Test: Try accessing `/chat/test-slug`

### 6. Update CORS Configuration

- [ ] Collect all deployment URLs:
  - Landing: `https://eluia-landing.vercel.app`
  - Admin: `https://eluia-admin.vercel.app`
  - Chat: `https://eluia-chat.vercel.app`

- [ ] Update Railway CORS_ORIGINS:
  ```bash
  cd backend
  railway variables --set CORS_ORIGINS='["https://landing-url","https://admin-url","https://chat-url"]'
  ```

- [ ] Verify format: Valid JSON array, no trailing slashes

- [ ] Restart Railway deployment (happens automatically)

---

## 🧪 Post-Deployment Testing

### Backend Tests

- [ ] Health check: `curl https://backend-url/health`
  - Expected: `{"status":"healthy","service":"eluia-api"}`

- [ ] API health: `curl https://backend-url/api/health`
  - Expected: `{"status":"healthy","database":"connected",...}`

- [ ] CORS test:
  ```bash
  curl -H "Origin: https://evil.com" -I https://backend-url/health
  ```
  - Should NOT include `Access-Control-Allow-Origin: https://evil.com`

### Frontend Landing Tests

- [ ] Page loads correctly
- [ ] All sections visible
- [ ] Click "Essai gratuit 7 jours" button
- [ ] Fill registration form
- [ ] Submit and verify redirect to admin dashboard
- [ ] Check console for errors

### Frontend Admin Tests

- [ ] Login page loads
- [ ] Login with test credentials
- [ ] Dashboard displays correctly
- [ ] Upload test program document (PDF)
- [ ] Configure agent settings
- [ ] View analytics
- [ ] Export conversations CSV
- [ ] Copy chat link

### Frontend Public Chat Tests

- [ ] Access chat with candidate slug
- [ ] Chat interface loads
- [ ] Send test question
- [ ] Verify response from LLM
- [ ] Check "Messages restants" counter
- [ ] Try sending 21 messages (should hit rate limit)
- [ ] Verify anonymity (no personal data collected)

### Integration Tests

- [ ] End-to-end flow:
  1. Register on landing page
  2. Redirected to admin dashboard
  3. Upload program document
  4. Configure agent
  5. Copy chat link
  6. Open chat in incognito window
  7. Send questions
  8. View analytics in admin dashboard

- [ ] Cross-origin requests working
- [ ] JWT authentication working
- [ ] File upload working
- [ ] Rate limiting working

---

## 🔒 Security Verification

- [ ] **Secrets Check**
  - [ ] No API keys in Git history: `git log -p | grep "sk-ant"`
  - [ ] .env files in .gitignore
  - [ ] SECRET_KEY is unique and secure

- [ ] **CORS Configuration**
  - [ ] Only production URLs in CORS_ORIGINS
  - [ ] No wildcard `*` origins
  - [ ] No `http://` URLs (only HTTPS)

- [ ] **HTTPS Verification**
  - [ ] All URLs use HTTPS
  - [ ] SSL certificates valid
  - [ ] No mixed content warnings

- [ ] **Headers Check**
  ```bash
  curl -I https://frontend-url/
  ```
  - [ ] X-Content-Type-Options: nosniff
  - [ ] X-Frame-Options: DENY
  - [ ] X-XSS-Protection: 1; mode=block

- [ ] **Rate Limiting**
  - [ ] Tested and working (429 after limit)
  - [ ] Per-IP tracking functional
  - [ ] Daily reset working

---

## 📊 Monitoring Setup

- [ ] **Railway Monitoring**
  - [ ] Logs accessible: `railway logs`
  - [ ] Usage dashboard reviewed
  - [ ] Alerts configured (if available)

- [ ] **Vercel Monitoring**
  - [ ] Deployment logs checked
  - [ ] Analytics enabled
  - [ ] Error tracking reviewed

- [ ] **Cost Monitoring**
  - [ ] Anthropic Console: Spending limits set
  - [ ] Railway: Usage alerts configured
  - [ ] Vercel: Bandwidth monitored
  - [ ] DAILY_BUDGET_ALERT_USD set in backend

- [ ] **Health Monitoring** (Recommended)
  - [ ] Set up uptime monitoring (UptimeRobot, Pingdom)
  - [ ] Monitor `/health` endpoint every 5 minutes
  - [ ] Alert if down > 2 minutes
  - [ ] Set up error tracking (Sentry)

---

## 📚 Documentation

- [ ] **Internal Documentation**
  - [ ] DEPLOYMENT.md reviewed
  - [ ] ENV_SETUP.md reviewed
  - [ ] SECURITY.md reviewed
  - [ ] Team trained on deployment process

- [ ] **User-Facing Documentation**
  - [ ] Privacy Policy published
  - [ ] Terms of Service published
  - [ ] Cookie Policy (if applicable)
  - [ ] Help/FAQ section
  - [ ] Contact information

- [ ] **Runbooks**
  - [ ] Incident response procedure
  - [ ] Rollback procedure
  - [ ] Database backup/restore
  - [ ] API key rotation

---

## 🌐 Domain Configuration (Optional)

If using custom domains:

- [ ] **Purchase Domains**
  - [ ] Main domain (e.g., `eluia.fr`)
  - [ ] Subdomains planned:
    - `admin.eluia.fr`
    - `chat.eluia.fr`
    - `api.eluia.fr`

- [ ] **Railway Custom Domain**
  - [ ] Added in Railway dashboard
  - [ ] DNS records configured:
    - CNAME: `api.eluia.fr` → Railway URL
  - [ ] SSL certificate provisioned

- [ ] **Vercel Custom Domains**
  ```bash
  vercel domains add eluia.fr --project eluia-landing
  vercel domains add admin.eluia.fr --project eluia-admin
  vercel domains add chat.eluia.fr --project eluia-chat
  ```
  - [ ] DNS records configured (follow Vercel instructions)
  - [ ] SSL certificates provisioned

- [ ] **Update CORS_ORIGINS**
  - [ ] Replace Vercel URLs with custom domains
  - [ ] Redeploy Railway backend

- [ ] **Test Custom Domains**
  - [ ] All domains resolve correctly
  - [ ] HTTPS working on all domains
  - [ ] Cross-origin requests working

---

## 🚦 Go-Live Checklist

### Final Pre-Launch

- [ ] All tests passing
- [ ] Security review completed
- [ ] Performance tested (load testing if high traffic expected)
- [ ] Backup strategy in place
- [ ] Team briefed on launch plan

### Launch

- [ ] Mark all URLs as production-ready
- [ ] Update public-facing links
- [ ] Send announcement (if applicable)
- [ ] Monitor closely for first 24 hours

### Post-Launch (24 Hours)

- [ ] Check error rates
- [ ] Verify all features working
- [ ] Review logs for anomalies
- [ ] Monitor costs (API usage)
- [ ] Collect user feedback
- [ ] Address critical issues immediately

### Post-Launch (1 Week)

- [ ] Review analytics
- [ ] Optimize performance (if needed)
- [ ] Update documentation (based on learnings)
- [ ] Plan next iteration

---

## 🆘 Rollback Plan

If deployment fails or critical issues arise:

### Immediate Actions

1. **Identify Issue**
   - Check Railway logs: `railway logs`
   - Check Vercel logs in dashboard
   - Review error reports

2. **Quick Fixes**
   - Environment variable incorrect? Update and redeploy
   - CORS issue? Fix CORS_ORIGINS and restart
   - Code bug? Revert commit and redeploy

3. **Full Rollback** (if needed)
   ```bash
   # Railway: Rollback to previous deployment
   railway rollback
   
   # Vercel: Promote previous deployment
   vercel rollback
   ```

4. **Communicate**
   - Notify users (if public-facing)
   - Update status page
   - Document issue

### Post-Incident

- [ ] Root cause analysis
- [ ] Fix underlying issue
- [ ] Update tests to catch in future
- [ ] Document lessons learned
- [ ] Plan re-deployment

---

## 📋 Summary

When all boxes checked:

✅ **Backend deployed and healthy**
✅ **All frontends deployed and accessible**
✅ **CORS configured correctly**
✅ **End-to-end tests passing**
✅ **Security measures in place**
✅ **Monitoring configured**
✅ **Documentation complete**

**Status: Ready for Production! 🎉**

---

**Deployment Date:** _______________
**Deployed By:** _______________
**Version:** 1.0.0
**Notes:** _______________

---

Need help? See:
- DEPLOYMENT.md - Full deployment guide
- ENV_SETUP.md - Environment variables reference
- SECURITY.md - Security best practices
