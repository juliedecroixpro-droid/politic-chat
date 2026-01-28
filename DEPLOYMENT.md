# 🚀 ÉluIA Production Deployment Guide

Complete guide to deploy ÉluIA to production using Railway (backend) and Vercel (frontend).

## 📋 Prerequisites

Before deploying, ensure you have:

### Accounts
- [ ] [Railway](https://railway.app) account (free tier available)
- [ ] [Vercel](https://vercel.com) account (free tier available)
- [ ] [Anthropic API](https://console.anthropic.com) account with API key
- [ ] (Optional) [OpenAI API](https://platform.openai.com) account for fallback

### Local Tools
- [ ] Node.js 18+ and npm installed
- [ ] Git installed
- [ ] Terminal/command line access

### Required Information
- [ ] Anthropic API key
- [ ] A secure SECRET_KEY (generate with: `python -c "import secrets; print(secrets.token_urlsafe(32))"`)
- [ ] Your domains (if using custom domains)

---

## 🎯 Quick Start (10 Minutes)

### Option 1: Automated Deployment

```bash
cd politic-chat
./deploy.sh
```

The script will:
1. Check prerequisites
2. Deploy backend to Railway
3. Deploy all frontends to Vercel
4. Provide next steps

### Option 2: Manual Deployment

Follow the detailed steps below.

---

## 🔧 Manual Deployment Steps

### Step 1: Backend Deployment (Railway)

#### 1.1 Install Railway CLI

```bash
npm install -g @railway/cli
```

#### 1.2 Login to Railway

```bash
cd backend
railway login
```

#### 1.3 Initialize Railway Project

```bash
railway init
```

Follow the prompts:
- Create a new project or select existing
- Name it "eluia-backend" (or your preference)

#### 1.4 Add PostgreSQL Database

In Railway dashboard or via CLI:

```bash
railway add --plugin postgresql
```

Railway will automatically provide `DATABASE_URL` environment variable.

#### 1.5 Set Environment Variables

In Railway dashboard, go to your project → Variables, and add:

```env
ANTHROPIC_API_KEY=sk-ant-your-key-here
SECRET_KEY=your-secure-random-key-here
CORS_ORIGINS=["https://your-landing.vercel.app","https://your-admin.vercel.app","https://your-chat.vercel.app"]
RATE_LIMIT_PER_DAY=20
DAILY_BUDGET_ALERT_USD=10.0
PRIMARY_MODEL=claude-3-haiku-20240307
```

Or via CLI:

```bash
railway variables --set ANTHROPIC_API_KEY=sk-ant-...
railway variables --set SECRET_KEY=your-key-here
```

#### 1.6 Deploy

```bash
railway up
```

#### 1.7 Get Your Railway URL

```bash
railway status
```

Note your deployment URL (e.g., `https://eluia-backend.railway.app`)

#### 1.8 Run Database Migrations

```bash
railway run alembic upgrade head
```

Or SSH into the container:

```bash
railway run python -c "from database import init_db; init_db()"
```

---

### Step 2: Frontend Landing Deployment (Vercel)

#### 2.1 Install Vercel CLI

```bash
npm install -g vercel
```

#### 2.2 Login to Vercel

```bash
cd ../frontend-landing
vercel login
```

#### 2.3 Deploy to Production

```bash
vercel --prod
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? (Select your account)
- Link to existing project? **N** (first time)
- What's your project's name? **eluia-landing**
- In which directory is your code located? **.**
- Want to override settings? **N**

#### 2.4 Set Environment Variables

In Vercel dashboard → Project → Settings → Environment Variables:

```env
VITE_API_URL=https://your-backend.railway.app
VITE_ADMIN_URL=https://your-admin.vercel.app
```

Or via CLI:

```bash
vercel env add VITE_API_URL production
# Enter: https://your-backend.railway.app

vercel env add VITE_ADMIN_URL production
# Enter: https://your-admin.vercel.app
```

#### 2.5 Redeploy with Environment Variables

```bash
vercel --prod
```

---

### Step 3: Frontend Admin Deployment (Vercel)

#### 3.1 Update vercel.json

Edit `frontend-admin/vercel.json` and replace the Railway URL:

```json
"destination": "https://your-backend.railway.app/api/:path*"
```

#### 3.2 Deploy

```bash
cd ../frontend-admin
vercel --prod
```

Follow similar prompts, naming it **eluia-admin**.

---

### Step 4: Frontend Public Chat Deployment (Vercel)

#### 4.1 Update vercel.json

Edit `frontend-public/vercel.json` and replace the Railway URL:

```json
"destination": "https://your-backend.railway.app/api/:path*"
```

#### 4.2 Deploy

```bash
cd ../frontend-public
vercel --prod
```

Name it **eluia-chat**.

---

### Step 5: Update CORS Configuration

Now that you have all deployment URLs, update Railway environment variables:

```bash
cd ../backend
railway variables --set CORS_ORIGINS='["https://eluia-landing.vercel.app","https://eluia-admin.vercel.app","https://eluia-chat.vercel.app"]'
```

Replace with your actual Vercel URLs.

---

## 🌐 Custom Domains (Optional)

### Railway Custom Domain

1. Go to Railway dashboard → Your project → Settings → Domains
2. Add custom domain (e.g., `api.eluia.fr`)
3. Add DNS records as instructed

### Vercel Custom Domains

For each frontend:

```bash
vercel domains add eluia.fr --project eluia-landing
vercel domains add admin.eluia.fr --project eluia-admin
vercel domains add chat.eluia.fr --project eluia-chat
```

Follow DNS configuration instructions.

**After setting custom domains, update CORS_ORIGINS again!**

---

## 🔒 SSL/HTTPS

Both Railway and Vercel provide **automatic SSL certificates**. No configuration needed!

All deployments will be accessible via HTTPS by default.

---

## 📊 Monitoring & Logs

### Railway Logs

```bash
cd backend
railway logs
```

Or view in Railway dashboard → Deployments → Logs

### Vercel Logs

```bash
vercel logs <deployment-url>
```

Or view in Vercel dashboard → Project → Deployments → Logs

### Health Check

Backend health endpoint:

```bash
curl https://your-backend.railway.app/health
```

Should return: `{"status":"healthy"}`

---

## 🧪 Testing Deployment

### 1. Test Backend

```bash
curl https://your-backend.railway.app/health
```

### 2. Test Landing Page

- Visit: `https://your-landing.vercel.app`
- Try registration flow
- Verify it redirects to admin after signup

### 3. Test Admin Dashboard

- Visit: `https://your-admin.vercel.app`
- Login with a test account
- Upload a program document
- Configure agent settings

### 4. Test Public Chat

- Get your candidate slug from admin dashboard
- Visit: `https://your-chat.vercel.app/chat/your-slug`
- Send test messages
- Verify responses from LLM

---

## 🔄 Continuous Deployment

Both Railway and Vercel support automatic deployments from Git:

### Enable Git Integration

#### Railway

```bash
railway link
```

Connect to your GitHub/GitLab repo. Railway will auto-deploy on push to main.

#### Vercel

```bash
vercel git connect
```

Link your GitHub repo. Vercel will auto-deploy on push.

### Branch Deployments

- **Production**: Push to `main` branch
- **Staging**: Push to `staging` branch (Vercel creates preview URLs)

---

## 🚨 Troubleshooting

### Backend Not Starting

**Check Railway logs:**

```bash
railway logs
```

**Common issues:**
- Missing environment variables → Set ANTHROPIC_API_KEY, SECRET_KEY
- Database connection error → Ensure PostgreSQL plugin is added
- Port binding error → Railway auto-provides $PORT, don't hardcode

### Frontend Build Fails

**Check Vercel logs in dashboard**

**Common issues:**
- Node version mismatch → Ensure package.json has `"node": "18.x"`
- Missing dependencies → Run `npm install` locally first
- Environment variables not set → Add in Vercel dashboard

### CORS Errors

**Symptoms:** Frontend can't reach backend, console shows CORS error

**Fix:**
1. Check Railway CORS_ORIGINS includes all frontend URLs
2. Must be valid JSON array: `["url1","url2"]`
3. No trailing slashes in URLs
4. Restart Railway deployment after updating

### Database Connection Issues

**Check DATABASE_URL format:**

```
postgresql://user:password@host:port/database
```

Railway provides this automatically. If using external DB, set manually.

### 429 Rate Limit Errors

**Symptoms:** Users getting "Too many requests"

**Fix:**
1. Check rate limiter settings in backend config
2. Increase RATE_LIMIT_PER_DAY if needed
3. Verify IP detection works correctly (X-Forwarded-For header)

---

## 💰 Cost Estimation

### Free Tier Limits

**Railway Free Tier:**
- $5 credit/month
- ~500 hours runtime
- 1GB RAM, 1GB storage
- Should cover ~500-1000 requests/day

**Vercel Free Tier:**
- 100GB bandwidth/month
- Unlimited deployments
- Covers most small-to-medium traffic

### Paid Plans

**Railway:**
- Pro: $20/month + usage
- Suitable for production apps

**Vercel:**
- Pro: $20/user/month
- Enterprise: Custom pricing

**Anthropic API:**
- Claude Haiku: ~$0.25 per 1M input tokens
- Budget accordingly based on expected traffic

---

## 📈 Scaling

### Horizontal Scaling

**Railway:**
- Add replicas in Railway dashboard
- Load balancing automatic

**Vercel:**
- Edge network automatic
- Scales to millions of requests

### Database Scaling

**Railway PostgreSQL:**
- Vertical scaling: Increase resources
- Horizontal: Add read replicas (Pro plan)

**Alternative:** Migrate to managed PostgreSQL (AWS RDS, Supabase, etc.)

---

## 🔐 Security Checklist

- [ ] SECRET_KEY is random and secure (not the default!)
- [ ] API keys stored in environment variables only (never committed to Git)
- [ ] CORS_ORIGINS set to exact production domains
- [ ] HTTPS enabled on all endpoints (automatic)
- [ ] Rate limiting enabled
- [ ] Database backups configured (Railway auto-backups on Pro)
- [ ] Environment variables reviewed
- [ ] No sensitive data in logs

---

## 📚 Additional Resources

- [Railway Documentation](https://docs.railway.app)
- [Vercel Documentation](https://vercel.com/docs)
- [FastAPI Deployment Guide](https://fastapi.tiangolo.com/deployment/)
- [Vite Production Build](https://vitejs.dev/guide/build.html)

---

## 🆘 Support

**Issues with ÉluIA deployment?**

1. Check logs (Railway + Vercel)
2. Review this guide
3. Check GitHub issues
4. Contact support

---

**Last updated:** 2024
**Version:** 1.0

Happy deploying! 🚀
