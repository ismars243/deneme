import { useNavigate } from 'react-router-dom';
import { Clock, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { projects } from '../../lib/mock-data';
import { daysSinceUpdate, getStatusColor, formatDate } from '../../lib/utils';

export function RecentProjects() {
  const navigate = useNavigate();
  const stale = projects
    .filter(p => p.status !== 'tamamlandı' && daysSinceUpdate(p.lastUpdate) > 7)
    .sort((a, b) => daysSinceUpdate(b.lastUpdate) - daysSinceUpdate(a.lastUpdate));

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-amber-500" />
          <CardTitle>Son Güncellenmeyenler</CardTitle>
        </div>
        <span className="text-xs text-gray-400">7+ gün</span>
      </CardHeader>
      <CardContent className="p-0">
        {stale.length === 0 ? (
          <div className="px-5 py-8 text-center text-sm text-gray-400">Tüm projeler güncel.</div>
        ) : (
          <div className="divide-y divide-gray-50">
            {stale.map(p => (
              <button
                key={p.id}
                onClick={() => navigate(`/projeler/${p.id}`)}
                className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{p.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{p.teacher} · Son: {formatDate(p.lastUpdate)}</p>
                </div>
                <Badge className={getStatusColor(p.status)}>{p.status}</Badge>
                <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
