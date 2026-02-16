import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

interface OverviewCardsProps {
  totalIncome: number;
  totalExpenses: number;
  remaining: number;
}

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

export function OverviewCards({ totalIncome, totalExpenses, remaining }: OverviewCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card icon={<TrendingUp className="h-5 w-5" />} label="Income" value={fmt(totalIncome)} variant="success" />
      <Card icon={<TrendingDown className="h-5 w-5" />} label="Expenses" value={fmt(totalExpenses)} variant="destructive" />
      <Card icon={<Wallet className="h-5 w-5" />} label="Remaining" value={fmt(remaining)} variant={remaining >= 0 ? 'default' : 'destructive'} />
    </div>
  );
}

function Card({
  icon,
  label,
  value,
  variant,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  variant: 'success' | 'destructive' | 'default';
}) {
  const iconColor =
    variant === 'success'
      ? 'text-success'
      : variant === 'destructive'
      ? 'text-destructive'
      : 'text-primary';

  return (
    <div className="rounded-lg border bg-card p-5 animate-fade-in">
      <div className="flex items-center gap-2 mb-2">
        <span className={iconColor}>{icon}</span>
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
      </div>
      <p className="text-2xl font-bold font-display tracking-tight">{value}</p>
    </div>
  );
}
