# FamilyCart

A real-time collaborative shopping list app for families. Anyone in the room can add, check off, and manage items — changes appear instantly on every device.

## Features

- Multiple named lists per room
- Items grouped by category (produce, dairy, bakery, etc.) with auto-detection in English and Hebrew
- Smart autocomplete based on items you've added before
- Rename lists inline
- Archive completed lists
- Duplicate item prevention

## Tech

| | |
|---|---|
| UI | React 18 |
| Sync | Firebase Firestore (real-time listeners, transactions) |
| Build | Vite |
| Tests | Vitest |

No login required — everyone joins via a shared 6-character room code.

## Getting started

```bash
cp .env.example .env   # add your Firebase config
npm install
npm run dev
```

See [ENV.md](ENV.md) for Firebase setup and [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for creating a project.

## Scripts

```bash
npm run dev        # local dev server
npm run build      # production build → dist/
npm test           # run unit tests
npm run test:watch # watch mode
```
