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
  deleteTransaction: (id: string) => void;
  updateBudget: (id: string, limit: number) => void;
  addAccount: (a: Omit<Account, 'id'>) => void;
  deleteAccount: (id: string) => void;
  getMonthStats: () => { income: number; expense: number; balance: number };
  getCategorySpending: () => Array<{ category: string; amount: number }>;
}

const DataContext = createContext<DataCtx>({} as DataCtx);
export function useData() { return useContext(DataContext); }

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [budgets, setBudgets] = useState<Budget[]>(mockBudgets);
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);

  function addTransaction(t: Omit<Transaction, 'id'>) {
    const newT: Transaction = { ...t, id: Math.random().toString(36).slice(2) };
    setTransactions(prev => [newT, ...prev]);
    setAccounts(prev => prev.map(a =>
      a.id === t.accountId
        ? { ...a, balance: a.balance + (t.type === 'income' ? t.amount : -t.amount) }
        : a
    ));
  }

  function deleteTransaction(id: string) {
    const t = transactions.find(x => x.id === id);
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
    setAccounts(prev => [...prev, { ...a, id: Math.random().toString(36).slice(2) }]);
  }

  function deleteAccount(id: string) {
    setAccounts(prev => prev.filter(a => a.id !== id));
  }

  function getMonthStats() {
    const month = getMonthKey();
    const ts = transactions.filter(t => t.date.startsWith(month));
    const income = ts.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = ts.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    return { income, expense, balance: income - expense };
  }

  function getCategorySpending() {
    const month = getMonthKey();
    const ts = transactions.filter(t => t.date.startsWith(month) && t.type === 'expense');
    const map = new Map<string, number>();
    for (const t of ts) map.set(t.category, (map.get(t.category) ?? 0) + t.amount);
    return [...map.entries()].map(([category, amount]) => ({ category, amount })).sort((a, b) => b.amount - a.amount);
  }

  return (
    <DataContext.Provider value={{
      transactions, budgets, accounts, monthlyChartData,
      addTransaction, deleteTransaction, updateBudget,
      addAccount, deleteAccount, getMonthStats, getCategorySpending,
    }}>
      {children}
    </DataContext.Provider>
  );
}
