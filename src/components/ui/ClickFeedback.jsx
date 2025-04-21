import { useEffect, useState } from 'react';

export default function ClickFeedback({ x, y, value, onDone }) {
  const [style, setStyle] = useState({
    position: 'absolute',
    left: x,
    top: y,
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#fff',
    opacity: 1,
    transition: 'transform 0.8s ease-out, opacity 0.8s ease-out',
  });

  useEffect(() => {
    requestAnimationFrame(() => {
      setStyle((prev) => ({
        ...prev,
        transform: 'translate(-50%, -150%)',
        opacity: 0,
      }));
    });

    const timeout = setTimeout(onDone, 800);
    return () => clearTimeout(timeout);
  }, [onDone]);

  return <div style={style}>+{value} ⚡</div>;
}
