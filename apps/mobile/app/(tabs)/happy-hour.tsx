import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius } from '@/constants/theme';

export default function HappyHourFinder() {
    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>🍻 HAPPY HOUR <Text style={styles.accent}>FINDER</Text></Text>
                <View style={styles.toggleRow}>
                    <TouchableOpacity style={[styles.toggle, styles.toggleActive]}>
                        <Ionicons name="list" size={16} color={Colors.background} />
                        <Text style={[styles.toggleText, styles.toggleTextActive]}>LIST</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toggle}>
                        <Ionicons name="map" size={16} color={Colors.textSecondary} />
                        <Text style={styles.toggleText}>MAP</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Filters */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
                <TouchableOpacity style={[styles.filterChip, styles.filterActive]}>
                    <Text style={[styles.filterText, styles.filterTextActive]}>Open Now</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterChip}>
                    <Text style={styles.filterText}>Drinks</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterChip}>
                    <Text style={styles.filterText}>Food</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterChip}>
                    <Text style={styles.filterText}>Gastown</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterChip}>
                    <Text style={styles.filterText}>Yaletown</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterChip}>
                    <Text style={styles.filterText}>Kitsilano</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Deal Cards */}
            <ScrollView contentContainerStyle={styles.dealList}>
                <View style={styles.dealCard}>
                    <View style={styles.dealBadge}>
                        <Text style={styles.dealBadgeText}>⭐ FEATURED</Text>
                    </View>
                    <Text style={styles.venueName}>El Camino</Text>
                    <Text style={styles.neighborhood}>Gastown · 4 min walk</Text>
                    <Text style={styles.dealTitle}>$5 Cervezas & $7 Margaritas</Text>
                    <View style={styles.dealMeta}>
                        <View style={styles.metaItem}>
                            <Ionicons name="time-outline" size={14} color={Colors.accent} />
                            <Text style={styles.metaText}>3:00 – 6:00 PM</Text>
                        </View>
                        <View style={styles.metaItem}>
                            <Ionicons name="calendar-outline" size={14} color={Colors.accent} />
                            <Text style={styles.metaText}>Mon – Fri</Text>
                        </View>
                    </View>
                    <View style={styles.dealType}>
                        <Text style={styles.dealTypeText}>🍺 DRINKS</Text>
                    </View>
                </View>

                <View style={styles.dealCard}>
                    <Text style={styles.venueName}>The Blarney Stone</Text>
                    <Text style={styles.neighborhood}>Gastown · 6 min walk</Text>
                    <Text style={styles.dealTitle}>Half-Price Pints & Wings</Text>
                    <View style={styles.dealMeta}>
                        <View style={styles.metaItem}>
                            <Ionicons name="time-outline" size={14} color={Colors.accent} />
                            <Text style={styles.metaText}>2:00 – 5:00 PM</Text>
                        </View>
                        <View style={styles.metaItem}>
                            <Ionicons name="calendar-outline" size={14} color={Colors.accent} />
                            <Text style={styles.metaText}>Every day</Text>
                        </View>
                    </View>
                    <View style={styles.dealType}>
                        <Text style={styles.dealTypeText}>🍽️ BOTH</Text>
                    </View>
                </View>

                <View style={styles.dealCard}>
                    <Text style={styles.venueName}>Guilt & Co</Text>
                    <Text style={styles.neighborhood}>Gastown · 8 min walk</Text>
                    <Text style={styles.dealTitle}>$4 Cocktails Before 5 PM</Text>
                    <View style={styles.dealMeta}>
                        <View style={styles.metaItem}>
                            <Ionicons name="time-outline" size={14} color={Colors.accent} />
                            <Text style={styles.metaText}>3:00 – 5:00 PM</Text>
                        </View>
                        <View style={styles.metaItem}>
                            <Ionicons name="calendar-outline" size={14} color={Colors.accent} />
                            <Text style={styles.metaText}>Tue – Sat</Text>
                        </View>
                    </View>
                    <View style={styles.dealType}>
                        <Text style={styles.dealTypeText}>🍺 DRINKS</Text>
                    </View>
                </View>

                <View style={styles.dealCard}>
                    <View style={styles.dealBadgePremium}>
                        <Text style={styles.dealBadgePremiumText}>🏆 OFFICIAL FAN VENUE</Text>
                    </View>
                    <Text style={styles.venueName}>Score on Davie</Text>
                    <Text style={styles.neighborhood}>West End · 10 min walk</Text>
                    <Text style={styles.dealTitle}>$6 Match Day Pints + $10 Nachos</Text>
                    <View style={styles.dealMeta}>
                        <View style={styles.metaItem}>
                            <Ionicons name="time-outline" size={14} color={Colors.accent} />
                            <Text style={styles.metaText}>11:00 AM – 4:00 PM</Text>
                        </View>
                        <View style={styles.metaItem}>
                            <Ionicons name="calendar-outline" size={14} color={Colors.accent} />
                            <Text style={styles.metaText}>Match Days</Text>
                        </View>
                    </View>
                    <View style={styles.dealType}>
                        <Text style={styles.dealTypeText}>🍽️ BOTH</Text>
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
    header: {
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.md,
        paddingBottom: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    title: {
        fontSize: FontSize.xxl,
        fontWeight: '900',
        color: Colors.text,
        letterSpacing: 2,
        marginBottom: Spacing.md,
    },
    accent: {
        color: Colors.accent,
    },
    toggleRow: {
        flexDirection: 'row',
        gap: Spacing.sm,
    },
    toggle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.sm,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    toggleActive: {
        backgroundColor: Colors.accent,
        borderColor: Colors.accent,
    },
    toggleText: {
        fontSize: FontSize.xs,
        fontWeight: '700',
        color: Colors.textSecondary,
        letterSpacing: 1,
    },
    toggleTextActive: {
        color: Colors.background,
    },
    filters: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    filterChip: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.full,
        borderWidth: 1,
        borderColor: Colors.border,
        marginRight: Spacing.sm,
    },
    filterActive: {
        backgroundColor: 'rgba(0, 197, 102, 0.12)',
        borderColor: Colors.accent,
    },
    filterText: {
        fontSize: FontSize.sm,
        fontWeight: '600',
        color: Colors.textSecondary,
    },
    filterTextActive: {
        color: Colors.accent,
    },
    dealList: {
        padding: Spacing.lg,
        paddingBottom: Spacing.xxl,
    },
    dealCard: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        borderColor: Colors.border,
        padding: Spacing.md,
        marginBottom: Spacing.md,
    },
    dealBadge: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(0, 197, 102, 0.12)',
        paddingHorizontal: Spacing.sm,
        paddingVertical: 3,
        borderRadius: BorderRadius.full,
        marginBottom: Spacing.sm,
    },
    dealBadgeText: {
        fontSize: FontSize.xs,
        fontWeight: '700',
        color: Colors.accent,
        letterSpacing: 1,
    },
    dealBadgePremium: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(245, 166, 35, 0.12)',
        paddingHorizontal: Spacing.sm,
        paddingVertical: 3,
        borderRadius: BorderRadius.full,
        marginBottom: Spacing.sm,
    },
    dealBadgePremiumText: {
        fontSize: FontSize.xs,
        fontWeight: '700',
        color: Colors.pro,
        letterSpacing: 1,
    },
    venueName: {
        fontSize: FontSize.xl,
        fontWeight: '800',
        color: Colors.text,
        marginBottom: 2,
    },
    neighborhood: {
        fontSize: FontSize.sm,
        color: Colors.textSecondary,
        marginBottom: Spacing.sm,
    },
    dealTitle: {
        fontSize: FontSize.lg,
        fontWeight: '600',
        color: Colors.accent,
        marginBottom: Spacing.sm,
    },
    dealMeta: {
        flexDirection: 'row',
        gap: Spacing.lg,
        marginBottom: Spacing.sm,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metaText: {
        fontSize: FontSize.sm,
        color: Colors.textSecondary,
    },
    dealType: {
        alignSelf: 'flex-start',
        backgroundColor: Colors.background,
        paddingHorizontal: Spacing.sm,
        paddingVertical: 3,
        borderRadius: BorderRadius.full,
    },
    dealTypeText: {
        fontSize: FontSize.xs,
        fontWeight: '600',
        color: Colors.textSecondary,
        letterSpacing: 1,
    },
});
