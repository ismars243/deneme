import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props {
  title: string;
  subtitle?: string;
  back?: boolean;
  right?: React.ReactNode;
  transparent?: boolean;
}

export function PageHeader({ title, subtitle, back, right, transparent }: Props) {
  const navigate = useNavigate();
  return (
    <div className={cn(
      'flex items-center gap-3 px-4 pt-12 pb-4',
      !transparent && 'bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800'
    )}>
      {back && (
        <button onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 active:scale-95 transition-all">
          <ArrowLeft size={20} />
        </button>
      )}
      <div className="flex-1 min-w-0">
        <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 truncate">{title}</h1>
        {subtitle && <p className="text-xs text-muted mt-0.5">{subtitle}</p>}
      </div>
      {right && <div className="flex-shrink-0">{right}</div>}
    </div>
  );
}
