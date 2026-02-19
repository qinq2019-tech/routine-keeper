
export enum TimeSlot {
  MORNING = '早起/上午',
  AFTERNOON = '中午/下午',
  EVENING = '晚上',
  ANYTIME = '任意时刻'
}

export enum FrequencyType {
  DAILY = '每天',
  WEEKLY = '每周',
}

export interface Habit {
  id: string;
  name: string;
  icon: string;
  color: string;
  timeSlot: TimeSlot;
  frequency: FrequencyType;
  points: number;
  reminderTime?: string;
  createdAt: number;
}

export interface CheckIn {
  habitId: string;
  date: string; // ISO string YYYY-MM-DD
  timestamp: number;
}

export interface UserProfile {
  nickname: string;
  avatar: string;
  totalPoints: number;
}

export interface Medal {
  id: string;
  days: number;
  name: string;
  icon: string;
  description: string;
}

export type ViewType = 'today' | 'routine' | 'profile' | 'analytics';
