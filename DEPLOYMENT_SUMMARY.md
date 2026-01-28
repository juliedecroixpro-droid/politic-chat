# 🚀 ÉluIA Deployment - Quick Reference

Quick deployment guide for ÉluIA production setup.

---

## 📦 What's Included

```
politic-chat/
├── backend/
│   ├── railway.json          ✅ Railway configuration
│   ├── Procfile              ✅ Process definition
│   ├── runtime.txt           ✅ Python version
│   ├── requirements.txt      ✅ Dependencies (pinned)
│   ├── .railwayignore        ✅ Ignore file
│   ├── .env.production       ✅ Environment template
│   ├── alembic.ini           ✅ Database migrations
│   └── alembic/              ✅ Migration scripts
│
├── frontend-landing/
│   ├── vercel.json           ✅ Vercel configuration
│   ├── .vercelignore         ✅ Ignore file
│   └── .env.production       ✅ Environment template
│
├── frontend-admin/
│   ├── vercel.json           ✅ Vercel + proxy config
│   ├── .vercelignore         ✅ Ignore file
│   └── .env.production       ✅ Environment template
│
├── frontend-public/
│   ├── vercel.json           ✅ Vercel + proxy config
│   ├── .vercelignore         ✅ Ignore file
│   └── .env.production       ✅ Environment template
│
├── deploy.sh                 ✅ Automated deployment script
├── DEPLOYMENT.md             ✅ Full deployment guide
├── ENV_SETUP.md              ✅ Environment variables reference
├── SECURITY.md               ✅ Security best practices
└── PRODUCTION_CHECKLIST.md  ✅ Pre-launch checklist
```

---

## ⚡ Quick Deploy (10 Minutes)

### Prerequisites

```bash
# Install CLIs
npm install -g vercel @railway/cli

# Generate SECRET_KEY
python -c "import secrets; print(secrets.token_urlsafe(32))"

# Get Anthropic API key
# → https://console.anthropic.com
```

### Deploy

```bash
cd politic-chat
./deploy.sh
```

Follow the prompts. Script will:
1. ✅ Deploy backend to Railway
2. ✅ Deploy frontends to Vercel
3. ✅ Update configurations
4. ✅ Provide next steps

---

## 🔧 Manual Deploy

### 1. Backend (Railway)

```bash
cd backend
railway login
railway init
railway add --plugin postgresql

# Set environment variables
railway variables --set ANTHROPIC_API_KEY=sk-ant-...
railway variables --set SECRET_KEY=your-random-key

# Deploy
railway up

# Get URL
railway status
```

### 2. Frontends (Vercel)

```bash
# Landing
cd frontend-landing
vercel login
vercel --prod
# → Note URL

# Admin
cd ../frontend-admin
vercel --prod
# → Note URL

# Public Chat
cd ../frontend-public
vercel --prod
# → Note URL
```

### 3. Update CORS

```bash
cd backend
railway variables --set CORS_ORIGINS='["https://landing-url","https://admin-url","https://chat-url"]'
```

Replace with actual URLs (no trailing slashes).

---

## 🧪 Test Deployment

```bash
# Backend health
curl https://your-backend.railway.app/health

# Frontend landing
open https://your-landing.vercel.app

# Admin dashboard
open https://your-admin.vercel.app

# Public chat (replace with real slug)
open https://your-chat.vercel.app/chat/test
```

---

## 📊 Architecture

```
┌─────────────────┐
│  Landing Page   │  ← Vercel (Static)
│  (Marketing)    │     VITE_API_URL → Backend
└─────────────────┘     VITE_ADMIN_URL → Admin

┌─────────────────┐
│ Admin Dashboard │  ← Vercel (Static)
│  (Candidate UI) │     /api/* → Proxy → Backend
└─────────────────┘

┌─────────────────┐
│  Public Chat    │  ← Vercel (Static)
│  (Voter UI)     │     /api/* → Proxy → Backend
└─────────────────┘

┌─────────────────┐
│  Backend API    │  ← Railway (Python/FastAPI)
│  (FastAPI)      │     ↓
└─────────────────┘     PostgreSQL (Railway)
        ↓
   Anthropic API
```

