import { useEffect, useRef } from 'react'

export default function App() {
  const wrap1Ref = useRef(null)
  const wrap2Ref = useRef(null)
  const wrap3Ref = useRef(null)
  // const cursorRef = useRef(null) // cursor orb disabled

  useEffect(() => {
    const wraps = [wrap1Ref.current, wrap2Ref.current, wrap3Ref.current]
    // const cursor = cursorRef.current // cursor orb disabled

    // Honor prefers-reduced-motion: rest the orbs at their CSS anchors and
    // skip the rAF loop + scroll/resize listeners (mirrors Upstream's Atmosphere).
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const timers = []

    // Path-free RANDOM drift: each orb starts in the line, then eases to a
    // fresh random target (offset + scale) on a repeating timer — no fixed
    // path, every destination is random, all at a steady, normal speed.
    const blobs = wraps
      .map((w) => w && w.querySelector('.blob'))
      .filter(Boolean)
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
      // tiny stagger so the three don't fire in lockstep
      timers.push(setTimeout(step, i * 100))
    })

    // Cursor orb disabled:
    // let targetX = window.innerWidth / 2
    // let targetY = window.innerHeight / 2
    // let currentX = targetX
    // let currentY = targetY

    const params = [
      { spring: 0.025, damping: 0.94, parallax: 0.10 },
      { spring: 0.020, damping: 0.95, parallax: 0.06 },
      { spring: 0.015, damping: 0.96, parallax: 0.03 },
    ]
    const states = params.map((p) => ({
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      tx: 0,
      ty: 0,
      ...p,
    }))

    const updateBlobTargets = () => {
      const sy = window.scrollY
      states.forEach((s) => {
        s.ty = -sy * s.parallax
      })
    }

    // Cursor orb disabled:
    // const onMove = (e) => {
    //   targetX = e.clientX
    //   targetY = e.clientY
    // }

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
      // Cursor orb disabled:
      // currentX += (targetX - currentX) * 0.07
      // currentY += (targetY - currentY) * 0.07
      // if (cursor) {
      //   cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`
      // }

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

    // window.addEventListener('mousemove', onMove) // cursor orb disabled
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    rafId = requestAnimationFrame(tick)

    return () => {
      // window.removeEventListener('mousemove', onMove) // cursor orb disabled
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(rafId)
      timers.forEach((t) => clearTimeout(t))
    }
  }, [])

  return (
    <>
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
        {/* <div ref={cursorRef} className="blob cursor-blob" /> cursor orb disabled */}
      </div>
      <main className="page">
      <header className="header">
        <h1 className="name">Elkan Bruha</h1>
        <p className="tagline">founder · engineer · cu boulder</p>
      </header>

      <section className="section">
        <h2 className="section-heading">About</h2>
        <p className="prose">
          Founder and software engineer passionate about product design and computer vision. Studying computer science at CU Boulder. Dual US/French citizen based
          between New York and Boulder.
        </p>
      </section>

      <section className="section">
        <h2 className="section-heading">Experience</h2>

        <div className="entry">
          <div className="entry-row">
            <span className="entry-title">Upstream - Co-Founder & Software Engineer</span>
            <span className="entry-date">May 2026 - present</span>
          </div>
          <a href="https://upstreamcv.com" target="_blank">upstreamcv.com</a>
          <p className="entry-blurb">
            Building real-time computer vision infrastructure that lets startups and
            businesses deploy camera intelligence systems without building the underlying
            streaming, inference, and orchestration infrastructure themselves. Users can
            connect cameras, configure detections and triggers, and turn live video into
            API calls, alerts, analytics, and automations.
            <br>
            </br>
            Accepted by NVIDIA's Inception Program
          </p>
        </div>

        <div className="entry">
          <div className="entry-row">
            <span className="entry-title">CrowdCount — Founder & Lead Engineer</span>
            <span className="entry-date">May 2024 - May 2026</span>
          </div>
          <a href="https://crowdcount.tech" target="_blank">crowdcount.tech</a>
          <p className="entry-blurb">
            Built the original full stack for a computer vision occupancy startup; iOS app,
            three Next.js sites, Python/Flask backend, a CUDA-accelerated RTSP
            server (built in-house) capable of ingesting 200+ streams, and custom edge hardware.
            Live in 25+ locations with a large consumer targeted launch planned for August; 
            raising a pre-seed at a $1M valuation while managing a team of 7.
          </p>
        </div>

        <div className="entry">
          <div className="entry-row">
            <span className="entry-title">RWS Group — Software QA Engineer</span>
            <span className="entry-date">Mar 2025 - Dec 2025</span>
          </div>
          <p className="entry-blurb">
            Freelance general and fr-FR localization QA on pre-release software,
            primarily Google products.
          </p>
        </div>

        <div className="entry">
          <div className="entry-row">
            <span className="entry-title">Outlier — AI Coding Trainer</span>
            <span className="entry-date">Nov 2024 - Oct 2025</span>
          </div>
          <p className="entry-blurb">
            Wrote CS problem sets and evaluation frameworks used to train and grade
            LLM code output — correctness, edge cases, hallucinations, and unsafe
            patterns.
          </p>
        </div>

        <div className="entry">
          <div className="entry-row">
            <span className="entry-title">Onepoint — Lead Project Developer</span>
            <span className="entry-date">Fall 2023</span>
          </div>
          <p className="entry-blurb">
            Led a student team building a full-stack stock market panel with an ML
            profitability model, presented to Onepoint's C-suite.
          </p>
        </div>
      </section>

      <section className="section">
        <h2 className="section-heading">Projects</h2>

        <div className="entry">
          <div className="entry-row">
            <span className="entry-title">GetGreen - iOS App</span>
            <span className="entry-date">Apr 2026</span>
          </div>
          <a
            href="https://elkanbruha.com/getgreen"
            target="_blank"
            rel="noreferrer"
          >
            elkanbruha.com/getgreen</a>
          <p className="entry-blurb">
            Simple and free iOS app that converts your screen time into an estimated carbon
            footprint. (Awaiting App Store approval)
          </p>
        </div>

        <div className="entry">
          <div className="entry-row">
            <span className="entry-title">CU Buffs Advising Portal - Web Redesign</span>
            <span className="entry-date">Mar 2026 - Apr 2026</span>
          </div>
          <a
            href="https://cubuffsadvising.netlify.app"
            target="_blank"
            rel="noreferrer"
          >
            cubuffsadvising.netlify.app
          </a>
          <p className="entry-blurb">
            Redesigned my university's advising portal's front end using React. 
            Presented to a senior UX designer on the CU Boulder Portal team and received valuable and positive feedback.
          </p>
        </div>
      </section>

      <section className="section">
        <h2 className="section-heading">Skills</h2>
        <p className="prose">
          Python, JavaScript/TypeScript, C/C++, Swift, SQL. React, Next.js, Node.js, Tailwind, Flask/FastAPI, REST.
          iOS (SwiftUI, CoreBluetooth).
          Computer vision and ML (OpenCV, YOLO, PyTorch, ONNX/TensorRT, CUDA).
          AWS (EC2, S3, Lambda), Docker, Linux, Nginx.
        </p>
      </section>

      <section className="section">
        <h2 className="section-heading">Education</h2>

        <div className="entry">
          <div className="entry-row">
            <span className="entry-title">
              University of Colorado Boulder — BS Computer Science
            </span>
            <span className="entry-date">Fall 2024 - present</span>
          </div>
          <p className="entry-blurb">
            GPA 3.8 · Dean's List · entered via transfer.
            <br></br>
            Seeking full-time roles; prepared to adjust course load or take leave to commit fully.
          </p>
        </div>

        <div className="entry">
          <div className="entry-row">
            <span className="entry-title">
              New York University — Visiting Student
            </span>
            <span className="entry-date">Spring 2024</span>
          </div>
          <p className="entry-blurb">
            GPA 3.8 · Computer science coursework.
          </p>
        </div>

        <div className="entry">
          <div className="entry-row">
            <span className="entry-title">
              Université Paris-Saclay (CentraleSupélec) — Global Engineering
            </span>
            <span className="entry-date">Fall 2023</span>
          </div>
          <p className="entry-blurb">
            GPA 3.2 · exited via transfer.
            <br></br>
            First cohort of the CentraleSupélec / McGill dual-degree program
          </p>
        </div>

        <div className="entry">
          <div className="entry-row">
            <span className="entry-title">
              Lycée Français de New York — High School
            </span>
            <span className="entry-date">Fall 2013 - Spring 2023</span>
          </div>
          <p className="entry-blurb">
            GPA 4.0 · French Baccalaureate (Mention Très Bien)
            <br></br>
            Majored in Mathematics, Physics, Chemistry and Computer Science at a bilingual international school.
          </p>
        </div>
      </section>

      <section className="section">
        <h2 className="section-heading">Contact</h2>
        <p className="contact">
          <a href="mailto:elkanbruha@gmail.com">email</a>
          <span aria-hidden="true"> · </span>
          <a
            href="https://github.com/elkanbruha"
            target="_blank"
            rel="noreferrer"
          >
            github
          </a>
          <span aria-hidden="true"> · </span>
          <a
            href="https://linkedin.com/in/elkanbruha"
            target="_blank"
            rel="noreferrer"
          >
            linkedin
          </a>
          <span aria-hidden="true"> · </span>
          <a
            href="/Elkan-Bruha-Resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            resume
          </a>
        </p>
      </section>
      </main>
    </>
  )
}
