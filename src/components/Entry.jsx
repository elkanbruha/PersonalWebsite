import { useId, useState } from 'react'

// One role, dashboard, or project. `state` is '', 'lit' or 'dim' depending
// on the selected skill. When `bullets` exist the entry can expand to show
// them; the expansion answers a click, so it animates (see .entry-details).
export default function Entry({
  id,
  title,
  date,
  url,
  urlLabel,
  blurb,
  bullets,
  state = '',
  children,
}) {
  const [open, setOpen] = useState(false)
  const detailsId = useId()
  const hasDetails = Array.isArray(bullets) && bullets.length > 0

  return (
    <article className="entry" id={id} data-state={state}>
      <div className="entry-row">
        <h3 className="entry-title">{title}</h3>
        <span className="entry-date">{date}</span>
      </div>
      {url && (
        <a href={url} target="_blank" rel="noreferrer">
          {urlLabel || url.replace(/^https?:\/\//, '')}
        </a>
      )}
      <p className="entry-blurb">{blurb}</p>
      {children}
      {hasDetails && (
        <>
          <button
            type="button"
            className="entry-toggle"
            aria-expanded={open}
            aria-controls={detailsId}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'less' : 'more'}
          </button>
          <div className="entry-details" id={detailsId} data-open={open} aria-hidden={!open}>
            <div>
              <ul>
                {bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </article>
  )
}
