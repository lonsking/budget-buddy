import { useState } from 'react';
import { Transaction } from '@/lib/budget';

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', description: 'Salary', amount: 4500, category: 'Income', type: 'income', date: '2026-02-01' },
  { id: '2', description: 'Grocery Store', amount: 82.50, category: 'Food & Dining', type: 'expense', date: '2026-02-03' },
  { id: '3', description: 'Electric Bill', amount: 120, category: 'Bills & Utilities', type: 'expense', date: '2026-02-05' },
  { id: '4', description: 'Movie Tickets', amount: 32, category: 'Entertainment', type: 'expense', date: '2026-02-07' },
  { id: '5', description: 'Gas Station', amount: 55, category: 'Transport', type: 'expense', date: '2026-02-08' },
  { id: '6', description: 'New Shoes', amount: 95, category: 'Shopping', type: 'expense', date: '2026-02-10' },
  { id: '7', description: 'Pharmacy', amount: 28, category: 'Health', type: 'expense', date: '2026-02-12' },
  { id: '8', description: 'Restaurant', amount: 64, category: 'Food & Dining', type: 'expense', date: '2026-02-14' },
];

export function useBudget() {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [monthlyBudget] = useState(3000);

  const addTransaction = (tx: Omit<Transaction, 'id'>) => {
    setTransactions((prev) => [{ ...tx, id: crypto.randomUUID() }, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const totalIncome = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const remaining = totalIncome - totalExpenses;
  const budgetUsed = Math.min((totalExpenses / monthlyBudget) * 100, 100);

  const categoryTotals = transactions
    .filter((t) => t.type === 'expense')
    .reduce<Record<string, number>>((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    totalIncome,
    totalExpenses,
    remaining,
    monthlyBudget,
    budgetUsed,
    categoryTotals,
  };
}
