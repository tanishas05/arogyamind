import { useState } from "react"
import RhythmSetup from "./pages/RhythmSetup"
import Timeline from "./components/timeline"
import FocusTimer from "./components/FocusTimer"

function App() {
  const [userData, setUserData] = useState(null)
  const [focusMinutes, setFocusMinutes] = useState(0)

  const handleFocusComplete = (mins) => {
    setFocusMinutes((prev) => prev + mins)
  }

  return (
    <div className="container">
      {!userData && <RhythmSetup onGenerate={setUserData} />}

      {userData && (
        <>
          <h1>Dinacharya Planner</h1>

          <Timeline phases={userData.phases} />

          <div className="card">
            <h2>Dashboard</h2>
            <p>Focus Minutes: {focusMinutes}</p>
            <p>Posture Checks: Coming next</p>
            <p>Decision Clarity Score: Coming next</p>
          </div>

          <FocusTimer onComplete={handleFocusComplete} />
        </>
      )}
    </div>
  )
}

export default App