// FilterBar — horizontal filter chips for deal categories and neighborhoods
import type { DealFilter } from '../data/venues'
import { getNeighborhoods } from '../data/venues'

interface FilterBarProps {
    activeFilter: DealFilter
    activeNeighborhood: string | null
    onFilterChange: (filter: DealFilter) => void
    onNeighborhoodChange: (n: string | null) => void
    resultCount: number
}

const DEAL_FILTERS: { key: DealFilter; label: string; icon: string }[] = [
    { key: 'ALL', label: 'All Deals', icon: '🔥' },
    { key: 'DRINKS', label: 'Drinks', icon: '🍺' },
    { key: 'FOOD', label: 'Food', icon: '🍽️' },
    { key: 'HAPPY_HOUR', label: 'Happy Hours', icon: '🍻' },
    { key: 'MATCH_DAY', label: 'Match Day', icon: '🏟️' },
]

export default function FilterBar({ activeFilter, activeNeighborhood, onFilterChange, onNeighborhoodChange, resultCount }: FilterBarProps) {
    const neighborhoods = getNeighborhoods()

    return (
        <div className="filter-bar">
            <div className="filter-row">
                <div className="filter-chips">
                    {DEAL_FILTERS.map(f => (
                        <button
                            key={f.key}
                            className={`filter-chip ${activeFilter === f.key ? 'active' : ''}`}
                            onClick={() => onFilterChange(f.key)}
                        >
                            <span>{f.icon}</span>
                            <span>{f.label}</span>
                        </button>
                    ))}
                </div>
                <div className="filter-chips neighborhood-chips">
                    <button
                        className={`filter-chip neighborhood ${!activeNeighborhood ? 'active' : ''}`}
                        onClick={() => onNeighborhoodChange(null)}
                    >
                        All Areas
                    </button>
                    {neighborhoods.map(n => (
                        <button
                            key={n}
                            className={`filter-chip neighborhood ${activeNeighborhood === n ? 'active' : ''}`}
                            onClick={() => onNeighborhoodChange(n)}
                        >
                            {n}
                        </button>
                    ))}
                </div>
            </div>
            <div className="filter-result-count">
                <span className="result-count">{resultCount}</span> venues
            </div>
        </div>
    )
}
