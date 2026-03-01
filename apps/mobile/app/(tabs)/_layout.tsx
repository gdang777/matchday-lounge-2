import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: Colors.tabBarBackground,
                    borderTopColor: Colors.tabBarBorder,
                    borderTopWidth: 1,
                    height: 88,
                    paddingBottom: 28,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: Colors.tabBarActive,
                tabBarInactiveTintColor: Colors.tabBarInactive,
                tabBarLabelStyle: {
                    fontFamily: 'System',
                    fontSize: 10,
                    fontWeight: '600',
                    letterSpacing: 0.5,
                    textTransform: 'uppercase',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Match Day',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="football" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="happy-hour"
                options={{
                    title: 'Happy Hour',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="beer" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="navigate"
                options={{
                    title: 'Navigate',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="map" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="emergency"
                options={{
                    title: 'Help',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="medkit" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="concierge"
                options={{
                    title: 'Concierge',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="chatbubbles" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
