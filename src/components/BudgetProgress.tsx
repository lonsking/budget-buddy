interface BudgetProgressProps {
  budgetUsed: number;
  totalExpenses: number;
  monthlyBudget: number;
}

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

export function BudgetProgress({ budgetUsed, totalExpenses, monthlyBudget }: BudgetProgressProps) {
  const overBudget = budgetUsed >= 100;

  return (
    <div className="rounded-lg border bg-card p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-muted-foreground">Monthly Budget</h3>
        <span className="text-sm font-medium text-muted-foreground">
          {fmt(totalExpenses)} / {fmt(monthlyBudget)}
        </span>
      </div>
      <div className="h-3 rounded-full bg-secondary overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${
            overBudget ? 'bg-destructive' : 'bg-primary'
          }`}
          style={{ width: `${Math.min(budgetUsed, 100)}%` }}
        />
      </div>
      <p className={`text-xs mt-2 ${overBudget ? 'text-destructive' : 'text-muted-foreground'}`}>
        {overBudget ? 'Over budget!' : `${(100 - budgetUsed).toFixed(0)}% remaining`}
      </p>
    </div>
  );
}
