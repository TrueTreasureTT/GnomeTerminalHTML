import React from 'react'
import { createRoot } from 'react-dom/client'
import '@xterm/xterm/css/xterm.css'
import './styles.css'
import App from './App'

const backendUrl = import.meta.env.VITE_TERMINAL_BACKEND_URL?.trim() ||
  ((location.protocol === 'https:' ? 'wss:' : 'ws:') + '//' + location.host + '/ws')

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App backendUrl={backendUrl} />
  </React.StrictMode>,
)
