// City Navigation — Static content for Vancouver & Toronto
// In production this comes from Firestore `cityContent` collection.
// Updated via App Admin Panel.

export interface TransitStep {
    step: number
    instruction: string
    detail: string
    icon: string
}

export interface TransitCard {
    title: string
    description: string
    icon: string
    tip?: string
}

export interface RouteGuide {
    title: string
    subtitle: string
    icon: string
    estimatedTime: string
    estimatedCost: string
    steps: TransitStep[]
}

export interface TransitHub {
    name: string
    type: 'station' | 'stadium' | 'airport' | 'hotel-zone' | 'fan-zone'
    lat: number
    lng: number
    description: string
}

export interface CityNavData {
    city: string
    province: string
    stadium: string
    transitSystem: string
    fareCard: string
    transitCards: TransitCard[]
    airportRoute: RouteGuide
    stadiumRoute: RouteGuide
    transitHubs: TransitHub[]
    mapCenter: { lat: number; lng: number }
    matchDayTips: string[]
}

// ── Vancouver ────────────────────────────────────────────────────────

export const VANCOUVER_NAV: CityNavData = {
    city: 'Vancouver',
    province: 'BC',
    stadium: 'BC Place Stadium',
    transitSystem: 'SkyTrain',
    fareCard: 'Compass Card',
    transitCards: [
        {
            title: 'SkyTrain',
            description: 'Vancouver\'s rapid transit system. Three lines — Expo, Millennium, and Canada Line — connect the airport, downtown, and suburbs. Runs 5 AM to 1 AM daily.',
            icon: '🚇',
            tip: 'The Canada Line runs directly from YVR Airport to downtown in 25 minutes.'
        },
        {
            title: 'Compass Card',
            description: 'Reloadable transit card for SkyTrain, buses, and SeaBus. Buy at any SkyTrain station vending machine. Tap on, tap off — fares are zone-based.',
            icon: '💳',
            tip: 'Day passes are $11.25 — worth it if you take 3+ trips.'
        },
        {
            title: 'SeaBus',
            description: 'Passenger ferry between downtown Waterfront Station and North Vancouver (Lonsdale Quay). Runs every 15 minutes. Use your Compass Card.',
            icon: '⛴️',
        },
        {
            title: 'Ride-hail & Taxis',
            description: 'Uber, Lyft, and local taxis available everywhere. Airport to downtown ~$35–45 by taxi, $25–35 by ride-hail.',
            icon: '🚕',
        },
    ],
    airportRoute: {
        title: 'YVR Airport → Downtown Vancouver',
        subtitle: 'The fastest and cheapest route from the airport to your hotel',
        icon: '✈️',
        estimatedTime: '25–30 min',
        estimatedCost: '$4.45 – $10.50',
        steps: [
            { step: 1, instruction: 'Follow signs to Canada Line', detail: 'After customs, follow "SkyTrain / Canada Line" signs. The station is inside the airport (Domestic terminal level 4, International terminal level 3).', icon: '🚶' },
            { step: 2, instruction: 'Buy a Compass Card', detail: 'Use the vending machines at the station. Buy a reloadable Compass Card ($6 deposit) or single-use ticket. Load at least $10.', icon: '💳' },
            { step: 3, instruction: 'Board Canada Line to Waterfront', detail: 'Take the northbound Canada Line. It goes to Waterfront Station (final stop) via downtown stations: Yaletown, Vancouver City Centre, Granville, and Waterfront.', icon: '🚇' },
            { step: 4, instruction: 'Exit at your downtown station', detail: 'Vancouver City Centre for most hotels on W Georgia/Robson. Yaletown-Roundhouse for Yaletown hotels. Waterfront for Gastown area.', icon: '📍' },
            { step: 5, instruction: 'Walk to your hotel', detail: 'Most downtown hotels are within 5–10 min walk of a Canada Line station. Follow Google Maps for the last leg.', icon: '🏨' },
        ],
    },
    stadiumRoute: {
        title: 'Downtown → BC Place Stadium',
        subtitle: 'Getting to the stadium on match day',
        icon: '🏟️',
        estimatedTime: '5–15 min',
        estimatedCost: 'Free – $3.15',
        steps: [
            { step: 1, instruction: 'Walk from most downtown hotels', detail: 'BC Place is at 777 Pacific Blvd. It\'s within walking distance of Yaletown, Gastown, and the downtown core. Most hotels are 10–15 min on foot.', icon: '🚶' },
            { step: 2, instruction: 'Take SkyTrain to Stadium-Chinatown', detail: 'Stadium-Chinatown station (Expo/Millennium Line) is directly connected to BC Place via an enclosed walkway. Ride from any SkyTrain station.', icon: '🚇' },
            { step: 3, instruction: 'Follow the crowds', detail: 'On match days, the area around BC Place fills with fans. Follow the stream from any nearby station. Look for the giant white dome.', icon: '⚽' },
            { step: 4, instruction: 'Arrive early', detail: 'Gates open 2 hours before kickoff. Stadium-Chinatown station gets packed 1 hour before — arrive early or walk instead.', icon: '⏰' },
        ],
    },
    transitHubs: [
        { name: 'YVR Airport', type: 'airport', lat: 49.1947, lng: -123.1815, description: 'Vancouver International Airport — Canada Line terminal' },
        { name: 'Waterfront Station', type: 'station', lat: 49.2858, lng: -123.1118, description: 'Main transit hub — Expo, Canada, and SeaBus' },
        { name: 'BC Place Stadium', type: 'stadium', lat: 49.2768, lng: -123.1117, description: 'FIFA World Cup 2026 venue — 54,500 capacity' },
        { name: 'Stadium-Chinatown Station', type: 'station', lat: 49.2796, lng: -123.1003, description: 'Closest SkyTrain station to BC Place' },
        { name: 'Vancouver City Centre Station', type: 'station', lat: 49.2832, lng: -123.1186, description: 'Central downtown — nearest to major hotel zone' },
        { name: 'Official FIFA Fan Zone', type: 'fan-zone', lat: 49.2810, lng: -123.1150, description: 'Terry Fox Plaza — live screens, music, food' },
        { name: 'Downtown Hotel Zone', type: 'hotel-zone', lat: 49.2845, lng: -123.1210, description: 'W Georgia / Robson corridor — 50+ hotels' },
        { name: 'Yaletown-Roundhouse Station', type: 'station', lat: 49.2740, lng: -123.1218, description: 'Yaletown — 10 min walk to BC Place' },
    ],
    mapCenter: { lat: 49.2768, lng: -123.1117 },
    matchDayTips: [
        '🎫 Stadium-Chinatown station gets extremely crowded 1 hour before kickoff — walk from downtown if possible.',
        '🚇 SkyTrain runs extended hours on match nights until the stadium clears.',
        '🚕 Ride-hails are very difficult to book near BC Place after matches — use SkyTrain or walk to Yaletown to find a ride.',
        '🍻 Pre-game at Gastown or Yaletown pubs — both are 10–15 min walk to BC Place.',
        '📱 Download the TransLink app for real-time SkyTrain arrivals.',
    ],
}

