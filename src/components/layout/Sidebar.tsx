import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Users, Settings, GraduationCap, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/projeler', label: 'Projeler', icon: FolderKanban },
  { to: '/ogretmenler', label: 'Öğretmenler', icon: Users },
  { to: '/ayarlar', label: 'Ayarlar', icon: Settings },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: Props) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/30 z-30 lg:hidden backdrop-blur-sm" onClick={onClose} />
      )}

      <aside className={cn(
        'fixed top-0 left-0 h-full w-56 bg-white border-r border-gray-200 flex flex-col z-40 transition-transform duration-300',
        'lg:translate-x-0 lg:relative lg:flex',
        open ? 'translate-x-0' : '-translate-x-full'
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <GraduationCap size={17} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm leading-tight">Okul PT</p>
              <p className="text-gray-400 text-xs">Proje Takip</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-gray-600 p-1">
            <X size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) => cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              )}
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-100">
          <p className="text-xs font-medium text-gray-500">Atatürk Ortaokulu</p>
          <p className="text-xs text-gray-300 mt-0.5">2024–2025 Öğretim Yılı</p>
        </div>
      </aside>
    </>
  );
}
