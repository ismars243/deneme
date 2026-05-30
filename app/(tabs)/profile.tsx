import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogOut, Bell, Shield, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/contexts/AuthContext';
import { useData } from '../../src/contexts/DataContext';
import { Avatar } from '../../src/components/ui/Avatar';
import { Card } from '../../src/components/ui/Card';
import { formatCurrency } from '../../src/lib/utils';

export default function Profile() {
  const { user, logout } = useAuth();
  const { transactions, getMonthStats } = useData();
  const router = useRouter();
  const stats = getMonthStats();

  async function handleLogout() {
    Alert.alert('Çıkış Yap', 'Çıkış yapmak istiyor musunuz?', [
      { text: 'İptal', style: 'cancel' },
      { text: 'Çıkış Yap', style: 'destructive', onPress: async () => { await logout(); } },
    ]);
  }

  const menuItems = [
    { icon: Bell,   label: 'Bildirimler',        onPress: () => Alert.alert('Yakında!') },
    { icon: Shield, label: 'Gizlilik & Güvenlik', onPress: () => Alert.alert('Yakında!') },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profil</Text>
        </View>

        {/* User card */}
        <View style={styles.px}>
          <Card style={styles.userCard}>
            <View style={styles.userRow}>
              <Avatar name={user?.name ?? 'U'} size={56} />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user?.name}</Text>
                <Text style={styles.userEmail}>{user?.email}</Text>
              </View>
            </View>
            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Gelir</Text>
                <Text style={[styles.statValue, { color: '#10b981' }]}>{formatCurrency(stats.income)}</Text>
              </View>
              <View style={styles.statDiv} />
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Gider</Text>
                <Text style={[styles.statValue, { color: '#ef4444' }]}>{formatCurrency(stats.expense)}</Text>
              </View>
              <View style={styles.statDiv} />
              <View style={styles.stat}>
                <Text style={styles.statLabel}>İşlem</Text>
                <Text style={styles.statValue}>{transactions.length}</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Menu */}
        <View style={styles.px}>
          <Card padding={0} style={styles.menuCard}>
            {menuItems.map((item, i) => (
              <TouchableOpacity key={item.label} onPress={item.onPress} activeOpacity={0.7}
                style={[styles.menuItem, i > 0 && styles.menuBorder]}>
                <View style={styles.menuIcon}>
                  <item.icon size={18} color="#64748b" />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <ChevronRight size={16} color="#94a3b8" />
              </TouchableOpacity>
            ))}
          </Card>
        </View>

        {/* Logout */}
        <View style={styles.px}>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.85}>
            <LogOut size={18} color="#ef4444" />
            <Text style={styles.logoutText}>Çıkış Yap</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:       { flex: 1, backgroundColor: '#f8fafc' },
  header:     { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  headerTitle:{ fontSize: 24, fontWeight: '800', color: '#0f172a' },
  px:         { paddingHorizontal: 16, marginBottom: 16 },
  userCard:   {},
  userRow:    { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 20 },
  userInfo:   { flex: 1 },
  userName:   { fontSize: 17, fontWeight: '700', color: '#0f172a' },
  userEmail:  { fontSize: 13, color: '#64748b', marginTop: 2 },
  statsRow:   { flexDirection: 'row', paddingTop: 16, borderTopWidth: 1, borderTopColor: '#f1f5f9' },
  stat:       { flex: 1, alignItems: 'center' },
  statLabel:  { fontSize: 11, color: '#94a3b8', marginBottom: 4 },
  statValue:  { fontSize: 14, fontWeight: '700', color: '#0f172a' },
  statDiv:    { width: 1, backgroundColor: '#f1f5f9' },
  menuCard:   { overflow: 'hidden' },
  menuItem:   { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  menuBorder: { borderTopWidth: 1, borderTopColor: '#f1f5f9' },
  menuIcon:   { width: 36, height: 36, borderRadius: 10, backgroundColor: '#f8fafc', alignItems: 'center', justifyContent: 'center' },
  menuLabel:  { flex: 1, fontSize: 14, fontWeight: '600', color: '#334155' },
  logoutBtn:  { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#fff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#fecaca' },
  logoutText: { fontSize: 14, fontWeight: '600', color: '#ef4444' },
});
