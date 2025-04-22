import { useEffect, useState } from 'react';
import { useGameStore } from '../../store/useGameStore';

export default function DevTools() {
  const [visible, setVisible] = useState(false);
  const [energyInput, setEnergyInput] = useState('');

  const setEnergy = useGameStore((s) => s.setEnergy);
  const resetGame = useGameStore((s) => s.resetGame);

  useEffect(() => {
    const handleSecretKey = (e) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'g') {
        localStorage.setItem('devAccess', 'true');
        setVisible((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleSecretKey);
    return () => window.removeEventListener('keydown', handleSecretKey);
  }, []);

  const applyEnergy = () => {
    const num = Number(energyInput);
    if (!isNaN(num)) {
      setEnergy(num);
    }
  };

  if (!visible) return null;

  return (
    <div className="absolute top-4 right-4 bg-white/90 text-black px-4 py-3 rounded-lg shadow-xl border border-black/10 space-y-2 z-50 w-64">
      <div className="text-sm font-semibold border-b border-white/20 pb-1">🛠️ Dev Tools</div>

      <div>
        <label className="block text-xs mb-1">Set Energy</label>
        <input
          type="number"
          className="w-full border px-2 py-1 rounded text-sm text-black bg-white border-gray-300"
          value={energyInput}
          onChange={(e) => setEnergyInput(e.target.value)}
          placeholder="Enter energy"
        />

        <button onClick={applyEnergy} className="mt-1 w-full bg-gray-800 hover:bg-gray-700 text-sm px-2 py-1 rounded text-white transition-all">
          Apply
        </button>
      </div>

      <div>
        <button onClick={resetGame} className="w-full mt-2 bg-red-600 hover:bg-red-500 text-sm px-2 py-1 rounded text-white transition-all">
          Reset Game
        </button>
      </div>
    </div>
  );
}
