
import React from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isToday 
} from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { CheckIn } from '../types';

interface HabitCalendarProps {
  habitId: string;
  checkins: CheckIn[];
  color: string;
}

const HabitCalendar: React.FC<HabitCalendarProps> = ({ habitId, checkins, color }) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  
  const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start, end });
  
  const habitCheckins = checkins.filter(c => c.habitId === habitId);
  const weekDays = ['一', '二', '三', '四', '五', '六', '日'];

  const monthCheckinsCount = habitCheckins.filter(c => 
    isSameMonth(new Date(c.date), currentMonth)
  ).length;

  return (
    <div className="bg-white rounded-[40px] p-6 macaron-shadow border border-gray-50 mt-4">
      <div className="flex justify-between items-center mb-6 px-2">
        <h3 className="text-gray-400 font-bold text-sm">打卡日历</h3>
      </div>
      
      <div className="text-center mb-6">
        <h2 className="text-xl font-black text-gray-800 tracking-tight">
          {format(currentMonth, 'yyyy-MM')}
        </h2>
      </div>

      <div className="grid grid-cols-7 gap-y-4 mb-4">
        {weekDays.map(wd => (
          <div key={wd} className="text-center text-xs font-bold text-gray-300">{wd}</div>
        ))}
        {days.map((day, idx) => {
          const hasCheckIn = habitCheckins.some(c => isSameDay(new Date(c.date), day));
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isDayToday = isToday(day);

          return (
            <div key={idx} className="flex flex-col items-center justify-center relative h-10">
              {!isCurrentMonth ? (
                <div className="w-1 h-0.5 bg-gray-100 rounded-full" />
              ) : (
                <div 
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 text-sm font-bold ${
                    hasCheckIn 
                    ? 'text-gray-800' 
                    : isDayToday ? 'border-2 border-gray-100 text-gray-800' : 'text-gray-800'
                  }`}
                  style={{ backgroundColor: hasCheckIn ? color : 'transparent' }}
                >
                  {format(day, 'd')}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-gray-50/50 rounded-[24px] p-4 flex justify-around mt-4">
        <div className="text-center">
          <p className="text-lg font-black text-gray-800">{monthCheckinsCount}d</p>
          <p className="text-[10px] font-bold text-gray-400">完成</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-black text-gray-800">0</p>
          <p className="text-[10px] font-bold text-gray-400">打卡值</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-black text-gray-800">0</p>
          <p className="text-[10px] font-bold text-gray-400">光芒值</p>
        </div>
      </div>
    </div>
  );
};

export default HabitCalendar;
