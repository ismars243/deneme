import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ProjectStatus, ProjectType } from './mock-data';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export function getStatusColor(status: ProjectStatus) {
  const map: Record<ProjectStatus, string> = {
    aktif: 'bg-green-100 text-green-700 border-green-200',
    tamamlandı: 'bg-blue-100 text-blue-700 border-blue-200',
    gecikiyor: 'bg-red-100 text-red-700 border-red-200',
    beklemede: 'bg-amber-100 text-amber-700 border-amber-200',
  };
  return map[status];
}

export function getTypeColor(type: ProjectType) {
  const map: Record<ProjectType, string> = {
    'TÜBİTAK 4006': 'bg-purple-100 text-purple-700 border-purple-200',
    'eTwinning': 'bg-sky-100 text-sky-700 border-sky-200',
    'Bilim Fuarı': 'bg-orange-100 text-orange-700 border-orange-200',
    'Sosyal Sorumluluk': 'bg-teal-100 text-teal-700 border-teal-200',
    'ERASMUS+': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  };
  return map[type];
}

export function daysSinceUpdate(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}
