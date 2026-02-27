import { useEffect, useState } from "react"

export default function FocusTimer({ onSessionComplete }) {
  const SESSION_LENGTH = 25 * 60 // seconds

  const [timeLeft, setTimeLeft] = useState(SESSION_LENGTH)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setIsRunning(false)
          onSessionComplete(25) // add 25 minutes to dashboard
          return SESSION_LENGTH
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning])

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`
  }

  return (
    <div className="focus-box">
      <h3>Focus Mode</h3>
      <div className="timer">{formatTime(timeLeft)}</div>

      <div className="focus-buttons">
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "Pause" : "Start Focus"}
        </button>

        <button
          onClick={() => {
            setIsRunning(false)
            setTimeLeft(SESSION_LENGTH)
          }}
        >
          Reset
        </button>
      </div>
    </div>
  )
}