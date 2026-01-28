# ÉluIA Landing Page

> Votre assistant de campagne intelligent, disponible 24/7

Landing page complète et fonctionnelle pour ÉluIA - Assistant IA pour candidats aux élections municipales, départementales et régionales.

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Le site sera accessible à l'adresse : `http://localhost:5174`

### Build Production

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`.

### Preview Production Build

```bash
npm run preview
```

## 📋 Features Implemented

### ✅ Complete Rebranding
- [x] All instances of "PoliticChat" replaced with "ÉluIA"
- [x] New tagline: "Votre assistant de campagne intelligent, disponible 24/7"
- [x] Blue/Purple gradient color scheme (trust + innovation)
- [x] Updated meta tags for SEO
- [x] Updated all copy to emphasize French elections

### ✅ Functional Components

#### 1. **Signup Flow** 
- Modern signup modal with:
  - Email validation
  - Password strength indicator (visual + text feedback)
  - Name input
  - Election type dropdown (Municipales 2026, Départementales 2027, etc.)
  - Plan selection (pre-selected based on CTA clicked)
  - Terms & conditions checkbox
  - Backend integration ready (`POST /api/auth/register`)
  - Auto-redirect to admin portal on success
  - Error handling with user-friendly messages

#### 2. **Pricing Section**
- **Starter Plan (49€/mois):** Opens signup modal with plan pre-selected
- **Professionnel Plan (149€/mois):** Opens signup modal with 7-day trial option
- **Entreprise Plan (Sur mesure):** Opens contact modal

#### 3. **Contact Modal**
- Name, email, phone (optional), message fields
- Form validation
- Success confirmation
- Ready for backend integration (currently shows success message)

#### 4. **Legal Modals**
- Privacy Policy (RGPD-compliant)
- Terms & Conditions
- Legal Mentions
- All accessible from footer links

#### 5. **Hero Section**
- "Créer mon compte" → Opens signup modal
- "Voir la démo" → Smooth scroll to demo section
- Trust badges: RGPD + Hébergé en France

#### 6. **Navigation**
All footer links functional:
- Features → Anchor scroll
- Pricing → Anchor scroll
- Demo → Anchor scroll
- FAQ → Anchor scroll
- Contact → Opens contact modal
- Legal links → Open respective legal modals

### 🎨 Design Polish

- **Modern gradient backgrounds** (Blue → Purple)
- **Glass morphism effects** on cards
- **Smooth animations** with Framer Motion
- **Hover effects** on all interactive elements
- **Mobile-first responsive design**
- **Trust indicators** throughout (RGPD, France hosting, etc.)
- **Premium look & feel**

### 📱 Mobile Optimization

- Fully responsive on all screen sizes
- Touch-friendly buttons (minimum 44px)
- Readable typography
- Stacked layout on mobile
- Hamburger menu (if needed)
- No horizontal scroll

### 🔧 Technical Stack

- **React 19** - Modern React with latest features
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **React Hook Form** - Form management (ready to use)
- **React Router** - Routing

## 🔌 Backend Integration

### Signup Endpoint

The signup form connects to:

```javascript
POST http://localhost:8000/api/auth/register
Content-Type: application/json

{
  "email": "marie@exemple.fr",
  "password": "securePassword123",
  "name": "Marie Dupont",
  "election": "municipales-2026",
  "plan": "pro",
  "trial": true
}
```

**Expected Response:**

```javascript
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "marie@exemple.fr",
    "name": "Marie Dupont"
  }
}
```

On success, the user is redirected to:
```
http://localhost:5173?token=jwt_token_here
```

The admin portal should auto-login using this token.

### Contact Form (Optional)

Currently shows a success message. To enable backend submission:

1. Uncomment the API call in `ContactModal.jsx`:

```javascript
fetch('http://localhost:8000/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
```

2. Create the endpoint in your backend to store leads or send emails.

## 💳 Stripe Integration

### Current State
Stripe integration placeholders are in place. The following are commented out but ready:

#### In `index.html`:
```html
<!-- <script src="https://js.stripe.com/v3/"></script> -->
```

#### Payment Flow (To Implement):

1. User selects a plan and signs up
2. After account creation, redirect to Stripe Checkout:

```javascript
// In SignupModal.jsx or post-signup page
const stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY');

const response = await fetch('/api/create-checkout-session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    priceId: 'price_xxx', // Stripe Price ID
    customerId: user.id,
    trial: isTrial
  })
});

const session = await response.json();

