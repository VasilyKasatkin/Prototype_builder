# Material-UI (MUI) Configuration

Pre-configured Material-UI theme and provider for rapid prototyping.

## Installation

In your prototype, install MUI:

```bash
npm install @mui/material @emotion/react @emotion/styled
```

## Usage

### Basic Setup

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

### Using Components

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

### Custom Theme

```typescript
import { MuiProvider, muiTheme } from '@shared/libs/mui'
import { createTheme } from '@mui/material/styles'

const customTheme = createTheme({
  ...muiTheme,
  palette: {
    ...muiTheme.palette,
    primary: {
      main: '#ff5722', // Your custom color
    },
  },
})

function App() {
  return (
    <MuiProvider theme={customTheme}>
      <YourApp />
    </MuiProvider>
  )
}
```

## Features

- Pre-configured color palette
- Custom typography with Inter font
- Consistent component styling
- Dark theme variant available
- CssBaseline included

## Resources

- [MUI Documentation](https://mui.com)
- [Component API](https://mui.com/material-ui/api/button/)
- [Theme Customization](https://mui.com/material-ui/customization/theming/)
