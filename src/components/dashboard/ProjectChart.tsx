import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { chartData } from '../../lib/mock-data';

export function ProjectChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Aylık Proje Aktivitesi</CardTitle>
        <span className="text-xs text-gray-300">Son 5 ay</span>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} margin={{ top: 4, right: 0, bottom: 0, left: -28 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="ay"
              tick={{ fontSize: 11, fill: '#cbd5e1' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#cbd5e1' }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 10,
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.06)',
                fontSize: 12,
                padding: '8px 12px',
              }}
              cursor={{ fill: 'rgba(0,0,0,0.03)' }}
            />
            <Bar dataKey="aktif" name="Aktif" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={32} />
            <Bar dataKey="tamamlandı" name="Tamamlandı" fill="#e2e8f0" radius={[4, 4, 0, 0]} maxBarSize={32} />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-4 mt-3 justify-center">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <div className="w-2.5 h-2.5 rounded-sm bg-blue-500" />
            Aktif
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <div className="w-2.5 h-2.5 rounded-sm bg-gray-200" />
            Tamamlandı
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
