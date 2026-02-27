// @matchday/shared — Full domain model
// Split by database responsibility:
//   - Postgres (Data Connect): User, Venue, Promotion, Boost, Subscription
//   - Firestore (real-time):   Fixture, CheckIn, LiveCount

// ═══════════════════════════════════════════════════════════════════════════
// ENUMS
// ═══════════════════════════════════════════════════════════════════════════

export enum UserRole {
    FAN = 'FAN',
    ORGANISER = 'ORGANISER',
    VENUE_OWNER = 'VENUE_OWNER',
    ADMIN = 'ADMIN',
}

export enum SubscriptionPlan {
    FREE = 'FREE',
    FAN_PLUS = 'FAN_PLUS',
    VENUE_PRO = 'VENUE_PRO',
    ENTERPRISE = 'ENTERPRISE',
}

export enum SubscriptionStatus {
    ACTIVE = 'ACTIVE',
    CANCELLED = 'CANCELLED',
    PAST_DUE = 'PAST_DUE',
    TRIALING = 'TRIALING',
}

export enum PromotionType {
    MATCH_DAY_DEAL = 'MATCH_DAY_DEAL',
    HAPPY_HOUR = 'HAPPY_HOUR',
    FAN_DISCOUNT = 'FAN_DISCOUNT',
    LOYALTY_REWARD = 'LOYALTY_REWARD',
    SPONSORED = 'SPONSORED',
}

export enum BoostStatus {
    DRAFT = 'DRAFT',
    ACTIVE = 'ACTIVE',
    PAUSED = 'PAUSED',
    EXPIRED = 'EXPIRED',
}

export enum FixtureStatus {
    SCHEDULED = 'SCHEDULED',
    LIVE = 'LIVE',
    HALFTIME = 'HALFTIME',
    FINISHED = 'FINISHED',
    POSTPONED = 'POSTPONED',
    CANCELLED = 'CANCELLED',
}

// ═══════════════════════════════════════════════════════════════════════════
// POSTGRES TYPES (Firebase Data Connect)
// ═══════════════════════════════════════════════════════════════════════════

/** Stored in PostgreSQL via Data Connect */
export interface User {
    id: string                 // UUID
    firebaseUid: string        // Firebase Auth UID
    displayName: string
    email: string
    role: UserRole
    avatarUrl?: string
    city?: string
    createdAt: string          // ISO 8601
    updatedAt: string
    subscription?: Subscription
}

/** Stored in PostgreSQL via Data Connect */
export interface Venue {
    id: string                 // UUID
    name: string
    slug: string               // URL-safe unique identifier
    description?: string
    address: string
    city: string
    province: string
    postalCode?: string
    country: string            // default: "CA"
    latitude?: number
    longitude?: number
    capacity?: number
    websiteUrl?: string
    phoneNumber?: string
    logoUrl?: string
    coverImageUrl?: string
    isVerified: boolean
    ownerId: string            // FK → User.id
    createdAt: string
    updatedAt: string
    promotions?: Promotion[]
}

/** Stored in PostgreSQL via Data Connect */
export interface Promotion {
    id: string                 // UUID
    venueId: string            // FK → Venue.id
    title: string
    description: string
    type: PromotionType
    imageUrl?: string
    termsUrl?: string
    startsAt: string           // ISO 8601
    expiresAt?: string
    isActive: boolean
    redemptionLimit?: number   // null = unlimited
    redemptionCount: number
    createdAt: string
    updatedAt: string
    venue?: Venue
    boosts?: Boost[]
}

/** Stored in PostgreSQL via Data Connect */
export interface Boost {
    id: string                 // UUID
    promotionId: string        // FK → Promotion.id
    status: BoostStatus
    targetCity?: string
    targetRadiusKm?: number
    targetMinAge?: number
    targetMaxAge?: number
    targetTeamId?: string      // e.g. "toronto-fc"
    budgetCents: number
    spentCents: number
    impressions: number
    clicks: number
    startsAt: string
    expiresAt: string
    createdAt: string
    promotion?: Promotion
}

/** Stored in PostgreSQL via Data Connect */
export interface Subscription {
    id: string                 // UUID
    userId: string             // FK → User.id (unique)
    plan: SubscriptionPlan
    status: SubscriptionStatus
    stripeCustomerId?: string
    stripeSubscriptionId?: string
    currentPeriodStart?: string
    currentPeriodEnd?: string
    cancelledAt?: string
    createdAt: string
    updatedAt: string
    user?: User
}

// ═══════════════════════════════════════════════════════════════════════════
// FIRESTORE TYPES (Real-time / High-frequency)
// ═══════════════════════════════════════════════════════════════════════════

/** Firestore: /fixtures/{fixtureId} — scraped + updated in real time */
export interface Fixture {
    id: string
    homeTeam: string
    awayTeam: string
    homeScore?: number
    awayScore?: number
    competition: string
    kickoffAt: string          // ISO 8601
    status: FixtureStatus
    venue: string
    city: string
    minute?: number            // live minute when status === LIVE
    updatedAt: string
}

/** Firestore: /checkIns/{checkInId} — high-write, one per user per fixture */
export interface CheckIn {
    id: string
    userId: string             // Firebase Auth UID
    fixtureId: string          // FK → Fixture.id
    venueId: string            // FK → Venue.id (Postgres UUID)
    displayName: string        // Denormalized for display
    avatarUrl?: string
    createdAt: string          // ISO 8601
}

/** Firestore: /liveCounts/{fixtureId} — aggregated by Cloud Function */
export interface LiveCount {
    fixtureId: string
    totalCheckIns: number
    venueBreakdown: Record<string, number>  // { [venueId]: count }
    updatedAt: string
}

// ═══════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

export function formatMatchTitle(fixture: Pick<Fixture, 'homeTeam' | 'awayTeam'>): string {
    return `${fixture.homeTeam} vs ${fixture.awayTeam}`
}

export function isLive(fixture: Pick<Fixture, 'status'>): boolean {
    return fixture.status === FixtureStatus.LIVE || fixture.status === FixtureStatus.HALFTIME
}

export function isPromotionActive(promotion: Pick<Promotion, 'isActive' | 'expiresAt'>): boolean {
    if (!promotion.isActive) return false
    if (!promotion.expiresAt) return true
    return new Date(promotion.expiresAt) > new Date()
}

export function slugify(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
}
