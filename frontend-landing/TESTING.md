# ÉluIA Landing Page - Testing Checklist

Complete testing checklist for the redesigned ÉluIA landing page.

## 🚀 Quick Test

```bash
npm run dev
```

Open `http://localhost:5174` in your browser.

---

## ✅ Functional Testing

### 1. Hero Section

#### Buttons
- [ ] "Créer mon compte" button opens signup modal
- [ ] "Voir la démo" button scrolls smoothly to demo section
- [ ] Both buttons have hover effects
- [ ] Buttons are accessible via keyboard (Tab + Enter)

#### Visual Elements
- [ ] Logo displays correctly (ÉluIA with gradient)
- [ ] Gradient background animates
- [ ] Trust badges visible: "🔒 Conforme RGPD" "🇫🇷 Hébergé en France"
- [ ] Chat mockup displays with typing animation
- [ ] Floating stats cards appear with delay

---

### 2. Signup Modal

#### Opening
- [ ] Opens from Hero "Créer mon compte"
- [ ] Opens from Pricing "Commencer" (Starter plan)
- [ ] Opens from Pricing "Essayer 7 jours gratuits" (Pro plan)
- [ ] Opens from Final CTA
- [ ] Modal has backdrop blur
- [ ] Can close with X button
- [ ] Can close by clicking backdrop

#### Form - Name Field
- [ ] Required field validation
- [ ] Shows error if empty and submitted
- [ ] Error message: "Le nom est requis"

#### Form - Email Field
- [ ] Required field validation
- [ ] Format validation (email pattern)
- [ ] Shows error if invalid format
- [ ] Error message: "Email invalide"

#### Form - Password Field
- [ ] Required field validation
- [ ] Minimum length validation (8 characters)
- [ ] Toggle show/hide password (eye icon)
- [ ] Password strength indicator appears
- [ ] Strength bar updates as you type
- [ ] Strength levels: Faible (red), Moyen (yellow), Fort (green)
- [ ] Error message: "Le mot de passe doit contenir au moins 8 caractères"

#### Password Strength Tests
Test with these passwords:
- [ ] "test" → Faible (1 bar, red)
- [ ] "password" → Faible (1-2 bars, red-yellow)
- [ ] "Password1" → Moyen (3 bars, yellow)
- [ ] "Password123!" → Fort (5 bars, green)

#### Form - Election Type
- [ ] Required field validation
- [ ] Dropdown shows all options:
  - Municipales 2026
  - Départementales 2027
  - Régionales 2027
  - Législatives
  - Autre élection
- [ ] Error message: "Veuillez sélectionner un type d'élection"

#### Form - Plan Selection
- [ ] Radio buttons for 3 plans
- [ ] Starter plan selected by default (from Hero or Starter CTA)
- [ ] Pro plan selected when clicking "Essayer 7 jours gratuits"
- [ ] Visual highlight on selected plan
- [ ] Can change selection

