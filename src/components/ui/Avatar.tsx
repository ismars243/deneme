import { cn, getInitials } from '../../lib/utils';

const colors = ['bg-violet-500','bg-blue-500','bg-emerald-500','bg-amber-500','bg-red-500','bg-pink-500','bg-cyan-500','bg-indigo-500'];
function colorFor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

export function Avatar({ name, size = 'md', className }: { name: string; size?: 'xs'|'sm'|'md'|'lg'|'xl'; className?: string }) {
  const s = { xs:'w-6 h-6 text-[10px]', sm:'w-8 h-8 text-xs', md:'w-10 h-10 text-sm', lg:'w-12 h-12 text-base', xl:'w-16 h-16 text-xl' };
  return (
    <div className={cn('rounded-full flex items-center justify-center text-white font-bold flex-shrink-0', colorFor(name), s[size], className)}>
      {getInitials(name)}
    </div>
  );
}
