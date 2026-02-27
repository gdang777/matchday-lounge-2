import { onRequest } from 'firebase-functions/v2/https'
import * as logger from 'firebase-functions/logger'
import { initializeApp } from 'firebase-admin/app'

initializeApp()

// ── Example HTTPS Function ──────────────────────────────────────────────────
export const helloMatchday = onRequest((req, res) => {
    logger.info('helloMatchday called', { structuredData: true })
    res.json({
        message: 'Hello from MatchDay Lounge Functions!',
        timestamp: new Date().toISOString(),
    })
})

// TODO: Add scheduled functions (e.g., scraper triggers, notifications)
// TODO: Add Firestore triggers (e.g., onUserCreate, onGigCreate)
