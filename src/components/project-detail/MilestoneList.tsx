import { useState } from 'react';
import { CheckCircle2, Circle, Flag } from 'lucide-react';
import { formatDate } from '../../lib/utils';
import { useToast } from '../ui/Toast';
import type { Milestone } from '../../lib/mock-data';

export function MilestoneList({ milestones: initial }: { milestones: Milestone[] }) {
  const [items, setItems] = useState(initial);
  const { toast } = useToast();

  function toggle(id: string) {
    setItems(prev =>
      prev.map(m => m.id === id ? { ...m, completed: !m.completed } : m)
    );
    const item = items.find(m => m.id === id);
    if (item) {
      toast(item.completed ? `"${item.title}" geri alındı` : `"${item.title}" tamamlandı!`, 'success');
    }
  }

  const done = items.filter(m => m.completed).length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Flag size={14} />
          {done} / {items.length} tamamlandı
        </div>
        <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all"
            style={{ width: `${items.length ? (done / items.length) * 100 : 0}%` }}
          />
        </div>
      </div>

      {items.map(m => (
        <button
          key={m.id}
          onClick={() => toggle(m.id)}
          className="w-full flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/40 transition-all text-left group"
        >
          {m.completed
            ? <CheckCircle2 size={20} className="text-green-500 flex-shrink-0" />
            : <Circle size={20} className="text-gray-300 group-hover:text-blue-400 flex-shrink-0 transition-colors" />
          }
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium ${m.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
              {m.title}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">Son tarih: {formatDate(m.dueDate)}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
