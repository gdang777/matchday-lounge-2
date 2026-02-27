# MatchDay Lounge — Firestore Schema Reference

> **Database**: Cloud Firestore
> **Purpose**: Real-time and high-frequency data — fixtures (live scores), fan check-ins, live crowd counts
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
  competition:  string        // e.g. "MLS", "CPL", "EPL"
  kickoffAt:    Timestamp     // UTC
  status:       "SCHEDULED" | "LIVE" | "HALFTIME" | "FINISHED" | "POSTPONED" | "CANCELLED"
  venue:        string        // Venue name (denormalized)
  city:         string        // e.g. "Toronto"
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
- `competition` ASC + `kickoffAt` ASC → Filter by league

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

## Collection: `/gigs`

**Written by**: Authenticated users
**Read by**: Authenticated users

```
/gigs/{gigId}
  id:           string
  title:        string
  description:  string
  city:         string
  postedBy:     string        // Firebase Auth UID
  createdAt:    Timestamp
  expiresAt:    Timestamp | null
```

### Indexes
- `city` ASC + `createdAt` DESC → Gig feed by city

---

## Collection: `/chats`

**Written/Read by**: Authenticated members only

```
/chats/{chatId}
  members:      string[]      // Firebase Auth UIDs
  createdAt:    Timestamp

  /messages/{messageId}
    senderId:   string
    text:       string
    createdAt:  Timestamp
```

---

## Real-time Patterns

| Pattern | Collection | Client SDK call |
|---------|-----------|-----------------|
| Live score ticker | `/fixtures/{id}` | `onSnapshot` |
| Fan crowd count | `/liveCounts/{fixtureId}` | `onSnapshot` |
| Fan list at a venue | `/checkIns` where `venueId == X` | `onSnapshot` |
| Chat messages | `/chats/{id}/messages` | `onSnapshot` |
