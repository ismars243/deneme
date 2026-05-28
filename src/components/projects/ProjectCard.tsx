import { useNavigate } from 'react-router-dom';
import { Users, CalendarDays, ArrowRight } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { formatDate, getStatusColor } from '../../lib/utils';
import type { Project } from '../../lib/mock-data';
import { cn } from '../../lib/utils';

const statusAccent: Record<Project['status'], string> = {
  aktif: 'border-t-green-400',
  tamamlandı: 'border-t-blue-400',
  gecikiyor: 'border-t-red-400',
  beklemede: 'border-t-amber-400',
};

export function ProjectCard({ project: p }: { project: Project }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/projeler/${p.id}`)}
      className={cn(
        'bg-white rounded-2xl border border-gray-200 border-t-2 shadow-sm cursor-pointer group',
        'hover:shadow-md hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200',
        statusAccent[p.status]
      )}
    >
      <div className="p-5 flex flex-col gap-4">
        {/* Top row */}
        <div className="flex items-start justify-between gap-2">
          <span className="text-xs text-gray-400 font-medium mt-0.5">{p.type}</span>
          <Badge className={cn(getStatusColor(p.status), 'flex-shrink-0')}>{p.status}</Badge>
        </div>

        {/* Title + teacher */}
        <div>
          <h3 className="text-[15px] font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-blue-700 transition-colors">
            {p.title}
          </h3>
          <div className="flex items-center gap-1.5 mt-2">
            <Avatar name={p.teacher} size="sm" className="w-5 h-5 text-[9px]" />
            <span className="text-xs text-gray-400">{p.teacher}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-gray-400">
            <span>İlerleme</span>
            <span className="font-medium text-gray-600">{p.progress}%</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all',
                p.progress === 100 ? 'bg-blue-500' : p.status === 'gecikiyor' ? 'bg-red-400' : 'bg-blue-500'
              )}
              style={{ width: `${p.progress}%` }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1 border-t border-gray-50 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <CalendarDays size={11} />
            {formatDate(p.endDate)}
          </span>
          <span className="flex items-center gap-1">
            <Users size={11} />
            {p.studentCount} öğrenci
            <ArrowRight size={11} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
          </span>
        </div>
      </div>
    </div>
  );
}
