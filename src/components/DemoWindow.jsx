import { useCallback, useEffect, useRef, useState } from 'react'
import { demoUrl } from '../content.js'

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))

// The narrowest the framed dashboard is ever laid out at. These are desktop
// products: below this they fall to their own narrow breakpoints, where cards
// stack and a camera preview swells to a full-width square. A window with at
// least this much room frames the app at its own size; a smaller one lays it
// out at this width and scales it down, the way a device preview does.
const MIN_LAYOUT_WIDTH = 1440

// A browser window inside the page. It frames the real product at its
// /demo URL, where the app runs on a fake account and fake data.
export default function DemoWindow({ demo, onClose }) {
  const winRef = useRef(null)
  const bodyRef = useRef(null)
  const openedAt = useRef(Date.now())
  const [fit, setFit] = useState({ scale: 1, width: 1440, height: 900 })
  // On localhost this resolves to the locally running copy, so the address
  // bar shows what is actually being framed rather than the live host.
  const url = demoUrl(demo)
  const host = url.replace(/^https?:\/\//, '').split('/')[0]
  const path = '/' + url.replace(/^https?:\/\/[^/]+\/?/, '')

  // Open as large as the viewport allows, less a margin that keeps it reading
  // as a window with the page behind it. No cap: on a big display the extra
  // width goes to the dashboard rather than to empty space beside it.
  const [pos, setPos] = useState(() => {
    const w = window.innerWidth - 40
    const h = window.innerHeight - 56
    return { x: 20, y: Math.max(16, (window.innerHeight - h) / 2), w, h }
  })
  const [max, setMax] = useState(false)
  const [shade, setShade] = useState(false)
  const [epoch, setEpoch] = useState(0) // bump to reload the frame
  const [loaded, setLoaded] = useState(false)

  // The demo is deployed continuously, and a stale copy of its entry page is
  // worse than a slow one: it references hashed assets that no longer exist,
  // so the frame renders unstyled and never finishes starting. A per-open
  // token keeps the browser from serving one. The address bar above shows the
  // clean URL, since this is plumbing.
  const frameSrc = `${url}${url.includes('?') ? '&' : '?'}_=${openedAt.current}-${epoch}`

  useEffect(() => {
    setLoaded(false)
    setEpoch((e) => e + 1)
  }, [demo])

  // Fit the frame to the window body. With room to spare the frame simply
  // fills it, so the dashboard gets every pixel at 1:1. Only a body narrower
  // than MIN_LAYOUT_WIDTH lays the app out at that width and scales it down,
  // which keeps it out of its narrow breakpoints.
  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    const measure = () => {
      const { width, height } = el.getBoundingClientRect()
      if (!width || !height) return
      const scale = Math.min(1, width / MIN_LAYOUT_WIDTH)
      setFit({ scale, width: scale === 1 ? width : MIN_LAYOUT_WIDTH, height: height / scale })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    winRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Drag by the title bar. The iframe swallows pointer events, so a
  // transparent shield covers it while dragging.
  const [dragging, setDragging] = useState(false)
  const onPointerDown = (e) => {
    if (max || e.button !== 0 || e.target.closest('button, a')) return
    const rect = winRef.current.getBoundingClientRect()
    const start = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    setDragging(true)
    const move = (ev) => {
      setPos((p) => ({
        ...p,
        w: rect.width,
        h: rect.height,
        x: clamp(ev.clientX - start.x, -(rect.width - 140), window.innerWidth - 140),
        y: clamp(ev.clientY - start.y, 0, window.innerHeight - 48),
      }))
    }
    const up = () => {
      window.removeEventListener('pointermove', move)
      setDragging(false)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up, { once: true })
    e.preventDefault()
  }

  const toggleMax = () => {
    if (!max && winRef.current) {
      const r = winRef.current.getBoundingClientRect()
      setPos((p) => ({ ...p, w: r.width, h: r.height }))
    }
    setMax((m) => !m)
    setShade(false)
  }

  const reload = useCallback(() => {
    setLoaded(false)
    setEpoch((e) => e + 1)
  }, [])

  const style = max
    ? undefined
    : { left: pos.x, top: pos.y, width: pos.w, height: shade ? 'auto' : pos.h }

  return (
    <section
      ref={winRef}
      className="win"
      style={style}
      data-max={max}
      data-shade={shade}
      role="dialog"
      aria-label={`${demo.title} demo window`}
      tabIndex={-1}
    >
      <div className="win-bar" onPointerDown={onPointerDown} onDoubleClick={toggleMax}>
        <div className="win-lights">
          <button type="button" className="win-light win-close" onClick={onClose} aria-label="Close window" />
          <button type="button" className="win-light win-min" onClick={() => setShade((s) => !s)} aria-label={shade ? 'Expand window' : 'Collapse window to its title bar'} />
          <button type="button" className="win-light win-max" onClick={toggleMax} aria-label={max ? 'Restore window size' : 'Fill the screen'} />
        </div>
        <button type="button" className="win-reload" onClick={reload} aria-label="Reload demo" title="Reload demo">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-2.6-6.4"/><path d="M21 3v6h-6"/></svg>
        </button>
        <div className="win-url" title={url}>
          <svg width="11" height="12" viewBox="0 0 11 12" aria-hidden="true"><rect x="1" y="5" width="9" height="6.5" rx="1.5" fill="currentColor"/><path d="M3 5V3.5a2.5 2.5 0 0 1 5 0V5" fill="none" stroke="currentColor" strokeWidth="1.4"/></svg>
          <span className="win-host">{host}</span>
          <span className="win-path">{path}</span>
          <span className="win-badge">demo</span>
        </div>
        <a className="win-reload" href={url} target="_blank" rel="noreferrer" aria-label="Open in a new tab" title="Open in a new tab">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5"/></svg>
        </a>
      </div>
      <div className="win-body" ref={bodyRef}>
        {!loaded && (
          <div className="win-loading">
            Loading {demo.title}…
            <a href={url} target="_blank" rel="noreferrer">open in a new tab instead</a>
          </div>
        )}
        <iframe
          key={epoch}
          className="win-frame"
          src={frameSrc}
          title={`${demo.title} demo`}
          onLoad={() => setLoaded(true)}
          allow="fullscreen; clipboard-write"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{
            width: fit.width,
            height: fit.height,
            transform: `scale(${fit.scale})`,
            transformOrigin: 'top left',
          }}
        />
        {dragging && <div className="win-shield" aria-hidden="true" />}
      </div>
    </section>
  )
}
