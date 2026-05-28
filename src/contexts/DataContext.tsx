import { createContext, useContext, useState } from 'react';
import type { Transaction, Budget, Account } from '../lib/types';
import { mockTransactions, mockBudgets, mockAccounts, monthlyChartData } from '../lib/mock-data';
import { getMonthKey } from '../lib/utils';

interface DataCtx {
  transactions: Transaction[];
  budgets: Budget[];
  accounts: Account[];
  monthlyChartData: typeof monthlyChartData;
  addTransaction: (t: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, t: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  updateBudget: (id: string, limit: number) => void;
  addAccount: (a: Omit<Account, 'id'>) => void;
  updateAccount: (id: string, updates: Partial<Account>) => void;
  deleteAccount: (id: string) => void;
  getMonthStats: (month?: string) => { income: number; expense: number; balance: number };
  getCategorySpending: (month?: string) => Array<{ category: string; amount: number; count: number }>;
}

const DataContext = createContext<DataCtx>({} as DataCtx);
export function useData() { return useContext(DataContext); }

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [budgets, setBudgets] = useState<Budget[]>(mockBudgets);
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);

  function addTransaction(t: Omit<Transaction, 'id'>) {
    const newT: Transaction = { ...t, id: crypto.randomUUID() };
    setTransactions(prev => [newT, ...prev]);
    // update account balance
    setAccounts(prev => prev.map(a =>
      a.id === t.accountId
        ? { ...a, balance: a.balance + (t.type === 'income' ? t.amount : -t.amount) }
        : a
    ));
  }

  function updateTransaction(id: string, updates: Partial<Transaction>) {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  }

  function deleteTransaction(id: string) {
    const t = transactions.find(t => t.id === id);
    if (t) {
      setTransactions(prev => prev.filter(x => x.id !== id));
      setAccounts(prev => prev.map(a =>
        a.id === t.accountId
          ? { ...a, balance: a.balance - (t.type === 'income' ? t.amount : -t.amount) }
          : a
      ));
    }
  }

  function updateBudget(id: string, limit: number) {
    setBudgets(prev => prev.map(b => b.id === id ? { ...b, limit } : b));
  }

  function addAccount(a: Omit<Account, 'id'>) {
    setAccounts(prev => [...prev, { ...a, id: crypto.randomUUID() }]);
  }

  function updateAccount(id: string, updates: Partial<Account>) {
    setAccounts(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  }

  function deleteAccount(id: string) {
    setAccounts(prev => prev.filter(a => a.id !== id));
  }

  function getMonthStats(month = getMonthKey()) {
    const ts = transactions.filter(t => t.date.startsWith(month));
    const income = ts.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = ts.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    return { income, expense, balance: income - expense };
  }

  function getCategorySpending(month = getMonthKey()) {
    const ts = transactions.filter(t => t.date.startsWith(month) && t.type === 'expense');
    const map = new Map<string, { amount: number; count: number }>();
    for (const t of ts) {
      const cur = map.get(t.category) ?? { amount: 0, count: 0 };
      map.set(t.category, { amount: cur.amount + t.amount, count: cur.count + 1 });
    }
    return [...map.entries()]
      .map(([category, data]) => ({ category, ...data }))
      .sort((a, b) => b.amount - a.amount);
  }

  return (
    <DataContext.Provider value={{
      transactions, budgets, accounts, monthlyChartData,
      addTransaction, updateTransaction, deleteTransaction,
      updateBudget, addAccount, updateAccount, deleteAccount,
      getMonthStats, getCategorySpending
    }}>
      {children}
    </DataContext.Provider>
  );
}