stripe.redirectToCheckout({ sessionId: session.id });
```

3. Create backend endpoint `/api/create-checkout-session` that:
   - Creates a Stripe Checkout Session
   - Returns the session ID
   - Handles webhooks for subscription activation

### Stripe Price IDs
Create products in Stripe dashboard:
- **Starter:** 49€/month → `price_starter_xxx`
- **Professionnel:** 149€/month (with 7-day trial) → `price_pro_xxx`
- **Entreprise:** Custom pricing

## 🎯 Testing Checklist

- [ ] **Signup flow works end-to-end**
  - Form validation works
  - Password strength indicator displays
  - Can select election type and plan
  - Submit calls backend correctly
  - Redirects to admin portal on success
  - Shows error messages on failure

- [ ] **All pricing buttons functional**
  - Starter button opens signup modal
  - Pro button opens signup modal with trial
  - Enterprise button opens contact modal

- [ ] **Contact form works**
  - Form validation
  - Success message displays
  - Fields reset after submission

- [ ] **Legal modals open correctly**
  - Privacy policy opens from footer
  - Terms & conditions open from footer
  - Legal mentions open from footer
  - All modals can be closed

- [ ] **Navigation**
  - All anchor links scroll smoothly
  - Demo button scrolls to demo section
  - Mobile navigation works (if applicable)

- [ ] **Mobile responsive**
  - Test on mobile viewport
  - Buttons are touch-friendly
  - No horizontal scroll
  - Typography is readable

- [ ] **Performance**
  - Page loads in < 2 seconds
  - No console errors
  - Smooth animations
  - Images optimized

## 🌐 SEO & Analytics

### Current SEO Setup
Meta tags are configured in `index.html`:
- Page title
- Description
- Open Graph tags (for social sharing)
- Twitter Card tags

### Google Analytics (To Enable)

Uncomment the Google Analytics code in `index.html` and add your tracking ID:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_GA_MEASUREMENT_ID');
</script>
```

## 📝 Content Customization

### Update Copy
All text content is in the component files:
- `Hero.jsx` - Main headline and subheadline
- `Features.jsx` - Feature descriptions
- `Pricing.jsx` - Plan details and pricing
- `Testimonials.jsx` - Customer quotes
- `FAQ.jsx` - Frequently asked questions

### Update Images
Place images in `public/` folder and reference them:
```jsx
<img src="/hero-image.jpg" alt="Description" />
```

### Update Contact Info
Update email addresses in:
- `Footer.jsx` - contact@eluia.fr
- `LegalModal.jsx` - privacy@eluia.fr

## 🚢 Deployment

### Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Drag & drop the 'dist' folder to Netlify
```

### Deploy to Static Host

```bash
npm run build
# Upload contents of 'dist/' to your web server
```

### Environment Variables

For production, you may want to set:
- `VITE_API_URL` - Backend API URL
- `VITE_ADMIN_PORTAL_URL` - Admin portal URL
- `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe key

## 📂 Project Structure

```
frontend-landing/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── modals/     # Modal components
│   │   │   ├── SignupModal.jsx
│   │   │   ├── ContactModal.jsx
│   │   │   └── LegalModal.jsx
│   │   ├── Hero.jsx
│   │   ├── Features.jsx
│   │   ├── Pricing.jsx
│   │   ├── Testimonials.jsx
│   │   ├── FAQ.jsx
│   │   ├── Footer.jsx
│   │   └── ...
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies
├── tailwind.config.js   # Tailwind configuration
└── vite.config.js       # Vite configuration
```

## 🎨 Color Scheme

### Primary (Blue)
- Used for main CTAs, links, trust elements
- Hex: `#0284c7` (primary-600)

### Secondary (Purple)
- Used for accents, gradients, popular badges
- Hex: `#9333ea` (secondary-600)

### Gradients
Most elements use:
```css
background: linear-gradient(to right, #0284c7, #9333ea);
```

## ⚡️ Performance Tips

1. **Lazy load images** below the fold
2. **Code split** if adding more pages
3. **Optimize images** (use WebP format)
4. **Enable caching** in production
5. **Use CDN** for static assets

## 🐛 Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port already in use
```bash
# Change port in vite.config.js or kill the process
lsof -ti:5174 | xargs kill
```

### Backend connection refused
Make sure your backend is running on `http://localhost:8000`

## 📞 Support

For questions or issues:
- Email: contact@eluia.fr
- Create an issue in the repository

## 📄 License

[Add your license here]

---

**Built with ❤️ for French political candidates**

🇫🇷 Conçu et hébergé en France
