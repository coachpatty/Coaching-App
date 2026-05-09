import { useState, useEffect, useRef } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');`;

const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --bg: #f5f7f5;
  --surface: #ffffff;
  --surface2: #f0f4f0;
  --surface3: #e8ede8;
  --border: rgba(0,0,0,0.07);
  --border2: rgba(0,0,0,0.13);
  --accent: #5abf3a;
  --accent-light: #e8f7e2;
  --accent-dim: rgba(90,191,58,0.13);
  --accent-dark: #3d8f26;
  --text: #1a1f1a;
  --text2: #5a6b5a;
  --text3: #8fa08f;
  --danger: #e03f3f;
  --danger-dim: rgba(224,63,63,0.1);
  --warning: #e08a1a;
  --warning-dim: rgba(224,138,26,0.1);
  --info: #2b7fe0;
  --info-dim: rgba(43,127,224,0.1);
  --success: #1da85a;
  --success-dim: rgba(29,168,90,0.1);
  --radius: 10px;
  --radius-lg: 16px;
  --radius-xl: 22px;
  --shadow: 0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04);
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  color: var(--text);
  background: var(--bg);
  -webkit-font-smoothing: antialiased;
}
body { background: var(--bg); min-height: 100vh; }
h1,h2,h3,h4 { font-family: 'Syne', sans-serif; letter-spacing: -0.02em; color: var(--text); }
input, textarea, select {
  background: var(--surface);
  border: 1px solid var(--border2);
  border-radius: var(--radius);
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  padding: 9px 13px;
  outline: none;
  width: 100%;
  transition: border-color 0.15s, box-shadow 0.15s;
  box-shadow: var(--shadow);
}
input:focus, textarea:focus, select:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-dim);
}
select option { background: var(--surface); color: var(--text); }
button { cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 14px; border: none; border-radius: var(--radius); transition: all 0.15s; }
label { font-size: 12px; color: var(--text2); font-weight: 500; letter-spacing: 0.03em; display: block; margin-bottom: 5px; }
.btn-primary { background: var(--accent); color: #fff; font-weight: 600; padding: 10px 20px; font-family: 'Syne', sans-serif; box-shadow: 0 2px 8px rgba(90,191,58,0.3); }
.btn-primary:hover { background: var(--accent-dark); box-shadow: 0 2px 12px rgba(90,191,58,0.4); }
.btn-ghost { background: var(--surface); color: var(--text2); border: 1px solid var(--border2); padding: 8px 16px; box-shadow: var(--shadow); }
.btn-ghost:hover { background: var(--surface2); color: var(--text); }
.btn-danger { background: var(--danger-dim); color: var(--danger); padding: 7px 14px; border: 1px solid rgba(224,63,63,0.2); }
.btn-danger:hover { background: rgba(224,63,63,0.18); }
.btn-sm { padding: 6px 12px; font-size: 13px; }
.btn-log { background: var(--accent); color: #fff; font-weight: 700; padding: 16px 0; font-family: 'Syne', sans-serif; font-size: 17px; border-radius: var(--radius-lg); width: 100%; box-shadow: 0 4px 16px rgba(90,191,58,0.35); letter-spacing: 0.01em; }
.btn-log:hover { background: var(--accent-dark); }
.card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 20px; box-shadow: var(--shadow); }
.tag { display: inline-block; font-size: 11px; font-weight: 600; padding: 3px 9px; border-radius: 20px; letter-spacing: 0.04em; font-family: 'Syne', sans-serif; }
.tag-green { background: var(--accent-dim); color: var(--accent-dark); }
.tag-blue { background: var(--info-dim); color: var(--info); }
.tag-red { background: var(--danger-dim); color: var(--danger); }
.tag-orange { background: var(--warning-dim); color: var(--warning); }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; backdrop-filter: blur(2px); }
.modal { background: var(--surface); border: 1px solid var(--border2); border-radius: var(--radius-xl); padding: 28px; width: 100%; max-width: 560px; max-height: 90vh; overflow-y: auto; box-shadow: var(--shadow-md); }
.modal-lg { max-width: 720px; }
.sidebar { width: 224px; min-width: 224px; background: var(--surface); border-right: 1px solid var(--border); padding: 20px 12px; display: flex; flex-direction: column; gap: 2px; min-height: 100vh; box-shadow: 1px 0 0 var(--border); }
.nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: var(--radius); color: var(--text2); font-size: 14px; cursor: pointer; transition: all 0.12s; font-weight: 500; border: none; background: transparent; width: 100%; text-align: left; }
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
.client-row:hover { border-color: var(--accent); box-shadow: 0 2px 8px rgba(90,191,58,0.12); }
.week-tab { padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 500; cursor: pointer; border: 1px solid var(--border2); background: var(--surface); color: var(--text2); transition: all 0.12s; box-shadow: var(--shadow); }
.week-tab.active { background: var(--accent); color: #fff; border-color: var(--accent); font-family: 'Syne', sans-serif; font-weight: 600; box-shadow: 0 2px 8px rgba(90,191,58,0.3); }
.scroll-x { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; flex-wrap: wrap; }
.empty-state { text-align: center; padding: 48px 24px; color: var(--text3); }
.empty-icon { font-size: 40px; margin-bottom: 12px; }
.lib-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 16px; box-shadow: var(--shadow); margin-bottom: 10px; transition: border-color 0.15s; }
.lib-card:hover { border-color: var(--border2); }
.rating-btn { width: 38px; height: 38px; border-radius: 50%; border: 1.5px solid var(--border2); background: var(--surface); color: var(--text2); font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.12s; font-family: 'Syne', sans-serif; }
.rating-btn.selected { background: var(--accent); color: #fff; border-color: var(--accent); box-shadow: 0 2px 8px rgba(90,191,58,0.35); }
.rating-btn:hover { border-color: var(--accent); color: var(--accent-dark); }
.metric-box { background: var(--accent-light); border: 1px solid rgba(90,191,58,0.2); border-radius: var(--radius-lg); padding: 14px 18px; text-align: center; }
.metric-val { font-size: 22px; font-weight: 700; font-family: 'Syne', sans-serif; color: var(--accent-dark); }
.metric-lbl { font-size: 11px; color: var(--text2); font-weight: 500; margin-top: 3px; }
input[type=number]::-webkit-inner-spin-button { opacity: 0.5; }
`;

const STORE_KEY = "coachapp_v4";
const loadStore = () => {
  try { const r = localStorage.getItem(STORE_KEY); return r ? JSON.parse(r) : null; }
  catch(e) { return null; }
};
const saveStore = (data) => {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch(e) {}
};

const DEFAULT_STORE = {
  coach: { name: "Coach", password: "coach123" },
  clients: [
    { id: "c1", name: "Alex Johnson", email: "alex@example.com", password: "alex123", goal: "Build strength", joinDate: "2025-01-10" },
    { id: "c2", name: "Sam Rivera", email: "sam@example.com", password: "sam123", goal: "Fat loss + conditioning", joinDate: "2025-02-15" },
  ],
  programs: [
    {
      id: "p1", clientId: "c1", name: "Strength Block 1", weeks: 4, createdAt: "2025-01-10",
      exercises: [
        { id: "e1", name: "Back Squat", type: "weight", sets: 4, reps: "5", videoUrl: "https://www.youtube.com/embed/ultWZbUMPL8", notes: "Keep chest tall, drive through heels" },
        { id: "e2", name: "Romanian Deadlift", type: "weight", sets: 3, reps: "8", videoUrl: "https://www.youtube.com/embed/JCXUYuzwNrM", notes: "Hinge at hips, soft knee bend" },
        { id: "e3", name: "Plank Hold", type: "time", sets: 3, reps: "60", videoUrl: "", notes: "Neutral spine, brace core" },
      ]
    },
    {
      id: "p2", clientId: "c2", name: "Conditioning Phase 1", weeks: 3, createdAt: "2025-02-15",
      exercises: [
        { id: "e4", name: "Goblet Squat", type: "weight", sets: 3, reps: "12", videoUrl: "https://www.youtube.com/embed/MxsFDhcyFyE", notes: "Elbows inside knees at bottom" },
        { id: "e5", name: "Battle Ropes", type: "time", sets: 4, reps: "30", videoUrl: "", notes: "Alternate arm waves, stay low" },
      ]
    }
  ],
  exerciseLibrary: [
    { id: "lib1", name: "Back Squat", category: "Legs", description: "Barbell squat with bar on upper back. Primary lower body compound movement.", videoUrl: "https://www.youtube.com/embed/ultWZbUMPL8" },
    { id: "lib2", name: "Romanian Deadlift", category: "Legs", description: "Hip hinge movement targeting hamstrings and glutes. Keep back flat throughout.", videoUrl: "https://www.youtube.com/embed/JCXUYuzwNrM" },
    { id: "lib3", name: "Goblet Squat", category: "Legs", description: "Squat holding a dumbbell or kettlebell at chest. Great for beginners.", videoUrl: "https://www.youtube.com/embed/MxsFDhcyFyE" },
    { id: "lib4", name: "Plank Hold", category: "Core", description: "Static hold in push-up position. Keep hips level and core braced.", videoUrl: "" },
    { id: "lib5", name: "Battle Ropes", category: "Cardio", description: "Alternating arm waves with battle ropes. Stay in athletic stance, slight knee bend.", videoUrl: "" },
  ],
  logs: {},
  workoutSummaries: {}
};

const uid = () => Math.random().toString(36).slice(2, 9);
const initials = (name) => name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
const getYtEmbed = (url) => {
  if (url === "" || url === null || url === undefined) return "";
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (m) return "https://www.youtube.com/embed/" + m[1];
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) return "https://player.vimeo.com/video/" + vm[1];
  return url;
};

const formatDuration = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return s + "s";
  return m + "m " + s + "s";
};

const CATEGORIES = ["All", "Legs", "Push", "Pull", "Core", "Cardio", "Full Body", "Other"];

// ─── Login ──────────────────────────────────────────────────────────────────
function Login({ store, onLogin }) {
  const [mode, setMode] = useState("coach");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const handleLogin = () => {
    setErr("");
    if (mode === "coach") {
      if (pass === store.coach.password) { onLogin({ role: "coach" }); }
      else { setErr("Wrong password."); }
    } else {
      const client = store.clients.find((c) => c.email.toLowerCase() === email.toLowerCase() && c.password === pass);
      if (client) { onLogin({ role: "client", clientId: client.id }); }
      else { setErr("Email or password not found."); }
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <div style={{ width: "40px", height: "40px", background: "var(--accent)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(90,191,58,0.35)" }}>
              <span style={{ fontSize: "20px" }}>⚡</span>
            </div>
            <span style={{ fontFamily: "Syne, sans-serif", fontSize: "24px", fontWeight: "800", color: "var(--text)", letterSpacing: "-0.02em" }}>CoachOS</span>
          </div>
          <p style={{ color: "var(--text2)", fontSize: "14px" }}>Your personal coaching platform</p>
        </div>

        <div className="card" style={{ padding: "28px" }}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
            {["coach", "client"].map((m) => (
              <button key={m} onClick={() => { setMode(m); setErr(""); }}
                style={{ flex: 1, padding: "9px 0", borderRadius: "var(--radius)", fontFamily: "Syne, sans-serif", fontWeight: "600", fontSize: "14px",
                  background: mode === m ? "var(--accent)" : "var(--surface2)",
                  color: mode === m ? "#fff" : "var(--text2)",
                  border: mode === m ? "none" : "1px solid var(--border2)",
                  boxShadow: mode === m ? "0 2px 8px rgba(90,191,58,0.3)" : "none" }}>
                {m === "coach" ? "🏋️ Coach" : "👤 Client"}
              </button>
            ))}
          </div>
          {mode === "client" && (
            <div style={{ marginBottom: "14px" }}>
              <label>Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" type="email" />
            </div>
          )}
          <div style={{ marginBottom: "18px" }}>
            <label>Password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="••••••••"
              onKeyDown={(e) => { if (e.key === "Enter") { handleLogin(); } }} />
          </div>
          {err !== "" && <p style={{ color: "var(--danger)", fontSize: "13px", marginBottom: "12px" }}>⚠ {err}</p>}
          <button className="btn-primary" style={{ width: "100%", padding: "12px 0", fontSize: "15px" }} onClick={handleLogin}>Sign in →</button>
          <p style={{ color: "var(--text3)", fontSize: "12px", textAlign: "center", marginTop: "16px" }}>
            {mode === "coach" ? "Default coach password: coach123" : "Ask your coach for your login credentials"}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Coach App ──────────────────────────────────────────────────────────────
function CoachApp({ store, setStore }) {
  const [tab, setTab] = useState("dashboard");
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);

  const openClient = (client) => { setSelectedClient(client); setTab("client-detail"); };
  const openProgram = (prog) => { setSelectedProgram(prog); setTab("program-editor"); };

  const navItems = [
    { id: "dashboard", icon: "▦", label: "Dashboard" },
    { id: "clients", icon: "◉", label: "Clients" },
    { id: "programs", icon: "≡", label: "Programs" },
    { id: "library", icon: "◈", label: "Exercise Library" },
    { id: "settings", icon: "⚙", label: "Settings" },
  ];

  const isActive = (id) => {
    if (tab === id) return true;
    if (tab === "client-detail" && id === "clients") return true;
    if (tab === "program-editor" && id === "programs") return true;
    return false;
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div className="sidebar">
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px 24px" }}>
          <div style={{ width: "30px", height: "30px", background: "var(--accent)", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", boxShadow: "0 2px 8px rgba(90,191,58,0.3)" }}>⚡</div>
          <span style={{ fontFamily: "Syne, sans-serif", fontWeight: "800", fontSize: "17px", letterSpacing: "-0.02em" }}>CoachOS</span>
        </div>
        {navItems.map((n) => (
          <button key={n.id} className={"nav-item" + (isActive(n.id) ? " active" : "")}
            onClick={() => { setTab(n.id); setSelectedClient(null); setSelectedProgram(null); }}>
            <span style={{ width: "20px", textAlign: "center", fontSize: "16px" }}>{n.icon}</span> {n.label}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ padding: "12px 12px 4px", borderTop: "1px solid var(--border)", marginTop: "8px" }}>
          <p style={{ fontSize: "11px", color: "var(--text3)", marginBottom: "2px" }}>Logged in as</p>
          <p style={{ fontSize: "14px", fontWeight: "600", color: "var(--text2)" }}>{store.coach.name}</p>
        </div>
      </div>

      <div className="main">
        {tab === "dashboard" && <CoachDashboard store={store} openClient={openClient} openProgram={openProgram} />}
        {tab === "clients" && <ClientsList store={store} setStore={setStore} openClient={openClient} />}
        {tab === "client-detail" && selectedClient !== null && <ClientDetail client={selectedClient} store={store} setStore={setStore} openProgram={openProgram} setTab={setTab} />}
        {tab === "programs" && <ProgramsList store={store} setStore={setStore} openProgram={openProgram} />}
        {tab === "program-editor" && selectedProgram !== null && <ProgramEditor program={selectedProgram} store={store} setStore={setStore} setTab={setTab} setSelectedProgram={setSelectedProgram} />}
        {tab === "library" && <ExerciseLibrary store={store} setStore={setStore} />}
        {tab === "settings" && <Settings store={store} setStore={setStore} />}
      </div>
    </div>
  );
}

// ─── Dashboard ──────────────────────────────────────────────────────────────
function CoachDashboard({ store, openClient, openProgram }) {
  const clients = store.clients;
  const programs = store.programs;
  const totalLogs = Object.keys(store.workoutSummaries || {}).length;
  const totalExercises = programs.reduce((a, p) => a + p.exercises.length, 0);

  // recent feedback
  const recentFeedback = [];
  Object.entries(store.workoutSummaries || {}).forEach(([key, summary]) => {
    if (summary.rating) {
      const parts = key.split("_w");
      const progId = parts[0];
      const rest = parts[1] ? parts[1].split("_") : [];
      const week = rest[0];
      const prog = programs.find((p) => p.id === progId);
      const client = prog ? clients.find((c) => c.id === prog.clientId) : null;
      if (client && prog) {
        recentFeedback.push({ client: client.name, prog: prog.name, week, rating: summary.rating, note: summary.feedbackNote || "", date: summary.loggedAt || "" });
      }
    }
  });
  recentFeedback.sort((a, b) => b.date > a.date ? 1 : -1);

  const ratingColor = (r) => {
    if (r <= 3) return "var(--success)";
    if (r <= 6) return "var(--warning)";
    return "var(--danger)";
  };

  return (
    <div>
      <p style={{ color: "var(--text2)", marginBottom: "4px", fontSize: "14px" }}>Welcome back,</p>
      <h1 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "28px" }}>{store.coach.name} 👋</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px", marginBottom: "32px" }}>
        {[
          { num: clients.length, label: "Active clients", icon: "◉" },
          { num: programs.length, label: "Programs", icon: "≡" },
          { num: (store.exerciseLibrary || []).length, label: "Library exercises", icon: "◈" },
          { num: totalLogs, label: "Logged workouts", icon: "✓" },
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
          {clients.slice(0, 4).map((c) => {
            const progs = programs.filter((p) => p.clientId === c.id);
            return (
              <div key={c.id} className="client-row" onClick={() => openClient(c)}>
                <div className="avatar">{initials(c.name)}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: "600", fontSize: "14px" }}>{c.name}</p>
                  <p style={{ fontSize: "12px", color: "var(--text3)", marginTop: "2px" }}>{progs.length} program{progs.length !== 1 ? "s" : ""}</p>
                </div>
                <span className="tag tag-green">Active</span>
              </div>
            );
          })}
          {clients.length === 0 && <p style={{ color: "var(--text2)", fontSize: "14px" }}>No clients yet.</p>}
        </div>

        <div>
          <h2 style={{ fontSize: "17px", fontWeight: "700", marginBottom: "14px" }}>Recent client feedback</h2>
          {recentFeedback.slice(0, 4).map((f, i) => (
            <div key={i} className="card" style={{ marginBottom: "8px", padding: "12px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                <p style={{ fontWeight: "600", fontSize: "13px" }}>{f.client}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "12px", color: "var(--text3)" }}>Difficulty</span>
                  <span style={{ fontFamily: "Syne, sans-serif", fontWeight: "700", fontSize: "15px", color: ratingColor(f.rating) }}>{f.rating}/10</span>
                </div>
              </div>
              <p style={{ fontSize: "12px", color: "var(--text3)" }}>{f.prog} · Week {f.week}</p>
              {f.note !== "" && <p style={{ fontSize: "12px", color: "var(--text2)", marginTop: "6px", fontStyle: "italic" }}>"{f.note}"</p>}
            </div>
          ))}
          {recentFeedback.length === 0 && <p style={{ color: "var(--text2)", fontSize: "14px" }}>No client feedback yet. Feedback appears here after clients log workouts.</p>}
        </div>
      </div>
    </div>
  );
}

// ─── Exercise Library ───────────────────────────────────────────────────────
function ExerciseLibrary({ store, setStore }) {
  const lib = store.exerciseLibrary || [];
  const [showAdd, setShowAdd] = useState(false);
  const [showVideo, setShowVideo] = useState(null);
  const [filterCat, setFilterCat] = useState("All");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", category: "Legs", description: "", videoUrl: "" });

  const filtered = lib.filter((e) => {
    const matchCat = filterCat === "All" || e.category === filterCat;
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const addExercise = () => {
    if (form.name === "") return;
    const ex = { id: uid(), name: form.name, category: form.category, description: form.description, videoUrl: form.videoUrl };
    const updated = { ...store, exerciseLibrary: [...lib, ex] };
    setStore(updated); saveStore(updated);
    setShowAdd(false); setForm({ name: "", category: "Legs", description: "", videoUrl: "" });
  };

  const deleteEx = (id) => {
    if (window.confirm("Remove this exercise from the library?")) {
      const updated = { ...store, exerciseLibrary: lib.filter((e) => e.id !== id) };
      setStore(updated); saveStore(updated);
    }
  };

  const catColors = { Legs: "tag-green", Push: "tag-blue", Pull: "tag-orange", Core: "tag-red", Cardio: "tag-orange", "Full Body": "tag-blue", Other: "" };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "26px", fontWeight: "800" }}>Exercise Library</h1>
          <p style={{ color: "var(--text2)", fontSize: "14px", marginTop: "2px" }}>{lib.length} exercises · Your personal movement database</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAdd(true)}>+ Add exercise</button>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap", alignItems: "center" }}>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search exercises..." style={{ maxWidth: "240px" }} />
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setFilterCat(c)}
              style={{ padding: "5px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "600",
                background: filterCat === c ? "var(--accent)" : "var(--surface)",
                color: filterCat === c ? "#fff" : "var(--text2)",
                border: filterCat === c ? "none" : "1px solid var(--border2)",
                boxShadow: filterCat === c ? "0 2px 6px rgba(90,191,58,0.3)" : "var(--shadow)" }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 && <div className="empty-state"><div className="empty-icon">◈</div><p>No exercises found. Add your first one!</p></div>}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        {filtered.map((ex) => (
          <div key={ex.id} className="lib-card">
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "8px" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <p style={{ fontWeight: "700", fontSize: "15px" }}>{ex.name}</p>
                  <span className={"tag " + (catColors[ex.category] || "tag-blue")}>{ex.category}</span>
                </div>
                {ex.description !== "" && <p style={{ fontSize: "13px", color: "var(--text2)", lineHeight: "1.5" }}>{ex.description}</p>}
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
              {ex.videoUrl !== "" && (
                <button className="btn-ghost btn-sm" onClick={() => setShowVideo(ex)} style={{ fontSize: "12px" }}>▶ Watch demo</button>
              )}
              {ex.videoUrl === "" && <span style={{ fontSize: "12px", color: "var(--text3)" }}>No video attached</span>}
              <div style={{ flex: 1 }} />
              <button className="btn-danger btn-sm" onClick={() => deleteEx(ex.id)} style={{ fontSize: "12px" }}>Remove</button>
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
              <div>
                <label>Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.filter((c) => c !== "All").map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div><label>Description / coaching notes</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Technique cues, common mistakes, tempo guidance..." rows={3} style={{ resize: "vertical" }} /></div>
              <div><label>Video URL (YouTube or Vimeo)</label><input value={form.videoUrl} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })} placeholder="https://youtube.com/watch?v=..." /></div>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "20px", justifyContent: "flex-end" }}>
              <button className="btn-ghost" onClick={() => setShowAdd(false)}>Cancel</button>
              <button className="btn-primary" onClick={addExercise}>Add to library</button>
            </div>
          </div>
        </div>
      )}

      {showVideo !== null && (
        <div className="modal-overlay" onClick={() => setShowVideo(null)}>
          <div className="modal modal-lg" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <div>
                <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "18px", fontWeight: "700" }}>{showVideo.name}</h2>
                <p style={{ fontSize: "12px", color: "var(--text3)", marginTop: "2px" }}>{showVideo.category}</p>
              </div>
              <button className="btn-ghost btn-sm" onClick={() => setShowVideo(null)}>✕ Close</button>
            </div>
            <iframe src={getYtEmbed(showVideo.videoUrl)} className="video-embed" allowFullScreen title={showVideo.name} />
            {showVideo.description !== "" && <p style={{ fontSize: "13px", color: "var(--text2)", marginTop: "12px", lineHeight: "1.6" }}>{showVideo.description}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Clients List ───────────────────────────────────────────────────────────
function ClientsList({ store, setStore, openClient }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", goal: "" });

  const addClient = () => {
    if (form.name === "" || form.email === "" || form.password === "") return;
    const newClient = { id: uid(), name: form.name, email: form.email, password: form.password, goal: form.goal, joinDate: new Date().toISOString().slice(0, 10) };
    const updated = { ...store, clients: [...store.clients, newClient] };
    setStore(updated); saveStore(updated);
    setShowAdd(false); setForm({ name: "", email: "", password: "", goal: "" });
  };

  const deleteClient = (id, e) => {
    e.stopPropagation();
    if (window.confirm("Remove this client?")) {
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
        return (
          <div key={c.id} className="client-row" onClick={() => openClient(c)}>
            <div className="avatar">{initials(c.name)}</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: "600" }}>{c.name}</p>
              <p style={{ fontSize: "13px", color: "var(--text2)", marginTop: "3px" }}>{c.email}</p>
              {c.goal !== "" && <p style={{ fontSize: "11px", color: "var(--text3)", marginTop: "2px" }}>Goal: {c.goal}</p>}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span className="chip">{progs.length} program{progs.length !== 1 ? "s" : ""}</span>
              <button className="btn-danger btn-sm" onClick={(e) => deleteClient(c.id, e)}>Remove</button>
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
              <div><label>Email</label><input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="alex@email.com" type="email" /></div>
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

// ─── Client Detail ──────────────────────────────────────────────────────────
function ClientDetail({ client, store, setStore, openProgram, setTab }) {
  const programs = store.programs.filter((p) => p.clientId === client.id);
  const [showAddProg, setShowAddProg] = useState(false);
  const [progForm, setProgForm] = useState({ name: "", weeks: "4" });

  const createProgram = () => {
    if (progForm.name === "") return;
    const newProg = { id: uid(), clientId: client.id, name: progForm.name, weeks: parseInt(progForm.weeks), createdAt: new Date().toISOString().slice(0, 10), exercises: [] };
    const updated = { ...store, programs: [...store.programs, newProg] };
    setStore(updated); saveStore(updated);
    setShowAddProg(false); setProgForm({ name: "", weeks: "4" });
    openProgram(newProg);
  };

  // gather feedback for this client
  const summaries = store.workoutSummaries || {};
  const clientFeedback = [];
  programs.forEach((prog) => {
    for (let w = 1; w <= prog.weeks; w++) {
      const key = prog.id + "_w" + w;
      const s = summaries[key];
      if (s && s.rating) {
        clientFeedback.push({ prog: prog.name, week: w, rating: s.rating, note: s.feedbackNote || "", volume: s.totalVolume || 0, duration: s.duration || 0, loggedAt: s.loggedAt || "" });
      }
    }
  });
  clientFeedback.sort((a, b) => b.loggedAt > a.loggedAt ? 1 : -1);

  const ratingColor = (r) => { if (r <= 3) return "var(--success)"; if (r <= 6) return "var(--warning)"; return "var(--danger)"; };

  return (
    <div>
      <button className="btn-ghost btn-sm" style={{ marginBottom: "20px" }} onClick={() => setTab("clients")}>← Back to clients</button>
      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "28px" }}>
        <div className="avatar" style={{ width: "52px", height: "52px", fontSize: "20px" }}>{initials(client.name)}</div>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: "24px", fontWeight: "800" }}>{client.name}</h1>
          <p style={{ fontSize: "13px", color: "var(--text2)" }}>{client.email} · Joined {client.joinDate}</p>
          {client.goal !== "" && <span className="tag tag-green" style={{ marginTop: "6px", display: "inline-block" }}>{client.goal}</span>}
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: "11px", color: "var(--text3)" }}>Client password</p>
          <p style={{ fontSize: "13px", fontFamily: "monospace", background: "var(--surface2)", padding: "4px 10px", borderRadius: "6px", marginTop: "4px", border: "1px solid var(--border)" }}>{client.password}</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <h2 style={{ fontSize: "17px", fontWeight: "700" }}>Programs</h2>
            <button className="btn-primary btn-sm" onClick={() => setShowAddProg(true)}>+ New program</button>
          </div>
          {programs.map((p) => (
            <div key={p.id} className="client-row" onClick={() => openProgram(p)}>
              <div style={{ width: "36px", height: "36px", background: "var(--info-dim)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0 }}>📋</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: "600" }}>{p.name}</p>
                <p style={{ fontSize: "12px", color: "var(--text2)", marginTop: "3px" }}>{p.exercises.length} exercises · {p.weeks} weeks</p>
              </div>
              <span className="tag tag-green">Edit →</span>
            </div>
          ))}
          {programs.length === 0 && <div className="empty-state" style={{ padding: "24px" }}><div className="empty-icon">📋</div><p>No programs yet.</p></div>}
        </div>

        <div>
          <h2 style={{ fontSize: "17px", fontWeight: "700", marginBottom: "14px" }}>Workout feedback</h2>
          {clientFeedback.slice(0, 6).map((f, i) => (
            <div key={i} className="card" style={{ marginBottom: "8px", padding: "12px 16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                <p style={{ fontSize: "13px", fontWeight: "600" }}>{f.prog} · W{f.week}</p>
                <span style={{ fontFamily: "Syne, sans-serif", fontWeight: "700", fontSize: "16px", color: ratingColor(f.rating) }}>{f.rating}/10</span>
              </div>
              <div style={{ display: "flex", gap: "12px", fontSize: "12px", color: "var(--text3)", marginBottom: f.note !== "" ? "6px" : "0" }}>
                {f.duration > 0 && <span>⏱ {formatDuration(f.duration)}</span>}
                {f.volume > 0 && <span>📊 {f.volume.toLocaleString()} lbs</span>}
              </div>
              {f.note !== "" && <p style={{ fontSize: "12px", color: "var(--text2)", fontStyle: "italic" }}>"{f.note}"</p>}
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

// ─── Programs List ──────────────────────────────────────────────────────────
function ProgramsList({ store, setStore, openProgram }) {
  const deleteProgram = (id, e) => {
    e.stopPropagation();
    if (window.confirm("Delete this program?")) {
      const updated = { ...store, programs: store.programs.filter((p) => p.id !== id) };
      setStore(updated); saveStore(updated);
    }
  };
  return (
    <div>
      <h1 style={{ fontSize: "26px", fontWeight: "800", marginBottom: "28px" }}>All programs</h1>
      {store.programs.map((p) => {
        const client = store.clients.find((c) => c.id === p.clientId);
        return (
          <div key={p.id} className="client-row" onClick={() => openProgram(p)}>
            <div style={{ width: "40px", height: "40px", background: "var(--info-dim)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>📋</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: "600" }}>{p.name}</p>
              <p style={{ fontSize: "13px", color: "var(--text2)", marginTop: "3px" }}>{client ? client.name : "Unknown"} · {p.exercises.length} exercises · {p.weeks} weeks</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span className="chip">{p.createdAt}</span>
              <button className="btn-danger btn-sm" onClick={(e) => deleteProgram(p.id, e)}>Delete</button>
            </div>
          </div>
        );
      })}
      {store.programs.length === 0 && <div className="empty-state"><div className="empty-icon">📋</div><p>No programs yet.</p></div>}
    </div>
  );
}

// ─── Program Editor ─────────────────────────────────────────────────────────
function ProgramEditor({ program, store, setStore, setTab, setSelectedProgram }) {
  const client = store.clients.find((c) => c.id === program.clientId);
  const [prog, setProg] = useState(program);
  const [showAddEx, setShowAddEx] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(null);
  const [exForm, setExForm] = useState({ name: "", type: "weight", sets: "3", reps: "8", videoUrl: "", notes: "" });
  const [showLibPicker, setShowLibPicker] = useState(false);

  const save = (updated) => {
    const newProgs = store.programs.map((p) => p.id === updated.id ? updated : p);
    const newStore = { ...store, programs: newProgs };
    setStore(newStore); saveStore(newStore);
    setProg(updated); setSelectedProgram(updated);
  };

  const addExercise = () => {
    if (exForm.name === "") return;
    const ex = { id: uid(), name: exForm.name, type: exForm.type, sets: parseInt(exForm.sets), reps: exForm.reps, videoUrl: exForm.videoUrl, notes: exForm.notes };
    save({ ...prog, exercises: [...prog.exercises, ex] });
    setShowAddEx(false); setExForm({ name: "", type: "weight", sets: "3", reps: "8", videoUrl: "", notes: "" });
  };

  const addFromLibrary = (libEx) => {
    const ex = { id: uid(), name: libEx.name, type: "weight", sets: 3, reps: "8", videoUrl: libEx.videoUrl, notes: libEx.description };
    save({ ...prog, exercises: [...prog.exercises, ex] });
    setShowLibPicker(false);
  };

  const updateExercise = (id, field, val) => {
    const exercises = prog.exercises.map((e) => {
      if (e.id !== id) return e;
      if (field === "sets") return { ...e, sets: parseInt(val) || 1 };
      return { ...e, [field]: val };
    });
    save({ ...prog, exercises });
  };

  const deleteExercise = (id) => { save({ ...prog, exercises: prog.exercises.filter((e) => e.id !== id) }); };

  return (
    <div>
      <button className="btn-ghost btn-sm" style={{ marginBottom: "20px" }} onClick={() => setTab("clients")}>← Back</button>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "800" }}>{prog.name}</h1>
        <span className="tag tag-blue">{prog.weeks} weeks</span>
      </div>
      <p style={{ fontSize: "13px", color: "var(--text2)", marginBottom: "28px" }}>
        Client: {client ? client.name : "Unknown"} · {prog.exercises.length} exercises · Created {prog.createdAt}
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
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "12px", color: "var(--text3)", fontFamily: "Syne, sans-serif", fontWeight: "700", background: "var(--surface2)", padding: "2px 8px", borderRadius: "6px" }}>{"#" + (idx + 1)}</span>
              <input value={ex.name} onChange={(e) => updateExercise(ex.id, "name", e.target.value)}
                style={{ fontWeight: "700", fontSize: "15px", background: "transparent", border: "none", padding: "0", width: "auto", minWidth: "180px", boxShadow: "none" }} />
              <span className={"tag " + (ex.type === "weight" ? "tag-green" : "tag-blue")}>{ex.type === "weight" ? "Weight" : "Time"}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {ex.videoUrl !== "" && <button className="btn-ghost btn-sm" onClick={() => setShowVideoModal(ex)}>▶ Preview</button>}
              <button className="btn-danger btn-sm" onClick={() => deleteExercise(ex.id)}>✕</button>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 2fr", gap: "10px", marginBottom: "10px" }}>
            <div><label>Sets</label><input type="number" value={ex.sets} onChange={(e) => updateExercise(ex.id, "sets", e.target.value)} /></div>
            <div><label>{ex.type === "weight" ? "Reps" : "Seconds"}</label><input value={ex.reps} onChange={(e) => updateExercise(ex.id, "reps", e.target.value)} /></div>
            <div>
              <label>Type</label>
              <select value={ex.type} onChange={(e) => updateExercise(ex.id, "type", e.target.value)}>
                <option value="weight">Weight</option>
                <option value="time">Time</option>
              </select>
            </div>
            <div><label>Video URL</label><input value={ex.videoUrl} onChange={(e) => updateExercise(ex.id, "videoUrl", e.target.value)} placeholder="https://youtube.com/watch?v=..." /></div>
          </div>
          <div><label>Coaching notes</label><input value={ex.notes} onChange={(e) => updateExercise(ex.id, "notes", e.target.value)} placeholder="Technique cues, tempo, focus points..." /></div>
        </div>
      ))}
      {prog.exercises.length === 0 && <div className="empty-state"><div className="empty-icon">🏋️</div><p>No exercises yet. Add one manually or pick from your library!</p></div>}

      {showLibPicker && (
        <div className="modal-overlay" onClick={() => setShowLibPicker(false)}>
          <div className="modal modal-lg" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "20px", fontWeight: "700" }}>Add from library</h2>
              <button className="btn-ghost btn-sm" onClick={() => setShowLibPicker(false)}>✕ Close</button>
            </div>
            {(store.exerciseLibrary || []).length === 0 && <p style={{ color: "var(--text2)" }}>Your library is empty. Add exercises in the Exercise Library tab first.</p>}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {(store.exerciseLibrary || []).map((ex) => (
                <div key={ex.id} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", background: "var(--surface2)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: "600", fontSize: "14px" }}>{ex.name}</p>
                    {ex.description !== "" && <p style={{ fontSize: "12px", color: "var(--text2)", marginTop: "2px" }}>{ex.description.slice(0, 80)}{ex.description.length > 80 ? "..." : ""}</p>}
                  </div>
                  <span className="tag tag-blue">{ex.category}</span>
                  <button className="btn-primary btn-sm" onClick={() => addFromLibrary(ex)}>+ Add</button>
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
                <div>
                  <label>Type</label>
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
              <button className="btn-primary" onClick={addExercise}>Add exercise</button>
            </div>
          </div>
        </div>
      )}

      {showVideoModal !== null && (
        <div className="modal-overlay" onClick={() => setShowVideoModal(null)}>
          <div className="modal modal-lg" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "18px", fontWeight: "700" }}>{showVideoModal.name}</h2>
              <button className="btn-ghost btn-sm" onClick={() => setShowVideoModal(null)}>✕ Close</button>
            </div>
            <iframe src={getYtEmbed(showVideoModal.videoUrl)} className="video-embed" allowFullScreen title={showVideoModal.name} />
            {showVideoModal.notes !== "" && <p style={{ fontSize: "13px", color: "var(--text2)", marginTop: "12px" }}>📝 {showVideoModal.notes}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Settings ───────────────────────────────────────────────────────────────
function Settings({ store, setStore }) {
  const [coachName, setCoachName] = useState(store.coach.name);
  const [coachPass, setCoachPass] = useState(store.coach.password);
  const [saved, setSaved] = useState(false);

  const saveFn = () => {
    const updated = { ...store, coach: { name: coachName, password: coachPass } };
    setStore(updated); saveStore(updated);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };
  const reset = () => {
    if (window.confirm("Reset ALL data? This cannot be undone.")) { localStorage.removeItem(STORE_KEY); window.location.reload(); }
  };

  return (
    <div style={{ maxWidth: "480px" }}>
      <h1 style={{ fontSize: "26px", fontWeight: "800", marginBottom: "28px" }}>Settings</h1>
      <div className="card" style={{ marginBottom: "16px" }}>
        <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: "700", marginBottom: "16px" }}>Coach account</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div><label>Display name</label><input value={coachName} onChange={(e) => setCoachName(e.target.value)} /></div>
          <div><label>Coach password</label><input value={coachPass} onChange={(e) => setCoachPass(e.target.value)} /></div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "16px" }}>
          <button className="btn-primary" onClick={saveFn}>Save changes</button>
          {saved && <span style={{ fontSize: "13px", color: "var(--accent-dark)", fontWeight: "600" }}>✓ Saved!</span>}
        </div>
      </div>
      <div className="card">
        <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: "700", marginBottom: "8px" }}>Danger zone</h2>
        <p style={{ fontSize: "13px", color: "var(--text2)", marginBottom: "14px" }}>Permanently delete all clients, programs and logs.</p>
        <button className="btn-danger" onClick={reset}>Reset all data</button>
      </div>
    </div>
  );
}

// ─── Client App ─────────────────────────────────────────────────────────────
function ClientApp({ store, setStore, clientId }) {
  const client = store.clients.find((c) => c.id === clientId);
  const programs = store.programs.filter((p) => p.clientId === clientId);
  const [selectedProg, setSelectedProg] = useState(programs.length > 0 ? programs[0] : null);
  const [week, setWeek] = useState(1);
  const [tab, setTab] = useState("workout");
  const [showVideo, setShowVideo] = useState(null);
  const [showLogModal, setShowLogModal] = useState(false);
  const [workoutStartTime] = useState(Date.now());

  if (client === undefined) return <p style={{ padding: "40px", color: "var(--danger)" }}>Client not found.</p>;

  const logKey = (progId, wk) => progId + "_w" + wk;
  const getLog = (progId, wk) => store.logs[logKey(progId, wk)] || {};

  const updateLog = (progId, wk, exId, setIdx, field, val) => {
    const key = logKey(progId, wk);
    const existing = store.logs[key] || {};
    const exLog = existing[exId] || {};
    const sets = exLog.sets ? [...exLog.sets] : [];
    while (sets.length <= setIdx) { sets.push({ reps: "", weight: "", time: "", done: false }); }
    sets[setIdx] = { ...sets[setIdx], [field]: val };
    const newLogs = { ...store.logs, [key]: { ...existing, [exId]: { ...exLog, sets } } };
    const updated = { ...store, logs: newLogs };
    setStore(updated); saveStore(updated);
  };

  const prog = selectedProg;
  const currentLog = prog ? getLog(prog.id, week) : {};

  let completedSets = 0;
  let totalSets = 0;
  let totalVolume = 0;
  if (prog) {
    prog.exercises.forEach((ex) => {
      totalSets += ex.sets;
      const exLog = currentLog[ex.id];
      if (exLog && exLog.sets) {
        exLog.sets.forEach((s) => {
          if (s.done) {
            completedSets++;
            if (ex.type === "weight") {
              const reps = parseFloat(s.reps) || 0;
              const weight = parseFloat(s.weight) || 0;
              totalVolume += reps * weight;
            }
          }
        });
      }
    });
  }
  const pct = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;
  const elapsedSeconds = Math.round((Date.now() - workoutStartTime) / 1000);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <div style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 0 var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "30px", height: "30px", background: "var(--accent)", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", boxShadow: "0 2px 6px rgba(90,191,58,0.3)" }}>⚡</div>
          <span style={{ fontFamily: "Syne, sans-serif", fontWeight: "800", fontSize: "17px" }}>CoachOS</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div className="avatar" style={{ width: "32px", height: "32px", fontSize: "12px" }}>{initials(client.name)}</div>
          <span style={{ fontSize: "14px", fontWeight: "600" }}>{client.name}</span>
        </div>
      </div>

      <div style={{ padding: "24px", maxWidth: "720px", margin: "0 auto" }}>
        {programs.length === 0 ? (
          <div className="empty-state" style={{ marginTop: "60px" }}>
            <div className="empty-icon">⏳</div>
            <p style={{ color: "var(--text2)" }}>No programs assigned yet. Check back soon!</p>
          </div>
        ) : (
          <div>
            {programs.length > 1 && (
              <div style={{ marginBottom: "20px" }}>
                <label>Select program</label>
                <select value={prog ? prog.id : ""} onChange={(e) => { setSelectedProg(programs.find((p) => p.id === e.target.value) || null); setWeek(1); }}>
                  {programs.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
            )}

            {prog !== null && (
              <div>
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                    <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "20px", fontWeight: "800" }}>{prog.name}</h2>
                    <span className="tag tag-green">{pct}% complete</span>
                  </div>
                  <div className="prog-bar"><div className="prog-fill" style={{ width: pct + "%" }} /></div>
                  <p style={{ fontSize: "12px", color: "var(--text3)", marginTop: "4px" }}>{completedSets} of {totalSets} sets done</p>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ marginBottom: "8px", display: "block" }}>Select week</label>
                  <div className="scroll-x">
                    {Array.from({ length: prog.weeks }, (_, i) => i + 1).map((w) => {
                      const wLog = getLog(prog.id, w);
                      let wDone = 0; let wTotal = 0;
                      prog.exercises.forEach((ex) => {
                        wTotal += ex.sets;
                        const exLog = wLog[ex.id];
                        if (exLog && exLog.sets) { exLog.sets.forEach((s) => { if (s.done) wDone++; }); }
                      });
                      const complete = wTotal > 0 && wDone === wTotal;
                      const hasSummary = (store.workoutSummaries || {})[prog.id + "_w" + w];
                      return (
                        <button key={w} className={"week-tab" + (week === w ? " active" : "")} onClick={() => setWeek(w)}>
                          {"W" + w + (hasSummary ? " ✓" : (complete ? " •" : ""))}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
                  {["workout", "history"].map((t) => (
                    <button key={t} onClick={() => setTab(t)}
                      style={{ padding: "8px 20px", borderRadius: "var(--radius)", fontFamily: "Syne, sans-serif", fontWeight: "600", fontSize: "13px",
                        background: tab === t ? "var(--surface)" : "transparent",
                        color: tab === t ? "var(--text)" : "var(--text3)",
                        border: tab === t ? "1px solid var(--border2)" : "1px solid transparent",
                        boxShadow: tab === t ? "var(--shadow)" : "none" }}>
                      {t === "workout" ? "📋 Workout" : "📈 History"}
                    </button>
                  ))}
                </div>

                {tab === "workout" && (
                  <div>
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
                              <p style={{ fontSize: "12px", color: "var(--text2)", marginTop: "2px" }}>
                                {ex.sets} sets · {ex.type === "weight" ? ex.reps + " reps" : ex.reps + "s"}
                              </p>
                              {ex.notes !== "" && <p style={{ fontSize: "12px", color: "var(--text3)", marginTop: "3px" }}>💬 {ex.notes}</p>}
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <span style={{ fontSize: "12px", color: "var(--text2)", fontWeight: "600" }}>{doneSets}/{ex.sets}</span>
                              {ex.videoUrl !== "" && (
                                <button className="btn-ghost btn-sm" onClick={() => setShowVideo(ex)} style={{ fontSize: "12px" }}>▶ Demo</button>
                              )}
                            </div>
                          </div>

                          <div style={{ display: "grid", gridTemplateColumns: "28px 1fr 1fr 44px", gap: "6px", marginBottom: "6px" }}>
                            <div style={{ fontSize: "11px", color: "var(--text3)", paddingTop: "6px", textAlign: "center" }}>#</div>
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
                                  <input type="number" className="set-input" value={s.reps || ""} placeholder={ex.reps}
                                    onChange={(e) => updateLog(prog.id, week, ex.id, si, "reps", e.target.value)} />
                                ) : (
                                  <input type="number" className="set-input" value={s.time || ""} placeholder={ex.reps}
                                    onChange={(e) => updateLog(prog.id, week, ex.id, si, "time", e.target.value)} />
                                )}
                                {ex.type === "weight" ? (
                                  <input type="number" className="set-input" value={s.weight || ""} placeholder="0"
                                    onChange={(e) => updateLog(prog.id, week, ex.id, si, "weight", e.target.value)} />
                                ) : <div />}
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                  <button onClick={() => updateLog(prog.id, week, ex.id, si, "done", s.done ? false : true)}
                                    style={{ width: "34px", height: "34px", borderRadius: "50%",
                                      background: s.done ? "var(--accent)" : "var(--surface2)",
                                      border: "1.5px solid " + (s.done ? "var(--accent)" : "var(--border2)"),
                                      color: s.done ? "#fff" : "var(--text3)", fontSize: "16px",
                                      display: "flex", alignItems: "center", justifyContent: "center",
                                      boxShadow: s.done ? "0 2px 8px rgba(90,191,58,0.3)" : "none" }}>
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
                      <button className="btn-log" onClick={() => setShowLogModal(true)}>
                        Log Workout ✓
                      </button>
                    </div>
                  </div>
                )}

                {tab === "history" && <ProgressHistory prog={prog} store={store} />}
              </div>
            )}
          </div>
        )}
      </div>

      {showVideo !== null && (
        <div className="modal-overlay" onClick={() => setShowVideo(null)}>
          <div className="modal modal-lg" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "18px", fontWeight: "700" }}>{showVideo.name}</h2>
              <button className="btn-ghost btn-sm" onClick={() => setShowVideo(null)}>✕ Close</button>
            </div>
            <iframe src={getYtEmbed(showVideo.videoUrl)} className="video-embed" allowFullScreen title={showVideo.name} />
            {showVideo.notes !== "" && <p style={{ fontSize: "13px", color: "var(--text2)", marginTop: "12px" }}>📝 Coach note: {showVideo.notes}</p>}
          </div>
        </div>
      )}

      {showLogModal && prog !== null && (
        <LogWorkoutModal
          prog={prog} week={week} completedSets={completedSets} totalSets={totalSets}
          totalVolume={totalVolume} elapsedSeconds={elapsedSeconds}
          store={store} setStore={setStore}
          onClose={() => setShowLogModal(false)}
        />
      )}
    </div>
  );
}

// ─── Log Workout Modal ───────────────────────────────────────────────────────
function LogWorkoutModal({ prog, week, completedSets, totalSets, totalVolume, elapsedSeconds, store, setStore, onClose }) {
  const [rating, setRating] = useState(0);
  const [feedbackNote, setFeedbackNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const alreadyLogged = (store.workoutSummaries || {})[prog.id + "_w" + week];

  const submit = () => {
    const key = prog.id + "_w" + week;
    const summary = {
      progId: prog.id, week, completedSets, totalSets,
      totalVolume: Math.round(totalVolume),
      duration: elapsedSeconds,
      rating: rating > 0 ? rating : null,
      feedbackNote,
      loggedAt: new Date().toISOString()
    };
    const updated = { ...store, workoutSummaries: { ...(store.workoutSummaries || {}), [key]: summary } };
    setStore(updated); saveStore(updated);
    setSubmitted(true);
  };

  const ratingColor = (r) => { if (r <= 3) return "#1da85a"; if (r <= 6) return "#e08a1a"; return "#e03f3f"; };
  const ratingLabel = (r) => { if (r === 0) return ""; if (r <= 2) return "Easy"; if (r <= 4) return "Manageable"; if (r <= 6) return "Moderate"; if (r <= 8) return "Hard"; return "Max effort"; };

  if (submitted) {
    return (
      <div className="modal-overlay">
        <div className="modal" style={{ textAlign: "center", padding: "40px 28px" }}>
          <div style={{ fontSize: "52px", marginBottom: "16px" }}>🎉</div>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "22px", fontWeight: "800", marginBottom: "8px" }}>Workout logged!</h2>
          <p style={{ color: "var(--text2)", marginBottom: "24px" }}>Great work this week. Your coach can see your progress.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "24px" }}>
            <div className="metric-box">
              <div className="metric-val">{completedSets}/{totalSets}</div>
              <div className="metric-lbl">Sets done</div>
            </div>
            <div className="metric-box">
              <div className="metric-val">{formatDuration(elapsedSeconds)}</div>
              <div className="metric-lbl">Duration</div>
            </div>
            <div className="metric-box">
              <div className="metric-val">{totalVolume > 0 ? Math.round(totalVolume).toLocaleString() : "—"}</div>
              <div className="metric-lbl">Total lbs</div>
            </div>
          </div>
          <button className="btn-primary" style={{ width: "100%", padding: "12px 0" }} onClick={onClose}>Done</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "22px", fontWeight: "800", marginBottom: "6px" }}>Log workout</h2>
        <p style={{ color: "var(--text2)", fontSize: "13px", marginBottom: "24px" }}>{prog.name} · Week {week}</p>

        {alreadyLogged && (
          <div style={{ background: "var(--warning-dim)", border: "1px solid rgba(224,138,26,0.2)", borderRadius: "var(--radius)", padding: "10px 14px", marginBottom: "16px", fontSize: "13px", color: "var(--warning)" }}>
            ⚠ You already logged this workout. Submitting again will overwrite your previous entry.
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "24px" }}>
          <div className="metric-box">
            <div className="metric-val">{completedSets}/{totalSets}</div>
            <div className="metric-lbl">Sets done</div>
          </div>
          <div className="metric-box">
            <div className="metric-val">{formatDuration(elapsedSeconds)}</div>
            <div className="metric-lbl">Duration</div>
          </div>
          <div className="metric-box">
            <div className="metric-val">{totalVolume > 0 ? Math.round(totalVolume).toLocaleString() : "—"}</div>
            <div className="metric-lbl">Total lbs</div>
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ marginBottom: "10px", display: "block", fontSize: "14px", fontWeight: "600", color: "var(--text)" }}>How hard was this workout? (Difficulty 1–10)</label>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "8px" }}>
            {[1,2,3,4,5,6,7,8,9,10].map((n) => (
              <button key={n} className={"rating-btn" + (rating === n ? " selected" : "")}
                onClick={() => setRating(n)}
                style={{ background: rating === n ? ratingColor(n) : "var(--surface)", borderColor: rating === n ? ratingColor(n) : "var(--border2)", color: rating === n ? "#fff" : "var(--text2)" }}>
                {n}
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p style={{ fontSize: "13px", fontWeight: "600", color: ratingColor(rating) }}>{ratingLabel(rating)}</p>
          )}
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label>Feedback for your coach (optional)</label>
          <textarea value={feedbackNote} onChange={(e) => setFeedbackNote(e.target.value)}
            placeholder="How did it feel? Anything too easy or too hard? Any pain or issues?" rows={3} style={{ resize: "vertical" }} />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn-ghost" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
          <button className="btn-log" style={{ flex: 2, padding: "12px 0", fontSize: "15px" }} onClick={submit}>
            Submit log ✓
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Progress History ────────────────────────────────────────────────────────
function ProgressHistory({ prog, store }) {
  const weeks = Array.from({ length: prog.weeks }, (_, i) => i + 1);
  const summaries = store.workoutSummaries || {};

  return (
    <div>
      <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: "700", marginBottom: "16px" }}>Week-over-week progression</h3>

      <div style={{ marginBottom: "24px" }}>
        <h4 style={{ fontSize: "14px", fontWeight: "600", color: "var(--text2)", marginBottom: "10px" }}>Workout summaries</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {weeks.map((w) => {
            const s = summaries[prog.id + "_w" + w];
            if (!s) return (
              <div key={w} style={{ padding: "10px 14px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontFamily: "Syne, sans-serif", fontWeight: "700", fontSize: "13px", color: "var(--text3)", minWidth: "32px" }}>W{w}</span>
                <span style={{ fontSize: "12px", color: "var(--text3)" }}>Not logged yet</span>
              </div>
            );
            const ratingColor = (r) => { if (!r) return "var(--text3)"; if (r <= 3) return "var(--success)"; if (r <= 6) return "var(--warning)"; return "var(--danger)"; };
            return (
              <div key={w} style={{ padding: "12px 16px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "Syne, sans-serif", fontWeight: "700", fontSize: "14px", color: "var(--accent-dark)", minWidth: "32px" }}>W{w}</span>
                  <span className="chip">{s.completedSets}/{s.totalSets} sets</span>
                  {s.duration > 0 && <span className="chip">⏱ {formatDuration(s.duration)}</span>}
                  {s.totalVolume > 0 && <span className="chip">📊 {s.totalVolume.toLocaleString()} lbs</span>}
                  {s.rating && <span style={{ fontFamily: "Syne, sans-serif", fontWeight: "700", fontSize: "14px", color: ratingColor(s.rating) }}>Difficulty {s.rating}/10</span>}
                </div>
                {s.feedbackNote && s.feedbackNote !== "" && (
                  <p style={{ fontSize: "12px", color: "var(--text2)", marginTop: "8px", fontStyle: "italic" }}>"{s.feedbackNote}"</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <h4 style={{ fontSize: "14px", fontWeight: "600", color: "var(--text2)", marginBottom: "10px" }}>Exercise progression</h4>
      {prog.exercises.map((ex) => {
        const weekData = [];
        weeks.forEach((w) => {
          const log = store.logs[prog.id + "_w" + w] || {};
          const exLog = log[ex.id];
          if (exLog && exLog.sets) {
            const doneSets = exLog.sets.filter((s) => s.done);
            if (doneSets.length > 0) {
              if (ex.type === "weight") {
                const weights = doneSets.map((s) => parseFloat(s.weight) || 0);
                const maxW = Math.max(...weights);
                const totalReps = doneSets.reduce((a, s) => a + (parseFloat(s.reps) || 0), 0);
                const avgR = Math.round(totalReps / doneSets.length);
                weekData.push({ week: w, maxWeight: maxW, avgReps: avgR, sets: doneSets.length });
              } else {
                const totalTime = doneSets.reduce((a, s) => a + (parseFloat(s.time) || 0), 0);
                const avgTime = Math.round(totalTime / doneSets.length);
                weekData.push({ week: w, avgTime, sets: doneSets.length });
              }
            }
          }
        });

        return (
          <div key={ex.id} className="exercise-row" style={{ marginBottom: "12px" }}>
            <p style={{ fontWeight: "700", marginBottom: "10px" }}>{ex.name}</p>
            {weekData.length === 0 ? (
              <p style={{ fontSize: "12px", color: "var(--text3)" }}>No logged data yet</p>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", color: "var(--text3)", fontWeight: "500", padding: "4px 8px", fontSize: "11px" }}>Week</th>
                    <th style={{ textAlign: "center", color: "var(--text3)", fontWeight: "500", padding: "4px 8px", fontSize: "11px" }}>Sets done</th>
                    {ex.type === "weight" ? (
                      <th style={{ textAlign: "center", color: "var(--text3)", fontWeight: "500", padding: "4px 8px", fontSize: "11px" }}>Max weight</th>
                    ) : (
                      <th style={{ textAlign: "center", color: "var(--text3)", fontWeight: "500", padding: "4px 8px", fontSize: "11px" }}>Avg time (s)</th>
                    )}
                    {ex.type === "weight" && <th style={{ textAlign: "center", color: "var(--text3)", fontWeight: "500", padding: "4px 8px", fontSize: "11px" }}>Avg reps</th>}
                  </tr>
                </thead>
                <tbody>
                  {weekData.map((d, i) => {
                    const prev = i > 0 ? weekData[i - 1] : null;
                    let improved = false;
                    if (prev !== null) {
                      if (ex.type === "weight" && d.maxWeight !== undefined && prev.maxWeight !== undefined) { improved = d.maxWeight > prev.maxWeight; }
                      else if (ex.type === "time" && d.avgTime !== undefined && prev.avgTime !== undefined) { improved = d.avgTime > prev.avgTime; }
                    }
                    return (
                      <tr key={d.week} style={{ borderTop: "1px solid var(--border)" }}>
                        <td style={{ padding: "8px", fontWeight: "700", fontFamily: "Syne, sans-serif", color: "var(--accent-dark)" }}>{"W" + d.week}</td>
                        <td style={{ padding: "8px", textAlign: "center", color: "var(--text2)" }}>{d.sets}</td>
                        {ex.type === "weight" ? (
                          <td style={{ padding: "8px", textAlign: "center", color: improved ? "var(--accent-dark)" : "var(--text)", fontWeight: improved ? "700" : "400" }}>
                            {d.maxWeight !== undefined && d.maxWeight > 0 ? d.maxWeight + " lbs" : "—"}{improved ? " ↑" : ""}
                          </td>
                        ) : (
                          <td style={{ padding: "8px", textAlign: "center", color: improved ? "var(--accent-dark)" : "var(--text)", fontWeight: improved ? "700" : "400" }}>
                            {d.avgTime !== undefined ? d.avgTime + "s" : "—"}{improved ? " ↑" : ""}
                          </td>
                        )}
                        {ex.type === "weight" && <td style={{ padding: "8px", textAlign: "center", color: "var(--text2)" }}>{d.avgReps || "—"}</td>}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Root ────────────────────────────────────────────────────────────────────
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