import './index.css'

export default function App() {
    return (
        <div className="app">
            <header className="hero">
                <div className="hero-content">
                    <div className="logo">
                        <span className="logo-icon">⚽</span>
                        <span className="logo-text">MatchDay <span className="accent">Lounge</span></span>
                    </div>
                    <h1 className="hero-title">Your Fan Hub for Every Matchday</h1>
                    <p className="hero-subtitle">
                        Follow your crew, find gigs, join the conversation — all in one place.
                    </p>
                    <div className="cta-group">
                        <button className="btn btn-primary">Get Started</button>
                        <button className="btn btn-secondary">Learn More</button>
                    </div>
                </div>
                <div className="hero-badge">
                    <span>🚀 Coming Soon</span>
                </div>
            </header>

            <main className="features">
                <div className="feature-card">
                    <span className="feature-icon">📅</span>
                    <h3>Live Schedules</h3>
                    <p>Track fixtures, scores, and results across leagues in real time.</p>
                </div>
                <div className="feature-card">
                    <span className="feature-icon">💬</span>
                    <h3>Fan Chat</h3>
                    <p>Connect with fans in your city and around the world.</p>
                </div>
                <div className="feature-card">
                    <span className="feature-icon">💼</span>
                    <h3>Gigs</h3>
                    <p>Find and post sports-related gigs in your community.</p>
                </div>
                <div className="feature-card">
                    <span className="feature-icon">🏠</span>
                    <h3>Properties</h3>
                    <p>Discover fan-friendly housing near your favourite stadiums.</p>
                </div>
            </main>

            <footer className="footer">
                <p>© 2025 MatchDay Lounge. All rights reserved.</p>
            </footer>
        </div>
    )
}
