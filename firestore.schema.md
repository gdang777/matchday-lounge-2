# MatchDay Lounge — Firestore Schema Reference
# v2.0 — FIFA World Cup 2026 Edition

> **Database**: Cloud Firestore
> **Purpose**: Real-time and high-frequency data — fixtures (live scores), fan check-ins, live crowd counts, city content, deal alerts
>
> Structured / relational data (venues, promotions, boosts, subscriptions) lives in **PostgreSQL via Firebase Data Connect**.

---

## Collection: `/fixtures`

**Written by**: `services/scraper` (Cloud Run scheduled job) via Admin SDK
**Read by**: All clients (public read)
**Update frequency**: Every 1 minute for upcoming; every 30s when LIVE

```
/fixtures/{fixtureId}
  id:           string        // External fixture ID (from sports API)
  homeTeam:     string
  awayTeam:     string
  homeScore:    number | null
  awayScore:    number | null
  competition:  string        // "FIFA World Cup 2026"
  kickoffAt:    Timestamp     // UTC
  status:       "SCHEDULED" | "LIVE" | "HALFTIME" | "FINISHED" | "POSTPONED" | "CANCELLED"
  venue:        string        // Stadium name (e.g. "BC Place")
  city:         string        // "Vancouver" or "Toronto"
  minute:       number | null // Live match minute (null when not LIVE)
  updatedAt:    Timestamp
```

### Sub-collection: `/fixtures/{fixtureId}/liveCount`

Aggregated via Cloud Function on check-in events. Public read, Functions-only write.

```
/fixtures/{fixtureId}/liveCount/current
  totalCheckIns:     number
  venueBreakdown:    { [venueId: string]: number }
  updatedAt:         Timestamp
```

### Indexes
- `city` ASC + `kickoffAt` ASC → Browse fixtures by city/date
- `competition` ASC + `kickoffAt` ASC → Filter by competition
- `status` ASC + `kickoffAt` ASC → Filter live/upcoming matches

---

## Collection: `/checkIns`

**Written by**: Authenticated clients (one per user per fixture)
**Read by**: Authenticated clients
**Update frequency**: High — event-driven on user tap

```
/checkIns/{checkInId}
  id:           string        // Auto-generated
  userId:       string        // Firebase Auth UID (indexed)
  fixtureId:    string        // → fixtures/{fixtureId}
  venueId:      string        // UUID → Postgres Venue.id
  displayName:  string        // Denormalized from User
  avatarUrl:    string | null
  createdAt:    Timestamp
```

### Rules
- `create`: Auth required; `userId` must equal `request.auth.uid`; required fields: `userId`, `fixtureId`, `venueId`, `createdAt`
- `delete`: Only by owning user
- `update`: **Not allowed** (delete + re-create pattern enforced)

### Indexes
- `fixtureId` ASC + `userId` ASC → Uniqueness check before creating
- `fixtureId` ASC + `createdAt` DESC → Fan list for a fixture
- `venueId` ASC + `createdAt` DESC → Fan list at a venue

---

## Collection: `/liveCounts`

**Written by**: Cloud Functions (triggered on `/checkIns` create/delete)
**Read by**: All clients (public read)
**Update frequency**: Every check-in event (debounced in Function)

```
/liveCounts/{fixtureId}
  fixtureId:       string
  totalCheckIns:   number
  venueBreakdown:  { [venueId: string]: number }
  updatedAt:       Timestamp
```

---

## Collection: `/cityContent`

**Written by**: App Admin Panel
**Read by**: All clients (public read)
**Purpose**: Transit guides, emergency contacts, language phrasebooks — static content per city

```
/cityContent/{contentId}
  city:         string        // "Vancouver" or "Toronto"
  category:     string        // "transit" | "emergency" | "language" | "stadium"
  title:        string
  content:      string        // Markdown or structured content
  language:     string        // "en" | "fr" | "es" | "pt" | "ar" | "ja" | "de" | "nl"
  sortOrder:    number
  updatedAt:    Timestamp
```

---

## Collection: `/fanZones`

**Written by**: App Admin Panel
**Read by**: All clients (public read)
**Purpose**: Official fan zone locations for match day discovery

```
/fanZones/{zoneId}
  name:         string
  description:  string
  city:         string        // "Vancouver" or "Toronto"
  address:      string
  latitude:     number
  longitude:    number
  transitInfo:  string        // How to get there
  entryReqs:    string        // Entry requirements
  updatedAt:    Timestamp
```

---

## Collection: `/dealAlerts`

**Written by**: Cloud Run proximity agent (§6.9)
**Read by**: Pro subscribers only (own alerts)
**Purpose**: AI-generated deal notifications for Pro users

```
/dealAlerts/{alertId}
  userId:       string        // Firebase Auth UID — Pro subscriber
  venueId:      string        // UUID → Postgres Venue.id
  venueName:    string        // Denormalized
  message:      string        // The alert text shown to user
  triggerType:  string        // "proximity" | "flash_deal" | "match_day" | "itinerary"
  isRead:       boolean
  createdAt:    Timestamp
```

### Indexes
- `userId` ASC + `createdAt` DESC → User's alert feed

---

## Real-time Patterns

| Pattern | Collection | Client SDK call |
|---------|-----------|-----------------|
| Live score ticker | `/fixtures/{id}` | `onSnapshot` |
| Fan crowd count | `/liveCounts/{fixtureId}` | `onSnapshot` |
| Fan list at a venue | `/checkIns` where `venueId == X` | `onSnapshot` |
| Pro deal alerts | `/dealAlerts` where `userId == X` | `onSnapshot` |
