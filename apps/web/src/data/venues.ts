// MatchDay Lounge — Venue & Deal Data for Web Frontend
// This mirrors the seed data but typed for React consumption.

export interface Promotion {
    title: string
    description: string
    type: string
    dealType: 'DRINKS' | 'FOOD' | 'BOTH'
    daysOfWeek: string[]
    startTime: string
    endTime: string
    source: string
}

export interface Venue {
    name: string
    slug: string
    description: string
    address: string
    neighborhood: string
    city: string
    cuisineType: string
    priceRange: number
    capacity: number
    latitude: number
    longitude: number
    openingHours: Record<string, string>
    isVerified: boolean
    isFanVenue: boolean
    boostTier: 'STANDARD' | 'FEATURED' | 'PREMIUM'
    promotions: Promotion[]
    imageUrl: string
    websiteUrl?: string
    phoneNumber?: string
    googleMapsUrl?: string
}

// ── Helper Functions ─────────────────────────────────────────────────

const DAY_MAP: Record<number, string> = { 0: 'sun', 1: 'mon', 2: 'tue', 3: 'wed', 4: 'thu', 5: 'fri', 6: 'sat' }

export function isOpenNow(venue: Venue): boolean {
    const now = new Date()
    const day = DAY_MAP[now.getDay()]
    const hours = venue.openingHours[day]
    if (!hours || hours === 'closed') return false

    const [open, close] = hours.split('-')
    const nowMins = now.getHours() * 60 + now.getMinutes()
    const openMins = toMinutes(open)
    let closeMins = toMinutes(close)
    if (closeMins <= openMins) closeMins += 24 * 60 // past midnight

    return nowMins >= openMins && nowMins < closeMins
}

export function isHappyHourNow(promo: Promotion): boolean {
    const now = new Date()
    const day = DAY_MAP[now.getDay()]
    if (!promo.daysOfWeek.includes(day)) return false

    const nowMins = now.getHours() * 60 + now.getMinutes()
    const startMins = toMinutes(promo.startTime)
    const endMins = toMinutes(promo.endTime)

    return nowMins >= startMins && nowMins < endMins
}

function toMinutes(time: string): number {
    const [h, m] = time.split(':').map(Number)
    return h * 60 + m
}

export function priceLabel(n: number): string {
    return '$'.repeat(n)
}

export function getVenueBySlug(slug: string): Venue | undefined {
    return VENUES.find(v => v.slug === slug)
}

export function getNeighborhoods(): string[] {
    return [...new Set(VENUES.map(v => v.neighborhood))].sort()
}

export type DealFilter = 'ALL' | 'DRINKS' | 'FOOD' | 'HAPPY_HOUR' | 'MATCH_DAY'

export function filterVenues(venues: Venue[], filter: DealFilter, neighborhood: string | null): Venue[] {
    let results = venues

    // Neighborhood filter
    if (neighborhood) {
        results = results.filter(v => v.neighborhood === neighborhood)
    }

    // Deal type filter
    if (filter === 'ALL') return results

    return results.filter(v => v.promotions.some(p => {
        if (filter === 'DRINKS') return p.dealType === 'DRINKS' || p.dealType === 'BOTH'
        if (filter === 'FOOD') return p.dealType === 'FOOD' || p.dealType === 'BOTH'
        if (filter === 'HAPPY_HOUR') return p.type === 'HAPPY_HOUR'
        if (filter === 'MATCH_DAY') return p.type === 'MATCH_DAY_DEAL'
        return true
    }))
}

// ── Venue Data ───────────────────────────────────────────────────────

