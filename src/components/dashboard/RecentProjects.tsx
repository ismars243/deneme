import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { projects } from '../../lib/mock-data';
import { daysSinceUpdate, getStatusColor } from '../../lib/utils';

export function RecentProjects() {
  const navigate = useNavigate();
  const stale = projects
    .filter(p => p.status !== 'tamamlandı' && daysSinceUpdate(p.lastUpdate) > 7)
    .sort((a, b) => daysSinceUpdate(b.lastUpdate) - daysSinceUpdate(a.lastUpdate));

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-1.5">
          <Clock size={14} className="text-amber-400" />
          <CardTitle>Uzun Süredir Bekleyenler</CardTitle>
        </div>
        <span className="text-xs text-gray-300">7+ gün</span>
      </CardHeader>
      <CardContent className="p-0">
        {stale.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-gray-300">
            Tüm projeler güncel ✓
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {stale.map(p => (
              <button
                key={p.id}
                onClick={() => navigate(`/projeler/${p.id}`)}
                className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors text-left"
              >
                <Avatar name={p.teacher} size="sm" className="flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{p.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{p.teacher}</p>
                </div>
                <Badge className={getStatusColor(p.status)}>{p.status}</Badge>
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
