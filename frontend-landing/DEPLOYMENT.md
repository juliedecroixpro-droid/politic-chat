# Guide de déploiement - PoliticChat Landing Page 🚀

Ce guide vous explique comment déployer la landing page PoliticChat sur différentes plateformes.

## 📋 Pré-déploiement

Avant de déployer, assurez-vous que :
- ✅ Le build fonctionne localement : `npm run build`
- ✅ Les liens vers l'admin portal sont corrects (vérifier `/register`)
- ✅ Les emails de contact sont à jour
- ✅ Les analytics sont configurés (Google Analytics, etc.)
- ✅ Les métadonnées SEO sont optimisées dans `index.html`

## 🚀 Déploiement sur Vercel (Recommandé)

Vercel est idéal pour les sites React/Vite : rapide, automatique, CDN global gratuit.

### Méthode 1 : Via GitHub (Recommandé)

1. **Poussez votre code sur GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - PoliticChat landing page"
   git branch -M main
   git remote add origin https://github.com/votre-username/politicchat-landing.git
   git push -u origin main
   ```

2. **Connectez-vous à Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Connectez-vous avec GitHub
   - Cliquez sur "New Project"

3. **Importez votre repo**
   - Sélectionnez `politicchat-landing`
   - Vercel détecte automatiquement Vite

4. **Configurez (optionnel)**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Environment Variables : (si nécessaire)

5. **Déployez**
   - Cliquez sur "Deploy"
   - Votre site sera en ligne en ~2 minutes
   - URL fournie : `politicchat-landing-xxx.vercel.app`

6. **Configurez votre domaine personnalisé**
   - Dans Vercel > Settings > Domains
   - Ajoutez `politicchat.fr` ou `www.politicchat.fr`
   - Suivez les instructions DNS

### Méthode 2 : Via CLI Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
cd /Users/mdi/clawd/politic-chat/frontend-landing
vercel

# Suivez les prompts :
# ? Set up and deploy? Yes
# ? Which scope? (votre compte)
# ? Link to existing project? No
# ? What's your project's name? politicchat-landing
# ? In which directory is your code located? ./
# ? Want to override settings? No

# Pour déployer en production :
vercel --prod
```

**Avantages Vercel :**
- ✅ CI/CD automatique (déploiement à chaque push)
- ✅ Preview deployments (chaque PR a son URL)
- ✅ CDN global ultra-rapide
- ✅ SSL automatique
- ✅ Analytics intégrés
- ✅ Gratuit jusqu'à 100 GB bandwidth/mois

---

## 🌐 Déploiement sur Netlify

Netlify est une excellente alternative à Vercel.

### Via interface web

1. **Build localement**
   ```bash
   npm run build
   ```

