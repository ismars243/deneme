export type TransactionType = 'income' | 'expense';
export type AccountType = 'cash' | 'bank' | 'credit' | 'digital';
export type Currency = 'TRY' | 'USD' | 'EUR';

export type IncomeCategory = 'Maaş' | 'Ek Gelir' | 'Satış' | 'Prim' | 'Kira Geliri' | 'Diğer Gelir';
export type ExpenseCategory =
  | 'Market' | 'Fatura' | 'Ulaşım' | 'Eğitim' | 'Sağlık'
  | 'Eğlence' | 'Kira' | 'Yemek & İçecek' | 'Giyim' | 'Seyahat' | 'Diğer';
export type Category = IncomeCategory | ExpenseCategory;

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
  date: string;
  note?: string;
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
  currency: Currency;
}
