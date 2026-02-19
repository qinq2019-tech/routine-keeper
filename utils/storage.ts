
import { Habit, CheckIn, UserProfile } from '../types';

const KEYS = {
  HABITS: 'petit_habit_habits',
  CHECKINS: 'petit_habit_checkins',
  USER: 'petit_habit_user'
};

export const storage = {
  getHabits: (): Habit[] => {
    const data = localStorage.getItem(KEYS.HABITS);
    return data ? JSON.parse(data) : [];
  },
  saveHabits: (habits: Habit[]) => {
    localStorage.setItem(KEYS.HABITS, JSON.stringify(habits));
  },
  getCheckIns: (): CheckIn[] => {
    const data = localStorage.getItem(KEYS.CHECKINS);
    return data ? JSON.parse(data) : [];
  },
  saveCheckIns: (checkins: CheckIn[]) => {
    localStorage.setItem(KEYS.CHECKINS, JSON.stringify(checkins));
  },
  getUser: (): UserProfile => {
    const data = localStorage.getItem(KEYS.USER);
    return data ? JSON.parse(data) : {
      nickname: '自律小能手',
      avatar: 'https://picsum.photos/seed/habit/200/200',
      totalPoints: 0
    };
  },
  saveUser: (user: UserProfile) => {
    localStorage.setItem(KEYS.USER, JSON.stringify(user));
  }
};