2. **Glissez-déposez**
   - Allez sur [app.netlify.com](https://app.netlify.com)
   - Glissez le dossier `dist/` dans la zone de drop
   - Votre site est en ligne !

### Via GitHub (recommandé)

1. **Connectez-vous à Netlify**
   - Allez sur [app.netlify.com](https://app.netlify.com)
   - "Add new site" > "Import from Git"
   - Connectez GitHub et sélectionnez votre repo

2. **Configurez le build**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Cliquez sur "Deploy site"

3. **Domaine personnalisé**
   - Site settings > Domain management
   - Add custom domain : `politicchat.fr`

### Via CLI Netlify

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Déployer
cd /Users/mdi/clawd/politic-chat/frontend-landing
netlify deploy

# Prod :
netlify deploy --prod
```

**Avantages Netlify :**
- ✅ Forms built-in (utile pour formulaires de contact)
- ✅ Functions serverless intégrées
- ✅ Split testing A/B
- ✅ Gratuit jusqu'à 100 GB bandwidth/mois

---

## 🖥️ Déploiement sur VPS / Serveur dédié

Pour un contrôle total ou si vous hébergez déjà le backend.

### 1. Build le projet

```bash
cd /Users/mdi/clawd/politic-chat/frontend-landing
npm run build
```

Le dossier `dist/` contient tous les fichiers statiques.

### 2. Transférer les fichiers

```bash
# Via rsync (recommandé)
rsync -avz dist/ user@votre-serveur.com:/var/www/politicchat-landing/

# Via SCP
scp -r dist/* user@votre-serveur.com:/var/www/politicchat-landing/

# Via FTP/SFTP
# Utilisez FileZilla ou votre client FTP préféré
```

### 3. Configuration Nginx

```nginx
server {
    listen 80;
    server_name politicchat.fr www.politicchat.fr;
    root /var/www/politicchat-landing;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Cache headers
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

### 4. SSL avec Let's Encrypt

```bash
# Installer Certbot
sudo apt install certbot python3-certbot-nginx

# Obtenir le certificat SSL
sudo certbot --nginx -d politicchat.fr -d www.politicchat.fr

# Auto-renouvellement
sudo certbot renew --dry-run
```

### 5. Configuration Apache (alternative)

```apache
<VirtualHost *:80>
    ServerName politicchat.fr
    ServerAlias www.politicchat.fr
    DocumentRoot /var/www/politicchat-landing

    <Directory /var/www/politicchat-landing>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    # SPA fallback
    <IfModule mod_rewrite.c>
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </IfModule>

    # Compression
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript application/json
    </IfModule>
</VirtualHost>
```

---

## 🐳 Déploiement avec Docker

### Dockerfile

Créez un `Dockerfile` à la racine :

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

### Build et run

```bash
# Build l'image
docker build -t politicchat-landing .

# Run le container
docker run -d -p 80:80 --name politicchat-landing politicchat-landing

# Avec docker-compose
# Créez docker-compose.yml :
version: '3.8'
services:
  landing:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
```

---

## 🌍 Déploiement sur GitHub Pages

### 1. Configurer Vite

Modifiez `vite.config.js` :

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/politicchat-landing/', // Votre nom de repo
})
```

### 2. Script de déploiement

Créez `deploy.sh` :

```bash
#!/usr/bin/env sh

set -e
npm run build
cd dist

git init
git add -A
git commit -m 'Deploy'
git push -f git@github.com:username/politicchat-landing.git main:gh-pages

cd -
```

### 3. Déployer

```bash
chmod +x deploy.sh
./deploy.sh
```

### 4. Activer GitHub Pages

- Repo Settings > Pages
- Source : `gh-pages` branch
- URL : `https://username.github.io/politicchat-landing/`

---

## ✅ Checklist post-déploiement

Après le déploiement, vérifiez :

- [ ] Le site est accessible via HTTPS
- [ ] Toutes les pages/sections s'affichent correctement
- [ ] Les animations fonctionnent
- [ ] La démo interactive marche
- [ ] Les boutons CTA redirigent vers `/register` (ou l'admin portal)
- [ ] Les formulaires fonctionnent
- [ ] Le site est responsive (mobile, tablette, desktop)
- [ ] La performance est bonne (Lighthouse > 90)
- [ ] Les meta tags SEO sont présents (vérifier "View source")
- [ ] Google Analytics track les visites
- [ ] Les images se chargent rapidement
- [ ] Pas d'erreurs dans la console du navigateur

## 🔍 Monitoring et Analytics

### Google Analytics

1. Créez une propriété GA4 sur [analytics.google.com](https://analytics.google.com)
2. Copiez l'ID de mesure (G-XXXXXXXXXX)
3. Ajoutez dans `index.html` :

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Autres outils recommandés

- **Plausible** : Analytics respectueux de la vie privée (RGPD-friendly)
- **Hotjar** : Heatmaps et enregistrements de sessions
- **Sentry** : Monitoring d'erreurs JavaScript
- **Uptime Robot** : Monitoring de disponibilité du site

---

## 🚨 Dépannage

### Le site ne se charge pas
- Vérifiez que les fichiers sont au bon endroit
- Vérifiez la configuration Nginx/Apache
- Vérifiez les logs : `sudo tail -f /var/log/nginx/error.log`

### Erreur 404 sur les routes
- Assurez-vous que le serveur redirige toutes les routes vers `index.html`
- Vérifiez la config `try_files` dans Nginx

### Les assets ne se chargent pas
- Vérifiez le `base` dans `vite.config.js`
- Vérifiez les chemins dans le HTML généré

### Performance lente
- Activez Gzip/Brotli compression
- Utilisez un CDN (Cloudflare, etc.)
- Optimisez les images (WebP, compression)

---

## 📞 Support

Besoin d'aide pour déployer ? Contactez-nous :
- Email : contact@politicchat.fr
- Documentation : docs.politicchat.fr

---

**Bonne chance avec votre déploiement ! 🎉**
