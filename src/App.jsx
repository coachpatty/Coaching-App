import { useState, useEffect, useCallback } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');`;

const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #0d0f0e;
    --surface: #151817;
    --surface2: #1c201e;
    --surface3: #232826;
    --border: rgba(255,255,255,0.07);
    --border2: rgba(255,255,255,0.12);
    --accent: #b8f06a;
    --accent2: #7ee8a2;
    --accent-dim: rgba(184,240,106,0.12);
    --text: #f0f2ee;
    --text2: #9aa396;
    --text3: #627065;
    --danger: #ff6b6b;
    --danger-dim: rgba(255,107,107,0.12);
    --warning: #ffc46b;
    --info: #6bbfff;
    --info-dim: rgba(107,191,255,0.12);
    --radius: 10px;
    --radius-lg: 16px;
    --radius-xl: 22px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    color: var(--text);
    background: var(--bg);
    -webkit-font-smoothing: antialiased;
  }
  body { background: var(--bg); min-height: 100vh; }
  h1,h2,h3,h4 { font-family: 'Syne', sans-serif; letter-spacing: -0.02em; }
  input, textarea, select {
    background: var(--surface2);
    border: 1px solid var(--border2);
    border-radius: var(--radius);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    padding: 9px 13px;
    outline: none;
    width: 100%;
    transition: border-color 0.15s;
  }
  input:focus, textarea:focus, select:focus { border-color: var(--accent); }
  select option { background: var(--surface2); }
  button { cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 14px; border: none; border-radius: var(--radius); transition: all 0.15s; }
  label { font-size: 12px; color: var(--text2); font-weight: 500; letter-spacing: 0.03em; display: block; margin-bottom: 5px; }
  .btn-primary {
    background: var(--accent); color: #0d0f0e; font-weight: 600;
    padding: 10px 20px; font-family: 'Syne', sans-serif;
  }
  .btn-primary:hover { background: #cdf58a; }
  .btn-ghost {
    background: transparent; color: var(--text2); border: 1px solid var(--border2);
    padding: 8px 16px;
  }
  .btn-ghost:hover { background: var(--surface2); color: var(--text); border-color: var(--border2); }
  .btn-danger { background: var(--danger-dim); color: var(--danger); padding: 7px 14px; border: 1px solid rgba(255,107,107,0.2); }
  .btn-danger:hover { background: rgba(255,107,107,0.2); }
  .btn-sm { padding: 6px 12px; font-size: 13px; }
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 20px;
  }
  .tag {
    display: inline-block; font-size: 11px; font-weight: 600;
    padding: 3px 9px; border-radius: 20px; letter-spacing: 0.04em;
    font-family: 'Syne', sans-serif;
  }
  .tag-green { background: var(--accent-dim); color: var(--accent); }
  .tag-blue { background: var(--info-dim); color: var(--info); }
  .tag-red { background: var(--danger-dim); color: var(--danger); }
  .divider { border: none; border-top: 1px solid var(--border); margin: 16px 0; }
  .flex { display: flex; }
  .flex-col { display: flex; flex-direction: column; }
  .items-center { align-items: center; }
  .gap-2 { gap: 8px; }
  .gap-3 { gap: 12px; }
  .gap-4 { gap: 16px; }
  .mt-1 { margin-top: 4px; }
  .mt-2 { margin-top: 8px; }
  .mt-3 { margin-top: 12px; }
  .mt-4 { margin-top: 16px; }
  .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
  .grid4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 10px; }
  .text-sm { font-size: 13px; }
  .text-xs { font-size: 11px; }
  .text-muted { color: var(--text2); }
  .text-accent { color: var(--accent); }
  .text-danger { color: var(--danger); }
  .text-right { text-align: right; }
  .w-full { width: 100%; }
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.7);
    display: flex; align-items: center; justify-content: center;
    z-index: 1000; padding: 20px;
  }
  .modal {
    background: var(--surface); border: 1px solid var(--border2);
    border-radius: var(--radius-xl); padding: 28px; width: 100%;
    max-width: 560px; max-height: 90vh; overflow-y: auto;
  }
  .modal-lg { max-width: 720px; }
  .sidebar {
    width: 220px; min-width: 220px; background: var(--surface);
    border-right: 1px solid var(--border); padding: 20px 12px;
    display: flex; flex-direction: column; gap: 4px; min-height: 100vh;
  }
  .nav-item {
    display: flex; align-items: center; gap: 10px; padding: 9px 12px;
    border-radius: var(--radius); color: var(--text2); font-size: 14px;
    cursor: pointer; transition: all 0.12s; font-weight: 500;
    border: none; background: transparent; width: 100%; text-align: left;
  }
  .nav-item:hover { background: var(--surface2); color: var(--text); }
  .nav-item.active { background: var(--accent-dim); color: var(--accent); }
  .nav-icon { font-size: 16px; width: 20px; text-align: center; }
  .main { flex: 1; padding: 32px; overflow-y: auto; max-height: 100vh; }
  .page-title { font-size: 26px; font-weight: 700; color: var(--text); }
  .section-title { font-size: 18px; font-weight: 700; color: var(--text); }
  .stat-card {
    background: var(--surface2); border: 1px solid var(--border);
    border-radius: var(--radius-lg); padding: 16px 20px;
  }
  .stat-num { font-size: 28px; font-weight: 700; font-family: 'Syne', sans-serif; color: var(--accent); }
  .stat-label { font-size: 12px; color: var(--text2); font-weight: 500; margin-top: 2px; }
  .exercise-row {
    background: var(--surface2); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 14px 16px; margin-bottom: 10px;
  }
  .set-row { display: grid; grid-template-columns: 40px 1fr 1fr 1fr 36px; gap: 8px; align-items: center; margin-bottom: 6px; }
  .set-num { font-size: 12px; color: var(--text3); font-weight: 600; text-align: center; padding: 8px 0; }
  .set-input { padding: 7px 10px; text-align: center; font-size: 13px; }
  .log-row { display: grid; grid-template-columns: 40px 1fr 1fr 1fr; gap: 8px; align-items: center; margin-bottom: 6px; }
  .prog-bar { background: var(--surface3); border-radius: 4px; height: 6px; overflow: hidden; margin-top: 6px; }
  .prog-fill { height: 100%; border-radius: 4px; background: var(--accent); transition: width 0.4s ease; }
  .video-embed { width: 100%; aspect-ratio: 16/9; border-radius: var(--radius); border: none; background: #000; }
  .chip { display: inline-flex; align-items: center; gap: 6px; background: var(--surface3); border: 1px solid var(--border); border-radius: 20px; padding: 4px 12px; font-size: 12px; color: var(--text2); }
  .avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--accent-dim); color: var(--accent); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; font-family: 'Syne', sans-serif; flex-shrink: 0; }
  .client-row { display: flex; align-items: center; gap: 12px; padding: 14px 16px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); margin-bottom: 8px; cursor: pointer; transition: border-color 0.15s; }
  .client-row:hover { border-color: var(--border2); }
  .week-tab { padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 500; cursor: pointer; border: 1px solid var(--border2); background: transparent; color: var(--text2); transition: all 0.12s; }
  .week-tab.active { background: var(--accent); color: #0d0f0e; border-color: var(--accent); font-family: 'Syne', sans-serif; }
  .scroll-x { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; flex-wrap: wrap; }
  .empty-state { text-align: center; padding: 48px 24px; color: var(--text3); }
  .empty-state .icon { font-size: 40px; margin-bottom: 12px; }
  input[type=number]::-webkit-inner-spin-button { opacity: 0.5; }
  .badge-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); display: inline-block; }
