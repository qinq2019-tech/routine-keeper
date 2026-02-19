
import React from 'react';
import { format, subDays, eachDayOfInterval, isSameDay } from 'date-fns';
import { CheckIn } from '../types';

interface HeatmapProps {
  habitId: string;
  checkins: CheckIn[];
  color: string;
}

const Heatmap: React.FC<HeatmapProps> = ({ habitId, checkins, color }) => {
  const today = new Date();
  const startDate = subDays(today, 364); // Show last 365 days
  
  const days = eachDayOfInterval({ start: startDate, end: today });
  
  const habitCheckins = checkins.filter(c => c.habitId === habitId);

  return (
    <div className="flex flex-col gap-2 p-4 bg-white rounded-3xl macaron-shadow border border-gray-50 overflow-x-auto">
      <h4 className="text-sm font-bold text-gray-500 mb-2">坚持足迹</h4>
      <div className="flex gap-1">
        <div className="grid grid-flow-col grid-rows-7 gap-1">
          {days.map((day, idx) => {
            const hasCheckIn = habitCheckins.some(c => isSameDay(new Date(c.date), day));
            return (
              <div
                key={idx}
                className="w-3 h-3 rounded-sm transition-colors duration-300"
                style={{
                  backgroundColor: hasCheckIn ? color : '#F3F4F6'
                }}
                title={format(day, 'yyyy-MM-dd')}
              />
            );
          })}
        </div>
      </div>
      <div className="flex justify-between items-center text-[10px] text-gray-400 mt-2 px-1">
        <span>一年前</span>
        <span>今天</span>
      </div>
    </div>
  );
};

export default Heatmap;
