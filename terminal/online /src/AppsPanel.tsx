import { versions } from './versions'

type Props = {
  open: boolean
  onClose: () => void
}

const apps = [
  { name: 'Terminal', description: 'Open a new terminal session', icon: '⌘' },
  { name: 'System Info', description: 'View terminal environment information', icon: 'ⓘ' },
  { name: 'Preferences', description: 'Terminal appearance and behavior', icon: '⚙' },
  { name: 'Keyboard Shortcuts', description: 'View available terminal shortcuts', icon: '⌨' },
]

export default function AppsPanel({ open, onClose }: Props) {
  if (!open) return null

  return (
    <aside className="apps-panel" aria-label="Apps and versions">
      <div className="apps-panel-header">
        <div>
          <div className="apps-panel-title">Apps</div>
          <div className="apps-panel-subtitle">Gnome Terminal Online</div>
        </div>
        <button className="panel-close" onClick={onClose} aria-label="Close apps panel">×</button>
      </div>

      <div className="apps-section">
        {apps.map((app) => (
          <div className="app-card" key={app.name}>
            <div className="app-icon">{app.icon}</div>
            <div>
              <div className="app-name">{app.name}</div>
              <div className="app-description">{app.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="versions-section">
        <div className="section-title">Upcoming Versions</div>
        {versions.slice(1).map((item) => (
          <div className="version-card" key={item.version}>
            <div className="version-row">
              <strong>v{item.version}</strong>
              <span className={`version-badge ${item.status}`}>{item.status}</span>
            </div>
            <ul>
              {item.features.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  )
}
