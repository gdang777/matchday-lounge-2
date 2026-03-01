import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius } from '@/constants/theme';

export default function CityNavigation() {
    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView contentContainerStyle={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>🗺️ CITY <Text style={styles.accent}>NAVIGATION</Text></Text>
                    <Text style={styles.headerSub}>Vancouver, BC</Text>
                </View>

                {/* Quick Links */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>GETTING AROUND</Text>
                    <View style={styles.quickGrid}>
                        <TouchableOpacity style={styles.quickCard}>
                            <Ionicons name="train" size={28} color={Colors.accent} />
                            <Text style={styles.quickLabel}>SkyTrain{'\n'}Guide</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.quickCard}>
                            <Ionicons name="card" size={28} color={Colors.accent} />
                            <Text style={styles.quickLabel}>Compass{'\n'}Card</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.quickCard}>
                            <Ionicons name="airplane" size={28} color={Colors.accent} />
                            <Text style={styles.quickLabel}>Airport to{'\n'}Downtown</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.quickCard}>
                            <Ionicons name="football" size={28} color={Colors.accent} />
                            <Text style={styles.quickLabel}>To BC{'\n'}Place</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Airport Route */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>YVR → DOWNTOWN</Text>
                    <View style={styles.routeCard}>
                        <View style={styles.routeStep}>
                            <View style={styles.stepDot} />
                            <View style={styles.stepContent}>
                                <Text style={styles.stepTitle}>YVR Airport</Text>
                                <Text style={styles.stepDesc}>Take the Canada Line (SkyTrain)</Text>
                            </View>
                        </View>
                        <View style={styles.routeLine} />
                        <View style={styles.routeStep}>
                            <View style={styles.stepDot} />
                            <View style={styles.stepContent}>
                                <Text style={styles.stepTitle}>Waterfront Station</Text>
                                <Text style={styles.stepDesc}>25 min · $4.45 (Compass Card)</Text>
                            </View>
                        </View>
                        <View style={styles.routeLine} />
                        <View style={styles.routeStep}>
                            <View style={[styles.stepDot, { backgroundColor: Colors.accent }]} />
                            <View style={styles.stepContent}>
                                <Text style={styles.stepTitle}>Downtown Vancouver</Text>
                                <Text style={styles.stepDesc}>Walk to hotel or transfer</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.costRow}>
                        <View style={styles.costItem}>
                            <Text style={styles.costLabel}>ESTIMATED COST</Text>
                            <Text style={styles.costValue}>$4.45 CAD</Text>
                        </View>
                        <View style={styles.costItem}>
                            <Text style={styles.costLabel}>TRAVEL TIME</Text>
                            <Text style={styles.costValue}>~25 min</Text>
                        </View>
                    </View>
                </View>

                {/* Stadium Directions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>TO THE STADIUM</Text>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>🏟️ BC Place Stadium</Text>
                        <Text style={styles.cardDesc}>
                            Stadium–Chinatown Station (Expo Line) is directly adjacent to BC Place.
                            From downtown, take any Expo Line train eastbound — 1 stop from Granville Station.
                        </Text>
                        <View style={styles.cardMeta}>
                            <Ionicons name="time-outline" size={14} color={Colors.accent} />
                            <Text style={styles.metaText}>Arrive 90 min before kickoff for entry</Text>
                        </View>
                    </View>
                </View>

                {/* City Switcher */}
                <View style={styles.section}>
                    <TouchableOpacity style={styles.switchCity}>
                        <Ionicons name="swap-horizontal" size={18} color={Colors.accent} />
                        <Text style={styles.switchText}>Switch to Toronto, ON</Text>
                    </TouchableOpacity>
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
    title: {
        fontSize: FontSize.xxl,
        fontWeight: '900',
        color: Colors.text,
        letterSpacing: 2,
    },
    accent: {
        color: Colors.accent,
    },
    headerSub: {
        fontSize: FontSize.sm,
        color: Colors.textSecondary,
        letterSpacing: 2,
        marginTop: Spacing.xs,
    },
    section: {
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.lg,
    },
    sectionTitle: {
        fontSize: FontSize.sm,
        fontWeight: '700',
        color: Colors.textSecondary,
        letterSpacing: 2,
        marginBottom: Spacing.md,
    },
    quickGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.sm,
    },
    quickCard: {
        flex: 1,
        minWidth: '45%',
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        borderColor: Colors.border,
        padding: Spacing.md,
        alignItems: 'center',
        gap: Spacing.sm,
    },
    quickLabel: {
        fontSize: FontSize.sm,
        fontWeight: '600',
        color: Colors.text,
        textAlign: 'center',
        lineHeight: 18,
    },
    routeCard: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        borderColor: Colors.border,
        padding: Spacing.md,
    },
    routeStep: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
    },
    stepDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: Colors.textSecondary,
        borderWidth: 2,
        borderColor: Colors.border,
    },
    stepContent: {
        flex: 1,
    },
    stepTitle: {
        fontSize: FontSize.lg,
        fontWeight: '700',
        color: Colors.text,
    },
    stepDesc: {
        fontSize: FontSize.sm,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    routeLine: {
        width: 2,
        height: 24,
        backgroundColor: Colors.border,
        marginLeft: 5,
        marginVertical: 4,
    },
    costRow: {
        flexDirection: 'row',
        gap: Spacing.md,
        marginTop: Spacing.md,
    },
    costItem: {
        flex: 1,
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        borderColor: Colors.border,
        padding: Spacing.md,
    },
    costLabel: {
        fontSize: FontSize.xs,
        color: Colors.textSecondary,
        letterSpacing: 1,
        marginBottom: Spacing.xs,
    },
    costValue: {
        fontSize: FontSize.xl,
        fontWeight: '800',
        color: Colors.accent,
    },
    card: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        borderColor: Colors.border,
        padding: Spacing.md,
    },
    cardTitle: {
        fontSize: FontSize.lg,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: Spacing.sm,
    },
    cardDesc: {
        fontSize: FontSize.md,
        color: Colors.textSecondary,
        lineHeight: 22,
        marginBottom: Spacing.sm,
    },
    cardMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    metaText: {
        fontSize: FontSize.sm,
        color: Colors.accent,
        fontWeight: '600',
    },
    switchCity: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.sm,
        paddingVertical: Spacing.md,
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        borderColor: Colors.accent,
    },
    switchText: {
        fontSize: FontSize.md,
        fontWeight: '600',
        color: Colors.accent,
    },
});
