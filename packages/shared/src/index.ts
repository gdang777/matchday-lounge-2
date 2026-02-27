// @matchday/shared — Shared types and utilities

// ── Enums ────────────────────────────────────────────────────────────────────

export enum UserRole {
    Fan = 'fan',
    Organiser = 'organiser',
    Admin = 'admin',
}

// ── Interfaces ────────────────────────────────────────────────────────────────

export interface User {
    id: string
    displayName: string
    email: string
    role: UserRole
    avatarUrl?: string
    createdAt: string
}

export interface Match {
    id: string
    homeTeam: string
    awayTeam: string
    competition: string
    kickoffAt: string // ISO 8601
    venue: string
    city: string
}

export interface Gig {
    id: string
    title: string
    description: string
    city: string
    postedBy: string // User.id
    createdAt: string
    expiresAt?: string
}

// ── Utility helpers ───────────────────────────────────────────────────────────

export function formatMatchTitle(match: Match): string {
    return `${match.homeTeam} vs ${match.awayTeam}`
}