export const VENUES: Venue[] = [
    {
        name: 'The Blarney Stone',
        slug: 'the-blarney-stone',
        imageUrl: '/venues/irish-pub.png',
        description: 'Legendary Irish pub in the heart of Gastown. Live sports on 20+ screens, authentic pub grub, and the best pints in Vancouver.',
        address: '216 Carrall St, Vancouver, BC V6B 2J1',
        neighborhood: 'Gastown',
        city: 'Vancouver',
        cuisineType: 'Irish Pub',
        priceRange: 2,
        capacity: 200,
        websiteUrl: 'https://theblarneystonevancouver.com',
        phoneNumber: '604-687-4322',
        googleMapsUrl: 'https://maps.google.com/?q=The+Blarney+Stone+Vancouver',
        latitude: 49.2825,
        longitude: -123.1046,
        openingHours: { mon: '11:00-01:00', tue: '11:00-01:00', wed: '11:00-01:00', thu: '11:00-01:00', fri: '11:00-02:00', sat: '11:00-02:00', sun: '11:00-00:00' },
        isVerified: true,
        isFanVenue: false,
        boostTier: 'STANDARD',
        promotions: [
            { title: 'Half-Price Pints & Wings', description: '$4 draft pints and $0.50 wings every weekday afternoon.', type: 'HAPPY_HOUR', dealType: 'BOTH', daysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri'], startTime: '14:00', endTime: '17:00', source: 'MANUAL' }
        ]
    },
    {
        name: 'Score on Davie',
        slug: 'score-on-davie',
        imageUrl: '/venues/sports-bar.png',
        description: 'Vancouver\'s ultimate sports bar. Giant projectors, 40+ TVs, and the liveliest match-day atmosphere in the West End.',
        address: '1262 Davie St, Vancouver, BC V6E 1N3',
        neighborhood: 'West End',
        city: 'Vancouver',
        cuisineType: 'Sports Bar',
        priceRange: 2,
        capacity: 250,
        websiteUrl: 'https://scoreondavie.com',
        phoneNumber: '604-632-1646',
        googleMapsUrl: 'https://maps.google.com/?q=Score+on+Davie+Vancouver',
        latitude: 49.2780,
        longitude: -123.1332,
        openingHours: { mon: '11:00-01:00', tue: '11:00-01:00', wed: '11:00-01:00', thu: '11:00-01:00', fri: '11:00-02:00', sat: '10:00-02:00', sun: '10:00-00:00' },
        isVerified: true,
        isFanVenue: true,
        boostTier: 'PREMIUM',
        promotions: [
            { title: '$6 Match Day Pints + $10 Nachos', description: 'Match day special — $6 pints and $10 loaded nachos on all FIFA game days.', type: 'MATCH_DAY_DEAL', dealType: 'BOTH', daysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'], startTime: '11:00', endTime: '16:00', source: 'MANUAL' },
            { title: '$5 Draft & $7 Highballs', description: 'Daily happy hour on draft beer and well highballs.', type: 'HAPPY_HOUR', dealType: 'DRINKS', daysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri'], startTime: '15:00', endTime: '18:00', source: 'MANUAL' }
        ]
    },
    {
        name: 'El Camino',
        slug: 'el-camino',
        imageUrl: '/venues/mexican-cantina.png',
        description: 'Vibrant Mexican cantina with craft tequila cocktails, tacos, and a rooftop patio overlooking Gastown.',
        address: '300 W Pender St, Vancouver, BC V6B 1T3',
        neighborhood: 'Gastown',
        city: 'Vancouver',
        cuisineType: 'Mexican',
        priceRange: 2,
        capacity: 120,
        latitude: 49.2819,
        longitude: -123.1076,
        openingHours: { mon: '16:00-00:00', tue: '16:00-00:00', wed: '16:00-00:00', thu: '16:00-00:00', fri: '16:00-01:00', sat: '12:00-01:00', sun: '12:00-23:00' },
        isVerified: true,
        isFanVenue: false,
        boostTier: 'FEATURED',
        promotions: [
            { title: '$5 Cervezas & $7 Margaritas', description: 'Weekday happy hour with $5 Mexican beers and $7 house margaritas.', type: 'HAPPY_HOUR', dealType: 'DRINKS', daysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri'], startTime: '15:00', endTime: '18:00', source: 'MANUAL' }
        ]
    },
    {
        name: 'Guilt & Co',
        slug: 'guilt-and-co',
        imageUrl: '/venues/cocktail-bar.png',
        description: 'Underground speakeasy in Gastown with live music, craft cocktails, and a cozy basement vibe.',
        address: '1 Alexander St, Vancouver, BC V6A 1B2',
        neighborhood: 'Gastown',
        city: 'Vancouver',
        cuisineType: 'Cocktail Bar',
        priceRange: 3,
        capacity: 80,
        latitude: 49.2843,
        longitude: -123.1050,
        openingHours: { mon: 'closed', tue: '17:00-00:00', wed: '17:00-00:00', thu: '17:00-01:00', fri: '17:00-01:00', sat: '17:00-01:00', sun: '17:00-23:00' },
        isVerified: true,
        isFanVenue: false,
        boostTier: 'STANDARD',
        promotions: [
            { title: '$4 Cocktails Before 5 PM', description: 'Early bird cocktail special — $4 well cocktails from open until 5 PM.', type: 'HAPPY_HOUR', dealType: 'DRINKS', daysOfWeek: ['tue', 'wed', 'thu', 'fri', 'sat'], startTime: '17:00', endTime: '19:00', source: 'MANUAL' }
        ]
    },
    {
        name: 'The Pint Public House',
        slug: 'the-pint-public-house',
        imageUrl: '/venues/sports-bar.png',
        description: 'Massive 2-floor sports bar on Granville Strip with pool tables, dance floor, and wall-to-wall screens.',
        address: '455 Abbott St, Vancouver, BC V6B 2J6',
        neighborhood: 'Downtown',
        city: 'Vancouver',
        cuisineType: 'Sports Bar',
        priceRange: 2,
        capacity: 400,
        latitude: 49.2829,
        longitude: -123.1107,
        openingHours: { mon: '11:00-01:00', tue: '11:00-01:00', wed: '11:00-01:00', thu: '11:00-01:00', fri: '11:00-03:00', sat: '11:00-03:00', sun: '11:00-00:00' },
        isVerified: true,
        isFanVenue: false,
        boostTier: 'STANDARD',
        promotions: [
            { title: '$15 Pitchers & $1 Wings', description: 'Weekday special — $15 pitchers of domestic beer and $1 wings.', type: 'HAPPY_HOUR', dealType: 'BOTH', daysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri'], startTime: '14:00', endTime: '17:00', source: 'MANUAL' }
        ]
    },
    {
        name: 'Tap & Barrel',
        slug: 'tap-and-barrel-convention',
        imageUrl: '/venues/waterfront.png',
        description: 'Waterfront taphouse with stunning views of False Creek, 60+ draft lines, and BC craft beer focus.',
        address: '1 Athletes Way, Vancouver, BC V5Y 0B1',
        neighborhood: 'Olympic Village',
        city: 'Vancouver',
        cuisineType: 'Taphouse',
        priceRange: 2,
        capacity: 300,
        latitude: 49.2714,
        longitude: -123.1077,
        openingHours: { mon: '11:30-23:00', tue: '11:30-23:00', wed: '11:30-23:00', thu: '11:30-23:00', fri: '11:30-00:00', sat: '11:00-00:00', sun: '11:00-22:00' },
        isVerified: true,
        isFanVenue: false,
        boostTier: 'STANDARD',
        promotions: [
            { title: '$6 BC Craft Pints', description: 'Daily happy hour featuring BC craft pints at $6.', type: 'HAPPY_HOUR', dealType: 'DRINKS', daysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri'], startTime: '15:00', endTime: '18:00', source: 'MANUAL' }
        ]
    },
    {
        name: 'Pourhouse',
        slug: 'pourhouse-vancouver',
        imageUrl: '/venues/cocktail-bar.png',
        description: 'Rustic old-world saloon serving inventive cocktails and elevated bar bites in a reclaimed-wood interior.',
        address: '162 Water St, Vancouver, BC V6B 1B2',
        neighborhood: 'Gastown',
        city: 'Vancouver',
        cuisineType: 'Cocktail Bar',
        priceRange: 3,
        capacity: 100,
        latitude: 49.2840,
        longitude: -123.1083,
        openingHours: { mon: '17:00-01:00', tue: '17:00-01:00', wed: '17:00-01:00', thu: '17:00-01:00', fri: '17:00-02:00', sat: '12:00-02:00', sun: '12:00-00:00' },
        isVerified: true,
        isFanVenue: false,
        boostTier: 'STANDARD',
        promotions: [
            { title: '$8 Classic Cocktails', description: 'Happy hour with $8 classic cocktails — Old Fashioned, Negroni, Manhattan.', type: 'HAPPY_HOUR', dealType: 'DRINKS', daysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri'], startTime: '17:00', endTime: '19:00', source: 'MANUAL' }
        ]
    },
    {
        name: 'Brewhall',
        slug: 'brewhall-vancouver',
        imageUrl: '/venues/brewery.png',
        description: 'Industrial craft brewery and beer hall with 40 taps, food trucks, and communal seating at Olympic Village.',
        address: '97 E 2nd Ave, Vancouver, BC V5T 1B3',
        neighborhood: 'Olympic Village',
        city: 'Vancouver',
        cuisineType: 'Brewery',
        priceRange: 2,
        capacity: 350,
        latitude: 49.2694,
        longitude: -123.1009,
        openingHours: { mon: '11:30-23:00', tue: '11:30-23:00', wed: '11:30-23:00', thu: '11:30-00:00', fri: '11:30-01:00', sat: '11:00-01:00', sun: '11:00-22:00' },
        isVerified: true,
        isFanVenue: false,
        boostTier: 'STANDARD',
        promotions: [
            { title: '$2 Off All House Beers', description: '$2 off all house-brewed beers during happy hour.', type: 'HAPPY_HOUR', dealType: 'DRINKS', daysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri'], startTime: '15:00', endTime: '17:00', source: 'MANUAL' }
        ]
    },
    {
        name: 'The Cambie',
        slug: 'the-cambie',
        imageUrl: '/venues/irish-pub.png',
        description: 'No-frills Gastown institution since 1987. Cheap pitchers, bar food, and the most backpacker-friendly spot in town.',
        address: '300 Cambie St, Vancouver, BC V6B 2N3',
        neighborhood: 'Gastown',
        city: 'Vancouver',
        cuisineType: 'Pub',
        priceRange: 1,
        capacity: 150,
        latitude: 49.2826,
        longitude: -123.1085,
        openingHours: { mon: '11:00-00:00', tue: '11:00-00:00', wed: '11:00-00:00', thu: '11:00-00:00', fri: '11:00-01:00', sat: '11:00-01:00', sun: '11:00-00:00' },
        isVerified: true,
        isFanVenue: false,
        boostTier: 'STANDARD',
        promotions: [
            { title: '$12 Pitchers All Day', description: 'House pitcher special — the cheapest pints in Gastown.', type: 'HAPPY_HOUR', dealType: 'DRINKS', daysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'], startTime: '11:00', endTime: '18:00', source: 'MANUAL' }
        ]
    },
    {
        name: 'Yaletown Brewing Company',
        slug: 'yaletown-brewing-company',
        imageUrl: '/venues/brewery.png',
        description: 'Vancouver\'s original brewpub since 1994. House-brewed beers, solid pub food, and a sprawling patio in Yaletown.',
        address: '1111 Mainland St, Vancouver, BC V6B 2T9',
        neighborhood: 'Yaletown',
        city: 'Vancouver',
        cuisineType: 'Brewpub',
        priceRange: 2,
        capacity: 200,
        latitude: 49.2738,
        longitude: -123.1204,
        openingHours: { mon: '11:30-23:00', tue: '11:30-23:00', wed: '11:30-23:00', thu: '11:30-00:00', fri: '11:30-01:00', sat: '11:00-01:00', sun: '11:00-22:00' },
        isVerified: true,
        isFanVenue: false,
        boostTier: 'FEATURED',
        promotions: [
            { title: '$5 House Pints & $7 Appetizers', description: 'Happy hour on all house-brewed pints and select appetizers.', type: 'HAPPY_HOUR', dealType: 'BOTH', daysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri'], startTime: '15:00', endTime: '18:00', source: 'MANUAL' }
        ]
    },
    {
        name: 'Mahony & Sons',
        slug: 'mahony-and-sons-stamps',
        imageUrl: '/venues/waterfront.png',
        description: 'Waterfront Irish pub at Stamps Landing with live Celtic music, big screens, and craft draught.',
        address: '37 Stamp\'s Landing, Vancouver, BC V5Z 4L8',
        neighborhood: 'False Creek',
        city: 'Vancouver',
        cuisineType: 'Irish Pub',
        priceRange: 2,
        capacity: 180,
        latitude: 49.2700,
        longitude: -123.1180,
        openingHours: { mon: '11:00-00:00', tue: '11:00-00:00', wed: '11:00-00:00', thu: '11:00-00:00', fri: '11:00-01:00', sat: '10:00-01:00', sun: '10:00-00:00' },
        isVerified: true,
        isFanVenue: false,
        boostTier: 'STANDARD',
        promotions: [
            { title: '$5.50 Draught & $6 Appetizers', description: 'Daily happy hour with discounted draught and bar snacks.', type: 'HAPPY_HOUR', dealType: 'BOTH', daysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri'], startTime: '15:00', endTime: '18:00', source: 'MANUAL' }
        ]
    },
    {
        name: 'Shark Club',
        slug: 'shark-club-vancouver',
        imageUrl: '/venues/sports-bar.png',
        description: 'Upscale sports lounge at the West Georgia entertainment district. VIP booths, 70+ screens, premium cocktails.',
        address: '180 West Georgia St, Vancouver, BC V6B 4P4',
        neighborhood: 'Downtown',
        city: 'Vancouver',
        cuisineType: 'Sports Lounge',
        priceRange: 3,
        capacity: 350,
        latitude: 49.2789,
        longitude: -123.1148,
        openingHours: { mon: '11:00-01:00', tue: '11:00-01:00', wed: '11:00-01:00', thu: '11:00-01:00', fri: '11:00-02:00', sat: '11:00-02:00', sun: '11:00-00:00' },
        isVerified: true,
        isFanVenue: false,
        boostTier: 'STANDARD',
        promotions: [
            { title: '$7 Premium Cocktails', description: 'Daily happy hour with $7 premium cocktails and $5 bar bites.', type: 'HAPPY_HOUR', dealType: 'BOTH', daysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri'], startTime: '15:00', endTime: '18:00', source: 'MANUAL' }
        ]
    },
    {
        name: 'Railway Stage & Beer Cafe',
        slug: 'railway-stage-beer-cafe',
        imageUrl: '/venues/gastropub.png',
        description: 'Historic live music venue since 1931. Now a 40-tap craft beer cafe with daily shows and late-night eats.',
        address: '579 Dunsmuir St, Vancouver, BC V6B 1Y4',
        neighborhood: 'Downtown',
        city: 'Vancouver',
        cuisineType: 'Beer Cafe',
        priceRange: 2,
        capacity: 200,
        latitude: 49.2821,
        longitude: -123.1142,
        openingHours: { mon: '11:30-00:00', tue: '11:30-00:00', wed: '11:30-00:00', thu: '11:30-01:00', fri: '11:30-02:00', sat: '11:30-02:00', sun: '11:30-00:00' },
        isVerified: true,
        isFanVenue: false,
        boostTier: 'STANDARD',
        promotions: [
            { title: '$5 Local Craft Pints', description: 'Happy hour on local BC craft drafts.', type: 'HAPPY_HOUR', dealType: 'DRINKS', daysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri'], startTime: '14:00', endTime: '17:00', source: 'MANUAL' }
        ]
    },
    {
        name: 'Kits Beach Boathouse',
        slug: 'kits-beach-boathouse',
        imageUrl: '/venues/waterfront.png',
        description: 'Beachfront restaurant and bar with panoramic views of English Bay, sunset cocktails, and fresh West Coast cuisine.',
        address: '1305 Arbutus St, Vancouver, BC V6J 5N2',
        neighborhood: 'Kitsilano',
        city: 'Vancouver',
        cuisineType: 'Seafood & Grill',
        priceRange: 3,
        capacity: 150,
        latitude: 49.2743,
        longitude: -123.1520,
        openingHours: { mon: '11:00-22:00', tue: '11:00-22:00', wed: '11:00-22:00', thu: '11:00-22:00', fri: '11:00-23:00', sat: '10:00-23:00', sun: '10:00-22:00' },
        isVerified: true,
        isFanVenue: false,
        boostTier: 'STANDARD',
        promotions: [
            { title: '$8 Sunset Cocktails', description: 'Sunset happy hour with $8 cocktails and $6 local beers on the patio.', type: 'HAPPY_HOUR', dealType: 'DRINKS', daysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri'], startTime: '15:00', endTime: '17:00', source: 'MANUAL' }
        ]
    },
    {
        name: 'Townhall Public House',
        slug: 'townhall-public-house',
        imageUrl: '/venues/gastropub.png',
        description: 'Elevated neighbourhood pub in Main Street Village. Craft taps, wood-fired pizza, and a lively game-day scene.',
        address: '3340 Main St, Vancouver, BC V5V 3M7',
        neighborhood: 'Main Street',
        city: 'Vancouver',
        cuisineType: 'Gastropub',
        priceRange: 2,
        capacity: 120,
        latitude: 49.2564,
        longitude: -123.1009,
        openingHours: { mon: '11:30-00:00', tue: '11:30-00:00', wed: '11:30-00:00', thu: '11:30-00:00', fri: '11:30-01:00', sat: '10:00-01:00', sun: '10:00-00:00' },
        isVerified: true,
        isFanVenue: false,
        boostTier: 'STANDARD',
        promotions: [
            { title: '$5 Pints & $8 Pizzas', description: 'Weekday happy hour — craft pints and personal pizzas.', type: 'HAPPY_HOUR', dealType: 'BOTH', daysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri'], startTime: '15:00', endTime: '18:00', source: 'MANUAL' }
        ]
    },
]
