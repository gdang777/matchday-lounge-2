// Firebase Configuration — MatchDay Lounge v2.0
// Uses environment variables for security; falls back to project defaults for local dev.

import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-api-key',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'matchday-lounge-2.firebaseapp.com',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'matchday-lounge-2',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'matchday-lounge-2.firebasestorage.app',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:000000000000:web:0000000000000000',
}

let app: FirebaseApp
let auth: Auth
let db: Firestore

try {
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    db = getFirestore(app)
} catch (error) {
    console.warn('[Firebase] Initialization failed — running without auth:', error)
    // Re-throw so we can handle it in AuthProvider
    app = initializeApp(firebaseConfig, 'fallback')
    auth = getAuth(app)
    db = getFirestore(app)
}

export { app, auth, db }
