import { create } from 'zustand';

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

    addEnergy: () =>
      set((state) => {
        const updated = { energy: state.energy + state.energyPerClick };
        saveToLocalStorage({ ...state, ...updated });
        return updated;
      }),

    purchaseUpgrade: () =>
      set((state) => {
        const cost = Math.floor(15 * 2.5 ** state.upgradeLevel);
        if (state.energy < cost) return state;

        const updated = {
          energy: state.energy - cost,
          energyPerClick: state.energyPerClick + 1,
          upgradeLevel: state.upgradeLevel + 1,
        };
        saveToLocalStorage({ ...state, ...updated });
        return updated;
      }),

    purchaseGenerator: () =>
      set((state) => {
        const cost = Math.floor(50 * 2.5 ** state.generatorLevel);
        if (state.energy < cost) return state;

        const updated = {
          energy: state.energy - cost,
          generatorLevel: state.generatorLevel + 1,
          autoEnergyPerSecond: state.autoEnergyPerSecond + 1,
        };
        saveToLocalStorage({ ...state, ...updated });
        return updated;
      }),

    purchaseGeneratorSpeed: () =>
      set((state) => {
        const cost = Math.floor(100 * 2.5 ** state.generatorSpeedLevel);
        if (state.energy < cost) return state;

        const newSpeedLevel = state.generatorSpeedLevel + 1;
        const newInterval = Math.floor(1000 * 0.8 ** newSpeedLevel);

        const updated = {
          energy: state.energy - cost,
          generatorSpeedLevel: newSpeedLevel,
          generatorInterval: newInterval,
        };
        saveToLocalStorage({ ...state, ...updated });
        return updated;
      }),

    tick: () => {
      const { autoEnergyPerSecond } = get();
      if (autoEnergyPerSecond > 0) {
        set((state) => {
          const updated = { energy: state.energy + autoEnergyPerSecond };
          saveToLocalStorage({ ...state, ...updated });
          return updated;
        });
      }
    },
  };
});
