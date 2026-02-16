import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { getCategoryInfo } from '@/lib/budget';

interface CategoryChartProps {
  categoryTotals: Record<string, number>;
}

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

export function CategoryChart({ categoryTotals }: CategoryChartProps) {
  const data = Object.entries(categoryTotals)
    .map(([name, value]) => ({
      name,
      value,
      color: getCategoryInfo(name).color,
      emoji: getCategoryInfo(name).emoji,
    }))
    .sort((a, b) => b.value - a.value);

  if (data.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-5 animate-fade-in">
        <h3 className="font-display text-lg mb-4">Spending by Category</h3>
        <p className="text-muted-foreground text-sm">No expenses yet</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card p-5 animate-fade-in">
      <h3 className="font-display text-lg mb-4">Spending by Category</h3>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="w-40 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" cx="50%" cy="50%" innerRadius={35} outerRadius={70} paddingAngle={3} strokeWidth={0}>
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => fmt(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-2">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span>
                  {item.emoji} {item.name}
                </span>
              </div>
              <span className="font-medium">{fmt(item.value)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
