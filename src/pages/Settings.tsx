import { useState } from 'react';
import { Save, School } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input, Select, Textarea } from '../components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { useToast } from '../components/ui/Toast';

export default function Settings() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast('Ayarlar kaydedildi!', 'success');
    }, 800);
  }

  return (
    <div className="space-y-5 max-w-2xl">
      <div className="flex items-center gap-2">
        <School size={18} className="text-gray-400" />
        <h2 className="text-base font-semibold text-gray-900">Okul Ayarları</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Card>
          <CardHeader>
            <CardTitle>Okul Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Okul Adı" id="school-name" defaultValue="Atatürk Ortaokulu" />
            <div className="grid grid-cols-2 gap-3">
              <Input label="İl" id="city" defaultValue="İstanbul" />
              <Input label="İlçe" id="district" defaultValue="Kadıköy" />
            </div>
            <Input label="MEB Okul Kodu" id="meb-code" defaultValue="340201042" />
            <Textarea label="Adres" id="address" defaultValue="Moda Cad. No:12 Kadıköy / İstanbul" rows={2} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>İletişim</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Okul Müdürü" id="principal" defaultValue="Hasan Çelik" />
            <Input label="Telefon" id="phone" type="tel" defaultValue="0216 555 00 00" />
            <Input label="E-posta" id="email" type="email" defaultValue="info@ataturkortaokulu.edu.tr" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sistem Ayarları</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select label="Öğretim Yılı" id="year">
              <option>2024–2025</option>
              <option>2025–2026</option>
            </Select>
            <Select label="Bildirim Dili" id="lang">
              <option>Türkçe</option>
              <option>İngilizce</option>
            </Select>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="notif" className="w-4 h-4 rounded border-gray-300 text-blue-600" defaultChecked />
              <label htmlFor="notif" className="text-sm text-gray-700">E-posta bildirimleri aktif</label>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" loading={loading} size="lg">
            <Save size={15} />
            Kaydet
          </Button>
        </div>
      </form>
    </div>
  );
}
