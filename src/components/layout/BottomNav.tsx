import { useLocation, useNavigate } from 'react-router-dom';
import { Home, List, PlusCircle, PieChart, User } from 'lucide-react';
import { cn } from '../../lib/utils';

const tabs = [
  { to: '/dashboard',    icon: Home,       label: 'Ana Sayfa' },
  { to: '/transactions', icon: List,       label: 'İşlemler'  },
  { to: '/add',          icon: PlusCircle, label: 'Ekle',  center: true },
  { to: '/budget',       icon: PieChart,   label: 'Bütçe'     },
  { to: '/profile',      icon: User,       label: 'Profil'    },
];

export function BottomNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 safe-pb">
      <div className="flex items-center justify-around px-2 pt-2 pb-1 max-w-lg mx-auto">
        {tabs.map(({ to, icon: Icon, label, center }) => {
          const active = pathname === to;
          if (center) {
            return (
              <button key={to} onClick={() => navigate(to)}
                className="flex flex-col items-center -mt-6"
              >
                <div className="w-14 h-14 rounded-full bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/40 active:scale-95 transition-transform">
                  <Icon size={26} className="text-white" strokeWidth={2} />
                </div>
                <span className="text-[10px] mt-1 text-primary-600 font-semibold">{label}</span>
              </button>
            );
          }
          return (
            <button key={to} onClick={() => navigate(to)}
              className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl active:bg-slate-100 dark:active:bg-slate-800 transition-colors min-w-[52px]"
            >
              <Icon size={22} className={cn('transition-colors', active ? 'text-primary-600' : 'text-slate-400 dark:text-slate-500')} strokeWidth={active ? 2.5 : 2} />
              <span className={cn('text-[10px] font-medium transition-colors', active ? 'text-primary-600' : 'text-slate-400 dark:text-slate-500')}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
