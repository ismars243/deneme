import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, LogIn } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate('/dashboard'), 1200);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
            <GraduationCap size={32} className="text-blue-700" />
          </div>
          <h1 className="text-2xl font-bold text-white">Okul PT</h1>
          <p className="text-blue-200 text-sm mt-1">Proje Takip Sistemi</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Giriş Yap</h2>
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
              defaultValue="••••••••"
              required
            />
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600" defaultChecked />
                Beni hatırla
              </label>
              <button type="button" className="text-sm text-blue-600 hover:underline">
                Şifremi unuttum
              </button>
            </div>
            <Button type="submit" className="w-full mt-2" size="lg" loading={loading}>
              <LogIn size={16} />
              Giriş Yap
            </Button>
          </form>
        </div>

        <p className="text-center text-blue-300 text-xs mt-6">
          Atatürk Ortaokulu © 2024–2025
        </p>
      </div>
    </div>
  );
}
