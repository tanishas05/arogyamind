import React, { useState } from "react";
import principlesData from "../data/principles.json";
import { THEME, GLOBAL_STYLE } from "./theme.js";

// ─── Principle colours (adapted to parchment theme) ───────────────────────
const principleColors = {
  Dharma:   { bg: `${THEME.green}18`,  accent: THEME.green,   bright: THEME.greenBright,  nameSa: "धर्म",    sutra: "मूल्यों के अनुरूप कार्य" },
  Vairagya: { bg: `${THEME.blue}18`,   accent: THEME.blue,    bright: "#7ab0d4",           nameSa: "वैराग्य", sutra: "अनासक्ति का मार्ग"       },
  Abhyasa:  { bg: `${THEME.amber}14`,  accent: THEME.amber,   bright: THEME.goldBright,    nameSa: "अभ्यास",  sutra: "निरंतर साधना"            },
};

// ─── Slider input ─────────────────────────────────────────────────────────
function SliderField({ label, labelSa, value, onChange }) {
  const pct = ((value - 1) / 4) * 100;
  const color = value >= 4 ? THEME.red : value >= 3 ? THEME.amber : THEME.green;

  return (
    <div style={S.sliderWrap}>
      <div style={S.sliderHeader}>
        <span style={S.sliderLabelSa}>{labelSa}</span>
        <span style={S.sliderLabelEn}>{label}</span>
        <span style={{ ...S.sliderVal, color }}>{value}</span>
      </div>
      <div style={S.trackWrap}>
        <div style={S.track}>
          <div style={{ ...S.trackFill, width: `${pct}%`, background: `linear-gradient(90deg, ${THEME.green}, ${color})` }} />
        </div>
        <input
          type="range" min={1} max={5} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={S.rangeInput}
        />
      </div>
      <div style={S.tickRow}>
        {[1,2,3,4,5].map(n => (
          <span key={n} style={{ ...S.tick, color: n <= value ? color : THEME.creamFaint }}>{n}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Clarity ring ─────────────────────────────────────────────────────────
function ClarityRing({ score }) {
  const r = 44, circ = 2 * Math.PI * r;
  const color = score >= 70 ? THEME.green : score >= 40 ? THEME.amber : THEME.red;
  const bright = score >= 70 ? THEME.greenBright : score >= 40 ? THEME.goldBright : THEME.redBright;
  return (
    <svg width={110} height={110} style={{ display: "block" }}>
      <circle cx={55} cy={55} r={52} fill="none" stroke={THEME.goldDim} strokeWidth={1} strokeDasharray="3 6" />
      <circle cx={55} cy={55} r={r} fill="none" stroke={THEME.bgCardAlt} strokeWidth={9} />
      <circle cx={55} cy={55} r={r} fill="none" stroke={color} strokeWidth={9}
        strokeLinecap="round"
        strokeDasharray={`${(score / 100) * circ} ${circ}`}
        transform="rotate(-90 55 55)"
        style={{ transition: "stroke-dasharray 0.7s ease, stroke 0.5s ease" }} />
      {[0,90,180,270].map((deg) => {
        const rad = (deg - 90) * Math.PI / 180;
        return <circle key={deg} cx={55 + 52 * Math.cos(rad)} cy={55 + 52 * Math.sin(rad)} r={2} fill={THEME.goldDim} />;
      })}
      <text x={55} y={50} textAnchor="middle"
        style={{ fontFamily: "'Cinzel',serif", fontSize: 24, fontWeight: 700, fill: bright, transition: "fill 0.5s" }}>
        {Math.round(score)}
      </text>
      <text x={55} y={66} textAnchor="middle"
        style={{ fontFamily: "'Tiro Devanagari Sanskrit',serif", fontSize: 10, fill: THEME.goldDim, letterSpacing: 1 }}>
        स्पष्टता
      </text>
    </svg>
  );
}

// ─── NEW: Reflection Journal ──────────────────────────────────────────────
function ReflectionJournal({ principle }) {
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  const [entries, setEntries] = useState([]);
  const pc = principle ? principleColors[principle] : null;

  const handleSave = () => {
    if (!text.trim()) return;
    setEntries((prev) => [
      { text, principle, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
      ...prev.slice(0, 2),
    ]);
    setText("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={S.panelCard}>
      <p style={S.panelLabel}>॥ चिंतन पत्रिका ॥</p>
      <p style={S.cardSubLabel}>Reflection Journal</p>

      {principle && (
        <p style={{ fontFamily: "'Tiro Devanagari Sanskrit',serif", fontSize: 12, color: pc.accent, textAlign: "center", marginBottom: 10, transition: "color 0.4s" }}>
          ✦ {pc.nameSa} — {pc.sutra}
        </p>
      )}

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="अपने विचार यहाँ लिखें… Write your reflection here…"
        style={S.textarea}
        rows={5}
      />

      <button
        style={{ ...S.saveBtn, borderColor: pc ? pc.accent : THEME.goldDim, color: pc ? pc.bright : THEME.goldBright }}
        onClick={handleSave}
      >
        {saved ? "✓ संग्रहीत — Saved" : "✦ संग्रह करें — Save Reflection"}
      </button>

      {entries.length > 0 && (
        <div style={{ marginTop: 12 }}>
          {entries.map((e, i) => (
            <div key={i} style={{ ...S.savedEntry, borderColor: (principleColors[e.principle]?.accent || THEME.border) + "60" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ color: principleColors[e.principle]?.bright, fontFamily: "'Tiro Devanagari Sanskrit',serif", fontSize: 11 }}>
                  {principleColors[e.principle]?.nameSa}
                </span>
                <span style={{ fontFamily: "'Cinzel',serif", fontSize: 9, color: THEME.creamFaint }}>{e.time}</span>
              </div>
              <p style={{ fontFamily: "'IM Fell English',serif", fontStyle: "italic", fontSize: 12, color: THEME.creamDim, lineHeight: 1.6, margin: 0 }}>{e.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── NEW: Principle History ───────────────────────────────────────────────
function PrincipleHistory({ history }) {
  return (
    <div style={S.panelCard}>
      <p style={S.panelLabel}>॥ साधना इतिहास ॥</p>
      <p style={S.cardSubLabel}>Session History</p>

      {history.length === 0 ? (
        <p style={{ fontFamily: "'IM Fell English',serif", fontStyle: "italic", fontSize: 12, color: THEME.creamFaint, textAlign: "center", padding: "16px 0", margin: 0 }}>
          Generate wisdom to see your pattern emerge…
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 10 }}>
          {history.map((item, i) => {
            const pc = principleColors[item.principle];
            return (
              <div key={i} style={{ border: `1px solid ${pc.accent}60`, borderRadius: 2, padding: "8px 12px", background: pc.accent + "10", transition: "all 0.3s" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontFamily: "'Tiro Devanagari Sanskrit',serif", fontSize: 16, color: pc.bright, lineHeight: 1 }}>{pc.nameSa}</span>
                    <span style={{ fontFamily: "'IM Fell English',serif", fontStyle: "italic", fontSize: 10, color: THEME.creamDim }}>{item.principle}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                    <div style={{ width: 60, height: 4, background: THEME.bgCardAlt, border: `1px solid ${THEME.goldDim}44`, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${item.clarity}%`, background: `linear-gradient(90deg, ${pc.accent}, ${pc.bright})`, transition: "width 0.5s ease" }} />
                    </div>
                    <span style={{ fontFamily: "'Cinzel',serif", fontSize: 9, color: pc.bright }}>{Math.round(item.clarity)}%</span>
                    <span style={{ fontFamily: "'Cinzel',serif", fontSize: 9, color: THEME.creamFaint }}>{item.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {history.length > 1 && (
        <p style={{ fontFamily: "'IM Fell English',serif", fontStyle: "italic", fontSize: 11, color: THEME.creamFaint, textAlign: "center", marginTop: 12, paddingTop: 10, borderTop: `1px solid ${THEME.goldDim}40` }}>
          {history.every(h => h.principle === history[0].principle)
            ? `Consistent ${history[0].principle} energy — lean into it.`
            : "Your path is unfolding with variety."}
        </p>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────
const DharmicDecisionFramework = () => {
  // ── ORIGINAL STATE (untouched) ──
  const [stress, setStress]             = useState(1);
  const [reactive, setReactive]         = useState(1);
  const [overthinking, setOverthinking] = useState(1);
  const [principle, setPrinciple]       = useState(null);
  const [revealed, setRevealed]         = useState(false);

  // ── NEW: history for right column ──
  const [history, setHistory] = useState([]);

  // Inject global styles once
  React.useEffect(() => {
    if (!document.getElementById("arogyamind-styles")) {
      const tag = document.createElement("style");
      tag.id = "arogyamind-styles";
      tag.textContent = GLOBAL_STYLE + `
        input[type=range] { -webkit-appearance: none; appearance: none; background: transparent; cursor: pointer; width: 100%; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 14px; height: 14px; border-radius: 50%; background: ${THEME.gold}; border: 2px solid ${THEME.goldBright}; margin-top: -5px; }
        input[type=range]::-webkit-slider-runnable-track { height: 4px; background: transparent; }
        input[type=range]::-moz-range-thumb { width: 14px; height: 14px; border-radius: 50%; background: ${THEME.gold}; border: 2px solid ${THEME.goldBright}; }
      `;
      document.head.appendChild(tag);
    }
  }, []);

  // ── ORIGINAL HANDLER (untouched logic, + history side effect) ──
  const handleSubmit = () => {
    let selected = "Abhyasa";
    if (stress >= 4 || reactive >= 4) selected = "Vairagya";
    else if (overthinking >= 4) selected = "Dharma";
    setPrinciple(selected);
    setRevealed(false);
    setTimeout(() => setRevealed(true), 50);

    // NEW: push to history
    const clarity = 100 - ((stress + reactive + overthinking) / 15) * 100;
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setHistory((prev) => [{ principle: selected, clarity, time }, ...prev].slice(0, 5));
  };

  // ── ORIGINAL formula (untouched) ──
  const clarityScore = 100 - ((stress + reactive + overthinking) / 15) * 100;
  const pc = principle ? principleColors[principle] : null;

  return (
    <div style={S.page}>

      {/* ── Header (untouched) ── */}
      <header style={S.header}>
        <div style={S.logoWrap}>
          <span style={S.omSymbol}>ॐ</span>
          <div>
            <div style={S.logoTitle}>ArogyaMind</div>
            <div style={S.logoSub}>आरोग्यमन्द् — Body Intelligence</div>
          </div>
        </div>
        <div style={S.statusCapsule}>
          <span style={S.statusDot} />
          <span style={S.statusText}>धार्मिक निर्णय</span>
        </div>
      </header>

      {/* ── Divider (untouched) ── */}
      <div style={S.dividerRow}>
        <div style={S.dividerLine} />
        <span style={S.dividerText}>॥ धार्मिक निर्णय ढाँचा ॥</span>
        <div style={S.dividerLine} />
      </div>

      <main style={S.main}>

        {/* ── Left col: sliders + clarity (untouched) ── */}
        <div style={S.leftCol}>
          <div style={S.panelCard}>
            <p style={S.panelLabel}>॥ आत्म-मूल्यांकन ॥</p>
            <p style={S.cardSubLabel}>Self Assessment</p>
            <SliderField label="Stress"               labelSa="तनाव"       value={stress}        onChange={setStress}        />
            <SliderField label="Emotional Reactivity" labelSa="भावनात्मक"  value={reactive}      onChange={setReactive}      />
            <SliderField label="Overthinking"         labelSa="अतिविचार"   value={overthinking}  onChange={setOverthinking}  />
            <button style={S.submitBtn} onClick={handleSubmit}>
              ✦ ज्ञान प्राप्त करें — Generate Wisdom
            </button>
          </div>

          <div style={S.panelCard}>
            <p style={S.panelLabel}>॥ निर्णय स्पष्टता ॥</p>
            <p style={S.cardSubLabel}>Decision Clarity Score</p>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
              <ClarityRing score={clarityScore} />
            </div>
            <div style={{ marginTop: 10 }}>
              <div style={S.barTrack}>
                <div style={{
                  ...S.barFill,
                  width: `${clarityScore}%`,
                  background: clarityScore >= 70
                    ? `linear-gradient(90deg, ${THEME.green}, ${THEME.greenBright})`
                    : clarityScore >= 40
                    ? `linear-gradient(90deg, ${THEME.goldDim}, ${THEME.gold})`
                    : `linear-gradient(90deg, ${THEME.red}, ${THEME.redBright})`,
                }} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Middle col: wisdom card (untouched) ── */}
        <div style={S.middleCol}>
          {!principle ? (
            <div style={S.emptyState}>
              <p style={S.emptyOm}>ॐ</p>
              <p style={S.emptyTitle}>अपना मूल्यांकन करें</p>
              <p style={S.emptySub}>Complete the self-assessment and receive your guiding principle.</p>
            </div>
          ) : (
            <div style={{
              ...S.wisdomCard,
              borderColor: pc.accent,
              background: pc.bg,
              animation: revealed ? "fadeUp 0.5s ease forwards" : "none",
            }}>
              <div style={S.wisdomHeader}>
                <div style={S.wisdomCorner}>✦</div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ ...S.wisdomNameSa, color: pc.bright }}>{pc.nameSa}</p>
                  <p style={{ ...S.wisdomNameEn, color: pc.accent }}>{principle}</p>
                </div>
                <div style={S.wisdomCorner}>✦</div>
              </div>
              <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${pc.accent}, transparent)`, margin: "12px 0" }} />
              {[
                { labelSa: "विवरण",  labelEn: "Description", text: principlesData[principle].description      },
                { labelSa: "चिंतन",  labelEn: "Reflect",     text: principlesData[principle].reflectionPrompt },
                { labelSa: "अभ्यास", labelEn: "Practice",    text: principlesData[principle].microPractice    },
                { labelSa: "श्वास",  labelEn: "Breathe",     text: principlesData[principle].breathingPrompt  },
              ].map(({ labelSa, labelEn, text }) => (
                <div key={labelEn} style={{ marginTop: 14 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontFamily: "'Tiro Devanagari Sanskrit',serif", fontSize: 13, color: pc.bright }}>{labelSa}</span>
                    <span style={{ fontFamily: "'IM Fell English',serif", fontStyle: "italic", fontSize: 11, color: THEME.creamFaint }}>{labelEn}</span>
                  </div>
                  <p style={{ fontFamily: "'IM Fell English',serif", fontSize: 13, color: THEME.cream, lineHeight: 1.75, margin: 0 }}>{text}</p>
                </div>
              ))}
              <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${pc.accent}, transparent)`, margin: "12px 0 4px" }} />
              <p style={{ fontFamily: "'Tiro Devanagari Sanskrit',serif", fontSize: 11, color: pc.accent, textAlign: "center", letterSpacing: 2, margin: 0 }}>
                ॥ स्वस्ति ॥
              </p>
            </div>
          )}
        </div>

        {/* ── NEW: Right col — Journal + History ── */}
        <div style={S.rightCol}>
          <ReflectionJournal principle={principle} />
          <div style={{ marginTop: 16 }}>
            <PrincipleHistory history={history} />
          </div>
        </div>

      </main>

      {/* ── Footer divider (untouched) ── */}
      <div style={S.dividerRow}>
        <div style={S.dividerLine} />
        <span style={S.dividerText}>॥ स्वस्ति ॥</span>
        <div style={S.dividerLine} />
      </div>

    </div>
  );
};

export default DharmicDecisionFramework;

// ─── Styles ───────────────────────────────────────────────────────────────
const S = {
  page: {
    minHeight: "100vh",
    background: THEME.bg,
    backgroundImage: `
      radial-gradient(ellipse at 20% 20%, rgba(90,70,20,0.15) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 80%, rgba(60,40,10,0.2) 0%, transparent 60%)
    `,
    color: THEME.cream,
    fontFamily: "'IM Fell English', serif",
    padding: "0 0 32px",
  },
  header: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "20px 32px",
    borderBottom: `1px solid ${THEME.border}`,
    background: `linear-gradient(180deg, rgba(40,28,8,0.8) 0%, transparent 100%)`,
  },
  logoWrap: { display: "flex", alignItems: "center", gap: 14 },
  omSymbol: {
    fontSize: 38, color: THEME.gold,
    textShadow: `0 0 20px ${THEME.gold}88`,
    fontFamily: "'Tiro Devanagari Sanskrit', serif", lineHeight: 1,
  },
  logoTitle: {
    fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: 22,
    color: THEME.goldBright, letterSpacing: 2,
    textShadow: `0 0 12px ${THEME.gold}44`,
  },
  logoSub: {
    fontFamily: "'Tiro Devanagari Sanskrit', serif", fontSize: 12,
    color: THEME.goldDim, letterSpacing: 1, marginTop: 2,
  },
  statusCapsule: {
    display: "flex", alignItems: "center", gap: 8,
    padding: "7px 16px", borderRadius: 2,
    border: `1px solid ${THEME.amber}`,
    background: `${THEME.amber}14`,
  },
  statusDot: {
    width: 7, height: 7, borderRadius: "50%",
    background: THEME.goldBright,
    boxShadow: `0 0 7px ${THEME.goldBright}`,
    display: "inline-block",
  },
  statusText: {
    fontFamily: "'Cinzel',serif", fontSize: 11,
    letterSpacing: 1.5, color: THEME.goldBright,
  },
  dividerRow: {
    display: "flex", alignItems: "center", gap: 12, padding: "6px 32px",
  },
  dividerLine: {
    flex: 1, height: 1,
    background: `linear-gradient(90deg, transparent, ${THEME.goldDim}, transparent)`,
  },
  dividerText: {
    fontFamily: "'Tiro Devanagari Sanskrit',serif", fontSize: 13,
    color: THEME.goldDim, whiteSpace: "nowrap", letterSpacing: 3,
  },
  // ── Layout ──
  main: {
    display: "flex", gap: 24, padding: "20px 32px",
    alignItems: "flex-start", flexWrap: "wrap",
  },
  leftCol:   { flex: "0 0 280px", display: "flex", flexDirection: "column", gap: 16, animation: "fadeUp 0.6s ease" },
  middleCol: { flex: "1 1 300px", animation: "fadeUp 0.7s ease" },
  rightCol:  { flex: "0 0 250px", animation: "fadeUp 0.8s ease" },
  // ── Cards ──
  panelCard: {
    background: THEME.bgCard,
    border: `1px solid ${THEME.border}`,
    borderRadius: 4,
    padding: "18px 20px",
    boxShadow: `0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(201,151,42,0.06)`,
  },
  panelLabel: {
    fontFamily: "'Tiro Devanagari Sanskrit',serif", fontSize: 13,
    color: THEME.gold, letterSpacing: 1, textAlign: "center", marginBottom: 2,
  },
  cardSubLabel: {
    fontFamily: "'IM Fell English',serif", fontStyle: "italic",
    fontSize: 11, color: THEME.creamFaint, textAlign: "center", marginBottom: 16,
  },
  // ── Sliders ──
  sliderWrap: { marginBottom: 18 },
  sliderHeader: { display: "flex", alignItems: "baseline", gap: 6, marginBottom: 6 },
  sliderLabelSa: { fontFamily: "'Tiro Devanagari Sanskrit',serif", fontSize: 13, color: THEME.cream },
  sliderLabelEn: { fontFamily: "'IM Fell English',serif", fontStyle: "italic", fontSize: 11, color: THEME.creamDim, flex: 1 },
  sliderVal: { fontFamily: "'Cinzel',serif", fontWeight: 700, fontSize: 16, transition: "color 0.3s" },
  trackWrap: { position: "relative", height: 20, display: "flex", alignItems: "center" },
  track: { position: "absolute", left: 0, right: 0, height: 4, background: THEME.bgCardAlt, border: `1px solid ${THEME.goldDim}44`, borderRadius: 0, overflow: "hidden" },
  trackFill: { height: "100%", transition: "width 0.3s ease, background 0.3s ease" },
  rangeInput: { position: "absolute", left: 0, right: 0, width: "100%", height: 20, opacity: 0.001, zIndex: 2 },
  tickRow: { display: "flex", justifyContent: "space-between", marginTop: 4, paddingLeft: 2, paddingRight: 2 },
  tick: { fontFamily: "'Cinzel',serif", fontSize: 9, transition: "color 0.3s" },
  submitBtn: {
    marginTop: 8, width: "100%", padding: "11px 0",
    border: `1px solid ${THEME.gold}`, borderRadius: 2,
    background: `linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.18))`,
    color: THEME.goldBright, fontFamily: "'Cinzel',serif", fontSize: 12,
    letterSpacing: 1, cursor: "pointer", transition: "all 0.2s",
  },
  barTrack: { height: 4, background: THEME.bgCardAlt, borderRadius: 0, overflow: "hidden", border: `1px solid ${THEME.goldDim}44` },
  barFill: { height: "100%", borderRadius: 0, transition: "width 0.7s ease, background 0.5s ease" },
  // ── Empty state ──
  emptyState: {
    background: THEME.bgCard, border: `1px solid ${THEME.border}`, borderRadius: 4,
    padding: "48px 32px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
    boxShadow: `0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(201,151,42,0.06)`,
    minHeight: 300, justifyContent: "center",
  },
  emptyOm: { fontFamily: "'Tiro Devanagari Sanskrit',serif", fontSize: 52, color: `${THEME.gold}60`, textShadow: `0 0 30px ${THEME.gold}40`, lineHeight: 1 },
  emptyTitle: { fontFamily: "'Cinzel',serif", fontWeight: 600, fontSize: 16, color: THEME.creamDim, letterSpacing: 1 },
  emptySub: { fontFamily: "'IM Fell English',serif", fontStyle: "italic", fontSize: 13, color: THEME.creamFaint, textAlign: "center", maxWidth: 260 },
  // ── Wisdom card ──
  wisdomCard: {
    border: "1px solid", borderRadius: 4, padding: "24px 24px 20px",
    boxShadow: `0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(201,151,42,0.1)`,
    transition: "border-color 0.4s",
  },
  wisdomHeader: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  wisdomCorner: { color: THEME.goldDim, fontSize: 14 },
  wisdomNameSa: { fontFamily: "'Tiro Devanagari Sanskrit',serif", fontSize: 26, letterSpacing: 2, lineHeight: 1.2, transition: "color 0.4s", margin: 0 },
  wisdomNameEn: { fontFamily: "'Cinzel',serif", fontWeight: 700, fontSize: 13, letterSpacing: 3, marginTop: 4, transition: "color 0.4s" },
  // ── Journal ──
  textarea: {
    width: "100%", boxSizing: "border-box",
    background: THEME.bgCardAlt, border: `1px solid ${THEME.goldDim}60`,
    borderRadius: 2, padding: "10px 12px",
    color: THEME.cream, fontFamily: "'IM Fell English',serif",
    fontStyle: "italic", fontSize: 13, lineHeight: 1.9,
    resize: "vertical", outline: "none",
  },
  saveBtn: {
    marginTop: 10, width: "100%", padding: "9px 0",
    border: "1px solid", borderRadius: 2, background: "transparent",
    fontFamily: "'Cinzel',serif", fontSize: 11, letterSpacing: 1,
    cursor: "pointer", transition: "all 0.2s",
  },
  savedEntry: {
    border: "1px solid", borderRadius: 2,
    padding: "8px 12px", marginTop: 8,
    background: THEME.bgCardAlt,
  },
};