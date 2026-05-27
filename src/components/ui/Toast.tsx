import { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';
import { cn } from '../../lib/utils';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

let nextId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = 'success') => {
    const id = nextId++;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  const remove = (id: number) => setToasts(prev => prev.filter(t => t.id !== id));

  const icons = { success: CheckCircle, error: XCircle, info: AlertCircle };
  const colors = {
    success: 'border-green-200 bg-white text-green-800',
    error: 'border-red-200 bg-white text-red-800',
    info: 'border-blue-200 bg-white text-blue-800',
  };
  const iconColors = { success: 'text-green-500', error: 'text-red-500', info: 'text-blue-500' };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => {
          const Icon = icons[t.type];
          return (
            <div
              key={t.id}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg pointer-events-auto max-w-xs',
                'animate-in slide-in-from-bottom-4 fade-in',
                colors[t.type]
              )}
            >
              <Icon size={18} className={iconColors[t.type]} />
              <span className="text-sm font-medium flex-1">{t.message}</span>
              <button onClick={() => remove(t.id)} className="text-gray-400 hover:text-gray-600 ml-1">
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