`;

// ─── Storage helpers ───────────────────────────────────────────────────────
const STORE_KEY = "coachapp_v2";
const loadStore = () => {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
};
const saveStore = (data) => {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch {}
};

// ─── Default data ──────────────────────────────────────────────────────────
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
        { id: "e2", name: "Romanian Deadlift", type: "weight", sets: 3, reps: "8", videoUrl: "https://www.youtube.com/embed/JCXUYuzwNrM", notes: "Hinge at the hips, soft knee bend" },
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
  logs: {}
};

// ─── Utils ──────────────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 9);
const initials = (name) => name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0,2);
const getYtEmbed = (url) => {
  if (!url) return "";
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (m) return `https://www.youtube.com/embed/${m[1]}`;
  if (url.includes("vimeo.com")) {
    const vm = url.match(/vimeo\.com\/(\d+)/);
    if (vm) return `https://player.vimeo.com/video/${vm[1]}`;
  }
  return url;
};

// ─── Login Screen ──────────────────────────────────────────────────────────
function Login({ store, onLogin }) {
  const [mode, setMode] = useState("coach");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const handleLogin = () => {
    setErr("");
    if (mode === "coach") {
      if (pass === store.coach.password) { onLogin({ role: "coach" }); }
      else setErr("Wrong password.");
    } else {
      const client = store.clients.find(c => c.email.toLowerCase() === email.toLowerCase() && c.password === pass);
      if (client) onLogin({ role: "client", clientId: client.id });
      else setErr("Email or password not found.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{ width: 36, height: 36, background: "var(--accent)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 18 }}>⚡</span>
            </div>
            <span style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em" }}>CoachOS</span>
          </div>
          <p style={{ color: "var(--text2)", fontSize: 14, marginTop: 6 }}>Your personal coaching platform</p>
        </div>

        <div className="card" style={{ padding: 28 }}>
          <div className="flex gap-2" style={{ marginBottom: 24 }}>
            {["coach", "client"].map(m => (
              <button key={m} onClick={() => { setMode(m); setErr(""); }}
                style={{ flex: 1, padding: "9px 0", borderRadius: "var(--radius)", fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 14,
                  background: mode === m ? "var(--accent)" : "var(--surface2)",
                  color: mode === m ? "#0d0f0e" : "var(--text2)",
                  border: mode === m ? "none" : "1px solid var(--border2)" }}>
                {m === "coach" ? "🏋️ Coach" : "👤 Client"}
              </button>
            ))}
          </div>

          {mode === "client" && (
            <div style={{ marginBottom: 14 }}>
              <label>Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" type="email" />
            </div>
          )}
          <div style={{ marginBottom: 18 }}>
            <label>Password</label>
            <input value={pass} onChange={e => setPass(e.target.value)} type="password" placeholder="••••••••"
              onKeyDown={e => e.key === "Enter" && handleLogin()} />
          </div>
          {err && <p style={{ color: "var(--danger)", fontSize: 13, marginBottom: 12 }}>⚠ {err}</p>}
          <button className="btn-primary w-full" style={{ padding: "11px 0", fontSize: 15 }} onClick={handleLogin}>Sign in</button>

          <p style={{ color: "var(--text3)", fontSize: 12, textAlign: "center", marginTop: 16 }}>
            {mode === "coach" ? "Default coach password: coach123" : "Ask your coach for your login credentials"}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Coach App ─────────────────────────────────────────────────────────────
function CoachApp({ store, setStore }) {
  const [tab, setTab] = useState("dashboard");
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [modal, setModal] = useState(null);

  const clients = store.clients;
  const programs = store.programs;

  const openClient = (client) => { setSelectedClient(client); setTab("client-detail"); };
  const openProgram = (prog) => { setSelectedProgram(prog); setTab("program-editor"); };

  const nav = [
    { id: "dashboard", icon: "▦", label: "Dashboard" },
    { id: "clients", icon: "◉", label: "Clients" },
    { id: "programs", icon: "≡", label: "Programs" },
    { id: "settings", icon: "⚙", label: "Settings" },
  ];

  return (
    <div className="flex" style={{ minHeight: "100vh" }}>
      <div className="sidebar">
        <div className="flex items-center gap-2" style={{ padding: "8px 12px 20px" }}>
          <div style={{ width: 28, height: 28, background: "var(--accent)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>⚡</div>
          <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 16, letterSpacing: "-0.02em" }}>CoachOS</span>
        </div>
        {nav.map(n => (
          <button key={n.id} className={`nav-item ${tab === n.id || (tab === "client-detail" && n.id === "clients") || (tab === "program-editor" && n.id === "programs") ? "active" : ""}`}
            onClick={() => { setTab(n.id); setSelectedClient(null); setSelectedProgram(null); }}>
            <span className="nav-icon">{n.icon}</span> {n.label}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ padding: "12px", borderTop: "1px solid var(--border)", marginTop: 8 }}>
          <p style={{ fontSize: 12, color: "var(--text3)" }}>Logged in as</p>
          <p style={{ fontSize: 14, fontWeight: 500, color: "var(--text2)", marginTop: 2 }}>{store.coach.name}</p>
        </div>
      </div>

      <div className="main">
        {tab === "dashboard" && <CoachDashboard store={store} clients={clients} programs={programs} openClient={openClient} openProgram={openProgram} />}
        {tab === "clients" && <ClientsList clients={clients} programs={programs} store={store} setStore={setStore} openClient={openClient} />}
        {tab === "client-detail" && selectedClient && <ClientDetail client={selectedClient} store={store} setStore={setStore} openProgram={openProgram} setTab={setTab} />}
        {tab === "programs" && <ProgramsList programs={programs} clients={clients} store={store} setStore={setStore} openProgram={openProgram} />}
        {tab === "program-editor" && selectedProgram && <ProgramEditor program={selectedProgram} store={store} setStore={setStore} clients={clients} setTab={setTab} setSelectedProgram={setSelectedProgram} />}
        {tab === "settings" && <Settings store={store} setStore={setStore} />}
      </div>
    </div>
  );
}

function CoachDashboard({ store, clients, programs, openClient, openProgram }) {
  const totalLogs = Object.keys(store.logs).length;
  const recentClients = clients.slice(0, 3);

  return (
    <div>
      <p style={{ color: "var(--text2)", marginBottom: 4, fontSize: 14 }}>Good to see you,</p>
      <h1 className="page-title" style={{ marginBottom: 28 }}>{store.coach.name} 👋</h1>

      <div className="grid4" style={{ marginBottom: 28 }}>
        {[
          { num: clients.length, label: "Active clients" },
          { num: programs.length, label: "Programs" },
          { num: programs.reduce((a,p) => a + p.exercises.length, 0), label: "Exercises" },
          { num: totalLogs, label: "Workout logs" },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid2">
        <div>
          <h2 className="section-title" style={{ marginBottom: 14 }}>Recent clients</h2>
          {recentClients.map(c => {
            const prog = programs.filter(p => p.clientId === c.id);
            return (
              <div key={c.id} className="client-row" onClick={() => openClient(c)}>
                <div className="avatar">{initials(c.name)}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 500, fontSize: 14 }}>{c.name}</p>
                  <p style={{ fontSize: 12, color: "var(--text3)", marginTop: 2 }}>{prog.length} program{prog.length !== 1 ? "s" : ""}</p>
                </div>
                <span className="tag tag-green">{prog.length > 0 ? "Active" : "No program"}</span>
              </div>
            );
          })}
          {clients.length === 0 && <p className="text-muted text-sm">No clients yet — add one in Clients.</p>}
        </div>

        <div>
          <h2 className="section-title" style={{ marginBottom: 14 }}>Recent programs</h2>
          {programs.slice(0, 4).map(p => {
            const client = store.clients.find(c => c.id === p.clientId);
            return (
              <div key={p.id} className="client-row" onClick={() => openProgram(p)}>
                <div style={{ width: 36, height: 36, background: "var(--info-dim)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>📋</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 500, fontSize: 14 }}>{p.name}</p>
                  <p style={{ fontSize: 12, color: "var(--text3)", marginTop: 2 }}>{client?.name} · {p.exercises.length} exercises · {p.weeks}w</p>
                </div>
              </div>
            );
          })}
          {programs.length === 0 && <p className="text-muted text-sm">No programs yet — create one in Programs.</p>}
        </div>
      </div>
    </div>
  );
}

function ClientsList({ clients, programs, store, setStore, openClient }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", goal: "" });

  const addClient = () => {
    if (!form.name || !form.email || !form.password) return;
    const newClient = { id: uid(), ...form, joinDate: new Date().toISOString().slice(0,10) };
    const updated = { ...store, clients: [...store.clients, newClient] };
    setStore(updated); saveStore(updated);
    setShowAdd(false); setForm({ name: "", email: "", password: "", goal: "" });
  };

  const deleteClient = (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Remove this client? Their programs will be removed too.")) return;
    const updated = { ...store, clients: store.clients.filter(c => c.id !== id), programs: store.programs.filter(p => p.clientId !== id) };
    setStore(updated); saveStore(updated);
  };

  return (
    <div>
      <div className="flex items-center" style={{ marginBottom: 28, justifyContent: "space-between" }}>
        <h1 className="page-title">Clients</h1>
        <button className="btn-primary" onClick={() => setShowAdd(true)}>+ Add client</button>
      </div>

      {clients.map(c => {
        const progs = programs.filter(p => p.clientId === c.id);
        return (
          <div key={c.id} className="client-row" onClick={() => openClient(c)}>
            <div className="avatar">{initials(c.name)}</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 500 }}>{c.name}</p>
              <p className="text-sm text-muted mt-1">{c.email}</p>
              {c.goal && <p className="text-xs" style={{ color: "var(--text3)", marginTop: 3 }}>Goal: {c.goal}</p>}
            </div>
            <div className="flex items-center gap-3">
              <span className="chip">{progs.length} program{progs.length !== 1 ? "s" : ""}</span>
              <button className="btn-danger btn-sm" onClick={(e) => deleteClient(c.id, e)}>Remove</button>
            </div>
          </div>
        );
      })}
      {clients.length === 0 && (
        <div className="empty-state"><div className="icon">👤</div><p>No clients yet. Add your first client!</p></div>
      )}

      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Add new client</h2>
            <div className="flex-col gap-3">
              <div><label>Full name *</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Alex Johnson" /></div>
              <div><label>Email *</label><input value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="alex@email.com" type="email" /></div>
              <div><label>Password (client login) *</label><input value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="Set a password for them" /></div>
              <div><label>Goal / notes</label><input value={form.goal} onChange={e => setForm({...form, goal: e.target.value})} placeholder="e.g. Build strength, lose 15lbs" /></div>
            </div>
            <div className="flex gap-3 mt-4" style={{ justifyContent: "flex-end" }}>
              <button className="btn-ghost" onClick={() => setShowAdd(false)}>Cancel</button>
              <button className="btn-primary" onClick={addClient}>Add client</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ClientDetail({ client, store, setStore, openProgram, setTab }) {
  const programs = store.programs.filter(p => p.clientId === client.id);
  const [showAddProg, setShowAddProg] = useState(false);
  const [progForm, setProgForm] = useState({ name: "", weeks: 4 });

  const createProgram = () => {
    if (!progForm.name) return;
    const newProg = { id: uid(), clientId: client.id, name: progForm.name, weeks: Number(progForm.weeks), createdAt: new Date().toISOString().slice(0,10), exercises: [] };
    const updated = { ...store, programs: [...store.programs, newProg] };
    setStore(updated); saveStore(updated);
    setShowAddProg(false); setProgForm({ name: "", weeks: 4 });
    openProgram(newProg);
  };

  return (
    <div>
      <button className="btn-ghost btn-sm" style={{ marginBottom: 20 }} onClick={() => setTab("clients")}>← Back to clients</button>
      <div className="flex items-center gap-3" style={{ marginBottom: 28 }}>
        <div className="avatar" style={{ width: 52, height: 52, fontSize: 20 }}>{initials(client.name)}</div>
        <div>
          <h1 className="page-title">{client.name}</h1>
          <p className="text-sm text-muted">{client.email} · Joined {client.joinDate}</p>
          {client.goal && <span className="tag tag-blue" style={{ marginTop: 6, display: "inline-block" }}>{client.goal}</span>}
        </div>
        <div style={{ marginLeft: "auto" }}>
          <p className="text-xs text-muted">Client password</p>
          <p className="text-sm" style={{ fontFamily: "monospace", background: "var(--surface2)", padding: "4px 10px", borderRadius: 6, marginTop: 4 }}>{client.password}</p>
        </div>
      </div>

      <div className="flex items-center" style={{ justifyContent: "space-between", marginBottom: 14 }}>
        <h2 className="section-title">Programs</h2>
        <button className="btn-primary btn-sm" onClick={() => setShowAddProg(true)}>+ New program</button>
      </div>

      {programs.map(p => (
        <div key={p.id} className="client-row" onClick={() => openProgram(p)}>
          <div style={{ width: 36, height: 36, background: "var(--info-dim)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>📋</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 500 }}>{p.name}</p>
            <p className="text-sm text-muted mt-1">{p.exercises.length} exercises · {p.weeks} weeks · Created {p.createdAt}</p>
          </div>
          <span className="tag tag-green">Edit</span>
        </div>
      ))}
      {programs.length === 0 && <div className="empty-state"><div className="icon">📋</div><p>No programs yet. Create the first one!</p></div>}

      {showAddProg && (
        <div className="modal-overlay" onClick={() => setShowAddProg(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 20 }}>New program for {client.name}</h2>
            <div className="flex-col gap-3">
              <div><label>Program name *</label><input value={progForm.name} onChange={e => setProgForm({...progForm, name: e.target.value})} placeholder="e.g. Strength Block 1" /></div>
              <div><label>Number of weeks</label><input type="number" min="1" max="52" value={progForm.weeks} onChange={e => setProgForm({...progForm, weeks: e.target.value})} /></div>
            </div>
            <div className="flex gap-3 mt-4" style={{ justifyContent: "flex-end" }}>
              <button className="btn-ghost" onClick={() => setShowAddProg(false)}>Cancel</button>
              <button className="btn-primary" onClick={createProgram}>Create & build →</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProgramsList({ programs, clients, store, setStore, openProgram }) {
  const deleteProgram = (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Delete this program?")) return;
    const updated = { ...store, programs: store.programs.filter(p => p.id !== id) };
    setStore(updated); saveStore(updated);
  };

  return (
    <div>
      <h1 className="page-title" style={{ marginBottom: 28 }}>All programs</h1>
      {programs.map(p => {
        const client = clients.find(c => c.id === p.clientId);
        return (
          <div key={p.id} className="client-row" onClick={() => openProgram(p)}>
            <div style={{ width: 40, height: 40, background: "var(--info-dim)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>📋</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 500 }}>{p.name}</p>
              <p className="text-sm text-muted mt-1">{client?.name || "Unknown"} · {p.exercises.length} exercises · {p.weeks} weeks</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="chip">{p.createdAt}</span>
              <button className="btn-danger btn-sm" onClick={(e) => deleteProgram(p.id, e)}>Delete</button>
            </div>
          </div>
        );
      })}
      {programs.length === 0 && <div className="empty-state"><div className="icon">📋</div><p>No programs yet. Go to a client to create one.</p></div>}
    </div>
  );
}

function ProgramEditor({ program, store, setStore, clients, setTab, setSelectedProgram }) {
  const client = clients.find(c => c.id === program.clientId);
  const [prog, setProg] = useState(program);
  const [showAddEx, setShowAddEx] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(null);
  const [exForm, setExForm] = useState({ name: "", type: "weight", sets: 3, reps: "8", videoUrl: "", notes: "" });

  const save = (updated) => {
    const newProgs = store.programs.map(p => p.id === updated.id ? updated : p);
    const newStore = { ...store, programs: newProgs };
    setStore(newStore); saveStore(newStore);
    setProg(updated); setSelectedProgram(updated);
  };

  const addExercise = () => {
    if (!exForm.name) return;
    const ex = { id: uid(), ...exForm, sets: Number(exForm.sets) };
    const updated = { ...prog, exercises: [...prog.exercises, ex] };
    save(updated);
    setShowAddEx(false); setExForm({ name: "", type: "weight", sets: 3, reps: "8", videoUrl: "", notes: "" });
  };

  const updateExercise = (id, field, val) => {
    const updated = { ...prog, exercises: prog.exercises.map(e => e.id === id ? { ...e, [field]: field === "sets" ? Number(val) : val } : e) };
    save(updated);
  };

  const deleteExercise = (id) => {
    const updated = { ...prog, exercises: prog.exercises.filter(e => e.id !== id) };
    save(updated);
  };

  return (
    <div>
      <button className="btn-ghost btn-sm" style={{ marginBottom: 20 }} onClick={() => setTab("clients")}>← Back</button>
      <div className="flex items-center" style={{ marginBottom: 6, gap: 12 }}>
        <h1 className="page-title">{prog.name}</h1>
        <span className="tag tag-blue">{prog.weeks}w</span>
      </div>
      <p className="text-sm text-muted" style={{ marginBottom: 28 }}>Client: {client?.name} · {prog.exercises.length} exercises · Created {prog.createdAt}</p>

      <div className="flex items-center" style={{ justifyContent: "space-between", marginBottom: 16 }}>
        <h2 className="section-title">Exercises</h2>
        <button className="btn-primary btn-sm" onClick={() => setShowAddEx(true)}>+ Add exercise</button>
      </div>

      {prog.exercises.map((ex, idx) => (
        <div key={ex.id} className="exercise-row">
          <div className="flex items-center" style={{ justifyContent: "space-between", marginBottom: 10 }}>
            <div className="flex items-center gap-2">
              <span style={{ fontSize: 12, color: "var(--text3)", fontFamily: "Syne, sans-serif", fontWeight: 700 }}>#{idx + 1}</span>
              <input value={ex.name} onChange={e => updateExercise(ex.id, "name", e.target.value)}
                style={{ fontWeight: 600, fontSize: 15, background: "transparent", border: "none", padding: "0", width: "auto", minWidth: 180 }} />
              <span className={`tag ${ex.type === "weight" ? "tag-green" : "tag-blue"}`}>{ex.type === "weight" ? "Weight" : "Time"}</span>
            </div>
            <div className="flex items-center gap-2">
              {ex.videoUrl && (
                <button className="btn-ghost btn-sm" onClick={() => setShowVideoModal(ex)}>▶ Preview</button>
              )}
              <button className="btn-danger btn-sm" onClick={() => deleteExercise(ex.id)}>✕</button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 2fr", gap: 10, marginBottom: 10 }}>
            <div><label>Sets</label><input type="number" value={ex.sets} onChange={e => updateExercise(ex.id, "sets", e.target.value)} className="set-input" /></div>
            <div><label>{ex.type === "weight" ? "Reps" : "Seconds"}</label><input value={ex.reps} onChange={e => updateExercise(ex.id, "reps", e.target.value)} className="set-input" /></div>
            <div>
              <label>Type</label>
              <select value={ex.type} onChange={e => updateExercise(ex.id, "type", e.target.value)}>
                <option value="weight">Weight</option>
                <option value="time">Time</option>
              </select>
            </div>
            <div><label>Video URL (YouTube / Vimeo)</label><input value={ex.videoUrl} onChange={e => updateExercise(ex.id, "videoUrl", e.target.value)} placeholder="https://youtube.com/watch?v=..." /></div>
          </div>
          <div><label>Coaching notes</label><input value={ex.notes} onChange={e => updateExercise(ex.id, "notes", e.target.value)} placeholder="Technique cues, tempo, etc." /></div>
        </div>
      ))}

      {prog.exercises.length === 0 && <div className="empty-state"><div className="icon">🏋️</div><p>No exercises yet. Add your first movement!</p></div>}

      {showAddEx && (
        <div className="modal-overlay" onClick={() => setShowAddEx(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Add exercise</h2>
            <div className="flex-col gap-3">
              <div><label>Exercise name *</label><input value={exForm.name} onChange={e => setExForm({...exForm, name: e.target.value})} placeholder="e.g. Back Squat" /></div>
              <div className="grid2">
                <div><label>Sets</label><input type="number" value={exForm.sets} onChange={e => setExForm({...exForm, sets: e.target.value})} /></div>
                <div>
                  <label>Type</label>
                  <select value={exForm.type} onChange={e => setExForm({...exForm, type: e.target.value})}>
                    <option value="weight">Weight (reps)</option>
                    <option value="time">Time (seconds)</option>
                  </select>
                </div>
              </div>
              <div><label>{exForm.type === "weight" ? "Reps" : "Seconds"}</label><input value={exForm.reps} onChange={e => setExForm({...exForm, reps: e.target.value})} placeholder={exForm.type === "weight" ? "e.g. 8 or 8-10" : "e.g. 30"} /></div>
              <div><label>Video URL (YouTube / Vimeo)</label><input value={exForm.videoUrl} onChange={e => setExForm({...exForm, videoUrl: e.target.value})} placeholder="https://youtube.com/watch?v=..." /></div>
              <div><label>Coaching notes</label><textarea value={exForm.notes} onChange={e => setExForm({...exForm, notes: e.target.value})} placeholder="Technique cues, focus points..." rows={2} style={{ resize: "vertical" }} /></div>
            </div>
            <div className="flex gap-3 mt-4" style={{ justifyContent: "flex-end" }}>
              <button className="btn-ghost" onClick={() => setShowAddEx(false)}>Cancel</button>
              <button className="btn-primary" onClick={addExercise}>Add exercise</button>
            </div>
          </div>
        </div>
      )}

      {showVideoModal && (
        <div className="modal-overlay" onClick={() => setShowVideoModal(null)}>
          <div className="modal modal-lg" onClick={e => e.stopPropagation()}>
            <div className="flex items-center" style={{ justifyContent: "space-between", marginBottom: 16 }}>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 18, fontWeight: 700 }}>{showVideoModal.name}</h2>
              <button className="btn-ghost btn-sm" onClick={() => setShowVideoModal(null)}>✕ Close</button>
            </div>
            <iframe src={getYtEmbed(showVideoModal.videoUrl)} className="video-embed" allowFullScreen title={showVideoModal.name} />
            {showVideoModal.notes && <p className="text-sm text-muted" style={{ marginTop: 12 }}>📝 {showVideoModal.notes}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

function Settings({ store, setStore }) {
  const [coachName, setCoachName] = useState(store.coach.name);
  const [coachPass, setCoachPass] = useState(store.coach.password);
  const [saved, setSaved] = useState(false);

  const save = () => {
    const updated = { ...store, coach: { name: coachName, password: coachPass } };
    setStore(updated); saveStore(updated);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  const reset = () => {
    if (!window.confirm("Reset ALL data? This cannot be undone.")) return;
    localStorage.removeItem(STORE_KEY);
    window.location.reload();
  };

  return (
    <div style={{ maxWidth: 480 }}>
      <h1 className="page-title" style={{ marginBottom: 28 }}>Settings</h1>
      <div className="card">
        <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, marginBottom: 16 }}>Coach account</h2>
        <div className="flex-col gap-3">
          <div><label>Display name</label><input value={coachName} onChange={e => setCoachName(e.target.value)} /></div>
          <div><label>Coach password</label><input value={coachPass} onChange={e => setCoachPass(e.target.value)} /></div>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <button className="btn-primary" onClick={save}>Save changes</button>
          {saved && <span className="text-sm text-accent">✓ Saved!</span>}
        </div>
      </div>

      <div className="card mt-4">
        <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, marginBottom: 8 }}>Danger zone</h2>
        <p className="text-sm text-muted" style={{ marginBottom: 14 }}>This will delete all clients, programs, and logs.</p>
        <button className="btn-danger" onClick={reset}>Reset all data</button>
      </div>
    </div>
  );
}

// ─── Client App ─────────────────────────────────────────────────────────────
function ClientApp({ store, setStore, clientId }) {
  const client = store.clients.find(c => c.id === clientId);
  const programs = store.programs.filter(p => p.clientId === clientId);
  const [selectedProg, setSelectedProg] = useState(programs[0] || null);
  const [week, setWeek] = useState(1);
  const [tab, setTab] = useState("workout");
  const [showVideo, setShowVideo] = useState(null);

  if (!client) return <p style={{ padding: 40, color: "var(--danger)" }}>Client not found.</p>;

  const logKey = (progId, wk) => `${progId}_w${wk}`;
  const getLog = (progId, wk) => store.logs[logKey(progId, wk)] || {};
  const updateLog = (progId, wk, exId, setIdx, field, val) => {
    const key = logKey(progId, wk);
    const existing = store.logs[key] || {};
    const exLog = existing[exId] || {};
    const sets = exLog.sets ? [...exLog.sets] : [];
    while (sets.length <= setIdx) sets.push({ reps: "", weight: "", time: "", done: false });
    sets[setIdx] = { ...sets[setIdx], [field]: val };
    const newLogs = { ...store.logs, [key]: { ...existing, [exId]: { ...exLog, sets } } };
    const updated = { ...store, logs: newLogs };
    setStore(updated); saveStore(updated);
  };

  const prog = selectedProg;
  const currentLog = prog ? getLog(prog.id, week) : {};

  const completedSets = prog ? prog.exercises.reduce((total, ex) => {
    const exLog = currentLog[ex.id];
    if (!exLog) return total;
    return total + (exLog.sets || []).filter(s => s.done).length;
  }, 0) : 0;
  const totalSets = prog ? prog.exercises.reduce((t, ex) => t + ex.sets, 0) : 0;
  const pct = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <div style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="flex items-center gap-2">
          <div style={{ width: 28, height: 28, background: "var(--accent)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>⚡</div>
          <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 16 }}>CoachOS</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="avatar" style={{ width: 32, height: 32, fontSize: 12 }}>{initials(client.name)}</div>
          <span style={{ fontSize: 14, fontWeight: 500 }}>{client.name}</span>
        </div>
      </div>

      <div style={{ padding: "24px 24px", maxWidth: 720, margin: "0 auto" }}>
        {programs.length === 0 ? (
          <div className="empty-state" style={{ marginTop: 60 }}>
            <div className="icon">⏳</div>
            <p style={{ color: "var(--text2)" }}>No programs assigned yet. Check back soon!</p>
          </div>
        ) : (
          <>
            {programs.length > 1 && (
              <div style={{ marginBottom: 20 }}>
                <label>Select program</label>
                <select value={prog?.id} onChange={e => { setSelectedProg(programs.find(p => p.id === e.target.value)); setWeek(1); }}>
                  {programs.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
            )}

            {prog && (
              <>
                <div style={{ marginBottom: 20 }}>
                  <div className="flex items-center" style={{ justifyContent: "space-between", marginBottom: 6 }}>
                    <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 20, fontWeight: 700 }}>{prog.name}</h2>
                    <span className="tag tag-green">{pct}% done</span>
                  </div>
                  <div className="prog-bar"><div className="prog-fill" style={{ width: `${pct}%` }} /></div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ marginBottom: 8, display: "block" }}>Week</label>
                  <div className="scroll-x">
                    {Array.from({ length: prog.weeks }, (_, i) => i + 1).map(w => {
                      const wLog = getLog(prog.id, w);
                      const wDone = prog.exercises.reduce((t, ex) => t + ((wLog[ex.id]?.sets || []).filter(s => s.done).length), 0);
                      const wTotal = prog.exercises.reduce((t, ex) => t + ex.sets, 0);
                      const complete = wTotal > 0 && wDone === wTotal;
                      return (
                        <button key={w} className={`week-tab ${week === w ? "active" : ""}`} onClick={() => setWeek(w)}>
                          W{w} {complete ? "✓" : ""}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-2" style={{ marginBottom: 20 }}>
                  {["workout", "history"].map(t => (
                    <button key={t} onClick={() => setTab(t)}
                      style={{ padding: "7px 18px", borderRadius: "var(--radius)", fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 13,
                        background: tab === t ? "var(--surface2)" : "transparent",
                        color: tab === t ? "var(--text)" : "var(--text3)",
                        border: tab === t ? "1px solid var(--border2)" : "1px solid transparent" }}>
                      {t === "workout" ? "📋 This workout" : "📈 My history"}
                    </button>
                  ))}
                </div>

                {tab === "workout" && (
                  <div>
                    {prog.exercises.map((ex, exIdx) => {
                      const exLog = currentLog[ex.id] || {};
                      const sets = exLog.sets || Array.from({ length: ex.sets }, () => ({ reps: "", weight: "", time: "", done: false }));
                      const doneSets = sets.filter(s => s.done).length;

                      return (
                        <div key={ex.id} className="exercise-row" style={{ marginBottom: 14 }}>
                          <div className="flex items-center" style={{ justifyContent: "space-between", marginBottom: 10 }}>
                            <div>
                              <p style={{ fontWeight: 600, fontSize: 15 }}>{ex.name}</p>
                              <p className="text-xs text-muted mt-1">{ex.sets} sets · {ex.type === "weight" ? `${ex.reps} reps` : `${ex.reps}s`}</p>
                              {ex.notes && <p className="text-xs" style={{ color: "var(--text3)", marginTop: 3 }}>💬 {ex.notes}</p>}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted">{doneSets}/{ex.sets}</span>
                              {ex.videoUrl && (
                                <button className="btn-ghost btn-sm" onClick={() => setShowVideo(ex)}>▶ Demo</button>
                              )}
                            </div>
                          </div>

                          <div style={{ display: "grid", gridTemplateColumns: "32px 1fr 1fr 48px", gap: 6, marginBottom: 4 }}>
                            <div className="text-xs text-muted" style={{ paddingTop: 6 }}>Set</div>
                            {ex.type === "weight" ? (
                              <><div className="text-xs text-muted" style={{ paddingTop: 6, textAlign: "center" }}>Reps</div>
                              <div className="text-xs text-muted" style={{ paddingTop: 6, textAlign: "center" }}>Weight (lbs)</div></>
                            ) : (
                              <><div className="text-xs text-muted" style={{ paddingTop: 6, textAlign: "center" }}>Seconds</div>
                              <div></div></>
                            )}
                            <div className="text-xs text-muted" style={{ paddingTop: 6, textAlign: "center" }}>Done</div>
                          </div>

                          {Array.from({ length: ex.sets }, (_, si) => {
                            const s = sets[si] || {};
                            return (
                              <div key={si} style={{ display: "grid", gridTemplateColumns: "32px 1fr 1fr 48px", gap: 6, marginBottom: 6, alignItems: "center" }}>
                                <div className="set-num">{si + 1}</div>
                                {ex.type === "weight" ? (
                                  <>
                                    <input type="number" className="set-input" value={s.reps || ""} placeholder={ex.reps}
                                      onChange={e => updateLog(prog.id, week, ex.id, si, "reps", e.target.value)} />
                                    <input type="number" className="set-input" value={s.weight || ""} placeholder="0"
                                      onChange={e => updateLog(prog.id, week, ex.id, si, "weight", e.target.value)} />
                                  </>
                                ) : (
                                  <>
                                    <input type="number" className="set-input" value={s.time || ""} placeholder={ex.reps}
                                      onChange={e => updateLog(prog.id, week, ex.id, si, "time", e.target.value)} />
                                    <div />
                                  </>
                                )}
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                  <button onClick={() => updateLog(prog.id, week, ex.id, si, "done", !s.done)}
                                    style={{ width: 32, height: 32, borderRadius: "50%", background: s.done ? "var(--accent)" : "var(--surface3)", border: `1px solid ${s.done ? "var(--accent)" : "var(--border2)"}`, color: s.done ? "#0d0f0e" : "var(--text3)", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    {s.done ? "✓" : "○"}
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                )}

                {tab === "history" && (
                  <ProgressHistory prog={prog} store={store} />
                )}
              </>
            )}
          </>
        )}
      </div>

      {showVideo && (
        <div className="modal-overlay" onClick={() => setShowVideo(null)}>
          <div className="modal modal-lg" onClick={e => e.stopPropagation()}>
            <div className="flex items-center" style={{ justifyContent: "space-between", marginBottom: 14 }}>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 18, fontWeight: 700 }}>{showVideo.name}</h2>
              <button className="btn-ghost btn-sm" onClick={() => setShowVideo(null)}>✕</button>
            </div>
            <iframe src={getYtEmbed(showVideo.videoUrl)} className="video-embed" allowFullScreen title={showVideo.name} />
            {showVideo.notes && <p className="text-sm text-muted" style={{ marginTop: 12 }}>📝 Coach note: {showVideo.notes}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

function ProgressHistory({ prog, store }) {
  const weeks = Array.from({ length: prog.weeks }, (_, i) => i + 1);

  return (
    <div>
      <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, marginBottom: 16 }}>Week-over-week progression</h3>
      {prog.exercises.map(ex => {
        const weekData = weeks.map(w => {
          const log = store.logs[`${prog.id}_w${w}`] || {};
          const exLog = log[ex.id];
          if (!exLog || !exLog.sets) return null;
          const doneSets = exLog.sets.filter(s => s.done);
          if (doneSets.length === 0) return null;
          if (ex.type === "weight") {
            const maxW = Math.max(...doneSets.map(s => parseFloat(s.weight) || 0));
            const avgR = doneSets.reduce((a, s) => a + (parseFloat(s.reps) || 0), 0) / doneSets.length;
            return { week: w, maxWeight: maxW, avgReps: Math.round(avgR), sets: doneSets.length };
          } else {
            const avgTime = doneSets.reduce((a, s) => a + (parseFloat(s.time) || 0), 0) / doneSets.length;
            return { week: w, avgTime: Math.round(avgTime), sets: doneSets.length };
          }
        }).filter(Boolean);

        if (weekData.length === 0) return (
          <div key={ex.id} className="exercise-row" style={{ marginBottom: 12 }}>
            <p style={{ fontWeight: 600 }}>{ex.name}</p>
            <p className="text-xs text-muted mt-1">No logged data yet</p>
          </div>
        );

        return (
          <div key={ex.id} className="exercise-row" style={{ marginBottom: 14 }}>
            <p style={{ fontWeight: 600, marginBottom: 10 }}>{ex.name}</p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", color: "var(--text3)", fontWeight: 500, padding: "4px 8px", fontSize: 11 }}>Week</th>
                    <th style={{ textAlign: "center", color: "var(--text3)", fontWeight: 500, padding: "4px 8px", fontSize: 11 }}>Sets done</th>
                    {ex.type === "weight" ? (
                      <><th style={{ textAlign: "center", color: "var(--text3)", fontWeight: 500, padding: "4px 8px", fontSize: 11 }}>Max weight</th>
                      <th style={{ textAlign: "center", color: "var(--text3)", fontWeight: 500, padding: "4px 8px", fontSize: 11 }}>Avg reps</th></>
                    ) : (
                      <th style={{ textAlign: "center", color: "var(--text3)", fontWeight: 500, padding: "4px 8px", fontSize: 11 }}>Avg time (s)</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {weekData.map((d, i) => {
                    const prev = weekData[i - 1];
                    const improved = prev && ex.type === "weight" ? d.maxWeight > prev.maxWeight : prev && ex.type === "time" ? d.avgTime > prev.avgTime : false;
                    return (
                      <tr key={d.week} style={{ borderTop: "1px solid var(--border)" }}>
                        <td style={{ padding: "8px 8px", fontWeight: 600, fontFamily: "Syne, sans-serif" }}>W{d.week}</td>
                        <td style={{ padding: "8px 8px", textAlign: "center", color: "var(--text2)" }}>{d.sets}</td>
                        {ex.type === "weight" ? (
                          <><td style={{ padding: "8px 8px", textAlign: "center", color: improved ? "var(--accent)" : "var(--text)" }}>
                            {d.maxWeight > 0 ? `${d.maxWeight} lbs` : "—"} {improved ? "↑" : ""}
                          </td>
                          <td style={{ padding: "8px 8px", textAlign: "center", color: "var(--text2)" }}>{d.avgReps || "—"}</td></>
                        ) : (
                          <td style={{ padding: "8px 8px", textAlign: "center", color: improved ? "var(--accent)" : "var(--text)" }}>
                            {d.avgTime}s {improved ? "↑" : ""}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Root ──────────────────────────────────────────────────────────────────
export default function App() {
  const [store, setStore] = useState(() => loadStore() || DEFAULT_STORE);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = FONTS + CSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleLogin = (s) => setSession(s);
  const handleLogout = () => setSession(null);

  return (
    <div>
      {!session && <Login store={store} onLogin={handleLogin} />}
      {session?.role === "coach" && (
        <div>
          <CoachApp store={store} setStore={setStore} />
          <button onClick={handleLogout} style={{ position: "fixed", bottom: 20, right: 20, background: "var(--surface2)", color: "var(--text2)", border: "1px solid var(--border2)", borderRadius: "var(--radius)", padding: "8px 14px", fontSize: 13, cursor: "pointer", zIndex: 100 }}>Sign out</button>
        </div>
      )}
      {session?.role === "client" && (
        <div>
          <ClientApp store={store} setStore={setStore} clientId={session.clientId} />
          <button onClick={handleLogout} style={{ position: "fixed", bottom: 20, right: 20, background: "var(--surface2)", color: "var(--text2)", border: "1px solid var(--border2)", borderRadius: "var(--radius)", padding: "8px 14px", fontSize: 13, cursor: "pointer", zIndex: 100 }}>Sign out</button>
        </div>
      )}
    </div>
  );
}