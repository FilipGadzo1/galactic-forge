import { getUpgradeCost } from '../../utils/helpers';
import { UPGRADE_TYPES } from '../../utils/constants';

export const createUpgradeSlice = (set, get) => ({
  purchaseUpgrade: () => {
    const state = get();
    const cost = getUpgradeCost(UPGRADE_TYPES.CLICK_POWER, state.upgradeLevel);
    if (state.energy < cost) return;

    set({
      energy: state.energy - cost,
      energyPerClick: state.energyPerClick + 1,
      upgradeLevel: state.upgradeLevel + 1,
    });
    get().save();
  },
});
