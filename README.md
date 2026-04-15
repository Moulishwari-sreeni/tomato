# 🍅 Tomato — Food Ordering Application

A Zomato-style food ordering web app with 37+ menu items, cart, auth, and billing.

## Features
- 🍕 37+ food items across 11 categories
- 🛒 Add-to-cart with localStorage persistence
- 💳 Billing with subtotal, 5% tax, delivery charge
- 🔐 Sign up / Sign in with localStorage sessions
- 🔍 Search & filter by category
- 📱 Fully responsive mobile design
- 🔒 SOC integration hooks (ready for Phase 2)

## Project Structure
```
tomato/
├── index.html          # Main HTML (single-page app)
├── css/
│   └── style.css       # All styles
├── js/
│   ├── data.js         # 37 food items data
│   └── app.js          # App logic
├── vercel.json         # Vercel deployment config
└── README.md
```

## Deploy to Vercel (Free)

### Option 1 — Vercel CLI
```bash
npm i -g vercel
cd tomato
vercel
```

### Option 2 — GitHub + Vercel Dashboard
1. Push this folder to a GitHub repo
2. Go to https://vercel.com → New Project
3. Import the GitHub repo
4. Framework: **Other** (Static Site)
5. Root Directory: leave as `/`
6. Click **Deploy**

Your site will be live at: `https://your-project.vercel.app`

## Phase 2: SOC Analyzer Integration
Once you deploy the SOC Analyzer backend (Flask on Render):
1. Open `js/app.js`
2. Uncomment the SOC integration block at the bottom
3. Set `SOC_URL` to your Render service URL
4. Redeploy

## Tech Stack
- HTML5 + CSS3 (custom, no framework)
- Vanilla JavaScript (no dependencies)
- Google Fonts: Syne + DM Sans
- localStorage for cart & auth persistence
