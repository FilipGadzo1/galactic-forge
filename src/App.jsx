import { useEffect, useState } from 'react';
import Experience from './components/canvas/Experience';
import { useGameStore } from './store/useGameStore';
import { formatNumber } from './utils/formatNumber';
import ClickFeedback from './components/ui/ClickFeedback';
import UpgradePanel from './components/panels/UpgradePanel';
import { useClickSound } from './hooks/useClickSound';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const energy = useGameStore((state) => state.energy);
  const generatorInterval = useGameStore((state) => state.generatorInterval);
  const playClickSound = useClickSound();

  const [clicks, setClicks] = useState([]);
  const [bursts, setBursts] = useState([]);

  useEffect(() => {
    const tick = () => useGameStore.getState().tick();
    const interval = setInterval(tick, generatorInterval);
    return () => clearInterval(interval);
  }, [generatorInterval]);

  const spawnClickFeedback = (e, value) => {
    const container = document.getElementById('game-root');
    if (!container) return;
    const rect = container.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const id = uuidv4();
    const point = e.point.clone();

    setClicks((prev) => [...prev, { id, x, y, value }]);
    setBursts((prev) => [...prev, { id, position: [point.x, point.y, point.z] }]);
    playClickSound();
  };

  return (
    <div id="game-root" className="h-screen w-screen relative overflow-hidden">
      <Experience onClickCore={spawnClickFeedback} bursts={bursts} setBursts={setBursts} />

      <div className="absolute top-4 left-4 text-white text-xl font-bold bg-black/50 px-4 py-2 rounded">⚡ Cosmic Energy: {formatNumber(energy)}</div>

      <UpgradePanel />

      {clicks.map((c) => (
        <ClickFeedback key={c.id} x={c.x} y={c.y} value={c.value} onDone={() => setClicks((prev) => prev.filter((p) => p.id !== c.id))} />
      ))}
    </div>
  );
}

export default App;
