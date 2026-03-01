import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius } from '@/constants/theme';

export default function EmergencyHelp() {
    const call911 = () => {
        Linking.openURL('tel:911');
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView contentContainerStyle={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>🆘 EMERGENCY <Text style={styles.accent}>HELP</Text></Text>
                    <Text style={styles.headerSub}>Vancouver, BC</Text>
                </View>

                {/* 911 Button */}
                <View style={styles.section}>
                    <TouchableOpacity style={styles.emergencyButton} onPress={call911}>
                        <Ionicons name="call" size={24} color="#fff" />
                        <Text style={styles.emergencyText}>Call 911 — Emergency</Text>
                    </TouchableOpacity>
                    <Text style={styles.emergencyNote}>
                        For life-threatening emergencies, fires, or crimes in progress
                    </Text>
                </View>

                {/* Quick Access */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>QUICK ACCESS</Text>

                    <TouchableOpacity style={styles.serviceCard}>
                        <View style={styles.serviceIcon}>
                            <Ionicons name="medical" size={22} color={Colors.accent} />
                        </View>
                        <View style={styles.serviceInfo}>
                            <Text style={styles.serviceName}>24-Hour Pharmacies</Text>
                            <Text style={styles.serviceDesc}>Shoppers Drug Mart, London Drugs — open now</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.serviceCard}>
                        <View style={styles.serviceIcon}>
                            <Ionicons name="medkit" size={22} color={Colors.accent} />
                        </View>
                        <View style={styles.serviceInfo}>
                            <Text style={styles.serviceName}>Walk-In Clinics</Text>
                            <Text style={styles.serviceDesc}>Urgent care centres near you</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.serviceCard}>
                        <View style={styles.serviceIcon}>
                            <Ionicons name="restaurant" size={22} color={Colors.accent} />
                        </View>
                        <View style={styles.serviceInfo}>
                            <Text style={styles.serviceName}>Late-Night Food</Text>
                            <Text style={styles.serviceDesc}>Open past midnight near you</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.serviceCard}>
                        <View style={styles.serviceIcon}>
                            <Ionicons name="flag" size={22} color={Colors.accent} />
                        </View>
                        <View style={styles.serviceInfo}>
                            <Text style={styles.serviceName}>Embassies & Consulates</Text>
                            <Text style={styles.serviceDesc}>Searchable by country</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.serviceCard}>
                        <View style={styles.serviceIcon}>
                            <Ionicons name="shield" size={22} color={Colors.accent} />
                        </View>
                        <View style={styles.serviceInfo}>
                            <Text style={styles.serviceName}>Non-Emergency Police</Text>
                            <Text style={styles.serviceDesc}>Lost property, general inquiries</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
                    </TouchableOpacity>
                </View>

                {/* Important Numbers */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>IMPORTANT NUMBERS</Text>
                    <View style={styles.numberCard}>
                        <View style={styles.numberRow}>
                            <Text style={styles.numberLabel}>Non-Emergency Police</Text>
                            <TouchableOpacity onPress={() => Linking.openURL('tel:6047175611')}>
                                <Text style={styles.numberValue}>604-717-5611</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.numberRow}>
                            <Text style={styles.numberLabel}>BC Poison Control</Text>
                            <TouchableOpacity onPress={() => Linking.openURL('tel:18005675111')}>
                                <Text style={styles.numberValue}>1-800-567-5111</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.numberRow}>
                            <Text style={styles.numberLabel}>HealthLink BC</Text>
                            <TouchableOpacity onPress={() => Linking.openURL('tel:811')}>
                                <Text style={styles.numberValue}>8-1-1</Text>
                            </TouchableOpacity>
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
    emergencyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.md,
        backgroundColor: Colors.dangerRed,
        paddingVertical: Spacing.lg,
        borderRadius: BorderRadius.md,
    },
    emergencyText: {
        fontSize: FontSize.xl,
        fontWeight: '800',
        color: '#fff',
    },
    emergencyNote: {
        fontSize: FontSize.sm,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginTop: Spacing.sm,
    },
    serviceCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        borderColor: Colors.border,
        padding: Spacing.md,
        marginBottom: Spacing.sm,
        gap: Spacing.md,
    },
    serviceIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0, 197, 102, 0.12)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    serviceInfo: {
        flex: 1,
    },
    serviceName: {
        fontSize: FontSize.lg,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 2,
    },
    serviceDesc: {
        fontSize: FontSize.sm,
        color: Colors.textSecondary,
    },
    numberCard: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        borderColor: Colors.border,
        padding: Spacing.md,
    },
    numberRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Spacing.sm,
    },
    numberLabel: {
        fontSize: FontSize.md,
        color: Colors.text,
    },
    numberValue: {
        fontSize: FontSize.md,
        fontWeight: '700',
        color: Colors.accent,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
    },
});
