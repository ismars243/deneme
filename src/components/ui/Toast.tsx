import { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';
import { cn } from '../../lib/utils';

type ToastType = 'success' | 'error' | 'info';
interface Toast { id: number; message: string; type: ToastType; }
interface ToastCtx { toast: (msg: string, type?: ToastType) => void; }

const ToastContext = createContext<ToastCtx>({ toast: () => {} });
export function useToast() { return useContext(ToastContext); }

let nextId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toast = useCallback((message: string, type: ToastType = 'success') => {
    const id = nextId++;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  const icons = { success: CheckCircle, error: XCircle, info: AlertCircle };
  const styles = {
    success: 'border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400',
    error: 'border-red-200 dark:border-red-800 text-red-700 dark:text-red-400',
    info: 'border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-400',
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 w-full max-w-sm px-4 pointer-events-none">
        {toasts.map(t => {
          const Icon = icons[t.type];
          return (
            <div key={t.id} className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-xl pointer-events-auto animate-slide-up',
              'bg-white dark:bg-slate-900',
              styles[t.type]
            )}>
              <Icon size={18} className="flex-shrink-0" />
              <span className="text-sm font-medium flex-1 text-slate-700 dark:text-slate-200">{t.message}</span>
              <button onClick={() => setToasts(p => p.filter(x => x.id !== t.id))}>
                <X size={14} className="text-slate-400" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
