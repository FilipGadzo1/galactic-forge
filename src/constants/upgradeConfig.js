export const UPGRADE_CONFIG = {
  clickPower: {
    label: 'Click Power',
    description: 'Increase energy per click',
    icon: '🖱️',
    color: 'text-cyan-300',
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
    icon: '⚙️',
    color: 'text-yellow-300',
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
    icon: '⏱️',
    color: 'text-pink-300',
    baseCost: 100,
    scaling: 2.5,
    stateKeys: {
      level: 'generatorSpeedLevel',
      value: 'generatorInterval',
      action: 'purchaseGeneratorSpeed',
    },
  },
};
