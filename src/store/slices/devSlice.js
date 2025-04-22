export const createDevSlice = (set) => ({
  setEnergy: (amount) =>
    set(() => ({
      energy: typeof amount === 'number' && !isNaN(amount) ? amount : 0,
    })),

  resetGame: () => {
    localStorage.removeItem('gameState');

    set({
      energy: 0,
      energyPerClick: 1,
      upgradeLevel: 0,
      generatorLevel: 0,
      autoEnergyPerSecond: 0,
      generatorSpeedLevel: 0,
      generatorInterval: 1000,
    });
  },
});
