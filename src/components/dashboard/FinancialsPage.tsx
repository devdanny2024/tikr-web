import { useEffect, useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { api } from '../../lib/api';

interface BudgetEntry {
  id: string;
  projectId: string;
  projectName?: string;
  category: string;
  description?: string;
  plannedAmount: number;
  actualAmount?: number;
  currency?: string;
  type: 'INCOME' | 'EXPENSE';
  date?: string;
}

export function FinancialsPage() {
  const [entries, setEntries] = useState<BudgetEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Try to fetch from a generic financials/budget endpoint
    api.get<BudgetEntry[] | { data: BudgetEntry[] }>('/budget')
      .then(r => setEntries(Array.isArray(r) ? r : (r as { data: BudgetEntry[] }).data ?? []))
      .catch(() => setError('No financial data available yet'))
      .finally(() => setLoading(false));
  }, []);

  const income = entries.filter(e => e.type === 'INCOME').reduce((s, e) => s + (e.actualAmount ?? e.plannedAmount), 0);
  const expenses = entries.filter(e => e.type === 'EXPENSE').reduce((s, e) => s + (e.actualAmount ?? e.plannedAmount), 0);
  const balance = income - expenses;

  function fmt(n: number) {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(n);
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Financials</h1>
        <p className="text-gray-500 text-sm mt-1">Budget tracking across all projects</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#111111] border border-[#1E1E1E] rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-[#22c55e]" />
            <span className="text-xs text-gray-400">Total Income</span>
          </div>
          <p className="text-xl font-bold text-white">{fmt(income)}</p>
        </div>
        <div className="bg-[#111111] border border-[#1E1E1E] rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown size={16} className="text-[#ef4444]" />
            <span className="text-xs text-gray-400">Total Expenses</span>
          </div>
          <p className="text-xl font-bold text-white">{fmt(expenses)}</p>
        </div>
        <div className="bg-[#111111] border border-[#1E1E1E] rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={16} className="text-[#F59E0B]" />
            <span className="text-xs text-gray-400">Net Balance</span>
          </div>
          <p className={`text-xl font-bold ${balance >= 0 ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>{fmt(balance)}</p>
        </div>
      </div>

      {/* Entries table */}
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-8 h-8 border-2 border-[#F59E0B] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error || entries.length === 0 ? (
        <div className="bg-[#111111] border border-[#1E1E1E] rounded-2xl p-10 text-center">
          <AlertCircle size={36} className="text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">{error || 'No financial records yet'}</p>
          <p className="text-gray-600 text-xs mt-1">Budget entries will appear here once added to a project</p>
        </div>
      ) : (
        <div className="bg-[#111111] border border-[#1E1E1E] rounded-2xl overflow-hidden">
          <div className="px-5 py-3.5 border-b border-[#1E1E1E]">
            <h2 className="font-semibold text-white text-sm">All Transactions</h2>
          </div>
          <div className="divide-y divide-[#1E1E1E]">
            {entries.map(e => (
              <div key={e.id} className="flex items-center gap-4 px-5 py-3.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  e.type === 'INCOME' ? 'bg-[#22c55e]/10' : 'bg-[#ef4444]/10'
                }`}>
                  {e.type === 'INCOME'
                    ? <TrendingUp size={14} className="text-[#22c55e]" />
                    : <TrendingDown size={14} className="text-[#ef4444]" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{e.description || e.category}</p>
                  <p className="text-xs text-gray-500">{e.category}{e.date ? ` · ${new Date(e.date).toLocaleDateString()}` : ''}</p>
                </div>
                <p className={`text-sm font-semibold ${e.type === 'INCOME' ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                  {e.type === 'INCOME' ? '+' : '-'}{fmt(e.actualAmount ?? e.plannedAmount)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
