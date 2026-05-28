import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { formatCurrency, formatDateShort, CATEGORY_META } from '../../lib/utils';
import { cn } from '../../lib/utils';

export function RecentTransactions() {
  const { transactions } = useData();
  const navigate = useNavigate();
  const recent = [...transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);

  return (
    <div className="mx-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Son İşlemler</h2>
        <button onClick={() => navigate('/transactions')} className="text-xs font-medium text-primary-600 dark:text-primary-400 flex items-center gap-0.5">
          Tümü <ChevronRight size={14} />
        </button>
      </div>
      <div className="card divide-y divider overflow-hidden">
        {recent.map(t => {
          const meta = CATEGORY_META[t.category];
          return (
            <div key={t.id} className="flex items-center gap-3 px-4 py-3.5">
              <div className={cn('w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 text-lg', meta.bg, meta.darkBg)}>
                {meta.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{t.title}</p>
                <p className="text-xs text-muted mt-0.5">{t.category} · {formatDateShort(t.date)}</p>
              </div>
              <p className={cn('text-sm font-bold flex-shrink-0', t.type === 'income' ? 'text-emerald-500' : 'text-red-500')}>
                {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
