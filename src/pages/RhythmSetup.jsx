import { useState } from "react"

const hours = Array.from({ length: 24 }, (_, i) =>
  i.toString().padStart(2, "0")
)

const minutes = ["00", "30"]

export default function RhythmSetup({ onGenerate }) {
  const [wakeH, setWakeH] = useState("")
  const [wakeM, setWakeM] = useState("00")

  const [sleepH, setSleepH] = useState("")
  const [sleepM, setSleepM] = useState("00")

  const handleSubmit = () => {
    if (wakeH === "" || sleepH === "") return

    const wake = `${wakeH}:${wakeM}`
    const sleep = `${sleepH}:${sleepM}`

    const phases = generatePhases(wakeH, sleepH)

    onGenerate({ wake, sleep, phases })
  }

  return (
    <div className="card">
      <h1>Set Your Rhythm</h1>

      {/* Wake */}
      <label>Wake Time</label>
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <select value={wakeH} onChange={(e) => setWakeH(e.target.value)}>
          <option value="">HH</option>
          {hours.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>

        <select value={wakeM} onChange={(e) => setWakeM(e.target.value)}>
          {minutes.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Sleep */}
      <label>Sleep Time</label>
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <select value={sleepH} onChange={(e) => setSleepH(e.target.value)}>
          <option value="">HH</option>
          {hours.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>

        <select value={sleepM} onChange={(e) => setSleepM(e.target.value)}>
          {minutes.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>

      <button onClick={handleSubmit}>Generate Planner</button>
    </div>
  )
}

function generatePhases(wakeH, sleepH) {
  let wakeHour = parseInt(wakeH)
  let sleepHour = parseInt(sleepH)

  if (sleepHour <= wakeHour) sleepHour += 24

  const total = sleepHour - wakeHour

  const kaphaEnd = wakeHour + total / 3
  const pittaEnd = wakeHour + (2 * total) / 3

  return [
    { type: "Kapha", start: wakeHour, end: kaphaEnd },
    { type: "Pitta", start: kaphaEnd, end: pittaEnd },
    { type: "Vata", start: pittaEnd, end: sleepHour },
  ]
}