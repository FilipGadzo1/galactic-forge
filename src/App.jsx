import Experience from './canvas/Experience';
import { useGameStore } from './store/useGameStore';
import UpgradePanel from './components/UpgradePanel';
import { useEffect, useState } from 'react';
import { formatNumber } from './utils/formatNumber';
import ClickFeedback from './components/ClickFeedback';

function App() {
  const energy = useGameStore((state) => state.energy);

  const generatorInterval = useGameStore((state) => state.generatorInterval);

  useEffect(() => {
    const tick = () => useGameStore.getState().tick();

    const interval = setInterval(tick, generatorInterval);
    return () => clearInterval(interval);
  }, [generatorInterval]);

  const [clicks, setClicks] = useState([]);

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

      <div className="absolute top-4 left-4 text-white text-xl font-bold bg-black/50 px-4 py-2 rounded">⚡ Cosmic Energy: {formatNumber(energy)}</div>

      <UpgradePanel />

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
