import { getUpgradeCost } from '../../utils/helpers';
import { ENERGY_TICK_INTERVAL, GENERATOR_SPEED_SCALING, UPGRADE_TYPES } from '../../utils/constants';

export const createGeneratorSlice = (set, get) => ({
  purchaseGenerator: () => {
    const state = get();
    const cost = getUpgradeCost(UPGRADE_TYPES.GENERATOR, state.generatorLevel);
    if (state.energy < cost) return;

    set({
      energy: state.energy - cost,
      generatorLevel: state.generatorLevel + 1,
      autoEnergyPerSecond: state.autoEnergyPerSecond + 1,
    });
    get().save();
  },

  purchaseGeneratorSpeed: () => {
    const state = get();
    const cost = getUpgradeCost(UPGRADE_TYPES.SPEED, state.generatorSpeedLevel);
    if (state.energy < cost) return;

    const newSpeedLevel = state.generatorSpeedLevel + 1;
    const newInterval = Math.floor(ENERGY_TICK_INTERVAL * GENERATOR_SPEED_SCALING ** newSpeedLevel);

    set({
      energy: state.energy - cost,
      generatorSpeedLevel: newSpeedLevel,
      generatorInterval: newInterval,
    });
    get().save();
  },
});
