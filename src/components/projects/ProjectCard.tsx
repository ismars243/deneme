import { useNavigate } from 'react-router-dom';
import { Users, CalendarDays, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Progress } from '../ui/Progress';
import { Avatar } from '../ui/Avatar';
import { formatDate, getStatusColor, getTypeColor } from '../../lib/utils';
import type { Project } from '../../lib/mock-data';

export function ProjectCard({ project: p }: { project: Project }) {
  const navigate = useNavigate();
  return (
    <Card
      className="cursor-pointer hover:shadow-md hover:border-blue-200 transition-all group"
      onClick={() => navigate(`/projeler/${p.id}`)}
    >
      <CardContent className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            <Badge className={getTypeColor(p.type)}>{p.type}</Badge>
            <Badge className={getStatusColor(p.status)}>{p.status}</Badge>
          </div>
          <ChevronRight size={16} className="text-gray-300 group-hover:text-blue-400 transition-colors flex-shrink-0 mt-0.5" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-blue-700 transition-colors">
            {p.title}
          </h3>
          <p className="text-xs text-gray-400 mt-1 line-clamp-2">{p.description}</p>
        </div>

        <Progress value={p.progress} showLabel />

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <Avatar name={p.teacher} size="sm" />
            <span className="text-xs text-gray-600">{p.teacher}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Users size={11} />
              {p.studentCount}
            </span>
            <span className="flex items-center gap-1">
              <CalendarDays size={11} />
              {formatDate(p.endDate).replace(' ', ' ')}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
