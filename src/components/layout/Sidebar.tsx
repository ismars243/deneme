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
      {/* Backdrop (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside className={cn(
        'fixed top-0 left-0 h-full w-60 bg-blue-900 flex flex-col z-40 transition-transform duration-300',
        'lg:translate-x-0 lg:relative lg:flex',
        open ? 'translate-x-0' : '-translate-x-full'
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-blue-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <GraduationCap size={18} className="text-blue-700" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-tight">Okul PT</p>
              <p className="text-blue-300 text-xs">Proje Takip</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-blue-300 hover:text-white p-1">
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) => cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-200 hover:bg-blue-800 hover:text-white'
              )}
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-blue-800">
          <p className="text-blue-400 text-xs">Atatürk Ortaokulu</p>
          <p className="text-blue-300 text-xs">2024–2025 Öğretim Yılı</p>
        </div>
      </aside>
    </>
  );
}
