import React, { useState } from 'react'
import './index.css'

type View = 'login' | 'dashboard'

export default function App() {
    const [view, setView] = useState<View>('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        // TODO: Firebase Auth sign-in
        setView('dashboard')
    }

    if (view === 'dashboard') {
        return (
            <div className="app">
                <aside className="sidebar">
                    <div className="sidebar-logo">
                        <span className="logo-icon">⚽</span>
                        <span>MatchDay <span className="accent">Partner</span></span>
                    </div>
                    <nav className="sidebar-nav">
                        {['Dashboard', 'My Listing', 'Promotions', 'Boost', 'Analytics', 'Settings'].map(item => (
                            <a key={item} href="#" className={`nav-item${item === 'Dashboard' ? ' active' : ''}`}>
                                {item}
                            </a>
                        ))}
                    </nav>
                    <button className="btn btn-ghost" onClick={() => setView('login')}>Sign Out</button>
                </aside>

                <main className="main">
                    <header className="topbar">
                        <div>
                            <h1 className="page-title">Dashboard</h1>
                            <p className="page-sub">Welcome back — here's your matchday overview.</p>
                        </div>
                        <div className="status-badge pending">⏳ Pending Approval</div>
                    </header>

                    <div className="stats-grid">
                        {[
                            { label: 'Listing Views', value: '—', sub: 'This week' },
                            { label: 'Promotion Clicks', value: '—', sub: 'Active promotions' },
                            { label: 'Boost Tier', value: 'Standard', sub: 'Free tier — upgrade to Featured' },
                            { label: 'FCM Reach', value: '—', sub: 'Match day alerts sent' },
                        ].map(stat => (
                            <div key={stat.label} className="stat-card">
                                <span className="stat-label">{stat.label}</span>
                                <span className="stat-value">{stat.value}</span>
                                <span className="stat-sub">{stat.sub}</span>
                            </div>
                        ))}
                    </div>

                    <div className="content-grid">
                        <section className="panel">
                            <h2 className="panel-title">Your Listing</h2>
                            <p className="panel-empty">📝 Complete your venue profile to go live on MatchDay Lounge.</p>
                            <button className="btn btn-primary">Set Up Listing →</button>
                        </section>
                        <section className="panel">
                            <h2 className="panel-title">Active Promotions</h2>
                            <p className="panel-empty">🍺 No promotions yet. Add your first happy hour deal.</p>
                            <button className="btn btn-outline">Add Promotion →</button>
                        </section>
                        <section className="panel">
                            <h2 className="panel-title">Boost Your Listing</h2>
                            <div className="boost-tiers">
                                <div className="tier">
                                    <span className="tier-name">Standard</span>
                                    <span className="tier-price">Free</span>
                                    <span className="tier-badge current">Current</span>
                                </div>
                                <div className="tier featured">
                                    <span className="tier-name">Featured</span>
                                    <span className="tier-price">$79 CAD/mo</span>
                                    <button className="btn btn-primary btn-sm">Upgrade</button>
                                </div>
                                <div className="tier premium">
                                    <span className="tier-name">Premium</span>
                                    <span className="tier-price">$149 CAD/mo</span>
                                    <button className="btn btn-amber btn-sm">Upgrade</button>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-logo">
                    <span className="logo-icon">⚽</span>
                    <span>MatchDay <span className="accent">Partner</span></span>
                </div>
                <h1 className="auth-title">Partner Portal</h1>
                <p className="auth-sub">Manage your venue, promotions, and World Cup fans.</p>
                <form className="auth-form" onSubmit={handleLogin}>
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" placeholder="you@yourrestaurant.com" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="field">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <button className="btn btn-primary btn-full" type="submit">Sign In</button>
                </form>
                <p className="auth-footer">Don't have an account? <a href="#">Register your venue →</a></p>
                <div className="auth-trust">
                    <span>🔒 Secured by Firebase Auth</span>
                    <span>🍁 Canada · FIFA World Cup 2026</span>
                </div>
            </div>
        </div>
    )
}
