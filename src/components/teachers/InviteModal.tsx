import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input, Select } from '../ui/Input';
import { Button } from '../ui/Button';
import { useToast } from '../ui/Toast';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function InviteModal({ open, onClose }: Props) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
      toast('Davet e-postası gönderildi!', 'success');
    }, 900);
  }

  return (
    <Modal open={open} onClose={onClose} title="Öğretmen Davet Et" size="sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Ad Soyad" id="name" placeholder="Öğretmenin adı" required />
        <Input label="E-posta" id="email" type="email" placeholder="ornek@okul.edu.tr" required />
        <Select label="Branş" id="branch">
          <option value="">Branş seçin...</option>
          <option>Fen Bilimleri</option>
          <option>Matematik</option>
          <option>Türkçe</option>
          <option>Sosyal Bilgiler</option>
          <option>İngilizce</option>
          <option>Beden Eğitimi</option>
          <option>Müzik</option>
          <option>Görsel Sanatlar</option>
        </Select>
        <div className="flex gap-3 pt-1">
          <Button type="button" variant="outline" className="flex-1" onClick={onClose}>İptal</Button>
          <Button type="submit" className="flex-1" loading={loading}>Davet Gönder</Button>
        </div>
      </form>
    </Modal>
  );
}
