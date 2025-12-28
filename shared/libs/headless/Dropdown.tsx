import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ChevronDown } from 'lucide-react'

interface DropdownItem {
  label: string
  onClick: () => void
  icon?: React.ReactNode
  disabled?: boolean
}

interface DropdownProps {
  label: string
  items: DropdownItem[]
  className?: string
}

/**
 * Pre-styled Dropdown component using Headless UI
 *
 * @example
 * const items = [
 *   { label: 'Edit', onClick: () => console.log('Edit') },
 *   { label: 'Delete', onClick: () => console.log('Delete'), disabled: true },
 * ]
 * <Dropdown label="Actions" items={items} />
 */
export function Dropdown({ label, items, className = '' }: DropdownProps) {
  return (
    <Menu as="div" className={`relative inline-block text-left ${className}`}>
      <Menu.Button className="inline-flex w-full justify-center items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
        {label}
        <ChevronDown className="h-4 w-4" aria-hidden="true" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="px-1 py-1">
            {items.map((item, idx) => (
              <Menu.Item key={idx} disabled={item.disabled}>
                {({ active }) => (
                  <button
                    onClick={item.onClick}
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'text-gray-900'
                    } ${
                      item.disabled ? 'opacity-50 cursor-not-allowed' : ''
                    } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
