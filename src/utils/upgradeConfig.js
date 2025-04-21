export const UPGRADE_CONFIG = {
  clickPower: {
    label: 'Click Power',
    description: 'Increase energy per click',
    baseCost: 15,
    scaling: 2.5,
    stateKeys: {
      level: 'upgradeLevel',
      value: 'energyPerClick',
      action: 'purchaseUpgrade',
    },
  },
  generator: {
    label: 'Auto Generator',
    description: 'Generate energy automatically',
    baseCost: 50,
    scaling: 2.5,
    stateKeys: {
      level: 'generatorLevel',
      value: 'autoEnergyPerSecond',
      action: 'purchaseGenerator',
    },
  },
  speed: {
    label: 'Auto Click Speed',
    description: 'Increase generator frequency',
    baseCost: 100,
    scaling: 2.5,
    stateKeys: {
      level: 'generatorSpeedLevel',
      value: 'generatorInterval',
      action: 'purchaseGeneratorSpeed',
    },
  },
};
