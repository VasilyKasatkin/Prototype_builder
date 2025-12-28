# Component Libraries Quick Reference

This guide helps you choose and use the right component library for your prototype.

## Overview

The Prototype Builder includes pre-configured setups for 5 popular React component libraries. Each is optimized for different use cases and comes with themes, providers, and examples.

## Quick Decision Matrix

| If you need... | Use this library |
|----------------|------------------|
| Enterprise-ready Material Design | Material-UI (MUI) |
| Data-heavy admin interface | Ant Design |
| Modern app with dark mode | Chakra UI |
| Full design control with Tailwind | shadcn/ui |
| Minimal bundle, maximum customization | Headless UI |

## Installation & Setup

### Material-UI (MUI)

**1. Install dependencies:**
```bash
npm install @mui/material @emotion/react @emotion/styled
```

**2. Setup in your prototype:**
```typescript
// main.tsx
import { MuiProvider } from '@shared/libs/mui'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MuiProvider>
    <App />
  </MuiProvider>
)
```

**3. Use components:**
```typescript
import { Button, Card, CardContent, Typography } from '@mui/material'

function MyComponent() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Hello MUI</Typography>
        <Button variant="contained">Click me</Button>
      </CardContent>
    </Card>
  )
}
```

**📖 Full docs:** [shared/libs/mui/README.md](/shared/libs/mui/README.md)

---

### Ant Design

**1. Install dependencies:**
```bash
npm install antd
```

**2. Setup in your prototype:**
```typescript
// main.tsx
import { AntdProvider } from '@shared/libs/antd'
import 'antd/dist/reset.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AntdProvider>
    <App />
  </AntdProvider>
)
```

**3. Use components:**
```typescript
import { Button, Table, Card, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

function MyComponent() {
  return (
    <Space direction="vertical" size="large">
      <Card title="Data Table">
        <Table dataSource={data} columns={columns} />
      </Card>
      <Button type="primary" icon={<SearchOutlined />}>
        Search
      </Button>
    </Space>
  )
}
```

**📖 Full docs:** [shared/libs/antd/README.md](/shared/libs/antd/README.md)

---

### Chakra UI

**1. Install dependencies:**
```bash
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

**2. Setup in your prototype:**
```typescript
// main.tsx
import { ChakraProviderWrapper } from '@shared/libs/chakra'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProviderWrapper>
    <App />
  </ChakraProviderWrapper>
)
```

**3. Use components:**
```typescript
import { Button, Box, Stack, useColorMode } from '@chakra-ui/react'

function MyComponent() {
  const { toggleColorMode } = useColorMode()

  return (
    <Stack spacing={4}>
      <Box p={5} shadow="md" borderWidth="1px">
        <Button colorScheme="brand">Click me</Button>
      </Box>
      <Button onClick={toggleColorMode}>Toggle Dark Mode</Button>
    </Stack>
  )
}
```

**📖 Full docs:** [shared/libs/chakra/README.md](/shared/libs/chakra/README.md)

---

### shadcn/ui

**1. Install dependencies:**
```bash
npm install clsx tailwind-merge class-variance-authority lucide-react
```

**2. Configure Tailwind (see full docs for CSS variables)**

**3. Use components (no provider needed):**
```typescript
import {
  ShadcnButton,
  ShadcnCard,
  ShadcnCardHeader,
  ShadcnCardTitle,
  ShadcnCardContent,
} from '@shared/libs/shadcn'

