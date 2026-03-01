# ⚽ MatchDay Lounge

> **Your City. Your Match. Your Night.**
>
> The AI-powered city companion for FIFA World Cup 2026 fans in Canada.
> Launching in **Vancouver, BC** and **Toronto, ON** — June 11, 2026.

## What It Does

MatchDay Lounge bridges two audiences: **international fans** seeking frictionless navigation of an unfamiliar city, and **local bars and restaurants** hungry for match-day foot traffic.

- 🍻 **Happy Hour Finder** — Map + list view of real-time deals, filtered by neighborhood, deal type, and "Open Now"
- 📅 **Match Day Hub** — Live scores, fixtures, fan zone locations, real-time crowd counts at nearby venues
- 🗺️ **City Navigation** — SkyTrain/TTC guides, airport-to-downtown routes, stadium directions
- 🆘 **Emergency Help** — 24hr pharmacies, clinics, late-night food, embassy contacts, one-tap 911
- 🤖 **AI Concierge** (Pro) — Conversational assistant powered by Claude — ask anything about the city
- 📍 **Smart Deal Alerts** (Pro) — Proactive push notifications near great deals before kickoff

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Mobile App | React Native + Expo SDK 55 |
| Web Portals | React + Vite + TypeScript |
| Structured Database | Firebase Data Connect (Cloud SQL Postgres) |
| Real-Time Database | Cloud Firestore |
| Authentication | Firebase Authentication |
| Backend API | Cloud Run (Node.js + Express) |
| AI Model | Claude Sonnet 4.6 (via Cloud Run) |
| Payments | Stripe |
| Push Notifications | Firebase Cloud Messaging |
| Maps | Google Maps SDK |
| CI/CD | Cloud Build + GitHub |

## Monorepo Structure

```
matchday-lounge/
├── apps/
│   ├── web/          # Fan landing page — React + Vite (Firebase Hosting)
│   ├── mobile/       # React Native + Expo (iOS & Android)
│   ├── restaurant/   # Restaurant Admin Portal — React + Vite
│   └── admin/        # App Admin Panel — React + Vite
├── services/
│   ├── api/          # Cloud Run API — Claude proxy, Stripe webhooks
│   ├── functions/    # Firebase Cloud Functions
│   └── scraper/      # Happy hour scraper (Cloud Run + Cloud Scheduler)
├── packages/
│   └── shared/       # Shared TypeScript types used across all surfaces
├── dataconnect/      # Firebase Data Connect (GraphQL schema + Cloud SQL)
├── firebase.json     # Firebase config (Hosting ×3, Firestore, Storage, Functions)
└── .firebaserc       # Firebase project aliases
```

## Quick Start — Local Dev

```bash
# 1. Install all workspace dependencies
npm install

# 2a. Run the web portal (localhost:5173)
cd apps/web && npm run dev

# 2b. Run the API (localhost:8080)
cd services/api && npm run dev

# 2c. Run everything at once via Turborepo
npx turbo dev
```

## Deploy

```bash
# Build all apps
npx turbo build

# Deploy everything to Firebase
firebase deploy

# Deploy Cloud Run API
gcloud run deploy matchday-api \
  --source services/api \
  --region northamerica-northeast1 \
  --project matchday-lounge
```

## Firebase Services

| Service | Status | Notes |
|---------|--------|-------|
| Auth | ✅ Enabled | Email/Password + Google Sign-In |
| Firestore | ✅ Enabled | Rules in `firestore.rules` |
| Storage | ✅ Enabled | Rules in `storage.rules` |
| Hosting (web) | ✅ Enabled | Target: `matchday-web` |
| Hosting (restaurant) | ✅ Scaffold | Target: `matchday-restaurant` |
| Hosting (admin) | ✅ Scaffold | Target: `matchday-admin` |
| Functions | ✅ Scaffold | `services/functions/src/index.ts` |
| Data Connect | ✅ Schema ready | `dataconnect/schema/schema.gql` |

## Key Dates

- **March 1, 2026** — Development sprint begins
- **May 15, 2026** — App Store / Google Play submission deadline
- **June 11, 2026** — FIFA World Cup 2026 kicks off
- **July 19, 2026** — Tournament final

---

*MatchDay Lounge • PRD v2.0 • 100% Google Cloud • Confidential*
