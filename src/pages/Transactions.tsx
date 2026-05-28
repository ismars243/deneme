import { useState, useMemo } from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { TransactionItem } from '../components/transaction/TransactionItem';
import { useData } from '../contexts/DataContext';
import { groupByDate, exportCSV } from '../lib/utils';
import { cn } from '../lib/utils';
import { useToast } from '../components/ui/Toast';
import type { TransactionType } from '../lib/types';

type Filter = 'all' | 'income' | 'expense';

export default function Transactions() {
  const { transactions } = useData();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [month, setMonth] = useState('');

  const filtered = useMemo(() => {
    return transactions.filter(t => {
      if (filter !== 'all' && t.type !== filter) return false;
      if (month && !t.date.startsWith(month)) return false;
      if (search && !t.title.toLowerCase().includes(search.toLowerCase()) &&
          !t.category.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [transactions, filter, search, month]);

  const grouped = groupByDate(filtered);

  function handleExport() {
    exportCSV(filtered);
    toast('CSV dosyası indirildi', 'success');
  }

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="İşlemler"
        subtitle={`${filtered.length} kayıt`}
        right={
          <button onClick={handleExport} className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 active:scale-95 transition-all">
            <Download size={17} />
          </button>
        }
      />

      <div className="px-4 py-3 space-y-3">
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="İşlem ara..."
            className="input-base pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {(['all','income','expense'] as Filter[]).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={cn('flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all active:scale-95',
                filter === f
                  ? f === 'income' ? 'bg-emerald-500 text-white' : f === 'expense' ? 'bg-red-500 text-white' : 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-muted'
              )}>
              {f === 'all' ? '🔘 Tümü' : f === 'income' ? '💚 Gelir' : '🔴 Gider'}
            </button>
          ))}
          <input
            type="month"
            value={month}
            onChange={e => setMonth(e.target.value)}
            className="flex-shrink-0 px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-muted"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center px-8">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-slate-600 dark:text-slate-400 font-medium">Sonuç bulunamadı</p>
          <p className="text-muted text-sm mt-1">Farklı filtreler deneyin</p>
        </div>
      ) : (
        <div className="space-y-4 pb-4">
          {[...grouped.entries()].map(([date, items]) => (
            <div key={date}>
              <p className="px-4 py-1 text-xs font-bold text-muted uppercase tracking-wide">{date}</p>
              <div className="card mx-4 overflow-hidden divide-y divider">
                {items.map(t => <TransactionItem key={t.id} t={t} />)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
