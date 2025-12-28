# Prototype Builder - CLI Commands

Quick reference for creating and managing UI/UX prototypes.

## Creating Prototypes

### Interactive Builder

Create a new prototype with guided prompts:

```bash
npm run new
```

This command will:
1. Ask for the prototype name
2. Let you choose features:
   - Component library (shadcn/ui, MUI, Headless UI, or none)
   - Routing (React Router or none)
   - Mock data utilities
   - Minimal setup option
3. Configure deployment options:
   - Local development only
   - Vercel/Netlify deployment scripts
   - Static HTML export
   - Docker configuration
4. Generate the prototype in `prototypes/[name]/`

### Quick Copy

Duplicate an existing prototype as a starting point:

```bash
npm run quick [source-prototype-name]
```

**Example:**
```bash
npm run quick ander_metrics
```

This will:
1. Ask for the new prototype name
2. Copy all files from the source prototype
3. Update package.json and configuration files
4. Create the new prototype in `prototypes/[new-name]/`

## Project Structure

```
Prototype_builder/
├── docs/                       # Documentation
├── shared/                     # Shared resources across all prototypes
│   ├── components/            # Reusable UI components
│   ├── libs/                  # Shared libraries
│   ├── utils/                 # Utility functions
│   └── templates/             # Base templates
├── scripts/                    # CLI build scripts
├── prototypes/                 # Your prototypes live here
│   ├── ander_metrics/
│   └── [your-prototype]/
└── package.json
```

## Using Shared Resources

All prototypes can access shared resources:

```typescript
// Import from shared components
import { Button } from '../../../shared/components/Button';

// Import from shared utils
import { mockData } from '../../../shared/utils/mockData';

// Import from shared libs
import { api } from '../../../shared/libs/api';
```

## Running a Prototype

Navigate to the prototype folder and run:

```bash
cd prototypes/[prototype-name]
npm install  # First time only
npm start    # or npm run dev
```

## Deployment

Each prototype can have its own deployment configuration based on what you selected during creation:

- **Vercel**: `npm run deploy:vercel`
- **Netlify**: `npm run deploy:netlify`
- **Static Export**: `npm run build` (outputs to `dist/`)
- **Docker**: `docker build -t prototype-name .`

## Component Libraries

The Prototype Builder includes pre-configured setups for 5 popular component libraries:

- **Material-UI (MUI)** - Enterprise applications
- **Ant Design** - Admin panels and dashboards
- **Chakra UI** - Modern apps with dark mode
- **shadcn/ui** - Tailwind-based components
- **Headless UI** - Fully customizable accessible components

Each library includes themes, providers, and complete documentation.

**📖 See the [Component Libraries Guide](./component-libraries.md) for setup and usage.**

## Best Practices

1. **Shared First**: Place reusable components in `shared/components/` rather than duplicating across prototypes
2. **Component Libraries**: Use pre-configured setups from `shared/libs/` for faster development
3. **Version Control**: Each prototype can have its own git history if needed
4. **Dependencies**: Keep shared dependencies in the root `package.json`, prototype-specific ones in prototype folders
5. **Naming**: Use descriptive names for prototypes (e.g., `dashboard-redesign`, `checkout-flow-v2`)

## Troubleshooting

**Issue**: Shared imports not resolving
- **Solution**: Ensure the relative path is correct (`../../../shared/...`)

**Issue**: npm scripts not found
- **Solution**: Make sure you're in the right directory (root for creation, prototype folder for running)

## Adding New Shared Resources

To add components/utilities that all prototypes can use:

1. Add files to appropriate `shared/` subfolder
2. Export from an index file if needed
3. Import in prototypes using relative paths
4. Update this documentation with examples
