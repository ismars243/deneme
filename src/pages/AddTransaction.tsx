import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Camera } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useData } from '../contexts/DataContext';
import { useToast } from '../components/ui/Toast';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES, CATEGORY_META } from '../lib/utils';
import { cn, formatCurrency } from '../lib/utils';
import type { TransactionType, Category, IncomeCategory, ExpenseCategory } from '../lib/types';

export default function AddTransaction() {
  const navigate = useNavigate();
  const { addTransaction, accounts } = useData();
  const { toast } = useToast();

  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category | ''>('');
  const [accountId, setAccountId] = useState(accounts[0]?.id ?? '');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [step, setStep] = useState<'type'|'amount'|'details'>('type');

  const cats = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  function handleSave() {
    if (!amount || !category || !accountId) { toast('Lütfen tüm alanları doldurun', 'error'); return; }
    addTransaction({ type, amount: parseFloat(amount), category: category as Category, accountId, title: title || category, note, date });
    toast(type === 'income' ? 'Gelir eklendi 🎉' : 'Gider eklendi', 'success');
    navigate('/dashboard');
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      {/* Header */}
      <div className={cn(
        'px-5 pt-14 pb-6 transition-colors',
        type === 'income' ? 'bg-emerald-500' : 'bg-red-500'
      )}>
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate(-1)} className="text-white/80 text-sm font-medium">İptal</button>
          <h1 className="text-white font-bold text-base">Yeni İşlem</h1>
          <button onClick={handleSave} className="text-white/80 text-sm font-medium">Kaydet</button>
        </div>

        {/* Type toggle */}
        <div className="flex bg-black/10 rounded-2xl p-1 mb-6">
          {(['expense','income'] as TransactionType[]).map(t => (
            <button key={t} onClick={() => { setType(t); setCategory(''); }}
              className={cn('flex-1 py-2 rounded-xl text-sm font-semibold transition-all',
                type === t ? 'bg-white text-slate-800 shadow-sm' : 'text-white/70'
              )}>
              {t === 'income' ? '💰 Gelir' : '💸 Gider'}
            </button>
          ))}
        </div>

        {/* Amount */}
        <div className="text-center">
          <p className="text-white/70 text-sm mb-2">Tutar</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-white text-3xl font-bold">₺</span>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="0"
              className="text-white text-5xl font-bold bg-transparent outline-none w-40 text-center placeholder:text-white/30"
              autoFocus
            />
          </div>
          {amount && <p className="text-white/60 text-sm mt-1">{formatCurrency(parseFloat(amount) || 0)}</p>}
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-5 pt-5 space-y-5 overflow-y-auto pb-8">
        {/* Category */}
        <div>
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Kategori</p>
          <div className="grid grid-cols-4 gap-2">
            {(cats as Category[]).map(cat => {
              const meta = CATEGORY_META[cat];
              const active = category === cat;
              return (
                <button key={cat} onClick={() => setCategory(cat)}
                  className={cn('flex flex-col items-center gap-1.5 p-2.5 rounded-2xl border-2 transition-all active:scale-95',
                    active ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'
                  )}>
                  <span className="text-xl">{meta.icon}</span>
                  <span className={cn('text-[10px] font-medium text-center leading-tight line-clamp-2',
                    active ? 'text-primary-700 dark:text-primary-400' : 'text-muted'
                  )}>{cat}</span>
                  {active && <Check size={10} className="text-primary-600" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">Başlık (opsiyonel)</label>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder={category || 'İşlem başlığı'}
            className="input-base" />
        </div>

        {/* Account */}
        <div>
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">Hesap</label>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {accounts.map(a => (
              <button key={a.id} onClick={() => setAccountId(a.id)}
                className={cn('flex-shrink-0 px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all active:scale-95',
                  accountId === a.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-muted'
                )}>
                {a.name}
              </button>
            ))}
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">Tarih</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="input-base" />
        </div>

        {/* Note */}
        <div>
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">Not (opsiyonel)</label>
          <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Açıklama ekle..."
            rows={2} className="input-base resize-none" />
        </div>

        {/* Receipt */}
        <button className="w-full flex items-center gap-3 p-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-muted active:scale-98 transition-all">
          <Camera size={20} />
          <span className="text-sm font-medium">Fiş / Fotoğraf Ekle</span>
        </button>

        <Button
          variant={type === 'income' ? 'income' : 'expense'}
          full size="xl"
          onClick={handleSave}
        >
          {type === 'income' ? '💰 Gelir Ekle' : '💸 Gider Ekle'}
        </Button>
      </div>
    </div>
  );
}
