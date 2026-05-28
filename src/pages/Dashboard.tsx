import { StatsCards } from '../components/dashboard/StatsCards';
import { ProjectChart } from '../components/dashboard/ProjectChart';
import { RecentProjects } from '../components/dashboard/RecentProjects';

export default function Dashboard() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Günaydın' : hour < 18 ? 'İyi günler' : 'İyi akşamlar';
  const today = new Date().toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-400 mb-1">{today}</p>
          <h2 className="text-xl font-bold text-gray-900">{greeting}, Admin 👋</h2>
        </div>
      </div>

      <StatsCards />

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
