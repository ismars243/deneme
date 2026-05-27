import { CheckCircle2, MessageSquare, RefreshCw, PlusCircle, FileText } from 'lucide-react';
import { formatDate } from '../../lib/utils';
import { Avatar } from '../ui/Avatar';
import type { Activity } from '../../lib/mock-data';

const icons = {
  create: PlusCircle,
  update: RefreshCw,
  comment: MessageSquare,
  milestone: CheckCircle2,
  file: FileText,
};

const iconColors: Record<Activity['type'], string> = {
  create: 'text-green-500 bg-green-50',
  update: 'text-blue-500 bg-blue-50',
  comment: 'text-purple-500 bg-purple-50',
  milestone: 'text-amber-500 bg-amber-50',
  file: 'text-gray-500 bg-gray-100',
};

export function ActivityLog({ activities }: { activities: Activity[] }) {
  const sorted = [...activities].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-3">
      {sorted.map((act, i) => {
        const Icon = icons[act.type];
        return (
          <div key={act.id} className="flex gap-3 items-start">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${iconColors[act.type]}`}>
              <Icon size={14} />
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <p className="text-sm text-gray-800">{act.action}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <Avatar name={act.user} size="sm" className="w-4 h-4 text-[9px]" />
                <span className="text-xs text-gray-400">{act.user} · {formatDate(act.date)}</span>
              </div>
            </div>
            {i < sorted.length - 1 && (
              <div className="absolute left-[19px] mt-8 w-px h-full bg-gray-100" />
            )}
          </div>
        );
      })}
    </div>
  );
}
