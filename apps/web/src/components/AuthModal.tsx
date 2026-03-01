// Auth Modal — Sign In / Sign Up with email or Google
import { useState, type FormEvent } from 'react'
import { useAuth } from '../contexts/AuthContext'
import './AuthModal.css'

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const { signIn, signUp, signInWithGoogle } = useAuth()
    const [mode, setMode] = useState<'signin' | 'signup'>('signin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    if (!isOpen) return null

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            if (mode === 'signup') {
                await signUp(email, password, displayName)
            } else {
                await signIn(email, password)
            }
            onClose()
        } catch (err: any) {
            const code = err?.code || ''
            if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
                setError('Invalid email or password.')
            } else if (code === 'auth/email-already-in-use') {
                setError('This email is already registered. Try signing in instead.')
            } else if (code === 'auth/weak-password') {
                setError('Password must be at least 6 characters.')
            } else {
                setError('Something went wrong. Please try again.')
            }
        } finally {
            setLoading(false)
        }
    }

    const handleGoogle = async () => {
        setError('')
        setLoading(true)
        try {
            await signInWithGoogle()
            onClose()
        } catch {
            setError('Google sign-in failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-overlay" onClick={onClose}>
            <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
                <button className="auth-close" onClick={onClose}>✕</button>

                <div className="auth-header">
                    <span className="auth-logo">⚽</span>
                    <h2>{mode === 'signin' ? 'Welcome Back' : 'Join MatchDay Lounge'}</h2>
                    <p className="auth-subtitle">
                        {mode === 'signin'
                            ? 'Sign in to access your personalized match day experience'
                            : 'Create an account to discover happy hours and more'}
                    </p>
                </div>

                {/* Google Sign-In */}
                <button className="btn-google" onClick={handleGoogle} disabled={loading}>
                    <svg viewBox="0 0 24 24" width="18" height="18">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google
                </button>

                <div className="auth-divider">
                    <span>or</span>
                </div>

                {/* Email form */}
                <form onSubmit={handleSubmit}>
                    {mode === 'signup' && (
                        <input
                            type="text"
                            placeholder="Display name"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            required
                            className="auth-input"
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="auth-input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        className="auth-input"
                    />

                    {error && <p className="auth-error">{error}</p>}

                    <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
                        {loading ? '...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                <p className="auth-toggle">
                    {mode === 'signin' ? (
                        <>Don't have an account? <button onClick={() => { setMode('signup'); setError(''); }}>Sign up</button></>
                    ) : (
                        <>Already have an account? <button onClick={() => { setMode('signin'); setError(''); }}>Sign in</button></>
                    )}
                </p>
            </div>
        </div>
    )
}
