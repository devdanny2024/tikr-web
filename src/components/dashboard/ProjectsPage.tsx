import { useEffect, useState } from 'react';
import { FolderOpen, Plus, Clock, MapPin, Search } from 'lucide-react';
import { api } from '../../lib/api';

interface Project {
  id: string;
  name: string;
  description?: string;
  status: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  budget?: number;
  currency?: string;
}

const STATUS_COLOR: Record<string, string> = {
  ACTIVE: '#22c55e',
  PLANNING: '#F59E0B',
  ON_HOLD: '#f97316',
  COMPLETED: '#6b7280',
  CANCELLED: '#ef4444',
};

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    api.get<Project[] | { data: Project[] }>('/projects')
      .then(r => setProjects(Array.isArray(r) ? r : (r as { data: Project[] }).data ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = projects.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'ALL' || p.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-gray-500 text-sm mt-1">{projects.length} total projects</p>
        </div>
        <button className="flex items-center gap-2 bg-[#F59E0B] text-black text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-[#D97706] transition-colors">
          <Plus size={16} />
          New Project
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search projects…"
            className="w-full bg-[#111111] border border-[#1E1E1E] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B] transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['ALL', 'ACTIVE', 'PLANNING', 'ON_HOLD', 'COMPLETED'].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filter === s
                  ? 'bg-[#F59E0B] text-black'
                  : 'bg-[#111111] border border-[#1E1E1E] text-gray-400 hover:text-white'
              }`}
            >
              {s === 'ALL' ? 'All' : s.replace('_', ' ')}
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
          <FolderOpen size={40} className="text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No projects found</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(p => (
            <div key={p.id} className="bg-[#111111] border border-[#1E1E1E] rounded-2xl p-5 hover:border-[#2A2A2A] transition-colors cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-[#F59E0B]/10 rounded-xl flex items-center justify-center">
                  <FolderOpen size={18} className="text-[#F59E0B]" />
                </div>
                <span
                  className="text-xs px-2 py-1 rounded-full font-medium"
                  style={{
                    color: STATUS_COLOR[p.status] ?? '#6b7280',
                    background: `${STATUS_COLOR[p.status] ?? '#6b7280'}15`,
                  }}
                >
                  {p.status?.replace('_', ' ')}
                </span>
              </div>

              <h3 className="font-semibold text-white mb-1 truncate">{p.name}</h3>
              {p.description && (
                <p className="text-xs text-gray-500 line-clamp-2 mb-3">{p.description}</p>
              )}

              <div className="space-y-1.5 mt-3 pt-3 border-t border-[#1E1E1E]">
                {p.location && (
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <MapPin size={12} /> {p.location}
                  </div>
                )}
                {p.endDate && (
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock size={12} /> Due {new Date(p.endDate).toLocaleDateString()}
                  </div>
                )}
                {p.budget != null && (
                  <div className="text-xs text-[#F59E0B] font-medium">
                    Budget: {p.currency ?? 'NGN'} {p.budget.toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
