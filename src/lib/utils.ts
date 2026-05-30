import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Category, ExpenseCategory, IncomeCategory, Transaction } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.abs(amount));
}

export function getMonthKey(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export function formatDateGroup(dateStr: string): string {
  const d = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return 'Bugün';
  if (d.toDateString() === yesterday.toDateString()) return 'Dün';
  return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' });
}

export function groupByDate(transactions: Transaction[]): Map<string, Transaction[]> {
  const groups = new Map<string, Transaction[]>();
  const sorted = [...transactions].sort((a, b) => b.date.localeCompare(a.date));
  for (const t of sorted) {
    const key = formatDateGroup(t.date);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(t);
  }
  return groups;
}

export function budgetBarColor(spent: number, limit: number): string {
  const pct = limit > 0 ? spent / limit : 0;
  if (pct >= 1) return '#ef4444';
  if (pct >= 0.8) return '#f59e0b';
  return '#6366f1';
}

export function generateAISuggestion(transactions: Transaction[]): { emoji: string; text: string } {
  const month = getMonthKey();
  const thisMonth = transactions.filter(t => t.date.startsWith(month) && t.type === 'expense');
  if (thisMonth.length === 0) return { emoji: '📊', text: 'Bu ay henüz harcama yok. Kaydetmeye başlayın!' };
  const totals = new Map<string, number>();
  for (const t of thisMonth) totals.set(t.category, (totals.get(t.category) ?? 0) + t.amount);
  const [topCat, topAmt] = [...totals.entries()].sort((a, b) => b[1] - a[1])[0];
  return { emoji: '🤖', text: `Bu ay en fazla ${topCat} kategorisinde ${formatCurrency(topAmt)} harcadınız.` };
}

export const CATEGORY_META: Record<Category, { icon: string; color: string; bg: string }> = {
  'Maaş':           { icon: '💼', color: '#10b981', bg: '#d1fae5' },
  'Ek Gelir':       { icon: '💡', color: '#06b6d4', bg: '#cffafe' },
  'Satış':          { icon: '🛍️', color: '#8b5cf6', bg: '#ede9fe' },
  'Prim':           { icon: '🏆', color: '#f59e0b', bg: '#fef3c7' },
  'Kira Geliri':    { icon: '🏠', color: '#6366f1', bg: '#e0e7ff' },
  'Diğer Gelir':    { icon: '➕', color: '#64748b', bg: '#f1f5f9' },
  'Market':         { icon: '🛒', color: '#10b981', bg: '#d1fae5' },
  'Fatura':         { icon: '📄', color: '#ef4444', bg: '#fee2e2' },
  'Ulaşım':         { icon: '🚗', color: '#3b82f6', bg: '#dbeafe' },
  'Eğitim':         { icon: '📚', color: '#8b5cf6', bg: '#ede9fe' },
  'Sağlık':         { icon: '🏥', color: '#ec4899', bg: '#fce7f3' },
  'Eğlence':        { icon: '🎬', color: '#f59e0b', bg: '#fef3c7' },
  'Kira':           { icon: '🏠', color: '#6366f1', bg: '#e0e7ff' },
  'Yemek & İçecek': { icon: '🍽️', color: '#f97316', bg: '#ffedd5' },
  'Giyim':          { icon: '👕', color: '#0ea5e9', bg: '#e0f2fe' },
  'Seyahat':        { icon: '✈️', color: '#06b6d4', bg: '#cffafe' },
  'Diğer':          { icon: '📦', color: '#64748b', bg: '#f1f5f9' },
};

export const INCOME_CATEGORIES: IncomeCategory[] = ['Maaş', 'Ek Gelir', 'Satış', 'Prim', 'Kira Geliri', 'Diğer Gelir'];
export const EXPENSE_CATEGORIES: ExpenseCategory[] = ['Market', 'Fatura', 'Ulaşım', 'Eğitim', 'Sağlık', 'Eğlence', 'Kira', 'Yemek & İçecek', 'Giyim', 'Seyahat', 'Diğer'];
