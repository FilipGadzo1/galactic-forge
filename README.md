# Galactic Forge

Galactic Forge is a space-themed clicker game built with React, Three.js (via @react-three/fiber), Zustand, and Tailwind CSS. Collect cosmic energy, unlock upgrades, and automate your galactic forge into a powerful energy machine.

---

## Features

- Interactive 3D Stellar Core with hover & click feedback
- Energy collection via click and automated generators
- Upgrade panel with color-coded categories and tooltips
- Auto-clicker speed upgrades
- Conditional unlocks for certain upgrades
- Game state persistence via localStorage
- Polished UI with dynamic formatting and animation

---

## Tech Stack

- React + Vite + Tailwind CSS
- Zustand (state management using slices)
- Three.js via @react-three/fiber & @react-three/drei
- Modular structure for scalability and clarity

---

## Getting Started

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build
```

---

## Gameplay

- Click the Stellar Core to gain energy.
- Purchase upgrades from the upgrade panel.
- Unlock automation and efficiency over time.
- Scale your forge from humble spark to galactic power.

---

## Project Structure

```
src/
├── components/
│   ├── panels/         # Panels like UpgradePanel
│   ├── ui/             # Reusable UI components
│   └── visuals/        # StellarCore, 3D components
├── constants/          # Config-driven upgrade definitions
├── hooks/              # Custom logic hooks
├── store/              # Zustand store using slice pattern
├── utils/              # formatNumber, cost calculations
```

---

## Highlights

- Clean upgrade system with tooltip previews
- Smart cost scaling and unlock logic
- Smooth animations and UI polish
- Ready to extend with prestige, sound, or login features

---

Created by Filip Gadzo.
