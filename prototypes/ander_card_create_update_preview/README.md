# ander_card_create_update_preview

A UI/UX prototype for card creation, updates, and preview functionality.

## Features

- React 18 + TypeScript
- Vite for fast development
- Tailwind CSS for styling
- Material-UI component library
- Faker.js for mock data generation

## Development

```bash
npm install
npm start
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

```bash
npm run build
npm run preview
```

## Shared Resources

This prototype can use shared components and utilities from `../../shared/`:

```typescript
import { Button } from '@shared/components/Button'
import { api } from '@shared/libs/api'
import { MuiProvider } from '@shared/libs/mui'
```

## Material-UI

This prototype uses Material-UI for components. Import components like:

```typescript
import { Button, Card, Typography } from '@mui/material'
```

The MuiProvider is already configured in `main.tsx` with a custom theme from `@shared/libs/mui`.

## Mock Data

Generate realistic test data using the mock data utilities:

```typescript
import { generateMockData, generateMockCards } from './utils/mockData'

const data = generateMockData()
const cards = generateMockCards(10)
```
