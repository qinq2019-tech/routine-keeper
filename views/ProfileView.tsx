
import React from 'react';
import { Habit, CheckIn, UserProfile, ViewType } from '../types';
import { UI_ICONS, MEDALS } from '../constants';
import { isSameDay, subDays } from 'date-fns';

interface ProfileViewProps {
  user: UserProfile;
  habits: Habit[];
  checkins: CheckIn[];
  onOpenAnalytics: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, habits, checkins, onOpenAnalytics }) => {
  
  const calculateLongestStreak = () => {
    let maxStreak = 0;
    habits.forEach(habit => {
      const sortedDates = checkins
        .filter(c => c.habitId === habit.id)
        .map(c => new Date(c.date))
        .sort((a, b) => b.getTime() - a.getTime());

      if (sortedDates.length === 0) return;
      let currentStreak = 0;
      let checkDate = new Date();
      if (!sortedDates.some(d => isSameDay(d, checkDate))) checkDate = subDays(checkDate, 1);

      for (let i = 0; i < sortedDates.length; i++) {
        if (isSameDay(sortedDates[i], checkDate)) {
          currentStreak++;
          checkDate = subDays(checkDate, 1);
        } else { break; }
      }
      maxStreak = Math.max(maxStreak, currentStreak);
    });
    return maxStreak;
  };

  const longestStreak = calculateLongestStreak();

  return (
    <div className="pb-24 animate-in fade-in duration-500">
      <header className="mb-10 mt-6 flex items-center gap-6">
        <div className="relative">
          <img src={user.avatar} className="w-24 h-24 rounded-[36px] border-4 border-white macaron-shadow object-cover" alt="Avatar" />
          <div className="absolute -bottom-2 -right-2 bg-yellow-300 p-1.5 rounded-xl border-4 border-[#FAFAFA]">
            <UI_ICONS.Trophy size={16} className="text-gray-800" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">{user.nickname}</h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-sm font-bold text-gray-400">坚持的力量 ✨</span>
          </div>
        </div>
      </header>

      <div className="bg-white rounded-[40px] p-6 macaron-shadow mb-8 border border-white">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-black text-gray-800">打卡勋章</h3>
          <span className="text-xs font-bold text-gray-400">勋章馆</span>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {MEDALS.map(medal => {
            const isUnlocked = longestStreak >= medal.days;
            return (
              <div key={medal.id} className="flex flex-col items-center gap-2 group cursor-help">
                <div 
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-500 ${
                    isUnlocked 
                    ? 'bg-yellow-50 shadow-inner' 
                    : 'bg-gray-50 opacity-30 grayscale'
                  }`}
                >
                  {medal.icon}
                </div>
                <span className={`text-[10px] font-bold text-center ${isUnlocked ? 'text-yellow-600' : 'text-gray-300'}`}>
                  {medal.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <button 
          onClick={onOpenAnalytics}
          className="w-full bg-white rounded-[32px] p-6 flex items-center justify-between macaron-shadow active:scale-[0.98] transition-all border border-white"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
              <UI_ICONS.BarChart3 size={24} className="text-blue-400" />
            </div>
            <div className="text-left">
              <h4 className="font-bold text-gray-800">成长足迹</h4>
              <p className="text-xs font-bold text-gray-400">查看多维度数据分析</p>
            </div>
          </div>
          <UI_ICONS.ChevronRight size={20} className="text-gray-300" />
        </button>

        <button className="w-full bg-white rounded-[32px] p-6 flex items-center justify-between macaron-shadow active:scale-[0.98] transition-all border border-white opacity-60">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
              <UI_ICONS.Settings size={24} className="text-purple-400" />
            </div>
            <div className="text-left">
              <h4 className="font-bold text-gray-800">设置中心</h4>
              <p className="text-xs font-bold text-gray-400">个性化你的小时光</p>
            </div>
          </div>
          <UI_ICONS.ChevronRight size={20} className="text-gray-300" />
        </button>
      </div>

      <div className="mt-12 text-center">
        <p className="text-[10px] font-black text-gray-200 uppercase tracking-widest">Petit Habit v1.2</p>
      </div>
    </div>
  );
};

export default ProfileView;
