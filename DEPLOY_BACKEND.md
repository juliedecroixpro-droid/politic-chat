# 🚀 Déploiement Backend (1 clic)

## ✅ Frontends Déployés

- **Landing:** https://frontend-landing-flax.vercel.app
- **Admin:** https://frontend-admin-nine-zeta.vercel.app  
- **Chat:** https://frontend-public-pink.vercel.app

---

## 🔧 Déployer le Backend (Railway)

**1 clic, 2 minutes, 0 code :**

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/juliedecroixpro-droid/julie.decroix.pro-gmail.com&plugins=postgresql&envs=MISTRAL_API_KEY,SECRET_KEY,CORS_ORIGINS&MISTRAL_API_KEYdesc=Your%20Mistral%20API%20key&SECRET_KEYdesc=Random%20secret%20key%20(auto-generated)&CORS_ORIGINSdesc=Frontend%20URLs%20for%20CORS&MISTRAL_API_KEYvalue=L49WdqoFO6YGTx6tIRG1ze5lzBoVBF9B&SECRET_KEYvalue=WYkCoD3JWVSi5fgLW-L8do8D84gKwN-5ZzrGGjKEmfk&CORS_ORIGINSvalue=[%22https://frontend-landing-flax.vercel.app%22,%22https://frontend-admin-nine-zeta.vercel.app%22,%22https://frontend-public-pink.vercel.app%22])

**Ce que ça fait automatiquement :**
1. ✅ Crée le projet Railway
2. ✅ Ajoute PostgreSQL
3. ✅ Configure les variables d'environnement (Mistral API key, SECRET_KEY, CORS)
4. ✅ Build et déploie le backend Python
5. ✅ Te donne l'URL de production

**Durée : 2 minutes**

---

## 🔄 Après le déploiement

Une fois Railway déployé, tu recevras une URL genre :
`https://politic-chat-backend-production.up.railway.app`

**Mettre à jour les frontends :**

```bash
# Ajouter l'URL backend aux frontends
cd /Users/mdi/clawd/politic-chat/frontend-landing
vercel env add VITE_API_URL production
# Coller: https://ton-backend.railway.app

cd ../frontend-admin
vercel env add VITE_API_URL production  
# Coller: https://ton-backend.railway.app

cd ../frontend-public
vercel env add VITE_API_URL production
# Coller: https://ton-backend.railway.app

# Redéployer les 3 frontends
cd ../frontend-landing && vercel --prod
cd ../frontend-admin && vercel --prod
cd ../frontend-public && vercel --prod
```

---

## ✅ Projet Complet Déployé !

Tu auras :
- ✅ Backend API (FastAPI + PostgreSQL + Mistral)
- ✅ Landing page (inscription candidats)
- ✅ Admin dashboard (upload programmes, analytics)
- ✅ Chat public (interface électeurs)

**Coût total : ~0-5€/mois** (tier gratuit Railway + Vercel)
