import { useState } from 'react';
import { Plus } from 'lucide-react';
import { CATEGORIES, Transaction } from '@/lib/budget';

interface AddTransactionFormProps {
  onAdd: (tx: Omit<Transaction, 'id'>) => void;
}

export function AddTransactionForm({ onAdd }: AddTransactionFormProps) {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food & Dining');
  const [type, setType] = useState<'income' | 'expense'>('expense');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;
    onAdd({
      description,
      amount: parseFloat(amount),
      category: type === 'income' ? 'Income' : category,
      type,
      date: new Date().toISOString().split('T')[0],
    });
    setDescription('');
    setAmount('');
    setOpen(false);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-lg border-2 border-dashed border-border py-4 flex items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors font-medium text-sm"
      >
        <Plus className="h-4 w-4" />
        Add Transaction
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border bg-card p-5 space-y-4 animate-fade-in">
      <h3 className="font-display text-lg">New Transaction</h3>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setType('expense')}
          className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
            type === 'expense' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
          }`}
        >
          Expense
        </button>
        <button
          type="button"
          onClick={() => setType('income')}
          className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
            type === 'income' ? 'bg-success text-success-foreground' : 'bg-secondary text-secondary-foreground'
          }`}
        >
          Income
        </button>
      </div>

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        required
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        step="0.01"
        min="0"
        className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        required
      />

      {type === 'expense' && (
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {CATEGORIES.filter((c) => c.name !== 'Income').map((c) => (
            <option key={c.name} value={c.name}>
              {c.emoji} {c.name}
            </option>
          ))}
        </select>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 rounded-md bg-primary py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Add
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:opacity-80 transition-opacity"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
