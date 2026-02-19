
import React from 'react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { Habit, CheckIn, TimeSlot } from '../types';
import { UI_ICONS, ICONS } from '../constants';

interface TodayViewProps {
  habits: Habit[];
  checkins: CheckIn[];
  onCheckIn: (habitId: string) => void;
  onAddClick: () => void;
}

const TodayView: React.FC<TodayViewProps> = ({ habits, checkins, onCheckIn, onAddClick }) => {
  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const todayCheckedIds = checkins
    .filter(c => c.date === todayStr)
    .map(c => c.habitId);

  const groups: Record<TimeSlot, Habit[]> = {
    [TimeSlot.MORNING]: [],
    [TimeSlot.AFTERNOON]: [],
    [TimeSlot.EVENING]: [],
    [TimeSlot.ANYTIME]: [],
  };

  habits.forEach(h => {
    groups[h.timeSlot].push(h);
  });

  const Section = ({ title, items }: { title: string; items: Habit[] }) => {
    if (items.length === 0) return null;
    return (
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-400 mb-4 px-2">{title}</h3>
        <div className="grid grid-cols-1 gap-4">
          {items.map(habit => {
            const isDone = todayCheckedIds.includes(habit.id);
            const IconData = ICONS.find(i => i.id === habit.icon) || ICONS[0];
            const HabitIcon = IconData.component;

            return (
              <div
                key={habit.id}
                onClick={() => !isDone && onCheckIn(habit.id)}
                className={`group relative flex items-center p-5 rounded-[32px] transition-all cursor-pointer select-none ${
                  isDone 
                  ? 'bg-gray-50 opacity-60' 
                  : 'bg-white macaron-shadow active:scale-[0.97] hover:shadow-lg'
                }`}
              >
                <div 
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform ${isDone ? '' : 'group-hover:rotate-12'}`}
                  style={{ backgroundColor: isDone ? '#E5E7EB' : habit.color }}
                >
                  <HabitIcon size={28} className={isDone ? 'text-gray-400' : 'text-gray-800'} />
                </div>
                
                <div className="ml-5 flex-1">
                  <h4 className={`text-lg font-bold ${isDone ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                    {habit.name}
                  </h4>
                  <p className="text-xs font-bold text-gray-400 mt-0.5">每次完成 +{habit.points} 积分</p>
                </div>

                {isDone ? (
                  <div className="bg-green-100 p-2 rounded-full">
                    <UI_ICONS.Award size={20} className="text-green-500" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full border-2 border-gray-100 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gray-200" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="pb-24">
      <header className="flex justify-between items-center mb-8 px-2 mt-4">
        <div>
          <h1 className="text-3xl font-black text-gray-800">今日打卡</h1>
          <p className="text-gray-400 font-bold mt-1">
            {format(new Date(), 'MMMM do, EEEE', { locale: zhCN })}
          </p>
        </div>
        <button
          onClick={onAddClick}
          className="w-14 h-14 bg-yellow-300 rounded-[24px] flex items-center justify-center shadow-lg shadow-yellow-100 hover:rotate-90 transition-transform duration-500"
        >
          <UI_ICONS.Plus size={28} className="text-gray-800" />
        </button>
      </header>

      {habits.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-32 h-32 bg-gray-100 rounded-[40px] flex items-center justify-center mb-6">
            <UI_ICONS.Plus size={40} className="text-gray-300" />
          </div>
          <p className="text-gray-400 font-bold">还没有习惯哦，快去创建一个吧！</p>
        </div>
      ) : (
        <>
          <Section title="早晨美好时光" items={groups[TimeSlot.MORNING]} />
          <Section title="午后能量时刻" items={groups[TimeSlot.AFTERNOON]} />
          <Section title="深夜静谧时分" items={groups[TimeSlot.EVENING]} />
          <Section title="随时记录" items={groups[TimeSlot.ANYTIME]} />
        </>
      )}
    </div>
  );
};

export default TodayView;
