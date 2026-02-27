# MatchDay Lounge 2

> A sports fan platform — live schedules, fan chat, gigs, and properties — all in one lounge.

## Monorepo Structure

```
matchday-lounge-2/
├── apps/
│   ├── web/          # Fan portal — React + Vite (Firebase Hosting: matchday-web)
│   └── mobile/       # React Native / Expo (coming soon)
├── services/
│   ├── api/          # Node/Express REST API — Cloud Run
│   ├── functions/    # Firebase Cloud Functions
│   └── scraper/      # Sports data scraper (Cloud Run / scheduled)
├── packages/
│   └── shared/       # Shared TypeScript types used across apps & services
├── dataconnect/      # Firebase Data Connect (GraphQL schema + Cloud SQL)
├── firebase.json     # Firebase config (Hosting ×2, Firestore, Storage, Functions)
└── .firebaserc       # Firebase project aliases
```

## Prerequisites

- [Node.js 20+](https://nodejs.org) (use `nvm use` to switch automatically)
- [Firebase CLI](https://firebase.google.com/docs/cli): `npm install -g firebase-tools`
- [Google Cloud SDK](https://cloud.google.com/sdk) (for Cloud Run deploys)
- [Turborepo](https://turbo.build): included as a dev dependency

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

Hit `GET http://localhost:8080/health` to verify the API is running.

## Deploy

### Firebase Hosting

```bash
# Build the web app
cd apps/web && npm run build && cd ../..

# Deploy both hosting sites
firebase deploy --only hosting
```

### Cloud Run (API)

```bash
# Build TypeScript
cd services/api && npm run build && cd ../..

# Deploy to Cloud Run (first time — creates the service)
gcloud run deploy matchday-api \
  --source services/api \
  --region us-central1 \
  --allow-unauthenticated \
  --project matchday-lounge-2
```

### Firebase Functions

```bash
cd services/functions && npm run build && cd ../..
firebase deploy --only functions
```

### Firestore Rules & Indexes

```bash
firebase deploy --only firestore
```

### Storage Rules

```bash
firebase deploy --only storage
```

### Everything at once

```bash
npx turbo build
firebase deploy
```

## Firebase Services

| Service       | Status     | Notes                                  |
|---------------|------------|----------------------------------------|
| Auth          | ✅ Enabled | Email/Password + Google                |
| Firestore     | ✅ Enabled | Rules in `firestore.rules`             |
| Storage       | ✅ Enabled | Rules in `storage.rules`               |
| Hosting (web) | ✅ Enabled | Target: `matchday-web`                 |
| Hosting (admin)| 🔜 Planned| Target: `matchday-admin`               |
| Functions     | ✅ Scaffold| `services/functions/src/index.ts`      |
| Data Connect  | ✅ Scaffold| `dataconnect/` — Cloud SQL PostgreSQL  |
