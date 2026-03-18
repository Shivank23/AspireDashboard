# Aspire – Card Management Dashboard

A frontend implementation of the Aspire business banking UI built as part of a frontend engineering challenge.

## Live Demo
🔗 https://aspire-dashboard-bcog.vercel.app/cards

## Tech Stack
- **React 18 + Vite** — fast dev server, modern React features
- **Tailwind CSS** — utility-first styling, easy to match designs pixel perfectly
- **React Router v6** — client-side routing for the sidebar navigation
- **Context API + useReducer** — global state management without any extra libraries
- **localStorage** — lightweight persistence, no backend needed

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/)

## Features
- Add new card via modal — cardholder name entered by user, card number and expiry auto-generated
- Freeze / Unfreeze card — toggles card status, frozen card turns greyscale with an overlay
- Card carousel — navigate between multiple cards with arrows and dot indicators
- Show / hide card number — masked by default, reveal on toggle
- Data persists in localStorage — cards survive page refresh, two seed cards loaded on first visit

## Approach

### Folder Structure
I organised the project by responsibility rather than file type. The `components/` folder is split into `ui/` (dumb, reusable atoms like Button, Input, Modal, Accordion) and `cards/` (smart components connected to state like CardCarousel, CardActions). Pages are thin composers that just assemble components together.

### State Management
I used Context API with `useReducer` instead of Redux. The state is simple — just a cards array and an active card ID — so there was no need for the extra complexity. All state transitions (load, add, update, set-active) go through a single reducer with explicit action types, making the data flow easy to follow.

### Testing
I have written test cases for every component using React Testing Library to ensure each piece of UI behaves correctly in isolation.

### API Layer
All data access is abstracted into `src/api/cardsApi.js` as async functions with a simulated delay. Components never touch localStorage directly. This means if a real backend is added later, only this one file needs to change — nothing else in the app is affected.

### Reusable UI Components
All SVG icons are centralised in `Icon.jsx` and referenced by name. The Modal component uses `ReactDOM.createPortal` to render at `document.body` level so it can never be clipped by a parent element's overflow or z-index.