import type { ThemeConfig } from 'antd'

/**
 * Default Ant Design theme configuration
 * Customize this to match your design system
 */
export const antdTheme: ThemeConfig = {
  token: {
    // Brand colors
    colorPrimary: '#3b82f6', // Blue-500
    colorSuccess: '#10b981',
    colorWarning: '#f59e0b',
    colorError: '#ef4444',
    colorInfo: '#3b82f6',

    // Typography
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: 14,

    // Border
    borderRadius: 8,

    // Spacing
    controlHeight: 40,

    // Layout
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',
  },
  components: {
    Button: {
      controlHeight: 40,
      fontSize: 14,
      borderRadius: 8,
    },
    Input: {
      controlHeight: 40,
      borderRadius: 8,
    },
    Select: {
      controlHeight: 40,
      borderRadius: 8,
    },
    Card: {
      borderRadius: 12,
    },
  },
}

/**
 * Dark theme variant
 */
export const antdDarkTheme: ThemeConfig = {
  ...antdTheme,
  algorithm: 'dark' as any, // This would need the actual algorithm from antd
  token: {
    ...antdTheme.token,
    colorBgContainer: '#1f2937',
    colorBgElevated: '#111827',
  },
}

/**
 * Compact theme variant (smaller components)
 */
export const antdCompactTheme: ThemeConfig = {
  ...antdTheme,
  token: {
    ...antdTheme.token,
    controlHeight: 32,
    fontSize: 13,
  },
}
