import { useGameStore } from '../store/useGameStore';
import { getUpgradeCost } from '../utils/helpers';
import { UPGRADE_CONFIG } from '../constants/upgradeConfig';

export function useUpgradeData() {
  // Pull all required state values individually
  const state = {
    upgradeLevel: useGameStore((s) => s.upgradeLevel),
    energyPerClick: useGameStore((s) => s.energyPerClick),
    generatorLevel: useGameStore((s) => s.generatorLevel),
    autoEnergyPerSecond: useGameStore((s) => s.autoEnergyPerSecond),
    generatorSpeedLevel: useGameStore((s) => s.generatorSpeedLevel),
    generatorInterval: useGameStore((s) => s.generatorInterval),
  };

  const purchaseUpgrade = useGameStore((s) => s.purchaseUpgrade);
  const purchaseGenerator = useGameStore((s) => s.purchaseGenerator);
  const purchaseGeneratorSpeed = useGameStore((s) => s.purchaseGeneratorSpeed);

  const actionMap = {
    purchaseUpgrade,
    purchaseGenerator,
    purchaseGeneratorSpeed,
  };

  return (
    Object.entries(UPGRADE_CONFIG)
      // eslint-disable-next-line no-unused-vars
      .filter(([_, config]) => {
        return !config.unlockCondition || config.unlockCondition(state);
      })
      .map(([key, config]) => {
        const level = state[config.stateKeys.level];
        const value = state[config.stateKeys.value];
        const onClick = actionMap[config.stateKeys.action];
        const cost = getUpgradeCost(key, level);

        const formattedValue = key === 'speed' ? `Every ${(value / 1000).toFixed(2)}s` : `+${value} ⚡/${key === 'clickPower' ? 'click' : 'sec'}`;

        const nextLevel = level + 1;
        const nextValueRaw = key === 'speed' ? 1000 * 0.8 ** nextLevel : value + 1;

        const formattedNextValue =
          key === 'speed' ? `Every ${(nextValueRaw / 1000).toFixed(2)}s` : `+${nextValueRaw} ⚡/${key === 'clickPower' ? 'click' : 'sec'}`;

        return {
          key,
          title: config.label,
          description: config.description,
          level,
          value: formattedValue,
          nextValue: formattedNextValue,
          cost,
          onClick,
          icon: config.icon,
          color: config.color,
        };
      })
  );
}
