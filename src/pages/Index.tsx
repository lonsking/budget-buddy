import { useBudget } from '@/hooks/useBudget';
import { OverviewCards } from '@/components/OverviewCards';
import { BudgetProgress } from '@/components/BudgetProgress';
import { CategoryChart } from '@/components/CategoryChart';
import { TransactionList } from '@/components/TransactionList';
import { AddTransactionForm } from '@/components/AddTransactionForm';

const Index = () => {
  const budget = useBudget();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-display tracking-tight">💸 BudgetFlow</h1>
          <span className="text-xs text-muted-foreground font-medium">Feb 2026</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-5">
        <OverviewCards
          totalIncome={budget.totalIncome}
          totalExpenses={budget.totalExpenses}
          remaining={budget.remaining}
        />

        <BudgetProgress
          budgetUsed={budget.budgetUsed}
          totalExpenses={budget.totalExpenses}
          monthlyBudget={budget.monthlyBudget}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <CategoryChart categoryTotals={budget.categoryTotals} />
          <div className="space-y-5">
            <AddTransactionForm onAdd={budget.addTransaction} />
            <TransactionList transactions={budget.transactions} onDelete={budget.deleteTransaction} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
