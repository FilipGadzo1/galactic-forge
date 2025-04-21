import { useGameStore } from '../store/useGameStore';
import { getUpgradeCost } from '../utils/helpers';
import { UPGRADE_CONFIG } from '../constants/upgradeConfig';

export function useUpgradeData() {
  const energyPerClick = useGameStore((s) => s.energyPerClick);
  const upgradeLevel = useGameStore((s) => s.upgradeLevel);
  const generatorLevel = useGameStore((s) => s.generatorLevel);
  const autoEnergyPerSecond = useGameStore((s) => s.autoEnergyPerSecond);
  const generatorSpeedLevel = useGameStore((s) => s.generatorSpeedLevel);
  const generatorInterval = useGameStore((s) => s.generatorInterval);

  const purchaseUpgrade = useGameStore((s) => s.purchaseUpgrade);
  const purchaseGenerator = useGameStore((s) => s.purchaseGenerator);
  const purchaseGeneratorSpeed = useGameStore((s) => s.purchaseGeneratorSpeed);

  const stateMap = {
    upgradeLevel,
    energyPerClick,
    generatorLevel,
    autoEnergyPerSecond,
    generatorSpeedLevel,
    generatorInterval,
  };

  const actionMap = {
    purchaseUpgrade,
    purchaseGenerator,
    purchaseGeneratorSpeed,
  };

  return Object.entries(UPGRADE_CONFIG).map(([key, config]) => {
    const level = stateMap[config.stateKeys.level];
    const value = stateMap[config.stateKeys.value];
    const onClick = actionMap[config.stateKeys.action];
    const cost = getUpgradeCost(key, level);

    const formattedValue = key === 'speed' ? `Every ${(value / 1000).toFixed(2)}s` : `+${value} ⚡/${key === 'clickPower' ? 'click' : 'sec'}`;

    return {
      key,
      title: config.label,
      description: config.description,
      level,
      value: formattedValue,
      cost,
      onClick,
      icon: config.icon,
      color: config.color,
    };
  });
}
