// NavigatePage — City Navigation (PRD §6.3)
// Transit and wayfinding guide for World Cup visitors
import { useState } from 'react'
import { getCityNavData, type CityNavData } from '../data/cityNavigation'

type CityOption = 'Vancouver' | 'Toronto'

export default function NavigatePage() {
    const [city, setCity] = useState<CityOption>('Vancouver')
    const nav = getCityNavData(city)

    return (
        <div className="navigate-page">
            {/* Hero with city selector */}
            <div className="nav-hero">
                <div className="nav-hero-content">
                    <h1 className="nav-hero-title">
                        Navigate <span className="accent">{nav.city}</span>
                    </h1>
                    <p className="nav-hero-subtitle">
                        Transit guides, airport routes, and stadium directions — built for FIFA World Cup 2026 visitors.
                    </p>
                    <div className="city-switcher">
                        <button
                            className={`city-tab ${city === 'Vancouver' ? 'active' : ''}`}
                            onClick={() => setCity('Vancouver')}
                        >
                            🏔️ Vancouver, BC
                        </button>
                        <button
                            className={`city-tab ${city === 'Toronto' ? 'active' : ''}`}
                            onClick={() => setCity('Toronto')}
                        >
                            🏙️ Toronto, ON
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Info Bar */}
            <div className="nav-quick-bar">
                <div className="nav-quick-item">
                    <span className="nav-quick-icon">🏟️</span>
                    <div>
                        <span className="nav-quick-label">Stadium</span>
                        <span className="nav-quick-value">{nav.stadium}</span>
                    </div>
                </div>
                <div className="nav-quick-item">
                    <span className="nav-quick-icon">🚇</span>
                    <div>
                        <span className="nav-quick-label">Transit</span>
                        <span className="nav-quick-value">{nav.transitSystem}</span>
                    </div>
                </div>
                <div className="nav-quick-item">
                    <span className="nav-quick-icon">💳</span>
                    <div>
                        <span className="nav-quick-label">Fare Card</span>
                        <span className="nav-quick-value">{nav.fareCard}</span>
                    </div>
                </div>
            </div>

            <div className="nav-content">
                {/* Transit Cards */}
                <section className="nav-section">
                    <h2 className="nav-section-title">🚇 Getting Around {nav.city}</h2>
                    <div className="transit-cards">
                        {nav.transitCards.map((card, i) => (
                            <div key={i} className="transit-card">
                                <span className="transit-card-icon">{card.icon}</span>
                                <div className="transit-card-content">
                                    <h3>{card.title}</h3>
                                    <p>{card.description}</p>
                                    {card.tip && (
                                        <div className="transit-tip">
                                            <span>💡</span> {card.tip}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Airport Route */}
                <section className="nav-section">
                    <RouteGuideSection route={nav.airportRoute} />
                </section>

                {/* Stadium Route */}
                <section className="nav-section">
                    <RouteGuideSection route={nav.stadiumRoute} />
                </section>

                {/* Match Day Tips */}
                <section className="nav-section">
                    <h2 className="nav-section-title">⚡ Match Day Transport Tips</h2>
                    <div className="match-tips">
                        {nav.matchDayTips.map((tip, i) => (
                            <div key={i} className="match-tip">{tip}</div>
                        ))}
                    </div>
                </section>

                {/* Interactive Map */}
                <section className="nav-section">
                    <h2 className="nav-section-title">🗺️ Key Transit Hubs & Landmarks</h2>
                    <div className="nav-map-container">
                        <MapEmbed nav={nav} />
                    </div>
                    <div className="map-legend">
                        <span className="legend-item"><span className="legend-dot legend-station" /> Transit Stations</span>
                        <span className="legend-item"><span className="legend-dot legend-stadium" /> Stadium</span>
                        <span className="legend-item"><span className="legend-dot legend-airport" /> Airport</span>
                        <span className="legend-item"><span className="legend-dot legend-fan-zone" /> Fan Zone</span>
                        <span className="legend-item"><span className="legend-dot legend-hotel" /> Hotel Zone</span>
                    </div>
                </section>
            </div>
        </div>
    )
}

// ── Route Guide Component ──
function RouteGuideSection({ route }: { route: CityNavData['airportRoute'] }) {
    return (
        <>
            <h2 className="nav-section-title">{route.icon} {route.title}</h2>
            <p className="nav-section-subtitle">{route.subtitle}</p>
            <div className="route-stats">
                <div className="route-stat">
                    <span className="route-stat-icon">🕐</span>
                    <div>
                        <span className="route-stat-label">Estimated Time</span>
                        <span className="route-stat-value">{route.estimatedTime}</span>
                    </div>
                </div>
                <div className="route-stat">
                    <span className="route-stat-icon">💵</span>
                    <div>
                        <span className="route-stat-label">Estimated Cost</span>
                        <span className="route-stat-value">{route.estimatedCost}</span>
                    </div>
                </div>
            </div>
            <div className="route-steps">
                {route.steps.map((s) => (
                    <div key={s.step} className="route-step">
                        <div className="step-number">{s.step}</div>
                        <div className="step-connector" />
                        <div className="step-content">
                            <div className="step-header">
                                <span className="step-icon">{s.icon}</span>
                                <h4>{s.instruction}</h4>
                            </div>
                            <p>{s.detail}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

// ── Map Embed ──
function MapEmbed({ nav }: { nav: CityNavData }) {
    // Build Google Maps embed URL centered on the city
    const mapUrl = `https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${nav.mapCenter.lat},${nav.mapCenter.lng}&zoom=${nav.city === 'Vancouver' ? 13 : 12}&maptype=roadmap`

    return (
        <>
            <iframe
                className="nav-map-iframe"
                src={mapUrl}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${nav.city} Transit Map`}
            />
            {/* Transit hub list below the map */}
            <div className="transit-hubs-list">
                {nav.transitHubs.map((hub, i) => (
                    <a
                        key={i}
                        className="transit-hub-item"
                        href={`https://www.google.com/maps/search/?api=1&query=${hub.lat},${hub.lng}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <span className="hub-icon">
                            {hub.type === 'station' ? '🚇' : hub.type === 'stadium' ? '🏟️' : hub.type === 'airport' ? '✈️' : hub.type === 'fan-zone' ? '🎉' : '🏨'}
                        </span>
                        <div className="hub-info">
                            <span className="hub-name">{hub.name}</span>
                            <span className="hub-desc">{hub.description}</span>
                        </div>
                        <span className="hub-arrow">→</span>
                    </a>
                ))}
            </div>
        </>
    )
}
