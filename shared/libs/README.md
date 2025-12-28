# Component Libraries

Pre-configured setups for the 5 most popular React component libraries.

## Available Libraries

### 1. Material-UI (MUI)
**Best for:** Enterprise applications, Material Design aesthetics

- Pre-configured theme with custom colors
- Dark theme variant
- Provider component for easy setup
- 📁 Location: `shared/libs/mui/`
- 📖 [Read the docs](./mui/README.md)

```typescript
import { MuiProvider } from '@shared/libs/mui'
import { Button, Card } from '@mui/material'
```

### 2. Ant Design
**Best for:** Data-heavy dashboards, admin panels

- Pre-configured theme config
- Dark and compact theme variants
- ConfigProvider for global settings
- 📁 Location: `shared/libs/antd/`
- 📖 [Read the docs](./antd/README.md)

```typescript
import { AntdProvider } from '@shared/libs/antd'
import { Button, Table } from 'antd'
```

### 3. Chakra UI
**Best for:** Modern apps, built-in dark mode, accessibility

- Custom theme with brand colors
- Built-in responsive utilities
- Dark mode support out of the box
- 📁 Location: `shared/libs/chakra/`
- 📖 [Read the docs](./chakra/README.md)

```typescript
import { ChakraProviderWrapper } from '@shared/libs/chakra'
import { Button, Box } from '@chakra-ui/react'
```

### 4. shadcn/ui
**Best for:** Full design control, copy-paste components

- Pre-built accessible components
- Tailwind CSS based
- Copy-paste friendly
- 📁 Location: `shared/libs/shadcn/`
- 📖 [Read the docs](./shadcn/README.md)

```typescript
import { ShadcnButton, ShadcnCard } from '@shared/libs/shadcn'
```

### 5. Headless UI
**Best for:** Custom designs, full styling control

- Pre-styled common patterns
- Fully accessible components
- Works perfectly with Tailwind
- 📁 Location: `shared/libs/headless/`
- 📖 [Read the docs](./headless/README.md)

```typescript
import { Dropdown, Modal, Tabs } from '@shared/libs/headless'
```

## Quick Comparison

| Library | Bundle Size | Learning Curve | Customization | Best Use Case |
|---------|-------------|----------------|---------------|---------------|
| **Material-UI** | Large (~300KB) | Medium | Medium | Enterprise apps |
| **Ant Design** | Large (~500KB) | Low | Low | Admin dashboards |
| **Chakra UI** | Medium (~150KB) | Low | High | Modern web apps |
| **shadcn/ui** | Small (tree-shakeable) | Medium | Very High | Custom designs |
| **Headless UI** | Tiny (~20KB) | Medium | Very High | Full control needed |

## Installation Guide

Each library requires different dependencies. Here's what you need:

### Material-UI
```bash
npm install @mui/material @emotion/react @emotion/styled
```

### Ant Design
```bash
npm install antd
```

### Chakra UI
```bash
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

### shadcn/ui
```bash
npm install clsx tailwind-merge class-variance-authority lucide-react
```

### Headless UI
```bash
npm install @headlessui/react lucide-react
```

## Usage Examples

### Material-UI Setup
```typescript
// main.tsx
import { MuiProvider } from '@shared/libs/mui'

function App() {
  return (
    <MuiProvider>
      <YourApp />
    </MuiProvider>
  )
}
```

### Ant Design Setup
```typescript
// main.tsx
import { AntdProvider } from '@shared/libs/antd'
import 'antd/dist/reset.css'

function App() {
  return (
    <AntdProvider>
      <YourApp />
    </AntdProvider>
  )
}
```

### Chakra UI Setup
```typescript
// main.tsx
import { ChakraProviderWrapper } from '@shared/libs/chakra'

function App() {
  return (
    <ChakraProviderWrapper>
      <YourApp />
    </ChakraProviderWrapper>
  )
}
```

### shadcn/ui Setup
```typescript
// No provider needed - just import and use
import { ShadcnButton } from '@shared/libs/shadcn'

function MyComponent() {
  return <ShadcnButton>Click me</ShadcnButton>
}
```

### Headless UI Setup
```typescript
// No provider needed - just import and use
import { Dropdown } from '@shared/libs/headless'

function MyComponent() {
  return <Dropdown label="Menu" items={menuItems} />
}
```

## Choosing a Library

**Use Material-UI if:**
- Building an enterprise application
- Want Material Design look
- Need comprehensive component library
- Okay with larger bundle size

**Use Ant Design if:**
- Building admin panel or dashboard
- Need data-heavy components (tables, forms)
- Want quick development
- Chinese market focus

**Use Chakra UI if:**
- Want modern, accessible components
- Need dark mode support
- Value developer experience
- Building modern web app

**Use shadcn/ui if:**
- Want full design control
- Prefer copy-paste over npm install
- Using Tailwind CSS
- Want minimal bundle impact

**Use Headless UI if:**
- Need complete styling freedom
- Using custom design system
- Want accessibility built-in
- Minimal bundle size critical

## Mixing Libraries

While possible, we recommend picking one primary library per prototype for consistency. However, you can:

- Use Headless UI for specific components alongside any library
- Mix shadcn/ui with Headless UI (both Tailwind-friendly)
- Use utility libraries regardless of component choice

## Resources

- [Material-UI Docs](https://mui.com)
- [Ant Design Docs](https://ant.design)
- [Chakra UI Docs](https://chakra-ui.com)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [Headless UI Docs](https://headlessui.com)

## Contributing

To add more component configurations:

1. Create a new folder in `shared/libs/[library-name]/`
2. Add theme configuration, provider (if needed), and examples
3. Create a README.md with setup instructions
4. Update this file with the new library
5. Document in the main project docs
