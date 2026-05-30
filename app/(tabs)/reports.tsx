import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarChart } from 'react-native-chart-kit';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import { useData } from '../../src/contexts/DataContext';
import { Card } from '../../src/components/ui/Card';
import { formatCurrency, CATEGORY_META } from '../../src/lib/utils';
import type { Category } from '../../src/lib/types';

const { width } = Dimensions.get('window');
const CHART_COLORS = ['#6366f1','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#f97316','#84cc16'];

export default function Reports() {
  const { getMonthStats, getCategorySpending, monthlyChartData } = useData();
  const stats = getMonthStats();
  const spending = getCategorySpending();
  const [view, setView] = useState<'monthly' | 'category'>('monthly');

  const chartData = {
    labels: monthlyChartData.map(d => d.month),
    datasets: [
      { data: monthlyChartData.map(d => d.income), color: () => '#10b981' },
      { data: monthlyChartData.map(d => d.expense), color: () => '#ef4444' },
    ],
    legend: ['Gelir', 'Gider'],
  };

  const totalSpending = spending.reduce((s, x) => s + x.amount, 0);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Raporlar</Text>
          <Text style={styles.headerSub}>Mayıs 2026</Text>
        </View>

        {/* Summary */}
        <View style={styles.summaryRow}>
          <Card style={[styles.summaryCard, { flex: 1 }]} padding={14}>
            <View style={[styles.summaryIcon, { backgroundColor: '#d1fae5' }]}>
              <TrendingUp size={14} color="#10b981" />
            </View>
            <Text style={styles.summaryLabel}>Gelir</Text>
            <Text style={[styles.summaryValue, { color: '#10b981' }]}>{formatCurrency(stats.income)}</Text>
          </Card>
          <Card style={[styles.summaryCard, { flex: 1 }]} padding={14}>
            <View style={[styles.summaryIcon, { backgroundColor: '#fee2e2' }]}>
              <TrendingDown size={14} color="#ef4444" />
            </View>
            <Text style={styles.summaryLabel}>Gider</Text>
            <Text style={[styles.summaryValue, { color: '#ef4444' }]}>{formatCurrency(stats.expense)}</Text>
          </Card>
          <Card style={[styles.summaryCard, { flex: 1 }]} padding={14}>
            <View style={[styles.summaryIcon, { backgroundColor: '#e0e7ff' }]}>
              <TrendingUp size={14} color="#6366f1" />
            </View>
            <Text style={styles.summaryLabel}>Net</Text>
            <Text style={[styles.summaryValue, { color: stats.balance >= 0 ? '#6366f1' : '#ef4444' }]}>
              {formatCurrency(stats.balance)}
            </Text>
          </Card>
        </View>

        {/* Toggle */}
        <View style={styles.toggle}>
          {(['monthly', 'category'] as const).map(v => (
            <TouchableOpacity key={v} onPress={() => setView(v)} activeOpacity={0.8}
              style={[styles.toggleBtn, view === v && styles.toggleActive]}>
              <Text style={[styles.toggleText, view === v && styles.toggleTextActive]}>
                {v === 'monthly' ? '📅 Aylık' : '🥧 Kategori'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.body}>
          {view === 'monthly' ? (
            <Card padding={16}>
              <Text style={styles.chartTitle}>Son 5 Ay</Text>
              <BarChart
                data={chartData}
                width={width - 64}
                height={200}
                yAxisLabel=""
                yAxisSuffix=""
                chartConfig={{
                  backgroundColor: '#fff',
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#fff',
                  color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
                  labelColor: () => '#94a3b8',
                  barPercentage: 0.5,
                  decimalPlaces: 0,
                  propsForBackgroundLines: { stroke: '#f1f5f9' },
                }}
                style={{ borderRadius: 12, marginLeft: -16 }}
                fromZero
                showValuesOnTopOfBars={false}
              />
              <View style={styles.legend}>
                <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: '#10b981' }]} /><Text style={styles.legendText}>Gelir</Text></View>
                <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: '#ef4444' }]} /><Text style={styles.legendText}>Gider</Text></View>
              </View>
            </Card>
          ) : (
            <Card padding={0} style={styles.catCard}>
              {spending.filter(s => s.amount > 0).map((s, i) => {
                const meta = CATEGORY_META[s.category as Category];
                const pct = totalSpending > 0 ? s.amount / totalSpending : 0;
                const color = CHART_COLORS[i % CHART_COLORS.length];
                return (
                  <View key={s.category} style={[styles.catItem, i > 0 && styles.catBorder]}>
                    <View style={[styles.catIcon, { backgroundColor: meta.bg }]}>
                      <Text>{meta.icon}</Text>
                    </View>
                    <View style={styles.catInfo}>
                      <View style={styles.catHeader}>
                        <Text style={styles.catName}>{s.category}</Text>
                        <Text style={[styles.catAmount, { color }]}>{formatCurrency(s.amount)}</Text>
                      </View>
                      <View style={styles.progressBg}>
                        <View style={[styles.progressFill, { width: `${pct * 100}%`, backgroundColor: color }]} />
                      </View>
                    </View>
                    <Text style={styles.catPct}>%{Math.round(pct * 100)}</Text>
                  </View>
                );
              })}
            </Card>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:          { flex: 1, backgroundColor: '#f8fafc' },
  header:        { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  headerTitle:   { fontSize: 24, fontWeight: '800', color: '#0f172a' },
  headerSub:     { fontSize: 13, color: '#64748b', marginTop: 2 },
  summaryRow:    { flexDirection: 'row', gap: 10, paddingHorizontal: 16, marginBottom: 16 },
  summaryCard:   {},
  summaryIcon:   { width: 28, height: 28, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  summaryLabel:  { fontSize: 10, color: '#64748b', marginBottom: 4 },
  summaryValue:  { fontSize: 13, fontWeight: '700' },
  toggle:        { flexDirection: 'row', marginHorizontal: 16, backgroundColor: '#f1f5f9', borderRadius: 14, padding: 4, marginBottom: 16 },
  toggleBtn:     { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 10 },
  toggleActive:  { backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 3, elevation: 2 },
  toggleText:    { fontSize: 13, fontWeight: '600', color: '#64748b' },
  toggleTextActive:{ color: '#0f172a' },
  body:          { paddingHorizontal: 16, paddingBottom: 24 },
  chartTitle:    { fontSize: 15, fontWeight: '700', color: '#0f172a', marginBottom: 12 },
  legend:        { flexDirection: 'row', gap: 16, justifyContent: 'center', marginTop: 8 },
  legendItem:    { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot:     { width: 10, height: 10, borderRadius: 3 },
  legendText:    { fontSize: 12, color: '#64748b' },
  catCard:       { overflow: 'hidden' },
  catItem:       { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 10 },
  catBorder:     { borderTopWidth: 1, borderTopColor: '#f1f5f9' },
  catIcon:       { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  catInfo:       { flex: 1 },
  catHeader:     { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  catName:       { fontSize: 13, fontWeight: '600', color: '#0f172a' },
  catAmount:     { fontSize: 13, fontWeight: '700' },
  progressBg:    { height: 4, backgroundColor: '#f1f5f9', borderRadius: 2, overflow: 'hidden' },
  progressFill:  { height: '100%', borderRadius: 2 },
  catPct:        { fontSize: 11, color: '#94a3b8', width: 32, textAlign: 'right' },
});
