# Rick and Morty — API Consumer

A small React + TypeScript app that consumes the official Rick and Morty GraphQL API. It features a portal landing scene and a characters view with pagination, status badge, species, origin, and first episode name.

---

## Overview

This project uses Apollo Client to query `https://rickandmortyapi.com/graphql` and render character cards with a simple, responsive UI.

- Stack: React, TypeScript, Vite, Apollo Client
- Data source: Rick and Morty GraphQL API
- Views:
  - Portal landing screen with animated portal
  - Characters listing with pagination

![Rick Sanchez](public/sanchez.png)

---

## Quick Start

- Prerequisites: Node.js 18+
- Install and run locally:

```
npm install
npm run dev
```

- Build for production:

```
npm run build
npm run preview
```

![Morty joins the adventure](public/morty.png)

---

## Project Structure

- `src/`
  - `App.tsx` — toggles between portal and characters view
  - `main.tsx` — React root and ApolloProvider wiring
  - `components/rickandmorty/`
    - `portal/portal.tsx` — animated portal landing (CSS only)
    - `graphQuery.ts` — GraphQL query for characters
    - `graphql.ts` — Apollo client configuration
    - `RicksAndMortyCharacters.tsx` — characters grid, pagination, loading/error states
    - `characters.css`, `portal/*.css` — styling assets
- `public/`
  - Brand images used in the app and documentation: `morty.png`, `summer.png`, `beth.png`, `jerry.png`, `sanchez.png`, `Rick.png`

![Summer UI vibes](public/summer.png)

---

## Architecture

- Rendering flow:
  - `App.tsx` maintains `showCharacters` state to switch views.
  - `Portal` is a purely visual entry screen.
  - `RickAndMorty` executes a paged GraphQL query via Apollo and renders a grid of character cards.
- Data flow:
  - `ApolloClient` configured in `graphql.ts` using `HttpLink` + `InMemoryCache`.
  - `useQuery` in `RicksAndMortyCharacters.tsx` runs `GET_CHARACTERS` with `page` variable.
  - UI reads `loading`, `error`, and `data` from Apollo to render states.

![Beth — architecture and data flow](public/beth.png)

---

## Data Model

The characters view expects the following data from GraphQL:

- `Character` fields used: `id`, `name`, `status`, `species`, `image`, `origin { name }`, `location { name }`, `episode { name }` (first episode name per API’s `results.episode[0]` semantics)
- `characters.info`: `count`, `pages`, `next`, `prev` for pagination controls

In code, the interface shape (simplified):

- Character: id (string), name (string), status (string), species (string), image (string), episode { name }, origin { name }, location { name }
- Query vars: page (number)

![Jerry keeps it practical](public/jerry.png)

---

## GraphQL Query

Defined in `components/rickandmorty/graphQuery.ts`:

- Query: `GetCharacter(page: Int!)`
- Endpoint: `https://rickandmortyapi.com/graphql`
- Fields fetched:
  - `characters.info { count, pages, next, prev }`
  - `characters.results { id, name, status, species, image, episode { name }, origin { name }, location { name } }`

Usage in `RicksAndMortyCharacters.tsx`:

- `useQuery(GET_CHARACTERS, { variables: { page } })`
- Handles `loading`, `error`, and `!data` with simple UI states

---

## UI and Styling

- CSS files:
  - `characters.css` — grid layout, cards, status badges, pagination buttons, starry background
  - `portal/fullscene.css` + `portal/style.css` — animated portal and title sequences
- UX behaviors:
  - Status badge color changes via `status-<state>` classes
  - Pagination buttons disabled based on `info.prev` and `info.next`
  - Back button returns to Portal
- Images are used for branding in header/sections and throughout this README.

![Style notes from Summer](public/summer.png)

---

## Error Handling

- Loading state: shows a centered “Loading...” message
- Error state: renders the `error.message` from Apollo
- Empty state: shows “No data” if response is missing
- Pagination guards: Next/Prev buttons disabled when `info.next/prev` are null

---

## Performance Considerations

- Apollo’s `InMemoryCache` provides normalized caching for repeated queries
- UI constrains render to `slice(0, 20)` to avoid oversized grids
- Potential improvements:
  - Prefetch adjacent pages when hovering Next/Prev
  - Debounce page changes for rapid navigation
  - Use `notifyOnNetworkStatusChange` to refine loading UX

---

## Testing Notes

- Component tests can mock Apollo with `MockedProvider`
- Scenarios:
  - Renders loading, error, and data states
  - Pagination button enable/disable logic
  - Card rendering of status/species/origin/episode fields

---

## Deployment

- Build output is static in `dist/`
- Can be hosted via Vercel, Netlify, or GitHub Pages
- Recommended CI steps: lint, typecheck, tests, build

---

## API Consumer Next Steps

Planned features to expand the API consumer:

- Locations module:
  - Query `location` list with filters by `type` and `dimension`
  - Location detail page linking residents to character cards
- Episodes module:
  - Query `episode` list with search by name/code (e.g., `S01E01`)
  - Episode detail page listing participating characters
- Style upgrades:
  - Theming (dark/light) via CSS variables
  - Subtle hover animations and list transitions
  - Responsive grid refinements and skeleton loaders
- Accessibility:
  - Keyboard navigation, ARIA roles, AA contrast compliance

![Sanchez suggests next steps](public/sanchez.png)

---

## Credits

- Data: Official Rick and Morty API — https://rickandmortyapi.com
- Images: Project `public/` folder (Morty, Summer, Beth, Jerry, Sanchez, Rick, cabeca, calca, pickle, rickpickle, robot)
