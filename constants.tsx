
import React from 'react';
import { 
  Coffee, Droplets, BookOpen, Sun, Moon, 
  Heart, Star, Zap, Smile, Check, Plus,
  Layout, Calendar, User, Settings,
  Flame, Award, Target, PieChart,
  Edit, Trash2, ChevronRight, X, ChevronLeft,
  Medal as MedalIcon, Trophy, BarChart3, List
} from 'lucide-react';

export const MACARON_COLORS = [
  { name: 'Peach Pink', value: '#FFB7B2', text: '#9A3412' },
  { name: 'Cream Yellow', value: '#FFDAC1', text: '#854D0E' },
  { name: 'Mint Green', value: '#E2F0CB', text: '#166534' },
  { name: 'Sky Blue', value: '#B5EAD7', text: '#075985' },
  { name: 'Lavender', value: '#C7CEEA', text: '#6B21A8' },
  { name: 'Rose', value: '#FF9AA2', text: '#9D174D' },
];

export const ICONS = [
  { id: 'coffee', component: Coffee },
  { id: 'droplets', component: Droplets },
  { id: 'book', component: BookOpen },
  { id: 'sun', component: Sun },
  { id: 'moon', component: Moon },
  { id: 'heart', component: Heart },
  { id: 'star', component: Star },
  { id: 'zap', component: Zap },
  { id: 'smile', component: Smile },
  { id: 'check', component: Check },
  { id: 'target', component: Target },
  { id: 'laptop', component: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
      <line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  )}
];

export const UI_ICONS = {
  Plus,
  Layout,
  Calendar,
  User,
  Settings,
  Flame,
  Award,
  PieChart,
  Edit,
  Trash2,
  ChevronRight,
  ChevronLeft,
  X,
  MedalIcon,
  Trophy,
  BarChart3,
  List,
  // Added Heart to UI_ICONS to fix Error in file views/RoutineView.tsx on line 54
  Heart
};

export const MEDALS = [
  { id: 'm1', days: 7, name: '初露锋芒', icon: '🌱', description: '连续打卡7天' },
  { id: 'm2', days: 21, name: '习惯养成', icon: '🍀', description: '连续打卡21天' },
  { id: 'm3', days: 30, name: '自律达人', icon: '🌟', description: '连续打卡30天' },
  { id: 'm4', days: 90, name: '意志顽强', icon: '🏔️', description: '连续打卡90天' },
  { id: 'm5', days: 180, name: '生活大师', icon: '👑', description: '连续打卡180天' },
];

export const TIME_SLOTS = [
  '早起/上午',
  '中午/下午',
  '晚上',
  '任意时刻'
];
