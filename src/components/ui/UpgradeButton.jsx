import { formatNumber } from '../../utils/formatNumber';

export default function UpgradeButton({ title, description, level, value, cost, onClick, disabled, icon, color }) {
  const isAffordable = !disabled;

  return (
    <div
      className={`flex items-center p-2 rounded-lg transition-all border
        ${isAffordable ? 'border-cyan-400/30 hover:border-cyan-300/70' : 'border-white/10'}
        ${isAffordable ? 'bg-white/5 hover:bg-white/10' : 'bg-white/5'}
      `}
    >
      <div className="flex-1 pr-3">
        <div className={`font-semibold text-sm ${color || 'text-white'}`}>
          {icon && <span className="mr-1">{icon}</span>}
          {title}
        </div>
        <div className="text-xs text-white/60">{description}</div>
        <div className="mt-1 flex gap-2 text-xs text-cyan-300">
          <span className="font-medium">Level {level}</span>
          <span className="opacity-70">|</span>
          <span>{value}</span>
        </div>
      </div>
      <button
        className={`flex-shrink-0 px-4 py-2 text-xs font-medium rounded-md transition-all shadow-md transform
                    ${isAffordable ? 'bg-cyan-600 hover:bg-cyan-500 active:scale-95 hover:scale-105 text-white' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}
                  `}
        onClick={onClick}
        disabled={disabled}
      >
        Upgrade
        <br />
        <span className="text-xs">({formatNumber(cost)} ⚡)</span>
      </button>
    </div>
  );
}
