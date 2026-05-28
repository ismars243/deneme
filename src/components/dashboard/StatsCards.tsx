import { FolderKanban, PlayCircle, CheckCircle2, AlertTriangle } from 'lucide-react';
import { projects } from '../../lib/mock-data';

export function StatsCards() {
  const total = projects.length;
  const active = projects.filter(p => p.status === 'aktif').length;
  const done = projects.filter(p => p.status === 'tamamlandı').length;
  const late = projects.filter(p => p.status === 'gecikiyor').length;

  const stats = [
    { label: 'Toplam Proje', value: total, icon: FolderKanban, accent: 'border-l-blue-500', iconColor: 'text-blue-400' },
    { label: 'Aktif', value: active, icon: PlayCircle, accent: 'border-l-green-500', iconColor: 'text-green-400' },
    { label: 'Tamamlanmış', value: done, icon: CheckCircle2, accent: 'border-l-indigo-500', iconColor: 'text-indigo-400' },
    { label: 'Geciken', value: late, icon: AlertTriangle, accent: 'border-l-red-500', iconColor: 'text-red-400' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ label, value, icon: Icon, accent, iconColor }) => (
        <div
          key={label}
          className={`bg-white rounded-xl border-2 border-gray-200 border-l-4 ${accent} shadow-sm px-5 py-4`}
        >
          <div className="flex items-start justify-between">
            <p className="text-3xl font-bold text-gray-900 leading-none">{value}</p>
            <Icon size={18} className={iconColor} />
          </div>
          <p className="text-xs text-gray-400 mt-2">{label}</p>
        </div>
      ))}
    </div>
  );
}