---

## 🌐 URLs After Deployment

| Service | Default URL | Custom Domain (Optional) |
|---------|------------|--------------------------|
| **Backend API** | `eluia-api.railway.app` | `api.eluia.fr` |
| **Landing Page** | `eluia-landing.vercel.app` | `eluia.fr` |
| **Admin Dashboard** | `eluia-admin.vercel.app` | `admin.eluia.fr` |
| **Public Chat** | `eluia-chat.vercel.app` | `chat.eluia.fr` |

---

## 🔑 Required Environment Variables

### Railway (Backend)

| Variable | Example | Required |
|----------|---------|----------|
| `ANTHROPIC_API_KEY` | `sk-ant-api03-...` | ✅ |
| `SECRET_KEY` | `random-32-char-string` | ✅ |
| `DATABASE_URL` | `postgresql://...` | ✅ (auto) |
| `CORS_ORIGINS` | `["https://url1","https://url2"]` | ✅ |

### Vercel (Landing)

| Variable | Example | Required |
|----------|---------|----------|
| `VITE_API_URL` | `https://backend.railway.app` | ✅ |
| `VITE_ADMIN_URL` | `https://admin.vercel.app` | ✅ |

### Vercel (Admin & Chat)

No environment variables needed (uses proxy).

---

## 🔒 Security Checklist

- [x] SECRET_KEY is unique and random
- [x] API keys in environment variables only
- [x] CORS_ORIGINS set to exact URLs
- [x] HTTPS enabled (automatic)
- [x] Rate limiting configured (20/day)
- [x] SQL injection protection (SQLAlchemy)
- [x] Input validation (Pydantic)
- [x] Security headers configured

---

## 💰 Cost Estimate

| Service | Free Tier | Estimated Cost |
|---------|-----------|----------------|
| **Railway** | $5/month credit | ~$0-5/month (low traffic) |
| **Vercel** | 100GB bandwidth | $0 (within limits) |
| **Anthropic** | Pay per use | ~$1-10/month (varies) |
| **Total** | | ~$1-20/month |

---

## 📚 Documentation

- **DEPLOYMENT.md** - Comprehensive deployment guide
- **ENV_SETUP.md** - All environment variables explained
- **SECURITY.md** - Security best practices & GDPR
- **PRODUCTION_CHECKLIST.md** - Pre-launch verification

---

## 🆘 Troubleshooting

### Backend won't start
→ Check Railway logs: `railway logs`
→ Verify environment variables set

### CORS errors
→ Check CORS_ORIGINS format: `["url1","url2"]`
→ No trailing slashes
→ Exact match required

### Frontend build fails
→ Check Vercel logs in dashboard
→ Verify Node.js version (18+)
→ Run `npm install` locally first

### Database connection errors
→ Ensure PostgreSQL plugin added
→ DATABASE_URL auto-provided by Railway
→ Check Railway dashboard

---

## 🔄 Update Deployment

### Backend Update

```bash
cd backend
# Make changes
railway up
```

### Frontend Update

```bash
cd frontend-*
# Make changes
vercel --prod
```

### Environment Variable Update

```bash
railway variables --set VAR_NAME=value
# Or update in Railway dashboard
```

---

## 📞 Support

- **Railway:** [docs.railway.app](https://docs.railway.app)
- **Vercel:** [vercel.com/docs](https://vercel.com/docs)
- **ÉluIA Issues:** Check GitHub issues

---

## 🎉 Next Steps After Deployment

1. ✅ Test all flows end-to-end
2. ✅ Set up monitoring (UptimeRobot)
3. ✅ Configure custom domains (optional)
4. ✅ Enable analytics
5. ✅ Schedule regular backups
6. ✅ Document runbooks
7. ✅ Train team on deployment

---

**Ready to deploy? Run `./deploy.sh` and follow the prompts!** 🚀

For detailed instructions, see **DEPLOYMENT.md**.
