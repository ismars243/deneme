import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Wallet } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ui/Toast';

export default function Login() {
  const { login, loginGoogle, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('ahmet@finova.app');
  const [password, setPassword] = useState('123456');
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<{email?:string;password?:string}>({});

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email) { setErrors({ email: 'E-posta gerekli' }); return; }
    if (!password) { setErrors({ password: 'Şifre gerekli' }); return; }
    setErrors({});
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch { toast('Giriş başarısız', 'error'); }
  }

  async function handleGoogle() {
    await loginGoogle();
    navigate('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-600 to-indigo-800 flex flex-col">
      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-8">
        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-6 shadow-xl">
          <Wallet size={38} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-1">Finova</h1>
        <p className="text-white/70 text-sm">Paranızı akıllıca yönetin</p>
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-slate-900 rounded-t-[2.5rem] px-6 pt-8 pb-10 shadow-2xl">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">Giriş Yap</h2>

        <form onSubmit={handleLogin} className="space-y-4 mb-5">
          <Input
            label="E-posta"
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="ornek@finova.app"
            icon={<Mail size={16} />}
            error={errors.email}
          />
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Şifre</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="input-base pl-10 pr-10"
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShowPw(v => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
          </div>
          <div className="text-right">
            <button type="button" className="text-xs text-primary-600 dark:text-primary-400 font-medium">
              Şifremi Unuttum
            </button>
          </div>
          <Button type="submit" full size="xl" loading={loading}>Giriş Yap</Button>
        </form>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
          <span className="text-xs text-muted">veya</span>
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
        </div>

        <button onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm active:scale-95 transition-all hover:bg-slate-50 dark:hover:bg-slate-800 mb-6">
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 002.38-5.88c0-.57-.05-.66-.15-1.18z"/>
            <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 01-7.18-2.54H1.83v2.07A8 8 0 008.98 17z"/>
            <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 010-3.04V5.41H1.83a8 8 0 000 7.18l2.67-2.07z"/>
            <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 001.83 5.4L4.5 7.49a4.77 4.77 0 014.48-3.31z"/>
          </svg>
          Google ile Giriş Yap
        </button>

        <p className="text-center text-sm text-muted">
          Hesabın yok mu?{' '}
          <button onClick={() => navigate('/register')} className="text-primary-600 dark:text-primary-400 font-semibold">
            Kayıt Ol
          </button>
        </p>
      </div>
    </div>
  );
}
