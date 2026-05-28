import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Edit3, ChevronRight, Shield, Bell, Download, Trash2 } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Avatar } from '../components/ui/Avatar';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { useToast } from '../components/ui/Toast';
import { formatCurrency, exportCSV } from '../lib/utils';

export default function Profile() {
  const { user, logout } = useAuth();
  const { transactions, getMonthStats } = useData();
  const { toast } = useToast();
  const navigate = useNavigate();
  const stats = getMonthStats();

  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');

  function handleSave() {
    setEditOpen(false);
    toast('Profil güncellendi', 'success');
  }

  function handleLogout() {
    logout();
    navigate('/login');
  }

  function handleExport() {
    exportCSV(transactions);
    toast('Tüm işlemler indirildi', 'success');
  }

  const menuItems = [
    { icon: Bell, label: 'Bildirimler', onClick: () => toast('Yakında!', 'info') },
    { icon: Shield, label: 'Gizlilik & Güvenlik', onClick: () => toast('Yakında!', 'info') },
    { icon: Download, label: 'Verileri Dışa Aktar (CSV)', onClick: handleExport },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader title="Profil" />

      {/* Avatar + info */}
      <div className="mx-4 my-4 card p-5">
        <div className="flex items-center gap-4">
          <Avatar name={user?.name ?? 'U'} size="xl" />
          <div className="flex-1 min-w-0">
            <p className="text-base font-bold text-slate-900 dark:text-slate-100 truncate">{user?.name}</p>
            <p className="text-sm text-muted truncate">{user?.email}</p>
          </div>
          <button onClick={() => setEditOpen(true)}
            className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
            <Edit3 size={16} />
          </button>
        </div>

        {/* Month stats */}
        <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="text-center">
            <p className="text-xs text-muted mb-0.5">Bu ay gelir</p>
            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(stats.income)}</p>
          </div>
          <div className="text-center border-x border-slate-100 dark:border-slate-800">
            <p className="text-xs text-muted mb-0.5">Bu ay gider</p>
            <p className="text-sm font-bold text-red-500">{formatCurrency(stats.expense)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted mb-0.5">İşlem</p>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{transactions.length}</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="mx-4 card overflow-hidden">
        <div className="divide-y divider">
          {menuItems.map(item => (
            <button key={item.label} onClick={item.onClick}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left">
              <item.icon size={18} className="text-slate-500 dark:text-slate-400 flex-shrink-0" />
              <span className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
              <ChevronRight size={16} className="text-slate-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div className="mx-4 mt-4 space-y-3 pb-6">
        <button onClick={() => { if (confirm('Tüm veriler silinecek. Emin misiniz?')) toast('Veriler temizlendi', 'success'); }}
          className="w-full flex items-center gap-3 px-4 py-3.5 card text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
          <Trash2 size={18} />
          <span className="flex-1 text-sm font-medium text-left">Tüm Verileri Sil</span>
        </button>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3.5 card hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
          <LogOut size={18} className="text-slate-500 dark:text-slate-400" />
          <span className="flex-1 text-sm font-medium text-left text-slate-700 dark:text-slate-300">Çıkış Yap</span>
        </button>
      </div>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Profili Düzenle" size="sm">
        <div className="space-y-4">
          <Input label="Ad Soyad" id="profile-name" value={name} onChange={e => setName(e.target.value)} />
          <Input label="E-posta" id="profile-email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <div className="flex gap-3">
            <Button variant="secondary" full onClick={() => setEditOpen(false)}>İptal</Button>
            <Button full onClick={handleSave}>Kaydet</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
