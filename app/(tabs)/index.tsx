import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronRight, TrendingUp, TrendingDown, Building2, Wallet2, CreditCard, Smartphone } from 'lucide-react-native';
import { useData } from '../../src/contexts/DataContext';
import { useAuth } from '../../src/contexts/AuthContext';
import { Avatar } from '../../src/components/ui/Avatar';
import { Card } from '../../src/components/ui/Card';
import { formatCurrency, generateAISuggestion, CATEGORY_META } from '../../src/lib/utils';
import type { AccountType, Category } from '../../src/lib/types';

const ACCOUNT_ICONS: Record<AccountType, React.ElementType> = {
  cash: Wallet2, bank: Building2, credit: CreditCard, digital: Smartphone,
};

export default function Dashboard() {
  const { transactions, accounts, getMonthStats } = useData();
  const { user } = useAuth();
  const router = useRouter();
  const stats = getMonthStats();
  const totalBalance = accounts.reduce((s, a) => s + a.balance, 0);
  const recent = transactions.slice(0, 5);
  const tip = generateAISuggestion(transactions);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <View>
              <Text style={styles.balanceLabel}>Toplam Bakiye</Text>
              <Text style={styles.balanceAmount}>{formatCurrency(totalBalance)}</Text>
            </View>
            <Avatar name={user?.name ?? 'U'} size={44} />
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <TrendingUp size={14} color="#10b981" />
              </View>
              <View>
                <Text style={styles.statLabel}>Gelir</Text>
                <Text style={[styles.statValue, { color: '#10b981' }]}>{formatCurrency(stats.income)}</Text>
              </View>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: '#fee2e2' }]}>
                <TrendingDown size={14} color="#ef4444" />
              </View>
              <View>
                <Text style={styles.statLabel}>Gider</Text>
                <Text style={[styles.statValue, { color: '#ef4444' }]}>{formatCurrency(stats.expense)}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          {/* Accounts */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Hesaplarım</Text>
            <TouchableOpacity style={styles.seeAll}>
              <Text style={styles.seeAllText}>Tümü</Text>
              <ChevronRight size={14} color="#6366f1" />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.accountsScroll}>
            {accounts.map(a => {
              const Icon = ACCOUNT_ICONS[a.type];
              return (
                <Card key={a.id} style={styles.accountCard} padding={16}>
                  <View style={[styles.accountIcon, { backgroundColor: a.color + '22' }]}>
                    <Icon size={18} color={a.color} />
                  </View>
                  <Text style={styles.accountName} numberOfLines={1}>{a.name}</Text>
                  <Text style={[styles.accountBalance, { color: a.balance < 0 ? '#ef4444' : '#0f172a' }]}>
                    {a.balance < 0 ? '-' : ''}{formatCurrency(a.balance)}
                  </Text>
                </Card>
              );
            })}
          </ScrollView>

          {/* AI Tip */}
          <Card style={styles.aiCard}>
            <Text style={styles.aiEmoji}>{tip.emoji}</Text>
            <Text style={styles.aiText}>{tip.text}</Text>
          </Card>

          {/* Recent Transactions */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Son İşlemler</Text>
            <TouchableOpacity style={styles.seeAll} onPress={() => router.push('/(tabs)/transactions')}>
              <Text style={styles.seeAllText}>Tümü</Text>
              <ChevronRight size={14} color="#6366f1" />
            </TouchableOpacity>
          </View>
          <Card padding={0} style={styles.transCard}>
            {recent.map((t, i) => {
              const meta = CATEGORY_META[t.category as Category];
              return (
                <View key={t.id} style={[styles.transItem, i < recent.length - 1 && styles.transBorder]}>
                  <View style={[styles.transIcon, { backgroundColor: meta.bg }]}>
                    <Text style={styles.transEmoji}>{meta.icon}</Text>
                  </View>
                  <View style={styles.transInfo}>
                    <Text style={styles.transTitle} numberOfLines={1}>{t.title}</Text>
                    <Text style={styles.transCat}>{t.category}</Text>
                  </View>
                  <Text style={[styles.transAmount, { color: t.type === 'income' ? '#10b981' : '#ef4444' }]}>
                    {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                  </Text>
                </View>
              );
            })}
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:          { flex: 1, backgroundColor: '#6366f1' },
  scroll:        { flex: 1, backgroundColor: '#f8fafc' },
  balanceCard:   { backgroundColor: '#6366f1', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 32 },
  balanceHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  balanceLabel:  { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 4 },
  balanceAmount: { fontSize: 32, fontWeight: '800', color: '#fff', letterSpacing: -1 },
  statsRow:      { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 16, padding: 16, gap: 16 },
  statItem:      { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  statIcon:      { width: 32, height: 32, borderRadius: 10, backgroundColor: '#d1fae5', alignItems: 'center', justifyContent: 'center' },
  statDivider:   { width: 1, backgroundColor: 'rgba(255,255,255,0.25)' },
  statLabel:     { fontSize: 11, color: 'rgba(255,255,255,0.7)' },
  statValue:     { fontSize: 15, fontWeight: '700', marginTop: 2 },
  body:          { padding: 16, gap: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: -4 },
  sectionTitle:  { fontSize: 16, fontWeight: '700', color: '#0f172a' },
  seeAll:        { flexDirection: 'row', alignItems: 'center', gap: 2 },
  seeAllText:    { fontSize: 13, color: '#6366f1', fontWeight: '600' },
  accountsScroll:{ marginHorizontal: -16, paddingHorizontal: 16 },
  accountCard:   { width: 140, marginRight: 10, gap: 10 },
  accountIcon:   { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  accountName:   { fontSize: 12, color: '#64748b' },
  accountBalance:{ fontSize: 15, fontWeight: '700' },
  aiCard:        { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#eef2ff' },
  aiEmoji:       { fontSize: 24 },
  aiText:        { flex: 1, fontSize: 13, color: '#3730a3', lineHeight: 19 },
  transCard:     { overflow: 'hidden' },
  transItem:     { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  transBorder:   { borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  transIcon:     { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  transEmoji:    { fontSize: 18 },
  transInfo:     { flex: 1 },
  transTitle:    { fontSize: 14, fontWeight: '600', color: '#0f172a' },
  transCat:      { fontSize: 12, color: '#64748b', marginTop: 2 },
  transAmount:   { fontSize: 14, fontWeight: '700' },
});
