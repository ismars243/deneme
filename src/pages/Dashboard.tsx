import { StatsCards } from '../components/dashboard/StatsCards';
import { ProjectChart } from '../components/dashboard/ProjectChart';
import { RecentProjects } from '../components/dashboard/RecentProjects';

export default function Dashboard() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Günaydın' : hour < 18 ? 'İyi günler' : 'İyi akşamlar';

  return (
    <div className="space-y-5 max-w-5xl">
      <div>
        <h2 className="text-xl font-bold text-gray-900">{greeting}, Admin 👋</h2>
        <p className="text-sm text-gray-500 mt-0.5">İşte projelerin son durumu.</p>
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
