# Mealog

A PWA for weekly meal planning with nutrition tracking and grocery budgeting. Built with Antigravity.

## Tech Stack

- React 18 + TypeScript
- Vite 7
- Zustand (state management)
- Dexie.js (IndexedDB)
- Vanilla CSS + CSS Modules
- PWA (offline-first)

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/     # React components
├── store/          # Zustand stores
├── db/             # Dexie.js database
├── types/          # TypeScript types
├── utils/          # Utility functions
└── styles/         # Global CSS
```

## Features

- ✅ PWA with offline support
- ✅ Weekly meal planning with dual view modes
- ✅ Nutrition tracking
- ✅ Shopping list generation
- ✅ Meal catalog with filtering

## For further updates:

```bash
npm run build
firebase deploy --only hosting
```
