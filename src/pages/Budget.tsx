import { useState } from 'react';
import { Target, Edit3 } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { useData } from '../contexts/DataContext';
import { formatCurrency, CATEGORY_META, budgetBarColor } from '../lib/utils';
import { cn } from '../lib/utils';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { useToast } from '../components/ui/Toast';
import type { Budget } from '../lib/types';

export default function BudgetPage() {
  const { budgets, getCategorySpending, updateBudget } = useData();
  const { toast } = useToast();
  const spending = getCategorySpending();
  const [editing, setEditing] = useState<Budget | null>(null);
  const [newLimit, setNewLimit] = useState('');

  const totalLimit = budgets.reduce((s, b) => s + b.limit, 0);
  const totalSpent = budgets.reduce((s, b) => {
    const sp = spending.find(s => s.category === b.category);
    return s + (sp?.amount ?? 0);
  }, 0);

  function saveEdit() {
    if (!editing || !newLimit) return;
    updateBudget(editing.id, parseFloat(newLimit));
    toast('Bütçe güncellendi', 'success');
    setEditing(null);
  }

  return (
    <div className="animate-fade-in">
      <PageHeader title="Bütçe" subtitle="Mayıs 2026" />

      {/* Summary */}
      <div className="mx-4 my-4 card p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center">
            <Target size={20} className="text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Toplam Bütçe</p>
            <p className="text-xs text-muted">{formatCurrency(totalSpent)} / {formatCurrency(totalLimit)} harcandı</p>
          </div>
        </div>
        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className={cn('h-full rounded-full transition-all', budgetBarColor(totalSpent, totalLimit))}
            style={{ width: `${Math.min(100, (totalSpent / totalLimit) * 100)}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-muted">%{Math.round((totalSpent / totalLimit) * 100)} kullanıldı</span>
          <span className="text-xs text-muted">Kalan: {formatCurrency(totalLimit - totalSpent)}</span>
        </div>
      </div>

      {/* Category budgets */}
      <div className="space-y-3 mx-4 pb-4">
        {budgets.map(b => {
          const sp = spending.find(s => s.category === b.category);
          const spent = sp?.amount ?? 0;
          const pct = Math.min(100, (spent / b.limit) * 100);
          const over = spent > b.limit;
          const meta = CATEGORY_META[b.category];

          return (
            <div key={b.id} className="card p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className={cn('w-10 h-10 rounded-2xl flex items-center justify-center text-xl flex-shrink-0', meta.bg, meta.darkBg)}>
                  {meta.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{b.category}</p>
                    <button onClick={() => { setEditing(b); setNewLimit(String(b.limit)); }}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <Edit3 size={13} />
                    </button>
                  </div>
                  <p className={cn('text-xs mt-0.5', over ? 'text-red-500 font-semibold' : 'text-muted')}>
                    {formatCurrency(spent)} / {formatCurrency(b.limit)}
                    {over && ' — Aşıldı!'}
                  </p>
                </div>
              </div>
              <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={cn('h-full rounded-full transition-all', budgetBarColor(spent, b.limit))}
                  style={{ width: `${pct}%` }}
                />
              </div>
              {pct >= 80 && !over && (
                <p className="text-xs text-amber-500 mt-1.5">⚠️ Limite yaklaşıyorsunuz</p>
              )}
            </div>
          );
        })}
      </div>

      <Modal open={!!editing} onClose={() => setEditing(null)} title={`Bütçe: ${editing?.category}`} size="sm">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">Aylık Limit (₺)</label>
            <input type="number" value={newLimit} onChange={e => setNewLimit(e.target.value)}
              className="input-base text-lg font-bold" placeholder="0" autoFocus />
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" full onClick={() => setEditing(null)}>İptal</Button>
            <Button full onClick={saveEdit}>Kaydet</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
