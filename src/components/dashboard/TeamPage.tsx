import { useEffect, useState } from 'react';
import { Users, Mail, Shield, Search } from 'lucide-react';
import { api } from '../../lib/api';

interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status?: string;
  avatar?: string;
}

const ROLE_COLOR: Record<string, string> = {
  OWNER: '#F59E0B',
  ADMIN: '#818cf8',
  MEMBER: '#22c55e',
  VIEWER: '#6b7280',
};

export function TeamPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get<Member[] | { data: Member[] }>('/organization/members')
      .then(r => setMembers(Array.isArray(r) ? r : (r as { data: Member[] }).data ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = members.filter(m => {
    const name = `${m.firstName} ${m.lastName} ${m.email}`.toLowerCase();
    return name.includes(search.toLowerCase());
  });

  function initials(m: Member) {
    return `${m.firstName?.[0] ?? ''}${m.lastName?.[0] ?? ''}`.toUpperCase();
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Team</h1>
          <p className="text-gray-500 text-sm mt-1">{members.length} member{members.length !== 1 ? 's' : ''}</p>
        </div>
        <button className="flex items-center gap-2 bg-[#F59E0B] text-black text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-[#D97706] transition-colors">
          <Users size={16} />
          Invite Member
        </button>
      </div>

      <div className="relative max-w-xs">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search team…"
          className="w-full bg-[#111111] border border-[#1E1E1E] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B] transition-colors"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-8 h-8 border-2 border-[#F59E0B] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <Users size={40} className="text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No team members found</p>
        </div>
      ) : (
        <div className="bg-[#111111] border border-[#1E1E1E] rounded-2xl overflow-hidden">
          <div className="divide-y divide-[#1E1E1E]">
            {filtered.map(m => (
              <div key={m.id} className="flex items-center gap-4 px-5 py-4">
                <div className="w-10 h-10 bg-[#F59E0B] rounded-full flex items-center justify-center text-black font-bold text-sm shrink-0">
                  {initials(m)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{m.firstName} {m.lastName}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                    <Mail size={11} />
                    <span className="truncate">{m.email}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{
                      color: ROLE_COLOR[m.role] ?? '#6b7280',
                      background: `${ROLE_COLOR[m.role] ?? '#6b7280'}15`,
                    }}
                  >
                    <Shield size={10} />
                    {m.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
