import { useState, useEffect, useRef } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');`;

const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --bg: #f4f6f4;
  --surface: #ffffff;
  --surface2: #f0f4f0;
  --surface3: #e6ece6;
  --border: rgba(0,0,0,0.07);
  --border2: rgba(0,0,0,0.13);
  --accent: #4db82a;
  --accent-light: #e6f7e0;
  --accent-dim: rgba(77,184,42,0.13);
  --accent-dark: #357a1d;
  --text: #181f18;
  --text2: #526052;
  --text3: #8fa08f;
  --danger: #d93a3a;
  --danger-dim: rgba(217,58,58,0.09);
  --warning: #d97d1a;
  --warning-dim: rgba(217,125,26,0.09);
  --info: #1a6ed9;
  --info-dim: rgba(26,110,217,0.09);
  --success: #1a9e52;
  --success-dim: rgba(26,158,82,0.09);
  --radius: 10px;
  --radius-lg: 16px;
  --radius-xl: 22px;
  --shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04);
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  color: var(--text);
  background: var(--bg);
  -webkit-font-smoothing: antialiased;
}
body { background: var(--bg); min-height: 100vh; }
h1,h2,h3,h4 { font-family: 'Syne', sans-serif; letter-spacing: -0.02em; color: var(--text); }
input, textarea, select {
  background: var(--surface); border: 1px solid var(--border2);
  border-radius: var(--radius); color: var(--text);
  font-family: 'DM Sans', sans-serif; font-size: 14px;
  padding: 9px 13px; outline: none; width: 100%;
  transition: border-color 0.15s, box-shadow 0.15s;
  box-shadow: var(--shadow);
}
input:focus, textarea:focus, select:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-dim); }
select option { background: var(--surface); color: var(--text); }
button { cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 14px; border: none; border-radius: var(--radius); transition: all 0.15s; }
label { font-size: 12px; color: var(--text2); font-weight: 500; letter-spacing: 0.03em; display: block; margin-bottom: 5px; }
.btn-primary { background: var(--accent); color: #fff; font-weight: 600; padding: 10px 20px; font-family: 'Syne', sans-serif; box-shadow: 0 2px 8px rgba(77,184,42,0.25); }
.btn-primary:hover { background: var(--accent-dark); }
.btn-ghost { background: var(--surface); color: var(--text2); border: 1px solid var(--border2); padding: 8px 16px; box-shadow: var(--shadow); }
.btn-ghost:hover { background: var(--surface2); color: var(--text); }
.btn-danger { background: var(--danger-dim); color: var(--danger); padding: 7px 14px; border: 1px solid rgba(217,58,58,0.18); }
.btn-danger:hover { background: rgba(217,58,58,0.16); }
.btn-sm { padding: 6px 12px; font-size: 13px; }
.btn-lg { padding: 15px 0; font-size: 16px; font-family: 'Syne', sans-serif; font-weight: 700; width: 100%; border-radius: var(--radius-lg); }
.btn-log { background: var(--accent); color: #fff; font-weight: 700; padding: 16px 0; font-family: 'Syne', sans-serif; font-size: 17px; border-radius: var(--radius-lg); width: 100%; box-shadow: 0 4px 16px rgba(77,184,42,0.3); }
.btn-log:hover { background: var(--accent-dark); }
.card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 20px; box-shadow: var(--shadow); }
.tag { display: inline-block; font-size: 11px; font-weight: 600; padding: 3px 9px; border-radius: 20px; letter-spacing: 0.04em; font-family: 'Syne', sans-serif; }
.tag-green { background: var(--accent-dim); color: var(--accent-dark); }
.tag-blue { background: var(--info-dim); color: var(--info); }
.tag-red { background: var(--danger-dim); color: var(--danger); }
.tag-orange { background: var(--warning-dim); color: var(--warning); }
.tag-gray { background: var(--surface3); color: var(--text3); }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; backdrop-filter: blur(3px); }
.modal { background: var(--surface); border: 1px solid var(--border2); border-radius: var(--radius-xl); padding: 28px; width: 100%; max-width: 560px; max-height: 90vh; overflow-y: auto; box-shadow: var(--shadow-md); }
.modal-lg { max-width: 740px; }
.sidebar { width: 224px; min-width: 224px; background: var(--surface); border-right: 1px solid var(--border); padding: 20px 12px; display: flex; flex-direction: column; gap: 2px; min-height: 100vh; }
.nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: var(--radius); color: var(--text2); font-size: 14px; cursor: pointer; transition: all 0.12s; font-weight: 500; border: none; background: transparent; width: 100%; text-align: left; position: relative; }
.nav-item:hover { background: var(--surface2); color: var(--text); }
.nav-item.active { background: var(--accent-dim); color: var(--accent-dark); font-weight: 600; }
.main { flex: 1; padding: 32px; overflow-y: auto; max-height: 100vh; background: var(--bg); }
.stat-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 16px 20px; box-shadow: var(--shadow); }
.stat-num { font-size: 28px; font-weight: 700; font-family: 'Syne', sans-serif; color: var(--accent-dark); }
.stat-label { font-size: 12px; color: var(--text2); font-weight: 500; margin-top: 2px; }
.exercise-row { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 16px 18px; margin-bottom: 10px; box-shadow: var(--shadow); }
.set-input { padding: 7px 10px; text-align: center; font-size: 13px; }
.prog-bar { background: var(--surface3); border-radius: 4px; height: 8px; overflow: hidden; margin-top: 6px; }
.prog-fill { height: 100%; border-radius: 4px; background: var(--accent); transition: width 0.4s ease; }
.video-embed { width: 100%; aspect-ratio: 16/9; border-radius: var(--radius); border: none; background: #000; }
.chip { display: inline-flex; align-items: center; gap: 6px; background: var(--surface2); border: 1px solid var(--border); border-radius: 20px; padding: 4px 12px; font-size: 12px; color: var(--text2); }
.avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--accent-dim); color: var(--accent-dark); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; font-family: 'Syne', sans-serif; flex-shrink: 0; }
.client-row { display: flex; align-items: center; gap: 12px; padding: 14px 16px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); margin-bottom: 8px; cursor: pointer; transition: border-color 0.15s, box-shadow 0.15s; box-shadow: var(--shadow); }
.client-row:hover { border-color: var(--accent); box-shadow: 0 2px 8px rgba(77,184,42,0.1); }
.scroll-x { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; flex-wrap: wrap; }
.empty-state { text-align: center; padding: 48px 24px; color: var(--text3); }
.empty-icon { font-size: 40px; margin-bottom: 12px; }
.lib-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 16px; box-shadow: var(--shadow); margin-bottom: 10px; }
.rating-btn { width: 38px; height: 38px; border-radius: 50%; border: 1.5px solid var(--border2); background: var(--surface); color: var(--text2); font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.12s; font-family: 'Syne', sans-serif; }
.rating-btn.sel { background: var(--accent); color: #fff; border-color: var(--accent); box-shadow: 0 2px 8px rgba(77,184,42,0.3); }
.metric-box { background: var(--accent-light); border: 1px solid rgba(77,184,42,0.18); border-radius: var(--radius-lg); padding: 14px 10px; text-align: center; }
.metric-val { font-size: 20px; font-weight: 700; font-family: 'Syne', sans-serif; color: var(--accent-dark); }
.metric-lbl { font-size: 11px; color: var(--text2); font-weight: 500; margin-top: 3px; }
.msg-bubble-coach { background: var(--accent-dim); border-radius: 16px 16px 4px 16px; padding: 10px 14px; max-width: 75%; font-size: 14px; color: var(--text); }
.msg-bubble-client { background: var(--surface2); border: 1px solid var(--border); border-radius: 16px 16px 16px 4px; padding: 10px 14px; max-width: 75%; font-size: 14px; color: var(--text); }
.unread-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--danger); position: absolute; top: 8px; right: 10px; }
.rm-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 16px 18px; box-shadow: var(--shadow); }
.client-nav-tab { display: flex; align-items: center; justify-content: center; gap: 6px; padding: 12px 0; font-size: 13px; font-weight: 600; font-family: 'Syne', sans-serif; cursor: pointer; border: none; background: transparent; color: var(--text3); border-bottom: 2px solid transparent; transition: all 0.15s; flex: 1; }
.client-nav-tab.active { color: var(--accent-dark); border-bottom-color: var(--accent); }
input[type=number]::-webkit-inner-spin-button { opacity: 0.5; }
`;

const STORE_KEY = "coachapp_v5";
const loadStore = () => { try { const r = localStorage.getItem(STORE_KEY); return r ? JSON.parse(r) : null; } catch(e) { return null; } };
const saveStore = (data) => { try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch(e) {} };

const DEFAULT_STORE = {
  coach: { name: "Coach", password: "coach123" },
  clients: [
    { id: "c1", name: "Alex Johnson", email: "alex@example.com", password: "alex123", goal: "Build strength", joinDate: "2025-01-10" },
    { id: "c2", name: "Sam Rivera", email: "sam@example.com", password: "sam123", goal: "Fat loss + conditioning", joinDate: "2025-02-15" },
  ],
  programs: [
    {
      id: "p1", clientId: "c1", name: "Strength Block 1", weeks: 4, currentWeek: 1, createdAt: "2025-01-10",
      exercises: [
        { id: "e1", name: "Back Squat", type: "weight", sets: 4, reps: "5", videoUrl: "https://www.youtube.com/embed/ultWZbUMPL8", notes: "Keep chest tall, drive through heels" },
        { id: "e2", name: "Romanian Deadlift", type: "weight", sets: 3, reps: "8", videoUrl: "https://www.youtube.com/embed/JCXUYuzwNrM", notes: "Hinge at hips, soft knee bend" },
        { id: "e3", name: "Plank Hold", type: "time", sets: 3, reps: "60", videoUrl: "", notes: "Neutral spine, brace core" },
      ]
    },
    {
      id: "p2", clientId: "c2", name: "Conditioning Phase 1", weeks: 3, currentWeek: 1, createdAt: "2025-02-15",
      exercises: [
        { id: "e4", name: "Goblet Squat", type: "weight", sets: 3, reps: "12", videoUrl: "https://www.youtube.com/embed/MxsFDhcyFyE", notes: "Elbows inside knees at bottom" },
        { id: "e5", name: "Battle Ropes", type: "time", sets: 4, reps: "30", videoUrl: "", notes: "Alternate arm waves, stay low" },
      ]
    }
  ],
  exerciseLibrary: [
    { id: "lib1", name: "Back Squat", category: "Legs", description: "Barbell squat. Keep chest tall, drive through heels.", videoUrl: "https://www.youtube.com/embed/ultWZbUMPL8" },
    { id: "lib2", name: "Romanian Deadlift", category: "Legs", description: "Hip hinge targeting hamstrings. Soft knee bend.", videoUrl: "https://www.youtube.com/embed/JCXUYuzwNrM" },
    { id: "lib3", name: "Bench Press", category: "Push", description: "Flat barbell bench press. Retract scapula, controlled descent.", videoUrl: "" },
    { id: "lib4", name: "Deadlift", category: "Pull", description: "Conventional deadlift. Hips back, bar close to body.", videoUrl: "" },
    { id: "lib5", name: "Plank Hold", category: "Core", description: "Static hold. Neutral spine, squeeze glutes.", videoUrl: "" },
  ],
  logs: {},
  workoutSummaries: {},
  messages: {}
};

const uid = () => Math.random().toString(36).slice(2, 9);
const initials = (name) => name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
const getYtEmbed = (url) => {
  if (!url || url === "") return "";
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (m) return "https://www.youtube.com/embed/" + m[1];
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) return "https://player.vimeo.com/video/" + vm[1];
  return url;
};
const formatDuration = (s) => { const m = Math.floor(s / 60); const sec = s % 60; return m > 0 ? m + "m " + sec + "s" : sec + "s"; };

// Epley formula: 1RM = weight * (1 + reps/30)
const epley1RM = (weight, reps) => {
  if (!weight || !reps || reps <= 0) return null;
  if (reps === 1) return weight;
  return Math.round(weight * (1 + reps / 30));
};

const BIG_LIFTS = ["squat", "bench", "deadlift", "press", "row"];
const isBigLift = (name) => BIG_LIFTS.some((l) => name.toLowerCase().includes(l));

const CATEGORIES = ["All", "Legs", "Push", "Pull", "Core", "Cardio", "Full Body", "Other"];
const ratingColor = (r) => { if (r <= 3) return "var(--success)"; if (r <= 6) return "var(--warning)"; return "var(--danger)"; };

// ─── Login ──────────────────────────────────────────────────────────────────
function Login({ store, onLogin }) {
  const [mode, setMode] = useState("coach");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const go = () => {
    setErr("");
    if (mode === "coach") {
      if (pass === store.coach.password) onLogin({ role: "coach" });
      else setErr("Wrong password.");
    } else {
      const c = store.clients.find((c) => c.email.toLowerCase() === email.toLowerCase() && c.password === pass);
      if (c) onLogin({ role: "client", clientId: c.id });
      else setErr("Email or password not found.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <div style={{ width: "42px", height: "42px", background: "var(--accent)", borderRadius: "13px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(77,184,42,0.35)", fontSize: "22px" }}>⚡</div>
            <span style={{ fontFamily: "Syne, sans-serif", fontSize: "26px", fontWeight: "800", letterSpacing: "-0.03em" }}>CoachOS</span>
          </div>
          <p style={{ color: "var(--text2)", fontSize: "14px" }}>Your personal coaching platform</p>
        </div>
        <div className="card" style={{ padding: "28px" }}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
            {["coach","client"].map((m) => (
              <button key={m} onClick={() => { setMode(m); setErr(""); }}
                style={{ flex: 1, padding: "9px 0", borderRadius: "var(--radius)", fontFamily: "Syne, sans-serif", fontWeight: "600", fontSize: "14px",
                  background: mode === m ? "var(--accent)" : "var(--surface2)",
                  color: mode === m ? "#fff" : "var(--text2)",
                  border: mode === m ? "none" : "1px solid var(--border2)",
                  boxShadow: mode === m ? "0 2px 8px rgba(77,184,42,0.25)" : "none" }}>
                {m === "coach" ? "🏋️ Coach" : "👤 Client"}
              </button>
            ))}
          </div>
          {mode === "client" && <div style={{ marginBottom: "14px" }}><label>Email</label><input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" type="email" /></div>}
          <div style={{ marginBottom: "18px" }}><label>Password</label><input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="••••••••" onKeyDown={(e) => { if (e.key === "Enter") go(); }} /></div>
          {err !== "" && <p style={{ color: "var(--danger)", fontSize: "13px", marginBottom: "12px" }}>⚠ {err}</p>}
          <button className="btn-primary" style={{ width: "100%", padding: "12px 0", fontSize: "15px" }} onClick={go}>Sign in →</button>
          <p style={{ color: "var(--text3)", fontSize: "12px", textAlign: "center", marginTop: "16px" }}>
            {mode === "coach" ? "Default coach password: coach123" : "Ask your coach for your login credentials"}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Coach App Shell ─────────────────────────────────────────────────────────
function CoachApp({ store, setStore }) {
  const [tab, setTab] = useState("dashboard");
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [msgClient, setMsgClient] = useState(null);

  const openClient = (c) => { setSelectedClient(c); setTab("client-detail"); };
  const openProgram = (p) => { setSelectedProgram(p); setTab("program-editor"); };
  const openMsg = (c) => { setMsgClient(c); setTab("messages"); };

  const unreadCount = () => {
    let n = 0;
    store.clients.forEach((c) => {
      const thread = (store.messages || {})[c.id] || [];
      thread.forEach((m) => { if (m.from === "client" && !m.readByCoach) n++; });
    });
    return n;
  };
  const totalUnread = unreadCount();

  const navItems = [
    { id: "dashboard", icon: "▦", label: "Dashboard" },
    { id: "clients", icon: "◉", label: "Clients" },
    { id: "programs", icon: "≡", label: "Programs" },
    { id: "library", icon: "◈", label: "Exercise Library" },
    { id: "messages", icon: "✉", label: "Messages", badge: totalUnread },
    { id: "settings", icon: "⚙", label: "Settings" },
  ];

  const isActive = (id) => {
    if (tab === id) return true;
    if (tab === "client-detail" && id === "clients") return true;
    if (tab === "program-editor" && id === "programs") return true;
    return false;
  };

  const markRead = (clientId) => {
    const thread = (store.messages || {})[clientId] || [];
    const updated = thread.map((m) => m.from === "client" ? { ...m, readByCoach: true } : m);
    const newStore = { ...store, messages: { ...(store.messages || {}), [clientId]: updated } };
    setStore(newStore); saveStore(newStore);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div className="sidebar">
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px 24px" }}>
          <div style={{ width: "30px", height: "30px", background: "var(--accent)", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", boxShadow: "0 2px 8px rgba(77,184,42,0.25)" }}>⚡</div>
          <span style={{ fontFamily: "Syne, sans-serif", fontWeight: "800", fontSize: "17px", letterSpacing: "-0.02em" }}>CoachOS</span>
        </div>
        {navItems.map((n) => (
          <button key={n.id} className={"nav-item" + (isActive(n.id) ? " active" : "")}
            onClick={() => { setTab(n.id); if (n.id !== "messages") { setMsgClient(null); } }}>
            <span style={{ width: "20px", textAlign: "center", fontSize: "16px" }}>{n.icon}</span>
            {n.label}
            {n.badge > 0 && <span style={{ marginLeft: "auto", background: "var(--danger)", color: "#fff", borderRadius: "10px", fontSize: "11px", padding: "1px 7px", fontWeight: "700" }}>{n.badge}</span>}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ padding: "12px 12px 4px", borderTop: "1px solid var(--border)", marginTop: "8px" }}>
          <p style={{ fontSize: "11px", color: "var(--text3)", marginBottom: "2px" }}>Logged in as</p>
          <p style={{ fontSize: "14px", fontWeight: "600", color: "var(--text2)" }}>{store.coach.name}</p>
        </div>
      </div>

      <div className="main">
        {tab === "dashboard" && <CoachDashboard store={store} openClient={openClient} openProgram={openProgram} openMsg={openMsg} />}
        {tab === "clients" && <ClientsList store={store} setStore={setStore} openClient={openClient} openMsg={openMsg} />}
        {tab === "client-detail" && selectedClient !== null && <ClientDetail client={selectedClient} store={store} setStore={setStore} openProgram={openProgram} setTab={setTab} openMsg={openMsg} />}
        {tab === "programs" && <ProgramsList store={store} setStore={setStore} openProgram={openProgram} />}
        {tab === "program-editor" && selectedProgram !== null && <ProgramEditor program={selectedProgram} store={store} setStore={setStore} setTab={setTab} setSelectedProgram={setSelectedProgram} />}
        {tab === "library" && <ExerciseLibrary store={store} setStore={setStore} />}
        {tab === "messages" && <CoachMessages store={store} setStore={setStore} initialClient={msgClient} markRead={markRead} />}
        {tab === "settings" && <Settings store={store} setStore={setStore} />}
      </div>
    </div>
  );
}

// ─── Coach Dashboard ─────────────────────────────────────────────────────────
function CoachDashboard({ store, openClient, openProgram, openMsg }) {
  const clients = store.clients;
  const programs = store.programs;
  const recentFeedback = [];
  Object.entries(store.workoutSummaries || {}).forEach(([key, s]) => {
    if (s.rating) {
      const progId = key.split("_w")[0];
      const week = key.split("_w")[1];
      const prog = programs.find((p) => p.id === progId);
      const client = prog ? clients.find((c) => c.id === prog.clientId) : null;
      if (client && prog) recentFeedback.push({ client: client.name, clientObj: client, prog: prog.name, week, rating: s.rating, note: s.feedbackNote || "", date: s.loggedAt || "" });
    }
  });
  recentFeedback.sort((a, b) => b.date > a.date ? 1 : -1);

  return (
    <div>
      <p style={{ color: "var(--text2)", marginBottom: "4px", fontSize: "14px" }}>Welcome back,</p>
      <h1 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "28px" }}>{store.coach.name} 👋</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px", marginBottom: "32px" }}>
        {[
          { num: clients.length, label: "Active clients", icon: "◉" },
          { num: programs.length, label: "Programs", icon: "≡" },
          { num: (store.exerciseLibrary || []).length, label: "Library exercises", icon: "◈" },
          { num: Object.keys(store.workoutSummaries || {}).length, label: "Logged workouts", icon: "✓" },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div style={{ fontSize: "20px", marginBottom: "8px", color: "var(--accent)" }}>{s.icon}</div>
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div>
          <h2 style={{ fontSize: "17px", fontWeight: "700", marginBottom: "14px" }}>Your clients</h2>
          {clients.map((c) => {
            const progs = programs.filter((p) => p.clientId === c.id);
            const unread = ((store.messages || {})[c.id] || []).filter((m) => m.from === "client" && !m.readByCoach).length;
            return (
              <div key={c.id} className="client-row" onClick={() => openClient(c)}>
                <div className="avatar">{initials(c.name)}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: "600", fontSize: "14px" }}>{c.name}</p>
                  <p style={{ fontSize: "12px", color: "var(--text3)", marginTop: "2px" }}>{progs.length} program{progs.length !== 1 ? "s" : ""}</p>
                </div>
                {unread > 0 && <span style={{ background: "var(--danger)", color: "#fff", borderRadius: "10px", fontSize: "11px", padding: "2px 8px", fontWeight: "700" }}>{unread} new</span>}
                <span className="tag tag-green">Active</span>
              </div>
            );
          })}
          {clients.length === 0 && <p style={{ color: "var(--text2)", fontSize: "14px" }}>No clients yet.</p>}
        </div>
        <div>
          <h2 style={{ fontSize: "17px", fontWeight: "700", marginBottom: "14px" }}>Recent feedback</h2>
          {recentFeedback.slice(0, 5).map((f, i) => (
            <div key={i} className="card" style={{ marginBottom: "8px", padding: "12px 16px", cursor: "pointer" }} onClick={() => openMsg(f.clientObj)}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                <p style={{ fontWeight: "600", fontSize: "13px" }}>{f.client}</p>
                <span style={{ fontFamily: "Syne, sans-serif", fontWeight: "700", fontSize: "15px", color: ratingColor(f.rating) }}>{f.rating}/10</span>
              </div>
              <p style={{ fontSize: "12px", color: "var(--text3)" }}>{f.prog} · Week {f.week}</p>
              {f.note !== "" && <p style={{ fontSize: "12px", color: "var(--text2)", marginTop: "5px", fontStyle: "italic" }}>"{f.note}"</p>}
            </div>
          ))}
          {recentFeedback.length === 0 && <p style={{ color: "var(--text2)", fontSize: "13px" }}>No feedback yet — it appears here after clients log workouts.</p>}
        </div>
      </div>
    </div>
  );
}

// ─── Coach Messages ──────────────────────────────────────────────────────────
function CoachMessages({ store, setStore, initialClient, markRead }) {
  const [selectedClient, setSelectedClient] = useState(initialClient || (store.clients[0] || null));
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  const thread = selectedClient ? ((store.messages || {})[selectedClient.id] || []) : [];

  useEffect(() => {
    if (selectedClient) markRead(selectedClient.id);
  }, [selectedClient]);

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [thread.length]);

  const send = () => {
    if (text.trim() === "" || !selectedClient) return;
    const msg = { id: uid(), from: "coach", text: text.trim(), ts: new Date().toISOString(), readByClient: false };
    const existing = (store.messages || {})[selectedClient.id] || [];
    const newStore = { ...store, messages: { ...(store.messages || {}), [selectedClient.id]: [...existing, msg] } };
    setStore(newStore); saveStore(newStore);
    setText("");
  };

  const unreadFor = (c) => ((store.messages || {})[c.id] || []).filter((m) => m.from === "client" && !m.readByCoach).length;

  const fmtTime = (ts) => { try { return new Date(ts).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }); } catch(e) { return ""; } };

  return (
    <div>
      <h1 style={{ fontSize: "26px", fontWeight: "800", marginBottom: "24px" }}>Messages</h1>
      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "16px", height: "calc(100vh - 160px)", minHeight: "400px" }}>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow)", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)" }}>
            <p style={{ fontSize: "12px", fontWeight: "600", color: "var(--text2)" }}>CLIENTS</p>
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {store.clients.map((c) => {
              const n = unreadFor(c);
              const last = ((store.messages || {})[c.id] || []).slice(-1)[0];
              const isSelected = selectedClient && selectedClient.id === c.id;
              return (
                <div key={c.id} onClick={() => { setSelectedClient(c); markRead(c.id); }}
                  style={{ padding: "12px 16px", cursor: "pointer", background: isSelected ? "var(--accent-dim)" : "transparent", borderBottom: "1px solid var(--border)", transition: "background 0.12s" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div className="avatar" style={{ width: "30px", height: "30px", fontSize: "11px" }}>{initials(c.name)}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: "600", fontSize: "13px", color: isSelected ? "var(--accent-dark)" : "var(--text)" }}>{c.name}</p>
                      {last && <p style={{ fontSize: "11px", color: "var(--text3)", marginTop: "1px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{last.text.slice(0, 28)}{last.text.length > 28 ? "…" : ""}</p>}
                    </div>
                    {n > 0 && <span style={{ background: "var(--danger)", color: "#fff", borderRadius: "10px", fontSize: "10px", padding: "1px 6px", fontWeight: "700", flexShrink: 0 }}>{n}</span>}
                  </div>
                </div>
              );
            })}
            {store.clients.length === 0 && <p style={{ padding: "16px", fontSize: "13px", color: "var(--text3)" }}>No clients yet.</p>}
          </div>
        </div>

        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", display: "flex", flexDirection: "column", boxShadow: "var(--shadow)", overflow: "hidden" }}>
          {selectedClient ? (
            <>
              <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "10px" }}>
                <div className="avatar">{initials(selectedClient.name)}</div>
                <div>
                  <p style={{ fontWeight: "600", fontSize: "15px" }}>{selectedClient.name}</p>
                  <p style={{ fontSize: "12px", color: "var(--text3)" }}>{selectedClient.email}</p>
                </div>
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {thread.length === 0 && <div style={{ textAlign: "center", color: "var(--text3)", fontSize: "13px", marginTop: "40px" }}>No messages yet. Say hello! 👋</div>}
                {thread.map((m) => (
                  <div key={m.id} style={{ display: "flex", flexDirection: m.from === "coach" ? "row-reverse" : "row", gap: "8px", alignItems: "flex-end" }}>
                    <div className={m.from === "coach" ? "msg-bubble-coach" : "msg-bubble-client"}>
                      <p style={{ lineHeight: "1.5" }}>{m.text}</p>
                      <p style={{ fontSize: "10px", color: "var(--text3)", marginTop: "4px", textAlign: m.from === "coach" ? "right" : "left" }}>{fmtTime(m.ts)}</p>
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>
              <div style={{ padding: "14px 16px", borderTop: "1px solid var(--border)", display: "flex", gap: "10px" }}>
                <input value={text} onChange={(e) => setText(e.target.value)} placeholder={"Message " + selectedClient.name + "..."} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} style={{ flex: 1 }} />
                <button className="btn-primary btn-sm" onClick={send} style={{ flexShrink: 0, padding: "9px 18px" }}>Send</button>
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text3)", fontSize: "14px" }}>Select a client to start messaging</div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Clients List ─────────────────────────────────────────────────────────────
function ClientsList({ store, setStore, openClient, openMsg }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", goal: "" });

  const addClient = () => {
    if (!form.name || !form.email || !form.password) return;
    const c = { id: uid(), name: form.name, email: form.email, password: form.password, goal: form.goal, joinDate: new Date().toISOString().slice(0, 10) };
    const updated = { ...store, clients: [...store.clients, c] };
    setStore(updated); saveStore(updated);
    setShowAdd(false); setForm({ name: "", email: "", password: "", goal: "" });
  };

  const del = (id, e) => {
    e.stopPropagation();
    if (window.confirm("Remove this client and all their data?")) {
      const updated = { ...store, clients: store.clients.filter((c) => c.id !== id), programs: store.programs.filter((p) => p.clientId !== id) };
      setStore(updated); saveStore(updated);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "800" }}>Clients</h1>
        <button className="btn-primary" onClick={() => setShowAdd(true)}>+ Add client</button>
      </div>
      {store.clients.map((c) => {
        const progs = store.programs.filter((p) => p.clientId === c.id);
        const unread = ((store.messages || {})[c.id] || []).filter((m) => m.from === "client" && !m.readByCoach).length;
        return (
          <div key={c.id} className="client-row" onClick={() => openClient(c)}>
            <div className="avatar">{initials(c.name)}</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: "600" }}>{c.name}</p>
              <p style={{ fontSize: "13px", color: "var(--text2)", marginTop: "3px" }}>{c.email}</p>
              {c.goal && <p style={{ fontSize: "11px", color: "var(--text3)", marginTop: "2px" }}>Goal: {c.goal}</p>}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {unread > 0 && <span style={{ background: "var(--danger)", color: "#fff", borderRadius: "10px", fontSize: "11px", padding: "2px 8px", fontWeight: "700" }}>{unread} new</span>}
              <span className="chip">{progs.length} program{progs.length !== 1 ? "s" : ""}</span>
              <button className="btn-ghost btn-sm" onClick={(e) => { e.stopPropagation(); openMsg(c); }}>✉ Message</button>
              <button className="btn-danger btn-sm" onClick={(e) => del(c.id, e)}>Remove</button>
            </div>
          </div>
        );
      })}
      {store.clients.length === 0 && <div className="empty-state"><div className="empty-icon">👤</div><p>No clients yet.</p></div>}

      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "20px", fontWeight: "700", marginBottom: "20px" }}>Add new client</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div><label>Full name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Alex Johnson" /></div>
              <div><label>Email</label><input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" placeholder="alex@email.com" /></div>
              <div><label>Password (client login)</label><input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Set a password for them" /></div>
              <div><label>Goal / notes</label><input value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })} placeholder="e.g. Build strength" /></div>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "16px", justifyContent: "flex-end" }}>
              <button className="btn-ghost" onClick={() => setShowAdd(false)}>Cancel</button>
              <button className="btn-primary" onClick={addClient}>Add client</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Client Detail ────────────────────────────────────────────────────────────
function ClientDetail({ client, store, setStore, openProgram, setTab, openMsg }) {
  const programs = store.programs.filter((p) => p.clientId === client.id);
  const [showAddProg, setShowAddProg] = useState(false);
  const [progForm, setProgForm] = useState({ name: "", weeks: "4" });

  const createProgram = () => {
    if (!progForm.name) return;
    const np = { id: uid(), clientId: client.id, name: progForm.name, weeks: parseInt(progForm.weeks), currentWeek: 1, createdAt: new Date().toISOString().slice(0, 10), exercises: [] };
    const updated = { ...store, programs: [...store.programs, np] };
    setStore(updated); saveStore(updated);
    setShowAddProg(false); setProgForm({ name: "", weeks: "4" });
    openProgram(np);
  };

  const summaries = store.workoutSummaries || {};
  const clientFeedback = [];
  programs.forEach((prog) => {
    for (let w = 1; w <= prog.weeks; w++) {
      const s = summaries[prog.id + "_w" + w];
      if (s && s.rating) clientFeedback.push({ prog: prog.name, week: w, rating: s.rating, note: s.feedbackNote || "", volume: s.totalVolume || 0, duration: s.duration || 0, loggedAt: s.loggedAt || "" });
    }
  });
  clientFeedback.sort((a, b) => b.loggedAt > a.loggedAt ? 1 : -1);

  const advanceWeek = (prog) => {
    const nextWeek = Math.min((prog.currentWeek || 1) + 1, prog.weeks);
    const updated = { ...store, programs: store.programs.map((p) => p.id === prog.id ? { ...p, currentWeek: nextWeek } : p) };
    setStore(updated); saveStore(updated);
  };

  return (
    <div>
      <button className="btn-ghost btn-sm" style={{ marginBottom: "20px" }} onClick={() => setTab("clients")}>← Back to clients</button>
      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "28px" }}>
        <div className="avatar" style={{ width: "52px", height: "52px", fontSize: "20px" }}>{initials(client.name)}</div>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: "24px", fontWeight: "800" }}>{client.name}</h1>
          <p style={{ fontSize: "13px", color: "var(--text2)" }}>{client.email} · Joined {client.joinDate}</p>
          {client.goal && <span className="tag tag-green" style={{ marginTop: "6px", display: "inline-block" }}>{client.goal}</span>}
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button className="btn-ghost btn-sm" onClick={() => openMsg(client)}>✉ Message</button>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: "11px", color: "var(--text3)" }}>Client password</p>
            <p style={{ fontSize: "13px", fontFamily: "monospace", background: "var(--surface2)", padding: "4px 10px", borderRadius: "6px", marginTop: "4px", border: "1px solid var(--border)" }}>{client.password}</p>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <h2 style={{ fontSize: "17px", fontWeight: "700" }}>Programs</h2>
            <button className="btn-primary btn-sm" onClick={() => setShowAddProg(true)}>+ New program</button>
          </div>
          {programs.map((p) => (
            <div key={p.id} className="card" style={{ marginBottom: "10px", cursor: "pointer" }} onClick={() => openProgram(p)}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "8px" }}>
                <div>
                  <p style={{ fontWeight: "700", fontSize: "15px" }}>{p.name}</p>
                  <p style={{ fontSize: "12px", color: "var(--text2)", marginTop: "3px" }}>{p.exercises.length} exercises · {p.weeks} weeks</p>
                </div>
                <span className="tag tag-blue">Week {p.currentWeek || 1}/{p.weeks}</span>
              </div>
              <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                <button className="btn-ghost btn-sm" style={{ flex: 1 }} onClick={(e) => { e.stopPropagation(); openProgram(p); }}>Edit program</button>
                {(p.currentWeek || 1) < p.weeks && (
                  <button className="btn-primary btn-sm" onClick={(e) => { e.stopPropagation(); advanceWeek(p); }}>Advance to W{(p.currentWeek || 1) + 1}</button>
                )}
                {(p.currentWeek || 1) >= p.weeks && <span className="tag tag-green" style={{ padding: "6px 12px" }}>Program complete ✓</span>}
              </div>
            </div>
          ))}
          {programs.length === 0 && (
            <div style={{ textAlign: "center", padding: "32px 16px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow)" }}>
              <div style={{ fontSize: "32px", marginBottom: "10px" }}>📋</div>
              <p style={{ color: "var(--text2)", fontSize: "14px", marginBottom: "14px" }}>No programs yet for this client.</p>
              <button className="btn-primary" onClick={() => setShowAddProg(true)}>+ Create first program</button>
            </div>
          )}
        </div>

        <div>
          <h2 style={{ fontSize: "17px", fontWeight: "700", marginBottom: "14px" }}>Workout feedback</h2>
          {clientFeedback.slice(0, 6).map((f, i) => (
            <div key={i} className="card" style={{ marginBottom: "8px", padding: "12px 16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                <p style={{ fontSize: "13px", fontWeight: "600" }}>{f.prog} · W{f.week}</p>
                <span style={{ fontFamily: "Syne, sans-serif", fontWeight: "700", fontSize: "16px", color: ratingColor(f.rating) }}>{f.rating}/10</span>
              </div>
              <div style={{ display: "flex", gap: "10px", fontSize: "12px", color: "var(--text3)", marginBottom: f.note ? "6px" : "0" }}>
                {f.duration > 0 && <span>⏱ {formatDuration(f.duration)}</span>}
                {f.volume > 0 && <span>📊 {f.volume.toLocaleString()} lbs</span>}
              </div>
              {f.note && <p style={{ fontSize: "12px", color: "var(--text2)", fontStyle: "italic" }}>"{f.note}"</p>}
            </div>
          ))}
          {clientFeedback.length === 0 && <p style={{ color: "var(--text2)", fontSize: "13px" }}>No feedback logged yet.</p>}
        </div>
      </div>

      {showAddProg && (
        <div className="modal-overlay" onClick={() => setShowAddProg(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "20px", fontWeight: "700", marginBottom: "20px" }}>New program for {client.name}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div><label>Program name</label><input value={progForm.name} onChange={(e) => setProgForm({ ...progForm, name: e.target.value })} placeholder="e.g. Strength Block 1" /></div>
              <div><label>Number of weeks</label><input type="number" min="1" max="52" value={progForm.weeks} onChange={(e) => setProgForm({ ...progForm, weeks: e.target.value })} /></div>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "16px", justifyContent: "flex-end" }}>
              <button className="btn-ghost" onClick={() => setShowAddProg(false)}>Cancel</button>
              <button className="btn-primary" onClick={createProgram}>Create and build →</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Programs List ────────────────────────────────────────────────────────────
function ProgramsList({ store, setStore, openProgram }) {
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ clientId: "", name: "", weeks: "4" });

  const create = () => {
    if (!form.clientId || !form.name) return;
    const np = { id: uid(), clientId: form.clientId, name: form.name, weeks: parseInt(form.weeks), currentWeek: 1, createdAt: new Date().toISOString().slice(0, 10), exercises: [] };
    const updated = { ...store, programs: [...store.programs, np] };
    setStore(updated); saveStore(updated);
    setShowCreate(false); setForm({ clientId: "", name: "", weeks: "4" });
    openProgram(np);
  };

  const del = (id, e) => {
    e.stopPropagation();
    if (window.confirm("Delete this program?")) {
      const updated = { ...store, programs: store.programs.filter((p) => p.id !== id) };
      setStore(updated); saveStore(updated);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "800" }}>All programs</h1>
        <button className="btn-primary" onClick={() => setShowCreate(true)}>+ New program</button>
      </div>

      {store.programs.map((p) => {
        const client = store.clients.find((c) => c.id === p.clientId);
        return (
          <div key={p.id} className="client-row" onClick={() => openProgram(p)}>
            <div style={{ width: "40px", height: "40px", background: "var(--info-dim)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>📋</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: "600" }}>{p.name}</p>
              <p style={{ fontSize: "13px", color: "var(--text2)", marginTop: "3px" }}>{client ? client.name : "Unknown"} · {p.exercises.length} exercises · Week {p.currentWeek || 1}/{p.weeks}</p>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <span className="chip">{p.createdAt}</span>
              <button className="btn-danger btn-sm" onClick={(e) => del(p.id, e)}>Delete</button>
            </div>
          </div>
        );
      })}
      {store.programs.length === 0 && <div className="empty-state"><div className="empty-icon">📋</div><p>No programs yet. Create one above!</p></div>}

      {showCreate && (
        <div className="modal-overlay" onClick={() => setShowCreate(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "20px", fontWeight: "700", marginBottom: "20px" }}>New program</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <label>Client</label>
                <select value={form.clientId} onChange={(e) => setForm({ ...form, clientId: e.target.value })}>
                  <option value="">Select a client...</option>
                  {store.clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div><label>Program name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Strength Block 1" /></div>
              <div><label>Number of weeks</label><input type="number" min="1" max="52" value={form.weeks} onChange={(e) => setForm({ ...form, weeks: e.target.value })} /></div>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "16px", justifyContent: "flex-end" }}>
              <button className="btn-ghost" onClick={() => setShowCreate(false)}>Cancel</button>
              <button className="btn-primary" onClick={create}>Create and build exercises →</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Program Editor ───────────────────────────────────────────────────────────
function ProgramEditor({ program, store, setStore, setTab, setSelectedProgram }) {
  const client = store.clients.find((c) => c.id === program.clientId);
  const [prog, setProg] = useState(program);
  const [showAddEx, setShowAddEx] = useState(false);
  const [showVideo, setShowVideo] = useState(null);
  const [showLibPicker, setShowLibPicker] = useState(false);
  const [exForm, setExForm] = useState({ name: "", type: "weight", sets: "3", reps: "8", videoUrl: "", notes: "" });

  const save = (updated) => {
    const newProgs = store.programs.map((p) => p.id === updated.id ? updated : p);
    const newStore = { ...store, programs: newProgs };
    setStore(newStore); saveStore(newStore);
    setProg(updated); setSelectedProgram(updated);
  };

  const addEx = () => {
    if (!exForm.name) return;
    const ex = { id: uid(), name: exForm.name, type: exForm.type, sets: parseInt(exForm.sets), reps: exForm.reps, videoUrl: exForm.videoUrl, notes: exForm.notes };
    save({ ...prog, exercises: [...prog.exercises, ex] });
    setShowAddEx(false); setExForm({ name: "", type: "weight", sets: "3", reps: "8", videoUrl: "", notes: "" });
  };

  const addFromLib = (lib) => {
    const ex = { id: uid(), name: lib.name, type: "weight", sets: 3, reps: "8", videoUrl: lib.videoUrl, notes: lib.description };
    save({ ...prog, exercises: [...prog.exercises, ex] });
    setShowLibPicker(false);
  };

  const updateEx = (id, field, val) => {
    const exercises = prog.exercises.map((e) => {
      if (e.id !== id) return e;
      if (field === "sets") return { ...e, sets: parseInt(val) || 1 };
      return { ...e, [field]: val };
    });
    save({ ...prog, exercises });
  };

  const delEx = (id) => save({ ...prog, exercises: prog.exercises.filter((e) => e.id !== id) });

  return (
    <div>
      <button className="btn-ghost btn-sm" style={{ marginBottom: "20px" }} onClick={() => setTab("programs")}>← Back to programs</button>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "800" }}>{prog.name}</h1>
        <span className="tag tag-blue">{prog.weeks} weeks</span>
      </div>
      <p style={{ fontSize: "13px", color: "var(--text2)", marginBottom: "28px" }}>
        Client: {client ? client.name : "Unknown"} · {prog.exercises.length} exercises · Currently on Week {prog.currentWeek || 1}
      </p>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <h2 style={{ fontSize: "17px", fontWeight: "700" }}>Exercises</h2>
        <div style={{ display: "flex", gap: "8px" }}>
          <button className="btn-ghost btn-sm" onClick={() => setShowLibPicker(true)}>From library</button>
          <button className="btn-primary btn-sm" onClick={() => setShowAddEx(true)}>+ Add exercise</button>
        </div>
      </div>

      {prog.exercises.map((ex, idx) => (
        <div key={ex.id} className="exercise-row">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
              <span style={{ fontSize: "12px", color: "var(--text3)", fontFamily: "Syne, sans-serif", fontWeight: "700", background: "var(--surface2)", padding: "2px 8px", borderRadius: "6px", flexShrink: 0 }}>{"#" + (idx + 1)}</span>
              <input value={ex.name} onChange={(e) => updateEx(ex.id, "name", e.target.value)}
                style={{ fontWeight: "700", fontSize: "15px", background: "transparent", border: "none", padding: "0", boxShadow: "none", minWidth: "160px" }} />
              <span className={"tag " + (ex.type === "weight" ? "tag-green" : "tag-blue")}>{ex.type === "weight" ? "Weight" : "Time"}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {ex.videoUrl && <button className="btn-ghost btn-sm" onClick={() => setShowVideo(ex)}>▶ Preview</button>}
              <button className="btn-danger btn-sm" onClick={() => delEx(ex.id)}>✕ Remove</button>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 2fr", gap: "10px", marginBottom: "10px" }}>
            <div><label>Sets</label><input type="number" value={ex.sets} onChange={(e) => updateEx(ex.id, "sets", e.target.value)} /></div>
            <div><label>{ex.type === "weight" ? "Reps" : "Seconds"}</label><input value={ex.reps} onChange={(e) => updateEx(ex.id, "reps", e.target.value)} /></div>
            <div>
              <label>Type</label>
              <select value={ex.type} onChange={(e) => updateEx(ex.id, "type", e.target.value)}>
                <option value="weight">Weight</option>
                <option value="time">Time</option>
              </select>
            </div>
            <div><label>Video URL (YouTube / Vimeo)</label><input value={ex.videoUrl} onChange={(e) => updateEx(ex.id, "videoUrl", e.target.value)} placeholder="https://youtube.com/watch?v=..." /></div>
          </div>
          <div><label>Coaching notes</label><input value={ex.notes} onChange={(e) => updateEx(ex.id, "notes", e.target.value)} placeholder="Technique cues, tempo..." /></div>
        </div>
      ))}
      {prog.exercises.length === 0 && (
        <div style={{ textAlign: "center", padding: "48px 24px", background: "var(--surface)", border: "2px dashed var(--border2)", borderRadius: "var(--radius-lg)" }}>
          <div style={{ fontSize: "36px", marginBottom: "12px" }}>🏋️</div>
          <p style={{ color: "var(--text2)", marginBottom: "16px" }}>No exercises yet. Add from your library or create a new one.</p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <button className="btn-ghost" onClick={() => setShowLibPicker(true)}>From library</button>
            <button className="btn-primary" onClick={() => setShowAddEx(true)}>+ Add exercise</button>
          </div>
        </div>
      )}

      {showLibPicker && (
        <div className="modal-overlay" onClick={() => setShowLibPicker(false)}>
          <div className="modal modal-lg" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "20px", fontWeight: "700" }}>Add from library</h2>
              <button className="btn-ghost btn-sm" onClick={() => setShowLibPicker(false)}>✕ Close</button>
            </div>
            {(store.exerciseLibrary || []).length === 0 && <p style={{ color: "var(--text2)" }}>Library is empty. Add exercises in the Exercise Library tab first.</p>}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {(store.exerciseLibrary || []).map((ex) => (
                <div key={ex.id} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", background: "var(--surface2)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: "600", fontSize: "14px" }}>{ex.name}</p>
                    {ex.description && <p style={{ fontSize: "12px", color: "var(--text2)", marginTop: "2px" }}>{ex.description.slice(0, 80)}{ex.description.length > 80 ? "..." : ""}</p>}
                  </div>
                  <span className="tag tag-blue">{ex.category}</span>
                  <button className="btn-primary btn-sm" onClick={() => addFromLib(ex)}>+ Add</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showAddEx && (
        <div className="modal-overlay" onClick={() => setShowAddEx(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "20px", fontWeight: "700", marginBottom: "20px" }}>Add exercise</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div><label>Exercise name</label><input value={exForm.name} onChange={(e) => setExForm({ ...exForm, name: e.target.value })} placeholder="e.g. Back Squat" /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div><label>Sets</label><input type="number" value={exForm.sets} onChange={(e) => setExForm({ ...exForm, sets: e.target.value })} /></div>
                <div><label>Type</label>
                  <select value={exForm.type} onChange={(e) => setExForm({ ...exForm, type: e.target.value })}>
                    <option value="weight">Weight (reps)</option>
                    <option value="time">Time (seconds)</option>
                  </select>
                </div>
              </div>
              <div><label>{exForm.type === "weight" ? "Reps" : "Seconds"}</label><input value={exForm.reps} onChange={(e) => setExForm({ ...exForm, reps: e.target.value })} placeholder={exForm.type === "weight" ? "e.g. 8" : "e.g. 30"} /></div>
              <div><label>Video URL</label><input value={exForm.videoUrl} onChange={(e) => setExForm({ ...exForm, videoUrl: e.target.value })} placeholder="https://youtube.com/watch?v=..." /></div>
              <div><label>Coaching notes</label><textarea value={exForm.notes} onChange={(e) => setExForm({ ...exForm, notes: e.target.value })} placeholder="Technique cues..." rows={2} style={{ resize: "vertical" }} /></div>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "16px", justifyContent: "flex-end" }}>
              <button className="btn-ghost" onClick={() => setShowAddEx(false)}>Cancel</button>
              <button className="btn-primary" onClick={addEx}>Add exercise</button>
            </div>
          </div>
        </div>
      )}

      {showVideo && (
        <div className="modal-overlay" onClick={() => setShowVideo(null)}>
          <div className="modal modal-lg" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "18px", fontWeight: "700" }}>{showVideo.name}</h2>
              <button className="btn-ghost btn-sm" onClick={() => setShowVideo(null)}>✕ Close</button>
            </div>
            <iframe src={getYtEmbed(showVideo.videoUrl)} className="video-embed" allowFullScreen title={showVideo.name} />
            {showVideo.notes && <p style={{ fontSize: "13px", color: "var(--text2)", marginTop: "12px" }}>📝 {showVideo.notes}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Exercise Library ─────────────────────────────────────────────────────────
function ExerciseLibrary({ store, setStore }) {
  const lib = store.exerciseLibrary || [];
  const [showAdd, setShowAdd] = useState(false);
  const [showVideo, setShowVideo] = useState(null);
  const [filterCat, setFilterCat] = useState("All");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", category: "Legs", description: "", videoUrl: "" });

  const filtered = lib.filter((e) => {
    const mc = filterCat === "All" || e.category === filterCat;
    const ms = e.name.toLowerCase().includes(search.toLowerCase()) || e.description.toLowerCase().includes(search.toLowerCase());
    return mc && ms;
  });

  const add = () => {
    if (!form.name) return;
    const ex = { id: uid(), ...form };
    const updated = { ...store, exerciseLibrary: [...lib, ex] };
    setStore(updated); saveStore(updated);
    setShowAdd(false); setForm({ name: "", category: "Legs", description: "", videoUrl: "" });
  };

  const del = (id) => {
    if (window.confirm("Remove from library?")) {
      const updated = { ...store, exerciseLibrary: lib.filter((e) => e.id !== id) };
      setStore(updated); saveStore(updated);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <div>
          <h1 style={{ fontSize: "26px", fontWeight: "800" }}>Exercise Library</h1>
          <p style={{ color: "var(--text2)", fontSize: "14px", marginTop: "2px" }}>{lib.length} exercises</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAdd(true)}>+ Add exercise</button>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap", alignItems: "center" }}>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." style={{ maxWidth: "220px" }} />
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setFilterCat(c)}
              style={{ padding: "5px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "600",
                background: filterCat === c ? "var(--accent)" : "var(--surface)",
                color: filterCat === c ? "#fff" : "var(--text2)",
                border: filterCat === c ? "none" : "1px solid var(--border2)",
                boxShadow: filterCat === c ? "0 2px 6px rgba(77,184,42,0.25)" : "var(--shadow)" }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 && <div className="empty-state"><div className="empty-icon">◈</div><p>No exercises found.</p></div>}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        {filtered.map((ex) => (
          <div key={ex.id} className="lib-card">
            <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "6px" }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: "700", fontSize: "15px" }}>{ex.name}</p>
                <span className="tag tag-blue" style={{ marginTop: "4px" }}>{ex.category}</span>
              </div>
            </div>
            {ex.description && <p style={{ fontSize: "13px", color: "var(--text2)", lineHeight: "1.5", marginTop: "6px" }}>{ex.description}</p>}
            <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
              {ex.videoUrl ? <button className="btn-ghost btn-sm" onClick={() => setShowVideo(ex)} style={{ fontSize: "12px" }}>▶ Watch demo</button> : <span style={{ fontSize: "12px", color: "var(--text3)" }}>No video</span>}
              <div style={{ flex: 1 }} />
              <button className="btn-danger btn-sm" onClick={() => del(ex.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "20px", fontWeight: "700", marginBottom: "20px" }}>Add to library</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div><label>Exercise name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Bulgarian Split Squat" /></div>
              <div><label>Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.filter((c) => c !== "All").map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div><label>Description / coaching notes</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Technique cues, common mistakes..." rows={3} style={{ resize: "vertical" }} /></div>
              <div><label>Video URL</label><input value={form.videoUrl} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })} placeholder="https://youtube.com/watch?v=..." /></div>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "20px", justifyContent: "flex-end" }}>
              <button className="btn-ghost" onClick={() => setShowAdd(false)}>Cancel</button>
              <button className="btn-primary" onClick={add}>Add to library</button>
            </div>
          </div>
        </div>
      )}

      {showVideo && (
        <div className="modal-overlay" onClick={() => setShowVideo(null)}>
          <div className="modal modal-lg" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "18px", fontWeight: "700" }}>{showVideo.name}</h2>
              <button className="btn-ghost btn-sm" onClick={() => setShowVideo(null)}>✕ Close</button>
            </div>
            <iframe src={getYtEmbed(showVideo.videoUrl)} className="video-embed" allowFullScreen title={showVideo.name} />
            {showVideo.description && <p style={{ fontSize: "13px", color: "var(--text2)", marginTop: "12px", lineHeight: "1.6" }}>{showVideo.description}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Settings ─────────────────────────────────────────────────────────────────
function Settings({ store, setStore }) {
  const [name, setName] = useState(store.coach.name);
  const [pass, setPass] = useState(store.coach.password);
  const [saved, setSaved] = useState(false);

  const save = () => {
    const updated = { ...store, coach: { name, password: pass } };
    setStore(updated); saveStore(updated);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ maxWidth: "480px" }}>
      <h1 style={{ fontSize: "26px", fontWeight: "800", marginBottom: "28px" }}>Settings</h1>
      <div className="card" style={{ marginBottom: "16px" }}>
        <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: "700", marginBottom: "16px" }}>Coach account</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div><label>Display name</label><input value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div><label>Coach password</label><input value={pass} onChange={(e) => setPass(e.target.value)} /></div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "16px" }}>
          <button className="btn-primary" onClick={save}>Save changes</button>
          {saved && <span style={{ fontSize: "13px", color: "var(--accent-dark)", fontWeight: "600" }}>✓ Saved!</span>}
        </div>
      </div>
      <div className="card">
        <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: "700", marginBottom: "8px" }}>Danger zone</h2>
        <p style={{ fontSize: "13px", color: "var(--text2)", marginBottom: "14px" }}>Permanently delete all data.</p>
        <button className="btn-danger" onClick={() => { if (window.confirm("Reset ALL data?")) { localStorage.removeItem(STORE_KEY); window.location.reload(); } }}>Reset all data</button>
      </div>
    </div>
  );
}

// ─── Client App Shell ─────────────────────────────────────────────────────────
function ClientApp({ store, setStore, clientId }) {
  const client = store.clients.find((c) => c.id === clientId);
  const programs = store.programs.filter((p) => p.clientId === clientId);
  const [clientTab, setClientTab] = useState("home");
  const [activeProg, setActiveProg] = useState(programs[0] || null);
  const [workoutStartTime] = useState(Date.now());

  if (!client) return <p style={{ padding: "40px", color: "var(--danger)" }}>Client not found.</p>;

  const unreadFromCoach = ((store.messages || {})[clientId] || []).filter((m) => m.from === "coach" && !m.readByClient).length;

  const markClientRead = () => {
    const thread = (store.messages || {})[clientId] || [];
    const updated = thread.map((m) => m.from === "coach" ? { ...m, readByClient: true } : m);
    const newStore = { ...store, messages: { ...(store.messages || {}), [clientId]: updated } };
    setStore(newStore); saveStore(newStore);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", padding: "13px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "var(--shadow)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "30px", height: "30px", background: "var(--accent)", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px" }}>⚡</div>
          <span style={{ fontFamily: "Syne, sans-serif", fontWeight: "800", fontSize: "17px" }}>CoachOS</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div className="avatar" style={{ width: "32px", height: "32px", fontSize: "12px" }}>{initials(client.name)}</div>
          <span style={{ fontSize: "14px", fontWeight: "600" }}>{client.name}</span>
        </div>
      </div>

      <div style={{ display: "flex", background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
        {[
          { id: "home", icon: "▦", label: "Home" },
          { id: "workout", icon: "🏋️", label: "Workout" },
          { id: "history", icon: "📈", label: "Progress" },
          { id: "messages", icon: "✉", label: "Messages", badge: unreadFromCoach },
        ].map((t) => (
          <button key={t.id} className={"client-nav-tab" + (clientTab === t.id ? " active" : "")}
            onClick={() => { setClientTab(t.id); if (t.id === "messages") markClientRead(); }}>
            <span>{t.icon}</span>
            {t.label}
            {t.badge > 0 && <span style={{ background: "var(--danger)", color: "#fff", borderRadius: "10px", fontSize: "10px", padding: "1px 6px", fontWeight: "700" }}>{t.badge}</span>}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, padding: "20px", maxWidth: "680px", margin: "0 auto", width: "100%" }}>
        {clientTab === "home" && <ClientHome client={client} store={store} programs={programs} clientId={clientId} setClientTab={setClientTab} setActiveProg={setActiveProg} />}
        {clientTab === "workout" && <ClientWorkout client={client} store={store} setStore={setStore} programs={programs} activeProg={activeProg} setActiveProg={setActiveProg} workoutStartTime={workoutStartTime} />}
        {clientTab === "history" && <ClientHistory store={store} programs={programs} clientId={clientId} />}
        {clientTab === "messages" && <ClientMessaging store={store} setStore={setStore} clientId={clientId} />}
      </div>
    </div>
  );
}

// ─── Client Home ──────────────────────────────────────────────────────────────
function ClientHome({ client, store, programs, clientId, setClientTab, setActiveProg }) {
  const summaries = store.workoutSummaries || {};

  // total volume across all workouts
  let totalVolume = 0;
  let totalWorkouts = 0;
  programs.forEach((prog) => {
    for (let w = 1; w <= prog.weeks; w++) {
      const s = summaries[prog.id + "_w" + w];
      if (s) { totalWorkouts++; if (s.totalVolume) totalVolume += s.totalVolume; }
    }
  });

  // estimate 1RMs from all logged data
  const oneRMs = {};
  programs.forEach((prog) => {
    for (let w = 1; w <= prog.weeks; w++) {
      const log = (store.logs || {})[prog.id + "_w" + w] || {};
      prog.exercises.forEach((ex) => {
        if (ex.type !== "weight" || !isBigLift(ex.name)) return;
        const exLog = log[ex.id];
        if (!exLog || !exLog.sets) return;
        exLog.sets.forEach((s) => {
          if (!s.done || !s.weight || !s.reps) return;
          const est = epley1RM(parseFloat(s.weight), parseFloat(s.reps));
          if (est && (!oneRMs[ex.name] || est > oneRMs[ex.name])) oneRMs[ex.name] = est;
        });
      });
    }
  });

  // active program and current week
  const activeProg = programs[0] || null;
  const currentWeek = activeProg ? (activeProg.currentWeek || 1) : 1;
  const weekKey = activeProg ? activeProg.id + "_w" + currentWeek : null;
  const weekSummary = weekKey ? summaries[weekKey] : null;
  const alreadyLoggedThisWeek = !!weekSummary;

  // unread messages from coach
  const unread = ((store.messages || {})[clientId] || []).filter((m) => m.from === "coach" && !m.readByClient).length;

  return (
    <div>
      <h1 style={{ fontSize: "26px", fontWeight: "800", marginBottom: "4px" }}>Hey, {client.name.split(" ")[0]}! 👋</h1>
      <p style={{ color: "var(--text2)", fontSize: "14px", marginBottom: "24px" }}>Here's your overview</p>

      {unread > 0 && (
        <div onClick={() => {}} style={{ background: "var(--info-dim)", border: "1px solid rgba(26,110,217,0.2)", borderRadius: "var(--radius-lg)", padding: "14px 18px", marginBottom: "20px", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px" }}
          onClick={() => {}}>
          <span style={{ fontSize: "20px" }}>✉</span>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: "600", fontSize: "14px", color: "var(--info)" }}>{unread} new message{unread > 1 ? "s" : ""} from your coach</p>
            <p style={{ fontSize: "12px", color: "var(--text2)", marginTop: "2px" }}>Tap Messages to view</p>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "24px" }}>
        <div className="stat-card">
          <div className="stat-num">{totalWorkouts}</div>
          <div className="stat-label">Workouts logged</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{totalVolume > 0 ? Math.round(totalVolume / 1000) + "k" : "0"}</div>
          <div className="stat-label">Total lbs lifted</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{programs.length}</div>
          <div className="stat-label">Programs</div>
        </div>
      </div>

      {activeProg && (
        <div className="card" style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <div>
              <p style={{ fontSize: "12px", color: "var(--text3)", fontWeight: "600", marginBottom: "2px" }}>CURRENT PROGRAM</p>
              <h2 style={{ fontSize: "18px", fontWeight: "700" }}>{activeProg.name}</h2>
            </div>
            <span className="tag tag-blue">Week {currentWeek}/{activeProg.weeks}</span>
          </div>
          <div className="prog-bar" style={{ marginBottom: "16px" }}>
            <div className="prog-fill" style={{ width: Math.round((currentWeek / activeProg.weeks) * 100) + "%" }} />
          </div>
          {alreadyLoggedThisWeek ? (
            <div style={{ background: "var(--success-dim)", border: "1px solid rgba(26,158,82,0.2)", borderRadius: "var(--radius)", padding: "12px 16px", display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "20px" }}>✅</span>
              <div>
                <p style={{ fontWeight: "600", fontSize: "14px", color: "var(--success)" }}>Week {currentWeek} complete!</p>
                <p style={{ fontSize: "12px", color: "var(--text2)", marginTop: "2px" }}>Great work. Your coach will advance you to the next week.</p>
              </div>
            </div>
          ) : (
            <button className="btn-log" onClick={() => { setActiveProg(activeProg); setClientTab("workout"); }}>
              Begin Week {currentWeek} Workout →
            </button>
          )}
        </div>
      )}

      {Object.keys(oneRMs).length > 0 && (
        <div>
          <h2 style={{ fontSize: "17px", fontWeight: "700", marginBottom: "12px" }}>Estimated 1RMs</h2>
          <p style={{ fontSize: "12px", color: "var(--text3)", marginBottom: "12px" }}>Calculated using the Epley formula from your best logged sets</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "10px" }}>
            {Object.entries(oneRMs).map(([name, rm]) => (
              <div key={name} className="rm-card">
                <p style={{ fontSize: "12px", color: "var(--text2)", fontWeight: "600", marginBottom: "4px" }}>{name}</p>
                <p style={{ fontSize: "24px", fontWeight: "800", fontFamily: "Syne, sans-serif", color: "var(--accent-dark)" }}>{rm}</p>
                <p style={{ fontSize: "11px", color: "var(--text3)" }}>lbs estimated</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {programs.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">⏳</div>
          <p>No program assigned yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}

// ─── Client Workout ───────────────────────────────────────────────────────────
function ClientWorkout({ client, store, setStore, programs, activeProg, setActiveProg, workoutStartTime }) {
  const [showLogModal, setShowLogModal] = useState(false);
  const [showVideo, setShowVideo] = useState(null);

  const prog = activeProg || (programs[0] || null);
  const week = prog ? (prog.currentWeek || 1) : 1;

  const logKey = prog ? prog.id + "_w" + week : null;
  const getLog = () => logKey ? ((store.logs || {})[logKey] || {}) : {};

  const updateLog = (exId, setIdx, field, val) => {
    if (!prog) return;
    const existing = (store.logs || {})[logKey] || {};
    const exLog = existing[exId] || {};
    const sets = exLog.sets ? [...exLog.sets] : [];
    while (sets.length <= setIdx) sets.push({ reps: "", weight: "", time: "", done: false });
    sets[setIdx] = { ...sets[setIdx], [field]: val };
    const newLogs = { ...(store.logs || {}), [logKey]: { ...existing, [exId]: { ...exLog, sets } } };
    const updated = { ...store, logs: newLogs };
    setStore(updated); saveStore(updated);
  };

  if (!prog) return <div className="empty-state"><div className="empty-icon">📋</div><p>No program assigned yet.</p></div>;

  const currentLog = getLog();
  let completedSets = 0, totalSets = 0, totalVolume = 0;
  prog.exercises.forEach((ex) => {
    totalSets += ex.sets;
    const exLog = currentLog[ex.id];
    if (exLog && exLog.sets) {
      exLog.sets.forEach((s) => {
        if (s.done) {
          completedSets++;
          if (ex.type === "weight") totalVolume += (parseFloat(s.reps) || 0) * (parseFloat(s.weight) || 0);
        }
      });
    }
  });
  const pct = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;
  const elapsedSeconds = Math.round((Date.now() - workoutStartTime) / 1000);
  const alreadyLogged = !!(store.workoutSummaries || {})[logKey];

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "20px", fontWeight: "800" }}>{prog.name} · W{week}</h2>
          <span className="tag tag-green">{pct}%</span>
        </div>
        <div className="prog-bar"><div className="prog-fill" style={{ width: pct + "%" }} /></div>
        <p style={{ fontSize: "12px", color: "var(--text3)", marginTop: "4px" }}>{completedSets}/{totalSets} sets done</p>
      </div>

      {alreadyLogged && (
        <div style={{ background: "var(--warning-dim)", border: "1px solid rgba(217,125,26,0.2)", borderRadius: "var(--radius)", padding: "10px 14px", marginBottom: "16px", fontSize: "13px", color: "var(--warning)" }}>
          ⚠ You already logged this week. You can still update your sets and re-log if needed.
        </div>
      )}

      {prog.exercises.map((ex) => {
        const exLog = currentLog[ex.id] || {};
        const sets = exLog.sets || Array.from({ length: ex.sets }, () => ({ reps: "", weight: "", time: "", done: false }));
        let doneSets = 0;
        sets.forEach((s) => { if (s.done) doneSets++; });

        return (
          <div key={ex.id} className="exercise-row" style={{ marginBottom: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
              <div>
                <p style={{ fontWeight: "700", fontSize: "16px" }}>{ex.name}</p>
                <p style={{ fontSize: "12px", color: "var(--text2)", marginTop: "2px" }}>{ex.sets} sets · {ex.type === "weight" ? ex.reps + " reps" : ex.reps + "s"}</p>
                {ex.notes && <p style={{ fontSize: "12px", color: "var(--text3)", marginTop: "2px" }}>💬 {ex.notes}</p>}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "12px", color: "var(--text2)", fontWeight: "600" }}>{doneSets}/{ex.sets}</span>
                {ex.videoUrl && <button className="btn-ghost btn-sm" onClick={() => setShowVideo(ex)} style={{ fontSize: "12px" }}>▶ Demo</button>}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "28px 1fr 1fr 44px", gap: "6px", marginBottom: "6px" }}>
              <div style={{ fontSize: "11px", color: "var(--text3)", textAlign: "center" }}>#</div>
              <div style={{ fontSize: "11px", color: "var(--text3)", textAlign: "center" }}>{ex.type === "weight" ? "Reps" : "Seconds"}</div>
              {ex.type === "weight" ? <div style={{ fontSize: "11px", color: "var(--text3)", textAlign: "center" }}>Weight (lbs)</div> : <div />}
              <div style={{ fontSize: "11px", color: "var(--text3)", textAlign: "center" }}>Done</div>
            </div>

            {Array.from({ length: ex.sets }, (_, si) => {
              const s = sets[si] || { reps: "", weight: "", time: "", done: false };
              return (
                <div key={si} style={{ display: "grid", gridTemplateColumns: "28px 1fr 1fr 44px", gap: "6px", marginBottom: "6px", alignItems: "center" }}>
                  <div style={{ fontSize: "12px", color: "var(--text3)", fontWeight: "600", textAlign: "center" }}>{si + 1}</div>
                  {ex.type === "weight" ? (
                    <input type="number" className="set-input" value={s.reps || ""} placeholder={ex.reps} onChange={(e) => updateLog(ex.id, si, "reps", e.target.value)} />
                  ) : (
                    <input type="number" className="set-input" value={s.time || ""} placeholder={ex.reps} onChange={(e) => updateLog(ex.id, si, "time", e.target.value)} />
                  )}
                  {ex.type === "weight" ? (
                    <input type="number" className="set-input" value={s.weight || ""} placeholder="0" onChange={(e) => updateLog(ex.id, si, "weight", e.target.value)} />
                  ) : <div />}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <button onClick={() => updateLog(ex.id, si, "done", s.done ? false : true)}
                      style={{ width: "34px", height: "34px", borderRadius: "50%",
                        background: s.done ? "var(--accent)" : "var(--surface2)",
                        border: "1.5px solid " + (s.done ? "var(--accent)" : "var(--border2)"),
                        color: s.done ? "#fff" : "var(--text3)", fontSize: "16px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: s.done ? "0 2px 8px rgba(77,184,42,0.25)" : "none" }}>
                      {s.done ? "✓" : "○"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      <div style={{ marginTop: "24px", marginBottom: "32px" }}>
        <button className="btn-log" onClick={() => setShowLogModal(true)}>Log Workout ✓</button>
      </div>

      {showVideo && (
        <div className="modal-overlay" onClick={() => setShowVideo(null)}>
          <div className="modal modal-lg" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "18px", fontWeight: "700" }}>{showVideo.name}</h2>
              <button className="btn-ghost btn-sm" onClick={() => setShowVideo(null)}>✕ Close</button>
            </div>
            <iframe src={getYtEmbed(showVideo.videoUrl)} className="video-embed" allowFullScreen title={showVideo.name} />
            {showVideo.notes && <p style={{ fontSize: "13px", color: "var(--text2)", marginTop: "12px" }}>📝 {showVideo.notes}</p>}
          </div>
        </div>
      )}

      {showLogModal && (
        <LogWorkoutModal prog={prog} week={week} completedSets={completedSets} totalSets={totalSets}
          totalVolume={totalVolume} elapsedSeconds={elapsedSeconds}
          store={store} setStore={setStore} onClose={() => setShowLogModal(false)} />
      )}
    </div>
  );
}

// ─── Log Workout Modal ────────────────────────────────────────────────────────
function LogWorkoutModal({ prog, week, completedSets, totalSets, totalVolume, elapsedSeconds, store, setStore, onClose }) {
  const [rating, setRating] = useState(0);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    const key = prog.id + "_w" + week;
    const summary = { progId: prog.id, week, completedSets, totalSets, totalVolume: Math.round(totalVolume), duration: elapsedSeconds, rating: rating > 0 ? rating : null, feedbackNote: note, loggedAt: new Date().toISOString() };
    const updated = { ...store, workoutSummaries: { ...(store.workoutSummaries || {}), [key]: summary } };
    setStore(updated); saveStore(updated);
    setSubmitted(true);
  };

  const rl = (r) => { if (r <= 2) return "Easy"; if (r <= 4) return "Manageable"; if (r <= 6) return "Moderate"; if (r <= 8) return "Hard"; return "Max effort"; };

  if (submitted) return (
    <div className="modal-overlay">
      <div className="modal" style={{ textAlign: "center", padding: "40px 28px" }}>
        <div style={{ fontSize: "52px", marginBottom: "16px" }}>🎉</div>
        <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "22px", fontWeight: "800", marginBottom: "8px" }}>Workout logged!</h2>
        <p style={{ color: "var(--text2)", marginBottom: "24px" }}>Great work. Your coach can see your progress.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "24px" }}>
          <div className="metric-box"><div className="metric-val">{completedSets}/{totalSets}</div><div className="metric-lbl">Sets done</div></div>
          <div className="metric-box"><div className="metric-val">{formatDuration(elapsedSeconds)}</div><div className="metric-lbl">Duration</div></div>
          <div className="metric-box"><div className="metric-val">{totalVolume > 0 ? Math.round(totalVolume).toLocaleString() : "—"}</div><div className="metric-lbl">Total lbs</div></div>
        </div>
        <button className="btn-primary" style={{ width: "100%", padding: "12px 0" }} onClick={onClose}>Done</button>
      </div>
    </div>
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "22px", fontWeight: "800", marginBottom: "6px" }}>Log workout</h2>
        <p style={{ color: "var(--text2)", fontSize: "13px", marginBottom: "24px" }}>{prog.name} · Week {week}</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "24px" }}>
          <div className="metric-box"><div className="metric-val">{completedSets}/{totalSets}</div><div className="metric-lbl">Sets done</div></div>
          <div className="metric-box"><div className="metric-val">{formatDuration(elapsedSeconds)}</div><div className="metric-lbl">Duration</div></div>
          <div className="metric-box"><div className="metric-val">{totalVolume > 0 ? Math.round(totalVolume).toLocaleString() : "—"}</div><div className="metric-lbl">Total lbs</div></div>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ marginBottom: "10px", display: "block", fontSize: "14px", fontWeight: "600", color: "var(--text)" }}>Difficulty (1–10)</label>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "8px" }}>
            {[1,2,3,4,5,6,7,8,9,10].map((n) => (
              <button key={n} className={"rating-btn" + (rating === n ? " sel" : "")} onClick={() => setRating(n)}
                style={{ background: rating === n ? ratingColor(n) : "var(--surface)", borderColor: rating === n ? ratingColor(n) : "var(--border2)", color: rating === n ? "#fff" : "var(--text2)" }}>
                {n}
              </button>
            ))}
          </div>
          {rating > 0 && <p style={{ fontSize: "13px", fontWeight: "600", color: ratingColor(rating) }}>{rl(rating)}</p>}
        </div>
        <div style={{ marginBottom: "24px" }}>
          <label>Feedback for your coach (optional)</label>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="How did it feel? Anything too easy or too hard?" rows={3} style={{ resize: "vertical" }} />
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn-ghost" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
          <button className="btn-log" style={{ flex: 2, padding: "12px 0", fontSize: "15px" }} onClick={submit}>Submit log ✓</button>
        </div>
      </div>
    </div>
  );
}

// ─── Client History ───────────────────────────────────────────────────────────
function ClientHistory({ store, programs }) {
  const summaries = store.workoutSummaries || {};

  const oneRMs = {};
  programs.forEach((prog) => {
    for (let w = 1; w <= prog.weeks; w++) {
      const log = (store.logs || {})[prog.id + "_w" + w] || {};
      prog.exercises.forEach((ex) => {
        if (ex.type !== "weight" || !isBigLift(ex.name)) return;
        const exLog = log[ex.id];
        if (!exLog || !exLog.sets) return;
        exLog.sets.forEach((s) => {
          if (!s.done || !s.weight || !s.reps) return;
          const est = epley1RM(parseFloat(s.weight), parseFloat(s.reps));
          if (est && (!oneRMs[ex.name] || est > oneRMs[ex.name])) oneRMs[ex.name] = est;
        });
      });
    }
  });

  return (
    <div>
      <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "22px", fontWeight: "800", marginBottom: "20px" }}>My Progress</h2>

      {Object.keys(oneRMs).length > 0 && (
        <div style={{ marginBottom: "28px" }}>
          <h3 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "4px" }}>Estimated 1RMs</h3>
          <p style={{ fontSize: "12px", color: "var(--text3)", marginBottom: "12px" }}>Epley formula · Best logged set</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "10px" }}>
            {Object.entries(oneRMs).map(([name, rm]) => (
              <div key={name} className="rm-card">
                <p style={{ fontSize: "12px", color: "var(--text2)", fontWeight: "600", marginBottom: "4px" }}>{name}</p>
                <p style={{ fontSize: "26px", fontWeight: "800", fontFamily: "Syne, sans-serif", color: "var(--accent-dark)" }}>{rm}</p>
                <p style={{ fontSize: "11px", color: "var(--text3)" }}>lbs estimated</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {programs.map((prog) => {
        const weeks = Array.from({ length: prog.weeks }, (_, i) => i + 1);
        const hasSummaries = weeks.some((w) => summaries[prog.id + "_w" + w]);
        if (!hasSummaries) return null;
        return (
          <div key={prog.id} style={{ marginBottom: "28px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "12px" }}>{prog.name}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {weeks.map((w) => {
                const s = summaries[prog.id + "_w" + w];
                if (!s) return null;
                return (
                  <div key={w} className="card" style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "Syne, sans-serif", fontWeight: "700", fontSize: "14px", color: "var(--accent-dark)", minWidth: "28px" }}>W{w}</span>
                      <span className="chip">{s.completedSets}/{s.totalSets} sets</span>
                      {s.duration > 0 && <span className="chip">⏱ {formatDuration(s.duration)}</span>}
                      {s.totalVolume > 0 && <span className="chip">📊 {s.totalVolume.toLocaleString()} lbs</span>}
                      {s.rating && <span style={{ fontFamily: "Syne, sans-serif", fontWeight: "700", fontSize: "14px", color: ratingColor(s.rating) }}>Difficulty {s.rating}/10</span>}
                    </div>
                    {s.feedbackNote && <p style={{ fontSize: "12px", color: "var(--text2)", marginTop: "8px", fontStyle: "italic" }}>"{s.feedbackNote}"</p>}
                  </div>
                );
              })}
            </div>

            {prog.exercises.filter((ex) => ex.type === "weight").map((ex) => {
              const weekData = [];
              weeks.forEach((w) => {
                const log = (store.logs || {})[prog.id + "_w" + w] || {};
                const exLog = log[ex.id];
                if (exLog && exLog.sets) {
                  const done = exLog.sets.filter((s) => s.done);
                  if (done.length > 0) {
                    const maxW = Math.max(...done.map((s) => parseFloat(s.weight) || 0));
                    const avgR = Math.round(done.reduce((a, s) => a + (parseFloat(s.reps) || 0), 0) / done.length);
                    weekData.push({ week: w, maxWeight: maxW, avgReps: avgR, sets: done.length });
                  }
                }
              });
              if (weekData.length === 0) return null;
              return (
                <div key={ex.id} className="exercise-row" style={{ marginTop: "10px" }}>
                  <p style={{ fontWeight: "700", marginBottom: "10px" }}>{ex.name}</p>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                    <thead>
                      <tr>
                        <th style={{ textAlign: "left", color: "var(--text3)", fontWeight: "500", padding: "4px 8px", fontSize: "11px" }}>Week</th>
                        <th style={{ textAlign: "center", color: "var(--text3)", fontWeight: "500", padding: "4px 8px", fontSize: "11px" }}>Sets done</th>
                        <th style={{ textAlign: "center", color: "var(--text3)", fontWeight: "500", padding: "4px 8px", fontSize: "11px" }}>Max weight</th>
                        <th style={{ textAlign: "center", color: "var(--text3)", fontWeight: "500", padding: "4px 8px", fontSize: "11px" }}>Avg reps</th>
                      </tr>
                    </thead>
                    <tbody>
                      {weekData.map((d, i) => {
                        const prev = i > 0 ? weekData[i - 1] : null;
                        const up = prev && d.maxWeight > prev.maxWeight;
                        return (
                          <tr key={d.week} style={{ borderTop: "1px solid var(--border)" }}>
                            <td style={{ padding: "8px", fontWeight: "700", fontFamily: "Syne, sans-serif", color: "var(--accent-dark)" }}>W{d.week}</td>
                            <td style={{ padding: "8px", textAlign: "center", color: "var(--text2)" }}>{d.sets}</td>
                            <td style={{ padding: "8px", textAlign: "center", color: up ? "var(--accent-dark)" : "var(--text)", fontWeight: up ? "700" : "400" }}>
                              {d.maxWeight > 0 ? d.maxWeight + " lbs" : "—"}{up ? " ↑" : ""}
                            </td>
                            <td style={{ padding: "8px", textAlign: "center", color: "var(--text2)" }}>{d.avgReps || "—"}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        );
      })}

      {programs.every((p) => !Object.keys(summaries).some((k) => k.startsWith(p.id))) && (
        <div className="empty-state"><div className="empty-icon">📈</div><p>Log some workouts to see your progress here!</p></div>
      )}
    </div>
  );
}

// ─── Client Messaging ─────────────────────────────────────────────────────────
function ClientMessaging({ store, setStore, clientId }) {
  const [text, setText] = useState("");
  const bottomRef = useRef(null);
  const thread = ((store.messages || {})[clientId] || []);

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [thread.length]);

  const send = () => {
    if (!text.trim()) return;
    const msg = { id: uid(), from: "client", text: text.trim(), ts: new Date().toISOString(), readByCoach: false };
    const existing = (store.messages || {})[clientId] || [];
    const newStore = { ...store, messages: { ...(store.messages || {}), [clientId]: [...existing, msg] } };
    setStore(newStore); saveStore(newStore);
    setText("");
  };

  const fmtTime = (ts) => { try { return new Date(ts).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }); } catch(e) { return ""; } };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 200px)", minHeight: "400px" }}>
      <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "20px", fontWeight: "800", marginBottom: "16px" }}>Messages from your coach</h2>
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px", marginBottom: "12px", background: "var(--surface)", borderRadius: "var(--radius-lg)", padding: "16px", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}>
        {thread.length === 0 && <div style={{ textAlign: "center", color: "var(--text3)", fontSize: "13px", marginTop: "40px" }}>No messages yet. Send your coach a message!</div>}
        {thread.map((m) => (
          <div key={m.id} style={{ display: "flex", flexDirection: m.from === "client" ? "row-reverse" : "row", gap: "8px", alignItems: "flex-end" }}>
            <div className={m.from === "coach" ? "msg-bubble-coach" : "msg-bubble-client"}>
              <p style={{ lineHeight: "1.5" }}>{m.text}</p>
              <p style={{ fontSize: "10px", color: "var(--text3)", marginTop: "4px", textAlign: m.from === "client" ? "right" : "left" }}>{fmtTime(m.ts)}</p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Message your coach..." onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} style={{ flex: 1 }} />
        <button className="btn-primary btn-sm" onClick={send} style={{ flexShrink: 0, padding: "9px 20px" }}>Send</button>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [store, setStore] = useState(() => loadStore() || DEFAULT_STORE);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = FONTS + CSS;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <div>
      {session === null && <Login store={store} onLogin={(s) => setSession(s)} />}
      {session !== null && session.role === "coach" && (
        <div>
          <CoachApp store={store} setStore={setStore} />
          <button onClick={() => setSession(null)} style={{ position: "fixed", bottom: "20px", right: "20px", background: "var(--surface)", color: "var(--text2)", border: "1px solid var(--border2)", borderRadius: "var(--radius)", padding: "8px 16px", fontSize: "13px", cursor: "pointer", zIndex: 100, boxShadow: "var(--shadow-md)" }}>Sign out</button>
        </div>
      )}
      {session !== null && session.role === "client" && (
        <div>
          <ClientApp store={store} setStore={setStore} clientId={session.clientId} />
          <button onClick={() => setSession(null)} style={{ position: "fixed", bottom: "20px", right: "20px", background: "var(--surface)", color: "var(--text2)", border: "1px solid var(--border2)", borderRadius: "var(--radius)", padding: "8px 16px", fontSize: "13px", cursor: "pointer", zIndex: 100, boxShadow: "var(--shadow-md)" }}>Sign out</button>
        </div>
      )}
    </div>
  );
}