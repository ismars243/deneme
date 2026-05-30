import type { Account, Transaction, Budget, User } from './types';

export const mockUser: User = {
  id: 'u1',
  name: 'Ahmet Yılmaz',
  email: 'ahmet@finova.app',
  currency: 'TRY',
};

export const mockAccounts: Account[] = [
  { id: 'acc1', name: 'Nakit',          type: 'cash',    balance: 2850,   currency: 'TRY', color: '#10b981' },
  { id: 'acc2', name: 'Ziraat Bankası', type: 'bank',    balance: 18420,  currency: 'TRY', color: '#6366f1' },
  { id: 'acc3', name: 'Garanti Kredi',  type: 'credit',  balance: -4320,  currency: 'TRY', color: '#ef4444' },
  { id: 'acc4', name: 'Papara',         type: 'digital', balance: 1250,   currency: 'TRY', color: '#f59e0b' },
];

export const mockTransactions: Transaction[] = [
  { id: 't1',  type: 'income',  amount: 18500, category: 'Maaş',           accountId: 'acc2', title: 'Mayıs Maaşı',      date: '2026-05-05' },
  { id: 't2',  type: 'income',  amount: 2500,  category: 'Ek Gelir',        accountId: 'acc4', title: 'Freelance Proje',   date: '2026-05-10' },
  { id: 't3',  type: 'expense', amount: 4800,  category: 'Kira',            accountId: 'acc2', title: 'Mayıs Kirası',      date: '2026-05-01' },
  { id: 't4',  type: 'expense', amount: 485,   category: 'Market',          accountId: 'acc1', title: 'Migros Alışveriş',  date: '2026-05-27' },
  { id: 't5',  type: 'expense', amount: 320,   category: 'Yemek & İçecek',  accountId: 'acc3', title: 'Restoran – Akşam',  date: '2026-05-28' },
  { id: 't6',  type: 'expense', amount: 750,   category: 'Ulaşım',          accountId: 'acc2', title: 'Benzin',            date: '2026-05-26' },
  { id: 't7',  type: 'expense', amount: 520,   category: 'Fatura',          accountId: 'acc2', title: 'Elektrik Faturası', date: '2026-05-25' },
  { id: 't8',  type: 'expense', amount: 169,   category: 'Eğlence',         accountId: 'acc3', title: 'Netflix',           date: '2026-05-20' },
  { id: 't9',  type: 'expense', amount: 1150,  category: 'Giyim',           accountId: 'acc3', title: 'Mavi – Giyim',      date: '2026-05-12' },
  { id: 't10', type: 'expense', amount: 245,   category: 'Sağlık',          accountId: 'acc1', title: 'Eczane',            date: '2026-05-23' },
  { id: 't11', type: 'expense', amount: 390,   category: 'Fatura',          accountId: 'acc2', title: 'Doğalgaz',          date: '2026-05-17' },
  { id: 't12', type: 'expense', amount: 300,   category: 'Ulaşım',          accountId: 'acc1', title: 'Metro Kartı',       date: '2026-05-15' },
  { id: 't13', type: 'expense', amount: 85,    category: 'Yemek & İçecek',  accountId: 'acc1', title: 'Kafe',              date: '2026-05-22' },
  { id: 't14', type: 'income',  amount: 500,   category: 'Prim',            accountId: 'acc2', title: 'Performans Primi',  date: '2026-05-15' },
  { id: 't15', type: 'expense', amount: 350,   category: 'Eğitim',          accountId: 'acc4', title: 'Udemy Kurs',        date: '2026-05-08' },
  { id: 't16', type: 'income',  amount: 18500, category: 'Maaş',            accountId: 'acc2', title: 'Nisan Maaşı',       date: '2026-04-05' },
  { id: 't17', type: 'expense', amount: 4800,  category: 'Kira',            accountId: 'acc2', title: 'Nisan Kirası',      date: '2026-04-01' },
  { id: 't18', type: 'expense', amount: 700,   category: 'Ulaşım',          accountId: 'acc2', title: 'Benzin',            date: '2026-04-25' },
  { id: 't19', type: 'expense', amount: 950,   category: 'Sağlık',          accountId: 'acc3', title: 'Diş Hekimi',        date: '2026-04-22' },
  { id: 't20', type: 'expense', amount: 620,   category: 'Market',          accountId: 'acc3', title: 'Süpermarket',       date: '2026-04-28' },
];

export const mockBudgets: Budget[] = [
  { id: 'b1', category: 'Market',         limit: 2500, month: '2026-05' },
  { id: 'b2', category: 'Ulaşım',         limit: 1500, month: '2026-05' },
  { id: 'b3', category: 'Yemek & İçecek', limit: 2000, month: '2026-05' },
  { id: 'b4', category: 'Fatura',         limit: 1200, month: '2026-05' },
  { id: 'b5', category: 'Eğlence',        limit: 800,  month: '2026-05' },
  { id: 'b6', category: 'Sağlık',         limit: 1000, month: '2026-05' },
  { id: 'b7', category: 'Giyim',          limit: 2000, month: '2026-05' },
  { id: 'b8', category: 'Eğitim',         limit: 500,  month: '2026-05' },
  { id: 'b9', category: 'Kira',           limit: 5000, month: '2026-05' },
];

export const monthlyChartData = [
  { month: 'Oca', income: 18500, expense: 11200 },
  { month: 'Şub', income: 18500, expense: 13400 },
  { month: 'Mar', income: 21000, expense: 12800 },
  { month: 'Nis', income: 19000, expense: 14200 },
  { month: 'May', income: 21500, expense: 9564  },
];
