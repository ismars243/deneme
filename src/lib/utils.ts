import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Category, ExpenseCategory, Transaction } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = 'TRY') {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency', currency,
    minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(Math.abs(amount));
}

export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('tr-TR', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

export function formatDateShort(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('tr-TR', {
    day: 'numeric', month: 'short',
  });
}

export function formatDateGroup(dateStr: string) {
  const d = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (d.toDateString() === today.toDateString()) return 'Bugün';
  if (d.toDateString() === yesterday.toDateString()) return 'Dün';
  return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' });
}

export function getMonthKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export function groupByDate(transactions: Transaction[]) {
  const groups = new Map<string, Transaction[]>();
  const sorted = [...transactions].sort((a, b) => b.date.localeCompare(a.date));
  for (const t of sorted) {
    const key = formatDateGroup(t.date);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(t);
  }
  return groups;
}

export const CATEGORY_META: Record<Category, { icon: string; color: string; bg: string; darkBg: string }> = {
  // Income
  'Maaş':         { icon: '💼', color: '#10b981', bg: 'bg-emerald-100', darkBg: 'dark:bg-emerald-900/30' },
  'Ek Gelir':     { icon: '💡', color: '#06b6d4', bg: 'bg-cyan-100',    darkBg: 'dark:bg-cyan-900/30'    },
  'Satış':        { icon: '🛍️', color: '#8b5cf6', bg: 'bg-violet-100',  darkBg: 'dark:bg-violet-900/30'  },
  'Prim':         { icon: '🏆', color: '#f59e0b', bg: 'bg-amber-100',   darkBg: 'dark:bg-amber-900/30'   },
  'Kira Geliri':  { icon: '🏠', color: '#6366f1', bg: 'bg-indigo-100',  darkBg: 'dark:bg-indigo-900/30'  },
  'Diğer Gelir':  { icon: '➕', color: '#64748b', bg: 'bg-slate-100',   darkBg: 'dark:bg-slate-800'      },
  // Expense
  'Market':       { icon: '🛒', color: '#10b981', bg: 'bg-emerald-100', darkBg: 'dark:bg-emerald-900/30' },
  'Fatura':       { icon: '📄', color: '#ef4444', bg: 'bg-red-100',     darkBg: 'dark:bg-red-900/30'     },
  'Ulaşım':       { icon: '🚗', color: '#3b82f6', bg: 'bg-blue-100',    darkBg: 'dark:bg-blue-900/30'    },
  'Eğitim':       { icon: '📚', color: '#8b5cf6', bg: 'bg-violet-100',  darkBg: 'dark:bg-violet-900/30'  },
  'Sağlık':       { icon: '🏥', color: '#ec4899', bg: 'bg-pink-100',    darkBg: 'dark:bg-pink-900/30'    },
  'Eğlence':      { icon: '🎬', color: '#f59e0b', bg: 'bg-amber-100',   darkBg: 'dark:bg-amber-900/30'   },
  'Kira':         { icon: '🏠', color: '#6366f1', bg: 'bg-indigo-100',  darkBg: 'dark:bg-indigo-900/30'  },
  'Yemek & İçecek':{ icon: '🍽️', color: '#f97316', bg: 'bg-orange-100', darkBg: 'dark:bg-orange-900/30' },
  'Giyim':        { icon: '👕', color: '#0ea5e9', bg: 'bg-sky-100',     darkBg: 'dark:bg-sky-900/30'     },
  'Seyahat':      { icon: '✈️', color: '#06b6d4', bg: 'bg-cyan-100',    darkBg: 'dark:bg-cyan-900/30'    },
  'Diğer':        { icon: '📦', color: '#64748b', bg: 'bg-slate-100',   darkBg: 'dark:bg-slate-800'      },
};

export const INCOME_CATEGORIES: Array<import('./types').IncomeCategory> = ['Maaş','Ek Gelir','Satış','Prim','Kira Geliri','Diğer Gelir'];
export const EXPENSE_CATEGORIES: ExpenseCategory[] = ['Market','Fatura','Ulaşım','Eğitim','Sağlık','Eğlence','Kira','Yemek & İçecek','Giyim','Seyahat','Diğer'];

export function generateAISuggestion(transactions: Transaction[]): { emoji: string; text: string } {
  const now = new Date();
  const month = getMonthKey(now);
  const thisMonth = transactions.filter(t => t.date.startsWith(month) && t.type === 'expense');

  if (thisMonth.length === 0) return { emoji: '📊', text: 'Bu ay henüz harcama yok. Harcamalarınızı kaydetmeye başlayın!' };

  const totals = new Map<string, number>();
  for (const t of thisMonth) {
    totals.set(t.category, (totals.get(t.category) ?? 0) + t.amount);
  }
  const sorted = [...totals.entries()].sort((a, b) => b[1] - a[1]);
  const [topCat, topAmt] = sorted[0];

  const tips = [
    { emoji: '🤖', text: `Bu ay en fazla **${topCat}** kategorisinde ${formatCurrency(topAmt)} harcadınız. Dikkatli olun!` },
    { emoji: '💡', text: `Toplam ${thisMonth.length} işlem kaydettiniz. Düzenli takip harika bir alışkanlık!` },
    { emoji: '📉', text: `${topCat} harcamalarınız bütçenizin büyük bölümünü oluşturuyor. Tasarruf fırsatı var.` },
  ];
  return tips[Math.floor(Math.random() * tips.length)];
}

export function budgetBarColor(spent: number, limit: number): string {
  const pct = limit > 0 ? spent / limit : 0;
  if (pct >= 1) return 'bg-red-500';
  if (pct >= 0.8) return 'bg-amber-500';
  return 'bg-primary-500';
}

export function exportCSV(transactions: Transaction[]) {
  const header = 'Tarih,Tür,Başlık,Kategori,Tutar\n';
  const rows = transactions.map(t =>
    `${t.date},${t.type === 'income' ? 'Gelir' : 'Gider'},"${t.title}",${t.category},${t.amount}`
  ).join('\n');
  const blob = new Blob(['﻿' + header + rows], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'finova-islemler.csv'; a.click();
  URL.revokeObjectURL(url);
}
