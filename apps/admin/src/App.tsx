import React, { useState } from 'react'
import './index.css'

type AdminView = 'login' | 'dashboard'

const NAV_ITEMS = [
    { label: 'Dashboard', icon: '📊' },
    { label: 'Restaurants', icon: '🍽️' },
    { label: 'Promotions', icon: '🏷️' },
    { label: 'Scraper Queue', icon: '🤖' },
    { label: 'Boost & Revenue', icon: '💰' },
    { label: 'Analytics', icon: '📈' },
    { label: 'Content', icon: '🗺️' },
    { label: 'User Reports', icon: '🚩' },
]

export default function App() {
    const [view, setView] = useState<AdminView>('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [activeNav, setActiveNav] = useState('Dashboard')

    function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        // TODO: Firebase Admin Auth (custom claim: admin)
        setView('dashboard')
    }

    if (view === 'dashboard') {
        return (
            <div className="app">
                <aside className="sidebar">
                    <div className="sidebar-logo">
                        <span>⚽</span>
                        <span>Matchday <span className="accent">Admin</span></span>
                    </div>
                    <nav className="sidebar-nav">
                        {NAV_ITEMS.map(({ label, icon }) => (
                            <button
                                key={label}
                                className={`nav-item${label === activeNav ? ' active' : ''}`}
                                onClick={() => setActiveNav(label)}
                            >
                                <span className="nav-icon">{icon}</span>
                                {label}
                            </button>
                        ))}
                    </nav>
                    <div className="sidebar-footer">
                        <div className="admin-badge">🔐 Admin</div>
                        <button className="btn btn-ghost" onClick={() => setView('login')}>Sign Out</button>
                    </div>
                </aside>

                <main className="main">
                    <header className="topbar">
                        <div>
                            <h1 className="page-title">{activeNav}</h1>
                            <p className="page-sub">MatchDay Lounge Internal Dashboard · World Cup 2026</p>
                        </div>
                        <div className="topbar-actions">
                            <div className="city-toggle">
                                <button className="city-btn active">🍁 Vancouver</button>
                                <button className="city-btn">🏙️ Toronto</button>
                            </div>
                        </div>
                    </header>

                    {activeNav === 'Dashboard' && (
                        <>
                            <div className="stats-grid">
                                {[
                                    { label: 'Total Restaurants', value: '0', sub: '0 pending approval', color: '' },
                                    { label: 'Active Boosts', value: '0', sub: '0 Featured · 0 Premium', color: '' },
                                    { label: 'Pro Subscribers', value: '0', sub: '$0 MRR', color: 'green' },
                                    { label: 'Scraper Queue', value: '0', sub: '0 flagged by AI', color: 'amber' },
                                ].map(s => (
                                    <div key={s.label} className={`stat-card ${s.color}`}>
                                        <span className="stat-label">{s.label}</span>
                                        <span className="stat-value">{s.value}</span>
                                        <span className="stat-sub">{s.sub}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="content-grid">
                                <section className="panel">
                                    <h2 className="panel-title">Pending Restaurant Approvals</h2>
                                    <p className="panel-empty">✅ No pending approvals.</p>
                                </section>
                                <section className="panel">
                                    <h2 className="panel-title">AI Scraper Queue</h2>
                                    <p className="panel-empty">🤖 No items in queue. Scraper runs every Monday 9am PT.</p>
                                </section>
                                <section className="panel">
                                    <h2 className="panel-title">Platform Health</h2>
                                    <div className="health-list">
                                        {[
                                            { name: 'Cloud Run API', status: 'online' },
                                            { name: 'Firestore', status: 'online' },
                                            { name: 'Data Connect', status: 'online' },
                                            { name: 'FCM', status: 'online' },
                                            { name: 'Scraper Job', status: 'idle' },
                                        ].map(s => (
                                            <div key={s.name} className="health-row">
                                                <span>{s.name}</span>
                                                <span className={`health-dot ${s.status}`}>{s.status === 'online' ? '🟢' : '⚪'} {s.status}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </>
                    )}

                    {activeNav !== 'Dashboard' && (
                        <div className="coming-soon">
                            <span className="coming-icon">🔧</span>
                            <h2>{activeNav}</h2>
                            <p>This section is under construction — Phase 2 build.</p>
                        </div>
                    )}
                </main>
            </div>
        )
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-logo">
                    <span>⚽</span>
                    <span>MatchDay <span className="accent">Admin</span></span>
                </div>
                <div className="admin-warning">
                    🔐 Admin access only. Accounts are not self-registerable.
                </div>
                <form className="auth-form" onSubmit={handleLogin}>
                    <div className="field">
                        <label htmlFor="email">Admin Email</label>
                        <input id="email" type="email" placeholder="admin@matchdaylounge.com" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="field">
                        <label htmlFor="password">Password + 2FA</label>
                        <input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <button className="btn btn-primary btn-full" type="submit">Sign In to Admin Panel</button>
                </form>
                <div className="auth-trust">
                    <span>🔒 Firebase Auth · TOTP 2FA Required</span>
                </div>
            </div>
        </div>
    )
}
