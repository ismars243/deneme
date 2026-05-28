import { Sparkles } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { generateAISuggestion } from '../../lib/utils';

export function AISuggestion() {
  const { transactions } = useData();
  const suggestion = generateAISuggestion(transactions);

  const text = suggestion.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  return (
    <div className="mx-4 rounded-2xl bg-gradient-to-r from-primary-50 to-indigo-50 dark:from-primary-900/20 dark:to-indigo-900/20 border border-primary-100 dark:border-primary-800/50 p-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/40 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
          <Sparkles size={16} className="text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 mb-1">AI Analiz</p>
          <p
            className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </div>
      </div>
    </div>
  );
}
