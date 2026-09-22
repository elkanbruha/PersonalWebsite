import { useEffect, useState } from 'react'

const fmt = (tz) =>
  new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: tz })
    .format(new Date())
    .toLowerCase()

// Live local time in the places I split my time between.
export default function Clock({ places }) {
  const [now, setNow] = useState(() => places.map((p) => fmt(p.tz)))

  useEffect(() => {
    const update = () => setNow(places.map((p) => fmt(p.tz)))
    update()
    // Align the first tick to the next whole minute, then tick per minute.
    let interval
    const first = setTimeout(() => {
      update()
      interval = setInterval(update, 60_000)
    }, 60_000 - (Date.now() % 60_000))
    return () => {
      clearTimeout(first)
      clearInterval(interval)
    }
  }, [places])

  return (
    <p className="clock" aria-label="Current local time">
      {places.map((p, i) => (
        <span key={p.label}>
          {i > 0 && <span aria-hidden="true"> · </span>}
          {p.label} <time>{now[i]}</time>
        </span>
      ))}
    </p>
  )
}
