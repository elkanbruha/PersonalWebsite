import { useEffect, useRef } from 'react'

// Drifting orbs over the charcoal base, plus film grain (see index.css).
// Each orb eases to a fresh random target on a repeating timer, and the
// wrapper around it gets a springy scroll parallax. Under
// prefers-reduced-motion the orbs rest at their CSS anchors.
export default function Atmosphere() {
  const wrap1Ref = useRef(null)
  const wrap2Ref = useRef(null)
  const wrap3Ref = useRef(null)

  useEffect(() => {
    const wraps = [wrap1Ref.current, wrap2Ref.current, wrap3Ref.current]

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const timers = []
    const blobs = wraps.map((w) => w && w.querySelector('.blob')).filter(Boolean)
    const rand = (lo, hi) => lo + Math.random() * (hi - lo)

    const driftTo = (el, durMs) => {
      const dx = rand(-35, 35)
      const dy = rand(-35, 35)
      const s = rand(0.75, 1.25)
      el.style.transition = `transform ${Math.round(durMs)}ms cubic-bezier(0.37, 0, 0.32, 1)`
      el.style.transform =
        `translate(-50%, -50%) translate(${dx.toFixed(1)}%, ${dy.toFixed(1)}%) scale(${s.toFixed(3)})`
    }

    blobs.forEach((el, i) => {
      const step = () => {
        const dur = rand(5000, 8500)
        driftTo(el, dur)
        timers.push(setTimeout(step, dur))
      }
      timers.push(setTimeout(step, i * 100))
    })

    const params = [
      { spring: 0.025, damping: 0.94, parallax: 0.10 },
      { spring: 0.020, damping: 0.95, parallax: 0.06 },
      { spring: 0.015, damping: 0.96, parallax: 0.03 },
    ]
    const states = params.map((p) => ({ x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0, ...p }))

    const updateBlobTargets = () => {
      const sy = window.scrollY
      states.forEach((s) => {
        s.ty = -sy * s.parallax
      })
    }

    const onScroll = () => updateBlobTargets()
    const onResize = () => {
      updateBlobTargets()
      states.forEach((s) => {
        s.vx += (Math.random() - 0.5) * 10
        s.vy += (Math.random() - 0.5) * 10
      })
    }

    updateBlobTargets()

    let rafId
    const tick = () => {
      states.forEach((s, i) => {
        const wrap = wraps[i]
        if (!wrap) return
        s.vx += (s.tx - s.x) * s.spring
        s.vy += (s.ty - s.y) * s.spring
        s.vx *= s.damping
        s.vy *= s.damping
        s.x += s.vx
        s.y += s.vy
        wrap.style.transform = `translate3d(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px, 0)`
      })
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(rafId)
      timers.forEach((t) => clearTimeout(t))
    }
  }, [])

  return (
    <div className="bg-blobs" aria-hidden="true">
      <div ref={wrap1Ref} className="blob-wrap">
        <div className="blob blob-1" />
      </div>
      <div ref={wrap2Ref} className="blob-wrap">
        <div className="blob blob-2" />
      </div>
      <div ref={wrap3Ref} className="blob-wrap">
        <div className="blob blob-3" />
      </div>
    </div>
  )
}
