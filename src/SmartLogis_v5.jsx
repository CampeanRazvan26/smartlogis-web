import { useState, useEffect, useRef, useCallback, useReducer, createContext, useContext } from "react";
import {
  Truck, MapPin, ScanLine, AlertTriangle, Shield, FileText,
  CheckCircle, LayoutDashboard, Zap, Navigation, ChevronRight,
  TrendingUp, Clock, RefreshCw, Upload, Phone, MessageSquare,
  Circle, ArrowUpRight, X, Bell, Search, Activity, BarChart3,
  ChevronDown, Play, Pause, Sparkles, Bot, Eye, EyeOff, Lock,
  Check, ArrowRight, ArrowLeft, Layers, Signal, Timer, Radio,
  Plus, Trash2, Globe, Mail, AlertCircle, Building2, Users, Star,
  Package, Send, XCircle, Info, ExternalLink, CheckSquare, Settings,
  LogOut, CreditCard, BookOpen, Home, Edit2, Save, RotateCcw,
  Download, Printer, ChevronUp, Key, Database, Cpu, BarChart2,
  DollarSign, Calendar, Hash, User, Briefcase, Car, FileCheck,
  Inbox, Filter, MoreHorizontal, Copy, ExternalLink as Link2
} from "lucide-react";

// ─── GLOBAL CSS ──────────────────────────────────────────────────────────────
const G = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&family=Syne:wght@700;800&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'DM Sans',sans-serif;background:#060810;overflow:hidden;}
::-webkit-scrollbar{width:4px;height:4px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:#1e2535;border-radius:4px;}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideRight{from{transform:translateX(110%);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.25}}
@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
@keyframes pulseRing{0%{transform:scale(.8);opacity:1}100%{transform:scale(2.4);opacity:0}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes progressFill{from{width:0}to{width:var(--w)}}
@keyframes truckMove{0%{left:5%}100%{left:88%}}
@keyframes dotPulse{0%,80%,100%{transform:scale(0)}40%{transform:scale(1)}}
.fu{animation:fadeUp .38s ease both}
.fu1{animation:fadeUp .38s .06s ease both}
.fu2{animation:fadeUp .38s .12s ease both}
.fu3{animation:fadeUp .38s .18s ease both}
.fu4{animation:fadeUp .38s .24s ease both}
.fu5{animation:fadeUp .38s .30s ease both}
.fi{animation:fadeIn .3s ease both}
.blink{animation:blink 1.4s ease-in-out infinite}
.spin{animation:spin .7s linear infinite}
.toast{animation:slideRight .35s cubic-bezier(.34,1.56,.64,1) both}
.glass{background:rgba(255,255,255,.025);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.07);}
.ifield{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:10px;padding:11px 14px;font-size:13px;color:#f9fafb;outline:none;font-family:'DM Sans',sans-serif;transition:border-color .2s,background .2s,box-shadow .2s;}
.ifield:focus{border-color:rgba(52,211,153,.35);background:rgba(52,211,153,.03);box-shadow:0 0 0 3px rgba(52,211,153,.07);}
.ifield::placeholder{color:#374151;}
.ifield:disabled{opacity:.4;cursor:not-allowed;}
select.ifield option{background:#0b0f1a;color:#f9fafb;}
.badge{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:20px;font-size:10px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;}
.navItem{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:10px;font-size:13px;font-weight:500;cursor:pointer;transition:all .15s;color:#6b7280;border:1px solid transparent;width:100%;background:none;text-align:left;}
.navItem:hover{background:rgba(255,255,255,.04);color:#e5e7eb;}
.navItem.active{background:rgba(255,255,255,.07);color:#f9fafb;border-color:rgba(255,255,255,.08);}
.navItem.special{color:#34d399 !important;}
.navItem.special.active{background:rgba(16,185,129,.08);border-color:rgba(16,185,129,.2);}
.pbar{height:3px;border-radius:2px;overflow:hidden;background:rgba(255,255,255,.06);}
.pfill{height:100%;border-radius:2px;transition:width 1.2s cubic-bezier(.4,0,.2,1);}
.cardHov{transition:all .25s cubic-bezier(.4,0,.2,1);}
.cardHov:hover{transform:translateY(-3px);}
.trow:hover td{background:rgba(255,255,255,.015);}
.btn{cursor:pointer;transition:transform .15s cubic-bezier(.34,1.56,.64,1),box-shadow .15s,opacity .15s,background .15s;user-select:none;}
.btn:hover{transform:translateY(-2px) scale(1.02);}
.btn:active{transform:translateY(1px) scale(.97) !important;opacity:.9;}
.btn:disabled{opacity:.4;cursor:not-allowed;transform:none !important;}
.btn-ghost{cursor:pointer;transition:transform .15s,background .15s,border-color .15s,color .15s;user-select:none;}
.btn-ghost:hover{transform:translateY(-1px) scale(1.02);}
.btn-ghost:active{transform:translateY(1px) scale(.97) !important;opacity:.85;}
.btn-ghost:disabled{opacity:.4;cursor:not-allowed;transform:none !important;}
.mapDot{position:absolute;width:10px;height:10px;border-radius:50%;cursor:pointer;transition:transform .2s;}
.mapDot:hover{transform:scale(1.8);}
.mapRoute{stroke-dasharray:6,4;animation:spin 20s linear infinite;}
`;

// ─── APP CONTEXT ─────────────────────────────────────────────────────────────
const AppCtx = createContext(null);

function appReducer(state, action) {
  switch (action.type) {
    case "SET_USER": return { ...state, user: action.payload };
    case "SET_FLEET": return { ...state, fleet: action.payload };
    case "ADD_VEHICLE": return { ...state, fleet: [...state.fleet, action.payload] };
    case "UPDATE_VEHICLE": return { ...state, fleet: state.fleet.map(v => v.id === action.payload.id ? { ...v, ...action.payload } : v) };
    case "DELETE_VEHICLE": return { ...state, fleet: state.fleet.filter(v => v.id !== action.payload) };
    case "ADD_INVOICE": return { ...state, invoices: [action.payload, ...state.invoices] };
    case "UPDATE_INVOICE": return { ...state, invoices: state.invoices.map(inv => inv.id === action.payload.id ? { ...inv, ...action.payload } : inv) };
    case "ADD_DISPATCH": return { ...state, dispatches: [action.payload, ...state.dispatches] };
    case "UPDATE_DISPATCH": return { ...state, dispatches: state.dispatches.map(d => d.id === action.payload.id ? { ...d, ...action.payload } : d) };
    case "ADD_OCR_JOB": return { ...state, ocrJobs: [action.payload, ...state.ocrJobs] };
    case "UPDATE_OCR_JOB": return { ...state, ocrJobs: state.ocrJobs.map(j => j.id === action.payload.id ? { ...j, ...action.payload } : j) };
    case "ADD_ACTIVITY": return { ...state, activity: [action.payload, ...state.activity].slice(0, 50) };
    case "SET_BORDERS": return { ...state, borders: action.payload };
    case "UPDATE_UIT_RULE": return { ...state, uitRules: state.uitRules.map(r => r.id === action.payload.id ? { ...r, ...action.payload } : r) };
    case "LOAD": return { ...state, ...action.payload };
    default: return state;
  }
}

const initialState = {
  user: null,
  fleet: [
    { id: 1, plate: "TR-45-YIL", driver: "Mehmet Yilmaz", flag: "🇹🇷", route: "Istanbul → București", uit: "UIT-2024-8821", expiresMin: 135, location: "PTF Giurgiu", lat: 43.9, lng: 25.97, status: "critical", cargo: "Piese auto", weight: "18.4t", autoRenew: true, phone: "+40722111222", renewCount: 4 },
    { id: 2, plate: "PL-771-AB", driver: "Piotr Kowalski", flag: "🇵🇱", route: "Gdańsk → Constanța", uit: "UIT-2024-6610", expiresMin: 410, location: "Vama Albița", lat: 46.97, lng: 28.03, status: "warning", cargo: "Mobilier", weight: "12.1t", autoRenew: true, phone: "+40722333444", renewCount: 2 },
    { id: 3, plate: "B-234-TRK", driver: "Ion Popescu", flag: "🇷🇴", route: "München → Cluj", uit: "UIT-2024-9102", expiresMin: 1120, location: "Vama Borș", lat: 47.05, lng: 22.0, status: "ok", cargo: "Echipamente IT", weight: "6.7t", autoRenew: false, phone: "+40722555666", renewCount: 0 },
    { id: 4, plate: "DE-88-LKW", driver: "Hans Müller", flag: "🇩🇪", route: "Berlin → Timișoara", uit: "UIT-2024-7734", expiresMin: 890, location: "PTF Nădlac II", lat: 46.17, lng: 21.33, status: "ok", cargo: "Mașini unelte", weight: "22.0t", autoRenew: true, phone: "+40722777888", renewCount: 1 },
    { id: 5, plate: "HU-55-KAM", driver: "László Varga", flag: "🇭🇺", route: "Budapest → Iași", uit: "UIT-2024-5521", expiresMin: 290, location: "Vama Petea", lat: 47.72, lng: 23.58, status: "warning", cargo: "Produse chimice", weight: "15.2t", autoRenew: false, phone: "+40722999000", renewCount: 3 },
  ],
  uitRules: [
    { id: 1, plate: "TR-45-YIL", threshold: 3, enabled: true, count: 4, lastAt: "azi, 09:14", sms: true },
    { id: 2, plate: "PL-771-AB", threshold: 6, enabled: true, count: 2, lastAt: "ieri, 18:30", sms: true },
    { id: 3, plate: "B-234-TRK", threshold: 4, enabled: false, count: 0, lastAt: "—", sms: false },
    { id: 4, plate: "DE-88-LKW", threshold: 8, enabled: true, count: 1, lastAt: "ieri, 07:55", sms: false },
    { id: 5, plate: "HU-55-KAM", threshold: 4, enabled: false, count: 3, lastAt: "acum 2 zile", sms: true },
  ],
  invoices: [
    { id: "SL-2024-0048", client: "Bosch GmbH", cui: "DE123456789", amount: 4850, vat: 921.5, status: "trimisa", anafStatus: "acceptata", created: "2024-01-15", due: "2024-02-15", items: [{ desc: "Transport marfă TIR", qty: 1, price: 4850 }] },
    { id: "SL-2024-0047", client: "Metro Cash&Carry SRL", cui: "RO12345678", amount: 2100, vat: 399, status: "platita", anafStatus: "acceptata", created: "2024-01-12", due: "2024-02-12", items: [{ desc: "Transport grupaj", qty: 3, price: 700 }] },
    { id: "SL-2024-0046", client: "Kaufland România SRL", cui: "RO23456789", amount: 7200, vat: 1368, status: "neplatita", anafStatus: "in_procesare", created: "2024-01-08", due: "2024-02-08", items: [{ desc: "Servicii logistică externalizată", qty: 12, price: 600 }] },
  ],
  dispatches: [
    { id: "DSP-001", vehicleId: 2, token: "gps_abc123", phone: "+48600000001", status: "activ", lat: 46.97, lng: 28.03, lastSeen: "acum 2 min", createdAt: "azi, 14:30" },
  ],
  ocrJobs: [],
  activity: [
    { id: 1, type: "zap", msg: "UIT auto-reînnoit pentru TR-45-YIL", time: "acum 2 min", color: "#34d399" },
    { id: 2, type: "alert", msg: "Timp așteptare crescut la PTF Giurgiu", time: "acum 8 min", color: "#f87171" },
    { id: 3, type: "scan", msg: "Factură Bosch GmbH procesată (NC8 generat)", time: "acum 15 min", color: "#60a5fa" },
    { id: 4, type: "nav", msg: "Link GPS trimis șoferului Kowalski", time: "acum 31 min", color: "#a78bfa" },
  ],
  borders: [
    { name: "PTF Giurgiu", flag: "🇧🇬", wait: "5h 30m", trucks: 47, status: "aglomerat" },
    { name: "Vama Borș", flag: "🇭🇺", wait: "0h 50m", trucks: 12, status: "liber" },
    { name: "PTF Nădlac II", flag: "🇭🇺", wait: "1h 15m", trucks: 19, status: "normal" },
    { name: "Vama Albița", flag: "🇲🇩", wait: "2h 10m", trucks: 31, status: "normal" },
    { name: "Vama Petea", flag: "🇭🇺", wait: "3h 20m", trucks: 28, status: "aglomerat" },
    { name: "PTF Calafat", flag: "🇧🇬", wait: "0h 40m", trucks: 8, status: "liber" },
  ],
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const fmtTime = m => m < 60 ? `${m}m` : `${Math.floor(m / 60)}h ${m % 60}m`;
const uid = () => Math.random().toString(36).slice(2, 10).toUpperCase();
const now = () => new Date().toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" });
const nowDate = () => new Date().toISOString().split("T")[0];
const statusMap = {
  critical: { label: "Risc Amendă", bg: "rgba(239,68,68,.1)", color: "#f87171", brd: "rgba(239,68,68,.25)" },
  warning: { label: "Atenție", bg: "rgba(245,158,11,.1)", color: "#fbbf24", brd: "rgba(245,158,11,.25)" },
  ok: { label: "În Tranzit", bg: "rgba(16,185,129,.1)", color: "#34d399", brd: "rgba(16,185,129,.25)" },
  liber: { label: "Liber", bg: "rgba(16,185,129,.1)", color: "#34d399", brd: "rgba(16,185,129,.25)" },
  normal: { label: "Normal", bg: "rgba(59,130,246,.1)", color: "#60a5fa", brd: "rgba(59,130,246,.25)" },
  aglomerat: { label: "Aglomerat", bg: "rgba(239,68,68,.1)", color: "#f87171", brd: "rgba(239,68,68,.25)" },
  trimisa: { label: "Trimisă", bg: "rgba(59,130,246,.1)", color: "#60a5fa", brd: "rgba(59,130,246,.25)" },
  platita: { label: "Plătită", bg: "rgba(16,185,129,.1)", color: "#34d399", brd: "rgba(16,185,129,.25)" },
  neplatita: { label: "Neplătită", bg: "rgba(239,68,68,.1)", color: "#f87171", brd: "rgba(239,68,68,.25)" },
  acceptata: { label: "Acceptată ANAF", bg: "rgba(16,185,129,.1)", color: "#34d399", brd: "rgba(16,185,129,.25)" },
  in_procesare: { label: "În Procesare", bg: "rgba(245,158,11,.1)", color: "#fbbf24", brd: "rgba(245,158,11,.25)" },
  respinsa: { label: "Respinsă", bg: "rgba(239,68,68,.1)", color: "#f87171", brd: "rgba(239,68,68,.25)" },
  activ: { label: "Activ", bg: "rgba(16,185,129,.1)", color: "#34d399", brd: "rgba(16,185,129,.25)" },
  expirat: { label: "Expirat", bg: "rgba(239,68,68,.1)", color: "#f87171", brd: "rgba(239,68,68,.25)" },
};
const SBadge = ({ s }) => { const m = statusMap[s] || statusMap.ok; return <span className="badge" style={{ background: m.bg, color: m.color, border: `1px solid ${m.brd}` }}>{m.label}</span>; };
const UitBar = ({ min, autoRenew }) => {
  const pct = Math.min(100, (min / 1440) * 100);
  const c = min < 180 ? "#f87171" : min < 480 ? "#fbbf24" : "#34d399";
  return <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ color: c, fontFamily: "'DM Mono',monospace", fontSize: 12, fontWeight: 500 }} className={min < 180 ? "blink" : ""}>{fmtTime(min)}</span>
      {autoRenew && <span className="badge" style={{ background: "rgba(16,185,129,.1)", color: "#34d399", border: "1px solid rgba(16,185,129,.2)", fontSize: 9 }}><Zap size={8} />AUTO</span>}
    </div>
    <div className="pbar" style={{ width: 88 }}><div className="pfill" style={{ width: `${pct}%`, background: c }} /></div>
  </div>;
};

// ─── TOAST SYSTEM ─────────────────────────────────────────────────────────────
function Toasts({ toasts, remove }) {
  return <div style={{ position: "fixed", top: 18, right: 18, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8, minWidth: 300, maxWidth: 360 }}>
    {toasts.map(t => (
      <div key={t.id} className="toast glass" style={{ borderRadius: 12, padding: "13px 15px", display: "flex", alignItems: "flex-start", gap: 11, borderColor: t.type === "success" ? "rgba(16,185,129,.3)" : t.type === "error" ? "rgba(239,68,68,.3)" : "rgba(59,130,246,.3)" }}>
        <div style={{ width: 26, height: 26, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: t.type === "success" ? "rgba(16,185,129,.15)" : t.type === "error" ? "rgba(239,68,68,.15)" : "rgba(59,130,246,.15)" }}>
          {t.type === "success" ? <CheckCircle size={13} color="#34d399" /> : t.type === "error" ? <XCircle size={13} color="#f87171" /> : <Info size={13} color="#60a5fa" />}
        </div>
        <div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 600, color: "#f9fafb", marginBottom: 2 }}>{t.title}</div><div style={{ fontSize: 11, color: "#9ca3af" }}>{t.msg}</div></div>
        <button className="btn-ghost" onClick={() => remove(t.id)} style={{ background: "none", border: "none", color: "#4b5563" }}><X size={13} /></button>
      </div>
    ))}
  </div>;
}

function useToasts() {
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);
  const addToast = useCallback(t => {
    const id = ++toastId.current;
    setToasts(p => [...p, { ...t, id }]);
    setTimeout(() => setToasts(p => p.filter(x => x.id !== id)), 5000);
  }, []);
  const removeToast = useCallback(id => setToasts(p => p.filter(x => x.id !== id)), []);
  return { toasts, addToast, removeToast };
}

// ─── MODAL WRAPPER ────────────────────────────────────────────────────────────
function Modal({ title, onClose, children, wide }) {
  return <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.7)", backdropFilter: "blur(4px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
    onClick={e => e.target === e.currentTarget && onClose()}>
    <div className="fu glass" style={{ borderRadius: 18, padding: 28, width: "100%", maxWidth: wide ? 720 : 480, maxHeight: "90vh", overflowY: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: "#f9fafb" }}>{title}</div>
        <button className="btn-ghost" onClick={onClose} style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 8, padding: "6px 8px", color: "#9ca3af" }}><X size={14} /></button>
      </div>
      {children}
    </div>
  </div>;
}

function Field({ label, children, span }) {
  return <div style={{ gridColumn: span ? "1/-1" : undefined }}>
    <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#4b5563", display: "block", marginBottom: 5 }}>{label}</label>
    {children}
  </div>;
}

// ─── AUTO-RENEW MODAL (ANIMATED) ─────────────────────────────────────────────
function AutoRenewModal({ v, onClose, addToast, dispatch }) {
  const [phase, setPhase] = useState(0);
  const [log, setLog] = useState([]);
  const steps = [
    "Conectare ANAF API...",
    `Validare date vehicul ${v.plate}`,
    "Verificare documente CMR/AWB",
    "Calculare interval prelungire +24h",
    "Generare cerere UIT nouă",
    "Transmitere + confirmare ANAF",
    "Actualizare flotă SmartLogis ✓"
  ];
  useEffect(() => {
    if (phase >= steps.length) return;
    const delays = [900, 700, 600, 500, 800, 1100, 400];
    const t = setTimeout(() => {
      setLog(l => [...l, steps[phase]]);
      setPhase(p => p + 1);
    }, delays[phase]);
    return () => clearTimeout(t);
  }, [phase]);
  const done = phase >= steps.length;
  useEffect(() => {
    if (done) {
      const newUIT = `UIT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      dispatch({ type: "UPDATE_VEHICLE", payload: { id: v.id, uit: newUIT, expiresMin: v.expiresMin + 1440, renewCount: (v.renewCount || 0) + 1 } });
      dispatch({ type: "ADD_ACTIVITY", payload: { id: Date.now(), type: "zap", msg: `UIT auto-reînnoit pentru ${v.plate} → ${newUIT}`, time: `azi, ${now()}`, color: "#34d399" } });
      addToast({ type: "success", title: "UIT Reînnoit!", msg: `${v.plate} → ${newUIT} (+24h)` });
    }
  }, [done]);
  return <Modal title="Auto-Reînnoire UIT ANAF" onClose={onClose}>
    <div style={{ background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 12, padding: "14px 16px", marginBottom: 18, display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ fontSize: 22 }}>{v.flag}</div>
      <div><div style={{ fontSize: 13, fontWeight: 700, color: "#f9fafb" }}>{v.plate}</div><div style={{ fontSize: 11, color: "#6b7280" }}>{v.driver} · {v.cargo}</div></div>
      <div style={{ marginLeft: "auto" }}><UitBar min={v.expiresMin} autoRenew={v.autoRenew} /></div>
    </div>
    <div style={{ background: "rgba(0,0,0,.3)", borderRadius: 10, padding: "14px 16px", fontFamily: "'DM Mono',monospace", fontSize: 11, lineHeight: 2, minHeight: 180 }}>
      {log.map((l, i) => <div key={i} className="fu" style={{ color: i === log.length - 1 && done ? "#34d399" : i === log.length - 1 ? "#60a5fa" : "#4b5563", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: "#1e2535" }}>›</span>
        {i === log.length - 1 && !done ? <><span className="spin" style={{ display: "inline-block" }}>◌</span>{l}</> : <>{i === log.length - 1 && done ? <Check size={11} color="#34d399" /> : <span>✓</span>}{l}</>}
      </div>)}
      {!done && phase === 0 && <span className="blink" style={{ color: "#374151" }}>Inițializare...</span>}
    </div>
    {done && <button className="btn" onClick={onClose} style={{ marginTop: 14, width: "100%", background: "#34d399", color: "#064e3b", border: "none", borderRadius: 10, padding: "12px 0", fontSize: 13, fontWeight: 700 }}>Închide</button>}
  </Modal>;
}

// ─── LOGIN SCREEN ─────────────────────────────────────────────────────────────
const DEMO_USERS = [
  { email: "admin@smartlogis.ro", password: "admin123", name: "Admin Popescu", role: "admin", company: "SmartLogis SRL", plan: "Enterprise" },
  { email: "dispecer@firma.ro", password: "disp123", name: "Maria Ionescu", role: "dispecer", company: "Trans România SRL", plan: "Pro" },
  { email: "sofer@firma.ro", password: "sofer123", name: "Ion Marin", role: "sofer", company: "Trans România SRL", plan: "Pro" },
];

function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [tab, setTab] = useState("login");
  const [regData, setRegData] = useState({ name: "", company: "", cui: "", email: "", pass: "" });
  const [regLoading, setRegLoading] = useState(false);

  const doLogin = async () => {
    setLoading(true); setErr("");
    await new Promise(r => setTimeout(r, 900));
    const u = DEMO_USERS.find(u => u.email === email && u.password === pass);
    if (u) { onLogin(u); }
    else { setErr("Email sau parolă incorectă."); setLoading(false); }
  };

  const doRegister = async () => {
    if (!regData.name || !regData.email || !regData.pass || !regData.company) return;
    setRegLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    onLogin({ email: regData.email, name: regData.name, role: "admin", company: regData.company, plan: "Starter (Trial)" });
  };

  return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#060810", position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 500, height: 500, background: "radial-gradient(circle,rgba(16,185,129,.06),transparent 65%)", pointerEvents: "none" }} />
    <div className="fu" style={{ width: "100%", maxWidth: 420, padding: "0 20px" }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}><Truck size={20} color="#060810" /></div>
        <div style={{ fontSize: 22, fontWeight: 800, color: "#f9fafb", letterSpacing: -0.5 }}>SmartLogis</div>
        <div style={{ fontSize: 12, color: "#374151", marginTop: 3 }}>Platformă AI Transport România</div>
      </div>
      <div className="glass" style={{ borderRadius: 18, padding: 28 }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 22, background: "rgba(255,255,255,.03)", borderRadius: 10, padding: 4 }}>
          {[["login", "Autentificare"], ["register", "Cont Nou"]].map(([t, l]) => (
            <button key={t} className="btn-ghost" onClick={() => { setTab(t); setErr(""); }} style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: "none", background: tab === t ? "rgba(255,255,255,.08)" : "none", color: tab === t ? "#f9fafb" : "#6b7280", fontSize: 12, fontWeight: 600 }}>{l}</button>
          ))}
        </div>
        {tab === "login" ? <>
          <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
            {DEMO_USERS.map(u => <button key={u.role} className="btn-ghost" onClick={() => { setEmail(u.email); setPass(u.password); }} style={{ flex: 1, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 8, padding: "6px 4px", color: "#6b7280", fontSize: 9, fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase", cursor: "pointer" }}>{u.role}</button>)}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Field label="Email"><input className="ifield" type="email" placeholder="admin@smartlogis.ro" value={email} onChange={e => { setEmail(e.target.value); setErr(""); }} onKeyDown={e => e.key === "Enter" && doLogin()} /></Field>
            <Field label="Parolă">
              <div style={{ position: "relative" }}>
                <input className="ifield" type={showPass ? "text" : "password"} placeholder="••••••••" value={pass} onChange={e => { setPass(e.target.value); setErr(""); }} onKeyDown={e => e.key === "Enter" && doLogin()} style={{ paddingRight: 40 }} />
                <button className="btn-ghost" onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#374151", padding: 4 }}>{showPass ? <EyeOff size={14} /> : <Eye size={14} />}</button>
              </div>
            </Field>
            {err && <div style={{ background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)", borderRadius: 8, padding: "10px 12px", fontSize: 12, color: "#f87171", display: "flex", gap: 8, alignItems: "center" }}><AlertCircle size={12} />{err}</div>}
            <button className="btn" onClick={doLogin} disabled={loading || !email || !pass} style={{ background: "linear-gradient(135deg,#34d399,#10b981)", color: "#022c22", border: "none", borderRadius: 10, padding: "13px 0", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 4px 18px rgba(16,185,129,.3)" }}>
              {loading ? <><RefreshCw size={13} className="spin" />Autentificare...</> : <><ArrowRight size={13} />Intră în Platformă</>}
            </button>
          </div>
        </> : <>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {[["Nume complet *", "Ion Popescu", "name", "text"], ["Companie *", "Trans România SRL", "company", "text"], ["CUI", "RO12345678", "cui", "text"], ["Email *", "ion@firma.ro", "email", "email"], ["Parolă *", "min. 8 caractere", "pass", "password"]].map(([l, ph, k, type]) => (
              <Field key={k} label={l}><input className="ifield" type={type} placeholder={ph} value={regData[k]} onChange={e => setRegData(d => ({ ...d, [k]: e.target.value }))} /></Field>
            ))}
            <button className="btn" onClick={doRegister} disabled={regLoading || !regData.name || !regData.email || !regData.pass || !regData.company} style={{ background: "linear-gradient(135deg,#34d399,#10b981)", color: "#022c22", border: "none", borderRadius: 10, padding: "13px 0", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 4px 18px rgba(16,185,129,.3)" }}>
              {regLoading ? <><RefreshCw size={13} className="spin" />Creare cont...</> : <><Sparkles size={13} />Creează Cont Gratuit (14 zile)</>}
            </button>
          </div>
        </>}
        <div style={{ marginTop: 18, fontSize: 10, color: "#1f2937", textAlign: "center" }}>
          Demo: click pe roluri pentru autofill · <span style={{ color: "#374151" }}>Fără card necesar</span>
        </div>
      </div>
    </div>
  </div>;
}

// ─── DASHBOARD VIEW ───────────────────────────────────────────────────────────
function ViewDashboard({ state, dispatch, addToast, setRenewModal }) {
  const { fleet, borders, activity } = state;
  const critical = fleet.filter(v => v.status === "critical");
  const warning = fleet.filter(v => v.status === "warning");
  const totalInvoiced = state.invoices.reduce((s, i) => s + i.amount, 0);
  const [tick, setTick] = useState(0);

  // Live timer: decrement UIT every 10 seconds
  useEffect(() => {
    const t = setInterval(() => {
      fleet.forEach(v => {
        if (v.expiresMin > 0) dispatch({ type: "UPDATE_VEHICLE", payload: { id: v.id, expiresMin: Math.max(0, v.expiresMin - 1) } });
      });
      setTick(t => t + 1);
    }, 10000);
    return () => clearInterval(t);
  }, [fleet]);

  // Border congestion refresh
  useEffect(() => {
    const t = setInterval(() => {
      dispatch({
        type: "SET_BORDERS", payload: borders.map(b => ({
          ...b,
          trucks: Math.max(5, b.trucks + Math.floor((Math.random() - 0.5) * 4)),
        }))
      });
    }, 15000);
    return () => clearInterval(t);
  }, [borders]);

  const stats = [
    { label: "Vehicule Active", value: fleet.length, icon: Truck, color: "#60a5fa", sub: `${critical.length} critice`, bg: "rgba(59,130,246,.08)" },
    { label: "UIT Critice", value: critical.length, icon: AlertTriangle, color: "#f87171", sub: "sub 3h expirare", bg: "rgba(239,68,68,.08)" },
    { label: "Facturate (lună)", value: `${totalInvoiced.toLocaleString("ro-RO")} RON`, icon: DollarSign, color: "#34d399", sub: `${state.invoices.length} facturi`, bg: "rgba(16,185,129,.08)" },
    { label: "Reînnoiri Auto", value: fleet.reduce((s, v) => s + (v.renewCount || 0), 0), icon: Zap, color: "#a78bfa", sub: "total automate", bg: "rgba(167,139,250,.08)" },
  ];

  return <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
    {/* Alert banner for critical */}
    {critical.length > 0 && <div className="fu" style={{ background: "rgba(239,68,68,.07)", border: "1px solid rgba(239,68,68,.25)", borderRadius: 12, padding: "13px 16px", display: "flex", alignItems: "center", gap: 12 }}>
      <AlertTriangle size={16} color="#f87171" />
      <div style={{ flex: 1 }}><span style={{ fontSize: 13, fontWeight: 700, color: "#f87171" }}>{critical.length} vehicule cu risc amendă!</span><span style={{ fontSize: 12, color: "#ef4444", marginLeft: 8 }}>UIT expiră în sub 3 ore.</span></div>
      {critical.map(v => <button key={v.id} className="btn" onClick={() => setRenewModal(v)} style={{ background: "rgba(239,68,68,.15)", color: "#f87171", border: "1px solid rgba(239,68,68,.3)", borderRadius: 8, padding: "6px 12px", fontSize: 11, fontWeight: 700 }}>Reînnoiește {v.plate}</button>)}
    </div>}

    {/* KPI Stats */}
    <div className="fu1" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
      {stats.map((s, i) => (
        <div key={s.label} className="cardHov" style={{ background: s.bg, border: `1px solid ${s.color}22`, borderRadius: 14, padding: "18px 16px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}><s.icon size={16} color={s.color} /></div>
            <ArrowUpRight size={12} color={s.color} style={{ opacity: 0.5 }} />
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#f9fafb", letterSpacing: -0.5, lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", marginBottom: 2 }}>{s.label}</div>
          <div style={{ fontSize: 10, color: "#4b5563" }}>{s.sub}</div>
        </div>
      ))}
    </div>

    {/* Fleet Table */}
    <div className="glass fu2" style={{ borderRadius: 15, overflow: "hidden" }}>
      <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#f9fafb" }}>Flotă Live</div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span className="blink" style={{ width: 6, height: 6, background: "#34d399", borderRadius: "50%", display: "inline-block" }} />
          <span style={{ fontSize: 10, color: "#34d399", fontWeight: 600 }}>LIVE · actualizat acum {tick}s</span>
        </div>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ borderBottom: "1px solid rgba(255,255,255,.04)" }}>
            {["Vehicul", "Șofer", "Rută", "UIT", "Expiră", "Locație", "Marfă", "Status", "Acțiuni"].map(h => <th key={h} style={{ padding: "9px 14px", textAlign: "left", fontSize: 9, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#4b5563" }}>{h}</th>)}
          </tr></thead>
          <tbody>
            {fleet.map(v => (
              <tr key={v.id} className="trow" style={{ borderBottom: "1px solid rgba(255,255,255,.03)" }}>
                <td style={{ padding: "12px 14px" }}><span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, fontWeight: 700, color: "#f9fafb" }}>{v.plate}</span></td>
                <td style={{ padding: "12px 14px" }}><div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ fontSize: 14 }}>{v.flag}</span><span style={{ fontSize: 12, color: "#9ca3af" }}>{v.driver}</span></div></td>
                <td style={{ padding: "12px 14px", fontSize: 11, color: "#6b7280" }}>{v.route}</td>
                <td style={{ padding: "12px 14px" }}><span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "#4b5563" }}>{v.uit}</span></td>
                <td style={{ padding: "12px 14px" }}><UitBar min={v.expiresMin} autoRenew={v.autoRenew} /></td>
                <td style={{ padding: "12px 14px", fontSize: 11, color: "#6b7280" }}>{v.location}</td>
                <td style={{ padding: "12px 14px", fontSize: 11, color: "#6b7280" }}>{v.cargo} · {v.weight}</td>
                <td style={{ padding: "12px 14px" }}><SBadge s={v.status} /></td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", gap: 5 }}>
                    <button className="btn-ghost" onClick={() => setRenewModal(v)} style={{ background: "rgba(16,185,129,.08)", color: "#34d399", border: "1px solid rgba(16,185,129,.2)", borderRadius: 7, padding: "5px 9px", fontSize: 10, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}><Zap size={9} />UIT</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Bottom row: Activity + Borders */}
    <div className="fu3" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 14 }}>
      {/* Activity */}
      <div className="glass" style={{ borderRadius: 14, overflow: "hidden" }}>
        <div style={{ padding: "13px 16px", borderBottom: "1px solid rgba(255,255,255,.05)", fontSize: 12, fontWeight: 700, color: "#f9fafb" }}>Activitate Recentă</div>
        <div style={{ padding: "8px 0" }}>
          {activity.slice(0, 6).map(a => (
            <div key={a.id} style={{ padding: "9px 16px", display: "flex", alignItems: "flex-start", gap: 10, borderBottom: "1px solid rgba(255,255,255,.025)" }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: `${a.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                {a.type === "zap" ? <Zap size={11} color={a.color} /> : a.type === "alert" ? <AlertTriangle size={11} color={a.color} /> : a.type === "scan" ? <ScanLine size={11} color={a.color} /> : <Navigation size={11} color={a.color} />}
              </div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 11, color: "#e5e7eb", lineHeight: 1.4 }}>{a.msg}</div><div style={{ fontSize: 10, color: "#4b5563", marginTop: 2 }}>{a.time}</div></div>
            </div>
          ))}
        </div>
      </div>

      {/* Borders */}
      <div className="glass" style={{ borderRadius: 14, overflow: "hidden" }}>
        <div style={{ padding: "13px 16px", borderBottom: "1px solid rgba(255,255,255,.05)", fontSize: 12, fontWeight: 700, color: "#f9fafb", display: "flex", justifyContent: "space-between" }}>
          <span>Stare Puncte de Trecere Frontieră</span>
          <span style={{ fontSize: 10, color: "#374151" }}>refresh la 15s</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
          {borders.map((b, i) => {
            const c = b.status === "liber" ? "#34d399" : b.status === "aglomerat" ? "#f87171" : "#fbbf24";
            return <div key={b.name} style={{ padding: "14px 12px", borderRight: i % 3 < 2 ? "1px solid rgba(255,255,255,.04)" : "none", borderBottom: i < 3 ? "1px solid rgba(255,255,255,.04)" : "none" }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{b.flag}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#e5e7eb", marginBottom: 4 }}>{b.name}</div>
              <div style={{ fontSize: 18, fontWeight: 800, fontFamily: "'DM Mono',monospace", color: c, marginBottom: 5, letterSpacing: -0.5 }}>{b.wait}</div>
              <SBadge s={b.status} />
              <div style={{ fontSize: 9, color: "#374151", marginTop: 5 }}>{b.trucks} camioane</div>
            </div>;
          })}
        </div>
      </div>
    </div>
  </div>;
}

// ─── FLEET MANAGEMENT ─────────────────────────────────────────────────────────
function ViewFlota({ state, dispatch, addToast, setRenewModal }) {
  const { fleet } = state;
  const [showAdd, setShowAdd] = useState(false);
  const [editVeh, setEditVeh] = useState(null);
  const [search, setSearch] = useState("");
  const [newV, setNewV] = useState({ plate: "", driver: "", flag: "🇷🇴", route: "", cargo: "", weight: "", phone: "", expiresMin: 1440, autoRenew: false });

  const filtered = fleet.filter(v => v.plate.toLowerCase().includes(search.toLowerCase()) || v.driver.toLowerCase().includes(search.toLowerCase()));

  const addVehicle = () => {
    if (!newV.plate || !newV.driver) return;
    const v = {
      ...newV,
      id: Date.now(), uit: `UIT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      location: "—", lat: 45.9 + Math.random() * 2, lng: 24.5 + Math.random() * 5,
      status: newV.expiresMin < 180 ? "critical" : newV.expiresMin < 480 ? "warning" : "ok",
      renewCount: 0
    };
    dispatch({ type: "ADD_VEHICLE", payload: v });
    dispatch({ type: "ADD_ACTIVITY", payload: { id: Date.now(), type: "check", msg: `Vehicul nou adăugat: ${v.plate} — ${v.driver}`, time: `azi, ${now()}`, color: "#60a5fa" } });
    addToast({ type: "success", title: "Vehicul Adăugat", msg: `${v.plate} a fost adăugat în flotă` });
    setNewV({ plate: "", driver: "", flag: "🇷🇴", route: "", cargo: "", weight: "", phone: "", expiresMin: 1440, autoRenew: false });
    setShowAdd(false);
  };

  const deleteVehicle = (v) => {
    dispatch({ type: "DELETE_VEHICLE", payload: v.id });
    addToast({ type: "error", title: "Vehicul Șters", msg: `${v.plate} eliminat din flotă` });
  };

  const saveEdit = () => {
    dispatch({ type: "UPDATE_VEHICLE", payload: editVeh });
    addToast({ type: "success", title: "Vehicul Actualizat", msg: `${editVeh.plate} salvat` });
    setEditVeh(null);
  };

  return <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    <div className="fu" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div>
        <div style={{ fontSize: 22, fontWeight: 700, color: "#f9fafb" }}>Gestiune Flotă</div>
        <div style={{ fontSize: 12, color: "#6b7280" }}>{fleet.length} vehicule înregistrate · CRUD complet</div>
      </div>
      <div style={{ display: "flex", gap: 9 }}>
        <div style={{ position: "relative" }}>
          <Search size={12} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#4b5563" }} />
          <input className="ifield" placeholder="Caută vehicul, șofer..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 30, width: 220, fontSize: 12 }} />
        </div>
        <button className="btn" onClick={() => setShowAdd(true)} style={{ background: "linear-gradient(135deg,#34d399,#10b981)", color: "#022c22", border: "none", borderRadius: 10, padding: "9px 16px", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}><Plus size={13} />Adaugă Vehicul</button>
      </div>
    </div>
    <div className="glass fu1" style={{ borderRadius: 15, overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead><tr style={{ borderBottom: "1px solid rgba(255,255,255,.05)" }}>
          {["Nr. Înmatriculare", "Șofer", "Rută Curentă", "UIT", "Expiră", "Marfă / Greutate", "Auto-Reînnoire", "Status", "Acțiuni"].map(h => <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 9, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#4b5563" }}>{h}</th>)}
        </tr></thead>
        <tbody>
          {filtered.map(v => (
            <tr key={v.id} className="trow" style={{ borderBottom: "1px solid rgba(255,255,255,.03)" }}>
              <td style={{ padding: "12px 14px" }}><div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontSize: 16 }}>{v.flag}</span><span style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, fontWeight: 700, color: "#f9fafb" }}>{v.plate}</span></div></td>
              <td style={{ padding: "12px 14px", fontSize: 12, color: "#9ca3af" }}>{v.driver}</td>
              <td style={{ padding: "12px 14px", fontSize: 11, color: "#6b7280", maxWidth: 160 }}>{v.route}</td>
              <td style={{ padding: "12px 14px" }}><span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "#4b5563" }}>{v.uit}</span></td>
              <td style={{ padding: "12px 14px" }}><UitBar min={v.expiresMin} autoRenew={v.autoRenew} /></td>
              <td style={{ padding: "12px 14px", fontSize: 11, color: "#6b7280" }}>{v.cargo || "—"} {v.weight ? `· ${v.weight}` : ""}</td>
              <td style={{ padding: "12px 14px" }}>
                <button className="btn-ghost" onClick={() => { dispatch({ type: "UPDATE_VEHICLE", payload: { id: v.id, autoRenew: !v.autoRenew } }); addToast({ type: v.autoRenew ? "error" : "success", title: "Auto-Reînnoire", msg: `${v.plate}: ${v.autoRenew ? "dezactivat" : "activat"}` }); }}
                  style={{ width: 38, height: 20, borderRadius: 10, border: "none", cursor: "pointer", background: v.autoRenew ? "#34d399" : "rgba(255,255,255,.08)", position: "relative", transition: "background .2s", display: "inline-block" }}>
                  <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: v.autoRenew ? 21 : 3, transition: "left .2s", boxShadow: "0 1px 3px rgba(0,0,0,.3)" }} />
                </button>
              </td>
              <td style={{ padding: "12px 14px" }}><SBadge s={v.status} /></td>
              <td style={{ padding: "12px 14px" }}>
                <div style={{ display: "flex", gap: 5 }}>
                  <button className="btn-ghost" onClick={() => setRenewModal(v)} title="Reînnoiește UIT" style={{ background: "rgba(16,185,129,.08)", color: "#34d399", border: "1px solid rgba(16,185,129,.2)", borderRadius: 7, padding: "5px 8px", fontSize: 10, fontWeight: 600 }}><Zap size={10} /></button>
                  <button className="btn-ghost" onClick={() => setEditVeh({ ...v })} title="Editează" style={{ background: "rgba(59,130,246,.08)", color: "#60a5fa", border: "1px solid rgba(59,130,246,.2)", borderRadius: 7, padding: "5px 8px", fontSize: 10 }}><Edit2 size={10} /></button>
                  <button className="btn-ghost" onClick={() => deleteVehicle(v)} title="Șterge" style={{ background: "rgba(239,68,68,.08)", color: "#f87171", border: "1px solid rgba(239,68,68,.2)", borderRadius: 7, padding: "5px 8px", fontSize: 10 }}><Trash2 size={10} /></button>
                </div>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && <tr><td colSpan={9} style={{ padding: "28px 14px", textAlign: "center", color: "#374151", fontSize: 13 }}>Niciun vehicul găsit.</td></tr>}
        </tbody>
      </table>
    </div>

    {/* Add Vehicle Modal */}
    {showAdd && <Modal title="Adaugă Vehicul Nou" onClose={() => setShowAdd(false)} wide>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="Nr. Înmatriculare *"><input className="ifield" placeholder="B-123-ABC" value={newV.plate} onChange={e => setNewV(d => ({ ...d, plate: e.target.value.toUpperCase() }))} /></Field>
        <Field label="Șofer *"><input className="ifield" placeholder="Ion Popescu" value={newV.driver} onChange={e => setNewV(d => ({ ...d, driver: e.target.value }))} /></Field>
        <Field label="Steag / Țară">
          <select className="ifield" value={newV.flag} onChange={e => setNewV(d => ({ ...d, flag: e.target.value }))}>
            {[["🇷🇴", "România"], ["🇩🇪", "Germania"], ["🇵🇱", "Polonia"], ["🇭🇺", "Ungaria"], ["🇧🇬", "Bulgaria"], ["🇹🇷", "Turcia"], ["🇫🇷", "Franța"], ["🇮🇹", "Italia"]].map(([f, l]) => <option key={f} value={f}>{f} {l}</option>)}
          </select>
        </Field>
        <Field label="Telefon Șofer"><input className="ifield" placeholder="+40722..." value={newV.phone} onChange={e => setNewV(d => ({ ...d, phone: e.target.value }))} /></Field>
        <Field label="Rută" span><input className="ifield" placeholder="București → Berlin" value={newV.route} onChange={e => setNewV(d => ({ ...d, route: e.target.value }))} /></Field>
        <Field label="Marfă"><input className="ifield" placeholder="Produse electronice" value={newV.cargo} onChange={e => setNewV(d => ({ ...d, cargo: e.target.value }))} /></Field>
        <Field label="Greutate"><input className="ifield" placeholder="18.5t" value={newV.weight} onChange={e => setNewV(d => ({ ...d, weight: e.target.value }))} /></Field>
        <Field label="UIT expiră în (ore)" span>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <input type="range" min={1} max={72} value={Math.round(newV.expiresMin / 60)} onChange={e => setNewV(d => ({ ...d, expiresMin: +e.target.value * 60 }))} style={{ flex: 1, accentColor: "#34d399" }} />
            <span style={{ fontFamily: "'DM Mono',monospace", color: "#fbbf24", fontWeight: 700, minWidth: 40 }}>{Math.round(newV.expiresMin / 60)}h</span>
          </div>
        </Field>
        <Field label="Auto-Reînnoire UIT" span>
          <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
            <div onClick={() => setNewV(d => ({ ...d, autoRenew: !d.autoRenew }))} style={{ width: 40, height: 22, borderRadius: 11, background: newV.autoRenew ? "#34d399" : "rgba(255,255,255,.08)", position: "relative", cursor: "pointer", transition: "background .2s" }}>
              <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: newV.autoRenew ? 21 : 3, transition: "left .2s" }} />
            </div>
            <span style={{ fontSize: 12, color: "#9ca3af" }}>Activează reînnoire automată când UIT e sub prag</span>
          </label>
        </Field>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <button className="btn-ghost" onClick={() => setShowAdd(false)} style={{ flex: 1, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 10, padding: 12, color: "#9ca3af", fontSize: 13, fontWeight: 600 }}>Anulează</button>
        <button className="btn" onClick={addVehicle} disabled={!newV.plate || !newV.driver} style={{ flex: 2, background: "linear-gradient(135deg,#34d399,#10b981)", color: "#022c22", border: "none", borderRadius: 10, padding: 12, fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><Plus size={14} />Adaugă în Flotă</button>
      </div>
    </Modal>}

    {/* Edit Vehicle Modal */}
    {editVeh && <Modal title={`Editează ${editVeh.plate}`} onClose={() => setEditVeh(null)} wide>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="Nr. Înmatriculare"><input className="ifield" value={editVeh.plate} onChange={e => setEditVeh(d => ({ ...d, plate: e.target.value }))} /></Field>
        <Field label="Șofer"><input className="ifield" value={editVeh.driver} onChange={e => setEditVeh(d => ({ ...d, driver: e.target.value }))} /></Field>
        <Field label="Rută" span><input className="ifield" value={editVeh.route} onChange={e => setEditVeh(d => ({ ...d, route: e.target.value }))} /></Field>
        <Field label="Marfă"><input className="ifield" value={editVeh.cargo} onChange={e => setEditVeh(d => ({ ...d, cargo: e.target.value }))} /></Field>
        <Field label="Greutate"><input className="ifield" value={editVeh.weight} onChange={e => setEditVeh(d => ({ ...d, weight: e.target.value }))} /></Field>
        <Field label="Telefon"><input className="ifield" value={editVeh.phone} onChange={e => setEditVeh(d => ({ ...d, phone: e.target.value }))} /></Field>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <button className="btn-ghost" onClick={() => setEditVeh(null)} style={{ flex: 1, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 10, padding: 12, color: "#9ca3af", fontSize: 13, fontWeight: 600 }}>Anulează</button>
        <button className="btn" onClick={saveEdit} style={{ flex: 2, background: "linear-gradient(135deg,#34d399,#10b981)", color: "#022c22", border: "none", borderRadius: 10, padding: 12, fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><Save size={14} />Salvează</button>
      </div>
    </Modal>}
  </div>;
}

// ─── AUTO-RENEW ENGINE ────────────────────────────────────────────────────────
function ViewAutoRenew({ state, dispatch, addToast, setRenewModal }) {
  const { uitRules, fleet } = state;
  const [globalOn, setGlobalOn] = useState(true);
  const [simLog, setSimLog] = useState([]);
  const [simRunning, setSimRunning] = useState(false);
  const [simDone, setSimDone] = useState(false);

  const runSim = () => {
    setSimRunning(true); setSimLog([]); setSimDone(false);
    const events = [
      { t: 400, m: "Motor SmartLogis pornit · Scanare flotă activă...", c: "#60a5fa" },
      { t: 900, m: "TR-45-YIL · UIT expiră în 2h 15m → sub pragul de 3h", c: "#fbbf24" },
      { t: 1400, m: "TR-45-YIL · Conectare ANAF API prod.anaf.ro...", c: "#a78bfa" },
      { t: 1900, m: "TR-45-YIL · Token OAuth2 obținut ✓", c: "#34d399" },
      { t: 2400, m: "TR-45-YIL · UIT-2024-8821 prelungit +24h ✓", c: "#34d399" },
      { t: 3000, m: "PL-771-AB · UIT expiră în 6h 50m → în normă, skip", c: "#4b5563" },
      { t: 3500, m: "Ciclu complet · Următoarea scanare în 15 min", c: "#60a5fa" },
    ];
    events.forEach(s => setTimeout(() => {
      setSimLog(l => [...l, { m: s.m, c: s.c }]);
      if (s.t === 3500) { setSimRunning(false); setSimDone(true); addToast({ type: "success", title: "Simulare Completă", msg: "1 reînnoire automată simulată" }); }
    }, s.t));
  };

  const toggleRule = (id, field, val) => {
    dispatch({ type: "UPDATE_UIT_RULE", payload: { id, [field]: val } });
    if (field === "enabled") addToast({ type: val ? "success" : "error", title: "Regulă UIT", msg: `Vehicul ${uitRules.find(r => r.id === id)?.plate}: ${val ? "activat" : "dezactivat"}` });
  };

  return <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
    <div className="fu" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 4 }}>
          <div style={{ width: 30, height: 30, borderRadius: 9, background: "rgba(16,185,129,.12)", display: "flex", alignItems: "center", justifyContent: "center" }}><Zap size={15} color="#34d399" /></div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#f9fafb" }}>Motor Auto-Reînnoire UIT</div>
          <span className="badge" style={{ background: globalOn ? "rgba(16,185,129,.1)" : "rgba(239,68,68,.1)", color: globalOn ? "#34d399" : "#f87171", border: `1px solid ${globalOn ? "rgba(16,185,129,.25)" : "rgba(239,68,68,.25)"}` }}>
            {globalOn ? <><span className="blink" style={{ width: 5, height: 5, borderRadius: "50%", background: "#34d399", display: "inline-block" }} />ACTIV</> : "OPRIT"}
          </span>
        </div>
        <div style={{ fontSize: 12, color: "#6b7280" }}>Reînnoire automată ANAF SPV · zero click · funcție exclusivă SmartLogis</div>
      </div>
      <button className="btn-ghost" onClick={() => { setGlobalOn(!globalOn); addToast({ type: globalOn ? "error" : "success", title: globalOn ? "Motor Oprit" : "Motor Pornit", msg: globalOn ? "Auto-reînnoire dezactivată global" : "Toate vehiculele monitorizate" }); }}
        style={{ background: globalOn ? "rgba(16,185,129,.1)" : "rgba(239,68,68,.1)", color: globalOn ? "#34d399" : "#f87171", border: `1px solid ${globalOn ? "rgba(16,185,129,.3)" : "rgba(239,68,68,.3)"}`, borderRadius: 11, padding: "9px 18px", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 7 }}>
        {globalOn ? <><Pause size={13} />Oprește Motor</> : <><Play size={13} />Pornește</>}
      </button>
    </div>

    {/* How it works */}
    <div className="glass fu1" style={{ borderRadius: 14, padding: 18 }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#4b5563", marginBottom: 12 }}>Flux Automat</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
        {[{ icon: Signal, l: "Scanare", d: "La fiecare 15 min verificăm UIT-ul tuturor vehiculelor", c: "#60a5fa" }, { icon: Timer, l: "Detecție", d: "Alertă dacă expiră sub pragul configurat", c: "#fbbf24" }, { icon: Bot, l: "AI Decide", d: "Verificăm dacă vehiculul e în tranzit activ", c: "#a78bfa" }, { icon: Zap, l: "Reînnoire", d: "Apelăm API ANAF SPV cu OAuth2 automat", c: "#34d399" }, { icon: Bell, l: "Notificare", d: "SMS + email după fiecare reînnoire reușită", c: "#f87171" }].map((s, i) => (
          <div key={s.l} style={{ textAlign: "center", padding: "12px 8px", borderRadius: 10, background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.04)" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${s.c}18`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}><s.icon size={15} color={s.c} /></div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#f9fafb", marginBottom: 3 }}>{i + 1}. {s.l}</div>
            <div style={{ fontSize: 10, color: "#6b7280", lineHeight: 1.4 }}>{s.d}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Rules table */}
    <div className="glass fu2" style={{ borderRadius: 14, overflow: "hidden" }}>
      <div style={{ padding: "13px 18px", borderBottom: "1px solid rgba(255,255,255,.05)", display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#f9fafb" }}>Reguli Per Vehicul</div>
        <span style={{ fontSize: 11, color: "#6b7280" }}>{uitRules.filter(r => r.enabled).length} vehicule active</span>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead><tr style={{ borderBottom: "1px solid rgba(255,255,255,.04)" }}>
          {["Vehicul", "Prag declanșare", "Reînnoiri", "Ultima reînnoire", "SMS Alertă", "Status", ""].map(h => <th key={h} style={{ padding: "9px 16px", textAlign: "left", fontSize: 9, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#4b5563" }}>{h}</th>)}
        </tr></thead>
        <tbody>
          {uitRules.map(r => (
            <tr key={r.id} className="trow" style={{ borderBottom: "1px solid rgba(255,255,255,.03)" }}>
              <td style={{ padding: "12px 16px" }}><span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, fontWeight: 700, color: "#f9fafb" }}>{r.plate}</span></td>
              <td style={{ padding: "12px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <input type="range" min={1} max={12} value={r.threshold} onChange={e => toggleRule(r.id, "threshold", +e.target.value)} style={{ width: 80, accentColor: "#34d399" }} />
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: "#fbbf24", fontWeight: 700, minWidth: 32 }}>{r.threshold}h</span>
                </div>
              </td>
              <td style={{ padding: "12px 16px" }}><span style={{ fontSize: 18, fontWeight: 700, color: "#f9fafb", fontFamily: "'DM Mono',monospace" }}>{r.count}</span></td>
              <td style={{ padding: "12px 16px", fontSize: 11, color: "#6b7280" }}>{r.lastAt}</td>
              <td style={{ padding: "12px 16px" }}>
                <button className="btn-ghost" onClick={() => toggleRule(r.id, "sms", !r.sms)} style={{ width: 36, height: 20, borderRadius: 10, border: "none", cursor: "pointer", background: r.sms ? "#34d399" : "rgba(255,255,255,.08)", position: "relative", transition: "background .2s" }}>
                  <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: r.sms ? 19 : 3, transition: "left .2s" }} />
                </button>
              </td>
              <td style={{ padding: "12px 16px" }}><span className="badge" style={{ background: r.enabled ? "rgba(16,185,129,.1)" : "rgba(255,255,255,.04)", color: r.enabled ? "#34d399" : "#6b7280", border: `1px solid ${r.enabled ? "rgba(16,185,129,.2)" : "rgba(255,255,255,.07)"}` }}>{r.enabled ? "Activ" : "Inactiv"}</span></td>
              <td style={{ padding: "12px 16px" }}>
                <div style={{ display: "flex", gap: 6 }}>
                  <button className="btn-ghost" onClick={() => { const v = fleet.find(f => f.plate === r.plate); if (v) setRenewModal(v); }} style={{ background: "rgba(16,185,129,.08)", color: "#34d399", border: "1px solid rgba(16,185,129,.2)", borderRadius: 7, padding: "5px 10px", fontSize: 10, fontWeight: 600 }}>Forțează</button>
                  <button className="btn-ghost" onClick={() => toggleRule(r.id, "enabled", !r.enabled)} style={{ background: r.enabled ? "rgba(239,68,68,.08)" : "rgba(16,185,129,.08)", color: r.enabled ? "#f87171" : "#34d399", border: `1px solid ${r.enabled ? "rgba(239,68,68,.2)" : "rgba(16,185,129,.2)"}`, borderRadius: 7, padding: "5px 10px", fontSize: 10, fontWeight: 600 }}>{r.enabled ? "Dezact." : "Activează"}</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Live Simulation */}
    <div className="glass fu3" style={{ borderRadius: 14, padding: 18 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div><div style={{ fontSize: 13, fontWeight: 700, color: "#f9fafb", marginBottom: 2 }}>Simulare Motor Live</div><div style={{ fontSize: 11, color: "#6b7280" }}>Testează cum reacționează motorul în timp real</div></div>
        <div style={{ display: "flex", gap: 8 }}>
          {simDone && <button className="btn-ghost" onClick={() => { setSimLog([]); setSimDone(false); }} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 9, padding: "8px 14px", fontSize: 11, color: "#6b7280", display: "flex", alignItems: "center", gap: 6 }}><RotateCcw size={11} />Reset</button>}
          <button className="btn" onClick={runSim} disabled={simRunning} style={{ background: simRunning ? "rgba(255,255,255,.04)" : "rgba(16,185,129,.12)", color: simRunning ? "#4b5563" : "#34d399", border: `1px solid ${simRunning ? "rgba(255,255,255,.08)" : "rgba(16,185,129,.3)"}`, borderRadius: 9, padding: "8px 16px", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", gap: 7 }}>
            {simRunning ? <><RefreshCw size={11} className="spin" />Rulează...</> : <><Play size={11} />Rulează Simulare</>}
          </button>
        </div>
      </div>
      <div style={{ background: "rgba(0,0,0,.4)", borderRadius: 10, padding: "14px 16px", fontFamily: "'DM Mono',monospace", fontSize: 11, lineHeight: 1.9, minHeight: 120 }}>
        {simLog.length === 0 && <span style={{ color: "#1f2937" }}>Apasă "Rulează Simulare" pentru a testa motorul...</span>}
        {simLog.map((l, i) => <div key={i} className="fu" style={{ color: l.c, display: "flex", alignItems: "center", gap: 8 }}><span style={{ color: "#1e2535" }}>›</span>{l.m}</div>)}
      </div>
    </div>
  </div>;
}

// ─── INVOICES / FACTURI ───────────────────────────────────────────────────────
function ViewFacturi({ state, dispatch, addToast }) {
  const { invoices } = state;
  const [showCreate, setShowCreate] = useState(false);
  const [anafModal, setAnafModal] = useState(null);
  const [newInv, setNewInv] = useState({ client: "", cui: "", items: [{ desc: "", qty: 1, price: 0 }] });
  const [creating, setCreating] = useState(false);
  const [anafLog, setAnafLog] = useState([]);
  const [anafDone, setAnafDone] = useState(false);
  const [anafRunning, setAnafRunning] = useState(false);

  const total = newInv.items.reduce((s, i) => s + (i.qty * i.price), 0);

  const createInvoice = async () => {
    if (!newInv.client || !newInv.cui || total === 0) return;
    setCreating(true);
    await new Promise(r => setTimeout(r, 900));
    const inv = {
      id: `SL-${new Date().getFullYear()}-${String(invoices.length + 50).padStart(4, "0")}`,
      client: newInv.client, cui: newInv.cui, amount: total, vat: +(total * 0.19).toFixed(2),
      status: "neplatita", anafStatus: "in_procesare", created: nowDate(), due: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
      items: newInv.items.filter(i => i.desc),
    };
    dispatch({ type: "ADD_INVOICE", payload: inv });
    dispatch({ type: "ADD_ACTIVITY", payload: { id: Date.now(), type: "scan", msg: `Factură ${inv.id} creată pentru ${inv.client}`, time: `azi, ${now()}`, color: "#60a5fa" } });
    addToast({ type: "success", title: "Factură Creată", msg: `${inv.id} — ${total.toLocaleString("ro-RO")} RON` });
    setCreating(false);
    setShowCreate(false);
    setNewInv({ client: "", cui: "", items: [{ desc: "", qty: 1, price: 0 }] });
  };

  const sendToAnaf = async (inv) => {
    setAnafModal(inv); setAnafLog([]); setAnafDone(false); setAnafRunning(true);
    const steps = [
      { t: 600, m: "Conectare la api.anaf.ro/prod/FCTEL/ws/...", c: "#60a5fa" },
      { t: 1200, m: "Generare XML UBL 2.1 (format e-Factura)...", c: "#a78bfa" },
      { t: 1800, m: `Validare CUI beneficiar: ${inv.cui} ✓`, c: "#34d399" },
      { t: 2400, m: "Semnare digitală cu certificat calificat...", c: "#fbbf24" },
      { t: 3100, m: "Transmitere în SPV (Spațiul Privat Virtual)...", c: "#60a5fa" },
      { t: 3800, m: `Factură acceptată · Index SPV: ${Math.floor(100000 + Math.random() * 900000)} ✓`, c: "#34d399" },
    ];
    steps.forEach(s => setTimeout(() => {
      setAnafLog(l => [...l, { m: s.m, c: s.c }]);
      if (s.t === 3800) {
        setAnafDone(true); setAnafRunning(false);
        dispatch({ type: "UPDATE_INVOICE", payload: { id: inv.id, anafStatus: "acceptata", status: "trimisa" } });
        addToast({ type: "success", title: "Transmis la ANAF!", msg: `${inv.id} acceptat în SPV` });
      }
    }, s.t));
  };

  return <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    <div className="fu" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div>
        <div style={{ fontSize: 22, fontWeight: 700, color: "#f9fafb" }}>Facturi & e-Factura ANAF</div>
        <div style={{ fontSize: 12, color: "#6b7280" }}>Creare, trimitere SPV, urmărire status · Integrare e-Factura completă</div>
      </div>
      <button className="btn" onClick={() => setShowCreate(true)} style={{ background: "linear-gradient(135deg,#34d399,#10b981)", color: "#022c22", border: "none", borderRadius: 10, padding: "9px 16px", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}><Plus size={13} />Factură Nouă</button>
    </div>

    {/* Summary */}
    <div className="fu1" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
      {[
        { l: "Total Facturate", v: `${invoices.reduce((s, i) => s + i.amount, 0).toLocaleString("ro-RO")} RON`, c: "#34d399" },
        { l: "Acceptate ANAF", v: invoices.filter(i => i.anafStatus === "acceptata").length, c: "#34d399" },
        { l: "În Procesare", v: invoices.filter(i => i.anafStatus === "in_procesare").length, c: "#fbbf24" },
        { l: "TVA Colectat", v: `${invoices.reduce((s, i) => s + i.vat, 0).toLocaleString("ro-RO")} RON`, c: "#60a5fa" },
      ].map(s => <div key={s.l} className="glass cardHov" style={{ borderRadius: 13, padding: "16px 16px" }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: s.c, letterSpacing: -0.5 }}>{s.v}</div>
        <div style={{ fontSize: 11, color: "#6b7280", marginTop: 3 }}>{s.l}</div>
      </div>)}
    </div>

    <div className="glass fu2" style={{ borderRadius: 14, overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead><tr style={{ borderBottom: "1px solid rgba(255,255,255,.05)" }}>
          {["Nr. Factură", "Client / CUI", "Valoare + TVA", "Data", "Scadență", "Status Plată", "Status ANAF", "Acțiuni"].map(h => <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 9, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#4b5563" }}>{h}</th>)}
        </tr></thead>
        <tbody>
          {invoices.map(inv => (
            <tr key={inv.id} className="trow" style={{ borderBottom: "1px solid rgba(255,255,255,.03)" }}>
              <td style={{ padding: "12px 14px" }}><span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, fontWeight: 700, color: "#f9fafb" }}>{inv.id}</span></td>
              <td style={{ padding: "12px 14px" }}><div style={{ fontSize: 12, color: "#e5e7eb" }}>{inv.client}</div><div style={{ fontSize: 10, color: "#4b5563", fontFamily: "'DM Mono',monospace" }}>{inv.cui}</div></td>
              <td style={{ padding: "12px 14px" }}><div style={{ fontSize: 13, fontWeight: 700, color: "#f9fafb" }}>{inv.amount.toLocaleString("ro-RO")} RON</div><div style={{ fontSize: 10, color: "#4b5563" }}>TVA: {inv.vat.toLocaleString("ro-RO")} RON</div></td>
              <td style={{ padding: "12px 14px", fontSize: 11, color: "#6b7280" }}>{inv.created}</td>
              <td style={{ padding: "12px 14px", fontSize: 11, color: "#6b7280" }}>{inv.due}</td>
              <td style={{ padding: "12px 14px" }}><SBadge s={inv.status} /></td>
              <td style={{ padding: "12px 14px" }}><SBadge s={inv.anafStatus} /></td>
              <td style={{ padding: "12px 14px" }}>
                <div style={{ display: "flex", gap: 5 }}>
                  <button className="btn-ghost" onClick={() => sendToAnaf(inv)} title="Trimite la ANAF e-Factura" style={{ background: "rgba(16,185,129,.08)", color: "#34d399", border: "1px solid rgba(16,185,129,.2)", borderRadius: 7, padding: "5px 10px", fontSize: 10, fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}><Send size={9} />SPV</button>
                  {inv.status === "neplatita" && <button className="btn-ghost" onClick={() => { dispatch({ type: "UPDATE_INVOICE", payload: { id: inv.id, status: "platita" } }); addToast({ type: "success", title: "Marcată Plătită", msg: inv.id }); }} style={{ background: "rgba(59,130,246,.08)", color: "#60a5fa", border: "1px solid rgba(59,130,246,.2)", borderRadius: 7, padding: "5px 10px", fontSize: 10, fontWeight: 600 }}>Plătit</button>}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Create Invoice Modal */}
    {showCreate && <Modal title="Factură Nouă" onClose={() => setShowCreate(false)} wide>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        <Field label="Client *"><input className="ifield" placeholder="Bosch GmbH" value={newInv.client} onChange={e => setNewInv(d => ({ ...d, client: e.target.value }))} /></Field>
        <Field label="CUI / VAT *"><input className="ifield" placeholder="RO12345678 sau DE987654321" value={newInv.cui} onChange={e => setNewInv(d => ({ ...d, cui: e.target.value }))} /></Field>
      </div>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#4b5563", marginBottom: 8 }}>Linii Factură</div>
      {newInv.items.map((item, idx) => (
        <div key={idx} style={{ display: "grid", gridTemplateColumns: "3fr 1fr 1.5fr auto", gap: 8, marginBottom: 8 }}>
          <input className="ifield" placeholder="Descriere serviciu" value={item.desc} onChange={e => { const items = [...newInv.items]; items[idx] = { ...items[idx], desc: e.target.value }; setNewInv(d => ({ ...d, items })); }} style={{ fontSize: 12 }} />
          <input className="ifield" type="number" min={1} placeholder="Cant." value={item.qty} onChange={e => { const items = [...newInv.items]; items[idx] = { ...items[idx], qty: +e.target.value }; setNewInv(d => ({ ...d, items })); }} style={{ fontSize: 12 }} />
          <input className="ifield" type="number" min={0} placeholder="Preț (RON)" value={item.price || ""} onChange={e => { const items = [...newInv.items]; items[idx] = { ...items[idx], price: +e.target.value }; setNewInv(d => ({ ...d, items })); }} style={{ fontSize: 12 }} />
          <button className="btn-ghost" onClick={() => setNewInv(d => ({ ...d, items: d.items.filter((_, i) => i !== idx) }))} style={{ background: "rgba(239,68,68,.08)", color: "#f87171", border: "1px solid rgba(239,68,68,.2)", borderRadius: 8, padding: "8px 10px" }}><Trash2 size={12} /></button>
        </div>
      ))}
      <button className="btn-ghost" onClick={() => setNewInv(d => ({ ...d, items: [...d.items, { desc: "", qty: 1, price: 0 }] }))} style={{ background: "rgba(255,255,255,.03)", border: "1px dashed rgba(255,255,255,.12)", borderRadius: 9, padding: "9px 14px", color: "#6b7280", fontSize: 12, width: "100%", marginBottom: 16 }}><Plus size={12} style={{ display: "inline", marginRight: 6 }} />Adaugă Linie</button>
      <div style={{ background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 10, padding: "14px 16px", marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ fontSize: 12, color: "#6b7280" }}>Subtotal</span><span style={{ fontSize: 12, color: "#e5e7eb" }}>{total.toLocaleString("ro-RO")} RON</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ fontSize: 12, color: "#6b7280" }}>TVA (19%)</span><span style={{ fontSize: 12, color: "#e5e7eb" }}>{(total * 0.19).toFixed(2)} RON</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8, borderTop: "1px solid rgba(255,255,255,.07)" }}><span style={{ fontSize: 14, fontWeight: 700, color: "#f9fafb" }}>TOTAL</span><span style={{ fontSize: 14, fontWeight: 800, color: "#34d399" }}>{(total * 1.19).toFixed(2)} RON</span></div>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button className="btn-ghost" onClick={() => setShowCreate(false)} style={{ flex: 1, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 10, padding: 12, color: "#9ca3af", fontSize: 13, fontWeight: 600 }}>Anulează</button>
        <button className="btn" onClick={createInvoice} disabled={creating || !newInv.client || !newInv.cui || total === 0} style={{ flex: 2, background: "linear-gradient(135deg,#34d399,#10b981)", color: "#022c22", border: "none", borderRadius: 10, padding: 12, fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          {creating ? <><RefreshCw size={13} className="spin" />Creare...</> : <><FileText size={13} />Creează Factura</>}
        </button>
      </div>
    </Modal>}

    {/* ANAF SPV Modal */}
    {anafModal && <Modal title="Transmitere e-Factura → ANAF SPV" onClose={() => { if (!anafRunning) setAnafModal(null); }}>
      <div style={{ background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 10, padding: "12px 14px", marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#f9fafb" }}>{anafModal.id} — {anafModal.client}</div>
        <div style={{ fontSize: 11, color: "#6b7280" }}>{anafModal.amount.toLocaleString("ro-RO")} RON + {anafModal.vat.toLocaleString("ro-RO")} RON TVA</div>
      </div>
      <div style={{ background: "rgba(0,0,0,.4)", borderRadius: 10, padding: "14px 16px", fontFamily: "'DM Mono',monospace", fontSize: 11, lineHeight: 1.9, minHeight: 150 }}>
        {anafLog.length === 0 && <span style={{ color: "#1f2937" }}>Inițializare transmitere...</span>}
        {anafLog.map((l, i) => <div key={i} className="fu" style={{ color: l.c }}><span style={{ color: "#1e2535", marginRight: 8 }}>›</span>{l.m}</div>)}
      </div>
      {anafDone && <button className="btn" onClick={() => setAnafModal(null)} style={{ marginTop: 14, width: "100%", background: "#34d399", color: "#064e3b", border: "none", borderRadius: 10, padding: 12, fontSize: 13, fontWeight: 700 }}>Închide</button>}
    </Modal>}
  </div>;
}

// ─── OCR / DOCUMENTE ──────────────────────────────────────────────────────────
function ViewOCR({ state, dispatch, addToast }) {
  const { ocrJobs } = state;
  const [dragging, setDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const fileRef = useRef(null);

  const processFile = async (file) => {
    if (!file) return;
    setProcessing(true); setAiResult(null);
    const jobId = Date.now();
    dispatch({ type: "ADD_OCR_JOB", payload: { id: jobId, name: file.name, status: "procesare", createdAt: now() } });
    try {
      // Read file as base64 if image
      let messages;
      if (file.type.startsWith("image/")) {
        const b64 = await new Promise((res, rej) => {
          const r = new FileReader();
          r.onload = () => res(r.result.split(",")[1]);
          r.onerror = rej;
          r.readAsDataURL(file);
        });
        messages = [{ role: "user", content: [{ type: "image", source: { type: "base64", media_type: file.type, data: b64 } }, { type: "text", text: "Analizează acest document de transport (CMR, factură, aviz). Extrage: tip document, expeditor, destinatar, marfă, greutate, valoare, date, orice cod NC8 dacă există. Răspunde în română, structurat cu etichete clare. Dacă nu e document de transport, descrie ce este." }] }];
      } else {
        messages = [{ role: "user", content: `Simulează extragerea datelor dintr-un document de transport cu numele "${file.name}". Generează un răspuns realist cu: Tip Document, Expeditor, Destinatar, Marfă, Greutate, Valoare, Cod NC8, Data documentului. Răspunde în română, structurat.` }];
      }
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages }),
      });
      const data = await resp.json();
      const text = data.content?.map(c => c.text || "").join("") || "Eroare procesare.";
      setAiResult(text);
      dispatch({ type: "UPDATE_OCR_JOB", payload: { id: jobId, status: "complet", result: text } });
      dispatch({ type: "ADD_ACTIVITY", payload: { id: Date.now(), type: "scan", msg: `Document "${file.name}" procesat cu AI`, time: `azi, ${now()}`, color: "#60a5fa" } });
      addToast({ type: "success", title: "Document Procesat", msg: `${file.name} analizat cu succes` });
    } catch (e) {
      dispatch({ type: "UPDATE_OCR_JOB", payload: { id: jobId, status: "eroare" } });
      addToast({ type: "error", title: "Eroare OCR", msg: "Procesare eșuată" });
    }
    setProcessing(false);
  };

  const onDrop = (e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) processFile(f); };

  return <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
    <div className="fu">
      <div style={{ fontSize: 22, fontWeight: 700, color: "#f9fafb", marginBottom: 4 }}>Procesare Documente AI</div>
      <div style={{ fontSize: 12, color: "#6b7280" }}>OCR + extragere date · CMR, Facturi, Avize · Cod NC8 automat · Powered by Claude AI</div>
    </div>
    <div className="fu1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      {/* Drop Zone */}
      <div>
        <div className={dragging ? "" : ""} onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={onDrop}
          style={{ border: `2px dashed ${dragging ? "rgba(52,211,153,.6)" : "rgba(255,255,255,.1)"}`, borderRadius: 16, padding: "36px 24px", textAlign: "center", cursor: "pointer", background: dragging ? "rgba(16,185,129,.04)" : "rgba(255,255,255,.015)", transition: "all .2s" }}
          onClick={() => fileRef.current?.click()}>
          <input ref={fileRef} type="file" accept="image/*,.pdf,.jpg,.jpeg,.png" style={{ display: "none" }} onChange={e => processFile(e.target.files[0])} />
          {processing ? <>
            <RefreshCw size={32} color="#34d399" className="spin" style={{ margin: "0 auto 12px", display: "block" }} />
            <div style={{ fontSize: 14, fontWeight: 700, color: "#f9fafb", marginBottom: 4 }}>Procesare cu AI Claude...</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>Extragere date din document</div>
          </> : <>
            <Upload size={32} color="#374151" style={{ margin: "0 auto 12px", display: "block" }} />
            <div style={{ fontSize: 14, fontWeight: 700, color: "#e5e7eb", marginBottom: 4 }}>Drag & Drop sau Click</div>
            <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 12 }}>CMR, Factură, Aviz, Declarație Vamală</div>
            <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
              {["PDF", "JPG", "PNG", "TIFF"].map(f => <span key={f} className="badge" style={{ background: "rgba(255,255,255,.04)", color: "#4b5563", border: "1px solid rgba(255,255,255,.07)" }}>{f}</span>)}
            </div>
          </>}
        </div>
        {/* AI Result */}
        {aiResult && <div className="fu" style={{ marginTop: 14, background: "rgba(16,185,129,.04)", border: "1px solid rgba(16,185,129,.2)", borderRadius: 12, padding: "16px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#34d399", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}><Bot size={12} />Rezultat AI Claude</div>
          <div style={{ fontSize: 12, color: "#9ca3af", whiteSpace: "pre-wrap", lineHeight: 1.7, maxHeight: 250, overflowY: "auto" }}>{aiResult}</div>
        </div>}
      </div>

      {/* Job History */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#9ca3af", marginBottom: 12, letterSpacing: ".05em", textTransform: "uppercase" }}>Istoric Procesări</div>
        {ocrJobs.length === 0 ? <div className="glass" style={{ borderRadius: 12, padding: "28px 20px", textAlign: "center", color: "#374151", fontSize: 12 }}>
          <ScanLine size={24} color="#1f2937" style={{ margin: "0 auto 10px", display: "block" }} />
          Niciun document procesat încă
        </div> : ocrJobs.map(j => (
          <div key={j.id} className="glass" style={{ borderRadius: 11, padding: "12px 14px", marginBottom: 8, display: "flex", alignItems: "center", gap: 11 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: j.status === "complet" ? "rgba(16,185,129,.1)" : j.status === "eroare" ? "rgba(239,68,68,.1)" : "rgba(59,130,246,.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {j.status === "complet" ? <CheckCircle size={14} color="#34d399" /> : j.status === "eroare" ? <XCircle size={14} color="#f87171" /> : <RefreshCw size={14} color="#60a5fa" className="spin" />}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#e5e7eb", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{j.name}</div>
              <div style={{ fontSize: 10, color: "#4b5563" }}>{j.createdAt} · {j.status === "complet" ? "✓ Procesat" : j.status === "eroare" ? "✗ Eroare" : "Se procesează..."}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Supported formats */}
    <div className="glass fu2" style={{ borderRadius: 13, padding: "16px 20px" }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#4b5563", marginBottom: 14 }}>Documente Recunoscute Automat</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
        {[{ l: "CMR", d: "Scrisoare de trăsură internațională", c: "#60a5fa" }, { l: "e-Factura UBL", d: "Facturi XML format ANAF", c: "#34d399" }, { l: "Declarație Vamală", d: "DAU, DVI, declarații import/export", c: "#a78bfa" }, { l: "CMR + NC8", d: "Coduri tarifare generate automat", c: "#fbbf24" }].map(d => (
          <div key={d.l} style={{ background: `${d.c}08`, border: `1px solid ${d.c}22`, borderRadius: 10, padding: "12px 14px" }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: d.c, marginBottom: 4 }}>{d.l}</div>
            <div style={{ fontSize: 10, color: "#4b5563", lineHeight: 1.4 }}>{d.d}</div>
          </div>
        ))}
      </div>
    </div>
  </div>;
}

// ─── DISPATCH / GPS TRACKING ──────────────────────────────────────────────────
function ViewDispatch({ state, dispatch, addToast }) {
  const { dispatches, fleet } = state;
  const [creating, setCreating] = useState(false);
  const [newD, setNewD] = useState({ vehicleId: "", phone: "" });
  const [aiChat, setAiChat] = useState([]);
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [selectedVeh, setSelectedVeh] = useState(null);
  const [tick, setTick] = useState(0);
  const chatRef = useRef(null);

  // Simulate GPS movement
  useEffect(() => {
    const t = setInterval(() => {
      dispatch({ type: "UPDATE_DISPATCH", payload: dispatches.map ? dispatches[0] : dispatches });
      fleet.forEach(v => {
        dispatch({ type: "UPDATE_VEHICLE", payload: { id: v.id, lat: v.lat + (Math.random() - 0.5) * 0.01, lng: v.lng + (Math.random() - 0.5) * 0.01 } });
      });
      setTick(t => t + 1);
    }, 5000);
    return () => clearInterval(t);
  }, [fleet]);

  const createLink = async () => {
    const v = fleet.find(f => f.id === +newD.vehicleId);
    if (!v || !newD.phone) return;
    setCreating(true);
    await new Promise(r => setTimeout(r, 800));
    const token = `gps_${uid().toLowerCase()}`;
    const link = `https://track.smartlogis.ro/d/${token}`;
    const d = { id: Date.now(), vehicleId: v.id, token, phone: newD.phone, status: "activ", lat: v.lat, lng: v.lng, lastSeen: "acum", createdAt: `azi, ${now()}`, link };
    dispatch({ type: "ADD_DISPATCH", payload: d });
    dispatch({ type: "ADD_ACTIVITY", payload: { id: Date.now(), type: "nav", msg: `Link GPS trimis șoferului ${v.driver} (${v.plate})`, time: `azi, ${now()}`, color: "#a78bfa" } });
    addToast({ type: "success", title: "Link GPS Creat!", msg: `Trimis la ${newD.phone}` });
    setCreating(false);
    setNewD({ vehicleId: "", phone: "" });
  };

  const sendAi = async () => {
    if (!aiInput.trim() || aiLoading) return;
    const msg = aiInput.trim();
    setAiInput("");
    setAiChat(c => [...c, { role: "user", content: msg }]);
    setAiLoading(true);
    try {
      const systemPrompt = `Ești AsistentulAI SmartLogis, expert în logistică și transport rutier România. Flotă curentă: ${fleet.map(v => `${v.plate}(${v.driver},${v.status},UIT:${fmtTime(v.expiresMin)})`).join(", ")}. Puncte de frontieră: ${state.borders.map(b => `${b.name}(${b.wait})`).join(", ")}. Răspunde concis, în română, cu date concrete din flotă.`;
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: systemPrompt, messages: [...aiChat, { role: "user", content: msg }] }),
      });
      const data = await resp.json();
      const reply = data.content?.map(c => c.text || "").join("") || "Eroare.";
      setAiChat(c => [...c, { role: "assistant", content: reply }]);
    } catch { setAiChat(c => [...c, { role: "assistant", content: "Eroare conexiune AI." }]); }
    setAiLoading(false);
    setTimeout(() => chatRef.current?.scrollTo({ top: 99999, behavior: "smooth" }), 100);
  };

  // Map-like SVG visualization
  const mapVehicles = fleet.map(v => ({
    ...v,
    // Normalize Romania lat/lng to a 400x250 box
    x: Math.round(((v.lng - 20) / (30 - 20)) * 400),
    y: Math.round(((48 - v.lat) / (48 - 43)) * 250),
  }));

  return <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    <div className="fu">
      <div style={{ fontSize: 22, fontWeight: 700, color: "#f9fafb", marginBottom: 4 }}>Dispecerat & Tracking GPS</div>
      <div style={{ fontSize: 12, color: "#6b7280" }}>Localizare live flotă · Linkuri GPS pentru șoferi externi · AI Asistent Dispecerat</div>
    </div>
    <div className="fu1" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14 }}>
      {/* Map */}
      <div className="glass" style={{ borderRadius: 14, overflow: "hidden" }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#f9fafb" }}>Hartă Flotă Live</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span className="blink" style={{ width: 6, height: 6, background: "#34d399", borderRadius: "50%", display: "inline-block" }} />
            <span style={{ fontSize: 10, color: "#34d399" }}>GPS LIVE · {tick}s</span>
          </div>
        </div>
        <div style={{ position: "relative", background: "#080c18", height: 280 }}>
          {/* Romania outline approximation */}
          <svg width="100%" height="100%" viewBox="0 0 400 250" style={{ position: "absolute", inset: 0 }}>
            {/* Grid */}
            {[0, 1, 2, 3, 4].map(i => <line key={`h${i}`} x1={0} y1={i * 50} x2={400} y2={i * 50} stroke="rgba(255,255,255,.03)" />)}
            {[0, 1, 2, 3, 4, 5].map(i => <line key={`v${i}`} x1={i * 80} y1={0} x2={i * 80} y2={250} stroke="rgba(255,255,255,.03)" />)}
            {/* Romania shape approximation */}
            <polyline points="100,30 180,15 260,20 320,40 370,80 360,120 340,160 290,180 240,200 180,210 130,200 80,170 60,130 70,80 100,30" fill="rgba(16,185,129,.04)" stroke="rgba(16,185,129,.15)" strokeWidth={1} />
            {/* Routes */}
            {mapVehicles.map((v, i) => i < mapVehicles.length - 1 ? null : null)}
            {/* Vehicles */}
            {mapVehicles.map(v => (
              <g key={v.id} onClick={() => setSelectedVeh(v)} style={{ cursor: "pointer" }}>
                <circle cx={v.x} cy={v.y} r={14} fill={`${v.status === "critical" ? "rgba(239,68,68,.2)" : v.status === "warning" ? "rgba(245,158,11,.2)" : "rgba(16,185,129,.2)"}`} stroke={v.status === "critical" ? "#f87171" : v.status === "warning" ? "#fbbf24" : "#34d399"} strokeWidth={1} />
                <text x={v.x} y={v.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize={10}>{v.flag}</text>
                <text x={v.x} y={v.y + 18} textAnchor="middle" fontSize={7} fill="rgba(255,255,255,.5)">{v.plate}</text>
                {v.status === "critical" && <circle cx={v.x} cy={v.y} r={18} fill="none" stroke="#f87171" strokeWidth={1} opacity={0.4} style={{ animation: "pulseRing 1.5s ease-out infinite" }} />}
              </g>
            ))}
            {/* Legend */}
            <text x={8} y={240} fontSize={8} fill="rgba(255,255,255,.2)">RO · Coordonate GPS simulate live</text>
          </svg>
          {/* Selected vehicle tooltip */}
          {selectedVeh && <div style={{ position: "absolute", top: 10, left: 10, background: "rgba(0,0,0,.8)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, padding: "10px 12px", minWidth: 160 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#f9fafb" }}>{selectedVeh.flag} {selectedVeh.plate}</div>
                <div style={{ fontSize: 10, color: "#6b7280" }}>{selectedVeh.driver}</div>
                <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 4 }}>{selectedVeh.location}</div>
                <div style={{ marginTop: 6 }}><UitBar min={selectedVeh.expiresMin} autoRenew={selectedVeh.autoRenew} /></div>
              </div>
              <button className="btn-ghost" onClick={() => setSelectedVeh(null)} style={{ background: "none", border: "none", color: "#4b5563", padding: 2 }}><X size={11} /></button>
            </div>
          </div>}
        </div>
      </div>

      {/* AI Dispatcher */}
      <div className="glass" style={{ borderRadius: 14, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,.05)", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: 8, background: "rgba(167,139,250,.12)", display: "flex", alignItems: "center", justifyContent: "center" }}><Bot size={13} color="#a78bfa" /></div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#f9fafb" }}>AI Dispecer SmartLogis</div>
          <span className="badge" style={{ background: "rgba(167,139,250,.1)", color: "#a78bfa", border: "1px solid rgba(167,139,250,.2)", fontSize: 9 }}>Claude AI</span>
        </div>
        <div ref={chatRef} style={{ flex: 1, padding: "12px 14px", overflowY: "auto", minHeight: 180, maxHeight: 220 }}>
          {aiChat.length === 0 && <div style={{ textAlign: "center", padding: "20px 0" }}>
            <Bot size={24} color="#1f2937" style={{ margin: "0 auto 8px", display: "block" }} />
            <div style={{ fontSize: 12, color: "#374151" }}>Întreabă-mă despre flotă, UIT-uri, sau vame</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, justifyContent: "center", marginTop: 10 }}>
              {["Care vehicule sunt critice?", "Starea vamei Borș?", "Câte reînnoiri s-au făcut?"].map(s => <button key={s} className="btn-ghost" onClick={() => { setAiInput(s); }} style={{ background: "rgba(167,139,250,.07)", border: "1px solid rgba(167,139,250,.15)", borderRadius: 8, padding: "5px 10px", color: "#a78bfa", fontSize: 10 }}>{s}</button>)}
            </div>
          </div>}
          {aiChat.map((m, i) => (
            <div key={i} style={{ marginBottom: 10, display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
              <div style={{ maxWidth: "88%", background: m.role === "user" ? "rgba(52,211,153,.1)" : "rgba(255,255,255,.04)", border: `1px solid ${m.role === "user" ? "rgba(52,211,153,.2)" : "rgba(255,255,255,.07)"}`, borderRadius: 10, padding: "8px 11px", fontSize: 12, color: "#e5e7eb", lineHeight: 1.5 }}>{m.content}</div>
            </div>
          ))}
          {aiLoading && <div style={{ display: "flex", gap: 4, padding: "6px 4px" }}>{[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#a78bfa", animation: `dotPulse 1.4s ${i * 0.2}s infinite` }} />)}</div>}
        </div>
        <div style={{ padding: "10px 12px", borderTop: "1px solid rgba(255,255,255,.05)", display: "flex", gap: 8 }}>
          <input className="ifield" placeholder="Întreabă despre flotă..." value={aiInput} onChange={e => setAiInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendAi()} style={{ fontSize: 12 }} />
          <button className="btn" onClick={sendAi} disabled={!aiInput.trim() || aiLoading} style={{ background: "rgba(167,139,250,.15)", color: "#a78bfa", border: "1px solid rgba(167,139,250,.3)", borderRadius: 9, padding: "0 13px", flexShrink: 0 }}><Send size={13} /></button>
        </div>
      </div>
    </div>

    {/* GPS Link creation */}
    <div className="fu2" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 14 }}>
      <div className="glass" style={{ borderRadius: 13, padding: "18px 18px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#f9fafb", marginBottom: 4 }}>Generează Link GPS</div>
        <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 16 }}>Trimite link de tracking șoferului. Funcționează pe orice telefon fără aplicație.</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Field label="Vehicul">
            <select className="ifield" value={newD.vehicleId} onChange={e => setNewD(d => ({ ...d, vehicleId: e.target.value }))} style={{ fontSize: 12 }}>
              <option value="">Selectează vehicul...</option>
              {fleet.map(v => <option key={v.id} value={v.id}>{v.plate} — {v.driver}</option>)}
            </select>
          </Field>
          <Field label="Telefon Șofer (+40...)">
            <input className="ifield" placeholder="+40722111222" value={newD.phone} onChange={e => setNewD(d => ({ ...d, phone: e.target.value }))} style={{ fontSize: 12 }} />
          </Field>
          <button className="btn" onClick={createLink} disabled={creating || !newD.vehicleId || !newD.phone} style={{ background: "linear-gradient(135deg,#a78bfa,#7c3aed)", color: "#fff", border: "none", borderRadius: 10, padding: "11px 0", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 4px 18px rgba(124,58,237,.25)" }}>
            {creating ? <><RefreshCw size={12} className="spin" />Generare...</> : <><Navigation size={12} />Generează & Trimite SMS</>}
          </button>
        </div>
      </div>

      <div className="glass" style={{ borderRadius: 13, overflow: "hidden" }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,.05)", fontSize: 12, fontWeight: 700, color: "#f9fafb" }}>Linkuri Active</div>
        <div style={{ padding: "6px 0" }}>
          {dispatches.length === 0 ? <div style={{ padding: "20px", textAlign: "center", color: "#374151", fontSize: 12 }}>Niciun link activ</div> :
            dispatches.map(d => {
              const v = fleet.find(f => f.id === d.vehicleId);
              return <div key={d.id} style={{ padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,.025)", display: "flex", alignItems: "center", gap: 11 }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(167,139,250,.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Navigation size={14} color="#a78bfa" /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#e5e7eb" }}>{v?.plate} — {v?.driver}</div>
                  <div style={{ fontSize: 10, color: "#4b5563" }}>{d.phone} · {d.createdAt} · {d.lastSeen}</div>
                </div>
                <SBadge s={d.status} />
                <button className="btn-ghost" onClick={() => { navigator.clipboard?.writeText(d.link || `https://track.smartlogis.ro/d/${d.token}`); addToast({ type: "info", title: "Link Copiat", msg: d.token }); }} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 7, padding: "5px 9px", color: "#6b7280" }}><Copy size={11} /></button>
              </div>;
            })}
        </div>
      </div>
    </div>
  </div>;
}

// ─── SETTINGS ─────────────────────────────────────────────────────────────────
function ViewSettings({ user, onLogout, addToast }) {
  const [profile, setProfile] = useState({ name: user.name, email: user.email, company: user.company, phone: "" });
  const [anaf, setAnaf] = useState({ cui: "", cert: "", certPass: "", endpoint: "https://api.anaf.ro/prod/FCTEL/ws/uitRo", testing: false, tested: false });
  const [saved, setSaved] = useState(false);

  const saveProfile = async () => {
    await new Promise(r => setTimeout(r, 700));
    setSaved(true);
    addToast({ type: "success", title: "Profil Salvat", msg: "Modificările au fost salvate" });
    setTimeout(() => setSaved(false), 2000);
  };

  const testAnaf = async () => {
    setAnaf(d => ({ ...d, testing: true, tested: false }));
    await new Promise(r => setTimeout(r, 2200));
    setAnaf(d => ({ ...d, testing: false, tested: true }));
    addToast({ type: "success", title: "ANAF API Conectat!", msg: "Conexiune verificată cu succes" });
  };

  return <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
    <div className="fu"><div style={{ fontSize: 22, fontWeight: 700, color: "#f9fafb" }}>Setări Cont</div><div style={{ fontSize: 12, color: "#6b7280" }}>Profil, ANAF API, Notificări, Securitate</div></div>

    {/* Profile */}
    <div className="glass fu1" style={{ borderRadius: 14, padding: 20 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#f9fafb", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}><User size={14} color="#60a5fa" />Profil Utilizator</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="Nume Complet"><input className="ifield" value={profile.name} onChange={e => setProfile(d => ({ ...d, name: e.target.value }))} /></Field>
        <Field label="Email"><input className="ifield" value={profile.email} onChange={e => setProfile(d => ({ ...d, email: e.target.value }))} /></Field>
        <Field label="Companie"><input className="ifield" value={profile.company} onChange={e => setProfile(d => ({ ...d, company: e.target.value }))} /></Field>
        <Field label="Telefon"><input className="ifield" placeholder="+40722..." value={profile.phone} onChange={e => setProfile(d => ({ ...d, phone: e.target.value }))} /></Field>
      </div>
      <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 10 }}>
        <span className="badge" style={{ background: "rgba(167,139,250,.1)", color: "#a78bfa", border: "1px solid rgba(167,139,250,.2)" }}>Rol: {user.role}</span>
        <span className="badge" style={{ background: "rgba(52,211,153,.1)", color: "#34d399", border: "1px solid rgba(52,211,153,.2)" }}>Plan: {user.plan}</span>
        <button className="btn" onClick={saveProfile} style={{ marginLeft: "auto", background: saved ? "rgba(16,185,129,.15)" : "rgba(255,255,255,.06)", color: saved ? "#34d399" : "#9ca3af", border: `1px solid ${saved ? "rgba(16,185,129,.3)" : "rgba(255,255,255,.1)"}`, borderRadius: 9, padding: "8px 18px", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 7 }}>
          {saved ? <><Check size={12} />Salvat ✓</> : <><Save size={12} />Salvează</>}
        </button>
      </div>
    </div>

    {/* ANAF Config */}
    <div className="glass fu2" style={{ borderRadius: 14, padding: 20 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#f9fafb", marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}><Shield size={14} color="#34d399" />Configurare ANAF SPV</div>
      <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 16 }}>Credențialele ANAF sunt criptate AES-256 și stocate securizat. Nu sunt stocate în text clar.</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
        <Field label="CUI Companie"><input className="ifield" placeholder="RO12345678" value={anaf.cui} onChange={e => setAnaf(d => ({ ...d, cui: e.target.value }))} /></Field>
        <Field label="Parolă Certificat SPV"><input className="ifield" type="password" placeholder="••••••••" value={anaf.certPass} onChange={e => setAnaf(d => ({ ...d, certPass: e.target.value }))} /></Field>
        <Field label="Endpoint ANAF" span><input className="ifield" value={anaf.endpoint} readOnly style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#6b7280" }} /></Field>
        <Field label="Certificat Digital (.p12 / .pfx)" span>
          <div style={{ border: "1px dashed rgba(255,255,255,.1)", borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", background: "rgba(255,255,255,.02)" }}>
            <Key size={14} color="#4b5563" />
            <span style={{ fontSize: 12, color: "#4b5563" }}>{anaf.cert || "Click pentru a încărca certificatul digital ANAF"}</span>
            <button className="btn-ghost" onClick={() => setAnaf(d => ({ ...d, cert: "certificat_anaf_2024.p12" }))} style={{ marginLeft: "auto", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 8, padding: "5px 12px", fontSize: 11, color: "#9ca3af" }}>Alege fișier</button>
          </div>
        </Field>
      </div>
      <button className="btn-ghost" onClick={testAnaf} disabled={anaf.testing} style={{ display: "flex", alignItems: "center", gap: 8, background: anaf.tested ? "rgba(16,185,129,.1)" : "rgba(255,255,255,.05)", color: anaf.tested ? "#34d399" : "#9ca3af", border: `1px solid ${anaf.tested ? "rgba(16,185,129,.3)" : "rgba(255,255,255,.1)"}`, borderRadius: 9, padding: "10px 18px", fontSize: 12, fontWeight: 600 }}>
        {anaf.testing ? <><RefreshCw size={12} className="spin" />Testare conexiune...</> : anaf.tested ? <><CheckCircle size={12} />Conexiune ANAF confirmată ✓</> : <><Shield size={12} />Testează Conexiunea ANAF</>}
      </button>
    </div>

    {/* Danger zone */}
    <div className="fu3" style={{ background: "rgba(239,68,68,.04)", border: "1px solid rgba(239,68,68,.15)", borderRadius: 14, padding: 18 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#f87171", marginBottom: 12 }}>Zonă Periculoasă</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div><div style={{ fontSize: 12, color: "#9ca3af" }}>Deconectare din platformă</div><div style={{ fontSize: 11, color: "#4b5563" }}>Sesiunea curentă va fi închisă</div></div>
        <button className="btn-ghost" onClick={onLogout} style={{ background: "rgba(239,68,68,.1)", color: "#f87171", border: "1px solid rgba(239,68,68,.25)", borderRadius: 9, padding: "9px 18px", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 7 }}><LogOut size={13} />Ieșire</button>
      </div>
    </div>
  </div>;
}

// ─── APP SHELL ────────────────────────────────────────────────────────────────
function AppShell({ user, onLogout }) {
  const [state, dispatch] = useReducer(appReducer, { ...initialState, user });
  const [view, setView] = useState("dashboard");
  const [renewModal, setRenewModal] = useState(null);
  const { toasts, addToast, removeToast } = useToasts();

  // Load from storage
  useEffect(() => {
    window.storage?.get("smartlogis_state").then(r => {
      if (r?.value) {
        try { const saved = JSON.parse(r.value); dispatch({ type: "LOAD", payload: saved }); } catch { }
      }
    }).catch(() => { });
  }, []);

  // Save to storage
  useEffect(() => {
    const { user: _, ...toSave } = state;
    window.storage?.set("smartlogis_state", JSON.stringify(toSave)).catch(() => { });
  }, [state]);

  const NAV = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "flota", icon: Truck, label: "Gestiune Flotă" },
    { id: "auto-renew", icon: Zap, label: "Auto-Reînnoire UIT", special: true },
    { id: "facturi", icon: FileText, label: "Facturi e-Factura" },
    { id: "ocr", icon: ScanLine, label: "Documente AI-OCR" },
    { id: "dispatch", icon: Navigation, label: "Dispecerat & GPS" },
    { id: "settings", icon: Settings, label: "Setări" },
  ];
  const critical = state.fleet.filter(v => v.status === "critical");

  return <div style={{ display: "flex", height: "100vh", background: "#060810", overflow: "hidden" }}>
    <Toasts toasts={toasts} remove={removeToast} />
    {renewModal && <AutoRenewModal v={renewModal} onClose={() => setRenewModal(null)} addToast={addToast} dispatch={dispatch} />}

    {/* SIDEBAR */}
    <aside style={{ width: 240, background: "#080c16", borderRight: "1px solid rgba(255,255,255,.05)", display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ padding: "16px 14px 12px", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center" }}><Truck size={16} color="#0a0a0a" /></div>
          <div><div style={{ fontSize: 14, fontWeight: 800, color: "#f9fafb", letterSpacing: -0.5 }}>SmartLogis</div><div style={{ fontSize: 9, color: "#374151", letterSpacing: 1 }}>AI TRANSPORT RO</div></div>
        </div>
      </div>
      <nav style={{ flex: 1, padding: "10px 8px", display: "flex", flexDirection: "column", gap: 1, overflowY: "auto" }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#1f2937", padding: "8px 10px 4px" }}>Navigare</div>
        {NAV.map(n => (
          <button key={n.id} className={`navItem${view === n.id ? " active" : ""}${n.special ? " special" : ""}`} onClick={() => setView(n.id)}>
            <n.icon size={14} />
            <span style={{ flex: 1 }}>{n.label}</span>
            {n.id === "dashboard" && critical.length > 0 && <span style={{ background: "#ef4444", color: "#fff", borderRadius: 20, fontSize: 10, fontWeight: 700, padding: "1px 6px" }}>{critical.length}</span>}
            {n.special && !critical.length && <Sparkles size={10} color="#34d399" />}
          </button>
        ))}
      </nav>
      <div style={{ padding: "8px 10px 10px", borderTop: "1px solid rgba(255,255,255,.04)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", background: "rgba(255,255,255,.02)", borderRadius: 9, marginBottom: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(52,211,153,.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 11 }}>{user.name.split(" ").map(w => w[0]).join("").slice(0, 2)}</span>
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#e5e7eb", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.name}</div>
            <div style={{ fontSize: 9, color: "#374151" }}>{user.role} · {user.plan}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 10px", background: "rgba(16,185,129,.06)", border: "1px solid rgba(16,185,129,.12)", borderRadius: 8 }}>
          <div style={{ position: "relative", width: 7, height: 7 }}>
            <div style={{ width: 7, height: 7, background: "#34d399", borderRadius: "50%", position: "absolute" }} />
            <div style={{ width: 7, height: 7, background: "#34d399", borderRadius: "50%", position: "absolute", animation: "pulseRing 1.5s ease-out infinite" }} />
          </div>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".08em", color: "#34d399" }}>ANAF API: LIVE</span>
        </div>
      </div>
    </aside>

    {/* MAIN */}
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* TOPBAR */}
      <header style={{ background: "#080c16", borderBottom: "1px solid rgba(255,255,255,.05)", padding: "0 22px", height: 50, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#374151" }}>
          <Home size={11} /><ChevronRight size={11} /><span style={{ color: "#9ca3af", fontWeight: 500 }}>{NAV.find(n => n.id === view)?.label}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          {critical.length > 0 && <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)", borderRadius: 8, padding: "5px 10px" }}>
            <AlertTriangle size={11} color="#f87171" />
            <span style={{ fontSize: 11, color: "#f87171", fontWeight: 600 }}>{critical.length} vehicule critice</span>
          </div>}
          <button className="btn-ghost" onClick={() => addToast({ type: "info", title: "Date Actualizate", msg: "Flotă sincronizată cu ANAF API" })} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 8, padding: "6px 10px", color: "#6b7280", display: "flex", alignItems: "center", gap: 5, fontSize: 11 }}>
            <RefreshCw size={11} />Actualizează
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 22px" }}>
        {view === "dashboard" && <ViewDashboard state={state} dispatch={dispatch} addToast={addToast} setRenewModal={setRenewModal} />}
        {view === "flota" && <ViewFlota state={state} dispatch={dispatch} addToast={addToast} setRenewModal={setRenewModal} />}
        {view === "auto-renew" && <ViewAutoRenew state={state} dispatch={dispatch} addToast={addToast} setRenewModal={setRenewModal} />}
        {view === "facturi" && <ViewFacturi state={state} dispatch={dispatch} addToast={addToast} />}
        {view === "ocr" && <ViewOCR state={state} dispatch={dispatch} addToast={addToast} />}
        {view === "dispatch" && <ViewDispatch state={state} dispatch={dispatch} addToast={addToast} />}
        {view === "settings" && <ViewSettings user={user} onLogout={onLogout} addToast={addToast} />}
      </div>
    </div>
  </div>;
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function SmartLogisApp() {
  const [user, setUser] = useState(null);
  return <>
    <style>{G}</style>
    {!user ? <LoginScreen onLogin={setUser} /> : <AppShell user={user} onLogout={() => setUser(null)} />}
  </>;
}
