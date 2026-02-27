export default function Timeline({ phases }) {
  if (!phases) return null

  return (
    <div>
      {phases.map((p, i) => (
        <div key={i} className="timeline-block">
          <div className="timeline-label">
            <span>{p.type}</span>
            <span>
              {formatHour(p.start)} – {formatHour(p.end)}
            </span>
          </div>

          <div className="timeline-bar">
            <div
              className={`timeline-fill ${p.type.toLowerCase()}`}
              style={{ width: `${(p.end - p.start) * 10}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function formatHour(h) {
  const hour = Math.floor(h) % 24
  return `${hour.toString().padStart(2, "0")}:00`
}