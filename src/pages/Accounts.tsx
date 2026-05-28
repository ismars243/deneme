import { useState } from 'react';
import { Building2, Wallet2, CreditCard, Smartphone, Plus, Edit3, Trash2 } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useData } from '../contexts/DataContext';
import { useToast } from '../components/ui/Toast';
import { formatCurrency } from '../lib/utils';
import { cn } from '../lib/utils';
import type { AccountType } from '../lib/types';

const accountIcons: Record<AccountType, React.ElementType> = {
  cash: Wallet2, bank: Building2, credit: CreditCard, digital: Smartphone,
};
const accountTypeLabels: Record<AccountType, string> = {
  cash: 'Nakit', bank: 'Banka', credit: 'Kredi Kartı', digital: 'Dijital',
};
const ACCOUNT_COLORS = ['#6366f1','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4'];

export default function Accounts() {
  const { accounts, addAccount, deleteAccount } = useData();
  const { toast } = useToast();
  const [addOpen, setAddOpen] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState<AccountType>('bank');
  const [balance, setBalance] = useState('');
  const [colorIdx, setColorIdx] = useState(0);

  const totalBalance = accounts.reduce((s, a) => s + a.balance, 0);

  function handleAdd() {
    if (!name || !balance) { toast('Ad ve bakiye zorunlu', 'error'); return; }
    addAccount({ name, type, balance: parseFloat(balance), color: ACCOUNT_COLORS[colorIdx], currency: 'TRY' });
    toast('Hesap eklendi', 'success');
    setAddOpen(false);
    setName(''); setBalance(''); setType('bank'); setColorIdx(0);
  }

  function handleDelete(id: string) {
    if (!confirm('Bu hesabı silmek istiyor musunuz?')) return;
    deleteAccount(id);
    toast('Hesap silindi', 'success');
  }

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Hesaplarım"
        right={
          <button onClick={() => setAddOpen(true)}
            className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center text-white active:scale-95 transition-all">
            <Plus size={18} />
          </button>
        }
      />

      {/* Total */}
      <div className="mx-4 my-4 card p-5">
        <p className="text-xs text-muted mb-1">Toplam Varlık</p>
        <p className={cn('text-2xl font-bold', totalBalance < 0 ? 'text-red-500' : 'text-slate-900 dark:text-slate-100')}>
          {formatCurrency(totalBalance)}
        </p>
        <p className="text-xs text-muted mt-1">{accounts.length} hesap</p>
      </div>

      {/* Account list */}
      <div className="space-y-3 mx-4 pb-6">
        {accounts.map(a => {
          const Icon = accountIcons[a.type];
          return (
            <div key={a.id} className="card p-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: a.color + '22' }}>
                  <Icon size={20} style={{ color: a.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{a.name}</p>
                  <p className="text-xs text-muted">{accountTypeLabels[a.type]}</p>
                </div>
                <div className="text-right mr-2">
                  <p className={cn('text-sm font-bold', a.balance < 0 ? 'text-red-500' : 'text-slate-900 dark:text-slate-100')}>
                    {formatCurrency(a.balance)}
                  </p>
                </div>
                <button onClick={() => handleDelete(a.id)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Yeni Hesap" size="sm">
        <div className="space-y-4">
          <Input label="Hesap Adı" id="acc-name" value={name} onChange={e => setName(e.target.value)} placeholder="Ziraat Bankası" />
          <Input label="Başlangıç Bakiyesi (₺)" id="acc-balance" type="number" value={balance} onChange={e => setBalance(e.target.value)} placeholder="0" />

          <div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Hesap Türü</p>
            <div className="grid grid-cols-2 gap-2">
              {(Object.entries(accountTypeLabels) as [AccountType, string][]).map(([t, label]) => {
                const Icon = accountIcons[t];
                return (
                  <button key={t} onClick={() => setType(t)}
                    className={cn('flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 transition-all text-sm font-medium',
                      type === t ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : 'border-slate-200 dark:border-slate-700 text-muted'
                    )}>
                    <Icon size={16} />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Renk</p>
            <div className="flex gap-2">
              {ACCOUNT_COLORS.map((c, i) => (
                <button key={c} onClick={() => setColorIdx(i)}
                  className={cn('w-8 h-8 rounded-full transition-all', colorIdx === i && 'ring-2 ring-offset-2 ring-slate-400 dark:ring-offset-slate-900')}
                  style={{ background: c }} />
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" full onClick={() => setAddOpen(false)}>İptal</Button>
            <Button full onClick={handleAdd}>Ekle</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
