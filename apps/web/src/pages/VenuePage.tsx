// VenuePage — individual restaurant detail page
import { useParams, Link } from 'react-router-dom'
import { getVenueBySlug, isOpenNow, isHappyHourNow, priceLabel } from '../data/venues'

const DAY_LABELS: Record<string, string> = {
    mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday',
    fri: 'Friday', sat: 'Saturday', sun: 'Sunday'
}
const DAY_ORDER = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

export default function VenuePage() {
    const { slug } = useParams<{ slug: string }>()
    const venue = getVenueBySlug(slug || '')

    if (!venue) {
        return (
            <div className="venue-not-found">
                <h2>Venue not found</h2>
                <p>The venue you're looking for doesn't exist.</p>
                <Link to="/" className="btn btn-primary">← Back to Deals</Link>
            </div>
        )
    }

    const open = isOpenNow(venue)

    return (
        <div className="venue-page">
            {/* Back nav */}
            <Link to="/" className="venue-back">← Back to Deals</Link>

            {/* Hero image banner */}
            <div className="venue-hero-banner">
                <img src={venue.imageUrl} alt={venue.name} className="venue-hero-img" />
                <div className="venue-hero-banner-overlay" />
            </div>

            {/* Hero info */}
            <div className="venue-hero">
                <div className="venue-hero-top">
                    {venue.boostTier === 'PREMIUM' && <span className="venue-badge premium">🏆 Official Fan Venue</span>}
                    {venue.boostTier === 'FEATURED' && <span className="venue-badge featured">⭐ Featured</span>}
                    {venue.isFanVenue && venue.boostTier !== 'PREMIUM' && <span className="venue-badge premium">⚽ FIFA Fan Venue</span>}
                    {venue.boostTier !== 'STANDARD' && (
                        <span className={`boost-tag ${venue.boostTier === 'PREMIUM' ? 'premium-boost' : 'featured-boost'}`}>
                            ⚡ {venue.boostTier === 'PREMIUM' ? 'Premium Boosted Venue' : 'Boosted Venue'}
                        </span>
                    )}
                </div>
                <h1 className="venue-hero-name">{venue.name}</h1>
                <div className="venue-hero-meta">
                    <span className={`open-badge ${open ? 'is-open' : 'is-closed'}`}>
                        {open ? '● Open Now' : '● Closed'}
                    </span>
                    <span className="meta-dot">·</span>
                    <span>{venue.neighborhood}</span>
                    <span className="meta-dot">·</span>
                    <span>{venue.cuisineType}</span>
                    <span className="meta-dot">·</span>
                    <span className="price-range">{priceLabel(venue.priceRange)}</span>
                </div>
                <p className="venue-hero-desc">{venue.description}</p>
            </div>

            {/* Content grid: Deals + Info sidebar */}
            <div className="venue-content">
                {/* Deals section */}
                <div className="venue-deals-section">
                    <h2 className="venue-section-title">🍻 Active Deals & Happy Hours</h2>
                    <div className="venue-deals-list">
                        {venue.promotions.map((promo, i) => {
                            const live = isHappyHourNow(promo)
                            return (
                                <div key={i} className={`venue-deal-card ${live ? 'deal-live' : ''}`}>
                                    {live && <span className="deal-live-badge">🔴 LIVE NOW</span>}
                                    <div className="deal-card-header">
                                        <span className="deal-card-icon">
                                            {promo.dealType === 'DRINKS' ? '🍺' : promo.dealType === 'FOOD' ? '🍽️' : '🍻'}
                                        </span>
                                        <div>
                                            <h3 className="deal-card-title">{promo.title}</h3>
                                            <span className="deal-card-type">
                                                {promo.type === 'MATCH_DAY_DEAL' ? '🏟️ Match Day Special' : '🍻 Happy Hour'}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="deal-card-desc">{promo.description}</p>
                                    <div className="deal-card-schedule">
                                        <div className="schedule-item">
                                            <span className="schedule-icon">🕐</span>
                                            <span>{promo.startTime} – {promo.endTime}</span>
                                        </div>
                                        <div className="schedule-item">
                                            <span className="schedule-icon">📅</span>
                                            <span>{formatDays(promo.daysOfWeek)}</span>
                                        </div>
                                        <div className="schedule-item">
                                            <span className="schedule-icon">🏷️</span>
                                            <span>{promo.dealType === 'DRINKS' ? 'Drinks Only' : promo.dealType === 'FOOD' ? 'Food Only' : 'Food & Drinks'}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Info sidebar */}
                <aside className="venue-info-sidebar">
                    <h2 className="venue-section-title">📍 Info</h2>
                    <div className="info-card">
                        <div className="info-row">
                            <span className="info-icon">📍</span>
                            <span>{venue.address}</span>
                        </div>
                        {venue.phoneNumber && (
                            <div className="info-row">
                                <span className="info-icon">📞</span>
                                <a href={`tel:${venue.phoneNumber}`} className="info-link">{venue.phoneNumber}</a>
                            </div>
                        )}
                        {venue.websiteUrl && (
                            <div className="info-row">
                                <span className="info-icon">🌐</span>
                                <a href={venue.websiteUrl} target="_blank" rel="noreferrer" className="info-link">Visit Website</a>
                            </div>
                        )}
                        {venue.googleMapsUrl && (
                            <div className="info-row">
                                <span className="info-icon">🗺️</span>
                                <a href={venue.googleMapsUrl} target="_blank" rel="noreferrer" className="info-link">Open in Google Maps</a>
                            </div>
                        )}
                        <div className="info-row">
                            <span className="info-icon">👥</span>
                            <span>Capacity: {venue.capacity}</span>
                        </div>
                    </div>

                    {/* Opening Hours */}
                    <h2 className="venue-section-title hours-title">🕐 Opening Hours</h2>
                    <div className="info-card">
                        <table className="hours-table">
                            <tbody>
                                {DAY_ORDER.map(day => {
                                    const h = venue.openingHours[day]
                                    const today = new Date().getDay()
                                    const isToday = DAY_ORDER.indexOf(day) === (today === 0 ? 6 : today - 1)
                                    return (
                                        <tr key={day} className={isToday ? 'today' : ''}>
                                            <td className="day-name">{DAY_LABELS[day]}</td>
                                            <td className="day-hours">{h === 'closed' ? 'Closed' : h}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </aside>
            </div>
        </div>
    )
}

function formatDays(days: string[]): string {
    if (days.length === 7) return 'Every day'
    if (days.length === 5 && !days.includes('sat') && !days.includes('sun')) return 'Monday – Friday'
    return days.map(d => DAY_LABELS[d]).join(', ')
}
