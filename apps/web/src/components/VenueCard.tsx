// VenueCard — deal card for the discovery grid with image
import { Link } from 'react-router-dom'
import type { Venue } from '../data/venues'
import { isOpenNow, isHappyHourNow, priceLabel } from '../data/venues'

interface VenueCardProps {
    venue: Venue
}

export default function VenueCard({ venue }: VenueCardProps) {
    const open = isOpenNow(venue)
    const activeDeal = venue.promotions.find(p => isHappyHourNow(p))
    const bestDeal = activeDeal || venue.promotions[0]
    const isPremium = venue.boostTier === 'PREMIUM'
    const isFeatured = venue.boostTier === 'FEATURED'

    return (
        <Link
            to={`/venue/${venue.slug}`}
            className={`venue-card ${isPremium ? 'venue-card-premium' : ''} ${isFeatured ? 'venue-card-featured' : ''}`}
            id={`venue-${venue.slug}`}
        >
            {/* Image */}
            <div className="venue-card-image">
                <img src={venue.imageUrl} alt={venue.name} loading="lazy" />
                <div className="venue-card-image-overlay" />

                {/* Badges on image */}
                {isPremium && (
                    <span className="venue-badge premium">🏆 Official Fan Venue</span>
                )}
                {isFeatured && (
                    <span className="venue-badge featured">⭐ Featured</span>
                )}

                {/* Open/Closed badge */}
                <span className={`open-badge ${open ? 'is-open' : 'is-closed'}`}>
                    {open ? 'Open Now' : 'Closed'}
                </span>

                {/* Boost label */}
                {isPremium && (
                    <div className="boost-label premium-boost">
                        <span>⚡</span> Boosted · Premium
                    </div>
                )}
                {isFeatured && (
                    <div className="boost-label featured-boost">
                        <span>⚡</span> Boosted
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="venue-card-body">
                <h3 className="venue-card-name">{venue.name}</h3>

                <div className="venue-card-meta">
                    <span>{venue.neighborhood}</span>
                    <span className="meta-dot">·</span>
                    <span>{venue.cuisineType}</span>
                    <span className="meta-dot">·</span>
                    <span className="price-range">{priceLabel(venue.priceRange)}</span>
                </div>

                {/* Best deal */}
                {bestDeal && (
                    <div className={`venue-deal ${activeDeal ? 'deal-active' : ''}`}>
                        <span className="deal-icon">
                            {bestDeal.dealType === 'DRINKS' ? '🍺' : bestDeal.dealType === 'FOOD' ? '🍽️' : '🍻'}
                        </span>
                        <div className="deal-info">
                            <span className="deal-title">{bestDeal.title}</span>
                            <span className="deal-times">{bestDeal.startTime} – {bestDeal.endTime} · {formatDays(bestDeal.daysOfWeek)}</span>
                        </div>
                        {activeDeal && <span className="deal-live-dot" />}
                    </div>
                )}

                {/* Fan venue badge */}
                {venue.isFanVenue && (
                    <div className="fan-venue-tag">
                        <span>⚽</span> FIFA Fan Venue
                    </div>
                )}
            </div>
        </Link>
    )
}

function formatDays(days: string[]): string {
    if (days.length === 7) return 'Every day'
    if (days.length === 5 && !days.includes('sat') && !days.includes('sun')) return 'Mon–Fri'
    return days.map(d => d.charAt(0).toUpperCase() + d.slice(1, 3)).join(', ')
}
