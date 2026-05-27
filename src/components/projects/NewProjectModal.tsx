import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input, Select, Textarea } from '../ui/Input';
import { Button } from '../ui/Button';
import { useToast } from '../ui/Toast';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function NewProjectModal({ open, onClose }: Props) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
      toast('Proje başarıyla oluşturuldu!', 'success');
    }, 1000);
  }

  return (
    <Modal open={open} onClose={onClose} title="Yeni Proje Ekle" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Proje Adı" id="title" placeholder="Proje başlığını girin" required />
        <Select label="Proje Türü" id="type">
          <option value="">Tür seçin...</option>
          <option>TÜBİTAK 4006</option>
          <option>eTwinning</option>
          <option>Bilim Fuarı</option>
          <option>Sosyal Sorumluluk</option>
          <option>ERASMUS+</option>
        </Select>
        <Select label="Sorumlu Öğretmen" id="teacher">
          <option value="">Öğretmen seçin...</option>
          <option>Ayşe Kaya</option>
          <option>Mehmet Demir</option>
          <option>Fatma Şahin</option>
          <option>Ali Yılmaz</option>
        </Select>
        <div className="grid grid-cols-2 gap-3">
          <Input label="Başlangıç Tarihi" id="start" type="date" required />
          <Input label="Bitiş Tarihi" id="end" type="date" required />
        </div>
        <Input label="Öğrenci Sayısı" id="students" type="number" min="1" placeholder="0" />
        <Textarea label="Proje Açıklaması" id="desc" placeholder="Kısa açıklama..." rows={3} />
        <div className="flex gap-3 pt-1">
          <Button type="button" variant="outline" className="flex-1" onClick={onClose}>İptal</Button>
          <Button type="submit" className="flex-1" loading={loading}>Oluştur</Button>
        </div>
      </form>
    </Modal>
  );
}
