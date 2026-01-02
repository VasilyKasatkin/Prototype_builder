    # Prototype Builder

A rapid UI/UX prototyping tool for creating React-based interface prototypes with shared resources and configurable features.

## Quick Start

### Create a New Prototype (Interactive)

```bash
npm run new
```

This launches an interactive wizard that lets you:
- Choose a component library (shadcn/ui, Material-UI, Headless UI, or none)
- Add routing with React Router
- Include mock data utilities with Faker.js
- Configure deployment options (Vercel, Netlify, Docker, or local only)

### Quick Copy Existing Prototype

```bash
npm run quick [source-prototype-name]
```

Example:
```bash
npm run quick ander_metrics
```

This duplicates an existing prototype as a starting point.

## Project Structure

```
Prototype_builder/
├── docs/                       # Documentation
│   └── commands.md            # CLI command reference
├── shared/                     # Shared resources across all prototypes
│   ├── components/            # Reusable UI components
│   ├── libs/                  # Shared libraries & APIs
│   ├── utils/                 # Utility functions
│   └── templates/             # Base templates
├── scripts/                    # CLI build scripts
│   ├── create-prototype.js    # Interactive prototype creator
│   └── quick-copy.js          # Quick template duplicator
├── prototypes/                 # Your prototypes
│   ├── ander_metrics/         # Example prototype
│   └── [your-prototypes]/
└── package.json
```

## Shared Resources

All prototypes can access shared resources using the `@shared` alias:

```typescript
// Import shared components
import { Button } from '@shared/components/Button'

// Import shared utilities
import { formatDate } from '@shared/utils/dateHelpers'

// Import component library setups
import { MuiProvider } from '@shared/libs/mui'
import { Dropdown, Modal } from '@shared/libs/headless'
```

This eliminates duplication and allows you to build a library of reusable components across all your prototypes.

### Pre-configured Component Libraries

We include pre-configured setups for 5 popular React component libraries:

- **Material-UI (MUI)** - Enterprise applications
- **Ant Design** - Admin panels and dashboards
- **Chakra UI** - Modern apps with dark mode
- **shadcn/ui** - Tailwind-based components
- **Headless UI** - Fully customizable accessible components

Each library includes themes, providers, and documentation. See [shared/libs/README.md](shared/libs/README.md) for details.

## Tech Stack

Each prototype includes:
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling

Plus optional features:
- **Component Libraries** - shadcn/ui, Material-UI, or Headless UI
- **Routing** - React Router v6
- **Mock Data** - Faker.js for realistic test data
- **Deployment** - Pre-configured scripts for Vercel, Netlify, or Docker

## Working with Prototypes

### Running a Prototype

```bash
cd prototypes/[prototype-name]
npm install  # First time only
npm start    # Start development server
```

### Building for Production

```bash
npm run build    # Creates optimized build in dist/
npm run preview  # Preview production build
```

### Deploying

Each prototype includes deployment scripts based on your configuration:

```bash
npm run deploy:vercel   # Deploy to Vercel
npm run deploy:netlify  # Deploy to Netlify
```

For Docker:
```bash
docker build -t prototype-name .
docker run -p 4173:4173 prototype-name
```

## Examples

### Example: Dashboard Prototype

```bash
npm run new
# Name: sales-dashboard
# Component Library: shadcn/ui
# Routing: Yes
# Mock Data: Yes
# Deployment: Vercel
```

### Example: Landing Page

```bash
npm run new
# Name: product-landing
# Component Library: Headless UI
# Routing: No
# Mock Data: No
# Deployment: Netlify
```

### Example: Quick Iteration

```bash
npm run quick ander_metrics
# New name: ander-metrics-v2
```

## Best Practices

1. **Shared First** - Put reusable components in `shared/components/` rather than duplicating
2. **Naming** - Use descriptive names: `checkout-flow-v2`, `dashboard-redesign`, `mobile-nav-concept`
3. **Dependencies** - Keep common dependencies in root `package.json`, prototype-specific ones local
4. **Iterations** - Use `npm run quick` to create variations of existing prototypes
5. **Clean Up** - Remove unused prototypes to keep the project manageable

## Documentation

See [docs/commands.md](docs/commands.md) for detailed CLI command reference.

## Existing Prototypes

- **ander_metrics** - Progress tracking dashboard with charts and metrics

## Contributing

When adding new shared resources:
1. Place them in the appropriate `shared/` subfolder
2. Export from an index file for cleaner imports
3. Document usage in `docs/`
4. Consider adding TypeScript types

## License

ISC
