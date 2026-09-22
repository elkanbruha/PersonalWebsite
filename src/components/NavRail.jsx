import { useEffect, useState } from 'react'

// Section list that tracks scroll position. The active section is the last
// one whose top has passed a probe line near the top of the viewport, which
// is stable in both scroll directions. Only shown on wide viewports (.rail).
export default function NavRail({ sections, onJump }) {
  const [active, setActive] = useState(sections[0]?.id)

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean)
    if (els.length === 0) return

    // The probe sits just below the scroll padding. Keeping it near the top
    // matters: a line further down the viewport is taller than the shorter
    // sections, so jumping to About would light up Experience instead.
    const PROBE = 96

    // Reading a handful of rects per scroll event is cheap, and the browser
    // already fires scroll at most once per frame, so this runs inline
    // rather than inside requestAnimationFrame.

    const update = () => {
      const viewport = window.innerHeight
      const maxScroll = document.documentElement.scrollHeight - viewport
      const remaining = Math.max(0, maxScroll - window.scrollY)

      // The last screenful cannot scroll any further, so the sections inside
      // it never reach a probe pinned near the top — Education could never
      // light up at all. Over that final screen the probe slides down to the
      // middle of the viewport, which lets them take their turn.
      const near = Math.min(1, Math.max(0, (viewport - remaining) / viewport))
      const probe = PROBE + (viewport / 2 - PROBE) * near

      let current = els[0].id
      for (const el of els) {
        if (el.getBoundingClientRect().top <= probe) current = el.id
      }
      // The final section is short enough to sit below even that probe, so
      // hand it the end of the page. The margin is generous on purpose: a
      // trackpad flick that stops a few pixels short has still arrived.
      if (remaining <= 48) current = els[els.length - 1].id
      setActive(current)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [sections])

  return (
    <nav className="rail" aria-label="Sections">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          aria-current={active === s.id ? 'true' : undefined}
          onClick={(e) => {
            e.preventDefault()
            onJump(s.id)
          }}
        >
          {s.label}
        </a>
      ))}
    </nav>
  )
}
