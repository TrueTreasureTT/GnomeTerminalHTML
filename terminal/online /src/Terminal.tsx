import { useCallback, useEffect, useRef, useState } from 'react'
import { TerminalSession } from './TerminalSession'
import TabBar from './TabBar'

export default function Terminal({ url, onStatus }: { url: string; onStatus?: (connected: boolean) => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sessionsRef = useRef<TerminalSession[]>([])
  const activeIdRef = useRef(0)
  const nextId = useRef(1)
  const [activeId, setActiveId] = useState(0)
  const [connected, setConnected] = useState(false)
  const [, redraw] = useState(0)

  const select = useCallback((id: number) => {
    activeIdRef.current = id; setActiveId(id)
    const s = sessionsRef.current.find(x => x.id === id)
    const state = s?.ws.readyState === WebSocket.OPEN
    setConnected(state); onStatus?.(state)
  }, [onStatus])

  const createSession = useCallback(() => {
    const s = new TerminalSession(nextId.current++, url)
    sessionsRef.current.push(s)
    s.connect(() => { if (s.id === activeIdRef.current) { setConnected(false); onStatus?.(false) }; redraw(x => x + 1) }, (state) => {
      if (s.id === activeIdRef.current) { setConnected(state); onStatus?.(state) }
    })
    s.term.onTitleChange(title => { s.title = title || 'Terminal'; redraw(x => x + 1) })
    return s
  }, [url, onStatus])

  const close = useCallback((id: number) => {
    const list = sessionsRef.current; const i = list.findIndex(s => s.id === id); if (i < 0) return
    list.splice(i, 1)[0].dispose()
    if (!list.length) { const s = createSession(); select(s.id) }
    else if (activeIdRef.current === id) select(list[Math.max(0, i - 1)].id)
    redraw(x => x + 1)
  }, [createSession, select])

  const newTab = useCallback(() => { const s = createSession(); select(s.id); redraw(x => x + 1) }, [createSession, select])

  useEffect(() => {
    const first = createSession(); activeIdRef.current = first.id; setActiveId(first.id)
    return () => { sessionsRef.current.forEach(s => s.dispose()); sessionsRef.current = [] }
  }, [createSession])

  useEffect(() => {
    const s = sessionsRef.current.find(x => x.id === activeId); const el = containerRef.current
    if (!s || !el) return
    if (!s.term.element) s.term.open(el); else if (s.term.element.parentElement !== el) el.appendChild(s.term.element)
    sessionsRef.current.forEach(x => { if (x.term.element) x.term.element.style.display = x.id === activeId ? 'block' : 'none' })
    requestAnimationFrame(() => { s.resize(); s.term.focus() })
  }, [activeId])

  useEffect(() => { const resize = () => sessionsRef.current.forEach(s => { if (s.term.element && s.term.element.style.display !== 'none') s.resize() }); window.addEventListener('resize', resize); return () => window.removeEventListener('resize', resize) }, [])

  return <div className="terminal-shell">
    <TabBar sessions={sessionsRef.current} activeId={activeId} onSelect={select} onClose={close} onNew={newTab} />
    <div className="terminal-container" ref={containerRef} />
    <div className={`terminal-status ${connected ? 'connected' : 'disconnected'}`}><span className="status-indicator"/><span>Status: {connected ? 'Connected' : 'Disconnected'}</span></div>
  </div>
}
