import { cn } from '../../lib/utils';

interface Props {
  value: number;
  className?: string;
  showLabel?: boolean;
}

export function Progress({ value, className, showLabel }: Props) {
  const color = value === 100 ? 'bg-blue-500' : value < 40 ? 'bg-amber-500' : 'bg-blue-500';
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all', color)}
          style={{ width: `${value}%` }}
        />
      </div>
      {showLabel && <span className="text-xs text-gray-500 w-8 text-right">{value}%</span>}
    </div>
  );
}
