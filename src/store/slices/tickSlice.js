export const createTickSlice = (set, get) => ({
  tick: () => {
    const state = get();
    if (state.autoEnergyPerSecond > 0) {
      set({
        energy: state.energy + state.autoEnergyPerSecond,
      });
      get().save();
    }
  },
});
