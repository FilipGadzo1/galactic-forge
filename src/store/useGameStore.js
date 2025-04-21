import { create } from 'zustand';

export const useGameStore = create((set, get) => ({
  energy: 0,
  energyPerClick: 1,
  upgradeLevel: 0,

  generatorLevel: 0,
  autoEnergyPerSecond: 0,

  generatorSpeedLevel: 0,
  generatorInterval: 1000,

  addEnergy: () =>
    set((state) => ({
      energy: state.energy + state.energyPerClick,
    })),

  purchaseUpgrade: () =>
    set((state) => {
      const cost = Math.floor(15 * 2.5 ** state.upgradeLevel);
      if (state.energy < cost) return state;

      return {
        energy: state.energy - cost,
        energyPerClick: state.energyPerClick + 1,
        upgradeLevel: state.upgradeLevel + 1,
      };
    }),

  purchaseGenerator: () =>
    set((state) => {
      const cost = Math.floor(50 * 2.5 ** state.generatorLevel);
      if (state.energy < cost) return state;

      return {
        energy: state.energy - cost,
        generatorLevel: state.generatorLevel + 1,
        autoEnergyPerSecond: state.autoEnergyPerSecond + 1,
      };
    }),

  purchaseGeneratorSpeed: () =>
    set((state) => {
      const cost = Math.floor(100 * 2.5 ** state.generatorSpeedLevel);
      if (state.energy < cost) return state;

      const newSpeedLevel = state.generatorSpeedLevel + 1;
      const newInterval = Math.floor(1000 * 0.8 ** newSpeedLevel);

      return {
        energy: state.energy - cost,
        generatorSpeedLevel: newSpeedLevel,
        generatorInterval: newInterval,
      };
    }),

  tick: () => {
    const { autoEnergyPerSecond } = get();
    if (autoEnergyPerSecond > 0) {
      set((state) => ({
        energy: state.energy + autoEnergyPerSecond,
      }));
    }
  },
}));
