import { useState } from 'react';
import { Send } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { useToast } from '../ui/Toast';
import { formatDate } from '../../lib/utils';
import type { Comment } from '../../lib/mock-data';

export function Comments({ comments: initial }: { comments: Comment[] }) {
  const [comments, setComments] = useState(initial);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setComments(prev => [{
        id: `c${Date.now()}`,
        author: 'Admin Kullanıcı',
        role: 'Admin',
        content: text.trim(),
        date: new Date().toISOString().slice(0, 10),
      }, ...prev]);
      setText('');
      setLoading(false);
      toast('Yorum eklendi', 'success');
    }, 600);
  }

  return (
    <div className="space-y-4">
      <form onSubmit={submit} className="flex gap-3">
        <Avatar name="Admin Kullanıcı" size="sm" className="mt-0.5 flex-shrink-0" />
        <div className="flex-1 flex gap-2">
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Yorum yaz..."
            rows={2}
            className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-xl bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Button type="submit" size="sm" loading={loading} className="self-end">
            <Send size={14} />
          </Button>
        </div>
      </form>

      {comments.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">Henüz yorum yok.</p>
      ) : (
        <div className="space-y-3">
          {comments.map(c => (
            <div key={c.id} className="flex gap-3">
              <Avatar name={c.author} size="sm" className="flex-shrink-0 mt-0.5" />
              <div className="flex-1 bg-gray-50 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-gray-900">{c.author}</span>
                  <span className="text-xs text-gray-400">{c.role}</span>
                  <span className="text-xs text-gray-400 ml-auto">{formatDate(c.date)}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{c.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
