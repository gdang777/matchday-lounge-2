# MatchDay Lounge — Product Requirements Document (PRD v2)

> **Project**: MatchDay Lounge
> **Version**: 2.0
> **Last Updated**: February 2026
> **Status**: In Development

---

## 1. Overview

MatchDay Lounge is a sports fan platform that connects fans with live match experiences, local venues, community gigs, and each other. It combines real-time match data, venue discovery, promotions, and social features into a single fan-first product.

---

## 2. Goals

- Give fans a single hub for matchday activities — schedules, venues, check-ins, and chat
- Enable venues to reach fans through targeted promotions and boosts
- Provide a gig marketplace for sports-adjacent freelance work
- Monetize via fan subscriptions (FAN+) and venue business subscriptions (VENUE PRO)

---

## 3. Target Users

| Persona | Description |
|---------|-------------|
| **Casual Fan** | Wants to find matches, see where fans are gathering, discover deals |
| **Die-hard Fan** | Checks in at venues, chats with crew, tracks every fixture |
| **Venue Owner** | Wants to attract fans, post promotions, boost visibility on matchdays |
| **Organiser** | Posts gigs (photography, event staffing, scorekeeping) |
| **Freelancer** | Finds gigs via the marketplace |

---

## 4. Platform Architecture

### 4.1 Apps

| App | Tech | Hosting |
|-----|------|---------|
| Web fan portal (`apps/web`) | React + Vite | Firebase Hosting (`matchday-web`) |
| Admin portal (`apps/admin`) | React + Vite | Firebase Hosting (`matchday-admin`) |
| Mobile (`apps/mobile`) | React Native / Expo | App Store / Play Store |

### 4.2 Services

| Service | Tech | Platform |
|---------|------|----------|
| REST API (`services/api`) | Node.js / Express | Cloud Run |
| Sports scraper (`services/scraper`) | Node.js | Cloud Run (scheduled) |
| Cloud Functions (`services/functions`) | Firebase Functions v2 | Firebase |

### 4.3 Database Split

| Database | Data | Reason |
|----------|------|--------|
| **PostgreSQL** (Firebase Data Connect) | Users, Venues, Promotions, Boosts, Subscriptions | Relational, structured, business-critical |
| **Firestore** | Fixtures, Check-ins, Live Counts, Gigs, Chats | Real-time, high-frequency, document-oriented |

### 4.4 Supporting Services

- **Firebase Auth** — Email/password + Google sign-in
- **Firebase Storage** — User avatars, venue images, gig attachments
- **Stripe** — Subscription billing
- **Sports API** (TBD) — Fixture data source for scraper

---

## 5. Core Features

### 5.1 Fixtures & Live Scores

- Browse upcoming fixtures filtered by city, competition, or team
- Real-time score updates during live matches (Firestore `onSnapshot`)
- Match detail page: lineups, score, minute, venue info
- **Data source**: `services/scraper` hits sports API every 30s during live matches, writes to Firestore `/fixtures`

### 5.2 Venue Discovery

- Browse and search venues by city
- Venue profile: name, address, capacity, photos, active promotions
- "Fans Here Now" live count — aggregated from check-ins
- Verified badge for partner venues

### 5.3 Check-ins

- Fans check in to a venue during a fixture
- One active check-in per user per fixture (enforced by Firestore rules)
- Check-in triggers Cloud Function to update `/liveCounts/{fixtureId}`
- Fans can see who else is checked in at a venue

### 5.4 Promotions

- Venues post promotions: Happy Hour, Match Day Deals, Loyalty Rewards, Sponsored
- Promotions are date-bounded and can have redemption limits
- Fans browse active promotions in their city
- Promoted on fixture detail pages when a venue is nearby

### 5.5 Boosts

- Venue owners boost a promotion to target fans by city, radius, team affinity, or age range
- Budget in cents, tracked impressions + clicks
- Statuses: DRAFT → ACTIVE → PAUSED / EXPIRED
- Monetized feature (VENUE PRO plan required)

### 5.6 Gigs Marketplace

- Post and apply for sports-related gigs (photography, event staff, commentary, etc.)
- Restricted to Canadian cities
- Gig detail page with direct chat to poster
- Stored in Firestore `/gigs`

### 5.7 Fan Chat

- Real-time chat rooms (Firestore `/chats`)
- Direct messaging between fans
- Accessible from gig detail pages and venue check-in views

### 5.8 Properties (Future)

- Fan-friendly housing listings near stadiums
- Direct message landlords
- **Status**: Planned, not yet in scope for v2

---

## 6. Subscription Plans

| Plan | Price | Features |
|------|-------|---------|
| **FREE** | $0/mo | Fixtures, check-ins, gig browsing, basic chat |
| **FAN+** | TBD | No ads, premium features, boost visibility on check-in |
| **VENUE PRO** | TBD | Unlimited promotions, boost tools, analytics dashboard |
| **ENTERPRISE** | Custom | Multi-venue management, API access |

---

## 7. PostgreSQL Schema (Data Connect)

See [`dataconnect/schema/schema.gql`](./dataconnect/schema/schema.gql)

**Entities**: `User`, `Venue`, `Promotion`, `Boost`, `Subscription`
**Enums**: `UserRole`, `SubscriptionPlan`, `SubscriptionStatus`, `PromotionType`, `BoostStatus`

---

## 8. Firestore Collections

See [`firestore.schema.md`](./firestore.schema.md)

| Collection | Description |
|-----------|-------------|
| `/fixtures` | Live and upcoming match data |
| `/fixtures/{id}/liveCount` | Aggregated crowd sub-document |
| `/liveCounts/{fixtureId}` | Top-level live count aggregation |
| `/checkIns` | Fan venue check-ins |
| `/gigs` | Gig marketplace listings |
| `/chats` + `/messages` | Fan messaging |

---

## 9. API Endpoints (Cloud Run)

Base URL: `https://matchday-api-<hash>-uc.a.run.app`

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/venues` | List venues by city |
| `GET` | `/venues/:slug` | Get venue detail |
| `GET` | `/fixtures` | List fixtures |
| `GET` | `/fixtures/:id` | Get fixture detail |
| `POST` | `/checkIns` | Create a check-in |
| `DELETE` | `/checkIns/:id` | Remove a check-in |
| `GET` | `/promotions` | List active promotions |
| `GET` | `/gigs` | List gigs |

---

## 10. Security Rules

- **Firestore**: Auth-gated writes; fixtures public read; check-ins owner-only delete; liveCounts Functions-only write
- **Storage**: Auth-required uploads; avatar max 5 MB; gig attachments max 10 MB; images only for avatars
- **API**: Firebase ID token validation on all write endpoints (via Admin SDK middleware)

---

## 11. Non-Functional Requirements

- **Latency**: Live score updates < 2s from scraper write to client display
- **Availability**: 99.9% uptime for API and Firestore
- **Region**: Primary region `us-central1` (Cloud Run + Firestore + Data Connect)
- **Geography**: Soft-launched in **Canada** first (CPL, MLS Canadian clubs)
- **Compliance**: PIPEDA-compliant data handling; no PII stored unencrypted

---

## 12. Out of Scope (v2)

- Native push notifications
- Ticket purchasing / integration
- Fantasy sports features
- Live video streaming
- Properties feature (planned for v3)

---

## 13. Open Questions

- [ ] Which sports data API for fixtures? (API-Football, SportsDB, Sportradar)
- [ ] Stripe pricing tiers for FAN+ and VENUE PRO
- [ ] Mobile app release timeline (Expo vs bare React Native)
- [ ] Admin portal scope — manual venue verification, promotion moderation?
