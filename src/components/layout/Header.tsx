import { Menu } from 'lucide-react';
import { Avatar } from '../ui/Avatar';

interface Props {
  title: string;
  onMenuClick: () => void;
}

export function Header({ title, onMenuClick }: Props) {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center px-4 gap-3 flex-shrink-0">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg text-gray-400 hover:bg-gray-50 transition-colors"
      >
        <Menu size={18} />
      </button>

      <h1 className="text-sm font-semibold text-gray-700 flex-1">{title}</h1>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-2 py-1.5 transition-colors">
          <Avatar name="Admin Kullanıcı" size="sm" />
          <span className="text-sm text-gray-600 hidden sm:block">Admin</span>
        </button>
      </div>
    </header>
  );
}
