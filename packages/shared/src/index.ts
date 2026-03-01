// @matchday/shared — Full domain model (v2.0 — FIFA World Cup 2026)
// Split by database responsibility:
//   - Postgres (Data Connect): User, Venue, Promotion, Boost, Subscription, AuditLog
//   - Firestore (real-time):   Fixture, CheckIn, LiveCount, CityContent, FanZone, DealAlert

// ═══════════════════════════════════════════════════════════════════════════
// ENUMS
// ═══════════════════════════════════════════════════════════════════════════

export enum UserRole {
    FAN = 'FAN',
    VENUE_OWNER = 'VENUE_OWNER',
    ADMIN = 'ADMIN',
}

export enum SubscriptionPlan {
    FREE = 'FREE',
    PRO_MONTHLY = 'PRO_MONTHLY',           // $7.99 CAD/month
    PRO_TOURNAMENT = 'PRO_TOURNAMENT',     // $14.99 CAD one-time
}

export enum SubscriptionStatus {
    ACTIVE = 'ACTIVE',
    CANCELLED = 'CANCELLED',
    PAST_DUE = 'PAST_DUE',
    TRIALING = 'TRIALING',
}

export enum PromotionType {
    HAPPY_HOUR = 'HAPPY_HOUR',
    MATCH_DAY_DEAL = 'MATCH_DAY_DEAL',
    FLASH_DEAL = 'FLASH_DEAL',
    FAN_DISCOUNT = 'FAN_DISCOUNT',
}

export enum BoostTier {
    STANDARD = 'STANDARD',     // Free — default distance order
    FEATURED = 'FEATURED',     // $79/month
    PREMIUM = 'PREMIUM',       // $149/month
}

export enum BoostStatus {
    DRAFT = 'DRAFT',
    ACTIVE = 'ACTIVE',
    PAUSED = 'PAUSED',
    EXPIRED = 'EXPIRED',
}

export enum DealType {
    DRINKS = 'DRINKS',
    FOOD = 'FOOD',
    BOTH = 'BOTH',
}

export enum ListingSource {
    MANUAL = 'MANUAL',
    SCRAPED = 'SCRAPED',
    USER_TIP = 'USER_TIP',
}

export enum ListingApprovalStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
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
    city?: string              // "Vancouver" or "Toronto"
    preferredNeighborhoods?: string[]
    quietHoursStart?: string   // "22:00"
    quietHoursEnd?: string     // "08:00"
    dealTypePreference?: DealType
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
    neighborhood: string       // e.g. "Gastown", "King West"
    city: string               // "Vancouver" or "Toronto"
    province: string
    postalCode?: string
    country: string            // default: "CA"
    latitude?: number
    longitude?: number
    capacity?: number
    cuisineType?: string       // e.g. "Mexican", "Pub", "Italian"
    priceRange?: number        // 1–4 ($–$$$$)
    websiteUrl?: string
    phoneNumber?: string
    googleMapsUrl?: string
    logoUrl?: string
    coverImageUrl?: string
    openingHours?: string      // JSON string
    isVerified: boolean        // Green checkmark
    isFanVenue: boolean        // "Official Fan Venue" badge (Premium tier)
    boostTier: BoostTier
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
    dealType?: DealType        // DRINKS, FOOD, or BOTH
    daysOfWeek?: string[]      // ["mon","tue","wed"]
    startTime?: string         // "15:00"
    endTime?: string           // "18:00"
    imageUrl?: string
    termsUrl?: string
    startsAt: string           // ISO 8601 — campaign start date
    expiresAt?: string         // campaign end date
    isActive: boolean
    source: ListingSource
    approvalStatus: ListingApprovalStatus
    sourceUrl?: string         // For scraped deals
    submittedByUserId?: string // For user-submitted tips
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
    venueId: string            // FK → Venue.id
    promotionId?: string       // FK → Promotion.id (optional)
    tier: BoostTier
    status: BoostStatus
    stripeSubscriptionId?: string
    targetCity?: string
    startsAt: string
    expiresAt: string
    createdAt: string
    venue?: Venue
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

/** Stored in PostgreSQL via Data Connect — immutable admin audit trail */
export interface AuditLog {
    id: string
    adminUserId: string
    action: string             // e.g. "APPROVE_VENUE", "REJECT_PROMOTION"
    targetType: string         // e.g. "Venue", "Promotion", "User"
    targetId: string
    details?: string           // JSON
    createdAt: string
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
    competition: string        // "FIFA World Cup 2026"
    kickoffAt: string          // ISO 8601
    status: FixtureStatus
    venue: string              // Stadium name
    city: string               // "Vancouver" or "Toronto"
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

/** Firestore: /cityContent/{contentId} — static content per city */
export interface CityContent {
    id: string
    city: string               // "Vancouver" or "Toronto"
    category: 'transit' | 'emergency' | 'language' | 'stadium'
    title: string
    content: string            // Markdown or structured content
    language: string           // "en" | "fr" | "es" | "pt" | "ar" | "ja" | "de" | "nl"
    sortOrder: number
    updatedAt: string
}

/** Firestore: /fanZones/{zoneId} — official fan zone locations */
export interface FanZone {
    id: string
    name: string
    description: string
    city: string
    address: string
    latitude: number
    longitude: number
    transitInfo: string
    entryReqs: string
    updatedAt: string
}

/** Firestore: /dealAlerts/{alertId} — AI-generated deal notifications (Pro) */
export interface DealAlert {
    id: string
    userId: string             // Firebase Auth UID — Pro subscriber
    venueId: string            // UUID → Postgres Venue.id
    venueName: string          // Denormalized
    message: string            // Alert text shown to user
    triggerType: 'proximity' | 'flash_deal' | 'match_day' | 'itinerary'
    isRead: boolean
    createdAt: string
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

export function isHappyHourNow(promotion: Pick<Promotion, 'startTime' | 'endTime' | 'daysOfWeek'>): boolean {
    if (!promotion.startTime || !promotion.endTime || !promotion.daysOfWeek) return false
    const now = new Date()
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    const today = days[now.getDay()]
    if (!promotion.daysOfWeek.includes(today)) return false
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
    return currentTime >= promotion.startTime && currentTime <= promotion.endTime
}

export function isProSubscriber(user: Pick<User, 'subscription'>): boolean {
    if (!user.subscription) return false
    return (
        user.subscription.status === SubscriptionStatus.ACTIVE &&
        (user.subscription.plan === SubscriptionPlan.PRO_MONTHLY ||
            user.subscription.plan === SubscriptionPlan.PRO_TOURNAMENT)
    )
}

export function slugify(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
}

export function formatBoostTierLabel(tier: BoostTier): string {
    switch (tier) {
        case BoostTier.STANDARD: return 'Standard'
        case BoostTier.FEATURED: return '⭐ Featured'
        case BoostTier.PREMIUM: return '🏆 Official Fan Venue'
    }
}

export function formatBoostPrice(tier: BoostTier): string {
    switch (tier) {
        case BoostTier.STANDARD: return 'Free'
        case BoostTier.FEATURED: return '$79/month'
        case BoostTier.PREMIUM: return '$149/month'
    }
}
