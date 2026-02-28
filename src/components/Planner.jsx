import { useState } from "react";
import { THEME, GLOBAL_STYLE } from "./theme";
import { generatePlanner } from "../services/plannerAPI";

export default function Planner() {
  const [wake, setWake] = useState("07:00");
  const [sleep, setSleep] = useState("23:00");
  const [schedule, setSchedule] = useState([]);

  const handleGenerate = async () => {
    const data = await generatePlanner(wake, sleep);
    setSchedule(data.schedule || []);
  };

  return (
    <>
      <style>{GLOBAL_STYLE}</style>

      <div
        style={{
          minHeight: "100vh",
          background: THEME.bg,
          padding: "60px 32px",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h1
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "42px",
              color: THEME.gold,
              letterSpacing: "0.08em",
              marginBottom: "10px",
            }}
          >
            Dinacharya Planner
          </h1>

          <p
            style={{
              fontFamily: "'IM Fell English', serif",
              fontStyle: "italic",
              color: THEME.creamDim,
            }}
          >
            Align your day with natural energy rhythms
          </p>
        </div>

        {/* Input Card */}
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            background: THEME.bgCard,
            border: `1px solid ${THEME.border}`,
            borderRadius: "18px",
            padding: "40px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
          }}
        >
          {/* Wake */}
          <div style={{ marginBottom: "25px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontFamily: "'Cinzel', serif",
                color: THEME.goldDim,
              }}
            >
              Wake Time
            </label>

            <input
              type="time"
              value={wake}
              onChange={(e) => setWake(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Sleep */}
          <div style={{ marginBottom: "35px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontFamily: "'Cinzel', serif",
                color: THEME.goldDim,
              }}
            >
              Sleep Time
            </label>

            <input
              type="time"
              value={sleep}
              onChange={(e) => setSleep(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Button */}
          <button
            onClick={handleGenerate}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              border: "none",
              background: THEME.green,
              color: "white",
              fontFamily: "'Cinzel', serif",
              fontSize: "16px",
              letterSpacing: "0.05em",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            Generate Planner
          </button>
        </div>

        {/* Schedule Output */}
        {schedule.length > 0 && (
          <div
            style={{
              maxWidth: "900px",
              margin: "60px auto 0",
              background: THEME.bgCard,
              border: `1px solid ${THEME.border}`,
              borderRadius: "18px",
              padding: "30px",
            }}
          >
            <h3
              style={{
                fontFamily: "'Cinzel', serif",
                color: THEME.gold,
                marginBottom: "25px",
              }}
            >
              Your Daily Schedule
            </h3>

            {schedule.map((block, index) => (
              <div
                key={index}
                style={{
                  padding: "12px 0",
                  borderBottom: `1px solid ${THEME.borderLight}`,
                  fontFamily: "'IM Fell English', serif",
                  color: THEME.cream,
                }}
              >
                <strong style={{ color: THEME.green }}>
                  {block.start} – {block.end}
                </strong>{" "}
                → {block.task} ({block.energy_type})
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #444",
  background: "#1e1e1e",
  color: "#f4f1ea",
  fontSize: "14px",
};