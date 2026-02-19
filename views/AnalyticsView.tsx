
import React from 'react';
import { Habit, CheckIn, TimeSlot } from '../types';
import { UI_ICONS } from '../constants';
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell, PieChart, Pie, Tooltip } from 'recharts';

interface AnalyticsViewProps {
  onClose: () => void;
  habits: Habit[];
  checkins: CheckIn[];
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ onClose, habits, checkins }) => {
  const completionByHabit = habits.map(h => ({
    name: h.name,
    count: checkins.filter(c => c.habitId === h.id).length,
    color: h.color
  })).sort((a, b) => b.count - a.count).slice(0, 5);

  const timeSlotDistribution = Object.values(TimeSlot).map(slot => ({
    name: slot,
    value: habits.filter(h => h.timeSlot === slot).length
  }));

  const COLORS = ['#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA'];

  return (
    <div className="fixed inset-0 z-[100] bg-[#FAFAFA] flex flex-col p-6 overflow-y-auto animate-in slide-in-from-bottom duration-500">
      <header className="flex items-center justify-between mb-10">
        <button onClick={onClose} className="p-2 -ml-2 text-gray-800">
          <UI_ICONS.ChevronLeft size={28} />
        </button>
        <h2 className="text-xl font-black text-gray-800">成长足迹</h2>
        <div className="w-10" />
      </header>

      <section className="space-y-6">
        <div className="bg-white p-8 rounded-[40px] macaron-shadow">
          <h4 className="text-sm font-bold text-gray-400 mb-8 flex items-center gap-2">
            <div className="w-1.5 h-4 bg-blue-400 rounded-full" />
            坚持排行榜
          </h4>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={completionByHabit}>
                <XAxis dataKey="name" hide />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
                />
                <Bar dataKey="count" radius={[12, 12, 12, 12]}>
                  {completionByHabit.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
            {completionByHabit.map((h, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: h.color }} />
                <span className="text-[11px] font-bold text-gray-400">{h.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[40px] macaron-shadow">
          <h4 className="text-sm font-bold text-gray-400 mb-4 flex items-center gap-2">
             <div className="w-1.5 h-4 bg-green-400 rounded-full" />
             习惯分布
          </h4>
          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={timeSlotDistribution}
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {timeSlotDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnalyticsView;
