import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius } from '@/constants/theme';

export default function Concierge() {
    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>⚡ AI <Text style={styles.accent}>CONCIERGE</Text></Text>
                <View style={styles.proBadge}>
                    <Ionicons name="lock-closed" size={12} color={Colors.pro} />
                    <Text style={styles.proBadgeText}>PRO FEATURE</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Welcome message */}
                <View style={styles.welcomeCard}>
                    <View style={styles.aiAvatar}>
                        <Text style={styles.aiAvatarText}>⚡</Text>
                    </View>
                    <Text style={styles.welcomeTitle}>
                        Hey! I'm your MatchDay Concierge.
                    </Text>
                    <Text style={styles.welcomeDesc}>
                        Ask me anything about the World Cup, the city, where to eat, what to do,
                        or how to get around. I'll give you real, specific answers — not a list of search results.
                    </Text>
                </View>

                {/* Example questions */}
                <Text style={styles.exampleLabel}>TRY ASKING</Text>

                <TouchableOpacity style={styles.exampleCard}>
                    <Ionicons name="beer" size={20} color={Colors.accent} />
                    <Text style={styles.exampleText}>
                        Find me a bar showing the Brazil game near my hotel with happy hour right now
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.exampleCard}>
                    <Ionicons name="time" size={20} color={Colors.accent} />
                    <Text style={styles.exampleText}>
                        I have 4 hours before the Argentina match, what should I do?
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.exampleCard}>
                    <Ionicons name="train" size={20} color={Colors.accent} />
                    <Text style={styles.exampleText}>
                        Cheapest way from YVR to BC Place before 6pm?
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.exampleCard}>
                    <Ionicons name="people" size={20} color={Colors.accent} />
                    <Text style={styles.exampleText}>
                        Where can I watch the Portugal game with other Portuguese fans?
                    </Text>
                </TouchableOpacity>

                {/* Pro Upsell */}
                <View style={styles.upsellCard}>
                    <Text style={styles.upsellTitle}>Unlock AI Concierge</Text>
                    <Text style={styles.upsellDesc}>
                        Get unlimited AI-powered city advice, personalized itineraries,
                        and smart deal alerts — all for the tournament.
                    </Text>
                    <View style={styles.upsellPricing}>
                        <View style={styles.priceOption}>
                            <Text style={styles.priceAmount}>$7.99</Text>
                            <Text style={styles.pricePeriod}>CAD / month</Text>
                        </View>
                        <Text style={styles.priceOr}>or</Text>
                        <View style={styles.priceOption}>
                            <Text style={styles.priceAmount}>$14.99</Text>
                            <Text style={styles.pricePeriod}>Tournament Pass</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.upsellButton}>
                        <Text style={styles.upsellButtonText}>Upgrade to Pro</Text>
                    </TouchableOpacity>
                    <View style={styles.stripeRow}>
                        <Ionicons name="lock-closed" size={12} color={Colors.textSecondary} />
                        <Text style={styles.stripeText}>Secured by Stripe</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Input bar */}
            <View style={styles.inputBar}>
                <TextInput
                    style={styles.input}
                    placeholder="Ask the Concierge anything..."
                    placeholderTextColor={Colors.textSecondary}
                    editable={false}
                />
                <TouchableOpacity style={styles.sendButton}>
                    <Ionicons name="send" size={20} color={Colors.background} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    },
    accent: {
        color: Colors.accent,
    },
    proBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: 'rgba(245, 166, 35, 0.12)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: BorderRadius.full,
    },
    proBadgeText: {
        fontSize: FontSize.xs,
        fontWeight: '700',
        color: Colors.pro,
        letterSpacing: 1,
    },
    content: {
        padding: Spacing.lg,
        paddingBottom: 100,
    },
    welcomeCard: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.border,
        padding: Spacing.lg,
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    aiAvatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'rgba(0, 197, 102, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.md,
    },
    aiAvatarText: {
        fontSize: 28,
    },
    welcomeTitle: {
        fontSize: FontSize.xl,
        fontWeight: '700',
        color: Colors.text,
        textAlign: 'center',
        marginBottom: Spacing.sm,
    },
    welcomeDesc: {
        fontSize: FontSize.md,
        color: Colors.textSecondary,
        lineHeight: 22,
        textAlign: 'center',
    },
    exampleLabel: {
        fontSize: FontSize.xs,
        fontWeight: '700',
        color: Colors.textSecondary,
        letterSpacing: 2,
        marginBottom: Spacing.md,
    },
    exampleCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: Spacing.md,
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        borderColor: Colors.border,
        padding: Spacing.md,
        marginBottom: Spacing.sm,
    },
    exampleText: {
        flex: 1,
        fontSize: FontSize.md,
        color: Colors.text,
        lineHeight: 22,
    },
    upsellCard: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: 'rgba(245, 166, 35, 0.3)',
        padding: Spacing.lg,
        marginTop: Spacing.lg,
        alignItems: 'center',
    },
    upsellTitle: {
        fontSize: FontSize.xl,
        fontWeight: '800',
        color: Colors.pro,
        marginBottom: Spacing.sm,
    },
    upsellDesc: {
        fontSize: FontSize.md,
        color: Colors.textSecondary,
        lineHeight: 22,
        textAlign: 'center',
        marginBottom: Spacing.lg,
    },
    upsellPricing: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
        marginBottom: Spacing.lg,
    },
    priceOption: {
        alignItems: 'center',
    },
    priceAmount: {
        fontSize: FontSize.xxl,
        fontWeight: '900',
        color: Colors.text,
    },
    pricePeriod: {
        fontSize: FontSize.xs,
        color: Colors.textSecondary,
        letterSpacing: 1,
        marginTop: 2,
    },
    priceOr: {
        fontSize: FontSize.md,
        color: Colors.textSecondary,
    },
    upsellButton: {
        backgroundColor: Colors.pro,
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.sm,
        width: '100%',
        alignItems: 'center',
    },
    upsellButtonText: {
        fontSize: FontSize.lg,
        fontWeight: '700',
        color: Colors.background,
    },
    stripeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: Spacing.sm,
    },
    stripeText: {
        fontSize: FontSize.xs,
        color: Colors.textSecondary,
    },
    inputBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
        padding: Spacing.md,
        paddingBottom: Spacing.xl,
        backgroundColor: Colors.background,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    input: {
        flex: 1,
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        borderColor: Colors.border,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        color: Colors.text,
        fontSize: FontSize.md,
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.accent,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
