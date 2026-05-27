import { useState } from 'react';
import { Search, SlidersHorizontal, LayoutGrid, List, Plus } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ProjectCard } from '../components/projects/ProjectCard';
import { NewProjectModal } from '../components/projects/NewProjectModal';
import { projects } from '../lib/mock-data';
import { Skeleton } from '../components/ui/Skeleton';
import { Badge } from '../components/ui/Badge';
import { getStatusColor, getTypeColor } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

export default function Projects() {
  const [modal, setModal] = useState(false);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const navigate = useNavigate();

  return (
    <div className="space-y-5 max-w-5xl">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Proje ara..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filters row */}
        <div className="flex gap-2 flex-wrap">
          <select className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Tüm türler</option>
            <option>TÜBİTAK 4006</option>
            <option>eTwinning</option>
            <option>Bilim Fuarı</option>
            <option>Sosyal Sorumluluk</option>
            <option>ERASMUS+</option>
          </select>
          <select className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Tüm durumlar</option>
            <option>aktif</option>
            <option>tamamlandı</option>
            <option>gecikiyor</option>
            <option>beklemede</option>
          </select>
          <select className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Tüm öğretmenler</option>
            <option>Ayşe Kaya</option>
            <option>Mehmet Demir</option>
            <option>Fatma Şahin</option>
            <option>Ali Yılmaz</option>
          </select>
          <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden">
            <button
              onClick={() => setView('grid')}
              className={`p-2 transition-colors ${view === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:bg-gray-50'}`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 transition-colors ${view === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:bg-gray-50'}`}
            >
              <List size={16} />
            </button>
          </div>
          <Button onClick={() => setModal(true)} size="md">
            <Plus size={15} />
            Yeni Proje
          </Button>
        </div>
      </div>

      {/* Count */}
      <p className="text-sm text-gray-500">{projects.length} proje listeleniyor</p>

      {/* Grid view */}
      {view === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(p => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}

      {/* List view */}
      {view === 'list' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Proje</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Tür</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Durum</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Öğretmen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {projects.map(p => (
                <tr
                  key={p.id}
                  onClick={() => navigate(`/projeler/${p.id}`)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-gray-900 line-clamp-1">{p.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{p.progress}% tamamlandı</p>
                  </td>
                  <td className="px-4 py-3.5 hidden md:table-cell">
                    <Badge className={getTypeColor(p.type)}>{p.type}</Badge>
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge className={getStatusColor(p.status)}>{p.status}</Badge>
                  </td>
                  <td className="px-4 py-3.5 text-gray-600 hidden sm:table-cell">{p.teacher}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <NewProjectModal open={modal} onClose={() => setModal(false)} />
    </div>
  );
}
