# Ant Design Configuration

Pre-configured Ant Design theme and provider for rapid prototyping.

## Installation

In your prototype, install Ant Design:

```bash
npm install antd
```

## Usage

### Basic Setup

```typescript
// main.tsx
import { AntdProvider } from '@shared/libs/antd'
import App from './App'
import 'antd/dist/reset.css' // Reset styles

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AntdProvider>
    <App />
  </AntdProvider>
)
```

### Using Components

```typescript
import { Button, Card, Typography, Space } from 'antd'

const { Title, Paragraph } = Typography

function MyComponent() {
  return (
    <Card>
      <Space direction="vertical">
        <Title level={3}>Hello Ant Design</Title>
        <Paragraph>This is a card component</Paragraph>
        <Button type="primary">Click me</Button>
      </Space>
    </Card>
  )
}
```

### Using Icons

```bash
npm install @ant-design/icons
```

```typescript
import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import { Button } from 'antd'

function MyComponent() {
  return (
    <>
      <Button icon={<HomeOutlined />}>Home</Button>
      <Button icon={<UserOutlined />} type="primary">Profile</Button>
    </>
  )
}
```

### Custom Theme

```typescript
import { AntdProvider, antdTheme } from '@shared/libs/antd'
import type { ThemeConfig } from 'antd'

const customTheme: ThemeConfig = {
  ...antdTheme,
  token: {
    ...antdTheme.token,
    colorPrimary: '#ff5722', // Your custom color
  },
}

function App() {
  return (
    <AntdProvider theme={customTheme}>
      <YourApp />
    </AntdProvider>
  )
}
```

### Dark Theme

```typescript
import { AntdProvider, antdDarkTheme } from '@shared/libs/antd'

function App() {
  return (
    <AntdProvider theme={antdDarkTheme}>
      <YourApp />
    </AntdProvider>
  )
}
```

### Compact Theme

```typescript
import { AntdProvider, antdCompactTheme } from '@shared/libs/antd'

function App() {
  return (
    <AntdProvider theme={antdCompactTheme}>
      <YourApp />
    </AntdProvider>
  )
}
```

## Features

- Pre-configured color palette
- Custom typography with Inter font
- Consistent component styling
- Dark and compact theme variants
- Modern border radius and spacing

## Common Components

- **Layout**: Layout, Header, Sider, Content, Footer
- **Navigation**: Menu, Breadcrumb, Pagination, Steps
- **Data Entry**: Form, Input, Select, DatePicker, Upload
- **Data Display**: Table, Card, List, Avatar, Badge
- **Feedback**: Message, Notification, Modal, Drawer
- **General**: Button, Typography, Icon, Divider

## Resources

- [Ant Design Documentation](https://ant.design)
- [Component Overview](https://ant.design/components/overview/)
- [Theme Customization](https://ant.design/docs/react/customize-theme)
- [Icons](https://ant.design/components/icon/)
