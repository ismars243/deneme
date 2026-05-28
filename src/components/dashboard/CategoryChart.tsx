import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useData } from '../../contexts/DataContext';
import { formatCurrency, CATEGORY_META } from '../../lib/utils';

const COLORS = ['#6366f1','#10b981','#ef4444','#f59e0b','#3b82f6','#ec4899','#8b5cf6'];

export function CategoryChart() {
  const { getCategorySpending } = useData();
  const data = getCategorySpending().slice(0, 6);

  if (data.length === 0) return null;

  const chartData = data.map(d => ({ name: d.category, value: d.amount }));

  return (
    <div className="mx-4">
      <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-3">Kategori Analizi</h2>
      <div className="card p-4">
        <div className="flex items-center gap-4">
          <div className="w-32 h-32 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} cx="50%" cy="50%" innerRadius={32} outerRadius={56} paddingAngle={3} dataKey="value">
                  {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-2 min-w-0">
            {data.slice(0, 5).map((d, i) => (
              <div key={d.category} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                <span className="text-xs text-muted flex-1 truncate">{d.category}</span>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{formatCurrency(d.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
