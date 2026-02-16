import { Trash2 } from 'lucide-react';
import { Transaction, getCategoryInfo } from '@/lib/budget';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

export function TransactionList({ transactions, onDelete }: TransactionListProps) {
  return (
    <div className="rounded-lg border bg-card p-5 animate-fade-in">
      <h3 className="font-display text-lg mb-4">Recent Transactions</h3>
      {transactions.length === 0 ? (
        <p className="text-muted-foreground text-sm">No transactions yet</p>
      ) : (
        <div className="space-y-1 max-h-[360px] overflow-y-auto pr-1">
          {transactions.map((tx, i) => {
            const cat = getCategoryInfo(tx.category);
            return (
              <div
                key={tx.id}
                className="flex items-center justify-between py-3 px-2 rounded-md hover:bg-secondary/50 transition-colors group"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{cat.emoji}</span>
                  <div>
                    <p className="text-sm font-medium leading-tight">{tx.description}</p>
                    <p className="text-xs text-muted-foreground">{tx.category} · {tx.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-semibold ${tx.type === 'income' ? 'text-success' : 'text-foreground'}`}>
                    {tx.type === 'income' ? '+' : '-'}{fmt(tx.amount)}
                  </span>
                  <button
                    onClick={() => onDelete(tx.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
