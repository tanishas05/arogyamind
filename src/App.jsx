import { useState } from "react"
import RhythmSetup from "./pages/RhythmSetup"
import Timeline from "./components/timeline"
import FocusTimer from "./components/FocusTimer"
import PostureDetector from "./components/PostureDetector"

function App() {
  const [userData, setUserData] = useState(null)
  const [focusMinutes, setFocusMinutes] = useState(0)

  const handleFocusComplete = (mins) => {
    setFocusMinutes((prev) => prev + mins)
  }

  return (
  <div className="container">
    <PostureDetector />
  </div>
)
}

export default App
