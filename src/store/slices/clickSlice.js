export const createClickSlice = (set, get) => ({
  addEnergy: () => {
    set((state) => ({
      energy: state.energy + state.energyPerClick,
    }));
    get().save();
  },
});
