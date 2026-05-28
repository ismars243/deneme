import { Bell, TrendingUp, TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Avatar } from '../ui/Avatar';
import { formatCurrency } from '../../lib/utils';
import { Sun, Moon } from 'lucide-react';

export function BalanceCard() {
  const { user } = useAuth();
  const { accounts, getMonthStats } = useData();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();

  const totalBalance = accounts.reduce((s, a) => s + a.balance, 0);
  const { income, expense } = getMonthStats();

  return (
    <div className="relative overflow-hidden rounded-b-[2rem] bg-gradient-to-br from-primary-600 via-primary-700 to-indigo-800 px-5 pt-14 pb-8 shadow-xl shadow-primary-900/30">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-10 -translate-x-10" />

      {/* Top bar */}
      <div className="relative flex items-center justify-between mb-8">
        <button onClick={() => navigate('/profile')} className="flex items-center gap-2.5">
          <Avatar name={user?.name ?? 'Kullanıcı'} size="sm" className="ring-2 ring-white/30" />
          <div>
            <p className="text-white/60 text-xs">Merhaba,</p>
            <p className="text-white font-semibold text-sm leading-tight">{user?.name?.split(' ')[0]}</p>
          </div>
        </button>
        <div className="flex items-center gap-2">
          <button onClick={toggle} className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white active:scale-95 transition-all">
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button onClick={() => navigate('/notifications')} className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white active:scale-95 transition-all relative">
            <Bell size={17} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-400 rounded-full" />
          </button>
        </div>
      </div>

      {/* Balance */}
      <div className="relative text-center mb-8">
        <p className="text-white/60 text-sm mb-1">Toplam Bakiye</p>
        <p className="text-white font-bold text-4xl tracking-tight">{formatCurrency(totalBalance)}</p>
        <p className="text-white/50 text-xs mt-1">Tüm hesaplar</p>
      </div>

      {/* Income / Expense */}
      <div className="relative grid grid-cols-2 gap-3">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 bg-emerald-400/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <TrendingUp size={18} className="text-emerald-300" />
          </div>
          <div>
            <p className="text-white/60 text-xs">Gelir</p>
            <p className="text-white font-bold text-sm">{formatCurrency(income)}</p>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 bg-red-400/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <TrendingDown size={18} className="text-red-300" />
          </div>
          <div>
            <p className="text-white/60 text-xs">Gider</p>
            <p className="text-white font-bold text-sm">{formatCurrency(expense)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
