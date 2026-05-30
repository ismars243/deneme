import { useState, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Trash2 } from 'lucide-react-native';
import { useData } from '../../src/contexts/DataContext';
import { formatCurrency, groupByDate, CATEGORY_META } from '../../src/lib/utils';
import type { Category } from '../../src/lib/types';

type Filter = 'all' | 'income' | 'expense';

export default function Transactions() {
  const { transactions, deleteTransaction } = useData();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = useMemo(() => {
    return transactions.filter(t => {
      if (filter !== 'all' && t.type !== filter) return false;
      if (search && !t.title.toLowerCase().includes(search.toLowerCase()) &&
          !t.category.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [transactions, filter, search]);

  const grouped = groupByDate(filtered);
  const sections = [...grouped.entries()].map(([date, items]) => ({ date, items }));

  function confirmDelete(id: string, title: string) {
    Alert.alert('Sil', `"${title}" işlemini silmek istiyor musunuz?`, [
      { text: 'İptal', style: 'cancel' },
      { text: 'Sil', style: 'destructive', onPress: () => deleteTransaction(id) },
    ]);
  }

  const FILTERS: { key: Filter; label: string; color: string }[] = [
    { key: 'all',     label: 'Tümü',  color: '#6366f1' },
    { key: 'income',  label: 'Gelir', color: '#10b981' },
    { key: 'expense', label: 'Gider', color: '#ef4444' },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>İşlemler</Text>
        <Text style={styles.headerSub}>{filtered.length} kayıt</Text>
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <Search size={16} color="#94a3b8" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="İşlem ara..."
          placeholderTextColor="#94a3b8"
        />
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        {FILTERS.map(f => (
          <TouchableOpacity key={f.key} onPress={() => setFilter(f.key)} activeOpacity={0.8}
            style={[styles.filterBtn, filter === f.key && { backgroundColor: f.color }]}>
            <Text style={[styles.filterText, filter === f.key && { color: '#fff' }]}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={sections}
        keyExtractor={s => s.date}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>Sonuç bulunamadı</Text>
          </View>
        }
        renderItem={({ item: section }) => (
          <View style={styles.group}>
            <Text style={styles.groupDate}>{section.date}</Text>
            <View style={styles.groupCard}>
              {section.items.map((t, i) => {
                const meta = CATEGORY_META[t.category as Category];
                return (
                  <View key={t.id} style={[styles.transItem, i < section.items.length - 1 && styles.border]}>
                    <View style={[styles.icon, { backgroundColor: meta.bg }]}>
                      <Text style={styles.iconEmoji}>{meta.icon}</Text>
                    </View>
                    <View style={styles.info}>
                      <Text style={styles.title} numberOfLines={1}>{t.title}</Text>
                      <Text style={styles.sub}>{t.category} • {t.date}</Text>
                    </View>
                    <Text style={[styles.amount, { color: t.type === 'income' ? '#10b981' : '#ef4444' }]}>
                      {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                    </Text>
                    <TouchableOpacity onPress={() => confirmDelete(t.id, t.title)} style={styles.deleteBtn}>
                      <Trash2 size={14} color="#94a3b8" />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:        { flex: 1, backgroundColor: '#f8fafc' },
  header:      { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#0f172a' },
  headerSub:   { fontSize: 13, color: '#64748b', marginTop: 2 },
  searchWrap:  { marginHorizontal: 16, marginBottom: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 14, borderWidth: 1, borderColor: '#e2e8f0', paddingHorizontal: 12 },
  searchIcon:  { marginRight: 8 },
  searchInput: { flex: 1, paddingVertical: 12, fontSize: 14, color: '#0f172a' },
  filters:     { flexDirection: 'row', paddingHorizontal: 16, gap: 8, marginBottom: 12 },
  filterBtn:   { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e2e8f0' },
  filterText:  { fontSize: 13, fontWeight: '600', color: '#64748b' },
  list:        { paddingHorizontal: 16, paddingBottom: 24, gap: 16 },
  group:       {},
  groupDate:   { fontSize: 11, fontWeight: '700', color: '#94a3b8', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 },
  groupCard:   { backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#e2e8f0', overflow: 'hidden' },
  transItem:   { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 10 },
  border:      { borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  icon:        { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  iconEmoji:   { fontSize: 18 },
  info:        { flex: 1 },
  title:       { fontSize: 14, fontWeight: '600', color: '#0f172a' },
  sub:         { fontSize: 11, color: '#94a3b8', marginTop: 2 },
  amount:      { fontSize: 14, fontWeight: '700' },
  deleteBtn:   { padding: 6 },
  empty:       { alignItems: 'center', paddingVertical: 60 },
  emptyIcon:   { fontSize: 48, marginBottom: 12 },
  emptyText:   { fontSize: 16, color: '#64748b', fontWeight: '600' },
});
