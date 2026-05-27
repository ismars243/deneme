import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, CalendarDays, Users, BarChart2,
  Flag, Images, MessageSquare, History
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Progress } from '../components/ui/Progress';
import { Avatar } from '../components/ui/Avatar';
import { Tabs } from '../components/ui/Tabs';
import { MilestoneList } from '../components/project-detail/MilestoneList';
import { PhotoGallery } from '../components/project-detail/PhotoGallery';
import { Comments } from '../components/project-detail/Comments';
import { ActivityLog } from '../components/project-detail/ActivityLog';
import { projects } from '../lib/mock-data';
import { formatDate, getStatusColor, getTypeColor } from '../lib/utils';

const tabs = [
  { key: 'milestones', label: 'Aşamalar', icon: <Flag size={14} /> },
  { key: 'gallery', label: 'Galeri', icon: <Images size={14} /> },
  { key: 'comments', label: 'Yorumlar', icon: <MessageSquare size={14} /> },
  { key: 'activity', label: 'Aktivite', icon: <History size={14} /> },
];

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="text-center py-24">
        <p className="text-gray-400 text-sm">Proje bulunamadı.</p>
        <button onClick={() => navigate('/projeler')} className="text-blue-600 text-sm mt-2 hover:underline">
          Projelere dön
        </button>
      </div>
    );
  }

  const p = project;

  return (
    <div className="space-y-5 max-w-3xl">
      {/* Back */}
      <button
        onClick={() => navigate('/projeler')}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft size={15} />
        Projelere dön
      </button>

      {/* Header card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className={getTypeColor(p.type)}>{p.type}</Badge>
          <Badge className={getStatusColor(p.status)}>{p.status}</Badge>
        </div>

        <h2 className="text-xl font-bold text-gray-900 leading-snug">{p.title}</h2>
        <p className="text-sm text-gray-500 leading-relaxed">{p.description}</p>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>İlerleme</span>
            <span className="font-medium text-gray-700">{p.progress}%</span>
          </div>
          <Progress value={p.progress} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
          <InfoItem icon={<CalendarDays size={14} />} label="Başlangıç" value={formatDate(p.startDate)} />
          <InfoItem icon={<CalendarDays size={14} />} label="Bitiş" value={formatDate(p.endDate)} />
          <InfoItem icon={<Users size={14} />} label="Öğrenci" value={`${p.studentCount} kişi`} />
          <InfoItem icon={<BarChart2 size={14} />} label="Milestone" value={`${p.milestones.filter(m => m.completed).length}/${p.milestones.length}`} />
        </div>

        <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
          <Avatar name={p.teacher} size="sm" />
          <div>
            <p className="text-sm font-medium text-gray-900">{p.teacher}</p>
            <p className="text-xs text-gray-400">Proje Sorumlusu</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <Tabs tabs={tabs}>
          {(key) => (
            <>
              {key === 'milestones' && <MilestoneList milestones={p.milestones} />}
              {key === 'gallery' && <PhotoGallery photos={p.photos} />}
              {key === 'comments' && <Comments comments={p.comments} />}
              {key === 'activity' && <ActivityLog activities={p.activities} />}
            </>
          )}
        </Tabs>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center gap-1 text-xs text-gray-400">
        {icon}
        {label}
      </div>
      <p className="text-sm font-medium text-gray-800">{value}</p>
    </div>
  );
}
