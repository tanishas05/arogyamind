import { useState } from "react"
import FocusTimer from "../components/FocusTimer"

export default function Dashboard() {
  const [focusMinutes, setFocusMinutes] = useState(0)

  function handleSessionComplete(minutes) {
    setFocusMinutes((prev) => prev + minutes)
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="stats">
        <p><strong>Focus Minutes:</strong> {focusMinutes}</p>
        <p><strong>Posture Checks:</strong> Coming next</p>
        <p><strong>Decision Clarity Score:</strong> Coming next</p>
      </div>

      <FocusTimer onSessionComplete={handleSessionComplete} />
    </div>
  )
}