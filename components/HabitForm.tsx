
import React, { useState } from 'react';
import { MACARON_COLORS, ICONS, UI_ICONS, TIME_SLOTS } from '../constants';
import { Habit, TimeSlot, FrequencyType } from '../types';

interface HabitFormProps {
  onClose: () => void;
  onSubmit: (habit: Habit) => void;
  initialData?: Habit;
}

const HabitForm: React.FC<HabitFormProps> = ({ onClose, onSubmit, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [selectedIcon, setSelectedIcon] = useState(initialData?.icon || ICONS[0].id);
  const [selectedColor, setSelectedColor] = useState(initialData?.color || MACARON_COLORS[0].value);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot>(initialData?.timeSlot || TimeSlot.ANYTIME);
  const [points, setPoints] = useState(initialData?.points || 5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const habit: Habit = {
      id: initialData?.id || Math.random().toString(36).substr(2, 9),
      name,
      icon: selectedIcon,
      color: selectedColor,
      timeSlot: selectedTimeSlot,
      frequency: FrequencyType.DAILY,
      points: points,
      createdAt: initialData?.createdAt || Date.now(),
      reminderTime: '08:00'
    };
    onSubmit(habit);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-[40px] p-8 macaron-shadow animate-in slide-in-from-bottom duration-500 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {initialData ? '编辑习惯' : '养成新习惯'}
          </h2>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <UI_ICONS.X size={20} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name Input */}
          <section>
            <label className="block text-sm font-bold text-gray-500 mb-2 ml-1">起个好听的名字</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例如：每天喝水"
              className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-yellow-200 outline-none transition-all text-lg font-medium"
            />
          </section>

          {/* Icon Selector */}
          <section>
            <label className="block text-sm font-bold text-gray-500 mb-3 ml-1">选择图标</label>
            <div className="grid grid-cols-5 gap-3">
              {ICONS.map((icon) => {
                const IconComp = icon.component;
                return (
                  <button
                    key={icon.id}
                    type="button"
                    onClick={() => setSelectedIcon(icon.id)}
                    className={`p-4 rounded-2xl flex items-center justify-center transition-all ${
                      selectedIcon === icon.id ? 'bg-gray-100 scale-110' : 'hover:bg-gray-50'
                    }`}
                  >
                    <IconComp size={24} className={selectedIcon === icon.id ? 'text-gray-800' : 'text-gray-400'} />
                  </button>
                );
              })}
            </div>
          </section>

          {/* Color Selector */}
          <section>
            <label className="block text-sm font-bold text-gray-500 mb-3 ml-1">选择主题色</label>
            <div className="flex flex-wrap gap-4">
              {MACARON_COLORS.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setSelectedColor(color.value)}
                  className={`w-10 h-10 rounded-full border-4 transition-all ${
                    selectedColor === color.value ? 'border-gray-300 scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color.value }}
                />
              ))}
            </div>
          </section>

          {/* Time Slot Selector */}
          <section>
            <label className="block text-sm font-bold text-gray-500 mb-3 ml-1">打卡场景</label>
            <div className="flex flex-wrap gap-2">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTimeSlot(slot as TimeSlot)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    selectedTimeSlot === slot ? 'bg-gray-800 text-white shadow-lg' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </section>

          {/* Points Slider */}
          <section>
            <div className="flex justify-between items-center mb-2 px-1">
              <label className="text-sm font-bold text-gray-500">奖励积分</label>
              <span className="text-sm font-bold text-gray-800">+{points} 分</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={points}
              onChange={(e) => setPoints(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-yellow-400"
            />
          </section>

          <button
            type="submit"
            className="w-full py-5 bg-yellow-300 text-gray-800 rounded-3xl font-bold text-lg shadow-xl shadow-yellow-100 active:scale-[0.98] transition-all"
          >
            完成创建
          </button>
        </form>
      </div>
    </div>
  );
};

export default HabitForm;
