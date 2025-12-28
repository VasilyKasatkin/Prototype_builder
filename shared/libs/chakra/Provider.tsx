import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { chakraTheme } from './theme'

interface ChakraProviderWrapperProps {
  children: React.ReactNode
  theme?: typeof chakraTheme
}

/**
 * Chakra UI Provider with default theme
 * Wrap your app with this to use Chakra UI components
 *
 * @example
 * import { ChakraProviderWrapper } from '@shared/libs/chakra'
 *
 * function App() {
 *   return (
 *     <ChakraProviderWrapper>
 *       <YourApp />
 *     </ChakraProviderWrapper>
 *   )
 * }
 */
export function ChakraProviderWrapper({
  children,
  theme = chakraTheme,
}: ChakraProviderWrapperProps) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
