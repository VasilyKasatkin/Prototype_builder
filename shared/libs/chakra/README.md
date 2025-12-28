# Chakra UI Configuration

Pre-configured Chakra UI theme and provider for rapid prototyping.

## Installation

In your prototype, install Chakra UI:

```bash
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

## Usage

### Basic Setup

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

### Using Components

```typescript
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">Hello Chakra UI</Heading>
      </CardHeader>
      <CardBody>
        <Stack spacing={3}>
          <Text>This is a card component</Text>
          <Button colorScheme="brand">Click me</Button>
        </Stack>
      </CardBody>
    </Card>
  )
}
```

### Using Icons

```bash
npm install @chakra-ui/icons
```

```typescript
import { SearchIcon, EmailIcon } from '@chakra-ui/icons'
import { Button, IconButton } from '@chakra-ui/react'

function MyComponent() {
  return (
    <>
      <Button leftIcon={<SearchIcon />}>Search</Button>
      <IconButton aria-label="Email" icon={<EmailIcon />} />
    </>
  )
}
```

### Custom Theme

```typescript
import { ChakraProviderWrapper, chakraTheme } from '@shared/libs/chakra'
import { extendTheme } from '@chakra-ui/react'

const customTheme = extendTheme({
  ...chakraTheme,
  colors: {
    ...chakraTheme.colors,
    brand: {
      ...chakraTheme.colors.brand,
      500: '#ff5722', // Your custom color
    },
  },
})

function App() {
  return (
    <ChakraProviderWrapper theme={customTheme}>
      <YourApp />
    </ChakraProviderWrapper>
  )
}
```

### Dark Mode

```typescript
import { Button, useColorMode } from '@chakra-ui/react'

function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Button onClick={toggleColorMode}>
      Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
    </Button>
  )
}
```

### Responsive Design

```typescript
import { Box, Stack } from '@chakra-ui/react'

function ResponsiveComponent() {
  return (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      spacing={{ base: 4, md: 8 }}
    >
      <Box
        width={{ base: '100%', md: '50%' }}
        height={{ base: '200px', md: '300px' }}
        bg="brand.500"
      >
        Responsive Box
      </Box>
    </Stack>
  )
}
```

## Features

- Pre-configured brand color palette
- Custom typography with Inter font
- Consistent border radius and spacing
- Built-in dark mode support
- Accessible components by default
- Responsive utilities

## Common Components

- **Layout**: Box, Container, Stack, Grid, Flex
- **Forms**: Input, Select, Textarea, Checkbox, Radio
- **Data Display**: Card, Badge, Table, Tag, Avatar
- **Feedback**: Alert, Toast, Modal, Drawer
- **Overlay**: Menu, Popover, Tooltip
- **Navigation**: Breadcrumb, Tabs, Link

## Resources

- [Chakra UI Documentation](https://chakra-ui.com)
- [Component Library](https://chakra-ui.com/docs/components)
- [Theme Customization](https://chakra-ui.com/docs/styled-system/customize-theme)
- [Recipes](https://chakra-ui.com/community/recipes)
