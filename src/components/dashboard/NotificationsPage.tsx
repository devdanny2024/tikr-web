import { useEffect, useState } from 'react';
import { Bell, CheckCheck, Clock } from 'lucide-react';
import { api } from '../../lib/api';

interface Notif {
  id: string;
  title: string;
  body: string;
  type: string;
  read: boolean;
  createdAt: string;
}

export function NotificationsPage() {
  const [notifs, setNotifs] = useState<Notif[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Notif[] | { data: Notif[] }>('/notifications')
      .then(r => setNotifs(Array.isArray(r) ? r : (r as { data: Notif[] }).data ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function markAllRead() {
    await api.post('/notifications/mark-all-read', {}).catch(console.error);
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  }

  const unread = notifs.filter(n => !n.read).length;

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Notifications</h1>
          <p className="text-gray-500 text-sm mt-1">{unread} unread</p>
        </div>
        {unread > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-2 text-sm text-[#F59E0B] hover:underline"
          >
            <CheckCheck size={16} />
            Mark all read
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-8 h-8 border-2 border-[#F59E0B] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : notifs.length === 0 ? (
        <div className="text-center py-20">
          <Bell size={40} className="text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No notifications yet</p>
        </div>
      ) : (
        <div className="bg-[#111111] border border-[#1E1E1E] rounded-2xl overflow-hidden divide-y divide-[#1E1E1E]">
          {notifs.map(n => (
            <div
              key={n.id}
              className={`px-5 py-4 flex gap-4 ${!n.read ? 'bg-[#F59E0B]/5' : ''}`}
            >
              <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${n.read ? 'bg-transparent' : 'bg-[#F59E0B]'}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">{n.title}</p>
                <p className="text-sm text-gray-400 mt-0.5">{n.body}</p>
                <p className="text-xs text-gray-600 flex items-center gap-1 mt-1.5">
                  <Clock size={10} />
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
