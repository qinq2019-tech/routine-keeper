
import React, { useState, useEffect, useCallback } from 'react';
import { storage } from './utils/storage';
import { Habit, CheckIn, UserProfile, ViewType } from './types';
import { UI_ICONS } from './constants';
import TodayView from './views/TodayView';
import RoutineView from './views/RoutineView';
import ProfileView from './views/ProfileView';
import AnalyticsView from './views/AnalyticsView';
import HabitForm from './components/HabitForm';
import { format } from 'date-fns';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('today');
  const [habits, setHabits] = useState<Habit[]>([]);
  const [checkins, setCheckins] = useState<CheckIn[]>([]);
  const [user, setUser] = useState<UserProfile>(storage.getUser());
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    setHabits(storage.getHabits());
    setCheckins(storage.getCheckIns());
  }, []);

  const handleAddHabit = useCallback((newHabit: Habit) => {
    const updatedHabits = [...habits, newHabit];
    setHabits(updatedHabits);
    storage.saveHabits(updatedHabits);
    setIsFormOpen(false);
  }, [habits]);

  const handleDeleteHabit = useCallback((id: string) => {
    const updatedHabits = habits.filter(h => h.id !== id);
    const updatedCheckins = checkins.filter(c => c.habitId !== id);
    setHabits(updatedHabits);
    setCheckins(updatedCheckins);
    storage.saveHabits(updatedHabits);
    storage.saveCheckIns(updatedCheckins);
  }, [habits, checkins]);

  const handleCheckIn = useCallback((habitId: string) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const newCheckIn: CheckIn = {
      habitId,
      date: today,
      timestamp: Date.now()
    };
    
    const updatedCheckins = [...checkins, newCheckIn];
    setCheckins(updatedCheckins);
    storage.saveCheckIns(updatedCheckins);

    const habit = habits.find(h => h.id === habitId);
    if (habit) {
      const updatedUser = { ...user, totalPoints: user.totalPoints + habit.points };
      setUser(updatedUser);
      storage.saveUser(updatedUser);
    }
  }, [checkins, habits, user]);

  const renderView = () => {
    switch (currentView) {
      case 'today':
        return <TodayView habits={habits} checkins={checkins} onCheckIn={handleCheckIn} onAddClick={() => setIsFormOpen(true)} />;
      case 'routine':
        return <RoutineView habits={habits} checkins={checkins} onDelete={handleDeleteHabit} />;
      case 'profile':
        return <ProfileView user={user} habits={habits} checkins={checkins} onOpenAnalytics={() => setCurrentView('analytics')} />;
      case 'analytics':
        return <AnalyticsView onClose={() => setCurrentView('profile')} habits={habits} checkins={checkins} />;
      default:
        return null;
    }
  };

  const showNav = currentView !== 'analytics';

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FAFAFA] flex flex-col relative overflow-x-hidden">
      <main className="flex-1 px-6 pt-6 overflow-y-auto">
        {renderView()}
      </main>

      {showNav && (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-sm bg-white/80 backdrop-blur-xl rounded-[40px] p-2 macaron-shadow flex justify-between items-center z-40 border border-white/40">
          <button 
            onClick={() => setCurrentView('today')}
            className={`flex-1 flex flex-col items-center py-3 rounded-[32px] transition-all ${currentView === 'today' ? 'bg-yellow-100' : ''}`}
          >
            <UI_ICONS.Layout size={24} className={currentView === 'today' ? 'text-yellow-600' : 'text-gray-400'} />
            <span className={`text-[10px] font-black mt-1 ${currentView === 'today' ? 'text-yellow-600' : 'text-gray-400'}`}>今日</span>
          </button>
          <button 
            onClick={() => setCurrentView('routine')}
            className={`flex-1 flex flex-col items-center py-3 rounded-[32px] transition-all ${currentView === 'routine' ? 'bg-orange-100' : ''}`}
          >
            <UI_ICONS.Calendar size={24} className={currentView === 'routine' ? 'text-orange-600' : 'text-gray-400'} />
            <span className={`text-[10px] font-black mt-1 ${currentView === 'routine' ? 'text-orange-600' : 'text-gray-400'}`}>清单</span>
          </button>
          <button 
            onClick={() => setCurrentView('profile')}
            className={`flex-1 flex flex-col items-center py-3 rounded-[32px] transition-all ${currentView === 'profile' ? 'bg-blue-100' : ''}`}
          >
            <UI_ICONS.User size={24} className={currentView === 'profile' ? 'text-blue-600' : 'text-gray-400'} />
            <span className={`text-[10px] font-black mt-1 ${currentView === 'profile' ? 'text-blue-600' : 'text-gray-400'}`}>我的</span>
          </button>
        </nav>
      )}

      {isFormOpen && (
        <HabitForm 
          onClose={() => setIsFormOpen(false)} 
          onSubmit={handleAddHabit} 
        />
      )}
    </div>
  );
};

export default App;
