import { useEffect, useState } from 'react'
import Terminal from './Terminal'
import AppsPanel from './AppsPanel'

export default function App({ backendUrl }: { backendUrl: string }) {
  const [connected, setConnected] = useState(false)
  const [startupFinished, setStartupFinished] = useState(false)
  const [appsOpen, setAppsOpen] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setStartupFinished(true), 1200)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="app">
      <header className="header">
        <div className="window-title">gnome-terminal 3.13.0</div>
        <div className="window-subtitle">Ubuntu-style terminal</div>
        <button className="apps-button" onClick={() => setAppsOpen(true)}>Apps</button>
      </header>

      <main className="main">
        <Terminal url={backendUrl} onStatus={setConnected} />
        <AppsPanel open={appsOpen} onClose={() => setAppsOpen(false)} />
        {!startupFinished && (
          <div className="startup-overlay">
            <div className="startup-logo-mark">⌁</div>
            <div className="startup-title">GNOME Terminal</div>
            <div className="startup-version">3.13.0</div>
            <div className="chrome-spinner" />
            <div className="startup-text">{connected ? 'Starting...' : 'Connecting...'}</div>
          </div>
        )}
      </main>
    </div>
  )
}
