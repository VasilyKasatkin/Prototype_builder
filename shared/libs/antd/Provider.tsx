import React from 'react'
import { ConfigProvider } from 'antd'
import type { ThemeConfig } from 'antd'
import { antdTheme } from './theme'

interface AntdProviderProps {
  children: React.ReactNode
  theme?: ThemeConfig
}

/**
 * Ant Design ConfigProvider with default theme
 * Wrap your app with this to use Ant Design components
 *
 * @example
 * import { AntdProvider } from '@shared/libs/antd'
 *
 * function App() {
 *   return (
 *     <AntdProvider>
 *       <YourApp />
 *     </AntdProvider>
 *   )
 * }
 */
export function AntdProvider({ children, theme = antdTheme }: AntdProviderProps) {
  return (
    <ConfigProvider theme={theme}>
      {children}
    </ConfigProvider>
  )
}
