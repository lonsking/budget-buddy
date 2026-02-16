export interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  date: string;
}

export const CATEGORIES = [
  { name: 'Food & Dining', emoji: '🍕', color: 'hsl(15, 80%, 58%)' },
  { name: 'Transport', emoji: '🚗', color: 'hsl(200, 60%, 50%)' },
  { name: 'Shopping', emoji: '🛍️', color: 'hsl(280, 55%, 55%)' },
  { name: 'Entertainment', emoji: '🎬', color: 'hsl(340, 65%, 55%)' },
  { name: 'Bills & Utilities', emoji: '💡', color: 'hsl(45, 70%, 50%)' },
  { name: 'Health', emoji: '💊', color: 'hsl(152, 55%, 42%)' },
  { name: 'Income', emoji: '💰', color: 'hsl(152, 55%, 42%)' },
  { name: 'Other', emoji: '📦', color: 'hsl(160, 10%, 45%)' },
] as const;

export const getCategoryInfo = (name: string) =>
  CATEGORIES.find((c) => c.name === name) || CATEGORIES[CATEGORIES.length - 1];
