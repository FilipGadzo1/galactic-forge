import Experience from './canvas/Experience';
import { useGameStore } from './store/useGameStore';
import { useEffect, useState } from 'react';
import { formatNumber } from './utils/formatNumber';
import ClickFeedback from './components/ui/ClickFeedback';
import UpgradePanel from './components/panels/UpgradePanel';
import DevTools from './components/panels/DevTools';

function App() {
  const energy = useGameStore((state) => state.energy);
  const generatorInterval = useGameStore((state) => state.generatorInterval);
  const hasDevAccess = import.meta.env.DEV || localStorage.getItem('devAccess') === 'true';

  const [clicks, setClicks] = useState([]);

  useEffect(() => {
    const tick = () => useGameStore.getState().tick();

    const interval = setInterval(tick, generatorInterval);
    return () => clearInterval(interval);
  }, [generatorInterval]);

  useEffect(() => {
    const interval = setInterval(() => {
      const state = useGameStore.getState();
      localStorage.setItem(
        'galactic-forge-save',
        JSON.stringify({
          energy: state.energy,
          energyPerClick: state.energyPerClick,
          upgradeLevel: state.upgradeLevel,
          generatorLevel: state.generatorLevel,
          autoEnergyPerSecond: state.autoEnergyPerSecond,
          generatorSpeedLevel: state.generatorSpeedLevel,
          generatorInterval: state.generatorInterval,
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  function spawnClickFeedback(domEvent, value) {
    if (!domEvent) return;

    const { clientX, clientY } = domEvent;
    const container = document.getElementById('game-root');
    const rect = container.getBoundingClientRect();

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const id = crypto.randomUUID();
    setClicks((prev) => [...prev, { id, x, y, value }]);
  }

  return (
    <div id="game-root" className="h-screen w-screen relative overflow-hidden">
      <Experience onClickCore={spawnClickFeedback} />

      <div className="absolute top-4 left-4 text-white text-xl font-bold bg-black/50 px-4 py-2 rounded">
        ⚡ Cosmic Energy: {typeof energy === 'number' ? formatNumber(energy) : 0}
      </div>

      <UpgradePanel />
      {hasDevAccess && <DevTools />}

      {clicks.map((c) => (
        <ClickFeedback
          key={c.id}
          x={c.x}
          y={c.y}
          value={c.value}
          onDone={() => {
            setClicks((prev) => prev.filter((p) => p.id !== c.id));
          }}
        />
      ))}
    </div>
  );
}

export default App;
