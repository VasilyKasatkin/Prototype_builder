# Shared Resources

This directory contains resources shared across all prototypes.

## Components

Reusable UI components that can be imported in any prototype:

```typescript
import { Button, Card, CardHeader, CardTitle, CardContent } from '@shared/components'

// Or import individually
import { Button } from '@shared/components/Button'
```

### Available Components

- **Button** - Configurable button with variants (primary, secondary, outline, ghost) and sizes
- **Card** - Container component with header, title, and content sub-components

## Utils

Utility functions for common tasks:

```typescript
import { formatDate, getRelativeTime, cn } from '@shared/utils'

const formatted = formatDate(new Date(), 'long')
const relative = getRelativeTime(new Date())
const classes = cn('base-class', condition && 'conditional-class')
```

### Available Utils

- **dateHelpers** - Format dates, get relative time strings, check if date is today
- **cn** - Conditionally join class names (useful with Tailwind)

## Libs

Pre-configured setups for popular component libraries and shared utilities.

### Component Libraries

We have pre-configured setups for 5 popular React component libraries:

- **Material-UI (MUI)** - Enterprise apps, Material Design
- **Ant Design** - Admin panels, data-heavy dashboards
- **Chakra UI** - Modern apps with built-in dark mode
- **shadcn/ui** - Full design control, Tailwind-based
- **Headless UI** - Custom designs with accessibility

Each library includes:
- Pre-configured theme
- Provider component (where applicable)
- Usage examples
- Complete documentation

📖 **[Read the Component Libraries Guide](./libs/README.md)**

```typescript
// Example: Using Material-UI
import { MuiProvider, muiTheme } from '@shared/libs/mui'
import { Button } from '@mui/material'

// Example: Using Headless UI
import { Dropdown, Modal } from '@shared/libs/headless'
```

### Custom Libraries

You can also add custom shared libraries:

```
libs/
├── api/
│   ├── client.ts
│   └── endpoints.ts
└── analytics/
    └── tracker.ts
```

## Adding New Shared Resources

1. Create your component/util/lib in the appropriate folder
2. Export it from an index file for cleaner imports
3. Document usage here
4. Consider adding TypeScript types for better DX

## Best Practices

- Keep shared resources generic and reusable
- Don't include prototype-specific logic
- Use TypeScript for type safety
- Follow consistent naming conventions
- Document props and parameters
