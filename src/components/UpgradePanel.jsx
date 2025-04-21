import { useGameStore } from '../store/useGameStore';
import UpgradeButton from './UpgradeButton';

export default function UpgradePanel() {
  const energy = useGameStore((s) => s.energy);

  const energyPerClick = useGameStore((s) => s.energyPerClick);
  const upgradeLevel = useGameStore((s) => s.upgradeLevel);
  const purchaseUpgrade = useGameStore((s) => s.purchaseUpgrade);
  const clickUpgradeCost = Math.floor(15 * 2.5 ** upgradeLevel);

  const generatorLevel = useGameStore((s) => s.generatorLevel);
  const autoEnergyPerSecond = useGameStore((s) => s.autoEnergyPerSecond);
  const purchaseGenerator = useGameStore((s) => s.purchaseGenerator);
  const generatorCost = Math.floor(50 * 2.5 ** generatorLevel);

  const generatorSpeedLevel = useGameStore((s) => s.generatorSpeedLevel);
  const generatorInterval = useGameStore((s) => s.generatorInterval);
  const purchaseGeneratorSpeed = useGameStore((s) => s.purchaseGeneratorSpeed);
  const speedUpgradeCost = Math.floor(100 * 2.5 ** generatorSpeedLevel);

  return (
    <div className="absolute bottom-4 left-4 bg-white/5 backdrop-blur-md text-white px-6 py-5 rounded-2xl shadow-2xl border border-white/10 space-y-4 w-96">
      <div className="text-lg font-bold border-b border-white/20 pb-2">🚀 Upgrades</div>

      <UpgradeButton
        title="Click Power"
        description="Increase energy per click"
        level={upgradeLevel}
        value={`+${energyPerClick} ⚡/click`}
        cost={clickUpgradeCost}
        onClick={purchaseUpgrade}
        disabled={energy < clickUpgradeCost}
      />

      <UpgradeButton
        title="Auto Generator"
        description="Generate energy automatically"
        level={generatorLevel}
        value={`+${autoEnergyPerSecond} ⚡/sec`}
        cost={generatorCost}
        onClick={purchaseGenerator}
        disabled={energy < generatorCost}
      />

      <UpgradeButton
        title="Auto Click Speed"
        description="Increase generator frequency"
        level={generatorSpeedLevel}
        value={`Every ${(generatorInterval / 1000).toFixed(2)}s`}
        cost={speedUpgradeCost}
        onClick={purchaseGeneratorSpeed}
        disabled={energy < speedUpgradeCost}
      />
    </div>
  );
}
