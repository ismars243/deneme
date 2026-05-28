import { BalanceCard } from '../components/dashboard/BalanceCard';
import { AISuggestion } from '../components/dashboard/AISuggestion';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { CategoryChart } from '../components/dashboard/CategoryChart';
import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { formatCurrency } from '../lib/utils';
import { ChevronRight, Building2, Wallet2, CreditCard, Smartphone } from 'lucide-react';
import { cn } from '../lib/utils';
import type { AccountType } from '../lib/types';

const accountIcons: Record<AccountType, React.ElementType> = {
  cash: Wallet2, bank: Building2, credit: CreditCard, digital: Smartphone,
};

export default function Dashboard() {
  const { accounts } = useData();
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in">
      <BalanceCard />

      <div className="space-y-5 pt-5 pb-4">
        {/* Accounts */}
        <div className="mx-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Hesaplarım</h2>
            <button onClick={() => navigate('/accounts')} className="text-xs font-medium text-primary-600 dark:text-primary-400 flex items-center gap-0.5">
              Tümü <ChevronRight size={14} />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
            {accounts.map(a => {
              const Icon = accountIcons[a.type];
              return (
                <div key={a.id} className="flex-shrink-0 card p-4 w-40 space-y-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: a.color + '22' }}>
                    <Icon size={18} style={{ color: a.color }} />
                  </div>
                  <div>
                    <p className="text-xs text-muted">{a.name}</p>
                    <p className={cn('text-sm font-bold mt-0.5', a.balance < 0 ? 'text-red-500' : 'text-slate-900 dark:text-slate-100')}>
                      {formatCurrency(a.balance)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <AISuggestion />
        <RecentTransactions />
        <CategoryChart />
      </div>
    </div>
  );
}
