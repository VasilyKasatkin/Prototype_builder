import { Tab } from '@headlessui/react'

interface TabItem {
  label: string
  content: React.ReactNode
  icon?: React.ReactNode
}

interface TabsProps {
  tabs: TabItem[]
  className?: string
}

/**
 * Pre-styled Tabs component using Headless UI
 *
 * @example
 * const tabs = [
 *   { label: 'Profile', content: <ProfileForm /> },
 *   { label: 'Settings', content: <SettingsForm /> },
 * ]
 * <Tabs tabs={tabs} />
 */
export function Tabs({ tabs, className = '' }: TabsProps) {
  return (
    <div className={`w-full ${className}`}>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {tabs.map((tab, idx) => (
            <Tab
              key={idx}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                ${
                  selected
                    ? 'bg-white text-blue-700 shadow'
                    : 'text-blue-600 hover:bg-white/[0.12] hover:text-blue-800'
                }
                focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60
                flex items-center justify-center gap-2`
              }
            >
              {tab.icon}
              {tab.label}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {tabs.map((tab, idx) => (
            <Tab.Panel
              key={idx}
              className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
            >
              {tab.content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
