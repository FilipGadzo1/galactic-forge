import { UPGRADE_CONFIG } from './upgradeConfig';

export function getUpgradeCost(type, level) {
  const config = UPGRADE_CONFIG[type];
  if (!config) throw new Error(`Unknown upgrade type: ${type}`);
  return Math.floor(config.baseCost * config.scaling ** level);
}
