import UpgradeButton from '../ui/UpgradeButton';
import { useGameStore } from '../../store/useGameStore';
import { useUpgradeData } from '../../hooks/useUpgradeData';

export default function UpgradePanel() {
  const energy = useGameStore((s) => s.energy);
  const upgrades = useUpgradeData();

  return (
    <div className="absolute bottom-4 left-4 bg-white/5 backdrop-blur-md text-white px-6 py-5 rounded-2xl shadow-2xl border border-white/10 space-y-4 w-96">
      <div className="text-lg font-bold border-b border-white/20 pb-2">🚀 Upgrades</div>

      {upgrades.map((u) => (
        <UpgradeButton
          key={u.key}
          title={u.title}
          description={u.description}
          level={u.level}
          value={u.value}
          cost={u.cost}
          onClick={u.onClick}
          disabled={energy < u.cost}
        />
      ))}
    </div>
  );
}
