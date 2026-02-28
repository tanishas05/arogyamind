import { Routes, Route } from "react-router-dom";
import PostureDetector from "./components/PostureDetector";
import YogaDetector from "./components/YogaDetector";
import DharmicDecisionFramework from "./components/DharmicDecisionFramework";
import Navbar from "./components/Navbar";
import Planner from "./components/Planner";

// Keep the Home component
function Home() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>ArogyaMind</h1>
      <p>Welcome to the homepage</p>
    </div>
  );
}

// Main App component with Navbar and routes
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/posture" element={<PostureDetector />} />
        <Route path="/yoga" element={<YogaDetector />} />
        <Route path="/ddf" element={<DharmicDecisionFramework />} />
      </Routes>
    </>
  );
}