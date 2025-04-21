export function formatNumber(value) {
  const suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc'];
  const tier = Math.floor(Math.log10(Math.abs(value)) / 3);

  if (tier === 0) return value.toString();

  const suffix = suffixes[tier];
  const scale = 10 ** (tier * 3);
  const scaled = value / scale;

  return scaled.toFixed(1).replace(/\.0$/, '') + suffix;
}
