import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate('/dashboard'), 1000);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 bg-blue-900 flex-col items-center justify-center p-12">
        <div className="max-w-xs text-center space-y-6">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto">
            <GraduationCap size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Okul PT</h1>
            <p className="text-blue-300 mt-2 leading-relaxed">
              Proje süreçlerinizi tek ekranda yönetin.
            </p>
          </div>
          <div className="space-y-3 text-left">
            {['6 proje türü desteği', 'Öğretmen yönetimi', 'Milestone takibi', 'Aktivite geçmişi'].map(f => (
              <div key={f} className="flex items-center gap-2.5 text-sm text-blue-200">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-900 rounded-xl mb-3">
              <GraduationCap size={24} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Okul PT</h1>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Hoş geldiniz</h2>
            <p className="text-sm text-gray-400 mb-6">Devam etmek için giriş yapın</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="E-posta"
                id="email"
                type="email"
                placeholder="admin@okul.edu.tr"
                defaultValue="admin@okul.edu.tr"
                required
              />
              <Input
                label="Şifre"
                id="password"
                type="password"
                placeholder="••••••••"
                defaultValue="password"
                required
              />
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600" defaultChecked />
                  Beni hatırla
                </label>
                <button type="button" className="text-sm text-blue-600 hover:underline">
                  Şifremi unuttum
                </button>
              </div>
              <Button type="submit" className="w-full" size="lg" loading={loading}>
                Giriş Yap
              </Button>
            </form>
          </div>

          <p className="text-center text-gray-300 text-xs mt-6">
            Atatürk Ortaokulu © 2024–2025
          </p>
        </div>
      </div>
    </div>
  );
}