#### Form - Terms Checkbox
- [ ] Required validation
- [ ] Links open (currently to #)
- [ ] Error message: "Vous devez accepter les CGU"

#### Trust Badges
- [ ] "🔒 RGPD" badge visible
- [ ] "🇫🇷 France" badge visible

#### Submit Button
- [ ] Disabled when form is invalid
- [ ] Shows loading spinner when submitting
- [ ] Text changes to "Création en cours..."
- [ ] Proper styling (gradient blue to purple)

#### Backend Integration (requires backend running)
- [ ] POST request to `http://localhost:8000/api/auth/register`
- [ ] Sends correct data structure
- [ ] On success: Redirects to `http://localhost:5173?token=xxx`
- [ ] On error: Shows error message in red alert box
- [ ] Error message is user-friendly

---

### 3. Pricing Section

#### Cards Display
- [ ] 3 pricing cards visible
- [ ] "POPULAIRE" badge on Pro plan
- [ ] Pro card slightly elevated (negative margin)
- [ ] Hover effect on all cards (lift + shadow)

#### Starter Plan (49€/mois)
- [ ] Price displayed correctly: "49€" (no space)
- [ ] Button: "Commencer"
- [ ] Click opens signup modal
- [ ] Plan pre-selected to "starter"
- [ ] Not trial mode

#### Professionnel Plan (149€/mois)
- [ ] Price displayed correctly: "149€"
- [ ] Popular badge visible
- [ ] Button: "Essayer 7 jours gratuits"
- [ ] Click opens signup modal
- [ ] Plan pre-selected to "pro"
- [ ] Trial mode enabled

#### Entreprise Plan
- [ ] Text: "Sur mesure"
- [ ] Button: "Nous contacter"
- [ ] Click opens contact modal (not signup)

#### Bottom Info
- [ ] "Prix HT. Résiliable à tout moment. Sans engagement."
- [ ] FAQ link scrolls to FAQ section

---

### 4. Contact Modal

#### Opening
- [ ] Opens from Pricing "Nous contacter"
- [ ] Opens from Footer "Contact" link
- [ ] Opens from Final CTA "Planifier une démo"
- [ ] Modal has backdrop blur
- [ ] Can close with X button
- [ ] Can close by clicking backdrop

#### Form - Name Field
- [ ] Required validation
- [ ] Error message: "Le nom est requis"

#### Form - Email Field
- [ ] Required validation
- [ ] Format validation
- [ ] Error message: "Email invalide"

#### Form - Phone Field (Optional)
- [ ] Not required
- [ ] Can be left empty
- [ ] Accepts various formats

#### Form - Message Field
- [ ] Required validation
- [ ] Multi-line textarea
- [ ] Error message: "Le message est requis"

#### Submit
- [ ] Button shows loading state
- [ ] Success animation appears (green checkmark)
- [ ] Success message: "Message envoyé !"
- [ ] Modal auto-closes after 2 seconds
- [ ] Form resets

#### Backend Integration (optional)
- [ ] Can uncomment API call in code
- [ ] POST to `/api/contact`
- [ ] Stores leads or sends email

---

### 5. Legal Modals

#### Privacy Policy
- [ ] Opens from Footer "Politique de confidentialité"
- [ ] Opens from Signup modal (terms link)
- [ ] Displays RGPD-compliant content
- [ ] Sections: Collecte, Utilisation, Protection, Droits, Cookies, Hébergement, Contact
- [ ] Can scroll through content
- [ ] "J'ai compris" button closes modal

#### Terms & Conditions (CGU/CGV)
- [ ] Opens from Footer "CGU / CGV"
- [ ] Opens from Signup modal (terms link)
- [ ] Displays legal content
- [ ] Sections: Objet, Description, Inscription, Tarification, etc.
- [ ] Can scroll through content
- [ ] "J'ai compris" button closes modal

#### Legal Mentions
- [ ] Opens from Footer "Mentions légales"
- [ ] Displays company info (placeholders)
- [ ] Sections: Éditeur, Directeur, Hébergement, Contact, etc.
- [ ] Can scroll through content
- [ ] "J'ai compris" button closes modal

---

### 6. Footer

#### Brand Section
- [ ] ÉluIA logo with gradient
- [ ] Updated tagline visible
- [ ] Email: contact@eluia.fr (clickable mailto)

#### Product Links
- [ ] Fonctionnalités → Scrolls to #features
- [ ] Tarifs → Scrolls to #pricing
- [ ] Démo → Scrolls to #demo
- [ ] FAQ → Scrolls to #faq

#### Company Links
- [ ] À propos → # (placeholder)
- [ ] Blog → # (placeholder)
- [ ] Contact → Opens contact modal
- [ ] Carrières → # (placeholder)

#### Legal Links
- [ ] Mentions légales → Opens legal modal
- [ ] CGU / CGV → Opens terms modal
- [ ] Politique de confidentialité → Opens privacy modal
- [ ] Cookies → # (placeholder)

#### Social Links
- [ ] Twitter icon links to twitter.com/eluia (new tab)
- [ ] LinkedIn icon links to linkedin.com/company/eluia (new tab)
- [ ] Facebook icon links to facebook.com/eluia (new tab)
- [ ] Hover effect on icons

#### Bottom Section
- [ ] Copyright year is current (2025)
- [ ] "Conçu et hébergé en France 🇫🇷"
- [ ] Additional info text visible

---

### 7. Demo Section

#### Chat Interface
- [ ] Demo chat interface visible
- [ ] Pre-populated questions displayed
- [ ] Can type in input field (if interactive)
- [ ] Shows realistic campaign Q&A

---

### 8. Final CTA Section

#### Design
- [ ] Gradient background (blue to purple)
- [ ] Animated floating shapes
- [ ] Rocket icon visible
- [ ] White text readable

#### Buttons
- [ ] "Créer mon agent IA gratuitement" → Opens signup modal
- [ ] "Planifier une démo" → Opens contact modal
- [ ] Both buttons have hover effects
- [ ] Arrow icon animates on hover

#### Trust Elements
- [ ] "✨ Essai gratuit 7 jours • Sans carte bancaire"
- [ ] "Configuration en 5 minutes • Support en français • Résiliable à tout moment"
- [ ] City list visible (Paris, Lyon, etc.)

---

## 📱 Mobile Responsiveness

Test on these viewports:
- [ ] iPhone SE (375px)
- [ ] iPhone 12 Pro (390px)
- [ ] iPad (768px)
- [ ] iPad Pro (1024px)

### Mobile Hero
- [ ] Logo and title stacked properly
- [ ] Buttons stack vertically
- [ ] Chat mockup scales down
- [ ] Floating stats hidden on mobile (< md)
- [ ] Text readable at small sizes

### Mobile Pricing
- [ ] Cards stack vertically
- [ ] Popular badge visible
- [ ] All features readable
- [ ] Buttons full width

### Mobile Modals
- [ ] Modals fit on screen
- [ ] Scrollable if content too long
- [ ] Close button accessible
- [ ] Form fields stack properly
- [ ] Buttons full width

### Mobile Footer
- [ ] Sections stack vertically
- [ ] Links readable
- [ ] Social icons centered
- [ ] Copyright centered

---

## 🎨 Visual/Design Testing

### Colors
- [ ] Primary blue (#0284c7) used consistently
- [ ] Secondary purple (#9333ea) used for accents
- [ ] Gradients smooth (blue → purple)
- [ ] Text contrast sufficient (WCAG AA)

### Typography
- [ ] Headlines bold and clear
- [ ] Body text readable (not too small)
- [ ] Consistent font sizes
- [ ] Line height comfortable

### Animations
- [ ] Smooth fade-in on scroll
- [ ] Hover effects subtle but noticeable
- [ ] No janky animations
- [ ] Loading spinners work

### Spacing
- [ ] Consistent padding/margin
- [ ] Sections well-separated
- [ ] Cards have proper spacing
- [ ] Mobile spacing adequate

---

## ⚡ Performance Testing

### Load Time
- [ ] Page loads in < 2 seconds (dev mode)
- [ ] Images optimized
- [ ] No render-blocking resources

### Interactions
- [ ] Modals open instantly
- [ ] Smooth scrolling
- [ ] No lag on form input
- [ ] Buttons respond immediately

### Console
- [ ] No errors in console
- [ ] No warnings (or minimal)
- [ ] Network requests successful

---

## ♿ Accessibility Testing

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Focus indicator visible
- [ ] Can submit forms with Enter
- [ ] Can close modals with Escape
- [ ] Skip to content works

### Screen Reader
- [ ] Alt text on images
- [ ] ARIA labels on buttons
- [ ] Form labels associated
- [ ] Error messages announced

### Color Contrast
- [ ] Text readable on all backgrounds
- [ ] Links distinguishable
- [ ] Button text clear

---

## 🔧 Technical Testing

### Build
```bash
npm run build
```
- [ ] Build succeeds without errors
- [ ] No warnings (or minimal)
- [ ] Bundle size reasonable (< 500KB JS)
- [ ] CSS optimized (< 50KB)

### Preview Build
```bash
npm run preview
```
- [ ] Production build works
- [ ] All features functional
- [ ] No console errors

---

## 🔌 Integration Testing

### Backend Connection (requires backend running)

1. Start backend: `http://localhost:8000`
2. Test signup:
   - [ ] Fill signup form
   - [ ] Submit
   - [ ] Check network tab for POST request
   - [ ] Verify request payload
   - [ ] Check response
   - [ ] Should redirect to admin portal

3. Test error handling:
   - [ ] Try existing email
   - [ ] Try invalid password
   - [ ] Verify error message shows

---

## 📊 Browser Testing

Test in these browsers:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

---

## ✅ Final Checklist

Before deploying:
- [ ] All forms validated
- [ ] All modals open/close correctly
- [ ] All links go somewhere (no broken links)
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Performance acceptable
- [ ] SEO meta tags correct
- [ ] Analytics script ready (commented)
- [ ] Stripe script ready (commented)
- [ ] README.md updated
- [ ] CHANGELOG.md updated
- [ ] Backend integration tested

---

## 🐛 Known Issues / Future Improvements

### To Fix
- None known (please report if found)

### To Improve
- Add actual demo video or interactive demo
- Real testimonial photos
- More election type options if needed
- Multilingual support (future)

---

## 📝 Test Results Template

```
Test Date: [DATE]
Tester: [NAME]
Browser: [BROWSER VERSION]
Device: [DEVICE/RESOLUTION]

Signup Flow: ✅ / ❌
Contact Modal: ✅ / ❌
Legal Modals: ✅ / ❌
Pricing CTAs: ✅ / ❌
Mobile Responsive: ✅ / ❌
Performance: ✅ / ❌

Notes:
[Any issues or observations]
```

---

**Happy Testing! 🚀**
