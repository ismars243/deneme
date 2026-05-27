import { cn, getInitials } from '../../lib/utils';

const colors = [
  'bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-amber-500',
  'bg-red-500', 'bg-indigo-500', 'bg-teal-500', 'bg-pink-500',
];

function colorFor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

interface Props {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Avatar({ name, size = 'md', className }: Props) {
  return (
    <div className={cn(
      'rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0',
      colorFor(name),
      size === 'sm' && 'w-7 h-7 text-xs',
      size === 'md' && 'w-9 h-9 text-sm',
      size === 'lg' && 'w-12 h-12 text-base',
      className
    )}>
      {getInitials(name)}
    </div>
  );
}
