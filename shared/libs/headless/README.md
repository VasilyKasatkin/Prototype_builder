# Headless UI Components

Pre-styled components built with Headless UI for rapid prototyping.

## Installation

In your prototype, install Headless UI:

```bash
npm install @headlessui/react
npm install lucide-react # For icons
```

## Usage

### Dropdown Menu

```typescript
import { Dropdown } from '@shared/libs/headless'
import { Edit, Trash } from 'lucide-react'

function MyComponent() {
  const items = [
    {
      label: 'Edit',
      onClick: () => console.log('Edit clicked'),
      icon: <Edit className="h-4 w-4" />,
    },
    {
      label: 'Delete',
      onClick: () => console.log('Delete clicked'),
      icon: <Trash className="h-4 w-4" />,
      disabled: true,
    },
  ]

  return <Dropdown label="Actions" items={items} />
}
```

### Modal Dialog

```typescript
import { Modal } from '@shared/libs/headless'
import { useState } from 'react'

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
        size="md"
        footer={
          <>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                console.log('Confirmed')
                setIsOpen(false)
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Confirm
            </button>
          </>
        }
      >
        <p className="text-gray-600">
          Are you sure you want to proceed with this action?
        </p>
      </Modal>
    </>
  )
}
```

### Tabs

```typescript
import { Tabs } from '@shared/libs/headless'
import { User, Settings } from 'lucide-react'

function MyComponent() {
  const tabs = [
    {
      label: 'Profile',
      icon: <User className="h-4 w-4" />,
      content: (
        <div>
          <h3>Profile Content</h3>
          <p>Edit your profile information here.</p>
        </div>
      ),
    },
    {
      label: 'Settings',
      icon: <Settings className="h-4 w-4" />,
      content: (
        <div>
          <h3>Settings Content</h3>
          <p>Configure your preferences here.</p>
        </div>
      ),
    },
  ]

  return <Tabs tabs={tabs} />
}
```

## Building Custom Components

Headless UI provides unstyled, accessible components. You can build custom styled components:

### Custom Listbox (Select)

```typescript
import { Listbox } from '@headlessui/react'
import { Check, ChevronDown } from 'lucide-react'
import { useState } from 'react'

const people = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
]

function MySelect() {
  const [selected, setSelected] = useState(people[0])

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
          <span className="block truncate">{selected.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDown className="h-5 w-5 text-gray-400" />
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {people.map((person) => (
            <Listbox.Option
              key={person.id}
              value={person}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                  active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                }`
              }
            >
              {({ selected }) => (
                <>
                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                    {person.name}
                  </span>
                  {selected && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                      <Check className="h-5 w-5" />
                    </span>
                  )}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  )
}
```

### Custom Switch (Toggle)

```typescript
import { Switch } from '@headlessui/react'
import { useState } from 'react'

function MyToggle() {
  const [enabled, setEnabled] = useState(false)

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`${enabled ? 'bg-blue-600' : 'bg-gray-200'}
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
    >
      <span
        className={`${enabled ? 'translate-x-6' : 'translate-x-1'}
          inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
      />
    </Switch>
  )
}
```

## Features

- Fully accessible components (keyboard navigation, screen readers)
- Unstyled by default - complete styling control
- Smooth transitions with built-in animation support
- TypeScript support
- Works with Tailwind CSS

## Available Headless UI Components

- **Menu (Dropdown)** - Dropdown menus
- **Listbox (Select)** - Custom select dropdowns
- **Combobox** - Autocomplete/searchable select
- **Switch** - Toggle switches
- **Disclosure** - Expandable sections
- **Dialog (Modal)** - Modal dialogs
- **Popover** - Popovers and tooltips
- **Radio Group** - Radio button groups
- **Tab** - Tab interfaces
- **Transition** - Animation utilities

## Resources

- [Headless UI Documentation](https://headlessui.com)
- [React Components](https://headlessui.com/react/menu)
- [Examples](https://github.com/tailwindlabs/headlessui/tree/main/packages/%40headlessui-react)
- [Accessibility Guide](https://headlessui.com/react/menu#accessibility-notes)
