import React from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { muiTheme } from './theme'

interface MuiProviderProps {
  children: React.ReactNode
  theme?: typeof muiTheme
}

/**
 * Material-UI Provider with default theme
 * Wrap your app with this to use MUI components
 *
 * @example
 * import { MuiProvider } from '@shared/libs/mui'
 *
 * function App() {
 *   return (
 *     <MuiProvider>
 *       <YourApp />
 *     </MuiProvider>
 *   )
 * }
 */
export function MuiProvider({ children, theme = muiTheme }: MuiProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
