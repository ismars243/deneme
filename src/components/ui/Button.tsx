import { cn } from '../../lib/utils';
import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'income' | 'expense';
type Size = 'sm' | 'md' | 'lg' | 'xl';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  full?: boolean;
}

const variants: Record<Variant, string> = {
  primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm shadow-primary-500/30',
  secondary: 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300',
  ghost: 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400',
  danger: 'bg-red-500 hover:bg-red-600 text-white shadow-sm shadow-red-500/30',
  income: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm shadow-emerald-500/30',
  expense: 'bg-red-500 hover:bg-red-600 text-white shadow-sm shadow-red-500/30',
};

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-xl',
  md: 'px-4 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3 text-sm rounded-2xl',
  xl: 'px-6 py-4 text-base rounded-2xl',
};

export function Button({ variant = 'primary', size = 'md', loading, full, children, className, disabled, ...props }: Props) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold active:scale-95 transition-all select-none',
        variants[variant], sizes[size],
        full && 'w-full',
        (disabled || loading) && 'opacity-50 pointer-events-none',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin flex-shrink-0" />}
      {children}
    </button>
  );
}
