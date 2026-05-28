import { PageHeader } from '../components/layout/PageHeader';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../components/ui/Toast';
import { Moon, Sun, Globe, Bell, Info, ChevronRight, LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange}
      className={cn('relative w-11 h-6 rounded-full transition-colors flex-shrink-0',
        value ? 'bg-primary-500' : 'bg-slate-300 dark:bg-slate-600'
      )}>
      <span className={cn('absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform',
        value && 'translate-x-5'
      )} />
    </button>
  );
}

type ToggleItem = { icon: LucideIcon; label: string; kind: 'toggle'; value: boolean; onChange: () => void };
type LinkItem   = { icon: LucideIcon; label: string; kind: 'link'; value?: string; onClick?: () => void };
type SettingItem = ToggleItem | LinkItem;

export default function Settings() {
  const { dark, toggle } = useTheme();
  const { toast } = useToast();

  const sections: { title: string; items: SettingItem[] }[] = [
    {
      title: 'Görünüm',
      items: [
        { icon: dark ? Moon : Sun, label: 'Karanlık Tema', kind: 'toggle', value: dark, onChange: toggle },
      ],
    },
    {
      title: 'Bildirimler',
      items: [
        { icon: Bell, label: 'Bütçe Uyarıları',  kind: 'toggle', value: true,  onChange: () => toast('Yakında!', 'info') },
        { icon: Bell, label: 'Aylık Özet',        kind: 'toggle', value: false, onChange: () => toast('Yakında!', 'info') },
      ],
    },
    {
      title: 'Uygulama',
      items: [
        { icon: Globe, label: 'Dil',      kind: 'link', value: 'Türkçe', onClick: () => toast('Yakında!', 'info') },
        { icon: Info,  label: 'Versiyon', kind: 'link', value: '1.0.0' },
      ],
    },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader title="Ayarlar" />

      <div className="space-y-4 mx-4 my-4 pb-6">
        {sections.map(section => (
          <div key={section.title}>
            <p className="text-xs font-bold text-muted uppercase tracking-wide mb-2 px-1">{section.title}</p>
            <div className="card overflow-hidden divide-y divider">
              {section.items.map(item => (
                <div key={item.label}
                  className={cn('flex items-center gap-3 px-4 py-3.5',
                    item.kind === 'link' && item.onClick && 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors'
                  )}
                  onClick={item.kind === 'link' ? item.onClick : undefined}>
                  <item.icon size={18} className="text-slate-500 dark:text-slate-400 flex-shrink-0" />
                  <span className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
                  {item.kind === 'toggle' ? (
                    <Toggle value={item.value} onChange={item.onChange} />
                  ) : (
                    <div className="flex items-center gap-1">
                      {item.value && <span className="text-xs text-muted">{item.value}</span>}
                      {item.onClick && <ChevronRight size={14} className="text-slate-400" />}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
