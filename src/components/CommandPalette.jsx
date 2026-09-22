import { useEffect, useMemo, useRef, useState } from 'react'

// ⌘K / Ctrl+K palette. `actions` is a flat list of { id, label, group, hint,
// run }. Filtering is a plain case-insensitive match on the label.
export default function CommandPalette({ open, onClose, actions }) {
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? actions.filter((a) => a.label.toLowerCase().includes(q)) : actions
  }, [actions, query])

  // Reset, focus the input, and lock page scroll while open.
  useEffect(() => {
    if (!open) return
    setQuery('')
    setCursor(0)
    const prevFocus = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    inputRef.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      prevFocus?.focus?.()
    }
  }, [open])

  useEffect(() => {
    setCursor(0)
  }, [query])

  // Keep the highlighted row in view.
  useEffect(() => {
    const row = listRef.current?.querySelector('[aria-selected="true"]')
    row?.scrollIntoView?.({ block: 'nearest' })
  }, [cursor, results])

  if (!open) return null

  const run = (action) => {
    onClose()
    action.run()
  }

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setCursor((c) => (results.length ? (c + 1) % results.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setCursor((c) => (results.length ? (c - 1 + results.length) % results.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (results[cursor]) run(results[cursor])
    }
  }

  let lastGroup = null

  return (
    <div className="palette-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-label="Jump to"
        onKeyDown={onKeyDown}
      >
        <input
          ref={inputRef}
          className="palette-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Jump to a section, open a link, copy my email…"
          aria-label="Search actions"
          aria-controls="palette-list"
          aria-activedescendant={results[cursor] ? `palette-${results[cursor].id}` : undefined}
          autoComplete="off"
          spellCheck={false}
        />
        <ul className="palette-list" id="palette-list" role="listbox" ref={listRef}>
          {results.length === 0 && (
            <li className="palette-empty">Nothing matches “{query}”.</li>
          )}
          {results.map((a, i) => {
            const showGroup = a.group !== lastGroup
            lastGroup = a.group
            return (
              <li key={a.id} role="presentation">
                {showGroup && <div className="palette-group">{a.group}</div>}
                <div
                  id={`palette-${a.id}`}
                  role="option"
                  aria-selected={i === cursor}
                  className="palette-item"
                  onMouseMove={() => setCursor(i)}
                  onClick={() => run(a)}
                >
                  <span>{a.label}</span>
                  {a.hint && <span className="palette-hint">{a.hint}</span>}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
