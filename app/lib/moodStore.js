import { create } from 'zustand';

const useMoodStore = create((set) => ({
  mood: 'Serene',
  setMood: (newMood) => set({ mood: newMood }),
}));

export default useMoodStore;
