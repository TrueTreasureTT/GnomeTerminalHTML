export type UpcomingVersion = {
  version: string
  status: 'current' | 'upcoming' | 'planned'
  features: string[]
}

// Project roadmap. These are Gnome Terminal Online project versions,
// not official GNOME release numbers.
export const versions: UpcomingVersion[] = [
  {
    version: '3.13.0',
    status: 'current',
    features: ['Web terminal', 'Multiple tabs', 'Connection status', 'Ubuntu-style dark theme'],
  },
  {
    version: '3.14.0',
    status: 'upcoming',
    features: ['Apps launcher', 'Improved startup screen', 'Terminal preferences', 'Better mobile layout'],
  },
  {
    version: '3.15.0',
    status: 'planned',
    features: ['Session manager', 'Keyboard shortcut settings', 'Improved reconnect handling', 'More terminal themes'],
  },
  {
    version: '4.0.0',
    status: 'planned',
    features: ['New UI architecture', 'Plugin-ready apps area', 'Accessibility improvements', 'Expanded settings'],
  },
]
