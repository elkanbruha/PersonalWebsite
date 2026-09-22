import { useCallback, useEffect, useMemo, useState } from 'react'
import Atmosphere from './components/Atmosphere.jsx'
import Clock from './components/Clock.jsx'
import Entry from './components/Entry.jsx'
import Skills from './components/Skills.jsx'
import NavRail from './components/NavRail.jsx'
import CommandPalette from './components/CommandPalette.jsx'
import DemoWindow from './components/DemoWindow.jsx'
import {
  profile,
  sections,
  experience,
  dashboards,
  projects,
  skillGroups,
  skillNotes,
  education,
  taggedEntries,
} from './content.js'

const reducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

const WindowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="1.5" y="3.5" width="13" height="10" rx="1.5" />
    <path d="M1.5 6.5h13" />
    <circle cx="3.75" cy="5" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="5.5" cy="5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
)

export default function App() {
  const [activeSkill, setActiveSkill] = useState(null)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [demo, setDemo] = useState(null)
  const [copied, setCopied] = useState(false)

  const entryState = (tags) => {
    if (!activeSkill) return ''
    return tags.includes(activeSkill) ? 'lit' : 'dim'
  }

  const jumpTo = useCallback((id) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' })
    history.replaceState(null, '', `#${id}`)
  }, [])

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }, [])

  const closeDemo = useCallback(() => setDemo(null), [])

  // ⌘K / Ctrl+K opens the palette; Escape clears a selected skill when
  // nothing else is open to receive it.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      } else if (e.key === 'Escape' && !paletteOpen && !demo) {
        setActiveSkill(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [paletteOpen, demo])

  const openLink = (url) => () => window.open(url, '_blank', 'noopener,noreferrer')

  const actions = useMemo(
    () => [
      ...sections.map((s) => ({
        id: `go-${s.id}`,
        group: 'Sections',
        label: s.label,
        hint: 'jump',
        run: () => jumpTo(s.id),
      })),
      ...dashboards.map((d) => ({
        id: `demo-${d.id}`,
        group: 'Demos',
        label: `Open ${d.title}`,
        hint: 'window',
        run: () => setDemo(d),
      })),
      { id: 'copy-email', group: 'Contact', label: 'Copy email address', hint: profile.email, run: copyEmail },
      { id: 'resume', group: 'Contact', label: 'Open resume (PDF)', hint: 'new tab', run: openLink(profile.resume) },
      { id: 'github', group: 'Contact', label: 'GitHub', hint: 'github.com/elkanbruha', run: openLink(profile.github) },
      { id: 'linkedin', group: 'Contact', label: 'LinkedIn', hint: 'linkedin.com/in/elkanbruha', run: openLink(profile.linkedin) },
      ...experience
        .filter((e) => e.url)
        .map((e) => ({
          id: `site-${e.id}`,
          group: 'Sites',
          label: e.title.split(' — ')[0],
          hint: e.url.replace(/^https?:\/\//, ''),
          run: openLink(e.url),
        })),
      ...projects.map((p) => ({
        id: `site-${p.id}`,
        group: 'Sites',
        label: p.title.split(' — ')[0],
        hint: p.urlLabel,
        run: openLink(p.url),
      })),
    ],
    [jumpTo, copyEmail],
  )

  return (
    <>
      <Atmosphere />
      <NavRail sections={sections} onJump={jumpTo} />

      <main className="page">
        <header className="header">
          <h1 className="name">{profile.name}</h1>
          <p className="tagline">{profile.tagline}</p>
          <Clock places={profile.places} />
        </header>

        <section className="section" id="about">
          <h2 className="section-heading">About</h2>
          <p className="prose">{profile.about}</p>
        </section>

        <section className="section" id="experience">
          <h2 className="section-heading">Experience</h2>
          {experience.map((e) => (
            <Entry key={e.id} {...e} state={entryState(e.tags)} />
          ))}
        </section>

        <section className="section" id="dashboards">
          <h2 className="section-heading">Dashboards</h2>
          <p className="prose section-intro">
            The product consoles behind each company. Each one opens in a window right here,
            as a working demo with sample data, so there is no account to create.
          </p>
          {dashboards.map((d) => (
            <Entry
              key={d.id}
              id={d.id}
              title={d.title}
              date={d.date}
              blurb={d.blurb}
              state={entryState(d.tags)}
            >
              <p className="dash-stack">{d.stack.join(' · ')}</p>
              <p className="dash-actions">
                <button
                  type="button"
                  className="open-window"
                  aria-pressed={demo?.id === d.id}
                  onClick={() => setDemo(d)}
                >
                  <WindowIcon /> {demo?.id === d.id ? 'Open' : 'Open window'}
                </button>
              </p>
            </Entry>
          ))}
        </section>

        <section className="section" id="projects">
          <h2 className="section-heading">Projects</h2>
          {projects.map((p) => (
            <Entry key={p.id} {...p} state={entryState(p.tags)} />
          ))}
        </section>

        <section className="section" id="skills">
          <h2 className="section-heading">Skills</h2>
          <Skills
            groups={skillGroups}
            entries={taggedEntries}
            notes={skillNotes}
            active={activeSkill}
            onSelect={setActiveSkill}
          />
        </section>

        <section className="section" id="education">
          <h2 className="section-heading">Education</h2>
          {education.map((e) => (
            <article className="entry" key={e.id} id={e.id}>
              <div className="entry-row">
                <h3 className="entry-title">{e.title}</h3>
                <span className="entry-date">{e.date}</span>
              </div>
              <p className="entry-blurb">
                {e.lines.map((line, i) => (
                  <span key={line}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </p>
            </article>
          ))}
        </section>

        <section className="section" id="contact">
          <h2 className="section-heading">Contact</h2>
          <p className="contact">
            <a href={`mailto:${profile.email}`}>email</a>
            <button type="button" className="copy-btn" onClick={copyEmail} aria-live="polite">
              {copied ? 'copied' : 'copy'}
            </button>
            <span aria-hidden="true"> · </span>
            <a href={profile.github} target="_blank" rel="noreferrer">
              github
            </a>
            <span aria-hidden="true"> · </span>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              linkedin
            </a>
            <span aria-hidden="true"> · </span>
            <a href={profile.resume} target="_blank" rel="noreferrer">
              resume
            </a>
          </p>
        </section>
      </main>

      <button
        type="button"
        className="palette-trigger"
        onClick={() => setPaletteOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={paletteOpen}
      >
        Jump to <kbd>{isMac ? '⌘K' : 'Ctrl K'}</kbd>
      </button>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} actions={actions} />
      {demo && <DemoWindow demo={demo} onClose={closeDemo} />}
    </>
  )
}
