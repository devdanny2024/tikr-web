import { useEffect, useState } from 'react';
import { CheckSquare, Clock, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { api } from '../../lib/api';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  dueDate?: string;
  projectId?: string;
}

const PRIORITY_COLOR: Record<string, string> = {
  HIGH: '#ef4444',
  MEDIUM: '#F59E0B',
  LOW: '#6b7280',
};

const STATUS_LABEL: Record<string, string> = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  IN_REVIEW: 'In Review',
  DONE: 'Done',
  BLOCKED: 'Blocked',
};

export function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  useEffect(() => {
    api.get<Task[] | { data: Task[] }>('/tasks/my')
      .then(r => setTasks(Array.isArray(r) ? r : (r as { data: Task[] }).data ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = tasks.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const toggleExpand = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const openCount = tasks.filter(t => t.status !== 'DONE').length;
  const doneCount = tasks.filter(t => t.status === 'DONE').length;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Tasks</h1>
        <p className="text-gray-500 text-sm mt-1">{openCount} open · {doneCount} completed</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search tasks…"
            className="w-full bg-[#111111] border border-[#1E1E1E] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B] transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['ALL', 'TODO', 'IN_PROGRESS', 'DONE', 'BLOCKED'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                statusFilter === s
                  ? 'bg-[#F59E0B] text-black'
                  : 'bg-[#111111] border border-[#1E1E1E] text-gray-400 hover:text-white'
              }`}
            >
              {s === 'ALL' ? 'All' : STATUS_LABEL[s] ?? s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-[#F59E0B] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <CheckSquare size={40} className="text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No tasks found</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(t => {
            const isExpanded = expanded.has(t.id);
            const overdue = t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'DONE';

            return (
              <div key={t.id} className="bg-[#111111] border border-[#1E1E1E] rounded-2xl overflow-hidden">
                <div
                  className="flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-[#151515] transition-colors"
                  onClick={() => toggleExpand(t.id)}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: PRIORITY_COLOR[t.priority] ?? '#6b7280' }}
                  />
                  <span className="flex-1 text-sm text-white">{t.title}</span>
                  <div className="flex items-center gap-3">
                    {t.dueDate && (
                      <span className={`text-xs flex items-center gap-1 ${overdue ? 'text-red-400' : 'text-gray-500'}`}>
                        <Clock size={11} />
                        {new Date(t.dueDate).toLocaleDateString()}
                      </span>
                    )}
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ color: t.status === 'DONE' ? '#22c55e' : '#F59E0B', background: t.status === 'DONE' ? '#22c55e15' : '#F59E0B15' }}
                    >
                      {STATUS_LABEL[t.status] ?? t.status}
                    </span>
                    {isExpanded ? <ChevronUp size={14} className="text-gray-500" /> : <ChevronDown size={14} className="text-gray-500" />}
                  </div>
                </div>

                {isExpanded && t.description && (
                  <div className="px-4 pb-4 border-t border-[#1E1E1E] pt-3">
                    <p className="text-sm text-gray-400">{t.description}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
