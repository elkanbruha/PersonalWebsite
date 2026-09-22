// Skills as pressable chips. Selecting one lights up every entry on the page
// that used it and lists them here with jump links, so the loop closes
// without scrolling around. `notes` covers skills with no entry to point at.
export default function Skills({ groups, entries, notes = {}, active, onSelect }) {
  const matches = active ? entries.filter((e) => e.tags.includes(active)) : []
  const note = active ? notes[active] : null

  const clear = (
    <button type="button" className="text-btn" onClick={() => onSelect(null)}>
      clear
    </button>
  )

  return (
    <div className="skills">
      {groups.map((g) => (
        <div className="skill-group" key={g.label}>
          <p className="skill-group-label">{g.label}</p>
          <div className="chips" role="group" aria-label={g.label}>
            {g.skills.map((s) => (
              <button
                type="button"
                key={s}
                className="chip"
                aria-pressed={active === s}
                onClick={() => onSelect(active === s ? null : s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ))}

      <p className="skill-status" aria-live="polite">
        {!active && 'Pick a skill to see where I used it.'}
        {active && matches.length === 0 && (
          <>
            <strong>{active}</strong>
            {note ? `: ${note}. ` : ' is on the resume but not tied to an entry above. '}
            {clear}
          </>
        )}
        {active && matches.length > 0 && (
          <>
            <strong>{active}</strong> in{' '}
            {matches.map((m, i) => (
              <span key={m.id}>
                {i > 0 && (i === matches.length - 1 ? ' and ' : ', ')}
                <a href={`#${m.id}`}>{m.label}</a>
              </span>
            ))}
            {note ? `, and ${note}. ` : '. '}
            {clear}
          </>
        )}
      </p>
    </div>
  )
}
