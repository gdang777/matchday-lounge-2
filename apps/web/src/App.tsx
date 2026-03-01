import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import AuthModal from './components/AuthModal'
import HomePage from './pages/HomePage'
import VenuePage from './pages/VenuePage'
import NavigatePage from './pages/NavigatePage'
import './index.css'

export default function App() {
    const { user, loading, signOut } = useAuth()
    const [showAuth, setShowAuth] = useState(false)

    return (
        <div className="app">
            {/* ── Topbar ── */}
            <nav className="topbar">
                <Link to="/" className="logo">
                    <span className="logo-icon">⚽</span>
                    <span>MatchDay <span className="accent">Lounge</span></span>
                </Link>
                <div className="topbar-right">
                    <div className="topbar-nav">
                        <Link to="/" className="topbar-link">🍻 Deals</Link>
                        <Link to="/navigate" className="topbar-link">🗺️ Navigate</Link>
                    </div>
                    {!loading && (
                        user ? (
                            <div className="user-menu">
                                <span className="user-avatar">
                                    {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || '?'}
                                </span>
                                <span className="user-name">{user.displayName || user.email}</span>
                                <button className="btn-sign-out" onClick={signOut}>Sign Out</button>
                            </div>
                        ) : (
                            <button className="btn btn-primary btn-sm" onClick={() => setShowAuth(true)}>
                                Sign In
                            </button>
                        )
                    )}
                </div>
            </nav>

            {/* ── Routes ── */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/venue/:slug" element={<VenuePage />} />
                <Route path="/navigate" element={<NavigatePage />} />
            </Routes>

            {/* ── Footer ── */}
            <footer className="footer">
                <p>© 2026 <span className="accent">MatchDay Lounge</span> · Your City. Your Match. Your Night.</p>
            </footer>

            {/* Auth Modal */}
            <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
        </div>
    )
}
