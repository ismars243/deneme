import { useState } from 'react';
import { cn } from '../../lib/utils';

interface Tab {
  key: string;
  label: string;
  icon?: React.ReactNode;
}

interface Props {
  tabs: Tab[];
  children: (activeKey: string) => React.ReactNode;
  defaultKey?: string;
}

export function Tabs({ tabs, children, defaultKey }: Props) {
  const [active, setActive] = useState(defaultKey ?? tabs[0]?.key);
  return (
    <div>
      <div className="flex gap-1 border-b border-gray-200 overflow-x-auto scrollbar-thin">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors',
              active === t.key
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            )}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>
      <div className="pt-4">{children(active)}</div>
    </div>
  );
}
