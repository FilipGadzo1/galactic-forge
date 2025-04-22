import { create } from 'zustand';
import { createClickSlice } from './slices/clickSlice';
import { createUpgradeSlice } from './slices/upgradeSlice';
import { createGeneratorSlice } from './slices/generatorSlice';
import { createTickSlice } from './slices/tickSlice';
import { createDevSlice } from './slices/devSlice';

const STORAGE_KEY = 'galactic-forge-save';

function saveToLocalStorage(state) {
  const saveData = {
    energy: state.energy,
    energyPerClick: state.energyPerClick,
    upgradeLevel: state.upgradeLevel,
    generatorLevel: state.generatorLevel,
    autoEnergyPerSecond: state.autoEnergyPerSecond,
    generatorSpeedLevel: state.generatorSpeedLevel,
    generatorInterval: state.generatorInterval,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
}

function loadFromLocalStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error('Failed to load save:', err);
    return null;
  }
}

export const useGameStore = create((set, get) => {
  const initialState = {
    energy: 0,
    energyPerClick: 1,
    upgradeLevel: 0,

    generatorLevel: 0,
    autoEnergyPerSecond: 0,

    generatorSpeedLevel: 0,
    generatorInterval: 1000,
  };

  const saved = loadFromLocalStorage();
  if (saved) Object.assign(initialState, saved);

  return {
    ...initialState,

    // helpers
    save: () => saveToLocalStorage(get()),

    // slices
    ...createClickSlice(set, get),
    ...createUpgradeSlice(set, get),
    ...createGeneratorSlice(set, get),
    ...createTickSlice(set, get),
    ...createDevSlice(set),
  };
});