// ── Toronto ──────────────────────────────────────────────────────────

export const TORONTO_NAV: CityNavData = {
    city: 'Toronto',
    province: 'ON',
    stadium: 'BMO Field',
    transitSystem: 'TTC Subway',
    fareCard: 'PRESTO Card',
    transitCards: [
        {
            title: 'TTC Subway',
            description: 'Toronto\'s subway has 4 lines connecting the city. Line 1 (Yonge-University) is the most useful for visitors. Runs 6 AM to 1:30 AM daily.',
            icon: '🚇',
            tip: 'Line 1 connects most downtown hotels to Union Station (the main transit hub).'
        },
        {
            title: 'PRESTO Card',
            description: 'Reloadable fare card for TTC, GO Transit, and UP Express. Buy at Shoppers Drug Mart or TTC stations. Single fare is $3.35, transfers are free for 2 hours.',
            icon: '💳',
            tip: 'You can also tap a contactless credit/debit card on TTC — PRESTO not required.'
        },
        {
            title: 'UP Express',
            description: 'Dedicated airport train from Pearson to Union Station. Every 15 minutes, takes 25 minutes. One-way $12.35 with PRESTO.',
            icon: '🚆',
        },
        {
            title: 'Streetcars',
            description: 'Toronto\'s iconic streetcars run along major downtown streets. Line 509/510 goes to BMO Field via Exhibition. Use your PRESTO card.',
            icon: '🚊',
        },
    ],
    airportRoute: {
        title: 'Pearson Airport → Downtown Toronto',
        subtitle: 'The fastest route from the airport to Union Station',
        icon: '✈️',
        estimatedTime: '25 min',
        estimatedCost: '$12.35',
        steps: [
            { step: 1, instruction: 'Follow signs to UP Express', detail: 'After customs, follow "UP Express" signs. The station is in Terminal 1 (connected to Terminal 3 by train).', icon: '🚶' },
            { step: 2, instruction: 'Buy a PRESTO card or tap credit card', detail: 'PRESTO machines are at the UP Express platform. Or simply tap a contactless Visa/Mastercard on the reader.', icon: '💳' },
            { step: 3, instruction: 'Board UP Express to Union Station', detail: 'Trains depart every 15 minutes. Non-stop service to Union Station in 25 minutes. Free WiFi on board.', icon: '🚆' },
            { step: 4, instruction: 'Arrive at Union Station', detail: 'Union Station is Toronto\'s central hub. Connect to TTC subway, streetcars, or walk to downtown hotels.', icon: '📍' },
            { step: 5, instruction: 'Walk or take TTC to your hotel', detail: 'Most downtown hotels are within 10–15 min walk of Union Station. Or take Line 1 subway to your nearest station.', icon: '🏨' },
        ],
    },
    stadiumRoute: {
        title: 'Downtown → BMO Field',
        subtitle: 'Getting to the stadium on match day',
        icon: '🏟️',
        estimatedTime: '20–30 min',
        estimatedCost: '$3.35',
        steps: [
            { step: 1, instruction: 'Take the 509 Harbourfront Streetcar', detail: 'From Union Station, take the 509 streetcar westbound to Exhibition. The stop is directly at BMO Field.', icon: '🚊' },
            { step: 2, instruction: 'Or take the GO Train', detail: 'GO Transit runs special match-day trains from Union Station to Exhibition station. Check GO Transit schedule.', icon: '🚆' },
            { step: 3, instruction: 'Walk from downtown', detail: 'BMO Field is at Exhibition Place (170 Princes\' Blvd). It\'s about 35 min walk from Union Station along the waterfront.', icon: '🚶' },
            { step: 4, instruction: 'Arrive early', detail: 'Gates open 2 hours before kickoff. The Exhibition grounds fill up quickly — arrive early to soak in the atmosphere.', icon: '⏰' },
        ],
    },
    transitHubs: [
        { name: 'Pearson Airport (YYZ)', type: 'airport', lat: 43.6777, lng: -79.6248, description: 'Toronto Pearson International Airport — UP Express terminal' },
        { name: 'Union Station', type: 'station', lat: 43.6453, lng: -79.3806, description: 'Main transit hub — TTC, GO, UP Express, VIA Rail' },
        { name: 'BMO Field', type: 'stadium', lat: 43.6332, lng: -79.4186, description: 'FIFA World Cup 2026 venue — 30,000 capacity' },
        { name: 'Exhibition GO Station', type: 'station', lat: 43.6365, lng: -79.4165, description: 'Closest station to BMO Field — GO and 509 streetcar' },
        { name: 'King Station', type: 'station', lat: 43.6490, lng: -79.3775, description: 'Line 1 — central downtown, Entertainment District' },
        { name: 'Official FIFA Fan Zone', type: 'fan-zone', lat: 43.6400, lng: -79.4100, description: 'Exhibition Place — live screens, music, food' },
        { name: 'Downtown Hotel Zone', type: 'hotel-zone', lat: 43.6500, lng: -79.3840, description: 'Front St / King St corridor — major hotels' },
        { name: 'St Andrew Station', type: 'station', lat: 43.6476, lng: -79.3847, description: 'Line 1 — close to hotels on University Ave' },
    ],
    mapCenter: { lat: 43.6453, lng: -79.3806 },
    matchDayTips: [
        '🎫 Take the 509 streetcar early — it runs along the waterfront and gets packed before matches.',
        '🚆 GO Transit runs special match-day Express trains from Union Station to Exhibition.',
        '🚕 Post-match ride-hails surge hard near Exhibition — walk east to King & Bathurst for easier pickups.',
        '🍻 Pre-game on King West or the entertainment district — plenty of sports bars within 20 min of BMO Field.',
        '📱 Download the TTC app (Rocketman) for real-time subway and streetcar arrivals.',
    ],
}

export function getCityNavData(city: 'Vancouver' | 'Toronto'): CityNavData {
    return city === 'Vancouver' ? VANCOUVER_NAV : TORONTO_NAV
}
