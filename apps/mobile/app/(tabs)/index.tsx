import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize } from '@/constants/theme';

export default function MatchDayHub() {
    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView contentContainerStyle={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.logo}>⚽ MATCHDAY <Text style={styles.accent}>LOUNGE</Text></Text>
                    <Text style={styles.subtitle}>FIFA WORLD CUP 2026</Text>
                </View>

                {/* Live / Upcoming section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="football" size={18} color={Colors.accent} />
                        <Text style={styles.sectionTitle}>TODAY'S MATCHES</Text>
                    </View>

                    {/* Placeholder match cards */}
                    <View style={styles.card}>
                        <View style={styles.matchTeams}>
                            <Text style={styles.teamName}>🇧🇷 Brazil</Text>
                            <Text style={styles.vs}>vs</Text>
                            <Text style={styles.teamName}>Mexico 🇲🇽</Text>
                        </View>
                        <View style={styles.matchMeta}>
                            <Ionicons name="time-outline" size={14} color={Colors.textSecondary} />
                            <Text style={styles.matchTime}>3:00 PM · BC Place, Vancouver</Text>
                        </View>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>SCHEDULED</Text>
                        </View>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.matchTeams}>
                            <Text style={styles.teamName}>🇦🇷 Argentina</Text>
                            <Text style={styles.vs}>vs</Text>
                            <Text style={styles.teamName}>Japan 🇯🇵</Text>
                        </View>
                        <View style={styles.matchMeta}>
                            <Ionicons name="time-outline" size={14} color={Colors.textSecondary} />
                            <Text style={styles.matchTime}>7:00 PM · BMO Field, Toronto</Text>
                        </View>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>SCHEDULED</Text>
                        </View>
                    </View>
                </View>

                {/* Fan Zones */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="people" size={18} color={Colors.accent} />
                        <Text style={styles.sectionTitle}>FAN ZONES NEARBY</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Vancouver Fan Zone</Text>
                        <Text style={styles.cardDescription}>
                            Jack Poole Plaza · Live screenings, food vendors, fan activities
                        </Text>
                        <View style={styles.matchMeta}>
                            <Ionicons name="walk" size={14} color={Colors.accent} />
                            <Text style={[styles.matchTime, { color: Colors.accent }]}>12 min walk</Text>
                        </View>
                    </View>
                </View>

                {/* Watch Nearby */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="tv" size={18} color={Colors.accent} />
                        <Text style={styles.sectionTitle}>WATCH NEARBY</Text>
                    </View>
                    <View style={styles.card}>
                        <View style={styles.venueRow}>
                            <View>
                                <Text style={styles.cardTitle}>The Blarney Stone</Text>
                                <Text style={styles.cardDescription}>Gastown · 6 min walk</Text>
                            </View>
                            <View style={styles.crowdBadge}>
                                <Ionicons name="people" size={12} color={Colors.accent} />
                                <Text style={styles.crowdCount}>47</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.card}>
                        <View style={styles.venueRow}>
                            <View>
                                <Text style={styles.cardTitle}>Guilt & Co</Text>
                                <Text style={styles.cardDescription}>Gastown · 8 min walk</Text>
                            </View>
                            <View style={styles.crowdBadge}>
                                <Ionicons name="people" size={12} color={Colors.accent} />
                                <Text style={styles.crowdCount}>32</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        paddingBottom: Spacing.xxl,
    },
    header: {
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.md,
        paddingBottom: Spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    logo: {
        fontSize: FontSize.xxl,
        fontWeight: '900',
        color: Colors.text,
        letterSpacing: 2,
    },
    accent: {
        color: Colors.accent,
    },
    subtitle: {
        fontSize: FontSize.xs,
        color: Colors.textSecondary,
        letterSpacing: 3,
        marginTop: Spacing.xs,
    },
    section: {
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.lg,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
        marginBottom: Spacing.md,
    },
    sectionTitle: {
        fontSize: FontSize.sm,
        fontWeight: '700',
        color: Colors.text,
        letterSpacing: 2,
    },
    card: {
        backgroundColor: Colors.surface,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.border,
        padding: Spacing.md,
        marginBottom: Spacing.sm,
    },
    matchTeams: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.md,
        marginBottom: Spacing.sm,
    },
    teamName: {
        fontSize: FontSize.lg,
        fontWeight: '700',
        color: Colors.text,
    },
    vs: {
        fontSize: FontSize.sm,
        color: Colors.textSecondary,
        fontWeight: '600',
    },
    matchMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.xs,
        justifyContent: 'center',
    },
    matchTime: {
        fontSize: FontSize.sm,
        color: Colors.textSecondary,
    },
    badge: {
        alignSelf: 'center',
        backgroundColor: 'rgba(0, 197, 102, 0.12)',
        paddingHorizontal: Spacing.sm,
        paddingVertical: Spacing.xs,
        borderRadius: 999,
        marginTop: Spacing.sm,
    },
    badgeText: {
        fontSize: FontSize.xs,
        fontWeight: '700',
        color: Colors.accent,
        letterSpacing: 1,
    },
    cardTitle: {
        fontSize: FontSize.lg,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: Spacing.xs,
    },
    cardDescription: {
        fontSize: FontSize.md,
        color: Colors.textSecondary,
        lineHeight: 20,
        marginBottom: Spacing.sm,
    },
    venueRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    crowdBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: 'rgba(0, 197, 102, 0.12)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
    },
    crowdCount: {
        fontSize: FontSize.md,
        fontWeight: '700',
        color: Colors.accent,
    },
});
