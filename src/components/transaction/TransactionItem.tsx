import { useState } from 'react';
import { Trash2, Edit3 } from 'lucide-react';
import { cn, formatCurrency, formatDateShort, CATEGORY_META } from '../../lib/utils';
import { useData } from '../../contexts/DataContext';
import { useToast } from '../ui/Toast';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import type { Transaction } from '../../lib/types';

export function TransactionItem({ t }: { t: Transaction }) {
  const meta = CATEGORY_META[t.category];
  const { deleteTransaction } = useData();
  const { toast } = useToast();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [pressed, setPressed] = useState(false);

  function handleDelete() {
    deleteTransaction(t.id);
    toast('İşlem silindi', 'success');
    setConfirmDelete(false);
  }

  return (
    <>
      <div
        className={cn(
          'flex items-center gap-3 px-4 py-3.5 active:bg-slate-50 dark:active:bg-slate-800/50 transition-colors select-none',
          pressed && 'bg-slate-50 dark:bg-slate-800/50'
        )}
        onContextMenu={e => { e.preventDefault(); setConfirmDelete(true); }}
      >
        <div className={cn('w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 text-xl', meta.bg, meta.darkBg)}>
          {meta.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{t.title}</p>
          <p className="text-xs text-muted mt-0.5">{t.category} · {formatDateShort(t.date)}</p>
          {t.note && <p className="text-xs text-muted/70 mt-0.5 italic truncate">{t.note}</p>}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <p className={cn('text-sm font-bold', t.type === 'income' ? 'text-emerald-500' : 'text-red-500')}>
            {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
          </p>
          <button onClick={() => setConfirmDelete(true)} className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 dark:text-slate-600 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <Modal open={confirmDelete} onClose={() => setConfirmDelete(false)} title="İşlemi Sil" size="sm">
        <p className="text-sm text-muted mb-5">
          <strong className="text-slate-900 dark:text-slate-100">"{t.title}"</strong> işlemini silmek istediğinize emin misiniz?
        </p>
        <div className="flex gap-3">
          <Button variant="secondary" full onClick={() => setConfirmDelete(false)}>İptal</Button>
          <Button variant="danger" full onClick={handleDelete}>Sil</Button>
        </div>
      </Modal>
    </>
  );
}
