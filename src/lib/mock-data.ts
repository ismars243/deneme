export type ProjectType = 'TÜBİTAK 4006' | 'eTwinning' | 'Bilim Fuarı' | 'Sosyal Sorumluluk' | 'ERASMUS+';
export type ProjectStatus = 'aktif' | 'tamamlandı' | 'gecikiyor' | 'beklemede';

export interface Milestone {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

export interface Comment {
  id: string;
  author: string;
  role: string;
  content: string;
  date: string;
}

export interface Activity {
  id: string;
  action: string;
  user: string;
  date: string;
  type: 'update' | 'comment' | 'milestone' | 'create' | 'file';
}

export interface Project {
  id: string;
  title: string;
  type: ProjectType;
  status: ProjectStatus;
  teacher: string;
  teacherId: string;
  startDate: string;
  endDate: string;
  description: string;
  progress: number;
  milestones: Milestone[];
  comments: Comment[];
  activities: Activity[];
  photos: string[];
  lastUpdate: string;
  studentCount: number;
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  email: string;
  activeProjects: number;
  totalProjects: number;
}

export const teachers: Teacher[] = [
  { id: 't1', name: 'Ayşe Kaya', subject: 'Fen Bilimleri', email: 'ayse.kaya@okul.edu.tr', activeProjects: 2, totalProjects: 5 },
  { id: 't2', name: 'Mehmet Demir', subject: 'Matematik', email: 'mehmet.demir@okul.edu.tr', activeProjects: 2, totalProjects: 4 },
  { id: 't3', name: 'Fatma Şahin', subject: 'Türkçe', email: 'fatma.sahin@okul.edu.tr', activeProjects: 1, totalProjects: 3 },
  { id: 't4', name: 'Ali Yılmaz', subject: 'Sosyal Bilgiler', email: 'ali.yilmaz@okul.edu.tr', activeProjects: 0, totalProjects: 3 },
];

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Yenilenebilir Enerji Kaynakları',
    type: 'TÜBİTAK 4006',
    status: 'aktif',
    teacher: 'Ayşe Kaya',
    teacherId: 't1',
    startDate: '2024-09-01',
    endDate: '2025-03-15',
    description: 'Güneş ve rüzgar enerjisi kullanarak okul bahçesinde küçük ölçekli enerji üretim modeli oluşturma projesi.',
    progress: 65,
    lastUpdate: '2025-01-10',
    studentCount: 8,
    milestones: [
      { id: 'm1', title: 'Literatür taraması tamamlandı', dueDate: '2024-10-01', completed: true },
      { id: 'm2', title: 'Deney düzeneği kurulumu', dueDate: '2024-11-15', completed: true },
      { id: 'm3', title: 'Veri toplama aşaması', dueDate: '2025-01-30', completed: false },
    ],
    comments: [
      { id: 'c1', author: 'Ayşe Kaya', role: 'Proje Yöneticisi', content: 'Deney sonuçları beklentilerin üzerinde, harika ilerliyoruz!', date: '2025-01-08' },
      { id: 'c2', author: 'Müdür Yardımcısı', role: 'İdare', content: 'TÜBİTAK ile yazışmalar tamamlandı, onay bekleniyor.', date: '2025-01-05' },
    ],
    activities: [
      { id: 'a1', action: 'Proje oluşturuldu', user: 'Admin', date: '2024-09-01', type: 'create' },
      { id: 'a2', action: 'Milestone tamamlandı: Deney düzeneği kurulumu', user: 'Ayşe Kaya', date: '2024-11-15', type: 'milestone' },
      { id: 'a3', action: 'Yorum eklendi', user: 'Ayşe Kaya', date: '2025-01-08', type: 'comment' },
      { id: 'a4', action: 'Proje güncellendi', user: 'Admin', date: '2025-01-10', type: 'update' },
    ],
    photos: [
      'https://picsum.photos/seed/p1a/600/400',
      'https://picsum.photos/seed/p1b/600/400',
      'https://picsum.photos/seed/p1c/600/400',
    ],
  },
  {
    id: 'p2',
    title: 'Dijital Kütüphane Projesi',
    type: 'eTwinning',
    status: 'aktif',
    teacher: 'Fatma Şahin',
    teacherId: 't3',
    startDate: '2024-10-01',
    endDate: '2025-05-30',
    description: 'Avrupa\'daki partner okullarla ortak dijital kütüphane platformu oluşturma ve kültürel eser paylaşımı projesi.',
    progress: 40,
    lastUpdate: '2025-01-03',
    studentCount: 12,
    milestones: [
      { id: 'm1', title: 'Partner okul iletişimi sağlandı', dueDate: '2024-10-20', completed: true },
      { id: 'm2', title: 'İçerik toplama tamamlandı', dueDate: '2024-12-01', completed: false },
      { id: 'm3', title: 'Platform entegrasyonu', dueDate: '2025-02-28', completed: false },
    ],
    comments: [
      { id: 'c1', author: 'Fatma Şahin', role: 'Proje Yöneticisi', content: 'Partner okuldan olumlu dönüş aldık.', date: '2025-01-03' },
    ],
    activities: [
      { id: 'a1', action: 'Proje oluşturuldu', user: 'Admin', date: '2024-10-01', type: 'create' },
      { id: 'a2', action: 'Milestone tamamlandı: Partner okul iletişimi', user: 'Fatma Şahin', date: '2024-10-20', type: 'milestone' },
    ],
    photos: [
      'https://picsum.photos/seed/p2a/600/400',
      'https://picsum.photos/seed/p2b/600/400',
    ],
  },
  {
    id: 'p3',
    title: 'Bilim Şenliği 2024',
    type: 'Bilim Fuarı',
    status: 'tamamlandı',
    teacher: 'Ayşe Kaya',
    teacherId: 't1',
    startDate: '2024-06-01',
    endDate: '2024-09-30',
    description: 'Okul genelinde düzenlenen bilim şenliği kapsamında öğrencilerin bilimsel proje geliştirme ve sergileme etkinliği.',
    progress: 100,
    lastUpdate: '2024-09-30',
    studentCount: 25,
    milestones: [
      { id: 'm1', title: 'Proje başvuruları toplandı', dueDate: '2024-06-30', completed: true },
      { id: 'm2', title: 'Jüri değerlendirmesi', dueDate: '2024-08-15', completed: true },
      { id: 'm3', title: 'Sergi ve ödül töreni', dueDate: '2024-09-28', completed: true },
    ],
    comments: [
      { id: 'c1', author: 'Okul Müdürü', role: 'İdare', content: '35 proje ile rekor kırıldı. Emeği geçen herkese teşekkür.', date: '2024-09-30' },
    ],
    activities: [
      { id: 'a1', action: 'Proje oluşturuldu', user: 'Admin', date: '2024-06-01', type: 'create' },
      { id: 'a2', action: 'Tüm milestone\'lar tamamlandı', user: 'Ayşe Kaya', date: '2024-09-28', type: 'milestone' },
      { id: 'a3', action: 'Proje tamamlandı olarak işaretlendi', user: 'Admin', date: '2024-09-30', type: 'update' },
    ],
    photos: [
      'https://picsum.photos/seed/p3a/600/400',
      'https://picsum.photos/seed/p3b/600/400',
      'https://picsum.photos/seed/p3c/600/400',
      'https://picsum.photos/seed/p3d/600/400',
    ],
  },
  {
    id: 'p4',
    title: 'Çevre Temizliği Kampanyası',
    type: 'Sosyal Sorumluluk',
    status: 'gecikiyor',
    teacher: 'Ali Yılmaz',
    teacherId: 't4',
    startDate: '2024-08-01',
    endDate: '2024-12-31',
    description: 'Okul çevresi ve mahalle parkındaki temizlik kampanyası ile gençlerde çevre bilinci oluşturma projesi.',
    progress: 30,
    lastUpdate: '2024-11-20',
    studentCount: 15,
    milestones: [
      { id: 'm1', title: 'Bilinçlendirme atölyeleri', dueDate: '2024-09-15', completed: true },
      { id: 'm2', title: 'Saha temizlik etkinliği', dueDate: '2024-11-01', completed: false },
      { id: 'm3', title: 'Belgesel hazırlandı', dueDate: '2024-12-15', completed: false },
    ],
    comments: [
      { id: 'c1', author: 'Ali Yılmaz', role: 'Proje Yöneticisi', content: 'Hava koşulları nedeniyle saha etkinliği ertelendi.', date: '2024-11-20' },
    ],
    activities: [
      { id: 'a1', action: 'Proje oluşturuldu', user: 'Admin', date: '2024-08-01', type: 'create' },
      { id: 'a2', action: 'Durum güncellendi: gecikiyor', user: 'Admin', date: '2024-11-10', type: 'update' },
    ],
    photos: [
      'https://picsum.photos/seed/p4a/600/400',
    ],
  },
  {
    id: 'p5',
    title: 'Avrupa ile Köprüler',
    type: 'ERASMUS+',
    status: 'aktif',
    teacher: 'Mehmet Demir',
    teacherId: 't2',
    startDate: '2024-11-01',
    endDate: '2026-04-30',
    description: 'Polonya, Portekiz ve Türkiye okulları arasında matematik eğitimi üzerine işbirliği ve öğrenci değişim programı.',
    progress: 55,
    lastUpdate: '2025-01-12',
    studentCount: 6,
    milestones: [
      { id: 'm1', title: 'Ortak müfredat oluşturuldu', dueDate: '2024-12-01', completed: true },
      { id: 'm2', title: 'İlk değişim programı (Polonya)', dueDate: '2025-03-01', completed: false },
      { id: 'm3', title: 'Ara rapor teslimi', dueDate: '2025-06-01', completed: false },
    ],
    comments: [
      { id: 'c1', author: 'Mehmet Demir', role: 'Proje Koordinatörü', content: 'Polonya ortağımız vize sürecine başladı.', date: '2025-01-12' },
    ],
    activities: [
      { id: 'a1', action: 'Proje oluşturuldu', user: 'Admin', date: '2024-11-01', type: 'create' },
      { id: 'a2', action: 'Dosya yüklendi: ortak_müfredat_v2.pdf', user: 'Mehmet Demir', date: '2024-12-01', type: 'file' },
      { id: 'a3', action: 'Milestone tamamlandı: Ortak müfredat', user: 'Mehmet Demir', date: '2024-12-01', type: 'milestone' },
    ],
    photos: [
      'https://picsum.photos/seed/p5a/600/400',
      'https://picsum.photos/seed/p5b/600/400',
    ],
  },
  {
    id: 'p6',
    title: 'Matematik Olimpiyat Hazırlık',
    type: 'TÜBİTAK 4006',
    status: 'beklemede',
    teacher: 'Mehmet Demir',
    teacherId: 't2',
    startDate: '2025-02-01',
    endDate: '2025-11-30',
    description: 'Seçilen öğrencilerin ulusal matematik olimpiyatlarına hazırlanması için yoğunlaştırılmış çalışma programı.',
    progress: 10,
    lastUpdate: '2024-12-15',
    studentCount: 4,
    milestones: [
      { id: 'm1', title: 'Öğrenci seçimi yapılacak', dueDate: '2025-02-15', completed: false },
      { id: 'm2', title: 'Çalışma programı hazırlanacak', dueDate: '2025-03-01', completed: false },
    ],
    comments: [],
    activities: [
      { id: 'a1', action: 'Proje taslağı oluşturuldu', user: 'Mehmet Demir', date: '2024-12-15', type: 'create' },
    ],
    photos: [],
  },
];

export const chartData = [
  { ay: 'Eyl', aktif: 1, tamamlandı: 0 },
  { ay: 'Eki', aktif: 2, tamamlandı: 0 },
  { ay: 'Kas', aktif: 3, tamamlandı: 0 },
  { ay: 'Ara', aktif: 4, tamamlandı: 1 },
  { ay: 'Oca', aktif: 5, tamamlandı: 1 },
];
