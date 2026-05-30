import { Tabs, useRouter } from 'expo-router';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Home, List, BarChart2, User } from 'lucide-react-native';

function PlusButton() {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.plusBtn}
      onPress={() => router.push('/add')}
      activeOpacity={0.85}
    >
      <View style={styles.plusInner}>
        <View style={styles.plusHoriz} />
        <View style={styles.plusVert} />
      </View>
    </TouchableOpacity>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarLabelStyle: styles.tabLabel,
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: ({ color }) => <Home size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'İşlemler',
          tabBarIcon: ({ color }) => <List size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="add-placeholder"
        options={{
          title: '',
          tabBarIcon: () => <PlusButton />,
          tabBarLabel: () => null,
        }}
        listeners={{ tabPress: (e) => { e.preventDefault(); } }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: 'Raporlar',
          tabBarIcon: ({ color }) => <BarChart2 size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => <User size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    height: Platform.OS === 'ios' ? 85 : 65,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    paddingTop: 8,
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  tabLabel: { fontSize: 10, fontWeight: '600', marginTop: 2 },
  plusBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  plusInner: { width: 20, height: 20, alignItems: 'center', justifyContent: 'center' },
  plusHoriz: { position: 'absolute', width: 18, height: 2.5, backgroundColor: '#fff', borderRadius: 2 },
  plusVert:  { position: 'absolute', width: 2.5, height: 18, backgroundColor: '#fff', borderRadius: 2 },
});
