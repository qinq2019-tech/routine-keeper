
import React, { useState } from 'react';
import { Habit, CheckIn } from '../types';
import { ICONS, UI_ICONS } from '../constants';
import HabitCalendar from '../components/HabitCalendar';
import Heatmap from '../components/Heatmap';
import { isSameDay, subDays } from 'date-fns';

interface RoutineViewProps {
  habits: Habit[];
  checkins: CheckIn[];
  onDelete: (id: string) => void;
}

const RoutineView: React.FC<RoutineViewProps> = ({ habits, checkins, onDelete }) => {
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);

  const calculateStreak = (habitId: string) => {
    const sortedDates = checkins
      .filter(c => c.habitId === habitId)
      .map(c => new Date(c.date))
      .sort((a, b) => b.getTime() - a.getTime());

    if (sortedDates.length === 0) return 0;
    let streak = 0;
    let current = new Date();
    const checkedToday = sortedDates.some(d => isSameDay(d, current));
    if (!checkedToday) current = subDays(current, 1);

    for (let i = 0; i < sortedDates.length; i++) {
      if (isSameDay(sortedDates[i], current)) {
        streak++;
        current = subDays(current, 1);
      } else { break; }
    }
    return streak;
  };

  const selectedHabit = habits.find(h => h.id === selectedHabitId);

  if (selectedHabitId && selectedHabit) {
    const totalDone = checkins.filter(c => c.habitId === selectedHabit.id).length;
    const streak = calculateStreak(selectedHabit.id);
    const IconComp = ICONS.find(i => i.id === selectedHabit.icon)?.component || ICONS[0].component;

    return (
      <div className="pb-24 animate-in slide-in-from-right duration-300">
        <header className="flex justify-between items-center mb-10 px-2 mt-2">
          <button onClick={() => setSelectedHabitId(null)} className="p-2 -ml-2 text-gray-800">
            <UI_ICONS.ChevronLeft size={28} />
          </button>
          <div className="flex gap-4">
            <button className="text-gray-400 hover:text-gray-600">
              <UI_ICONS.Heart size={24} />
            </button>
            <button className="text-gray-400 hover:text-gray-600">
              <UI_ICONS.Edit size={24} />
            </button>
          </div>
        </header>

        <div className="flex flex-col items-center mb-10">
          <div 
            className="w-20 h-20 rounded-[30px] flex items-center justify-center mb-4 macaron-shadow"
            style={{ backgroundColor: selectedHabit.color }}
          >
            <IconComp size={40} className="text-gray-800" />
          </div>
          <h2 className="text-2xl font-black text-gray-800">{selectedHabit.name}</h2>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-[24px] p-6 macaron-shadow text-center">
            <p className="text-xl font-black text-gray-800">{totalDone}d</p>
            <p className="text-xs font-bold text-gray-400 mt-1">总完成</p>
          </div>
          <div className="bg-white rounded-[24px] p-6 macaron-shadow text-center">
            <p className="text-xl font-black text-gray-800">0</p>
            <p className="text-xs font-bold text-gray-400 mt-1">打卡值</p>
          </div>
          <div className="bg-white rounded-[24px] p-6 macaron-shadow text-center">
            <p className="text-xl font-black text-gray-800">0</p>
            <p className="text-xs font-bold text-gray-400 mt-1">光芒值</p>
          </div>
        </div>

        <HabitCalendar habitId={selectedHabit.id} checkins={checkins} color={selectedHabit.color} />

        <div className="mt-10 px-2">
          <h3 className="text-gray-400 font-bold text-sm mb-4">更多信息</h3>
          <div className="space-y-3">
            <button className="w-full bg-white rounded-3xl p-5 flex items-center justify-between macaron-shadow active:scale-[0.98] transition-all">
              <div className="flex items-center gap-4">
                <UI_ICONS.Layout size={20} className="text-gray-800" />
                <span className="font-bold text-gray-700">年度统计</span>
              </div>
              <UI_ICONS.ChevronRight size={20} className="text-gray-300" />
            </button>
            <button className="w-full bg-white rounded-3xl p-5 flex items-center justify-between macaron-shadow active:scale-[0.98] transition-all">
              <div className="flex items-center gap-4">
                <UI_ICONS.List size={20} className="text-gray-800" />
                <span className="font-bold text-gray-700">所有日志</span>
              </div>
              <UI_ICONS.ChevronRight size={20} className="text-gray-300" />
            </button>
          </div>
        </div>

        <button
          onClick={() => {
            if(confirm('确定要删除吗？')) {
              onDelete(selectedHabit.id);
              setSelectedHabitId(null);
            }
          }}
          className="mt-12 w-full text-red-300 font-bold text-sm hover:text-red-400 transition-colors"
        >
          删除习惯记录
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <header className="mb-8 mt-4">
        <h1 className="text-3xl font-black text-gray-800">习惯清单</h1>
        <p className="text-gray-400 font-bold mt-1">坚持是最好的财富</p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {habits.map(habit => {
          const IconData = ICONS.find(i => i.id === habit.icon) || ICONS[0];
          const HabitIcon = IconData.component;
          const streak = calculateStreak(habit.id);

          return (
            <div
              key={habit.id}
              onClick={() => setSelectedHabitId(habit.id)}
              className="bg-white rounded-[32px] p-6 macaron-shadow cursor-pointer hover:translate-y-[-4px] transition-transform active:scale-95 border border-white"
            >
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ backgroundColor: habit.color }}
              >
                <HabitIcon size={28} className="text-gray-800" />
              </div>
              <h4 className="text-lg font-bold text-gray-800 truncate mb-1">{habit.name}</h4>
              <div className="flex items-center gap-1.5">
                <UI_ICONS.Flame size={14} className="text-orange-400" />
                <span className="text-xs font-bold text-gray-400">{streak}天连击</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoutineView;
