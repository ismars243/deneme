import { useNavigate } from 'react-router-dom';
import { FolderKanban, Users, Settings, TrendingUp, AlertTriangle, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { StatsCards } from '../components/dashboard/StatsCards';
import { ProjectChart } from '../components/dashboard/ProjectChart';
import { RecentProjects } from '../components/dashboard/RecentProjects';
import { projects, teachers } from '../lib/mock-data';

const active = projects.filter(p => p.status === 'aktif').length;
const late = projects.filter(p => p.status === 'gecikiyor').length;
const done = projects.filter(p => p.status === 'tamamlandı').length;

const quickNav = [
  {
    to: '/projeler',
    label: 'Projeler',
    desc: `${active} aktif · ${late} geciken`,
    icon: FolderKanban,
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    border: 'border-blue-200',
  },
  {
    to: '/ogretmenler',
    label: 'Öğretmenler',
    desc: `${teachers.length} kayıtlı öğretmen`,
    icon: Users,
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    border: 'border-emerald-200',
  },
  {
    to: '/ayarlar',
    label: 'Ayarlar',
    desc: 'Okul bilgileri ve profil',
    icon: Settings,
    bg: 'bg-slate-50',
    iconColor: 'text-slate-600',
    border: 'border-slate-200',
  },
];

const highlights = [
  { icon: TrendingUp, label: `${active} proje aktif`, color: 'text-blue-500' },
  { icon: AlertTriangle, label: `${late} proje gecikiyor`, color: 'text-red-500' },
  { icon: CheckCircle2, label: `${done} proje tamamlandı`, color: 'text-green-500' },
  { icon: Clock, label: `${projects.filter(p => p.status === 'beklemede').length} proje beklemede`, color: 'text-amber-500' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Günaydın' : hour < 18 ? 'İyi günler' : 'İyi akşamlar';
  const today = new Date().toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className="space-y-6 max-w-5xl">

      {/* Greeting */}
      <div>
        <p className="text-xs text-gray-400 mb-1">{today}</p>
        <h2 className="text-xl font-bold text-gray-900">{greeting}, Admin 👋</h2>
      </div>

      {/* Quick Navigation — ana menü kartları */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Hızlı Erişim</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {quickNav.map(({ to, label, desc, icon: Icon, bg, iconColor, border }) => (
            <button
              key={to}
              onClick={() => navigate(to)}
              className={`flex items-center gap-4 p-4 bg-white rounded-2xl border-2 ${border} shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-left group`}
            >
              <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <Icon size={22} className={iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm">{label}</p>
                <p className="text-xs text-gray-400 mt-0.5 truncate">{desc}</p>
              </div>
              <ArrowRight size={16} className="text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <StatsCards />

      {/* Chart + Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3">
          <ProjectChart />
        </div>
        <div className="lg:col-span-2">
          <RecentProjects />
        </div>
      </div>

    </div>
  );
}
