import { useState } from 'react';
import { UserPlus, Mail, FolderKanban } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { InviteModal } from '../components/teachers/InviteModal';
import { teachers } from '../lib/mock-data';

export default function Teachers() {
  const [modal, setModal] = useState(false);

  return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Öğretmenler</h2>
          <p className="text-sm text-gray-400 mt-0.5">{teachers.length} öğretmen kayıtlı</p>
        </div>
        <Button onClick={() => setModal(true)}>
          <UserPlus size={15} />
          Davet Et
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {teachers.map(t => (
          <div key={t.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex items-start gap-4 hover:border-blue-200 transition-colors">
            <Avatar name={t.name} size="lg" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{t.subject}</p>
              <div className="flex items-center gap-1.5 mt-2">
                <Mail size={12} className="text-gray-300" />
                <span className="text-xs text-gray-400 truncate">{t.email}</span>
              </div>
              <div className="flex gap-4 mt-3 pt-3 border-t border-gray-50">
                <Stat label="Aktif" value={t.activeProjects} icon={<FolderKanban size={11} className="text-green-500" />} />
                <Stat label="Toplam" value={t.totalProjects} icon={<FolderKanban size={11} className="text-blue-400" />} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <InviteModal open={modal} onClose={() => setModal(false)} />
    </div>
  );
}

function Stat({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1 text-xs text-gray-500">
      {icon}
      <span className="font-semibold text-gray-700">{value}</span>
      <span>{label}</span>
    </div>
  );
}