function MyComponent() {
  return (
    <ShadcnCard>
      <ShadcnCardHeader>
        <ShadcnCardTitle>Card Title</ShadcnCardTitle>
      </ShadcnCardHeader>
      <ShadcnCardContent>
        <ShadcnButton>Click me</ShadcnButton>
      </ShadcnCardContent>
    </ShadcnCard>
  )
}
```

**📖 Full docs:** [shared/libs/shadcn/README.md](/shared/libs/shadcn/README.md)

---

### Headless UI

**1. Install dependencies:**
```bash
npm install @headlessui/react lucide-react
```

**2. Use pre-styled components (no provider needed):**
```typescript
import { Dropdown, Modal, Tabs } from '@shared/libs/headless'
import { useState } from 'react'

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { label: 'Edit', onClick: () => console.log('Edit') },
    { label: 'Delete', onClick: () => console.log('Delete') },
  ]

  return (
    <>
      <Dropdown label="Actions" items={menuItems} />

      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Confirm">
        <p>Are you sure?</p>
      </Modal>
    </>
  )
}
```

**📖 Full docs:** [shared/libs/headless/README.md](/shared/libs/headless/README.md)

---

## Detailed Comparison

### Bundle Size Impact

| Library | Minified + Gzipped | Tree Shakeable | Notes |
|---------|-------------------|----------------|-------|
| Material-UI | ~80KB base | Yes | Grows with usage |
| Ant Design | ~60KB base | Partial | Icons add ~50KB |
| Chakra UI | ~45KB base | Yes | Includes motion lib |
| shadcn/ui | ~5KB base | Yes | Only what you copy |
| Headless UI | ~15KB base | Yes | Smallest footprint |

### Learning Curve

- **Easiest:** Ant Design, Chakra UI (great docs, intuitive APIs)
- **Medium:** Material-UI, Headless UI (more concepts to learn)
- **Steeper:** shadcn/ui (requires Tailwind knowledge)

### Customization Flexibility

- **Most Flexible:** shadcn/ui, Headless UI (full control)
- **Flexible:** Chakra UI, Material-UI (theme system)
- **Less Flexible:** Ant Design (opinionated design)

### Component Coverage

- **Most Complete:** Ant Design, Material-UI (100+ components)
- **Good Coverage:** Chakra UI (50+ components)
- **Basic Coverage:** shadcn/ui, Headless UI (core components)

## Common Patterns

### Using Multiple Libraries

While not recommended, you can mix libraries:

```typescript
// Use Headless UI for specific interactive components
import { Dropdown } from '@shared/libs/headless'

// Use Chakra UI for layout and design system
import { Box, Stack } from '@chakra-ui/react'

function MyComponent() {
  return (
    <Box p={4}>
      <Stack spacing={4}>
        <Dropdown label="Menu" items={menuItems} />
        {/* Rest of Chakra components */}
      </Stack>
    </Box>
  )
}
```

### Theming Across Libraries

Each library stores its theme configuration in `shared/libs/[library]/theme.ts`. Customize there:

```typescript
// shared/libs/mui/theme.ts
export const muiThemeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#your-brand-color',
    },
  },
}
```

### Using with Existing Prototypes

To add a library to an existing prototype:

1. Install the library dependencies
2. Import the provider (if needed) in `main.tsx`
3. Start using components
4. Optionally customize the theme in `shared/libs/[library]/theme.ts`

## Tips & Best Practices

### Performance

- Use tree-shaking by importing components individually
- Lazy load heavy components with React.lazy()
- Consider bundle size when choosing a library

### Consistency

- Pick one primary library per prototype
- Use shared components from that library's ecosystem
- Keep design patterns consistent

### Accessibility

- All libraries support accessibility
- Headless UI and Chakra UI have best a11y defaults
- Test with keyboard navigation and screen readers

### TypeScript

- All our setups include TypeScript support
- Most libraries have excellent type definitions
- Use the types for better DX

## Troubleshooting

### Import Errors

If you get import errors:
1. Verify dependencies are installed: `npm install`
2. Check the import path uses `@shared/libs/...`
3. Ensure `tsconfig.json` has path aliases configured

### Styling Issues

If styles don't apply:
1. **MUI/Chakra/Ant Design:** Ensure Provider wraps your app
2. **shadcn/ui:** Check Tailwind config includes CSS variables
3. **Headless UI:** Verify Tailwind includes the component paths

### Bundle Size Problems

If your bundle is too large:
1. Check for duplicate libraries
2. Use code splitting with React.lazy()
3. Consider switching to lighter libraries (shadcn/ui, Headless UI)

## Resources

- [Component Libraries Guide](/shared/libs/README.md)
- [MUI Documentation](https://mui.com)
- [Ant Design Documentation](https://ant.design)
- [Chakra UI Documentation](https://chakra-ui.com)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Headless UI Documentation](https://headlessui.com)

## Getting Help

1. Check the library-specific README in `shared/libs/[library]/`
2. Read the official documentation
3. Search examples on the library's website
4. Check community forums and GitHub issues
