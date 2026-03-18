# Aspire – Business Banking Dashboard

A pixel-perfect implementation of the Aspire card management UI, built as a frontend coding challenge.

## Tech Stack

| Tool | Purpose |
|------|---------|
| Vite | Build tool / dev server |
| React 18 | UI framework |
| React Router v6 | Client-side routing |
| Context API + useReducer | Global state management |
| Tailwind CSS | Styling |
| localStorage | Client-side persistence |

## Project Structure

```
src/
├── api/              # Dummy API layer (simulates server, reads/writes localStorage)
├── components/
│   ├── cards/        # Card-specific components (DebitCard, CardCarousel, CardActions…)
│   ├── layout/       # AppLayout, Sidebar
│   ├── modals/       # AddCardModal
│   └── ui/           # Reusable atoms: Button, Input, Modal, Accordion, Badge, Icon, Spinner
├── constants/        # App-wide constants (CARD_STATUS, NAV_ITEMS, CARD_ACTIONS…)
├── context/          # CardContext — global state with useReducer
├── hooks/            # useModal, useTransactions
├── pages/            # CardsPage + placeholder pages
├── styles/           # Global CSS (Tailwind directives)
└── utils/            # cardUtils (generate card number, expiry, CVV, formatCurrency)
```

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
http://localhost:5173/cards
```

## Features

- **Card carousel** – navigate between multiple cards with prev/next arrows and dot indicators
- **Add new card** – opens a modal, enter cardholder name, card number + expiry auto-generated
- **Freeze / Unfreeze** – toggles card status; frozen cards render with greyscale + overlay
- **Show / Hide card number** – toggle masked ↔ full card number and CVV
- **Card details accordion** – collapsible panel showing card metadata
- **Recent transactions accordion** – collapsible panel with dummy transaction data
- **Persistence** – cards stored in `localStorage`, survive page refresh
- **Routing** – `/cards`, `/home`, `/payments`, `/credit`, `/settings`

## Design Decisions

- **Context API over Redux** — the state surface is small (cards array + active card). Context + useReducer is sufficient and avoids extra dependencies.
- **API layer** (`src/api/cardsApi.js`) — all data access goes through async functions that simulate network latency. Swapping in a real API requires changing only this file.
- **Dummy data seeded on first load** — two cards are written to `localStorage` on the first visit so the UI is never empty.
- **Icon library centralised** (`src/components/ui/Icon.jsx`) — all SVG icons live in one file; import by name everywhere else.
