// MatchDay Lounge — Brand Constants (PRD §12)
// Used across all mobile app screens

export const Colors = {
    // Primary palette
    stadiumGreen: '#00C566',
    pitchBlack: '#0A0E14',
    deepNavy: '#0F1923',
    chalkWhite: '#F4F6F0',
    amberAlert: '#F5A623',
    turfGreen: '#009E52',
    warmGrey: '#8A9099',
    dangerRed: '#E84040',

    // Semantic
    background: '#0A0E14',
    surface: '#0F1923',
    border: '#1A2433',
    accent: '#00C566',
    accentHover: '#009E52',
    pro: '#F5A623',
    text: '#F4F6F0',
    textSecondary: '#8A9099',
    error: '#E84040',

    // Tab bar
    tabBarBackground: '#0A0E14',
    tabBarBorder: '#1A2433',
    tabBarActive: '#00C566',
    tabBarInactive: '#8A9099',
} as const;

export const Spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
} as const;

export const FontSize = {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
    xxl: 28,
    display: 36,
} as const;

export const BorderRadius = {
    sm: 8,
    md: 12,
    lg: 16,
    full: 999,
} as const;
