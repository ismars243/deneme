import { FolderKanban, PlayCircle, CheckCircle2, AlertTriangle } from 'lucide-react';
import { projects } from '../../lib/mock-data';

export function StatsCards() {
  const total = projects.length;
  const active = projects.filter(p => p.status === 'aktif').length;
  const done = projects.filter(p => p.status === 'tamamlandı').length;
  const late = projects.filter(p => p.status === 'gecikiyor').length;

  const stats = [
    { label: 'Toplam Proje', value: total, icon: FolderKanban, color: 'bg-blue-50 text-blue-600', border: 'border-blue-100' },
    { label: 'Aktif', value: active, icon: PlayCircle, color: 'bg-green-50 text-green-600', border: 'border-green-100' },
    { label: 'Tamamlanmış', value: done, icon: CheckCircle2, color: 'bg-indigo-50 text-indigo-600', border: 'border-indigo-100' },
    { label: 'Geciken', value: late, icon: AlertTriangle, color: 'bg-red-50 text-red-600', border: 'border-red-100' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ label, value, icon: Icon, color, border }) => (
        <div key={label} className={`bg-white rounded-xl border ${border} shadow-sm p-5 flex items-center gap-4`}>
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
            <Icon size={22} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
