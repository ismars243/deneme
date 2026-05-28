import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { PageHeader } from '../components/layout/PageHeader';
import { useData } from '../contexts/DataContext';
import { formatCurrency, CATEGORY_META } from '../lib/utils';
import { cn } from '../lib/utils';
import type { Category } from '../lib/types';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const COLORS = ['#6366f1','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#f97316','#84cc16'];

export default function Reports() {
  const { getMonthStats, getCategorySpending, monthlyChartData } = useData();
  const stats = getMonthStats();
  const spending = getCategorySpending();
  const [view, setView] = useState<'monthly'|'category'>('monthly');

  const pieData = spending
    .filter(s => s.amount > 0)
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 8)
    .map(s => ({ name: s.category, value: s.amount }));

  return (
    <div className="animate-fade-in">
      <PageHeader title="Raporlar" subtitle="Mayıs 2026" />

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3 mx-4 my-4">
        <div className="card p-3 text-center">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-2">
            <TrendingUp size={15} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <p className="text-[10px] text-muted mb-0.5">Gelir</p>
          <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(stats.income)}</p>
        </div>
        <div className="card p-3 text-center">
          <div className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-2">
            <TrendingDown size={15} className="text-red-500" />
          </div>
          <p className="text-[10px] text-muted mb-0.5">Gider</p>
          <p className="text-xs font-bold text-red-500">{formatCurrency(stats.expense)}</p>
        </div>
        <div className="card p-3 text-center">
          <div className="w-8 h-8 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-2">
            <DollarSign size={15} className="text-primary-600 dark:text-primary-400" />
          </div>
          <p className="text-[10px] text-muted mb-0.5">Net</p>
          <p className={cn('text-xs font-bold', stats.balance >= 0 ? 'text-primary-600 dark:text-primary-400' : 'text-red-500')}>
            {formatCurrency(stats.balance)}
          </p>
        </div>
      </div>

      {/* View toggle */}
      <div className="mx-4 mb-4 flex bg-slate-100 dark:bg-slate-800 rounded-2xl p-1">
        {(['monthly','category'] as const).map(v => (
          <button key={v} onClick={() => setView(v)}
            className={cn('flex-1 py-2 rounded-xl text-xs font-semibold transition-all',
              view === v ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm' : 'text-muted'
            )}>
            {v === 'monthly' ? '📅 Aylık' : '🥧 Kategori'}
          </button>
        ))}
      </div>

      {view === 'monthly' ? (
        <div className="mx-4 card p-4">
          <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4">Son 6 Ay</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyChartData} barGap={4}>
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                formatter={(val: number) => formatCurrency(val)}
                contentStyle={{ background: 'var(--tw-bg-opacity)', borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', fontSize: 12 }}
              />
              <Bar dataKey="income" name="Gelir" fill="#10b981" radius={[4,4,0,0]} />
              <Bar dataKey="expense" name="Gider" fill="#ef4444" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 justify-center mt-2">
            <span className="text-xs text-muted flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block" />Gelir</span>
            <span className="text-xs text-muted flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-red-500 inline-block" />Gider</span>
          </div>
        </div>
      ) : (
        <div className="mx-4 space-y-4">
          <div className="card p-4">
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3">Gider Dağılımı</p>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
                    dataKey="value" paddingAngle={3}>
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(val: number) => formatCurrency(val)}
                    contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', fontSize: 12 }} />
                  <Legend iconType="circle" iconSize={8} formatter={(v) => <span style={{ fontSize: 11 }}>{v}</span>} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-40 flex items-center justify-center text-muted text-sm">Veri yok</div>
            )}
          </div>

          <div className="card overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Kategori Detayı</p>
            </div>
            <div className="divide-y divider">
              {spending.filter(s => s.amount > 0).sort((a,b) => b.amount - a.amount).map((s, i) => {
                const meta = CATEGORY_META[s.category as Category];
                const total = spending.reduce((acc, x) => acc + x.amount, 0);
                const pct = total > 0 ? Math.round((s.amount / total) * 100) : 0;
                return (
                  <div key={s.category} className="flex items-center gap-3 px-4 py-3">
                    <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0', meta.bg, meta.darkBg)}>
                      {meta.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{s.category}</p>
                        <p className="text-xs font-bold" style={{ color: COLORS[i % COLORS.length] }}>{formatCurrency(s.amount)}</p>
                      </div>
                      <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: COLORS[i % COLORS.length] }} />
                      </div>
                    </div>
                    <span className="text-[10px] text-muted w-8 text-right">%{pct}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="h-4" />
    </div>
  );
}
