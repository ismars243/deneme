export type TransactionType = 'income' | 'expense';

export type IncomeCategory = 'Maaş' | 'Ek Gelir' | 'Satış' | 'Prim' | 'Kira Geliri' | 'Diğer Gelir';
export type ExpenseCategory =
  | 'Market' | 'Fatura' | 'Ulaşım' | 'Eğitim' | 'Sağlık'
  | 'Eğlence' | 'Kira' | 'Yemek & İçecek' | 'Giyim' | 'Seyahat' | 'Diğer';

export type Category = IncomeCategory | ExpenseCategory;
export type AccountType = 'cash' | 'bank' | 'credit' | 'digital';
export type Currency = 'TRY' | 'USD' | 'EUR' | 'GBP';

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  currency: Currency;
  color: string;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: Category;
  accountId: string;
  title: string;
  note?: string;
  date: string;
  receiptUrl?: string;
}

export interface Budget {
  id: string;
  category: ExpenseCategory;
  limit: number;
  month: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  currency: Currency;
  language: 'tr' | 'en';
  darkMode: boolean;
  monthlyBudget: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'warning' | 'info' | 'success';
  date: string;
  read: boolean;
}
