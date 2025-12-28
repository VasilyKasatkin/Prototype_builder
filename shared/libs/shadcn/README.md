# shadcn/ui Components

Pre-built shadcn/ui style components for rapid prototyping.

## Installation

In your prototype, install the required dependencies:

```bash
npm install clsx tailwind-merge class-variance-authority
npm install lucide-react # For icons
```

## Tailwind Configuration

Add this to your `tailwind.config.js`:

```javascript
module.exports = {
  darkMode: ['class'],
  content: [
    './src/**/*.{ts,tsx}',
    '../../shared/**/*.{ts,tsx}', // Include shared components
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}
```

## CSS Variables

Add this to your `index.css`:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
  }
}
```

## Usage

### Button Component

```typescript
import { ShadcnButton } from '@shared/libs/shadcn'

function MyComponent() {
  return (
    <>
      <ShadcnButton>Default</ShadcnButton>
      <ShadcnButton variant="destructive">Delete</ShadcnButton>
      <ShadcnButton variant="outline">Outline</ShadcnButton>
      <ShadcnButton variant="ghost">Ghost</ShadcnButton>
      <ShadcnButton size="lg">Large Button</ShadcnButton>
    </>
  )
}
```

### Card Component

```typescript
import {
  ShadcnCard,
  ShadcnCardHeader,
  ShadcnCardTitle,
  ShadcnCardDescription,
  ShadcnCardContent,
  ShadcnCardFooter,
} from '@shared/libs/shadcn'

function MyComponent() {
  return (
    <ShadcnCard>
      <ShadcnCardHeader>
        <ShadcnCardTitle>Card Title</ShadcnCardTitle>
        <ShadcnCardDescription>Card description goes here</ShadcnCardDescription>
      </ShadcnCardHeader>
      <ShadcnCardContent>
        <p>Card content</p>
      </ShadcnCardContent>
      <ShadcnCardFooter>
        <ShadcnButton>Action</ShadcnButton>
      </ShadcnCardFooter>
    </ShadcnCard>
  )
}
```

### Using the cn utility

```typescript
import { cn } from '@shared/libs/shadcn'

function MyComponent() {
  const isActive = true

  return (
    <div
      className={cn(
        'base-class',
        'text-gray-900',
        isActive && 'bg-blue-500',
        !isActive && 'bg-gray-200'
      )}
    >
      Content
    </div>
  )
}
```

## Adding More Components

To add more shadcn/ui components:

1. Visit [ui.shadcn.com](https://ui.shadcn.com)
2. Browse the component library
3. Copy the component code
4. Paste into `shared/libs/shadcn/[component-name].tsx`
5. Update `index.ts` to export the component
6. Follow the installation instructions for any required dependencies

## Features

- Pre-built accessible components
- Customizable with Tailwind CSS
- Dark mode support built-in
- Type-safe with TypeScript
- Copy-paste friendly

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Component Library](https://ui.shadcn.com/docs/components/accordion)
- [Theming Guide](https://ui.shadcn.com/docs/theming)
- [Examples](https://ui.shadcn.com/examples/dashboard)
