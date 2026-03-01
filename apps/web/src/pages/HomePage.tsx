// HomePage — Yelp-like deal discovery with filters
import { useState, useMemo } from 'react'
import { VENUES, filterVenues, type DealFilter } from '../data/venues'
import FilterBar from '../components/FilterBar'
import VenueCard from '../components/VenueCard'

export default function HomePage() {
    const [filter, setFilter] = useState<DealFilter>('ALL')
    const [neighborhood, setNeighborhood] = useState<string | null>(null)

    const filteredVenues = useMemo(
        () => filterVenues(VENUES, filter, neighborhood),
        [filter, neighborhood]
    )

    // Sort: PREMIUM first, then FEATURED, then STANDARD
    const sortedVenues = useMemo(() => {
        const tierOrder = { PREMIUM: 0, FEATURED: 1, STANDARD: 2 }
        return [...filteredVenues].sort((a, b) => tierOrder[a.boostTier] - tierOrder[b.boostTier])
    }, [filteredVenues])

    return (
        <>
            {/* Compact Hero */}
            <div className="discovery-hero">
                <div className="discovery-hero-content">
                    <h1 className="discovery-title">
                        Deals Near You <span className="accent">⚽</span>
                    </h1>
                    <p className="discovery-subtitle">
                        Happy hours, match-day specials, and food deals — updated live for FIFA World Cup 2026 in Vancouver.
                    </p>
                </div>
            </div>

            {/* Filters */}
            <FilterBar
                activeFilter={filter}
                activeNeighborhood={neighborhood}
                onFilterChange={setFilter}
                onNeighborhoodChange={setNeighborhood}
                resultCount={sortedVenues.length}
            />

            {/* Venue Grid */}
            <main className="venue-grid">
                {sortedVenues.length > 0 ? (
                    sortedVenues.map(v => <VenueCard key={v.slug} venue={v} />)
                ) : (
                    <div className="no-results">
                        <span className="no-results-icon">🔍</span>
                        <p>No venues match your filters.</p>
                        <button className="btn btn-secondary" onClick={() => { setFilter('ALL'); setNeighborhood(null) }}>
                            Clear Filters
                        </button>
                    </div>
                )}
            </main>
        </>
    )
}
