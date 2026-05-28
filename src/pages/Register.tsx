import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Wallet } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await register(name, email, password);
    navigate('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-600 to-indigo-800 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-8">
        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
          <Wallet size={30} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">Finova</h1>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-t-[2.5rem] px-6 pt-8 pb-10 shadow-2xl">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">Hesap Oluştur</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <Input label="Ad Soyad" id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Ahmet Yılmaz" icon={<User size={16} />} required />
          <Input label="E-posta" id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="ornek@finova.app" icon={<Mail size={16} />} required />
          <Input label="Şifre" id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="En az 6 karakter" icon={<Lock size={16} />} required />
          <Button type="submit" full size="xl" loading={loading}>Kayıt Ol</Button>
        </form>
        <p className="text-center text-sm text-muted">
          Hesabın var mı?{' '}
          <button onClick={() => navigate('/login')} className="text-primary-600 dark:text-primary-400 font-semibold">Giriş Yap</button>
        </p>
      </div>
    </div>
  );
}
