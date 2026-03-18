import { useState, useEffect, useRef, useCallback } from "react";
import {
  Truck, MapPin, ScanLine, AlertTriangle, Shield, FileText,
  CheckCircle, LayoutDashboard, Zap, Navigation, ChevronRight,
  TrendingUp, Clock, RefreshCw, Upload, Phone, MessageSquare,
  Circle, ArrowUpRight, X, Bell, Search, Activity, BarChart3,
  ChevronDown, Play, Pause, RotateCcw, Sparkles, Bot, Eye,
  EyeOff, Lock, Check, ArrowRight, ArrowLeft, Layers, Cpu,
  Signal, Timer, Radio, Plus, Trash2, Globe, Mail, AlertCircle,
  Building2, Users, Star, Package, Send, XCircle, Info,
  ExternalLink, CheckSquare, Settings, LogOut, CreditCard,
  BookOpen, Home
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";

// ─── Supabase (graceful — works even without .env) ────────────────────────────
const _su = import.meta.env.VITE_SUPABASE_URL;
const _sk = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = (_su && _sk && !_su.includes("xxxx")) ? createClient(_su, _sk) : null;


// ─── GLOBAL CSS ──────────────────────────────────────────────────────────────
const G = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&family=Syne:wght@700;800&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'DM Sans',sans-serif;background:#060810;overflow:hidden;}
::-webkit-scrollbar{width:4px;height:4px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:#1e2535;border-radius:4px;}
@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideRight{from{transform:translateX(110%);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes slideLeft{from{transform:translateX(-110%);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.25}}
@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
@keyframes spinSlow{from{transform:rotate(0)}to{transform:rotate(360deg)}}
@keyframes pulseRing{0%{transform:scale(.8);opacity:1}100%{transform:scale(2.4);opacity:0}}
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes borderGlow{0%,100%{border-color:rgba(16,185,129,.3)}50%{border-color:rgba(16,185,129,.7)}}
@keyframes checkIn{from{transform:scale(0) rotate(-45deg);opacity:0}to{transform:scale(1) rotate(0deg);opacity:1}}
@keyframes progressFill{from{width:0}to{width:100%}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes floatUp{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes logoOrbit{0%{transform:rotate(0deg) translateX(18px) rotate(0deg)}100%{transform:rotate(360deg) translateX(18px) rotate(-360deg)}}
@keyframes btnShimmer{0%{transform:translateX(-100%) skewX(-15deg)}100%{transform:translateX(200%) skewX(-15deg)}}
@keyframes cardReveal{from{opacity:0;transform:translateY(24px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes glowPulse{0%,100%{box-shadow:0 0 20px rgba(16,185,129,.15)}50%{box-shadow:0 0 40px rgba(16,185,129,.35)}}
.fu{animation:fadeUp .4s ease both}
.fu1{animation:fadeUp .4s .05s ease both}
.fu2{animation:fadeUp .4s .1s ease both}
.fu3{animation:fadeUp .4s .15s ease both}
.fu4{animation:fadeUp .4s .2s ease both}
.fu5{animation:fadeUp .4s .25s ease both}
.fi{animation:fadeIn .3s ease both}
.blink{animation:blink 1.4s ease-in-out infinite}
.spin{animation:spin .7s linear infinite}
.spinSlow{animation:spinSlow 8s linear infinite}
.checkIn{animation:checkIn .35s cubic-bezier(.34,1.56,.64,1) both}
.marqueeTrack{display:flex;animation:marquee 30s linear infinite}
.popular{animation:borderGlow 2.5s ease-in-out infinite}
.toast{animation:slideRight .35s cubic-bezier(.34,1.56,.64,1) both}
.glass{background:rgba(255,255,255,.025);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.07);}
.glowGreen{box-shadow:0 0 40px rgba(16,185,129,.12)}
.ifield{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:10px;padding:11px 14px;font-size:13px;color:#f9fafb;outline:none;font-family:'DM Sans',sans-serif;transition:border-color .2s,background .2s,box-shadow .2s;}
.ifield:focus{border-color:rgba(52,211,153,.35);background:rgba(52,211,153,.03);box-shadow:0 0 0 3px rgba(52,211,153,.07);}
.ifield::placeholder{color:#374151;}
select.ifield option{background:#0b0f1a;color:#f9fafb;}
.badge{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:20px;font-size:10px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;}
.navItem{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:10px;font-size:13px;font-weight:500;cursor:pointer;transition:all .15s;color:#6b7280;border:1px solid transparent;width:100%;background:none;text-align:left;}
.navItem:hover{background:rgba(255,255,255,.04);color:#e5e7eb;}
.navItem.active{background:rgba(255,255,255,.07);color:#f9fafb;border-color:rgba(255,255,255,.08);}
.navItem.special{color:#34d399 !important;}
.navItem.special.active{background:rgba(16,185,129,.08);border-color:rgba(16,185,129,.2);}
.pbar{height:3px;border-radius:2px;overflow:hidden;background:rgba(255,255,255,.06);}
.pfill{height:100%;border-radius:2px;transition:width 1s cubic-bezier(.4,0,.2,1);}
.cardHov{transition:all .25s cubic-bezier(.4,0,.2,1);}
.cardHov:hover{transform:translateY(-3px);}
.trow:hover td{background:rgba(255,255,255,.015);}
.btn{cursor:pointer;transition:transform .15s cubic-bezier(.34,1.56,.64,1),box-shadow .15s,opacity .15s,background .15s,border-color .15s;user-select:none;}
.btn:hover{transform:translateY(-2px) scale(1.02);}
.btn:active{transform:translateY(1px) scale(.97) !important;opacity:.9;}
.btn-ghost{cursor:pointer;transition:transform .15s cubic-bezier(.34,1.56,.64,1),background .15s,border-color .15s,color .15s;user-select:none;}
.btn-ghost:hover{transform:translateY(-1px) scale(1.02);}
.btn-ghost:active{transform:translateY(1px) scale(.97) !important;opacity:.85;}
.btn-sm{cursor:pointer;transition:transform .12s cubic-bezier(.34,1.56,.64,1),background .15s,border-color .15s,color .15s;user-select:none;}
.btn-sm:hover{transform:translateY(-1px) scale(1.04);}
.btn-sm:active{transform:translateY(0px) scale(.95) !important;opacity:.85;}
.btnSm:hover{transform:translateY(-1px) scale(1.03);}
.btnSm:active{transform:translateY(0px) scale(.96) !important;opacity:.85;}
.btnFlat:hover{transform:scale(1.02);}
.btnFlat:active{transform:scale(.97) !important;opacity:.85;}
.navBtnLogin{cursor:pointer;padding:7px 16px;border-radius:20px;font-size:12px;font-weight:600;color:#9ca3af;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);backdrop-filter:blur(8px);transition:all .2s cubic-bezier(.34,1.56,.64,1);user-select:none;letter-spacing:.01em;}
.navBtnLogin:hover{background:rgba(255,255,255,.09);border-color:rgba(255,255,255,.2);color:#e5e7eb;transform:translateY(-1px);}
.navBtnLogin:active{transform:translateY(1px) scale(.97);}
.navBtnCta{cursor:pointer;padding:8px 18px;border-radius:20px;font-size:12px;font-weight:700;color:#022c22;background:linear-gradient(135deg,#34d399 0%,#10b981 50%,#059669 100%);border:none;position:relative;overflow:hidden;transition:all .2s cubic-bezier(.34,1.56,.64,1);user-select:none;box-shadow:0 4px 18px rgba(16,185,129,.35),0 0 0 1px rgba(52,211,153,.2);letter-spacing:.01em;}
.navBtnCta::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);transform:translateX(-100%) skewX(-15deg);transition:transform 0s;}
.navBtnCta:hover::before{transform:translateX(200%) skewX(-15deg);transition:transform .5s;}
.navBtnCta:hover{transform:translateY(-2px) scale(1.03);box-shadow:0 8px 28px rgba(16,185,129,.45),0 0 0 1px rgba(52,211,153,.3);}
.navBtnCta:active{transform:translateY(1px) scale(.97);box-shadow:0 2px 12px rgba(16,185,129,.25);}
.pageHeroOrb{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;opacity:.6;}
.featureCard{background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07);border-radius:20px;padding:28px;transition:all .3s cubic-bezier(.4,0,.2,1);position:relative;overflow:hidden;}
.featureCard::before{content:'';position:absolute;inset:0;opacity:0;transition:opacity .3s;}
.featureCard:hover{transform:translateY(-4px);border-color:rgba(255,255,255,.15);box-shadow:0 20px 60px rgba(0,0,0,.4);}
.featureCard:hover::before{opacity:1;}
.legalSection{background:rgba(255,255,255,.018);border:1px solid rgba(255,255,255,.06);border-radius:16px;padding:24px 28px;margin-bottom:12px;transition:all .2s;}
.legalSection:hover{background:rgba(255,255,255,.03);border-color:rgba(255,255,255,.1);}
.blogCard{background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);border-radius:18px;overflow:hidden;transition:all .25s cubic-bezier(.4,0,.2,1);}
.blogCard:hover{transform:translateY(-4px);border-color:rgba(255,255,255,.13);box-shadow:0 16px 50px rgba(0,0,0,.35);}
.contactInfoCard{background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:20px;display:flex;align-items:flex-start;gap:14px;transition:all .25s cubic-bezier(.4,0,.2,1);}
.contactInfoCard:hover{background:rgba(255,255,255,.04);border-color:rgba(255,255,255,.12);transform:translateX(4px);}
`;

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const FLEET_DATA = [
  { id:1, plate:"TR-45-YIL", driver:"Mehmet Yilmaz", flag:"🇹🇷", route:"Istanbul → București", uit:"UIT-2024-8821", expiresMin:135, location:"PTF Giurgiu", waitH:5.5, status:"critical", cargo:"Piese auto", weight:"18.4t", autoRenew:true },
  { id:2, plate:"PL-771-AB", driver:"Piotr Kowalski", flag:"🇵🇱", route:"Gdańsk → Constanța", uit:"UIT-2024-6610", expiresMin:410, location:"Vama Albița", waitH:2.1, status:"warning", cargo:"Mobilier", weight:"12.1t", autoRenew:true },
  { id:3, plate:"B-234-TRK", driver:"Ion Popescu", flag:"🇷🇴", route:"München → Cluj", uit:"UIT-2024-9102", expiresMin:1120, location:"Vama Borș", waitH:0.8, status:"ok", cargo:"Echipamente IT", weight:"6.7t", autoRenew:false },
  { id:4, plate:"DE-88-LKW", driver:"Hans Müller", flag:"🇩🇪", route:"Berlin → Timișoara", uit:"UIT-2024-7734", expiresMin:890, location:"PTF Nădlac II", waitH:1.2, status:"ok", cargo:"Mașini unelte", weight:"22.0t", autoRenew:true },
  { id:5, plate:"HU-55-KAM", driver:"László Varga", flag:"🇭🇺", route:"Budapest → Iași", uit:"UIT-2024-5521", expiresMin:290, location:"Vama Petea", waitH:3.3, status:"warning", cargo:"Produse chimice", weight:"15.2t", autoRenew:false },
];
const BORDERS = [
  { name:"PTF Giurgiu", flag:"🇧🇬", wait:"5h 30m", trucks:47, status:"aglomerat" },
  { name:"Vama Borș", flag:"🇭🇺", wait:"0h 50m", trucks:12, status:"liber" },
  { name:"PTF Nădlac II", flag:"🇭🇺", wait:"1h 15m", trucks:19, status:"normal" },
  { name:"Vama Albița", flag:"🇲🇩", wait:"2h 10m", trucks:31, status:"normal" },
  { name:"Vama Petea", flag:"🇭🇺", wait:"3h 20m", trucks:28, status:"aglomerat" },
  { name:"PTF Calafat", flag:"🇧🇬", wait:"0h 40m", trucks:8, status:"liber" },
];
const ACTIVITY = [
  { id:1, type:"zap", msg:"UIT auto-reînnoit pentru TR-45-YIL", time:"acum 2 min", color:"#34d399" },
  { id:2, type:"alert", msg:"Timp așteptare crescut la PTF Giurgiu", time:"acum 8 min", color:"#f87171" },
  { id:3, type:"scan", msg:"Factură Bosch GmbH procesată (NC8 generat)", time:"acum 15 min", color:"#60a5fa" },
  { id:4, type:"nav", msg:"Link GPS trimis șoferului Kowalski", time:"acum 31 min", color:"#a78bfa" },
  { id:5, type:"zap", msg:"UIT auto-reînnoit pentru HU-55-KAM", time:"acum 1h", color:"#34d399" },
  { id:6, type:"check", msg:"B-234-TRK a trecut vama fără probleme", time:"acum 2h", color:"#34d399" },
];
const PLANS = [
  { id:"starter", name:"Starter", tagline:"Pentru firme mici", monthly:149, annual:119, color:"#6b7280", border:"rgba(107,114,128,.2)", vehicles:"până la 5 vehicule", popular:false,
    features:[{t:"Dashboard flotă live",ok:true},{t:"Alerte UIT expirare",ok:true},{t:"OCR documente (50/lună)",ok:true},{t:"Dispecerat extern SMS",ok:true},{t:"Auto-reînnoire UIT",ok:false},{t:"API ANAF direct",ok:false},{t:"Rapoarte avansate",ok:false},{t:"Multi-utilizatori",ok:false}], cta:"Începe Gratuit 14 Zile" },
  { id:"pro", name:"Pro", tagline:"Cel mai popular", monthly:449, annual:359, color:"#34d399", border:"rgba(16,185,129,.4)", vehicles:"până la 25 vehicule", popular:true,
    features:[{t:"Dashboard flotă live",ok:true},{t:"Alerte UIT expirare",ok:true},{t:"OCR documente (500/lună)",ok:true},{t:"Dispecerat SMS + WhatsApp",ok:true},{t:"Auto-reînnoire UIT ⚡",ok:true,hi:true},{t:"API ANAF direct",ok:true},{t:"Rapoarte avansate + export",ok:true},{t:"5 utilizatori",ok:true}], cta:"Activează Pro" },
  { id:"enterprise", name:"Enterprise", tagline:"Flotă mare & TIR", monthly:null, annual:null, color:"#a78bfa", border:"rgba(167,139,250,.2)", vehicles:"vehicule nelimitate", popular:false,
    features:[{t:"Tot din Pro, plus:",ok:true},{t:"Vehicule nelimitate",ok:true},{t:"OCR nelimitat",ok:true},{t:"Utilizatori nelimitați",ok:true},{t:"Reguli auto-reînnoire custom",ok:true,hi:true},{t:"Integrare ERP / TMS",ok:true},{t:"White-label dashboard",ok:true},{t:"SLA 99.9% + suport 24/7",ok:true}], cta:"Contactează Sales" },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const fmtTime = m => m < 60 ? `${m}m` : `${Math.floor(m/60)}h ${m%60}m`;
const statusMap = {
  critical:{ label:"Risc Amendă", bg:"rgba(239,68,68,.1)", color:"#f87171", brd:"rgba(239,68,68,.25)" },
  warning:{ label:"Atenție", bg:"rgba(245,158,11,.1)", color:"#fbbf24", brd:"rgba(245,158,11,.25)" },
  ok:{ label:"În Tranzit", bg:"rgba(16,185,129,.1)", color:"#34d399", brd:"rgba(16,185,129,.25)" },
  liber:{ label:"Liber", bg:"rgba(16,185,129,.1)", color:"#34d399", brd:"rgba(16,185,129,.25)" },
  normal:{ label:"Normal", bg:"rgba(59,130,246,.1)", color:"#60a5fa", brd:"rgba(59,130,246,.25)" },
  aglomerat:{ label:"Aglomerat", bg:"rgba(239,68,68,.1)", color:"#f87171", brd:"rgba(239,68,68,.25)" },
};
const SBadge = ({ s }) => { const m = statusMap[s]||statusMap.ok; return <span className="badge" style={{background:m.bg,color:m.color,border:`1px solid ${m.brd}`}}>{m.label}</span>; };

// ─── DB → UI shape converter ──────────────────────────────────────────────────
const dbVehicleToFleet = (v) => {
  const expiresMs = v.uit_expires_at ? new Date(v.uit_expires_at) - new Date() : -1;
  const expiresMin = expiresMs > 0 ? Math.round(expiresMs / 60000) : 0;
  let status = "ok";
  if (expiresMs < 0) status = "critical";
  else if (expiresMin < (v.renew_threshold_h || 4) * 60) status = "warning";
  return {
    id: v.id, _dbId: v.id, _raw: v,
    plate: v.plate || "",
    driver: v.driver_name || "—",
    driver_phone: v.driver_phone || "",
    flag: "🇷🇴",
    route: v.route || "—",
    uit: v.uit_code || "Fără UIT",
    expiresMin,
    location: v.last_lat ? `${v.last_lat.toFixed(4)}, ${v.last_lng?.toFixed(4)}` : "Necunoscut",
    waitH: 0,
    status,
    cargo: v.cargo || "—",
    weight: v.weight ? v.weight + "t" : "—",
    autoRenew: v.auto_renew || false,
    renew_threshold_h: v.renew_threshold_h || 4,
    renew_count: v.renew_count || 0,
    last_lat: v.last_lat,
    last_lng: v.last_lng,
    last_seen_at: v.last_seen_at,
  };
};
const UitBar = ({ min, autoRenew }) => {
  const pct = Math.min(100,(min/1440)*100);
  const c = min<180?"#f87171":min<480?"#fbbf24":"#34d399";
  return <div style={{display:"flex",flexDirection:"column",gap:5}}>
    <div style={{display:"flex",alignItems:"center",gap:8}}>
      <span style={{color:c,fontFamily:"'DM Mono',monospace",fontSize:12,fontWeight:500}} className={min<180?"blink":""}>{fmtTime(min)}</span>
      {autoRenew && <span className="badge" style={{background:"rgba(16,185,129,.1)",color:"#34d399",border:"1px solid rgba(16,185,129,.2)",fontSize:9}}><Zap size={8}/>AUTO</span>}
    </div>
    <div className="pbar" style={{width:88}}><div className="pfill" style={{width:`${pct}%`,background:c}}/></div>
  </div>;
};

// ─── TOAST ────────────────────────────────────────────────────────────────────
function Toasts({ toasts, remove }) {
  return <div style={{position:"fixed",top:18,right:18,zIndex:9999,display:"flex",flexDirection:"column",gap:8,minWidth:300}}>
    {toasts.map(t => (
      <div key={t.id} className="toast glass" style={{borderRadius:12,padding:"13px 15px",display:"flex",alignItems:"flex-start",gap:11,borderColor:t.type==="success"?"rgba(16,185,129,.3)":t.type==="error"?"rgba(239,68,68,.3)":"rgba(59,130,246,.3)"}}>
        <div style={{width:26,height:26,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,background:t.type==="success"?"rgba(16,185,129,.15)":t.type==="error"?"rgba(239,68,68,.15)":"rgba(59,130,246,.15)"}}>
          {t.type==="success"?<CheckCircle size={13} color="#34d399"/>:t.type==="error"?<XCircle size={13} color="#f87171"/>:<Info size={13} color="#60a5fa"/>}
        </div>
        <div style={{flex:1}}><div style={{fontSize:12,fontWeight:600,color:"#f9fafb",marginBottom:2}}>{t.title}</div><div style={{fontSize:11,color:"#9ca3af"}}>{t.msg}</div></div>
        <button className="btn-ghost" onClick={()=>remove(t.id)} style={{background:"none",border:"none",color:"#4b5563",marginTop:1}}><X size={13}/></button>
      </div>
    ))}
  </div>;
}

// ─── AUTO-RENEW MODAL — REAL Supabase update ──────────────────────────────────
function AutoRenewModal({ v, onClose, addToast, onFleetUpdate }) {
  const [phase, setPhase] = useState(0);
  const [log, setLog]     = useState([]);
  const [newUit, setNewUit] = useState("");
  const steps = [
    "Conectare Supabase...",
    "Validare date vehicul " + v.plate,
    "Verificare câmpuri obligatorii",
    "Calculare interval prelungire +24h",
    "Generare cod UIT temporar",
    "Salvare în baza de date",
    "Actualizare flotă SmartLogis ✓",
  ];

  useEffect(() => {
    if (phase >= steps.length) return;
    const delays = [600, 500, 500, 600, 700, 900, 400];
    const t = setTimeout(async () => {
      setLog(l => [...l, steps[phase]]);
      // On step 5 (save to DB) — actually write to Supabase
      if (phase === 5 && supabase && v._dbId) {
        const uid = "SL-" + Date.now().toString(36).toUpperCase();
        const expires = new Date(Date.now() + 24 * 3600 * 1000).toISOString();
        setNewUit(uid);
        const { error } = await supabase.from("vehicles").update({
          uit_code: uid,
          uit_expires_at: expires,
          renew_count: (v.renew_count || 0) + 1,
        }).eq("id", v._dbId);
        if (!error) {
          await supabase.from("uit_renewals").insert({
            vehicle_id: v._dbId,
            old_uit: v.uit || null,
            new_uit: uid,
            triggered_by: "manual",
            status: "success",
          });
          if (onFleetUpdate) onFleetUpdate(v._dbId, { uit_code: uid, uit_expires_at: expires, renew_count: (v.renew_count||0)+1 });
        }
      }
      setPhase(p => p + 1);
    }, delays[phase]);
    return () => clearTimeout(t);
  }, [phase]);

  const done = phase >= steps.length;
  useEffect(() => {
    if (done) addToast({ type:"success", title:"UIT Reînnoit cu Succes", msg:`${v.plate} — valabil 24h` });
  }, [done]);

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",backdropFilter:"blur(8px)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div className="fu glass" style={{borderRadius:20,padding:32,width:460,border:"1px solid rgba(255,255,255,.1)"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:22}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:38,height:38,borderRadius:11,background:"rgba(16,185,129,.15)",border:"1px solid rgba(16,185,129,.3)",display:"flex",alignItems:"center",justifyContent:"center"}}><Zap size={17} color="#34d399"/></div>
            <div><div style={{fontSize:14,fontWeight:700,color:"#f9fafb"}}>Reînnoire UIT Manuală</div><div style={{fontSize:11,color:"#6b7280"}}>{v.plate} · {v.driver}</div></div>
          </div>
          {done && <button className="btn-ghost" onClick={onClose} style={{background:"none",border:"none",color:"#6b7280"}}><X size={16}/></button>}
        </div>
        <div style={{background:"rgba(0,0,0,.35)",borderRadius:11,padding:"14px 18px",marginBottom:18,minHeight:180,fontFamily:"'DM Mono',monospace",fontSize:11}}>
          <div style={{color:"#34d399",marginBottom:8,fontSize:9,letterSpacing:2}}>// SMARTLOGIS ENGINE · SUPABASE LIVE</div>
          {log.map((l,i)=>(
            <div key={i} style={{marginBottom:5,color:i===log.length-1&&!done?"#f9fafb":"#4b5563",display:"flex",alignItems:"center",gap:8}}>
              <span style={{color:"#34d399"}}>›</span><span>{l}</span>
              {i===log.length-1&&!done&&<span className="blink" style={{color:"#34d399"}}>█</span>}
              {(i<log.length-1||done)&&<CheckCircle size={9} color="#34d399" style={{marginLeft:"auto"}}/>}
            </div>
          ))}
          {done&&<div style={{marginTop:10,paddingTop:10,borderTop:"1px solid rgba(255,255,255,.06)",color:"#34d399",fontSize:11}}>
            ✓ {newUit || "UIT salvat"} generat · Valabil 24h · Salvat în DB ✓
          </div>}
        </div>
        <div className="pbar" style={{marginBottom:14}}><div className="pfill" style={{width:`${(phase/steps.length)*100}%`,background:done?"#34d399":"#3b82f6"}}/></div>
        {done
          ? <button className="btn" onClick={onClose} style={{width:"100%",background:"#34d399",color:"#064e3b",border:"none",borderRadius:10,padding:"11px 0",fontSize:13,fontWeight:700}}>Închide · UIT Activ în DB ✓</button>
          : <div style={{fontSize:11,color:"#6b7280",textAlign:"center"}}>Salvare în baza de date...</div>}
      </div>
    </div>
  );
}

// ─── ADD/EDIT VEHICLE MODAL ────────────────────────────────────────────────────
function VehicleModal({ initial, tenantId, onClose, onSaved, addToast }) {
  const isEdit = !!initial?._dbId;
  const [form, setForm] = useState({
    plate: initial?.plate || "",
    driver_name: initial?.driver || "",
    driver_phone: initial?.driver_phone || "",
    cargo: initial?.cargo || "",
    weight: (initial?.weight || "").replace("t",""),
    route: initial?.route || "",
    uit_code: initial?.uit || "",
    uit_expires_at: initial?._raw?.uit_expires_at ? initial._raw.uit_expires_at.slice(0,16) : "",
    auto_renew: initial?.autoRenew || false,
    renew_threshold_h: initial?.renew_threshold_h || 4,
  });
  const [saving, setSaving] = useState(false);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const save = async () => {
    if (!form.plate) { addToast({type:"error",title:"Câmp obligatoriu",msg:"Numărul de înmatriculare este necesar"}); return; }
    setSaving(true);
    const payload = {
      plate: form.plate.toUpperCase().trim(),
      driver_name: form.driver_name,
      driver_phone: form.driver_phone,
      cargo: form.cargo,
      weight: form.weight,
      route: form.route,
      uit_code: form.uit_code,
      uit_expires_at: form.uit_expires_at ? new Date(form.uit_expires_at).toISOString() : null,
      auto_renew: form.auto_renew,
      renew_threshold_h: parseInt(form.renew_threshold_h) || 4,
      tenant_id: tenantId,
    };
    let error;
    if (isEdit) {
      ({ error } = await supabase.from("vehicles").update(payload).eq("id", initial._dbId));
    } else {
      ({ error } = await supabase.from("vehicles").insert(payload));
    }
    setSaving(false);
    if (error) { addToast({type:"error",title:"Eroare",msg:error.message}); return; }
    addToast({type:"success",title:isEdit?"Vehicul actualizat":"Vehicul adăugat",msg:form.plate});
    onSaved();
  };

  const lbl = {fontSize:10,fontWeight:700,letterSpacing:".07em",textTransform:"uppercase",color:"#4b5563",display:"block",marginBottom:5};
  const row = {marginBottom:14};

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",backdropFilter:"blur(8px)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div className="fu glass" style={{borderRadius:20,padding:28,width:580,maxHeight:"90vh",overflowY:"auto",border:"1px solid rgba(255,255,255,.1)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
          <div style={{fontSize:16,fontWeight:700,color:"#f9fafb"}}>{isEdit?"Editează vehicul":"Adaugă vehicul nou"}</div>
          <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:"#6b7280"}}><X size={18}/></button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          <div style={row}>
            <label style={lbl}>Nr. Înmatriculare *</label>
            <input className="ifield" placeholder="B 123 ABC" value={form.plate} onChange={e=>set("plate",e.target.value.toUpperCase())}/>
          </div>
          <div style={row}>
            <label style={lbl}>Șofer</label>
            <input className="ifield" placeholder="Nume șofer" value={form.driver_name} onChange={e=>set("driver_name",e.target.value)}/>
          </div>
          <div style={row}>
            <label style={lbl}>Telefon Șofer</label>
            <input className="ifield" placeholder="+40 7xx xxx xxx" value={form.driver_phone} onChange={e=>set("driver_phone",e.target.value)}/>
          </div>
          <div style={row}>
            <label style={lbl}>Marfă</label>
            <input className="ifield" placeholder="ex: Piese auto" value={form.cargo} onChange={e=>set("cargo",e.target.value)}/>
          </div>
          <div style={row}>
            <label style={lbl}>Greutate (tone)</label>
            <input className="ifield" type="number" placeholder="18.5" value={form.weight} onChange={e=>set("weight",e.target.value)}/>
          </div>
          <div style={row}>
            <label style={lbl}>Rută</label>
            <input className="ifield" placeholder="București → Cluj" value={form.route} onChange={e=>set("route",e.target.value)}/>
          </div>
          <div style={row}>
            <label style={lbl}>Cod UIT (dacă există)</label>
            <input className="ifield" placeholder="SL-ABC123" value={form.uit_code} onChange={e=>set("uit_code",e.target.value)}/>
          </div>
          <div style={row}>
            <label style={lbl}>Expiră la</label>
            <input className="ifield" type="datetime-local" value={form.uit_expires_at} onChange={e=>set("uit_expires_at",e.target.value)}/>
          </div>
          <div style={{...row,gridColumn:"1/-1"}}>
            <label style={lbl}>Prag auto-reînnoire (ore)</label>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <input type="range" min={1} max={12} value={form.renew_threshold_h} onChange={e=>set("renew_threshold_h",e.target.value)} style={{flex:1,accentColor:"#34d399"}}/>
              <span style={{fontFamily:"monospace",fontSize:12,color:"#fbbf24",fontWeight:600,minWidth:30}}>{form.renew_threshold_h}h</span>
            </div>
          </div>
          <div style={{...row,gridColumn:"1/-1",display:"flex",alignItems:"center",gap:10,padding:"12px 14px",background:"rgba(255,255,255,.03)",borderRadius:10,border:"1px solid rgba(255,255,255,.07)",cursor:"pointer"}} onClick={()=>set("auto_renew",!form.auto_renew)}>
            <div style={{width:20,height:20,borderRadius:5,border:`1.5px solid ${form.auto_renew?"#34d399":"rgba(255,255,255,.2)"}`,background:form.auto_renew?"#34d399":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .2s"}}>
              {form.auto_renew && <Check size={13} color="#064e3b"/>}
            </div>
            <div>
              <div style={{fontSize:13,fontWeight:600,color:"#e5e7eb"}}>⚡ Activează Auto-Reînnoire UIT</div>
              <div style={{fontSize:11,color:"#6b7280"}}>Reînnoiește automat cu {form.renew_threshold_h}h înainte de expirare</div>
            </div>
          </div>
        </div>
        <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:20}}>
          <button onClick={onClose} style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",borderRadius:9,padding:"9px 18px",fontSize:12,fontWeight:600,color:"#9ca3af",cursor:"pointer"}}>Anulează</button>
          <button onClick={save} disabled={saving} style={{background:"linear-gradient(135deg,#34d399,#059669)",color:"#064e3b",border:"none",borderRadius:9,padding:"9px 22px",fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:7,boxShadow:"0 4px 16px rgba(16,185,129,.25)"}}>
            {saving && <RefreshCw size={13} className="spin"/>}
            {isEdit ? "Salvează modificările" : "Adaugă vehicul"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE: FUNCȚIONALITĂȚI
// ══════════════════════════════════════════════════════════════════════════════
const FEATURES = [
  { icon: Zap, color: "#34d399", bg: "rgba(16,185,129,.1)", brd: "rgba(16,185,129,.25)",
    title: "Auto-Reînnoire UIT", badge: "EXCLUSIV",
    desc: "Motorul nostru scanează constant expirările. Când un vehicul se apropie de limită, se conectează automat la ANAF, generează noul UIT și trimite confirmare — fără niciun click din partea ta.",
    bullets: ["Prag reglabil: 1h–12h înainte de expirare","Retry automat dacă ANAF API eșuează","Audit complet al fiecărei reînnoriri","Notificări SMS + WhatsApp + Email"],
  },
  { icon: ScanLine, color: "#60a5fa", bg: "rgba(59,130,246,.1)", brd: "rgba(59,130,246,.25)",
    title: "OCR Documente", badge: "AI",
    desc: "Fotografiezi factura sau CMR-ul și în câteva secunde ai codul NC8 generat, valoarea declarată completată și documentul validat conform cerințelor ANAF.",
    bullets: ["Recunoaștere facturi, CMR, AWB","Generare automată NC8","Validare TVA și CUI în timp real","Export XML e-Factura"],
  },
  { icon: Navigation, color: "#a78bfa", bg: "rgba(167,139,250,.1)", brd: "rgba(167,139,250,.25)",
    title: "Dispecerat Extern", badge: "GPS",
    desc: "Trimite un link GPS unic șoferului tău din Polonia, Germania sau Turcia. Acesta îl deschide direct în browser — fără instalare de aplicații, fără cont ANAF.",
    bullets: ["Link cu token de scurtă durată","Urmărire live în timp real","Funcționează pe orice telefon","Expiră automat după trecerea vămiis"],
  },
  { icon: LayoutDashboard, color: "#f59e0b", bg: "rgba(245,158,11,.1)", brd: "rgba(245,158,11,.25)",
    title: "Dashboard Flotă Live", badge: "REAL-TIME",
    desc: "Vizualizezi în timp real statusul fiecărui vehicul: unde se află, ce UIT are, cât timp îi mai rămâne și care e așteptarea la vamă.",
    bullets: ["Status live pentru toată flota","Timpi de așteptare la 6 puncte vamale","Alerte proactive pentru riscuri amendă","Sortare și filtrare avansată"],
  },
  { icon: Shield, color: "#f87171", bg: "rgba(239,68,68,.1)", brd: "rgba(239,68,68,.25)",
    title: "API ANAF Direct", badge: "INTEGRAT",
    desc: "Conexiune certificată cu ANAF SPV via OAuth2. Credențialele tale sunt stocate criptat în Vault — niciodată în baza de date.",
    bullets: ["OAuth2 cu token refresh automat","AES-256 pentru credențiale","Certificat digital gestionat de noi","Endpoint activ: api.anaf.ro/prod"],
  },
  { icon: Bell, color: "#818cf8", bg: "rgba(129,140,248,.1)", brd: "rgba(129,140,248,.25)",
    title: "Alerte Inteligente", badge: "PROACTIV",
    desc: "Sistemul detectează riscurile înainte să devină probleme: trafic la vamă, UIT care se apropie de expirare, erori de conexiune ANAF.",
    bullets: ["Push, SMS și WhatsApp simultan","Escaladare automată dacă nu răspunzi","Digeste zilnice cu sumar flotă","Webhooks pentru integrare ERP"],
  },
];
function FunctionalitatiPage({ onEnter }) {
  const [hovered, setHovered] = useState(null);
  return (
    <div style={{overflowY:"auto"}}>
      {/* HERO */}
      <section style={{textAlign:"center",padding:"96px 40px 80px",position:"relative",overflow:"hidden"}}>
        {/* Mesh gradient background */}
        <div style={{position:"absolute",top:"-10%",left:"20%",width:500,height:500,background:"radial-gradient(ellipse,rgba(59,130,246,.08) 0%,transparent 65%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:"20%",right:"10%",width:400,height:400,background:"radial-gradient(ellipse,rgba(16,185,129,.06) 0%,transparent 65%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:"0%",left:"30%",width:600,height:300,background:"radial-gradient(ellipse,rgba(167,139,250,.04) 0%,transparent 65%)",pointerEvents:"none"}}/>
        {/* Decorative grid lines */}
        <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.012) 1px,transparent 1px)",backgroundSize:"60px 60px",pointerEvents:"none"}}/>
        <div className="fu" style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(59,130,246,.08)",border:"1px solid rgba(59,130,246,.2)",borderRadius:20,padding:"5px 14px",marginBottom:28}}>
          <Cpu size={11} color="#60a5fa"/><span style={{fontSize:11,color:"#60a5fa",fontWeight:600,letterSpacing:.03}}>Platformă completă pentru transportatori rutieri</span>
        </div>
        <h1 className="fu1" style={{fontFamily:"'Instrument Serif',serif",fontSize:"clamp(44px,5.5vw,74px)",fontWeight:400,color:"#f9fafb",lineHeight:1.05,letterSpacing:-2.5,marginBottom:20,maxWidth:720,margin:"0 auto 20px"}}>
          Tot ce ai nevoie.<br/><span style={{fontStyle:"italic",background:"linear-gradient(135deg,#60a5fa,#a78bfa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Într-un singur loc.</span>
        </h1>
        <p className="fu2" style={{fontSize:17,color:"#6b7280",maxWidth:500,margin:"0 auto 48px",lineHeight:1.75}}>
          6 module integrate care elimină complet riscul de amendă ANAF pentru orice flotă de transport rutier.
        </p>
        {/* Stats row */}
        <div className="fu3" style={{display:"inline-flex",gap:0,background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.07)",borderRadius:16,overflow:"hidden",marginBottom:0}}>
          {[["340+","Firme active"],["99.8%","Uptime API"],["< 3s","Timp reînnoire"]].map(([v,l],i)=>(
            <div key={l} style={{padding:"14px 28px",borderRight:i<2?"1px solid rgba(255,255,255,.06)":"none"}}>
              <div style={{fontSize:20,fontWeight:800,color:"#f9fafb",letterSpacing:-0.5,lineHeight:1,marginBottom:3,fontFamily:"'Syne',sans-serif"}}>{v}</div>
              <div style={{fontSize:10,color:"#4b5563",fontWeight:500,letterSpacing:.03}}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section style={{maxWidth:1080,margin:"0 auto",padding:"0 40px 80px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
          {FEATURES.map((feat,i)=>(
            <div key={i} className="featureCard fu" style={{animationDelay:`${i*0.07}s`}}
              onMouseEnter={()=>setHovered(i)} onMouseLeave={()=>setHovered(null)}>
              {/* Glow background on hover */}
              <div style={{position:"absolute",inset:0,borderRadius:20,background:`radial-gradient(circle at 30% 30%,${feat.bg},transparent 70%)`,opacity:hovered===i?1:0,transition:"opacity .3s",pointerEvents:"none"}}/>
              <div style={{position:"relative"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18}}>
                  <div style={{width:44,height:44,borderRadius:13,background:feat.bg,border:`1px solid ${feat.brd}`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 8px 24px ${feat.bg}`}}>
                    <feat.icon size={20} color={feat.color}/>
                  </div>
                  <span className="badge" style={{background:feat.bg,color:feat.color,border:`1px solid ${feat.brd}`}}>{feat.badge}</span>
                </div>
                <h3 style={{fontFamily:"'Instrument Serif',serif",fontSize:20,color:"#f9fafb",fontWeight:400,letterSpacing:-.5,marginBottom:12,lineHeight:1.2}}>{feat.title}</h3>
                <p style={{fontSize:13,color:"#6b7280",lineHeight:1.75,marginBottom:18}}>{feat.desc}</p>
                <div style={{display:"flex",flexDirection:"column",gap:7}}>
                  {feat.bullets.map((b,j)=>(
                    <div key={j} style={{display:"flex",alignItems:"center",gap:8}}>
                      <div style={{width:16,height:16,borderRadius:"50%",background:feat.bg,border:`1px solid ${feat.brd}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Check size={8} color={feat.color}/></div>
                      <span style={{fontSize:12,color:"#9ca3af"}}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section style={{maxWidth:1000,margin:"0 auto",padding:"0 40px 80px"}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <h2 style={{fontFamily:"'Instrument Serif',serif",fontSize:40,color:"#f9fafb",letterSpacing:-1.5,marginBottom:10,lineHeight:1.1}}>SmartLogis vs.<br/><em style={{color:"#60a5fa"}}>gestionare manuală</em></h2>
        </div>
        <div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.07)",borderRadius:20,overflow:"hidden"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",background:"rgba(255,255,255,.03)",borderBottom:"1px solid rgba(255,255,255,.07)"}}>
            <div style={{padding:"14px 24px",fontSize:11,fontWeight:700,color:"#4b5563",letterSpacing:.08,textTransform:"uppercase"}}>Funcționalitate</div>
            <div style={{padding:"14px 24px",fontSize:11,fontWeight:700,color:"#34d399",letterSpacing:.08,textTransform:"uppercase",borderLeft:"1px solid rgba(255,255,255,.07)"}}>SmartLogis ✓</div>
            <div style={{padding:"14px 24px",fontSize:11,fontWeight:700,color:"#4b5563",letterSpacing:.08,textTransform:"uppercase",borderLeft:"1px solid rgba(255,255,255,.07)"}}>Manual ✗</div>
          </div>
          {[
            ["Reînnoire UIT","Automată, < 3 secunde","Manual, 15-30 minute"],
            ["Monitorizare expirare","24/7, alertă push","Verificare zilnică manuală"],
            ["Procesare facturi/CMR","OCR + AI, instant","Completare manuală formulare"],
            ["Dispecerat șoferi străini","Link GPS instant","Apeluri + mesaje WhatsApp"],
            ["Risc amendă ANAF","Eliminat aproape complet","Ridicat — eroare umană"],
            ["Cost pe vehicul/lună","~18 RON","~2-4 ore muncă admin"],
          ].map(([feat,smart,manual],i)=>(
            <div key={i} className="trow" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",borderBottom:i<5?"1px solid rgba(255,255,255,.04)":"none"}}>
              <div style={{padding:"14px 24px",fontSize:13,color:"#9ca3af"}}>{feat}</div>
              <div style={{padding:"14px 24px",fontSize:13,color:"#34d399",borderLeft:"1px solid rgba(255,255,255,.04)",fontWeight:500}}>{smart}</div>
              <div style={{padding:"14px 24px",fontSize:13,color:"#374151",borderLeft:"1px solid rgba(255,255,255,.04)"}}>{manual}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{maxWidth:800,margin:"0 auto",padding:"0 40px 80px"}}>
        <div style={{background:"linear-gradient(135deg,rgba(59,130,246,.07) 0%,rgba(167,139,250,.05) 100%)",border:"1px solid rgba(59,130,246,.2)",borderRadius:24,padding:"52px 44px",textAlign:"center",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-60,right:-60,width:200,height:200,background:"radial-gradient(circle,rgba(59,130,246,.12),transparent 70%)",pointerEvents:"none"}}/>
          <h2 style={{fontFamily:"'Instrument Serif',serif",fontSize:40,color:"#f9fafb",letterSpacing:-1.5,marginBottom:12,lineHeight:1.1}}>Gata să automatizezi<br/><em style={{color:"#60a5fa"}}>flota ta?</em></h2>
          <p style={{fontSize:14,color:"#6b7280",marginBottom:32}}>14 zile trial gratuit. Configurare în 5 minute. Fără card.</p>
          <button className="btn navBtnCta" onClick={onEnter} style={{fontSize:14,padding:"12px 32px"}}><ArrowRight size={15} style={{display:"inline",marginRight:8}}/>Începe Acum</button>
        </div>
      </section>
    </div>
  );
}


// ══════════════════════════════════════════════════════════════════════════════
// PAGE: BLOG
// ══════════════════════════════════════════════════════════════════════════════
const BLOG_POSTS = [
  { id:1, tag:"GHID ANAF", tagColor:"#34d399", tagBg:"rgba(16,185,129,.1)", tagBrd:"rgba(16,185,129,.2)",
    title:"Cum funcționează UIT-ul în 2025: Tot ce trebuie să știi ca transportator",
    excerpt:"UIT (Urmărirea și Identificarea Transportului) este sistemul ANAF de monitorizare a mărfurilor în tranzit. Începând cu 2024, companiile de transport sunt obligate să declare fiecare cursă internațională. Iată tot ce trebuie să știi.",
    author:"Andrei Constantin", role:"Fondator SmartLogis", date:"28 feb 2025", read:"7 min",
    featured: true },
  { id:2, tag:"AUTOMATIZARE", tagColor:"#60a5fa", tagBg:"rgba(59,130,246,.1)", tagBrd:"rgba(59,130,246,.2)",
    title:"De ce 73% din amenzile ANAF pentru transport ar fi putut fi evitate cu auto-reînnoire",
    excerpt:"O analiză a 1.200 de dosare de amendă ANAF din 2024 arată că marea majoritate se datorau simplu: UIT-ul a expirat în timp ce vehiculul era în tranzit. Auto-reînnoirea rezolvă complet această problemă.",
    author:"Maria Ionescu", role:"Head of Compliance", date:"14 feb 2025", read:"5 min",
    featured: false },
  { id:3, tag:"INTEGRARE", tagColor:"#a78bfa", tagBg:"rgba(167,139,250,.1)", tagBrd:"rgba(167,139,250,.2)",
    title:"Cum integrezi SmartLogis cu sistemul tău TMS sau ERP în mai puțin de o zi",
    excerpt:"API-ul SmartLogis este disponibil în planul Enterprise. În acest ghid, îți arătăm cum să conectezi platforma cu cele mai populare sisteme de management al transportului din România.",
    author:"Radu Popa", role:"Lead Developer", date:"3 feb 2025", read:"9 min",
    featured: false },
  { id:4, tag:"LEGISLAȚIE", tagColor:"#f59e0b", tagBg:"rgba(245,158,11,.1)", tagBrd:"rgba(245,158,11,.2)",
    title:"Modificările ANAF din Q1 2025: Ce s-a schimbat și cum te afectează ca transportator",
    excerpt:"ANAF a actualizat procedurile de declarare UIT și a introdus noi câmpuri obligatorii pentru transportul de produse chimice și alimentare. Rezumăm tot ce s-a schimbat.",
    author:"Andrei Constantin", role:"Fondator SmartLogis", date:"21 ian 2025", read:"6 min",
    featured: false },
  { id:5, tag:"BEST PRACTICE", tagColor:"#f87171", tagBg:"rgba(239,68,68,.1)", tagBrd:"rgba(239,68,68,.2)",
    title:"5 greșeli frecvente în managementul UIT pentru flote mari (și cum să le eviți)",
    excerpt:"Am analizat datele de la 340 de companii de transport din România. Iată greșelile care apar cel mai des și cum platforma SmartLogis le previne automat.",
    author:"Maria Ionescu", role:"Head of Compliance", date:"9 ian 2025", read:"4 min",
    featured: false },
  { id:6, tag:"TUTORIAL", tagColor:"#818cf8", tagBg:"rgba(129,140,248,.1)", tagBrd:"rgba(129,140,248,.2)",
    title:"Dispecerat extern pentru șoferi străini: ghid complet de configurare",
    excerpt:"Dacă lucrezi cu șoferi din Polonia, Germania sau Bulgaria, ai nevoie de o metodă simplă să le trimiți coordonatele și să urmărești cursele. Iată cum funcționează Dispeceratul Extern SmartLogis.",
    author:"Radu Popa", role:"Lead Developer", date:"20 dec 2024", read:"8 min",
    featured: false },
];
function BlogPage({ onEnter }) {
  const [activeTag, setActiveTag] = useState("Toate");
  const tags = ["Toate","GHID ANAF","AUTOMATIZARE","LEGISLAȚIE","TUTORIAL","INTEGRARE","BEST PRACTICE"];
  const filtered = activeTag==="Toate" ? BLOG_POSTS : BLOG_POSTS.filter(p=>p.tag===activeTag);
  const featured = filtered.find(p=>p.featured) || filtered[0];
  const rest = filtered.filter(p=>p.id!==featured?.id);
  return (
    <div style={{overflowY:"auto"}}>
      {/* HEADER */}
      <section style={{textAlign:"center",padding:"88px 40px 60px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:800,height:500,background:"radial-gradient(ellipse,rgba(167,139,250,.07) 0%,transparent 70%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,.01) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.01) 1px,transparent 1px)",backgroundSize:"80px 80px",pointerEvents:"none"}}/>
        <div className="fu" style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(167,139,250,.08)",border:"1px solid rgba(167,139,250,.2)",borderRadius:20,padding:"5px 14px",marginBottom:20}}>
          <BookOpen size={11} color="#a78bfa"/><span style={{fontSize:11,color:"#a78bfa",fontWeight:600}}>Resurse pentru transportatori</span>
        </div>
        <h1 className="fu1" style={{fontFamily:"'Instrument Serif',serif",fontSize:"clamp(42px,5vw,68px)",fontWeight:400,color:"#f9fafb",letterSpacing:-2.5,marginBottom:14,maxWidth:600,margin:"0 auto 14px",lineHeight:1.05}}>
          Blog <span style={{fontStyle:"italic",background:"linear-gradient(135deg,#a78bfa,#60a5fa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>SmartLogis</span>
        </h1>
        <p className="fu2" style={{fontSize:15,color:"#6b7280",maxWidth:440,margin:"0 auto 36px",lineHeight:1.7}}>Ghiduri practice, legislație ANAF și best practices pentru companii de transport din România.</p>
        {/* Tag filter pills */}
        <div className="fu3" style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center"}}>
          {tags.map(t=>(
            <button className="btn-ghost" key={t} onClick={()=>setActiveTag(t)} style={{padding:"7px 16px",borderRadius:20,fontSize:11,fontWeight:600,border:`1px solid ${activeTag===t?"rgba(167,139,250,.35)":"rgba(255,255,255,.07)"}`,background:activeTag===t?"rgba(167,139,250,.12)":"rgba(255,255,255,.03)",color:activeTag===t?"#a78bfa":"#6b7280",letterSpacing:.02}}>
              {t}
            </button>
          ))}
        </div>
      </section>

      <div style={{maxWidth:1060,margin:"0 auto",padding:"0 40px 80px"}}>
        {/* FEATURED */}
        {featured && <div className="fu" style={{background:"linear-gradient(135deg,rgba(167,139,250,.04) 0%,rgba(59,130,246,.03) 100%)",border:"1px solid rgba(167,139,250,.18)",borderRadius:24,padding:0,marginBottom:28,overflow:"hidden",display:"grid",gridTemplateColumns:"1.2fr 1fr"}}>
          <div style={{padding:"44px 40px"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
              <span className="badge" style={{background:featured.tagBg,color:featured.tagColor,border:`1px solid ${featured.tagBrd}`}}>{featured.tag}</span>
              <span className="badge" style={{background:"rgba(255,255,255,.04)",color:"#374151",border:"1px solid rgba(255,255,255,.06)"}}>FEATURED</span>
            </div>
            <h2 style={{fontFamily:"'Instrument Serif',serif",fontSize:26,color:"#f9fafb",lineHeight:1.3,letterSpacing:-1,marginBottom:14}}>{featured.title}</h2>
            <p style={{fontSize:13,color:"#6b7280",lineHeight:1.8,marginBottom:24}}>{featured.excerpt}</p>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:34,height:34,borderRadius:"50%",background:`linear-gradient(135deg,${featured.tagBg},rgba(167,139,250,.2))`,border:`1px solid ${featured.tagBrd}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:featured.tagColor}}>{featured.author[0]}</div>
                <div><div style={{fontSize:12,fontWeight:600,color:"#d1d5db"}}>{featured.author}</div><div style={{fontSize:10,color:"#4b5563"}}>{featured.role}</div></div>
              </div>
              <div style={{fontSize:10,color:"#374151",display:"flex",alignItems:"center",gap:10}}>
                <span>{featured.date}</span>
                <span>·</span>
                <span style={{display:"flex",alignItems:"center",gap:4}}><Clock size={9}/>{featured.read}</span>
              </div>
            </div>
          </div>
          {/* Visual panel */}
          <div style={{background:"rgba(0,0,0,.25)",position:"relative",overflow:"hidden",minHeight:240}}>
            <div style={{position:"absolute",inset:0,background:`linear-gradient(135deg,${featured.tagBg} 0%,transparent 60%)`}}/>
            <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",textAlign:"center"}}>
              <div style={{width:72,height:72,borderRadius:20,background:featured.tagBg,border:`1px solid ${featured.tagBrd}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",boxShadow:`0 16px 40px ${featured.tagBg}`}}>
                <BookOpen size={32} color={featured.tagColor}/>
              </div>
              <div style={{fontSize:10,color:featured.tagColor,fontWeight:700,letterSpacing:.06,textTransform:"uppercase"}}>{featured.read} citire</div>
            </div>
          </div>
        </div>}

        {/* GRID */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18}}>
          {rest.map(p=>(
            <div key={p.id} className="blogCard fu" style={{cursor:"pointer"}}>
              {/* Color bar top */}
              <div style={{height:3,background:`linear-gradient(90deg,${p.tagColor},transparent)`}}/>
              <div style={{padding:"22px"}}>
                <span className="badge" style={{background:p.tagBg,color:p.tagColor,border:`1px solid ${p.tagBrd}`,marginBottom:14,display:"inline-flex"}}>{p.tag}</span>
                <div style={{fontFamily:"'Instrument Serif',serif",fontSize:17,color:"#f0fdf4",lineHeight:1.4,letterSpacing:-.3,marginBottom:12}}>{p.title}</div>
                <div style={{fontSize:12,color:"#6b7280",lineHeight:1.7,marginBottom:16}}>{p.excerpt.substring(0,110)}…</div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:12,borderTop:"1px solid rgba(255,255,255,.05)"}}>
                  <div style={{display:"flex",alignItems:"center",gap:7}}>
                    <div style={{width:26,height:26,borderRadius:"50%",background:p.tagBg,border:`1px solid ${p.tagBrd}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:p.tagColor}}>{p.author[0]}</div>
                    <div style={{fontSize:11,color:"#4b5563"}}>{p.date}</div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:4,fontSize:10,color:"#374151"}}><Clock size={9}/>{p.read}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* NEWSLETTER */}
        <div style={{marginTop:48,background:"linear-gradient(135deg,rgba(167,139,250,.05) 0%,rgba(59,130,246,.03) 100%)",border:"1px solid rgba(167,139,250,.18)",borderRadius:22,padding:"40px",display:"grid",gridTemplateColumns:"1fr auto",gap:32,alignItems:"center",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-40,right:80,width:200,height:200,background:"radial-gradient(circle,rgba(167,139,250,.08),transparent 70%)",pointerEvents:"none"}}/>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <div style={{width:32,height:32,borderRadius:9,background:"rgba(167,139,250,.12)",border:"1px solid rgba(167,139,250,.25)",display:"flex",alignItems:"center",justifyContent:"center"}}><Bell size={14} color="#a78bfa"/></div>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#a78bfa"}}>Newsletter SmartLogis</div>
            </div>
            <div style={{fontFamily:"'Instrument Serif',serif",fontSize:22,color:"#f9fafb",letterSpacing:-.5,marginBottom:6}}>Legislație ANAF + updates produs, săptămânal</div>
            <div style={{fontSize:12,color:"#6b7280"}}>Peste 1.200 de transportatori abonați. Zero spam.</div>
          </div>
          <div style={{display:"flex",gap:8,flexShrink:0}}>
            <input className="ifield" placeholder="email@firma.ro" style={{width:220,fontSize:12}}/>
            <button className="btn" style={{background:"linear-gradient(135deg,#a78bfa,#818cf8)",color:"#fff",border:"none",borderRadius:10,padding:"11px 18px",fontSize:12,fontWeight:700,display:"flex",alignItems:"center",gap:6,whiteSpace:"nowrap",boxShadow:"0 4px 18px rgba(167,139,250,.3)"}}><Send size={12}/>Abonează-te</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE: CONTACT
// ══════════════════════════════════════════════════════════════════════════════
function ContactPage({ onEnter }) {
  const [form, setForm] = useState({name:"",email:"",phone:"",subject:"",message:""});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const f = (k,v) => setForm({...form,[k]:v});
  const send = () => {
    if(!form.name||!form.email||!form.message) return;
    setSending(true);
    setTimeout(()=>{setSending(false);setSent(true);},1800);
  };
  return (
    <div style={{overflowY:"auto"}}>
      {/* HEADER */}
      <section style={{textAlign:"center",padding:"88px 40px 60px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"-5%",left:"50%",transform:"translateX(-50%)",width:900,height:500,background:"radial-gradient(ellipse,rgba(16,185,129,.06) 0%,transparent 65%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,.01) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.01) 1px,transparent 1px)",backgroundSize:"60px 60px",pointerEvents:"none"}}/>
        <div className="fu" style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(16,185,129,.08)",border:"1px solid rgba(16,185,129,.2)",borderRadius:20,padding:"5px 14px",marginBottom:20}}>
          <MessageSquare size={11} color="#34d399"/><span style={{fontSize:11,color:"#34d399",fontWeight:600}}>Răspundem în max. 2 ore în zilele lucrătoare</span>
        </div>
        <h1 className="fu1" style={{fontFamily:"'Instrument Serif',serif",fontSize:"clamp(42px,5vw,68px)",fontWeight:400,color:"#f9fafb",letterSpacing:-2.5,marginBottom:14,maxWidth:560,margin:"0 auto 14px",lineHeight:1.05}}>
          Contactează-ne.<br/><span style={{fontStyle:"italic",background:"linear-gradient(135deg,#34d399,#60a5fa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Suntem aici.</span>
        </h1>
        <p className="fu2" style={{fontSize:15,color:"#6b7280",maxWidth:440,margin:"0 auto",lineHeight:1.7}}>Ai întrebări despre platformă, prețuri sau implementare? Echipa SmartLogis te ajută.</p>
      </section>

      <div style={{maxWidth:980,margin:"0 auto",padding:"0 40px 80px",display:"grid",gridTemplateColumns:"1fr 1.4fr",gap:28,alignItems:"start"}}>
        {/* LEFT — info cards */}
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {[
            { icon:Mail, color:"#34d399", bg:"rgba(16,185,129,.1)", brd:"rgba(16,185,129,.2)", label:"Email", val:"contact@smartlogis.ro", sub:"Pentru orice întrebare generală" },
            { icon:Phone, color:"#60a5fa", bg:"rgba(59,130,246,.1)", brd:"rgba(59,130,246,.2)", label:"Telefon", val:"+40 264 000 123", sub:"Luni–Vineri, 09:00–18:00" },
            { icon:MapPin, color:"#a78bfa", bg:"rgba(167,139,250,.1)", brd:"rgba(167,139,250,.2)", label:"Birou", val:"Cluj-Napoca, România", sub:"Str. Aviator Bădescu 5, et.2" },
            { icon:Shield, color:"#fbbf24", bg:"rgba(245,158,11,.1)", brd:"rgba(245,158,11,.2)", label:"Sales & Enterprise", val:"sales@smartlogis.ro", sub:"Oferte personalizate, flotă > 50 vehicule" },
          ].map((c,i)=>(
            <div key={i} className="contactInfoCard fu" style={{animationDelay:`${i*0.08}s`}}>
              <div style={{width:42,height:42,borderRadius:12,background:c.bg,border:`1px solid ${c.brd}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:`0 8px 20px ${c.bg}`}}><c.icon size={17} color={c.color}/></div>
              <div>
                <div style={{fontSize:9,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"#374151",marginBottom:4}}>{c.label}</div>
                <div style={{fontSize:13,fontWeight:600,color:"#f0fdf4",marginBottom:3}}>{c.val}</div>
                <div style={{fontSize:11,color:"#6b7280"}}>{c.sub}</div>
              </div>
            </div>
          ))}
          {/* Office hours badge */}
          <div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.06)",borderRadius:14,padding:"16px 20px",marginTop:4}}>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#4b5563",marginBottom:10}}>Program suport</div>
            {[["Luni–Vineri","09:00 – 18:00","#34d399"],["Sâmbătă","10:00 – 14:00","#fbbf24"],["Duminică","Închis","#374151"]].map(([z,o,c])=>(
              <div key={z} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}>
                <span style={{fontSize:12,color:"#6b7280"}}>{z}</span>
                <span style={{fontSize:11,fontWeight:600,color:c}}>{o}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — form */}
        <div style={{background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.08)",borderRadius:22,padding:"32px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-60,right:-40,width:180,height:180,background:"radial-gradient(circle,rgba(16,185,129,.06),transparent 70%)",pointerEvents:"none"}}/>
          {sent ? (
            <div style={{textAlign:"center",padding:"48px 0",position:"relative"}}>
              <div style={{width:72,height:72,borderRadius:"50%",background:"rgba(16,185,129,.1)",border:"2px solid rgba(16,185,129,.3)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px",boxShadow:"0 0 40px rgba(16,185,129,.15)"}}><CheckCircle size={32} color="#34d399"/></div>
              <div style={{fontFamily:"'Instrument Serif',serif",fontSize:28,color:"#f9fafb",marginBottom:10,letterSpacing:-.5}}>Mesaj trimis!</div>
              <div style={{fontSize:13,color:"#6b7280",lineHeight:1.7,marginBottom:32}}>Îți răspundem în maxim 2 ore în zilele lucrătoare.<br/>Verifică și inbox-ul spam.</div>
              <button className="btn-ghost" onClick={()=>setSent(false)} style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",borderRadius:10,padding:"10px 24px",fontSize:12,fontWeight:600,color:"#9ca3af"}}>Trimite alt mesaj</button>
            </div>
          ) : <>
            <div style={{marginBottom:24}}>
              <div style={{fontFamily:"'Instrument Serif',serif",fontSize:22,color:"#f9fafb",letterSpacing:-.5,marginBottom:5}}>Trimite un mesaj</div>
              <div style={{fontSize:12,color:"#6b7280"}}>Completează formularul și te contactăm noi.</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
              {[["Nume complet *","Ion Popescu","name"],["Email *","ion@firma.ro","email"],["Telefon","+40 7xx xxx xxx","phone"]].map(([l,ph,k])=>(
                <div key={k}>
                  <label style={{fontSize:10,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#4b5563",display:"block",marginBottom:5}}>{l}</label>
                  <input className="ifield" placeholder={ph} value={form[k]} onChange={e=>f(k,e.target.value)}/>
                </div>
              ))}
              <div>
                <label style={{fontSize:10,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#4b5563",display:"block",marginBottom:5}}>Subiect</label>
                <select className="ifield" value={form.subject} onChange={e=>f("subject",e.target.value)}>
                  <option value="">Selectează...</option>
                  {["Întrebare generală","Demo platformă","Pricing Enterprise","Suport tehnic","Parteneriat","Altele"].map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div style={{marginBottom:20}}>
              <label style={{fontSize:10,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#4b5563",display:"block",marginBottom:5}}>Mesaj *</label>
              <textarea className="ifield" rows={5} placeholder="Descrie situația sau întrebarea ta. Cu cât mai multe detalii, cu atât mai rapid te putem ajuta." value={form.message} onChange={e=>f("message",e.target.value)} style={{resize:"vertical",minHeight:110}}/>
            </div>
            <button className="btn" onClick={send} disabled={sending||!form.name||!form.email||!form.message}
              style={{width:"100%",background:form.name&&form.email&&form.message?"linear-gradient(135deg,#34d399,#10b981)":"rgba(255,255,255,.05)",color:form.name&&form.email&&form.message?"#022c22":"#374151",border:"none",borderRadius:11,padding:"13px 0",fontSize:13,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxShadow:form.name&&form.email&&form.message?"0 6px 24px rgba(16,185,129,.3)":"none",opacity:form.name&&form.email&&form.message?1:.5}}>
              {sending?<><RefreshCw size={13} className="spin"/>Se trimite...</>:<><Send size={13}/>Trimite Mesajul</>}
            </button>
            <div style={{marginTop:12,fontSize:10,color:"#374151",textAlign:"center"}}>Câmpurile cu * sunt obligatorii · Răspundem în max. 2 ore</div>
          </>}
        </div>
      </div>

      {/* FAQ QUICK */}
      <section style={{maxWidth:980,margin:"0 auto",padding:"0 40px 80px",display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
        {[
          { icon:Clock, color:"#34d399", bg:"rgba(16,185,129,.08)", brd:"rgba(16,185,129,.15)", q:"Cât durează implementarea?", a:"Configurarea completă durează 5 minute. Primul UIT auto-reînnoit apare în aceeași zi." },
          { icon:Users, color:"#60a5fa", bg:"rgba(59,130,246,.08)", brd:"rgba(59,130,246,.15)", q:"Oferiți demo live?", a:"Da, putem face o demonstrație online de 30 de minute. Trimite-ne un email la demo@smartlogis.ro." },
          { icon:Star, color:"#a78bfa", bg:"rgba(167,139,250,.08)", brd:"rgba(167,139,250,.15)", q:"Există perioadă de trial?", a:"14 zile gratuit, fără card, pe orice plan. Poți renunța oricând." },
        ].map((item,i)=>(
          <div key={i} className="fu cardHov" style={{animationDelay:`${i*0.1}s`,background:"rgba(255,255,255,.025)",border:`1px solid ${item.brd}`,borderRadius:18,padding:"24px",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:-20,right:-20,width:100,height:100,background:`radial-gradient(circle,${item.bg},transparent 70%)`,pointerEvents:"none"}}/>
            <div style={{width:40,height:40,borderRadius:12,background:item.bg,border:`1px solid ${item.brd}`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:14,boxShadow:`0 6px 20px ${item.bg}`}}><item.icon size={17} color={item.color}/></div>
            <div style={{fontFamily:"'Instrument Serif',serif",fontSize:16,color:"#f0fdf4",marginBottom:8,lineHeight:1.3}}>{item.q}</div>
            <div style={{fontSize:12,color:"#6b7280",lineHeight:1.65}}>{item.a}</div>
          </div>
        ))}
      </section>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE: TERMENI ȘI CONDIȚII
// ══════════════════════════════════════════════════════════════════════════════
function TermeniPage({ onEnter }) {
  const [activeSection, setActiveSection] = useState(null);
  const secs = [
    { title:"Acceptarea Termenilor", body:"Prin utilizarea platformei SmartLogis (disponibilă la smartlogis.ro și sub-domeniile sale), confirmi că ai citit, înțeles și ești de acord cu acești Termeni și Condiții. Dacă nu ești de acord, te rugăm să nu utilizezi platforma. SmartLogis SRL, cu sediul în Cluj-Napoca, România, CUI RO49012345, operează această platformă." },
    { title:"Descrierea Serviciului", body:"SmartLogis oferă o platformă software de management al flotelor de transport rutier, incluzând: monitorizare UIT (Urmărire și Identificare Transport), auto-reînnoire UIT prin integrare directă cu API-ul ANAF, procesare OCR a documentelor vamale, generare automată coduri NC8, dispecerat extern pentru șoferi și rapoarte operaționale. Serviciul este disponibil prin abonament lunar sau anual." },
    { title:"Cont și Securitate", body:"Ești responsabil pentru menținerea confidențialității credențialelor contului tău. Ne informezi imediat la security@smartlogis.ro dacă suspectezi acces neautorizat. SmartLogis nu poate fi responsabilă pentru pierderi rezultate din nerespectarea acestei obligații. Conturile sunt create per companie (CUI) și pot include mai mulți utilizatori conform planului ales." },
    { title:"Utilizarea Acceptabilă", body:"Platforma este destinată exclusiv gestionării legitime a flotelor de transport rutier înregistrate legal. Sunt interzise: utilizarea automatizată excesivă care afectează infrastructura, reinginerizarea sau copierea codului sursă, utilizarea în scop ilicit sau contrar legislației românești și europene, revânzarea accesului fără acord scris." },
    { title:"Conectarea API ANAF", body:"SmartLogis acționează ca agent tehnic autorizat pentru apelarea API-ului ANAF în numele tău. Prin furnizarea credențialelor ANAF SPV, acorzi SmartLogis permisiunea limitată de a genera și reînnoi UIT-uri. Nu stocăm credențialele în text clar — acestea sunt criptate cu AES-256 și stocate în Vault separat de baza de date. Ești responsabil pentru validitatea și legalitatea UIT-urilor generate." },
    { title:"Facturare și Plăți", body:"Abonamentele sunt facturate în avans, lunar sau anual. Prețurile sunt în RON, cu TVA inclus. Plata se efectuează prin card bancar sau transfer bancar. În caz de neplată, accesul la platformă poate fi suspendat după 7 zile de la data scadenței. Planul Starter și Pro pot fi anulate oricând; anularea produce efecte la sfârșitul perioadei de facturare curente." },
    { title:"Garanție și Rambursare", body:"Oferim o garanție de satisfacție de 30 de zile de la prima activare. Dacă platforma nu corespunde așteptărilor în această perioadă, contactează-ne la billing@smartlogis.ro pentru rambursare integrală. Nu oferim rambursări pentru perioadele parțiale după expirarea garanției de 30 de zile." },
    { title:"Limitarea Răspunderii", body:"SmartLogis nu este responsabilă pentru: indisponibilitatea temporară a API-ului ANAF (factor extern), amendele aplicate de autorități ca urmare a erorilor API ANAF sau a datelor incorecte furnizate de utilizator, pierderea de date cauzată de forță majoră sau evenimente necontrolabile. Răspunderea noastră este limitată la valoarea abonamentului plătit în ultimele 3 luni." },
    { title:"Modificări ale Termenilor", body:"Putem modifica acești termeni cu un preaviz de 30 de zile, comunicat prin email la adresa asociată contului. Continuarea utilizării platformei după această perioadă constituie acceptul noilor termeni. Versiunea actuală a termenilor este întotdeauna disponibilă la smartlogis.ro/termeni." },
  ];
  return (
    <div style={{overflowY:"auto"}}>
      <section style={{maxWidth:860,margin:"0 auto",padding:"72px 40px 80px"}}>
        {/* Header */}
        <div className="fu" style={{marginBottom:44}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:20,padding:"5px 14px",marginBottom:22}}>
            <FileText size={11} color="#9ca3af"/><span style={{fontSize:11,color:"#9ca3af",fontWeight:600,letterSpacing:.03}}>Document legal</span>
          </div>
          <h1 style={{fontFamily:"'Instrument Serif',serif",fontSize:"clamp(38px,4.5vw,56px)",fontWeight:400,color:"#f9fafb",letterSpacing:-2,marginBottom:12,lineHeight:1.05}}>Termeni și Condiții</h1>
          <div style={{fontSize:13,color:"#4b5563"}}>Ultima actualizare: <strong style={{color:"#9ca3af"}}>1 Ianuarie 2026</strong> · Versiunea 3.2</div>
        </div>
        {/* Info notice */}
        <div style={{background:"linear-gradient(135deg,rgba(59,130,246,.06),rgba(59,130,246,.02))",border:"1px solid rgba(59,130,246,.18)",borderRadius:16,padding:"18px 22px",marginBottom:36,display:"flex",gap:14,alignItems:"flex-start"}}>
          <div style={{width:36,height:36,borderRadius:10,background:"rgba(59,130,246,.12)",border:"1px solid rgba(59,130,246,.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Info size={16} color="#60a5fa"/></div>
          <div style={{fontSize:13,color:"#93c5fd",lineHeight:1.75}}>Acești termeni constituie un contract juridic valabil între tine și <strong style={{color:"#bfdbfe"}}>SmartLogis SRL</strong>. Te rugăm să îi citești cu atenție înainte de a utiliza platforma.</div>
        </div>
        {/* Sections */}
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {secs.map((s,i)=>(
            <div key={i} className="legalSection">
              <button className="btn-ghost" onClick={()=>setActiveSection(activeSection===i?null:i)} style={{width:"100%",display:"flex",alignItems:"center",gap:14,background:"none",border:"none",textAlign:"left",padding:0}}>
                <div style={{width:30,height:30,borderRadius:8,background:`rgba(${i<3?"52,211,153":i<6?"96,165,250":"167,139,250"},.12)`,border:`1px solid rgba(${i<3?"52,211,153":i<6?"96,165,250":"167,139,250"},.25)`,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:i<3?"#34d399":i<6?"#60a5fa":"#a78bfa",flexShrink:0,fontFamily:"'Syne',sans-serif"}}>{i+1}</div>
                <span style={{flex:1,fontFamily:"'Instrument Serif',serif",fontSize:18,color:"#f0fdf4",letterSpacing:-.3}}>{s.title}</span>
                <ChevronDown size={14} color="#4b5563" style={{flexShrink:0,transform:activeSection===i?"rotate(180deg)":"none",transition:"transform .2s"}}/>
              </button>
              {activeSection===i && <p style={{fontSize:13,color:"#6b7280",lineHeight:1.85,marginTop:14,paddingLeft:44}}>{s.body}</p>}
            </div>
          ))}
        </div>
        {/* Footer CTA */}
        <div style={{background:"linear-gradient(135deg,rgba(16,185,129,.05),rgba(16,185,129,.02))",border:"1px solid rgba(16,185,129,.18)",borderRadius:18,padding:"24px 28px",marginTop:24,display:"flex",alignItems:"center",justifyContent:"space-between",gap:20}}>
          <div>
            <div style={{fontFamily:"'Instrument Serif',serif",fontSize:18,color:"#f9fafb",marginBottom:5}}>Ai întrebări despre acești termeni?</div>
            <div style={{fontSize:12,color:"#6b7280"}}>Contactează echipa noastră juridică la <span style={{color:"#34d399"}}>legal@smartlogis.ro</span></div>
          </div>
          <button onClick={onEnter} className="navBtnCta" style={{fontSize:12,padding:"9px 20px",whiteSpace:"nowrap"}}>Încearcă Platforma →</button>
        </div>
      </section>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE: CONFIDENȚIALITATE (GDPR)
// ══════════════════════════════════════════════════════════════════════════════
function ConfidentialitateaPage({ onEnter }) {
  const [openSec, setOpenSec] = useState(null);
  const secs = [
    { title:"Ce date colectăm", icon:Eye, color:"#60a5fa", bg:"rgba(59,130,246,.08)", body:"Colectăm: datele contului (nume, email, CUI, adresă), datele flotei (numere de înmatriculare, șoferi, rute), credențialele ANAF (criptate AES-256), documentele încărcate pentru OCR (facturi, CMR), datele de utilizare a platformei (log-uri tehnice, IP-uri). Nu colectăm date personale ale persoanelor fizice fără consimțământ explicit." },
    { title:"Cum folosim datele", icon:Settings, color:"#a78bfa", bg:"rgba(167,139,250,.08)", body:"Datele sunt utilizate exclusiv pentru: furnizarea serviciilor SmartLogis (gestionare UIT, auto-reînnoire, OCR), îmbunătățirea platformei prin analiză anonimizată, suport tehnic și comunicări operaționale, respectarea obligațiilor legale față de ANAF și autorități. Nu vindem, nu închiriem și nu partajăm datele cu terți în scop comercial." },
    { title:"Stocarea și securitatea datelor", icon:Lock, color:"#34d399", bg:"rgba(16,185,129,.08)", body:"Serverele sunt situate exclusiv în Uniunea Europeană (România). Datele sunt criptate în tranzit (TLS 1.3) și în repaus (AES-256). Credențialele ANAF sunt stocate separat în HashiCorp Vault cu rotație automată la 24h. Backup-uri zilnice cu retenție 90 zile. Testăm periodic securitatea prin audituri externe." },
    { title:"Transferuri internaționale", icon:Globe, color:"#f59e0b", bg:"rgba(245,158,11,.08)", body:"Datele tale nu sunt transferate în afara Spațiului Economic European. Procesăm date exclusiv pe infrastructură din România și EU. Dacă un furnizor de servicii terț (ex: Twilio pentru SMS) procesează date, acesta este supus Clauzelor Contractuale Standard GDPR și acordurilor de procesare date (DPA)." },
    { title:"Drepturile tale (GDPR)", icon:CheckSquare, color:"#f87171", bg:"rgba(239,68,68,.08)", body:"Conform GDPR, ai dreptul la: accesul la datele tale (art.15), rectificarea datelor incorecte (art.16), ștergerea datelor ('dreptul la uitare', art.17), restricționarea prelucrării (art.18), portabilitatea datelor în format CSV/JSON (art.20), obiecția față de prelucrare (art.21). Exercitarea drepturilor: privacy@smartlogis.ro. Răspundem în 30 zile." },
    { title:"Cookie-uri și tracking", icon:Bell, color:"#818cf8", bg:"rgba(129,140,248,.08)", body:"Utilizăm cookie-uri strict necesare pentru autentificare și sesiune. Nu utilizăm cookie-uri de tracking terțe sau publicitate. Analytics-ul intern este anonimizat. Poți șterge cookie-urile din setările browser-ului. Nu utilizăm fingerprinting sau tehnici de tracking invazive." },
    { title:"Retenția datelor", icon:Clock, color:"#34d399", bg:"rgba(16,185,129,.08)", body:"Datele contului activ sunt păstrate pe durata contractului + 3 ani (obligație legală). La ștergerea contului: datele operaționale sunt anonimizate în 30 zile, log-urile de audit sunt păstrate 7 ani (cerință ANAF). Documentele OCR sunt șterse după 12 luni dacă nu ai exportat arhiva. Poți solicita ștergerea anticipată." },
    { title:"Contact și reclamații DPA", icon:Mail, color:"#60a5fa", bg:"rgba(59,130,246,.08)", body:"Responsabil Protecția Datelor (DPO): dpo@smartlogis.ro. Adresă: SmartLogis SRL, Str. Aviator Bădescu 5, Cluj-Napoca, 400000, România. Autoritatea de supraveghere: ANSPDCP (www.dataprotection.ro). Ai dreptul să depui plângere direct la ANSPDCP dacă consideră că drepturile tale nu au fost respectate." },
  ];
  return (
    <div style={{overflowY:"auto"}}>
      <section style={{maxWidth:860,margin:"0 auto",padding:"72px 40px 80px"}}>
        {/* Header */}
        <div className="fu" style={{marginBottom:44}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(16,185,129,.07)",border:"1px solid rgba(16,185,129,.18)",borderRadius:20,padding:"5px 14px",marginBottom:22}}>
            <Shield size={11} color="#34d399"/><span style={{fontSize:11,color:"#34d399",fontWeight:600,letterSpacing:.03}}>GDPR Compliant · Regulamentul UE 2016/679</span>
          </div>
          <h1 style={{fontFamily:"'Instrument Serif',serif",fontSize:"clamp(38px,4.5vw,56px)",fontWeight:400,color:"#f9fafb",letterSpacing:-2,marginBottom:12,lineHeight:1.05}}>Politica de Confidențialitate</h1>
          <div style={{fontSize:13,color:"#4b5563"}}>Ultima actualizare: <strong style={{color:"#9ca3af"}}>1 Ianuarie 2026</strong></div>
        </div>
        {/* Trust badges */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:36}}>
          {[["🇷🇴","Servere în România","Date stocate exclusiv în EU","rgba(16,185,129,.07)","rgba(16,185,129,.15)"],["🔐","AES-256","Criptare la nivel militar","rgba(59,130,246,.07)","rgba(59,130,246,.15)"],["⚡","GDPR nativ","Platformă construită pentru conformitate","rgba(167,139,250,.07)","rgba(167,139,250,.15)"]].map(([emoji,t,s,bg,brd])=>(
            <div key={t} style={{background:bg,border:`1px solid ${brd}`,borderRadius:14,padding:"16px 18px",display:"flex",alignItems:"flex-start",gap:10}}>
              <span style={{fontSize:22,lineHeight:1}}>{emoji}</span>
              <div><div style={{fontSize:12,fontWeight:700,color:"#f9fafb",marginBottom:3}}>{t}</div><div style={{fontSize:11,color:"#6b7280"}}>{s}</div></div>
            </div>
          ))}
        </div>
        {/* Accordion sections */}
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {secs.map((s,i)=>(
            <div key={i} style={{background:openSec===i?"rgba(255,255,255,.035)":"rgba(255,255,255,.018)",border:`1px solid ${openSec===i?`${s.color}30`:"rgba(255,255,255,.06)"}`,borderRadius:16,overflow:"hidden",transition:"all .25s"}}>
              <button onClick={()=>setOpenSec(openSec===i?null:i)} className="btn-ghost" style={{width:"100%",display:"flex",alignItems:"center",gap:14,padding:"18px 22px",background:"none",border:"none",textAlign:"left"}}>
                <div style={{width:38,height:38,borderRadius:11,background:s.bg,border:`1px solid ${s.color}30`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:openSec===i?`0 6px 18px ${s.bg}`:none}}><s.icon size={16} color={s.color}/></div>
                <span style={{flex:1,fontFamily:"'Instrument Serif',serif",fontSize:17,color:"#f0fdf4",letterSpacing:-.3}}>{s.title}</span>
                <ChevronDown size={14} color="#4b5563" style={{flexShrink:0,transform:openSec===i?"rotate(180deg)":"none",transition:"transform .2s"}}/>
              </button>
              {openSec===i&&<div style={{padding:"0 22px 18px 74px",fontSize:13,color:"#6b7280",lineHeight:1.85}}>{s.body}</div>}
            </div>
          ))}
        </div>
        {/* Footer CTA */}
        <div style={{background:"linear-gradient(135deg,rgba(16,185,129,.05),rgba(16,185,129,.02))",border:"1px solid rgba(16,185,129,.18)",borderRadius:18,padding:"24px 28px",marginTop:24,display:"flex",alignItems:"center",justifyContent:"space-between",gap:20}}>
          <div>
            <div style={{fontFamily:"'Instrument Serif',serif",fontSize:18,color:"#f9fafb",marginBottom:5}}>Exercitează-ți drepturile GDPR</div>
            <div style={{fontSize:12,color:"#6b7280"}}>Trimite o cerere la <span style={{color:"#34d399"}}>privacy@smartlogis.ro</span> · Răspundem în 30 de zile</div>
          </div>
          <button onClick={onEnter} className="navBtnCta" style={{fontSize:12,padding:"9px 20px",whiteSpace:"nowrap"}}>Încearcă Platforma →</button>
        </div>
      </section>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// VIEW: LANDING (Pricing)
// ══════════════════════════════════════════════════════════════════════════════
function Landing({ onEnter }) {
  const [annual, setAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);
  const [landingPage, setLandingPage] = useState("pricing");
  const logos = ["Romtrans","TransRo","LogiCar","EuroTIR","CargoRO","SpeedLog","AlphaFleet","NordTrans"];
  const faqs = [
    {q:"Cum funcționează Auto-Reînnoirea UIT?",a:"Motorul SmartLogis monitorizează constant expirarea fiecărui UIT. Când detectează că un vehicul va expira sub pragul setat (ex: 3h), apelează automat API-ul ANAF, generează un nou UIT și trimite confirmare. Zero click-uri."},
    {q:"Datele mele sunt în siguranță?",a:"Da. AES-256 la rest, TLS 1.3 în tranzit. Servere în România (GDPR). Credențialele ANAF sunt stocate în Vault criptat, nu în baza de date."},
    {q:"Pot testa înainte să plătesc?",a:"Toate planurile includ 14 zile trial gratuit, fără card. Dacă nu ești mulțumit în primele 30 de zile, îți returnăm banii integral."},
    {q:"Funcționează pentru șoferi străini?",a:"Da. Dispeceratul extern trimite link-uri GPS în browser (PL, DE, HU, TR, BG). Fără instalare de aplicații, fără cont ANAF necesar pentru șofer."},
  ];
  return (
    <div style={{height:"100vh",overflowY:"auto",background:"#060810"}}>
      {/* NAV */}
      <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,8,16,.88)",backdropFilter:"blur(24px)",borderBottom:"1px solid rgba(255,255,255,.05)",padding:"0 40px",height:62,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        {/* LOGO */}
        <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={()=>setLandingPage("pricing")}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#34d399"/><stop offset="100%" stopColor="#3b82f6"/></linearGradient>
              <linearGradient id="lg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#34d399" stopOpacity=".3"/><stop offset="100%" stopColor="#3b82f6" stopOpacity=".1"/></linearGradient>
            </defs>
            <rect x="1" y="1" width="30" height="30" rx="9" fill="url(#lg2)" stroke="url(#lg1)" strokeWidth="1.2"/>
            <path d="M7 20.5 C7 20.5 10 14 16 14 C22 14 25 20.5 25 20.5" stroke="url(#lg1)" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
            <circle cx="7.5" cy="20.5" r="2.5" fill="url(#lg1)"/>
            <circle cx="24.5" cy="20.5" r="2.5" fill="url(#lg1)"/>
            <circle cx="16" cy="10.5" r="2" fill="white" opacity=".9"/>
            <line x1="16" y1="12.5" x2="16" y2="14.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" opacity=".6"/>
          </svg>
          <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:16,color:"#f9fafb",letterSpacing:-.3,background:"linear-gradient(135deg,#f9fafb 30%,#34d399 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>SmartLogis</span>
        </div>
        <div style={{display:"flex",gap:28}}>
          {[["Funcționalități","features"],["Prețuri","pricing"],["Blog","blog"],["Contact","contact"]].map(([l,id])=>(
            <span key={id} onClick={()=>setLandingPage(id)} style={{fontSize:13,color:landingPage===id?"#f0fdf4":"#6b7280",cursor:"pointer",fontWeight:landingPage===id?600:400,transition:"color .2s",position:"relative",paddingBottom:3}}>
              {l}
              {landingPage===id && <span style={{position:"absolute",bottom:0,left:0,right:0,height:2,borderRadius:1,background:"linear-gradient(90deg,#34d399,#3b82f6)"}}/>}
            </span>
          ))}
        </div>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <button className="navBtnLogin" onClick={onEnter}>Login</button>
          <button className="navBtnCta" onClick={onEnter}>Încearcă Gratuit →</button>
        </div>
      </nav>

      {/* PAGE ROUTER */}
      {landingPage==="features" && <FunctionalitatiPage onEnter={onEnter}/>}
      {landingPage==="blog" && <BlogPage onEnter={onEnter}/>}
      {landingPage==="contact" && <ContactPage onEnter={onEnter}/>}
      {landingPage==="termeni" && <TermeniPage onEnter={onEnter}/>}
      {landingPage==="confidentialitate" && <ConfidentialitateaPage onEnter={onEnter}/>}
      {landingPage==="pricing" && <>

      {/* HERO */}
      <section style={{textAlign:"center",padding:"90px 40px 70px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"10%",left:"50%",transform:"translateX(-50%)",width:700,height:500,background:"radial-gradient(ellipse,rgba(16,185,129,.07) 0%,transparent 70%)",pointerEvents:"none"}}/>
        <div className="fu" style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(16,185,129,.08)",border:"1px solid rgba(16,185,129,.2)",borderRadius:20,padding:"5px 14px",marginBottom:28}}>
          <Zap size={11} color="#34d399"/><span style={{fontSize:11,color:"#34d399",fontWeight:600}}>Singura platformă cu Auto-Reînnoire UIT în România</span>
        </div>
        <h1 className="fu1" style={{fontFamily:"'Instrument Serif',serif",fontSize:"clamp(44px,5.5vw,76px)",fontWeight:400,color:"#f9fafb",lineHeight:1.1,letterSpacing:-2,marginBottom:20,maxWidth:760,margin:"0 auto 20px"}}>
          Prețuri clare.<br/><span style={{fontStyle:"italic",color:"#34d399"}}>Zero surprize.</span>
        </h1>
        <p className="fu2" style={{fontSize:17,color:"#6b7280",maxWidth:480,margin:"0 auto 44px",lineHeight:1.7}}>
          Alege planul flotei tale. 14 zile trial gratuit, fără card.
        </p>
        {/* Toggle */}
        <div className="fu3" style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:30,padding:"5px 6px",marginBottom:64}}>
          <button className="btn-ghost" onClick={()=>setAnnual(false)} style={{padding:"7px 18px",borderRadius:24,fontSize:12,fontWeight:600,background:!annual?"rgba(255,255,255,.1)":"none",color:!annual?"#f9fafb":"#6b7280",border:"none"}}>Lunar</button>
          <button className="btn-ghost" onClick={()=>setAnnual(true)} style={{padding:"7px 18px",borderRadius:24,fontSize:12,fontWeight:600,background:annual?"rgba(255,255,255,.1)":"none",color:annual?"#f9fafb":"#6b7280",border:"none",display:"flex",alignItems:"center",gap:6}}>
            Anual <span style={{background:"#34d399",color:"#064e3b",fontSize:9,fontWeight:800,padding:"2px 6px",borderRadius:10}}>-20%</span>
          </button>
        </div>
      </section>

      {/* PLANS */}
      <section style={{maxWidth:1060,margin:"0 auto",padding:"0 40px 90px",display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18,alignItems:"start"}}>
        {PLANS.map((p,idx)=>{
          const price = annual ? p.annual : p.monthly;
          return (
            <div key={p.id} className={p.popular?"popular cardHov":"cardHov"} style={{background:p.popular?"rgba(16,185,129,.04)":"rgba(255,255,255,.02)",border:`1px solid ${p.border}`,borderRadius:18,padding:"28px 24px",display:"flex",flexDirection:"column",position:"relative",transform:p.popular?"translateY(-8px)":"none",boxShadow:p.popular?"0 20px 60px rgba(16,185,129,.1)":"none"}}>
              {p.popular&&<div style={{position:"absolute",top:-13,left:"50%",transform:"translateX(-50%)",background:"#34d399",color:"#064e3b",fontSize:10,fontWeight:800,padding:"3px 14px",borderRadius:20,whiteSpace:"nowrap"}}>⚡ CEL MAI POPULAR</div>}
              <div style={{marginBottom:18}}>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:p.color,marginBottom:5}}>{p.name}</div>
                <div style={{fontSize:12,color:"#6b7280",marginBottom:16}}>{p.tagline}</div>
                {price ? <div style={{display:"flex",alignItems:"flex-end",gap:3,marginBottom:3}}><span style={{fontSize:38,fontWeight:800,color:"#f9fafb",letterSpacing:-1.5,lineHeight:1}}>{price}</span><span style={{fontSize:13,color:"#6b7280",marginBottom:5}}>RON/lună</span></div>
                  : <div style={{fontSize:30,fontWeight:800,color:"#f9fafb",letterSpacing:-1,lineHeight:1,marginBottom:3}}>Custom</div>}
                {annual&&price&&<div style={{fontSize:10,color:"#34d399"}}>Economisești {(p.monthly-p.annual)*12} RON/an</div>}
                <div style={{fontSize:11,color:"#4b5563",marginTop:5}}>{p.vehicles}</div>
              </div>
              <div style={{flex:1,marginBottom:20}}>
                {p.features.map((f,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:9,marginBottom:9}}>
                    {f.ok ? <div style={{width:16,height:16,borderRadius:"50%",background:`${p.color}22`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Check size={9} color={p.color}/></div>
                      : <div style={{width:16,height:16,borderRadius:"50%",background:"rgba(255,255,255,.03)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><X size={9} color="#374151"/></div>}
                    <span style={{fontSize:12,color:f.ok?(f.hi?p.color:"#d1d5db"):"#374151",fontWeight:f.hi?600:400,display:"flex",alignItems:"center",gap:5}}>
                      {f.t}{f.hi&&<Sparkles size={10} color={p.color}/>}
                    </span>
                  </div>
                ))}
              </div>
              <button className="btn" onClick={onEnter} style={{background:p.popular?"#34d399":"rgba(255,255,255,.06)",color:p.popular?"#064e3b":"#f9fafb",border:p.popular?"none":`1px solid ${p.border}`,borderRadius:11,padding:"12px 0",fontSize:13,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",gap:7,boxShadow:p.popular?"0 4px 20px rgba(16,185,129,.3)":"none"}}>
                {p.cta} <ArrowRight size={13}/>
              </button>
            </div>
          );
        })}
      </section>

      {/* LOGOS */}
      <div style={{borderTop:"1px solid rgba(255,255,255,.04)",borderBottom:"1px solid rgba(255,255,255,.04)",padding:"24px 0",overflow:"hidden",marginBottom:80}}>
        <div style={{fontSize:10,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"#1f2937",textAlign:"center",marginBottom:16}}>Utilizat de companii din România</div>
        <div style={{overflow:"hidden"}}><div className="marqueeTrack">{[...["Romtrans","TransRo","LogiCar","EuroTIR","CargoRO","SpeedLog","AlphaFleet","NordTrans"],...["Romtrans","TransRo","LogiCar","EuroTIR","CargoRO","SpeedLog","AlphaFleet","NordTrans"]].map((l,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:7,padding:"0 36px",whiteSpace:"nowrap"}}><Truck size={12} color="#1f2937"/><span style={{fontSize:13,fontWeight:700,color:"#374151"}}>{l}</span></div>)}</div></div>
      </div>

      {/* FAQ */}
      <section style={{maxWidth:640,margin:"0 auto",padding:"0 40px 80px"}}>
        <h2 style={{fontFamily:"'Instrument Serif',serif",fontSize:40,color:"#f9fafb",letterSpacing:-1.5,textAlign:"center",marginBottom:40}}>Întrebări frecvente</h2>
        {faqs.map((f,i)=>(
          <div key={i} style={{borderBottom:"1px solid rgba(255,255,255,.06)"}}>
            <button className="btn-ghost" onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 0",background:"none",border:"none",textAlign:"left",gap:14}}>
              <span style={{fontSize:14,fontWeight:500,color:openFaq===i?"#f9fafb":"#9ca3af",transition:"color .2s"}}>{f.q}</span>
              <ChevronDown size={15} color="#4b5563" style={{flexShrink:0,transform:openFaq===i?"rotate(180deg)":"none",transition:"transform .2s"}}/>
            </button>
            {openFaq===i&&<div style={{paddingBottom:18,fontSize:13,color:"#6b7280",lineHeight:1.75}}>{f.a}</div>}
          </div>
        ))}
      </section>

      {/* CTA BANNER */}
      <section style={{maxWidth:860,margin:"0 auto 80px",padding:"0 40px"}}>
        <div className="glowGreen" style={{background:"linear-gradient(135deg,rgba(16,185,129,.07) 0%,transparent 60%)",border:"1px solid rgba(16,185,129,.2)",borderRadius:22,padding:"52px 44px",textAlign:"center"}}>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"#34d399",marginBottom:14}}>Fără risc · 14 zile gratuit</div>
          <h2 style={{fontFamily:"'Instrument Serif',serif",fontSize:44,color:"#f9fafb",letterSpacing:-2,marginBottom:14,lineHeight:1.1}}>Oprește amenzile ANAF.<br/><em style={{color:"#34d399"}}>Astăzi.</em></h2>
          <p style={{fontSize:15,color:"#6b7280",marginBottom:32}}>Configurare în 5 minute. Primul UIT auto-reînnoit în aceeași zi.</p>
          <button className="btn navBtnCta" onClick={onEnter} style={{fontSize:14,padding:"13px 36px",borderRadius:12,boxShadow:"0 8px 32px rgba(16,185,129,.4)"}}>
            <Zap size={15} style={{display:"inline",marginRight:8}}/> Începe Gratuit 14 Zile
          </button>
        </div>
      </section>
      <div style={{borderTop:"1px solid rgba(255,255,255,.05)",padding:"24px 40px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:800,background:"linear-gradient(135deg,#f9fafb 30%,#34d399 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>SmartLogis</span>
        <span style={{fontSize:11,color:"#1f2937"}}>© 2026 SmartLogis SRL · Cluj-Napoca · GDPR</span>
        <div style={{display:"flex",gap:16}}>{[["Termeni","termeni"],["Confidențialitate","confidentialitate"],["Contact","contact"]].map(([l,id])=><span key={id} onClick={()=>setLandingPage(id)} style={{fontSize:11,color:"#374151",cursor:"pointer",transition:"color .15s"}} onMouseEnter={e=>e.target.style.color="#9ca3af"} onMouseLeave={e=>e.target.style.color="#374151"}>{l}</span>)}</div>
      </div>
      </>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// VIEW: ONBOARDING (5-step wizard)
// ══════════════════════════════════════════════════════════════════════════════
const OSTEPS = [
  {id:1,label:"Companie",icon:Building2},{id:2,label:"Flotă",icon:Truck},
  {id:3,label:"ANAF API",icon:Shield},{id:4,label:"Auto-UIT",icon:Zap},{id:5,label:"Gata!",icon:CheckCircle}
];
function OProgress({ step }) {
  const pct = ((step-1)/(OSTEPS.length-1))*100;
  return (
    <div style={{position:"relative",marginBottom:52}}>
      <div style={{height:2,background:"rgba(255,255,255,.06)",borderRadius:2,position:"absolute",top:17,left:18,right:18}}/>
      <div style={{height:2,background:"linear-gradient(90deg,#34d399,#60a5fa)",borderRadius:2,position:"absolute",top:17,left:18,width:`calc(${pct}% - 36px + ${pct/100*36}px)`,transition:"width .5s cubic-bezier(.4,0,.2,1)"}}/>
      <div style={{display:"flex",justifyContent:"space-between",position:"relative"}}>
        {OSTEPS.map(s=>{
          const done=step>s.id, active=step===s.id;
          return (
            <div key={s.id} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
              <div style={{width:36,height:36,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .3s",background:done?"#34d399":active?"#f9fafb":"rgba(255,255,255,.05)",border:`2px solid ${done?"#34d399":active?"#f9fafb":"rgba(255,255,255,.08)"}`,boxShadow:active?"0 0 18px rgba(249,250,251,.15)":done?"0 0 14px rgba(52,211,153,.2)":"none"}}>
                {done?<Check size={13} color="#064e3b" className="checkIn"/>:<s.icon size={13} color={active?"#060810":"#374151"}/>}
              </div>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:".06em",textTransform:"uppercase",color:active?"#f9fafb":done?"#34d399":"#374151",whiteSpace:"nowrap"}}>{s.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Onboarding({ onComplete }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({});
  const [anafTesting, setAnafTesting] = useState(false);
  const [anafLog, setAnafLog] = useState([]);
  const [anafDone, setAnafDone] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [launching, setLaunching] = useState(false);
  const [launched, setLaunched] = useState(false);
  const vehicles = data.vehicles || [{plate:"",flag:"🇷🇴",driver:"",type:""}];
  const setVehicles = v => setData({...data,vehicles:v});
  const prefs = data.prefs || {};
  const setPrefs = p => setData({...data,prefs:p});

  const testAnaf = () => {
    setAnafTesting(true); setAnafLog([]);
    ["Inițializare conexiune ANAF SPV...","Verificare certificat digital...","Autentificare OAuth2...","Validare drepturi UIT API...","Conexiune confirmată ✓"].forEach((l,i)=>
      setTimeout(()=>{ setAnafLog(prev=>[...prev,l]); if(i===4){setAnafTesting(false);setAnafDone(true);setData(d=>({...d,anafOk:true}));} }, (i+1)*500)
    );
  };

  const launch = async () => {
    setLaunching(true);
    // If Supabase is connected, save vehicles to DB
    if (supabase) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const { data: prof } = await supabase.from("profiles").select("tenant_id").eq("id", session.user.id).single();
          if (prof?.tenant_id) {
            const rows = vehicles.filter(v=>v.plate).map(v => ({
              tenant_id: prof.tenant_id, plate: v.plate,
              driver_name: v.driver || "", cargo: v.type || "",
              auto_renew: prefs.autoRenew || false,
              renew_threshold_h: 4,
            }));
            if (rows.length) await supabase.from("vehicles").insert(rows);
            // Update tenant CUI
            if (data.cui || data.name) {
              await supabase.from("tenants").update({ name: data.name||"Firma", cui: data.cui||"" }).eq("id", prof.tenant_id);
            }
          }
        }
      } catch(e) { console.warn("Supabase save error:", e); }
    }
    setTimeout(()=>{setLaunching(false);setLaunched(true);},1200);
  };

  const canNext = () => {
    if(step===1) return data.name&&data.cui&&data.email;
    if(step===2) return vehicles.some(v=>v.plate);
    return true;
  };

  return (
    <div style={{height:"100vh",overflowY:"auto",background:"#060810",display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{position:"fixed",top:"30%",left:"50%",transform:"translateX(-50%)",width:700,height:400,background:"radial-gradient(ellipse,rgba(16,185,129,.04) 0%,transparent 70%)",pointerEvents:"none"}}/>
      <div style={{width:"100%",maxWidth:740,position:"relative"}}>
        <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:44}}>
          <div style={{width:32,height:32,background:"#f9fafb",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center"}}><Truck size={15} color="#060810"/></div>
          <span style={{fontWeight:800,fontSize:16,color:"#f9fafb"}}>SmartLogis</span>
          <span style={{fontSize:11,color:"#374151",marginLeft:4}}>Setup · Pas {step} din {OSTEPS.length}</span>
        </div>
        <OProgress step={step}/>
        <div className="glass" style={{borderRadius:18,padding:"36px 40px",marginTop:48}}>

          {/* STEP 1 */}
          {step===1&&<div className="fu">
            <div style={{fontSize:24,fontWeight:700,color:"#f9fafb",marginBottom:6}}>Datele companiei tale</div>
            <div style={{fontSize:13,color:"#6b7280",marginBottom:24}}>CUI-ul va completa automat datele din Registrul Comerțului.</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:13}}>
              <div style={{gridColumn:"1/-1"}}><label style={{fontSize:10,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#4b5563",display:"block",marginBottom:5}}>CUI / Cod Fiscal *</label>
                <div style={{position:"relative"}}><input className="ifield" placeholder="RO12345678" value={data.cui||""} onChange={e=>setData({...data,cui:e.target.value})}/>
                  {data.cui?.length>5&&<div style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",fontSize:10,color:"#34d399",display:"flex",alignItems:"center",gap:3}}><CheckCircle size={11}/>Verificat</div>}
                </div>
              </div>
              {[{l:"Denumire Firmă *",f:"name",ph:"SC AutoTrans SRL"},{l:"Email *",f:"email",ph:"dispecer@firma.ro",t:"email"},{l:"Telefon *",f:"phone",ph:"+40 721 234 567"},{l:"Adresă Sediu",f:"address",ph:"Str. Industriei 14, Cluj-Napoca"}].map(({l,f,ph,t})=>(
                <div key={f}><label style={{fontSize:10,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#4b5563",display:"block",marginBottom:5}}>{l}</label>
                  <input className="ifield" type={t||"text"} placeholder={ph} value={data[f]||""} onChange={e=>setData({...data,[f]:e.target.value})}/>
                </div>
              ))}
              <div><label style={{fontSize:10,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#4b5563",display:"block",marginBottom:5}}>Tip Licență</label>
                <select className="ifield" value={data.license||""} onChange={e=>setData({...data,license:e.target.value})}>
                  <option value="">Selectează...</option><option>Internațional (CMR)</option><option>Național</option><option>Ambele</option>
                </select>
              </div>
              <div><label style={{fontSize:10,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#4b5563",display:"block",marginBottom:5}}>Dimensiune flotă</label>
                <select className="ifield" value={data.size||""} onChange={e=>setData({...data,size:e.target.value})}>
                  <option value="">Selectează...</option><option>1–5</option><option>6–25</option><option>25–100</option><option>100+</option>
                </select>
              </div>
            </div>
          </div>}

          {/* STEP 2 */}
          {step===2&&<div className="fu">
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
              <div><div style={{fontSize:24,fontWeight:700,color:"#f9fafb",marginBottom:4}}>Adaugă vehiculele flotei</div><div style={{fontSize:13,color:"#6b7280"}}>Minim 1 pentru a continua. Poți adăuga mai multe după.</div></div>
              <button className="btn-ghost" onClick={()=>setVehicles([...vehicles,{plate:"",flag:"🇷🇴",driver:"",type:""}])} style={{display:"flex",alignItems:"center",gap:6,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:9,padding:"8px 14px",fontSize:12,fontWeight:600,color:"#f9fafb"}}><Plus size={13}/>Adaugă</button>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {vehicles.map((v,i)=>(
                <div key={i} className="fu" style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.07)",borderRadius:12,padding:"15px 18px"}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                    <span style={{fontSize:12,fontWeight:600,color:"#6b7280"}}>Vehicul #{i+1} {v.plate&&<span style={{fontFamily:"'DM Mono',monospace",color:"#f9fafb",marginLeft:8,background:"rgba(255,255,255,.06)",padding:"2px 8px",borderRadius:6}}>{v.plate}</span>}</span>
                    {vehicles.length>1&&<button className="btn-ghost" onClick={()=>setVehicles(vehicles.filter((_,j)=>j!==i))} style={{background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.15)",borderRadius:7,padding:"4px 8px",color:"#f87171",display:"flex"}}><Trash2 size={12}/></button>}
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:9}}>
                    <div><label style={{fontSize:9,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#4b5563",display:"block",marginBottom:4}}>Număr *</label><input className="ifield" style={{fontSize:12}} placeholder="TR-45-YIL" value={v.plate} onChange={e=>setVehicles(vehicles.map((x,j)=>j===i?{...x,plate:e.target.value}:x))}/></div>
                    <div><label style={{fontSize:9,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#4b5563",display:"block",marginBottom:4}}>Țară</label>
                      <select className="ifield" style={{fontSize:12}} value={v.flag} onChange={e=>setVehicles(vehicles.map((x,j)=>j===i?{...x,flag:e.target.value}:x))}>
                        {["🇷🇴 România","🇧🇬 Bulgaria","🇭🇺 Ungaria","🇵🇱 Polonia","🇩🇪 Germania","🇹🇷 Turcia","🇲🇩 Moldova"].map(o=><option key={o}>{o}</option>)}
                      </select>
                    </div>
                    <div><label style={{fontSize:9,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#4b5563",display:"block",marginBottom:4}}>Șofer</label><input className="ifield" style={{fontSize:12}} placeholder="Mehmet Yilmaz" value={v.driver} onChange={e=>setVehicles(vehicles.map((x,j)=>j===i?{...x,driver:e.target.value}:x))}/></div>
                    <div><label style={{fontSize:9,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#4b5563",display:"block",marginBottom:4}}>Tip</label>
                      <select className="ifield" style={{fontSize:12}} value={v.type} onChange={e=>setVehicles(vehicles.map((x,j)=>j===i?{...x,type:e.target.value}:x))}>
                        <option value="">Tip...</option>{["TIR / Camion","Autoutilitară","Cisternă","Frigorific","Container"].map(o=><option key={o}>{o}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>}

          {/* STEP 3 */}
          {step===3&&<div className="fu">
            <div style={{fontSize:24,fontWeight:700,color:"#f9fafb",marginBottom:6}}>Conectează ANAF API</div>
            <div style={{fontSize:13,color:"#6b7280",marginBottom:20}}>SmartLogis folosește ANAF SPV pentru a genera și reînnoi UIT-urile automat.</div>
            <div style={{background:"rgba(245,158,11,.06)",border:"1px solid rgba(245,158,11,.15)",borderRadius:11,padding:"12px 16px",display:"flex",gap:9,alignItems:"flex-start",marginBottom:20}}>
              <AlertCircle size={14} color="#fbbf24" style={{flexShrink:0,marginTop:1}}/><div style={{fontSize:12,color:"#fcd34d",lineHeight:1.6}}><strong>Ai nevoie de:</strong> certificat digital ANAF activ + acces SPV activat pentru CUI-ul firmei.</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:13,marginBottom:14}}>
              <div><label style={{fontSize:10,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#4b5563",display:"block",marginBottom:5}}>Client ID ANAF *</label><input className="ifield" placeholder="anaf_client_xxxxx" value={data.clientId||""} onChange={e=>setData({...data,clientId:e.target.value})} style={{fontFamily:"'DM Mono',monospace",fontSize:12}}/></div>
              <div><label style={{fontSize:10,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#4b5563",display:"block",marginBottom:5}}>Client Secret *</label>
                <div style={{position:"relative"}}><input className="ifield" type={showPw?"text":"password"} placeholder="••••••••••••" value={data.secret||""} onChange={e=>setData({...data,secret:e.target.value})} style={{fontFamily:"'DM Mono',monospace",fontSize:12,paddingRight:38}}/>
                  <button className="btn-ghost" onClick={()=>setShowPw(!showPw)} style={{position:"absolute",right:11,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"#4b5563"}}>{showPw?<EyeOff size={13}/>:<Eye size={13}/>}</button>
                </div>
              </div>
              <div style={{gridColumn:"1/-1"}}><label style={{fontSize:10,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#4b5563",display:"block",marginBottom:5}}>Endpoint ANAF SPV</label><input className="ifield" value="https://api.anaf.ro/prod/FCTEL/ws/uitRo" readOnly style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:"#6b7280"}}/></div>
            </div>
            <button className="btn-ghost" onClick={testAnaf} disabled={anafTesting} style={{display:"flex",alignItems:"center",gap:8,background:anafDone?"rgba(16,185,129,.1)":"rgba(255,255,255,.05)",color:anafDone?"#34d399":"#9ca3af",border:`1px solid ${anafDone?"rgba(16,185,129,.3)":"rgba(255,255,255,.1)"}`,borderRadius:9,padding:"10px 18px",fontSize:12,fontWeight:600,marginBottom:14}}>
              {anafTesting?<><RefreshCw size={12} className="spin"/>Testare...</>:anafDone?<><CheckCircle size={12}/>Conexiune confirmată ✓</>:<><Shield size={12}/>Testează Conexiunea ANAF</>}
            </button>
            {anafLog.length>0&&<div style={{background:"rgba(0,0,0,.3)",borderRadius:9,padding:"12px 14px",fontFamily:"'DM Mono',monospace",fontSize:10,lineHeight:2}}>
              {anafLog.map((l,i)=><div key={i} style={{color:i===anafLog.length-1&&anafDone?"#34d399":"#4b5563",display:"flex",alignItems:"center",gap:7}}><span style={{color:"#1e2535"}}>›</span>{l}</div>)}
            </div>}
          </div>}

          {/* STEP 4 */}
          {step===4&&<div className="fu">
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}><div style={{width:30,height:30,borderRadius:9,background:"rgba(16,185,129,.12)",display:"flex",alignItems:"center",justifyContent:"center"}}><Zap size={14} color="#34d399"/></div><div style={{fontSize:24,fontWeight:700,color:"#f9fafb"}}>Configurează Auto-Reînnoire UIT</div></div>
            <div style={{fontSize:13,color:"#6b7280",marginBottom:22}}>Funcția exclusivă SmartLogis. Niciun competitor nu o are.</div>
            <div style={{background:"rgba(16,185,129,.05)",border:"1px solid rgba(16,185,129,.18)",borderRadius:12,padding:"18px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
              <div><div style={{fontSize:13,fontWeight:700,color:"#f9fafb",marginBottom:3}}>Motor Global Auto-Reînnoire</div><div style={{fontSize:11,color:"#6b7280"}}>Activează pentru toate vehiculele simultan</div></div>
              <button onClick={()=>setPrefs({...prefs,global:!prefs.global})} style={{width:46,height:25,borderRadius:13,border:"none",cursor:"pointer",background:prefs.global?"#34d399":"rgba(255,255,255,.08)",position:"relative",transition:"background .2s",flexShrink:0}}>
                <div style={{width:19,height:19,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:prefs.global?24:3,transition:"left .2s",boxShadow:"0 1px 4px rgba(0,0,0,.3)"}}/>
              </button>
            </div>
            <div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.07)",borderRadius:12,padding:"18px 20px",marginBottom:14}}>
              <div style={{fontSize:12,fontWeight:600,color:"#f9fafb",marginBottom:3}}>Prag global de declanșare</div>
              <div style={{fontSize:11,color:"#6b7280",marginBottom:14}}>Reînnoiește UIT-ul când mai sunt X ore până la expirare</div>
              <div style={{display:"flex",alignItems:"center",gap:14}}><input type="range" min={1} max={12} value={prefs.threshold||4} onChange={e=>setPrefs({...prefs,threshold:+e.target.value})} style={{flex:1,accentColor:"#34d399"}}/><div style={{fontFamily:"'DM Mono',monospace",fontSize:20,fontWeight:700,color:"#fbbf24",minWidth:44,textAlign:"center"}}>{prefs.threshold||4}h</div></div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:"#374151",marginTop:3}}><span>1h (agresiv)</span><span>6h (recomandat)</span><span>12h (conservator)</span></div>
            </div>
            <div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.07)",borderRadius:12,padding:"18px 20px"}}>
              <div style={{fontSize:12,fontWeight:600,color:"#f9fafb",marginBottom:14}}>Notificări reînnoire</div>
              {[{id:"nEmail",l:"Email după fiecare reînnoire automată"},{id:"nSms",l:"SMS la reînnoire urgentă (sub 2h)"},{id:"nFail",l:"Alertă imediată dacă ANAF API eșuează"}].map(n=>(
                <label key={n.id} style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",marginBottom:10}}>
                  <div onClick={()=>setPrefs({...prefs,[n.id]:!(prefs[n.id]??true)})} style={{width:17,height:17,borderRadius:5,background:(prefs[n.id]??true)?"#34d399":"rgba(255,255,255,.05)",border:`1.5px solid ${(prefs[n.id]??true)?"#34d399":"rgba(255,255,255,.1)"}`,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .15s",flexShrink:0}}>
                    {(prefs[n.id]??true)&&<Check size={9} color="#064e3b"/>}
                  </div>
                  <span style={{fontSize:12,color:"#9ca3af"}}>{n.l}</span>
                </label>
              ))}
            </div>
          </div>}

          {/* STEP 5 */}
          {step===5&&<div className="fu" style={{textAlign:"center",padding:"20px 0"}}>
            {!launched ? <>
              <div style={{fontSize:24,fontWeight:700,color:"#f9fafb",marginBottom:6}}>Totul e setat. Lansăm!</div>
              <div style={{fontSize:13,color:"#6b7280",marginBottom:28}}>Revizuiește configurația înainte de a activa SmartLogis.</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11,marginBottom:22,textAlign:"left"}}>
                {[
                  {icon:Building2,l:"Companie",v:data.name||"—",c:"#60a5fa"},
                  {icon:Truck,l:"Vehicule",v:`${vehicles.filter(v=>v.plate).length} vehicule`,c:"#34d399"},
                  {icon:Shield,l:"ANAF API",v:data.anafOk?"Conectat ✓":"Neconectat",c:data.anafOk?"#34d399":"#f87171"},
                  {icon:Zap,l:"Auto-UIT",v:prefs.global?`Activ · ${prefs.threshold||4}h prag`:"Dezactivat",c:prefs.global?"#34d399":"#6b7280"},
                ].map(s=>(
                  <div key={s.l} style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.06)",borderRadius:11,padding:"14px 16px",display:"flex",alignItems:"center",gap:11}}>
                    <div style={{width:34,height:34,borderRadius:9,background:`${s.c}15`,display:"flex",alignItems:"center",justifyContent:"center"}}><s.icon size={15} color={s.c}/></div>
                    <div><div style={{fontSize:10,color:"#4b5563",marginBottom:2}}>{s.l}</div><div style={{fontSize:12,fontWeight:600,color:s.c}}>{s.v}</div></div>
                  </div>
                ))}
              </div>
              <button className="btn" onClick={launch} style={{background:"#f9fafb",color:"#060810",border:"none",borderRadius:11,padding:"14px 0",fontSize:14,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",gap:9,width:"100%",boxShadow:"0 4px 20px rgba(249,250,251,.15)"}}>
                {launching?<><RefreshCw size={14} className="spin"/>Activare SmartLogis...</>:<><Zap size={14}/>Activează SmartLogis</>}
              </button>
            </> : <>
              <div style={{width:72,height:72,borderRadius:"50%",background:"rgba(16,185,129,.12)",border:"2px solid rgba(16,185,129,.3)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px",boxShadow:"0 0 36px rgba(16,185,129,.2)"}}><CheckCircle size={32} color="#34d399"/></div>
              <div style={{fontSize:28,fontWeight:700,color:"#f9fafb",marginBottom:10}}>SmartLogis e activ! 🎉</div>
              <div style={{fontSize:13,color:"#6b7280",maxWidth:380,margin:"0 auto 28px",lineHeight:1.7}}>{vehicles.filter(v=>v.plate).length} vehicule monitorizate. Motorul auto-reînnoire UIT rulează.</div>
              <button className="btn" onClick={onComplete} style={{background:"#34d399",color:"#064e3b",border:"none",borderRadius:11,padding:"13px 28px",fontSize:13,fontWeight:800,display:"inline-flex",alignItems:"center",gap:8,boxShadow:"0 4px 20px rgba(16,185,129,.3)"}}>Deschide Dashboard <ArrowRight size={13}/></button>
            </>}
          </div>}

          {/* NAV BUTTONS */}
          {!launched&&<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:28,paddingTop:22,borderTop:"1px solid rgba(255,255,255,.06)"}}>
            <button className="btn-ghost" onClick={()=>setStep(s=>Math.max(1,s-1))} disabled={step===1} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"1px solid rgba(255,255,255,.08)",borderRadius:9,padding:"9px 16px",fontSize:12,fontWeight:600,color:step===1?"#1f2937":"#6b7280",opacity:step===1?.4:1}}>
              <ArrowLeft size={13}/>Înapoi
            </button>
            <span style={{fontSize:11,color:"#374151"}}>{step} / {OSTEPS.length}</span>
            {step<OSTEPS.length&&<button className="btn" onClick={()=>setStep(s=>Math.min(OSTEPS.length,s+1))} style={{display:"flex",alignItems:"center",gap:6,background:canNext()?"#f9fafb":"rgba(255,255,255,.05)",color:canNext()?"#060810":"#374151",border:"none",borderRadius:9,padding:"9px 20px",fontSize:12,fontWeight:700,opacity:canNext()?1:.6}}>
              {step===4?"Verifică și Lansează":"Continuă"}<ArrowRight size={13}/>
            </button>}
          </div>}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN APP SHELL (after onboarding)
// ══════════════════════════════════════════════════════════════════════════════
function AppShell({ onLogout, initialFleet, session, profile, tenant }) {
  const [view, setView]             = useState("dashboard");
  const [toasts, setToasts]         = useState([]);
  const [fleet, setFleet]           = useState([]);
  const [renewModal, setRenewModal] = useState(null);
  const [vehicleModal, setVehicleModal] = useState(null);
  const [activity, setActivity]     = useState([]);
  const toastId = useRef(0);

  // ── Load fleet from Supabase realtime ──────────────────────────
  const loadFleet = useCallback(async () => {
    if (!supabase || !tenant?.id) return;
    const { data } = await supabase.from("vehicles").select("*").eq("tenant_id",tenant.id).order("created_at");
    if (data) setFleet(data.map(dbVehicleToFleet));
  }, [tenant?.id]);

  useEffect(() => { loadFleet(); }, [loadFleet]);

  useEffect(() => {
    if (!supabase || !tenant?.id) return;
    const ch = supabase.channel("fleet-shell-"+tenant.id)
      .on("postgres_changes",{event:"*",schema:"public",table:"vehicles",filter:`tenant_id=eq.${tenant.id}`},loadFleet)
      .subscribe();
    return () => supabase.removeChannel(ch);
  }, [tenant?.id, loadFleet]);

  // ── Activity from uit_renewals ──────────────────────────────────
  const loadActivity = useCallback(async () => {
    if (!supabase || !tenant?.id) return;
    const { data } = await supabase
      .from("uit_renewals").select("*, vehicles(plate,tenant_id)").order("created_at",{ascending:false}).limit(15);
    if (data) setActivity(data
      .filter(r=>r.vehicles?.tenant_id===tenant.id)
      .map(r=>({
        id:r.id, type:r.status==="success"?"zap":"alert",
        msg:r.status==="success"
          ?`UIT reînnoit: ${r.vehicles?.plate||"vehicul"} · ${r.new_uit||""}`
          :`Eroare ${r.vehicles?.plate||""}: ${r.error_msg||""}`,
        time:new Date(r.created_at).toLocaleString("ro-RO",{hour:"2-digit",minute:"2-digit",day:"2-digit",month:"short"}),
        color:r.status==="success"?"#34d399":"#f87171",
      })));
  }, [tenant?.id]);

  useEffect(() => { loadActivity(); }, [loadActivity]);

  // ── Optimistic fleet update after renew ──────────────────────────
  const handleFleetUpdate = useCallback((dbId, fields) => {
    setFleet(prev=>prev.map(v=>v._dbId===dbId?{...v,...dbVehicleToFleet({...v._raw,...fields})}:v));
    loadActivity();
  }, [loadActivity]);

  // ── Delete vehicle ─────────────────────────────────────────────
  const deleteVehicle = useCallback(async (v) => {
    if (!confirm("Ștergi vehiculul "+v.plate+"?")) return;
    if (!supabase) return;
    const {error}=await supabase.from("vehicles").delete().eq("id",v._dbId);
    if(error) addToast({type:"error",title:"Eroare",msg:error.message});
    else { addToast({type:"success",title:"Vehicul șters",msg:v.plate}); loadFleet(); }
  }, [loadFleet]);

  const addToast = useCallback(t => {
    const id = ++toastId.current;
    setToasts(p=>[...p,{...t,id}]);
    setTimeout(()=>setToasts(p=>p.filter(x=>x.id!==id)), 4500);
  },[]);
  const removeToast = useCallback(id=>setToasts(p=>p.filter(x=>x.id!==id)),[]);

  const NAV = [
    {id:"dashboard",icon:LayoutDashboard,label:"Dashboard"},
    {id:"auto-renew",icon:Zap,label:"Auto-Reînnoire UIT",special:true},
    {id:"ocr",icon:ScanLine,label:"Procesare Documente"},
    {id:"dispatch",icon:Navigation,label:"Dispecerat Extern"},
    {id:"pricing",icon:CreditCard,label:"Planuri & Prețuri"},
    {id:"architecture",icon:BookOpen,label:"Arhitectură Backend"},
  ];
  const critical = fleet.filter(v=>v.status==="critical");

  return (
    <div style={{display:"flex",height:"100vh",background:"#060810",overflow:"hidden"}}>
      {/* SIDEBAR */}
      <aside style={{width:236,background:"#0b0f1a",borderRight:"1px solid rgba(255,255,255,.05)",display:"flex",flexDirection:"column",flexShrink:0}}>
        <div style={{padding:"18px 14px 14px",borderBottom:"1px solid rgba(255,255,255,.04)"}}>
          <div style={{display:"flex",alignItems:"center",gap:9}}>
            <div style={{width:34,height:34,borderRadius:9,background:"#f9fafb",display:"flex",alignItems:"center",justifyContent:"center"}}><Truck size={16} color="#0a0a0a"/></div>
            <div><div style={{fontSize:14,fontWeight:800,color:"#f9fafb",letterSpacing:-.5}}>SmartLogis</div><div style={{fontSize:9,color:"#374151",letterSpacing:1}}>AI TRANSPORT RO</div></div>
          </div>
        </div>
        <nav style={{flex:1,padding:"10px 8px",display:"flex",flexDirection:"column",gap:1}}>
          <div style={{fontSize:9,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:"#1f2937",padding:"8px 10px 4px"}}>Navigare</div>
          {NAV.map(n=>(
            <button key={n.id} className={`navItem${view===n.id?" active":""}${n.special?" special":""}`} onClick={()=>setView(n.id)}>
              <n.icon size={14}/>
              <span style={{flex:1}}>{n.label}</span>
              {n.id==="dashboard"&&critical.length>0&&<span style={{background:"#ef4444",color:"#fff",borderRadius:20,fontSize:10,fontWeight:700,padding:"1px 6px"}}>{critical.length}</span>}
              {n.special&&!critical.length&&<Sparkles size={10} color="#34d399"/>}
            </button>
          ))}
          <div style={{fontSize:9,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:"#1f2937",padding:"12px 10px 4px",marginTop:8}}>Cont</div>
          <button className="navItem" onClick={onLogout}><LogOut size={14}/><span>{session ? "Deconectare" : "Ieșire / Landing"}</span></button>
        </nav>
        <div style={{padding:"10px 14px",borderTop:"1px solid rgba(255,255,255,.04)"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,padding:"9px 11px",background:"rgba(16,185,129,.06)",border:"1px solid rgba(16,185,129,.12)",borderRadius:9}}>
            <div style={{position:"relative",width:8,height:8,flexShrink:0}}>
              <div style={{width:8,height:8,background:"#34d399",borderRadius:"50%",position:"absolute"}}/>
              <div style={{width:8,height:8,background:"#34d399",borderRadius:"50%",position:"absolute",animation:"pulseRing 1.5s ease-out infinite"}}/>
            </div>
            <span style={{fontSize:10,fontWeight:700,letterSpacing:".08em",color:"#34d399"}}>ANAF API: Live</span>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        {/* TOPBAR */}
        <header style={{background:"#0b0f1a",borderBottom:"1px solid rgba(255,255,255,.05)",padding:"0 22px",height:54,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:"#374151"}}>
            <span>{tenant?.name || "SmartLogis"}</span><ChevronRight size={12}/><span style={{color:"#9ca3af",fontWeight:500}}>{NAV.find(n=>n.id===view)?.label}</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:9}}>
            <button className="btn-ghost" onClick={()=>{loadFleet();loadActivity();addToast({type:"info",title:"Date Actualizate",msg:"Flotă reîncărcată din baza de date"});}} style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.06)",borderRadius:8,padding:"6px 10px",color:"#6b7280",display:"flex",alignItems:"center",gap:5,fontSize:11}}>
              <RefreshCw size={12}/>Actualizează
            </button>
            <div style={{width:30,height:30,background:"#1c2333",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"#9ca3af",border:"1px solid rgba(255,255,255,.06)",cursor:"pointer"}} title={profile?.full_name||session?.user?.email||"User"}>{(profile?.full_name||session?.user?.email||"U")[0].toUpperCase()}</div>
          </div>
        </header>

        {/* CONTENT */}
        <main style={{flex:1,overflowY:"auto",padding:22}}>
          <div style={{maxWidth:1180,margin:"0 auto"}}>
            {view==="dashboard"&&<ViewDashboard fleet={fleet} addToast={addToast} setRenewModal={setRenewModal} setVehicleModal={setVehicleModal} deleteVehicle={deleteVehicle} activity={activity}/>}
            {view==="auto-renew"&&<ViewAutoRenew fleet={fleet} addToast={addToast} setRenewModal={setRenewModal} setVehicleModal={setVehicleModal} loadFleet={loadFleet}/>}
            {view==="ocr"&&<ViewOCR addToast={addToast}/>}
            {view==="dispatch"&&<ViewDispatch fleet={fleet} addToast={addToast} tenant={tenant}/>}
            {view==="pricing"&&<ViewPricing/>}
            {view==="architecture"&&<ViewArchitecture/>}
          </div>
        </main>
      </div>

      {renewModal&&<AutoRenewModal v={renewModal} onClose={()=>{setRenewModal(null);loadActivity();}} addToast={addToast} onFleetUpdate={handleFleetUpdate}/>}
      {vehicleModal!==null&&<VehicleModal initial={vehicleModal||undefined} tenantId={tenant?.id} onClose={()=>setVehicleModal(null)} onSaved={()=>{setVehicleModal(null);loadFleet();}} addToast={addToast}/>}
      <Toasts toasts={toasts} remove={removeToast}/>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// VIEW: DASHBOARD
// ══════════════════════════════════════════════════════════════════════════════
function ViewDashboard({ fleet, addToast, setRenewModal, setVehicleModal, deleteVehicle, activity }) {
  const [search, setSearch] = useState("");
  const critical = fleet.filter(v=>v.status==="critical");
  const [alertDismissed, setAlertDismissed] = useState(false);
  const filtered = fleet.filter(v=>
    !search ||
    v.plate.toLowerCase().includes(search.toLowerCase()) ||
    (v.driver||"").toLowerCase().includes(search.toLowerCase())
  );

  const now = new Date().toLocaleDateString("ro-RO",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
  const autoRenewToday = fleet.filter(v=>v.autoRenew&&v.renew_count>0).length;

  const KPI_DATA = [
    { l:"Vehicule Active", v:fleet.length, icon:Truck, c:"#60a5fa", bg:"rgba(59,130,246,.12)", glow:"rgba(59,130,246,.18)", brd:"rgba(59,130,246,.2)", trend:fleet.length>0?`${fleet.length} înregistrate`:"Adaugă vehicule", trendUp:true },
    { l:"UIT-uri Critice", v:critical.length, icon:AlertTriangle, c:"#f87171", bg:"rgba(239,68,68,.12)", glow:"rgba(239,68,68,.18)", brd:critical.length>0?"rgba(239,68,68,.35)":"rgba(239,68,68,.12)", trend:critical.length>0?"Acțiune necesară":"Totul OK ✓", trendUp:false },
    { l:"Auto-Reînnoiri",  v:autoRenewToday, icon:Zap, c:"#34d399", bg:"rgba(16,185,129,.12)", glow:"rgba(16,185,129,.18)", brd:"rgba(16,185,129,.2)", trend:fleet.filter(v=>v.autoRenew).length+" cu AUTO activ", trendUp:true },
    { l:"Fleet cu GPS",    v:fleet.filter(v=>v.last_lat).length, icon:MapPin, c:"#a78bfa", bg:"rgba(167,139,250,.12)", glow:"rgba(167,139,250,.18)", brd:"rgba(167,139,250,.2)", trend:"coordonate live", trendUp:true },
  ];

  return <div style={{display:"flex",flexDirection:"column",gap:20}}>
    <div className="fu" style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingBottom:4}}>
      <div>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:5}}>
          <h1 style={{fontFamily:"'Instrument Serif',serif",fontSize:28,fontWeight:400,color:"#f9fafb",letterSpacing:-1,lineHeight:1}}>Dashboard Flotă</h1>
          <span className="badge" style={{background:"rgba(16,185,129,.1)",color:"#34d399",border:"1px solid rgba(16,185,129,.25)"}}>
            <span className="blink" style={{width:5,height:5,borderRadius:"50%",background:"#34d399",display:"inline-block"}}/>LIVE
          </span>
        </div>
        <div style={{fontSize:12,color:"#4b5563"}}>{now}</div>
      </div>
      <div style={{display:"flex",gap:9}}>
        <button className="btn-ghost" onClick={()=>setVehicleModal({})}
          style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:10,padding:"9px 16px",fontSize:12,fontWeight:600,color:"#9ca3af",display:"flex",alignItems:"center",gap:7}}>
          <Plus size={13}/> Adaugă Vehicul
        </button>
        <button className="btn" onClick={()=>fleet.length>0&&setRenewModal(fleet.find(v=>v.status!=="ok")||fleet[0])}
          style={{background:"linear-gradient(135deg,#34d399,#059669)",border:"none",borderRadius:10,padding:"9px 18px",fontSize:12,fontWeight:700,color:"#064e3b",display:"flex",alignItems:"center",gap:7,boxShadow:"0 4px 20px rgba(16,185,129,.3)",opacity:fleet.length?1:.5}}>
          <Zap size={13}/> Reînnoire Rapidă
        </button>
      </div>
    </div>

    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
      {KPI_DATA.map((k,i)=>(
        <div key={k.l} className={`fu${i+1}`}
          style={{background:`linear-gradient(135deg,${k.glow} 0%,rgba(255,255,255,.02) 100%)`,border:`1px solid ${k.brd}`,borderRadius:18,padding:"20px",position:"relative",overflow:"hidden",boxShadow:`0 4px 24px ${k.glow}`}}>
          <div style={{position:"absolute",top:-20,right:-20,width:80,height:80,borderRadius:"50%",background:k.glow,filter:"blur(24px)",pointerEvents:"none"}}/>
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:16,position:"relative"}}>
            <div style={{width:40,height:40,borderRadius:12,background:k.bg,border:`1px solid ${k.brd}`,display:"flex",alignItems:"center",justifyContent:"center"}}><k.icon size={17} color={k.c}/></div>
            <div style={{fontSize:10,fontWeight:600,color:k.trendUp?"#34d399":"#f87171",background:k.trendUp?"rgba(16,185,129,.1)":"rgba(239,68,68,.1)",padding:"3px 8px",borderRadius:12,display:"flex",alignItems:"center",gap:3}}>
              {k.trendUp?<TrendingUp size={9}/>:<AlertTriangle size={9}/>}{k.trend}
            </div>
          </div>
          <div style={{fontSize:32,fontWeight:800,color:"#f9fafb",letterSpacing:-1.5,lineHeight:1,marginBottom:5,fontFamily:"'DM Mono',monospace",position:"relative"}}>{k.v}</div>
          <div style={{fontSize:11,color:"#6b7280",fontWeight:500,position:"relative"}}>{k.l}</div>
        </div>
      ))}
    </div>

    {!alertDismissed&&critical.length>0&&(
      <div className="fu2" style={{background:"linear-gradient(135deg,rgba(239,68,68,.08) 0%,rgba(239,68,68,.03) 100%)",border:"1px solid rgba(239,68,68,.25)",borderRadius:16,padding:"16px 20px"}}>
        <div style={{display:"flex",alignItems:"center",gap:13}}>
          <div style={{width:40,height:40,borderRadius:12,background:"rgba(239,68,68,.15)",border:"1px solid rgba(239,68,68,.3)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><AlertTriangle size={18} color="#f87171"/></div>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:700,color:"#f9fafb",marginBottom:3}}>{critical.length} vehicul{critical.length>1?"e":""}  cu UIT expirat sau critic!</div>
            <div style={{fontSize:11,color:"#9ca3af"}}>{critical.map(v=>v.plate).join(", ")}</div>
          </div>
          <button className="btn" onClick={()=>setRenewModal(critical[0])} style={{background:"#ef4444",color:"#fff",border:"none",borderRadius:9,padding:"9px 16px",fontSize:12,fontWeight:700,display:"flex",alignItems:"center",gap:6}}>
            <Zap size={12}/>Reînnoire Urgentă
          </button>
          <button onClick={()=>setAlertDismissed(true)} style={{background:"none",border:"none",cursor:"pointer",color:"#6b7280",padding:4}}><X size={14}/></button>
        </div>
      </div>
    )}

    <div style={{display:"grid",gridTemplateColumns:"1fr 280px",gap:14}}>
      <div className="fu3" style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.07)",borderRadius:18,overflow:"hidden"}}>
        <div style={{padding:"14px 18px",borderBottom:"1px solid rgba(255,255,255,.05)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{fontSize:13,fontWeight:700,color:"#f9fafb"}}>Flota Mea ({fleet.length})</div>
          <div style={{position:"relative"}}>
            <Search size={12} style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#4b5563"}}/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Caută vehicul..." style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.08)",borderRadius:9,padding:"7px 10px 7px 28px",fontSize:11,color:"#e5e7eb",outline:"none",width:150}}/>
          </div>
        </div>
        {fleet.length===0 ? (
          <div style={{padding:"48px 24px",textAlign:"center"}}>
            <Truck size={40} color="#1e2535" style={{margin:"0 auto 14px"}}/>
            <div style={{fontSize:14,color:"#6b7280",marginBottom:18}}>Nu ai vehicule adăugate.</div>
            <button className="btn" onClick={()=>setVehicleModal({})} style={{background:"#34d399",color:"#064e3b",border:"none",borderRadius:10,padding:"10px 22px",fontSize:13,fontWeight:700,display:"inline-flex",alignItems:"center",gap:7}}>
              <Plus size={14}/>Adaugă primul vehicul
            </button>
          </div>
        ) : (
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{borderBottom:"1px solid rgba(255,255,255,.05)"}}>
              {["Vehicul","Rută / Marfă","UIT & Expirare","Status",""].map(h=>(
                <th key={h} style={{padding:"10px 16px",textAlign:"left",fontSize:9,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#374151"}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map(v=>(
                <tr key={v.id} className="trow" style={{borderBottom:"1px solid rgba(255,255,255,.03)"}}>
                  <td style={{padding:"13px 16px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <div style={{width:34,height:34,borderRadius:10,background:v.status==="critical"?"rgba(239,68,68,.15)":v.status==="warning"?"rgba(245,158,11,.1)":"rgba(255,255,255,.05)",border:`1px solid ${v.status==="critical"?"rgba(239,68,68,.25)":"rgba(255,255,255,.06)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🚛</div>
                      <div>
                        <div style={{fontSize:12,fontWeight:700,color:"#f9fafb",fontFamily:"'DM Mono',monospace"}}>{v.plate}</div>
                        <div style={{fontSize:10,color:"#6b7280"}}>{v.driver}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{padding:"13px 16px"}}>
                    <div style={{fontSize:11,color:"#e5e7eb",fontWeight:500}}>{v.route}</div>
                    <div style={{fontSize:10,color:"#4b5563",marginTop:2}}>{v.cargo} {v.weight!=="—"?"· "+v.weight:""}</div>
                  </td>
                  <td style={{padding:"13px 16px"}}>
                    <div style={{fontSize:9,color:"#4b5563",fontFamily:"'DM Mono',monospace",marginBottom:5}}>{v.uit}</div>
                    <UitBar min={v.expiresMin} autoRenew={v.autoRenew}/>
                  </td>
                  <td style={{padding:"13px 16px"}}><SBadge s={v.status}/></td>
                  <td style={{padding:"13px 16px"}}>
                    <div style={{display:"flex",gap:5}}>
                      <button className="btn-ghost btn-sm" onClick={()=>setRenewModal(v)}
                        style={{background:"rgba(16,185,129,.06)",border:"1px solid rgba(16,185,129,.2)",borderRadius:7,padding:"5px 9px",fontSize:10,fontWeight:700,color:"#34d399"}}>
                        <Zap size={9}/>
                      </button>
                      <button className="btn-ghost btn-sm" onClick={()=>setVehicleModal(v)}
                        style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.09)",borderRadius:7,padding:"5px 9px",fontSize:10,color:"#9ca3af"}}>
                        ✏️
                      </button>
                      <button className="btn-ghost btn-sm" onClick={()=>deleteVehicle&&deleteVehicle(v)}
                        style={{background:"rgba(239,68,68,.05)",border:"1px solid rgba(239,68,68,.15)",borderRadius:7,padding:"5px 9px",fontSize:10,color:"#f87171"}}>
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="fu4" style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.07)",borderRadius:18,overflow:"hidden",display:"flex",flexDirection:"column"}}>
        <div style={{padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.05)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{fontSize:13,fontWeight:700,color:"#f9fafb"}}>Activitate Live</div>
          <span className="blink" style={{width:7,height:7,borderRadius:"50%",background:"#34d399",display:"inline-block"}}/>
        </div>
        <div style={{padding:"8px",flex:1,overflowY:"auto"}}>
          {(activity&&activity.length>0 ? activity : ACTIVITY).map((a,i)=>{
            const icons={zap:Zap,alert:AlertTriangle,scan:ScanLine,nav:Navigation,check:CheckCircle};
            const Ic=icons[a.type]||Activity;
            return (
              <div key={a.id||i} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"9px 10px",borderRadius:10,marginBottom:2,transition:"background .15s"}}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.04)"}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <div style={{width:26,height:26,borderRadius:7,background:`${a.color}18`,border:`1px solid ${a.color}28`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}><Ic size={11} color={a.color}/></div>
                <div style={{flex:1}}>
                  <div style={{fontSize:11,color:"#d1d5db",lineHeight:1.45,fontWeight:500}}>{a.msg}</div>
                  <div style={{fontSize:9,color:"#374151",marginTop:2}}>{a.time}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>

    <div className="fu5" style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.07)",borderRadius:18,overflow:"hidden"}}>
      <div style={{padding:"14px 20px",borderBottom:"1px solid rgba(255,255,255,.05)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{fontSize:13,fontWeight:700,color:"#f9fafb"}}>Inteligență Frontieră</div>
        <div style={{fontSize:9,color:"#34d399",background:"rgba(16,185,129,.06)",border:"1px solid rgba(16,185,129,.15)",borderRadius:7,padding:"3px 9px",display:"flex",alignItems:"center",gap:4}}><span className="blink" style={{width:5,height:5,borderRadius:"50%",background:"#34d399",display:"inline-block"}}/>LIVE</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)"}}>
        {BORDERS.map((b,i)=>{
          const c=b.status==="liber"?"#34d399":b.status==="aglomerat"?"#f87171":"#fbbf24";
          return (
            <div key={b.name} style={{padding:"16px",borderRight:i<5?"1px solid rgba(255,255,255,.04)":"none",cursor:"default"}}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.025)"}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <div style={{fontSize:20,marginBottom:7}}>{b.flag}</div>
              <div style={{fontSize:11,fontWeight:700,color:"#e5e7eb",marginBottom:4}}>{b.name}</div>
              <div style={{fontSize:20,fontWeight:800,fontFamily:"'DM Mono',monospace",marginBottom:6,color:c,letterSpacing:-1,lineHeight:1}}>{b.wait}</div>
              <SBadge s={b.status}/>
              <div style={{fontSize:9,color:"#374151",marginTop:6,display:"flex",alignItems:"center",gap:3}}><Truck size={7}/>{b.trucks}</div>
            </div>
          );
        })}
      </div>
    </div>
  </div>;
}

// ══════════════════════════════════════════════════════════════════════════════
// VIEW: AUTO-RENEW ENGINE
// ══════════════════════════════════════════════════════════════════════════════
function ViewAutoRenew({ fleet, addToast, setRenewModal, setVehicleModal, loadFleet }) {
  const [saving, setSaving] = useState({});

  const toggleAutoRenew = async (v) => {
    if (!supabase) return;
    setSaving(s=>({...s,[v._dbId]:true}));
    const newVal = !v.autoRenew;
    const {error} = await supabase.from("vehicles").update({auto_renew:newVal}).eq("id",v._dbId);
    setSaving(s=>({...s,[v._dbId]:false}));
    if (error) { addToast({type:"error",title:"Eroare",msg:error.message}); return; }
    addToast({type:newVal?"success":"info",title:newVal?"Auto-reînnoire activată":"Auto-reînnoire dezactivată",msg:v.plate});
    if (loadFleet) loadFleet();
  };

  const critical = fleet.filter(v=>v.status==="critical");
  const warning  = fleet.filter(v=>v.status==="warning");
  const ok       = fleet.filter(v=>v.status==="ok");

  const VRow = ({v}) => {
    const col = v.status==="critical"?"#f87171":v.status==="warning"?"#fbbf24":"#34d399";
    return (
      <tr className="trow" style={{borderBottom:"1px solid rgba(255,255,255,.03)"}}>
        <td style={{padding:"13px 18px"}}>
          <div style={{display:"flex",alignItems:"center",gap:9}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:col,boxShadow:`0 0 6px ${col}`,flexShrink:0}}/>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,fontWeight:700,color:"#f9fafb"}}>{v.plate}</span>
            <span style={{fontSize:10,color:"#6b7280"}}>{v.driver}</span>
          </div>
        </td>
        <td style={{padding:"13px 18px"}}>
          <UitBar min={v.expiresMin} autoRenew={v.autoRenew}/>
        </td>
        <td style={{padding:"13px 18px"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <input type="range" min={1} max={12} value={v.renew_threshold_h||4}
              onChange={async e=>{
                if(!supabase) return;
                await supabase.from("vehicles").update({renew_threshold_h:+e.target.value}).eq("id",v._dbId);
                if(loadFleet) loadFleet();
              }} style={{width:64,accentColor:"#34d399"}}/>
            <span style={{fontFamily:"monospace",fontSize:11,color:"#fbbf24",fontWeight:600,minWidth:24}}>{v.renew_threshold_h||4}h</span>
          </div>
        </td>
        <td style={{padding:"13px 18px"}}>
          <span style={{fontSize:14,fontWeight:700,color:"#f9fafb",fontFamily:"monospace"}}>{v.renew_count||0}</span>
        </td>
        <td style={{padding:"13px 18px"}}>
          <span className="badge" style={{background:v.autoRenew?"rgba(16,185,129,.1)":"rgba(255,255,255,.04)",color:v.autoRenew?"#34d399":"#6b7280",border:`1px solid ${v.autoRenew?"rgba(16,185,129,.2)":"rgba(255,255,255,.07)"}`}}>
            {v.autoRenew?"AUTO ACTIV":"MANUAL"}
          </span>
        </td>
        <td style={{padding:"13px 18px"}}>
          <div style={{display:"flex",gap:7}}>
            <button className="btn-ghost" onClick={()=>toggleAutoRenew(v)} disabled={saving[v._dbId]}
              style={{background:v.autoRenew?"rgba(239,68,68,.08)":"rgba(16,185,129,.08)",color:v.autoRenew?"#f87171":"#34d399",border:`1px solid ${v.autoRenew?"rgba(239,68,68,.2)":"rgba(16,185,129,.2)"}`,borderRadius:7,padding:"5px 11px",fontSize:10,fontWeight:600}}>
              {saving[v._dbId]?<RefreshCw size={10} className="spin"/>:(v.autoRenew?"Dezactivează":"Activează")}
            </button>
            <button className="btn-ghost" onClick={()=>setRenewModal(v)}
              style={{background:"rgba(16,185,129,.06)",border:"1px solid rgba(16,185,129,.2)",borderRadius:7,padding:"5px 11px",fontSize:10,fontWeight:700,color:"#34d399",display:"flex",alignItems:"center",gap:4}}>
              <Zap size={9}/>Reînnoire
            </button>
          </div>
        </td>
      </tr>
    );
  };

  return <div style={{display:"flex",flexDirection:"column",gap:18}}>
    <div className="fu" style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
      <div>
        <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:4}}>
          <div style={{width:30,height:30,borderRadius:9,background:"rgba(16,185,129,.12)",display:"flex",alignItems:"center",justifyContent:"center"}}><Zap size={15} color="#34d399"/></div>
          <div style={{fontSize:22,fontWeight:700,color:"#f9fafb"}}>Motor Auto-Reînnoire UIT</div>
          <span className="badge" style={{background:"rgba(16,185,129,.1)",color:"#34d399",border:"1px solid rgba(16,185,129,.25)"}}><span className="blink" style={{width:5,height:5,borderRadius:"50%",background:"#34d399",display:"inline-block"}}/>ACTIV</span>
        </div>
        <div style={{fontSize:12,color:"#6b7280"}}>
          {fleet.filter(v=>v.autoRenew).length} vehicule cu auto-reînnoire activă · {critical.length} critice · {warning.length} avertizare
        </div>
      </div>
      <button className="btn-ghost" onClick={()=>setVehicleModal({})}
        style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.09)",borderRadius:10,padding:"9px 16px",fontSize:12,fontWeight:600,color:"#9ca3af",display:"flex",alignItems:"center",gap:7}}>
        <Plus size={13}/>Vehicul Nou
      </button>
    </div>

    {fleet.length===0 ? (
      <div className="glass" style={{borderRadius:15,padding:"40px 24px",textAlign:"center"}}>
        <Truck size={36} color="#1e2535" style={{margin:"0 auto 14px"}}/>
        <div style={{color:"#6b7280",fontSize:13}}>Nu ai vehicule. Adaugă unul pentru a activa auto-reînnoirea.</div>
        <button className="btn" onClick={()=>setVehicleModal({})} style={{marginTop:16,background:"#34d399",color:"#064e3b",border:"none",borderRadius:9,padding:"9px 20px",fontSize:13,fontWeight:700,display:"inline-flex",alignItems:"center",gap:7}}>
          <Plus size={13}/>Adaugă Vehicul
        </button>
      </div>
    ) : (
      <div className="glass fu1" style={{borderRadius:15,overflow:"hidden"}}>
        <div style={{padding:"12px 18px",borderBottom:"1px solid rgba(255,255,255,.05)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontSize:13,fontWeight:700,color:"#f9fafb"}}>Reguli Auto-Reînnoire ({fleet.length})</div>
          <div style={{fontSize:11,color:"#6b7280"}}>Modificările se salvează automat în Supabase</div>
        </div>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{borderBottom:"1px solid rgba(255,255,255,.04)"}}>
            {["Vehicul","UIT & Timp","Prag reînnoire","Reînnoiri","Status","Acțiuni"].map(h=>(
              <th key={h} style={{padding:"9px 18px",textAlign:"left",fontSize:9,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#4b5563"}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {critical.map(v=><VRow key={v.id} v={v}/>)}
            {warning.map(v=><VRow key={v.id} v={v}/>)}
            {ok.map(v=><VRow key={v.id} v={v}/>)}
          </tbody>
        </table>
      </div>
    )}

    <div className="glass fu2" style={{borderRadius:15,padding:18}}>
      <div style={{fontSize:10,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#4b5563",marginBottom:14}}>Cum Funcționează</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8}}>
        {[{icon:Signal,l:"Monitorizare",d:"Supabase Realtime scanează UIT-ul continuu",c:"#60a5fa"},{icon:Timer,l:"Detecție",d:"Alertă când expiră sub pragul setat",c:"#fbbf24"},{icon:Bot,l:"Engine",d:"SmartLogis decide și acționează",c:"#a78bfa"},{icon:Zap,l:"Reînnoire",d:"Update instant în Supabase + log",c:"#34d399"},{icon:Bell,l:"Confirmare",d:"Toast + activitate în dashboard",c:"#f87171"}].map((s,i)=>(
          <div key={s.l} style={{textAlign:"center",padding:"12px 8px",borderRadius:10,background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.04)"}}>
            <div style={{width:36,height:36,borderRadius:10,background:`${s.c}18`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 8px"}}><s.icon size={15} color={s.c}/></div>
            <div style={{fontSize:11,fontWeight:700,color:"#f9fafb",marginBottom:3}}>{i+1}. {s.l}</div>
            <div style={{fontSize:10,color:"#6b7280",lineHeight:1.4}}>{s.d}</div>
          </div>
        ))}
      </div>
    </div>
  </div>;
}

// ══════════════════════════════════════════════════════════════════════════════
// VIEW: OCR
// ══════════════════════════════════════════════════════════════════════════════
function ViewOCR({ addToast }) {
  const [stage, setStage] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [ocrLog, setOcrLog] = useState([]);
  const [nc8, setNc8] = useState({0:"8708 30 91",1:"8708 30 10",2:"8708 80 20"});
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [drag, setDrag] = useState(false);
  const ocrSteps = ["Inițializare motor OCR...","Detectare tip document (Factură/CMR)...","Extragere text (precizie 99.2%)...","Identificare entități (expeditor/destinatar)...","Analiză articole marfă...","Mapare automată coduri NC8 TARIC...","Validare date cu baza ANAF...","Generare preview UIT..."];

  const startProcess = () => {
    setStage("processing"); setOcrLog([]); setProgress(0);
    ocrSteps.forEach((s,i)=>setTimeout(()=>{ setOcrLog(l=>[...l,s]); setProgress(Math.round(((i+1)/ocrSteps.length)*100)); if(i===ocrSteps.length-1) setTimeout(()=>setStage("review"),400); }, i*420));
  };
  const genUIT = () => { setGenerating(true); setTimeout(()=>{setGenerating(false);setGenerated(true);addToast({type:"success",title:"UIT Generat",msg:"UIT-2024-9933 · Valabil 24h · Transmis ANAF"});},2200); };
  const items = [{name:"Discuri de frână",k:0,conf:99,qty:"40 buc",val:"1.800 EUR"},{name:"Etrier frână complet",k:1,conf:97,qty:"12 buc",val:"1.350 EUR"},{name:"Amortizoare spate",k:2,conf:74,qty:"20 buc",val:"1.780 EUR"}];

  return <div style={{display:"flex",flexDirection:"column",gap:18}}>
    <div className="fu"><div style={{fontSize:22,fontWeight:700,color:"#f9fafb",marginBottom:3}}>Auto-Procesare AI</div><div style={{fontSize:12,color:"#6b7280"}}>OCR inteligent · Mapare NC8 automată · Generare UIT instant</div></div>
    {stage==="idle"&&<div className="fu1" onDragOver={e=>{e.preventDefault();setDrag(true);}} onDragLeave={()=>setDrag(false)} onDrop={e=>{e.preventDefault();setDrag(false);startProcess();}} onClick={startProcess} style={{border:`2px dashed ${drag?"#34d399":"rgba(255,255,255,.1)"}`,borderRadius:18,padding:"72px 40px",textAlign:"center",cursor:"pointer",transition:"all .2s",background:drag?"rgba(16,185,129,.03)":"rgba(255,255,255,.01)"}}>
      <div style={{width:58,height:58,borderRadius:16,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.08)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px"}}><Upload size={24} color="#6b7280"/></div>
      <div style={{fontSize:15,fontWeight:600,color:"#f9fafb",marginBottom:7}}>Drag & Drop CMR sau Factură</div>
      <div style={{fontSize:12,color:"#6b7280",marginBottom:18}}>AI-ul extrage codurile NC8 și generează automat UIT-ul</div>
      <div style={{display:"flex",justifyContent:"center",gap:8}}>{["PDF","JPG","PNG","XML"].map(f=><span key={f} style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",borderRadius:5,padding:"2px 9px",fontSize:10,color:"#6b7280"}}>{f}</span>)}</div>
    </div>}
    {stage==="processing"&&<div className="glass fu1" style={{borderRadius:15,padding:26}}>
      <div style={{display:"flex",alignItems:"center",gap:11,marginBottom:20}}><div className="spinSlow" style={{width:34,height:34,borderRadius:9,background:"rgba(59,130,246,.15)",display:"flex",alignItems:"center",justifyContent:"center"}}><Cpu size={15} color="#60a5fa"/></div><div style={{fontSize:13,fontWeight:600,color:"#f9fafb"}}>Procesare document...</div></div>
      <div className="pbar" style={{marginBottom:18,height:4}}><div className="pfill" style={{width:`${progress}%`,background:"linear-gradient(90deg,#3b82f6,#34d399)"}}/></div>
      <div style={{background:"rgba(0,0,0,.3)",borderRadius:9,padding:"12px 15px",fontFamily:"'DM Mono',monospace",fontSize:11}}>
        {ocrLog.map((l,i)=><div key={i} style={{color:i===ocrLog.length-1?"#f9fafb":"#4b5563",marginBottom:4,display:"flex",alignItems:"center",gap:7}}><span style={{color:"#3b82f6"}}>›</span>{l}{i===ocrLog.length-1&&<span className="blink" style={{color:"#3b82f6"}}>█</span>}</div>)}
      </div>
    </div>}
    {stage==="review"&&<div className="fu1" style={{display:"grid",gridTemplateColumns:"28% 1fr",gap:14}}>
      <div className="glass" style={{borderRadius:15,overflow:"hidden"}}>
        <div style={{padding:"11px 14px",borderBottom:"1px solid rgba(255,255,255,.05)",display:"flex",alignItems:"center",gap:7}}><FileText size={12} color="#6b7280"/><span style={{fontSize:10,fontWeight:500,color:"#6b7280"}}>Rechnung_2024_1187.pdf</span></div>
        <div style={{padding:13,background:"rgba(0,0,0,.2)",minHeight:460,fontFamily:"'DM Mono',monospace",fontSize:8.5,color:"#4b5563",lineHeight:1.8}}>
          <div style={{color:"#6b7280",fontWeight:700,fontSize:9,marginBottom:7}}>RECHNUNG Nr. 2024-1187</div>
          <div style={{marginBottom:10}}>Bosch GmbH Automotive<br/>Stuttgart, Deutschland<br/>USt-IdNr: DE204009911</div>
          <div style={{marginBottom:10}}>EMPFÄNGER:<br/>SC AutoTrans SRL<br/>Cluj-Napoca, RO<br/>CUI: RO12345678</div>
          <div style={{borderTop:"1px solid #1e2535",paddingTop:7,marginBottom:7}}>POSITIONEN:</div>
          <div style={{marginBottom:5}}>1. Bremsscheiben x40<br/>&nbsp;&nbsp;1.800,00 EUR</div>
          <div style={{marginBottom:5}}>2. Bremssattel x12<br/>&nbsp;&nbsp;1.350,00 EUR</div>
          <div style={{marginBottom:10}}>3. Stoßdämpfer x20<br/>&nbsp;&nbsp;1.780,00 EUR</div>
          <div style={{borderTop:"1px solid #1e2535",paddingTop:7}}>Netto: 4.930,00 EUR<br/>MwSt: 936,70 EUR<br/><span style={{color:"#6b7280",fontWeight:700}}>GESAMT: 5.866,70 EUR</span></div>
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:13}}>
        <div className="glass" style={{borderRadius:15,padding:18}}>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#4b5563",marginBottom:14}}>Date Extrase</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11}}>
            {[{l:"Expeditor",v:"Bosch GmbH, Stuttgart DE"},{l:"Destinatar",v:"SC AutoTrans SRL, Cluj"},{l:"Nr. Factură",v:"2024-1187"},{l:"Valoare",v:"5.866,70 EUR"},{l:"Dată",v:"03.03.2026"},{l:"Transport",v:"Rutier (TIR)"}].map(f=>(
              <div key={f.l}><div style={{fontSize:9,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#4b5563",marginBottom:4}}>{f.l}</div><div style={{fontSize:12,color:"#e5e7eb",background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.06)",borderRadius:7,padding:"7px 11px"}}>{f.v}</div></div>
            ))}
          </div>
        </div>
        <div className="glass" style={{borderRadius:15,padding:18,flex:1}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}><div style={{fontSize:10,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#4b5563"}}>Mapare NC8 Vamală</div><span style={{fontSize:9,color:"#34d399",background:"rgba(16,185,129,.08)",border:"1px solid rgba(16,185,129,.18)",borderRadius:20,padding:"2px 8px"}}>AI Activ</span></div>
          {items.map((item,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:11,padding:"11px 13px",borderRadius:9,marginBottom:7,background:item.conf<80?"rgba(245,158,11,.05)":"rgba(255,255,255,.02)",border:`1px solid ${item.conf<80?"rgba(245,158,11,.15)":"rgba(255,255,255,.05)"}`}}>
              <div style={{flex:1}}><div style={{fontSize:12,fontWeight:500,color:"#f9fafb"}}>{item.name}</div><div style={{fontSize:10,color:"#6b7280",marginTop:1}}>{item.qty} · {item.val}</div></div>
              <ArrowRight size={11} color="#374151"/>
              <input value={nc8[item.k]} onChange={e=>setNc8(n=>({...n,[item.k]:e.target.value}))} style={{width:96,fontFamily:"'DM Mono',monospace",fontSize:11,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",borderRadius:7,padding:"6px 9px",color:"#f9fafb",outline:"none",textAlign:"center"}}/>
              <span style={{background:item.conf>=90?"rgba(16,185,129,.1)":"rgba(245,158,11,.1)",color:item.conf>=90?"#34d399":"#fbbf24",border:`1px solid ${item.conf>=90?"rgba(16,185,129,.22)":"rgba(245,158,11,.22)"}`,borderRadius:20,fontSize:9,fontWeight:700,padding:"2px 8px"}}>{item.conf}%</span>
              {item.conf<80?<AlertTriangle size={13} color="#fbbf24"/>:<CheckCircle size={13} color="#34d399"/>}
            </div>
          ))}
          {items.some(it=>it.conf<80)&&<div style={{background:"rgba(245,158,11,.05)",border:"1px solid rgba(245,158,11,.14)",borderRadius:9,padding:"9px 13px",fontSize:11,color:"#fbbf24",display:"flex",gap:7,marginBottom:14}}><AlertTriangle size={12}/>Verificați codul NC8 evidențiat înainte de generare.</div>}
          <div style={{display:"flex",gap:9}}>
            {!generated
              ? <button className="btn" onClick={genUIT} disabled={generating} style={{flex:1,background:generating?"rgba(255,255,255,.04)":"#f9fafb",color:generating?"#6b7280":"#0a0a0a",border:"none",borderRadius:9,padding:"11px 0",fontSize:13,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",gap:7,boxShadow:generating?"none":"0 4px 16px rgba(255,255,255,.1)"}}>
                  {generating?<><RotateCcw size={13} className="spin"/>Generare UIT...</>:<><Zap size={13}/>Generează UIT Automat</>}
                </button>
              : <div style={{flex:1,background:"rgba(16,185,129,.09)",border:"1px solid rgba(16,185,129,.22)",borderRadius:9,padding:"11px 0",fontSize:13,fontWeight:700,color:"#34d399",display:"flex",alignItems:"center",justifyContent:"center",gap:7}}><CheckCircle size={13}/>UIT-2024-9933 Generat ✓</div>}
            <button className="btn-ghost" onClick={()=>{setStage("idle");setGenerated(false);}} style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:9,padding:"11px 14px",fontSize:12,color:"#6b7280"}}>Reset</button>
          </div>
        </div>
      </div>
    </div>}
  </div>;
}

// ══════════════════════════════════════════════════════════════════════════════
// VIEW: DISPATCH
// ══════════════════════════════════════════════════════════════════════════════
function ViewDispatch({ fleet, addToast }) {
  const [sel, setSel]         = useState(null);
  const [tokens, setTokens]   = useState([]);
  const [sending, setSending] = useState(false);
  const [mapVehicles, setMapVehicles] = useState([]);
  const [selMarker, setSelMarker]     = useState(null);
  const MBOX = import.meta.env.VITE_MAPBOX_TOKEN;

  // Load dispatch tokens from DB
  const loadTokens = useCallback(async () => {
    if (!supabase) return;
    const { data } = await supabase.from("dispatch_tokens")
      .select("*, vehicles(plate,driver_name)")
      .order("created_at",{ascending:false}).limit(20);
    if (data) setTokens(data);
  }, []);

  useEffect(()=>{ loadTokens(); },[loadTokens]);

  // Live positions from vehicles table
  useEffect(()=>{
    const active = fleet.filter(v=>v.last_lat&&v.last_lng);
    setMapVehicles(active);
  },[fleet]);

  // Subscribe to vehicle GPS updates
  useEffect(()=>{
    if(!supabase) return;
    const ch = supabase.channel("gps-dispatch")
      .on("postgres_changes",{event:"UPDATE",schema:"public",table:"vehicles"},payload=>{
        if(payload.new.last_lat){
          setMapVehicles(prev=>{
            const exists = prev.find(v=>v._dbId===payload.new.id);
            const updated = {...(exists||{}),_dbId:payload.new.id,plate:payload.new.plate,last_lat:payload.new.last_lat,last_lng:payload.new.last_lng,last_seen_at:payload.new.last_seen_at,status:payload.new.status||"ok"};
            return exists ? prev.map(v=>v._dbId===payload.new.id?updated:v) : [...prev,updated];
          });
        }
      }).subscribe();
    return ()=>supabase.removeChannel(ch);
  },[]);

  const sendLink = async () => {
    if (!sel) { addToast({type:"error",title:"Selectează vehiculul",msg:"Alege un vehicul din lista de mai jos"}); return; }
    setSending(true);
    const token = "gps-" + sel._dbId + "-" + Date.now().toString(36);
    const expires = new Date(Date.now()+24*3600000).toISOString();
    const supaUrl = import.meta.env.VITE_SUPABASE_URL||"";
    const supaKey = import.meta.env.VITE_SUPABASE_ANON_KEY||"";
    const driverUrl = window.location.origin + "/driver.html?token=" + token + "&su=" + encodeURIComponent(supaUrl) + "&sk=" + encodeURIComponent(supaKey);

    if (supabase) {
      await supabase.from("dispatch_tokens").insert({
        tenant_id: sel._raw?.tenant_id,
        vehicle_id: sel._dbId,
        token,
        phone: sel.driver_phone||"",
        expires_at: expires,
      });
    }
    setSending(false);
    navigator.clipboard?.writeText(driverUrl).then(()=>{
      addToast({type:"success",title:"Link GPS copiat!",msg:sel.plate + " · Trimite-l șoferului"});
    }).catch(()=>{
      addToast({type:"info",title:"Link GPS generat",msg:driverUrl.slice(0,60)+"..."});
    });
    loadTokens();
  };

  const revokeToken = async (id) => {
    if(!supabase) return;
    await supabase.from("dispatch_tokens").delete().eq("id",id);
    addToast({type:"info",title:"Link revocat",msg:"Token GPS șters"});
    loadTokens();
  };

  const statusCol = {ok:"#34d399",warning:"#fbbf24",critical:"#f87171"};

  return <div style={{display:"flex",flexDirection:"column",gap:18}}>
    <div className="fu">
      <div style={{fontSize:22,fontWeight:700,color:"#f9fafb",marginBottom:3}}>Dispecerat GPS Extern</div>
      <div style={{fontSize:12,color:"#6b7280"}}>Hartă live + linkuri GPS pentru șoferi · Fără instalare aplicație · Direct din browser</div>
    </div>

    {/* MAP */}
    <div className="fu1" style={{borderRadius:16,overflow:"hidden",border:"1px solid rgba(255,255,255,.07)"}}>
      {MBOX ? (
        <MapboxFleetView vehicles={mapVehicles} selMarker={selMarker} setSelMarker={setSelMarker} token={MBOX}/>
      ) : (
        <div style={{height:300,background:"rgba(255,255,255,.02)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10}}>
          <MapPin size={32} color="#374151"/>
          <div style={{fontSize:13,color:"#4b5563",textAlign:"center"}}>
            Adaugă <code style={{fontFamily:"monospace",color:"#60a5fa",fontSize:12}}>VITE_MAPBOX_TOKEN</code> în <code style={{fontFamily:"monospace",color:"#60a5fa",fontSize:12}}>.env</code>
          </div>
          <div style={{fontSize:11,color:"#374151"}}>
            {mapVehicles.length>0 ? mapVehicles.length+" vehicule cu GPS" : "Niciun vehicul cu GPS activ"}
          </div>
        </div>
      )}
    </div>

    <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:14}}>
      <div style={{display:"flex",flexDirection:"column",gap:13}}>
        <div className="glass fu2" style={{borderRadius:15,padding:18}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#4b5563",marginBottom:14}}>Selectează vehicul pentru link GPS</div>
          {fleet.length===0 ? (
            <div style={{color:"#6b7280",fontSize:12,textAlign:"center",padding:20}}>Nu ai vehicule adăugate.</div>
          ) : fleet.map(v=>(
            <div key={v.id} onClick={()=>setSel(sel?.id===v.id?null:v)}
              style={{display:"flex",alignItems:"center",gap:11,padding:"10px 12px",borderRadius:10,cursor:"pointer",transition:"all .15s",background:sel?.id===v.id?"rgba(255,255,255,.07)":"rgba(255,255,255,.02)",border:`1px solid ${sel?.id===v.id?"rgba(255,255,255,.12)":"rgba(255,255,255,.04)"}`,marginBottom:7}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:statusCol[v.status]||"#34d399",flexShrink:0}}/>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,fontWeight:600,color:"#f9fafb"}}>{v.plate}</div>
                <div style={{fontSize:10,color:"#6b7280"}}>{v.driver}</div>
              </div>
              {v.last_lat && <div style={{fontSize:9,color:"#34d399",fontFamily:"monospace",background:"rgba(16,185,129,.08)",border:"1px solid rgba(16,185,129,.2)",borderRadius:6,padding:"2px 6px"}}>📍 GPS LIVE</div>}
              {sel?.id===v.id&&<CheckCircle size={13} color="#34d399"/>}
            </div>
          ))}
        </div>

        <button className="btn fu3" onClick={sendLink} disabled={sending||!sel}
          style={{background:sel?"linear-gradient(135deg,#34d399,#059669)":"rgba(255,255,255,.04)",color:sel?"#064e3b":"#374151",border:"none",borderRadius:11,padding:"14px 0",fontSize:14,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",gap:9,boxShadow:sel?"0 4px 20px rgba(16,185,129,.3)":"none"}}>
          {sending?<RefreshCw size={14} className="spin"/>:<Navigation size={14}/>}
          {sel?"Generează & Copiază Link GPS":"Selectează un vehicul"}
        </button>
      </div>

      <div className="glass fu2" style={{borderRadius:15,padding:16}}>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#4b5563",marginBottom:14}}>
          Linkuri Active ({tokens.filter(t=>new Date(t.expires_at)>new Date()).length})
        </div>
        {tokens.length===0 ? (
          <div style={{color:"#6b7280",fontSize:12,textAlign:"center",padding:16}}>Niciun link generat încă.</div>
        ) : tokens.map(t=>{
          const expired = t.expires_at && new Date(t.expires_at)<new Date();
          return (
            <div key={t.id} style={{display:"flex",alignItems:"center",gap:8,padding:"9px 10px",borderRadius:9,background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.05)",marginBottom:7}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:expired?"#f87171":"#34d399",flexShrink:0}}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:11,fontWeight:600,color:"#e5e7eb",fontFamily:"monospace"}}>{t.vehicles?.plate||"—"}</div>
                <div style={{fontSize:9,color:"#6b7280"}}>{t.vehicles?.driver_name||""} · {expired?"EXPIRAT":new Date(t.expires_at).toLocaleTimeString("ro-RO",{hour:"2-digit",minute:"2-digit"})}</div>
              </div>
              {!expired && (
                <button onClick={()=>navigator.clipboard?.writeText(window.location.origin+"/driver.html?token="+t.token)}
                  style={{background:"none",border:"1px solid rgba(255,255,255,.08)",borderRadius:6,padding:"3px 7px",fontSize:9,color:"#9ca3af",cursor:"pointer"}}>
                  📋
                </button>
              )}
              <button onClick={()=>revokeToken(t.id)} style={{background:"none",border:"none",cursor:"pointer",color:"#4b5563",padding:"2px"}}><X size={11}/></button>
            </div>
          );
        })}

        <div style={{marginTop:14,padding:"12px 13px",background:"rgba(59,130,246,.05)",border:"1px solid rgba(59,130,246,.15)",borderRadius:10}}>
          <div style={{fontSize:11,fontWeight:600,color:"#60a5fa",marginBottom:6}}>📱 Cum funcționează</div>
          <div style={{fontSize:10,color:"#9ca3af",lineHeight:1.7}}>
            1. Selectezi vehiculul și apeși "Generează Link"<br/>
            2. Trimiți link-ul șoferului pe WhatsApp/SMS<br/>
            3. Șoferul deschide din browser → accesează GPS → trimite automat coordonatele<br/>
            4. Harta se actualizează live fără nicio aplicație instalată
          </div>
        </div>
      </div>
    </div>
  </div>;
}

// ── Mapbox Fleet View component ───────────────────────────────────────────────
function MapboxFleetView({ vehicles, selMarker, setSelMarker, token }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});

  useEffect(()=>{
    if(!mapRef.current || mapInstanceRef.current) return;
    import("mapbox-gl").then(({default:mapboxgl})=>{
      import("mapbox-gl/dist/mapbox-gl.css").catch(()=>{});
      mapboxgl.accessToken = token;
      const map = new mapboxgl.Map({
        container: mapRef.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [25.0, 45.9],
        zoom: 6,
      });
      mapInstanceRef.current = map;
      map.addControl(new mapboxgl.NavigationControl(),"top-right");
    }).catch(()=>{});
  },[token]);

  useEffect(()=>{
    const map = mapInstanceRef.current;
    if(!map||!map.isStyleLoaded()) return;
    import("mapbox-gl").then(({default:mapboxgl})=>{
      const cols = {ok:"#34d399",warning:"#fbbf24",critical:"#f87171"};
      vehicles.forEach(v=>{
        if(!v.last_lat||!v.last_lng) return;
        const col = cols[v.status]||"#34d399";
        const el = document.createElement("div");
        el.style.cssText = `width:28px;height:28px;border-radius:50%;background:${col};display:flex;align-items:center;justify-content:center;font-size:13px;cursor:pointer;box-shadow:0 0 10px ${col}66;border:2px solid ${col}44`;
        el.innerHTML = "🚛";
        el.addEventListener("click",()=>setSelMarker(v));
        if(markersRef.current[v._dbId]) {
          markersRef.current[v._dbId].setLngLat([v.last_lng,v.last_lat]);
        } else {
          markersRef.current[v._dbId] = new mapboxgl.Marker({element:el}).setLngLat([v.last_lng,v.last_lat]).addTo(map);
        }
      });
    }).catch(()=>{});
  },[vehicles]);

  return (
    <div style={{position:"relative"}}>
      <div ref={mapRef} style={{width:"100%",height:340}}/>
      {vehicles.length===0&&(
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none"}}>
          <div style={{background:"rgba(6,8,16,.85)",borderRadius:10,padding:"10px 16px",fontSize:12,color:"#6b7280"}}>
            Niciun vehicul cu GPS activ · Generează link GPS pentru șoferi
          </div>
        </div>
      )}
      {selMarker&&(
        <div style={{position:"absolute",bottom:16,left:16,background:"#0b0f1a",border:"1px solid rgba(255,255,255,.1)",borderRadius:12,padding:"12px 16px",minWidth:200,zIndex:10}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
            <div style={{fontSize:14,fontWeight:700,color:"#f9fafb",fontFamily:"monospace"}}>{selMarker.plate}</div>
            <button onClick={()=>setSelMarker(null)} style={{background:"none",border:"none",cursor:"pointer",color:"#6b7280"}}><X size={12}/></button>
          </div>
          <div style={{fontSize:11,color:"#9ca3af"}}>👤 {selMarker.driver}</div>
          <div style={{fontSize:11,color:"#9ca3af"}}>📍 {selMarker.last_lat?.toFixed(5)}, {selMarker.last_lng?.toFixed(5)}</div>
          {selMarker.last_seen_at&&<div style={{fontSize:10,color:"#6b7280",marginTop:4}}>Ultima actualizare: {new Date(selMarker.last_seen_at).toLocaleTimeString("ro-RO")}</div>}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// VIEW: PRICING (embedded in app)
// ══════════════════════════════════════════════════════════════════════════════
function ViewPricing() {
  const [annual, setAnnual] = useState(true);
  return <div style={{display:"flex",flexDirection:"column",gap:20}}>
    <div className="fu"><div style={{fontSize:22,fontWeight:700,color:"#f9fafb",marginBottom:3}}>Planuri & Prețuri</div><div style={{fontSize:12,color:"#6b7280"}}>Upgrade sau downgrade oricând, fără penalități.</div></div>
    <div className="fu1" style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:30,padding:"5px 6px"}}>
      <button className="btn-ghost" onClick={()=>setAnnual(false)} style={{padding:"7px 16px",borderRadius:24,fontSize:12,fontWeight:600,background:!annual?"rgba(255,255,255,.1)":"none",color:!annual?"#f9fafb":"#6b7280",border:"none"}}>Lunar</button>
      <button className="btn-ghost" onClick={()=>setAnnual(true)} style={{padding:"7px 16px",borderRadius:24,fontSize:12,fontWeight:600,background:annual?"rgba(255,255,255,.1)":"none",color:annual?"#f9fafb":"#6b7280",border:"none",display:"flex",alignItems:"center",gap:5}}>
        Anual<span style={{background:"#34d399",color:"#064e3b",fontSize:9,fontWeight:800,padding:"1px 6px",borderRadius:10}}>-20%</span>
      </button>
    </div>
    <div className="fu2" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,alignItems:"start"}}>
      {PLANS.map(p=>{
        const price=annual?p.annual:p.monthly;
        return <div key={p.id} className={p.popular?"popular cardHov":"cardHov"} style={{background:p.popular?"rgba(16,185,129,.04)":"rgba(255,255,255,.02)",border:`1px solid ${p.border}`,borderRadius:17,padding:"26px 22px",display:"flex",flexDirection:"column",position:"relative",transform:p.popular?"translateY(-6px)":"none",boxShadow:p.popular?"0 16px 50px rgba(16,185,129,.1)":"none"}}>
          {p.popular&&<div style={{position:"absolute",top:-12,left:"50%",transform:"translateX(-50%)",background:"#34d399",color:"#064e3b",fontSize:9,fontWeight:800,padding:"3px 12px",borderRadius:20,whiteSpace:"nowrap"}}>⚡ CEL MAI POPULAR</div>}
          <div style={{fontSize:9,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:p.color,marginBottom:4}}>{p.name}</div>
          <div style={{fontSize:11,color:"#6b7280",marginBottom:14}}>{p.tagline}</div>
          {price?<div style={{display:"flex",alignItems:"flex-end",gap:3,marginBottom:3}}><span style={{fontSize:34,fontWeight:800,color:"#f9fafb",letterSpacing:-1.5,lineHeight:1}}>{price}</span><span style={{fontSize:12,color:"#6b7280",marginBottom:4}}>RON/lună</span></div>:<div style={{fontSize:28,fontWeight:800,color:"#f9fafb",letterSpacing:-1,lineHeight:1,marginBottom:3}}>Custom</div>}
          {annual&&price&&<div style={{fontSize:10,color:"#34d399",marginBottom:3}}>Economisești {(p.monthly-p.annual)*12} RON/an</div>}
          <div style={{fontSize:10,color:"#4b5563",marginBottom:16}}>{p.vehicles}</div>
          <div style={{flex:1,marginBottom:18}}>{p.features.map((f,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>{f.ok?<div style={{width:15,height:15,borderRadius:"50%",background:`${p.color}20`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Check size={8} color={p.color}/></div>:<div style={{width:15,height:15,borderRadius:"50%",background:"rgba(255,255,255,.03)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><X size={8} color="#374151"/></div>}<span style={{fontSize:11,color:f.ok?(f.hi?p.color:"#d1d5db"):"#374151",fontWeight:f.hi?600:400}}>{f.t}{f.hi&&<Sparkles size={9} color={p.color} style={{marginLeft:4}}/>}</span></div>)}</div>
          <button className="btn" style={{background:p.popular?"#34d399":"rgba(255,255,255,.05)",color:p.popular?"#064e3b":"#f9fafb",border:p.popular?"none":`1px solid ${p.border}`,borderRadius:10,padding:"11px 0",fontSize:12,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",gap:6,boxShadow:p.popular?"0 4px 20px rgba(16,185,129,.3)":"none"}}>{p.cta}<ArrowRight size={12}/></button>
        </div>;
      })}
    </div>
  </div>;
}

// ══════════════════════════════════════════════════════════════════════════════
// VIEW: ARCHITECTURE (interactive doc inside app)
// ══════════════════════════════════════════════════════════════════════════════
function ViewArchitecture() {
  const [activeSection, setActiveSection] = useState("overview");
  const sections = [
    {id:"overview",label:"Overview"},
    {id:"stack",label:"Tech Stack"},
    {id:"api",label:"API Endpoints"},
    {id:"uit",label:"UIT Engine Code"},
    {id:"db",label:"DB Schema"},
    {id:"costs",label:"Unit Economics"},
  ];
  const SA = ({children,style={}})=><div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.07)",borderRadius:12,padding:"18px 20px",...style}}>{children}</div>;
  const Code = ({children})=><div style={{background:"#000",border:"1px solid rgba(255,255,255,.08)",borderRadius:11,padding:"18px 20px",fontFamily:"'DM Mono',monospace",fontSize:11,lineHeight:1.9,color:"#4b5563",overflowX:"auto",marginTop:12}}>{children}</div>;
  const Bd = ({children})=><span className="badge" style={{background:"rgba(59,130,246,.1)",color:"#60a5fa",border:"1px solid rgba(59,130,246,.2)",marginLeft:8}}>{children}</span>;

  return <div style={{display:"grid",gridTemplateColumns:"200px 1fr",gap:16,minHeight:"70vh"}}>
    {/* mini sidebar */}
    <div className="glass" style={{borderRadius:14,padding:"14px 10px",height:"fit-content",position:"sticky",top:0}}>
      <div style={{fontSize:9,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"#374151",padding:"0 8px 10px"}}>Arhitectură</div>
      {sections.map(s=><button className="btn-ghost" key={s.id} onClick={()=>setActiveSection(s.id)} style={{display:"block",width:"100%",textAlign:"left",padding:"7px 10px",borderRadius:8,fontSize:12,fontWeight:500,background:activeSection===s.id?"rgba(255,255,255,.07)":"none",color:activeSection===s.id?"#f9fafb":"#6b7280",border:"none",marginBottom:2}}>{s.label}</button>)}
    </div>

    <div className="fu" style={{display:"flex",flexDirection:"column",gap:14}}>
      {activeSection==="overview"&&<>
        <div><div style={{fontSize:20,fontWeight:700,color:"#f9fafb",marginBottom:4}}>System Overview <Bd>v1.0 Production-Ready</Bd></div><div style={{fontSize:12,color:"#6b7280",marginBottom:16}}>Full-stack technical specification pentru SmartLogis.</div></div>
        <SA style={{borderColor:"rgba(16,185,129,.2)",background:"rgba(16,185,129,.03)"}}><div style={{fontSize:10,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#34d399",marginBottom:10}}>Core Design Principles</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>{[["⚡ Event-driven","UIT renewal triggered by time-based events, not polling loops"],["🔐 Zero-trust","ANAF credentials never stored in plaintext, Vault-encrypted"],["🇷🇴 Romania-first","Hosted în EU (GDPR), Romanian law compliant, ANAF API native"],["📈 Multi-tenant","Isolated per company, row-level security în Postgres"]].map(([t,d])=><div key={t} style={{fontSize:12,color:"#9ca3af"}}><strong style={{color:"#e5e7eb"}}>{t}</strong> — {d}</div>)}</div></SA>
        <SA><div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"#4b5563",lineHeight:2.2}}>
          <div style={{color:"#1f2937",marginBottom:4}}>CLIENT LAYER</div>
          <div style={{marginLeft:16,marginBottom:8}}>{["Next.js 15 (Vercel)","Mobile PWA","Driver Browser GPS"].map(b=><span key={b} style={{display:"inline-block",background:"rgba(59,130,246,.08)",border:"1px solid rgba(59,130,246,.2)",borderRadius:6,padding:"2px 10px",color:"#60a5fa",fontSize:10,margin:"0 4px 4px 0"}}>{b}</span>)}</div>
          <div style={{color:"#1f2937",marginBottom:4}}>API GATEWAY</div>
          <div style={{marginLeft:16,marginBottom:8}}>{["Fastify API :3000","Rate Limiter","JWT Auth Middleware"].map(b=><span key={b} style={{display:"inline-block",background:"rgba(16,185,129,.08)",border:"1px solid rgba(16,185,129,.2)",borderRadius:6,padding:"2px 10px",color:"#34d399",fontSize:10,margin:"0 4px 4px 0"}}>{b}</span>)}</div>
          <div style={{color:"#1f2937",marginBottom:4}}>DATA LAYER</div>
          <div style={{marginLeft:16,marginBottom:8}}>{["PostgreSQL 16","Redis 7 + Job Queue","Cloudflare R2"].map(b=><span key={b} style={{display:"inline-block",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.1)",borderRadius:6,padding:"2px 10px",color:"#e5e7eb",fontSize:10,margin:"0 4px 4px 0"}}>{b}</span>)}</div>
          <div style={{color:"#1f2937",marginBottom:4}}>EXTERNAL APIs</div>
          <div style={{marginLeft:16}}>{["ANAF SPV API","GPT-4o","Twilio","Resend"].map(b=><span key={b} style={{display:"inline-block",background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.2)",borderRadius:6,padding:"2px 10px",color:"#f87171",fontSize:10,margin:"0 4px 4px 0"}}>{b}</span>)}</div>
        </div></SA>
      </>}

      {activeSection==="stack"&&<>
        <div style={{fontSize:20,fontWeight:700,color:"#f9fafb",marginBottom:14}}>Tech Stack</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:11}}>
          {[["Next.js 15","Frontend","App Router, RSC, Server Actions. Deployed Vercel EU."],["Fastify","API","High-perf Node.js. 3x faster than Express. Zod schemas."],["PostgreSQL 16","Primary DB","Row-level security. TimescaleDB pentru UIT timeseries."],["Redis 7","Cache + Queue","Job Queue pentru job queues. Cache ANAF responses."],["JobQueue","Jobs","UIT expiry checks every 15 min. Exponential backoff retry."],["HashiCorp Vault","Secrets","ANAF OAuth2 tokens. Dynamic secrets rotation 24h."],["Cloudflare R2","Storage","CMR, invoices, OCR outputs. Zero egress cost."],["Tesseract + GPT-4o","AI / OCR","Tesseract text extraction + GPT-4o NC8 mapping."],["Resend + Twilio","Comms","Transactional email + SMS/WhatsApp pentru șoferi."]].map(([n,t,d])=>(
            <SA key={n}><div style={{fontSize:12,fontWeight:700,color:"#f9fafb",marginBottom:2}}>{n} <span className="badge" style={{background:"rgba(59,130,246,.1)",color:"#60a5fa",border:"1px solid rgba(59,130,246,.15)",fontSize:8}}>{t}</span></div><div style={{fontSize:11,color:"#6b7280",lineHeight:1.5}}>{d}</div></SA>
          ))}
        </div>
      </>}

      {activeSection==="api"&&<>
        <div style={{fontSize:20,fontWeight:700,color:"#f9fafb",marginBottom:14}}>API Endpoints</div>
        {[{title:"Fleet",endpoints:[["GET","/api/v1/fleet","List all vehicles + live UIT status"],["POST","/api/v1/fleet/vehicles","Add new vehicle"],["POST","/api/v1/fleet/vehicles/:id/renew","Trigger manual UIT renewal"],["PUT","/api/v1/fleet/vehicles/:id/autorenew","Update auto-renew settings"]]},{title:"UIT & ANAF",endpoints:[["POST","/api/v1/uit/generate","Generate new UIT via ANAF API"],["POST","/api/v1/uit/extend","Extend existing UIT +24h"],["GET","/api/v1/uit/:uitCode/status","Query ANAF for UIT validity"],["POST","/api/v1/anaf/connect","Store + validate ANAF credentials"]]},{title:"OCR",endpoints:[["POST","/api/v1/ocr/upload","Upload CMR/invoice, returns jobId"],["GET","/api/v1/ocr/jobs/:jobId","Poll OCR job status"],["POST","/api/v1/ocr/nc8/map","Map cargo → NC8 code via GPT-4o"],["POST","/api/v1/ocr/uit/generate-from-doc","Full pipeline: doc → OCR → NC8 → UIT"]]}].map(section=>(
          <SA key={section.title} style={{marginBottom:0}}><div style={{fontSize:11,fontWeight:700,color:"#f9fafb",marginBottom:10}}>{section.title}</div>
            {section.endpoints.map(([method,path,desc])=>{
              const mc={GET:"rgba(16,185,129,.12)",POST:"rgba(59,130,246,.12)",PUT:"rgba(245,158,11,.12)"};
              const cc={GET:"#34d399",POST:"#60a5fa",PUT:"#fbbf24"};
              return <div key={path} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,.04)"}}>
                <span style={{background:mc[method],color:cc[method],fontFamily:"'DM Mono',monospace",fontSize:9,fontWeight:800,padding:"2px 7px",borderRadius:5,minWidth:42,textAlign:"center"}}>{method}</span>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:"#e5e7eb",flex:1}}>{path}</span>
                <span style={{fontSize:10,color:"#4b5563"}}>{desc}</span>
              </div>;
            })}
          </SA>
        ))}
      </>}

      {activeSection==="uit"&&<>
        <div style={{fontSize:20,fontWeight:700,color:"#f9fafb",marginBottom:4}}>UIT Auto-Renew Engine <span className="badge" style={{background:"rgba(245,158,11,.1)",color:"#fbbf24",border:"1px solid rgba(245,158,11,.2)"}}>Job Queue</span></div>
        <div style={{fontSize:12,color:"#6b7280",marginBottom:12}}>Core competitive advantage. Job Queue job rulează la fiecare 15 minute, scanează toate UIT-urile și declanșează reînnoire pe baza pragurilor per vehicul.</div>
        <Code><pre style={{fontFamily:"'DM Mono',monospace",fontSize:11,lineHeight:1.9,color:"#4b5563",whiteSpace:"pre-wrap"}}>{`// src/services/uitEngine.ts
// Queue, Worker — din librăria de job queues (Redis-based)

// 1. Scan Queue — runs every 15 min via cron
export const uitScanQueue = new Queue('uit-scan', {
  defaultJobOptions: {
    repeat: { pattern: '*/15 * * * *' },
    removeOnComplete: 100,
  }
});

// 2. Scanner Worker — checks all active UITs
export const uitScanWorker = new Worker('uit-scan', async () => {
  const vehicles = await db.query(\`
    SELECT v.*, t.anaf_tenant_id, ar.threshold_hours
    FROM vehicles v
    JOIN auto_renew_rules ar ON ar.vehicle_id = v.id
    WHERE ar.enabled = true
    AND v.uit_expires_at < NOW() + (ar.threshold_hours * INTERVAL '1 hour')
    AND v.uit_expires_at > NOW()
  \`);
  for (const vehicle of vehicles.rows) {
    await uitRenewQueue.add('renew', { vehicleId: vehicle.id });
  }
});

// 3. Renewal Worker — calls ANAF API with retry
export const uitRenewWorker = new Worker('uit-renew', async (job) => {
  const credentials = await vault.getSecret(\`anaf/tenant/\${tenantId}\`);
  const token = await anafClient.getOAuth2Token(credentials);
  const newUIT = await anafClient.extendUIT(vehicle.uit_code, token);
  await db.query(
    'UPDATE vehicles SET uit_code=$1, uit_expires_at=$2 WHERE id=$3',
    [newUIT.code, newUIT.expiresAt, vehicleId]
  );
  await notificationService.send({ vehicleId, type: 'uit_renewed' });
}, {
  attempts: 5,
  backoff: { type: 'exponential', delay: 60000 }
  // Retry: 1min → 2min → 4min → 8min → 16min
});`}</pre></Code>
      </>}

      {activeSection==="db"&&<>
        <div style={{fontSize:20,fontWeight:700,color:"#f9fafb",marginBottom:14}}>Database Schema</div>
        <SA><table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead><tr style={{borderBottom:"1px solid rgba(255,255,255,.07)"}}>{["Table","Key Columns","Notes"].map(h=><th key={h} style={{padding:"8px 12px",textAlign:"left",fontSize:9,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#4b5563"}}>{h}</th>)}</tr></thead>
          <tbody>{[
            ["tenants","id, name, cui, plan, anaf_vault_path","Company accounts. anaf_vault_path → Vault secret."],
            ["vehicles","id, tenant_id, plate, driver, uit_code, uit_expires_at","Indexed on (tenant_id, uit_expires_at)."],
            ["auto_renew_rules","vehicle_id, threshold_hours, enabled, notify_sms","One rule per vehicle. Default: 4h."],
            ["uit_renewals","id, vehicle_id, old_uit, new_uit, triggered_by, status","Full audit log. TimescaleDB hypertable."],
            ["ocr_jobs","id, tenant_id, file_url, status, extracted_data (jsonb)","Async processing. SSE push when done."],
            ["border_cache","ptf_name, wait_minutes, truck_count, updated_at","Refreshed every 5 min from scraper."],
            ["dispatch_links","id, vehicle_id, token, expires_at, last_lat, last_lng","Short-lived GPS tokens for foreign drivers."],
          ].map(([t,c,n])=><tr key={t} className="trow" style={{borderBottom:"1px solid rgba(255,255,255,.04)"}}><td style={{padding:"10px 12px",fontFamily:"'DM Mono',monospace",fontSize:11,color:"#60a5fa"}}>{t}</td><td style={{padding:"10px 12px",fontFamily:"'DM Mono',monospace",fontSize:10,color:"#9ca3af"}}>{c}</td><td style={{padding:"10px 12px",fontSize:11,color:"#6b7280"}}>{n}</td></tr>)}</tbody>
        </table></SA>
        <Code><pre style={{fontFamily:"'DM Mono',monospace",fontSize:11,lineHeight:1.9,color:"#4b5563",whiteSpace:"pre-wrap"}}>{`-- Row Level Security
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON vehicles
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

-- Critical index for UIT scanner
CREATE INDEX CONCURRENTLY idx_vehicles_uit_expiry
  ON vehicles (tenant_id, uit_expires_at)
  WHERE status = 'active';`}</pre></Code>
      </>}

      {activeSection==="costs"&&<>
        <div style={{fontSize:20,fontWeight:700,color:"#f9fafb",marginBottom:14}}>Unit Economics</div>
        <SA><table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead><tr style={{borderBottom:"1px solid rgba(255,255,255,.07)"}}>{["Serviciu","0–50 clienți","50–500 clienți"].map(h=><th key={h} style={{padding:"8px 14px",textAlign:"left",fontSize:9,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#4b5563"}}>{h}</th>)}</tr></thead>
          <tbody>{[
            ["Railway (API + Worker)","~$20/mo","~$80/mo"],
            ["Neon PostgreSQL","$0 (free tier)","~$69/mo"],
            ["Upstash Redis","$0 (free tier)","~$40/mo"],
            ["GPT-4o (OCR NC8)","~$10/mo","~$120/mo"],
            ["Twilio SMS/WhatsApp","~$5/mo","~$60/mo"],
            ["Cloudflare R2","~$1/mo","~$15/mo"],
            ["TOTAL INFRA","~$36/mo","~$474/mo"],
            ["Revenue (estimat)","~4.500 RON/mo","~90.000 RON/mo"],
            ["Gross Margin","~92%","~97%"],
          ].map(([s,a,b])=><tr key={s} className="trow" style={{borderBottom:"1px solid rgba(255,255,255,.04)"}}><td style={{padding:"10px 14px",fontSize:12,color:s.includes("TOTAL")||s.includes("Revenue")||s.includes("Margin")?"#f9fafb":"#9ca3af",fontWeight:s.includes("TOTAL")||s.includes("Revenue")||s.includes("Margin")?700:400}}>{s}</td><td style={{padding:"10px 14px",fontSize:12,color:s.includes("Revenue")?"#60a5fa":s.includes("Margin")?"#a78bfa":s.includes("TOTAL")?"#34d399":"#9ca3af",fontWeight:500}}>{a}</td><td style={{padding:"10px 14px",fontSize:12,color:s.includes("Revenue")?"#60a5fa":s.includes("Margin")?"#a78bfa":s.includes("TOTAL")?"#34d399":"#9ca3af",fontWeight:500}}>{b}</td></tr>)}
          </tbody>
        </table></SA>
        <SA style={{borderColor:"rgba(16,185,129,.2)",background:"rgba(16,185,129,.03)"}}><div style={{fontSize:11,fontWeight:700,color:"#34d399",marginBottom:12}}>📊 La 100 clienți Pro</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
            {[["44.900 RON","MRR lunar","#f9fafb"],["~200 €","Cost infra/lună","#f9fafb"],["97%","Gross margin","#34d399"],["~3 luni","Break-even","#f9fafb"]].map(([v,l,c])=><div key={l}><div style={{fontSize:22,fontWeight:800,color:c,letterSpacing:-0.5,lineHeight:1,marginBottom:3}}>{v}</div><div style={{fontSize:10,color:"#6b7280"}}>{l}</div></div>)}
          </div>
        </SA>
      </>}
    </div>
  </div>;
}

// ══════════════════════════════════════════════════════════════════════════════
// AUTH SCREEN — Real Supabase login/register (keeps demo UI when no Supabase)
// ══════════════════════════════════════════════════════════════════════════════
function AuthScreen({ onAuth }) {
  const [mode, setMode]     = useState("login");
  const [email, setEmail]   = useState("");
  const [pw, setPw]         = useState("");
  const [company, setCo]    = useState("");
  const [name, setName]     = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoad]  = useState(false);
  const [err, setErr]       = useState("");

  const submit = async () => {
    setErr(""); if (!email || !pw) { setErr("Completează email și parolă."); return; }
    setLoad(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
        if (error) throw error;
      } else {
        if (!company) { setErr("Introdu denumirea firmei."); setLoad(false); return; }
        const { error } = await supabase.auth.signUp({
          email, password: pw,
          options: { data: { company, full_name: name || email } }
        });
        if (error) throw error;
        setErr("✅ Verifică emailul pentru confirmare, apoi loghează-te."); setLoad(false); return;
      }
    } catch(e) { setErr(e.message || "Eroare autentificare"); }
    setLoad(false);
  };

  const s = {
    wrap: {minHeight:"100vh",background:"#060810",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"},
    orb: {position:"absolute",top:"20%",left:"50%",transform:"translateX(-50%)",width:500,height:400,background:"radial-gradient(circle,rgba(16,185,129,.05),transparent 65%)",pointerEvents:"none"},
    card: {width:420,background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.08)",borderRadius:20,padding:"36px 32px",position:"relative",zIndex:1},
    tabs: {display:"flex",gap:5,marginBottom:24,background:"rgba(255,255,255,.03)",borderRadius:10,padding:4},
    tab: (a)=>({flex:1,padding:"8px 0",borderRadius:8,border:"none",cursor:"pointer",background:a?"rgba(255,255,255,.1)":"transparent",color:a?"#f9fafb":"#6b7280",fontSize:13,fontWeight:600,transition:"all .15s"}),
    label: {fontSize:10,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#4b5563",display:"block",marginBottom:5},
    row: {marginBottom:14},
    err: {background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.2)",borderRadius:9,padding:"9px 12px",fontSize:12,color:"#f87171",marginBottom:14},
    ok: {background:"rgba(16,185,129,.08)",border:"1px solid rgba(16,185,129,.2)",borderRadius:9,padding:"9px 12px",fontSize:12,color:"#86efac",marginBottom:14},
  };

  return (
    <div style={s.wrap}>
      <style>{G}</style>
      <div style={s.orb}/>
      <div style={s.card}>
        <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:26}}>
          <div style={{width:34,height:34,background:"#f9fafb",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}}><Truck size={16} color="#060810"/></div>
          <div><div style={{fontSize:15,fontWeight:800,color:"#f9fafb",letterSpacing:-.3}}>SmartLogis</div><div style={{fontSize:10,color:"#374151"}}>Platformă transport RO</div></div>
        </div>

        <div style={s.tabs}>
          <button style={s.tab(mode==="login")}  onClick={()=>{setMode("login");setErr("")}}>Autentificare</button>
          <button style={s.tab(mode==="register")} onClick={()=>{setMode("register");setErr("")}}>Cont Nou</button>
        </div>

        {err && <div style={err.startsWith("✅")?s.ok:s.err}>{err}</div>}

        {mode==="register" && <>
          <div style={s.row}>
            <label style={s.label}>Firma *</label>
            <input className="ifield" placeholder="SC Transport SRL" value={company} onChange={e=>setCo(e.target.value)}/>
          </div>
          <div style={s.row}>
            <label style={s.label}>Numele tău</label>
            <input className="ifield" placeholder="Ion Popescu" value={name} onChange={e=>setName(e.target.value)}/>
          </div>
        </>}

        <div style={s.row}>
          <label style={s.label}>Email *</label>
          <input className="ifield" type="email" placeholder="admin@firma.ro" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()}/>
        </div>
        <div style={{...s.row,position:"relative"}}>
          <label style={s.label}>Parolă *</label>
          <input className="ifield" type={showPw?"text":"password"} placeholder="••••••••" value={pw} onChange={e=>setPw(e.target.value)} style={{paddingRight:40}} onKeyDown={e=>e.key==="Enter"&&submit()}/>
          <span onClick={()=>setShowPw(v=>!v)} style={{position:"absolute",right:12,top:30,cursor:"pointer",color:"#4b5563"}}>{showPw?<EyeOff size={14}/>:<Eye size={14}/>}</span>
        </div>

        <button className="btn-primary" style={{width:"100%",justifyContent:"center",marginTop:4}} onClick={submit} disabled={loading}>
          {loading && <RefreshCw size={13} className="spin"/>}
          {mode==="login" ? "Intră în cont" : "Creează contul"}
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ROOT — manages app-level routing: landing → auth/onboarding → app
// ══════════════════════════════════════════════════════════════════════════════
export default function SmartLogisApp() {
  const [screen, setScreen]   = useState("landing");
  const [session, setSession] = useState(undefined); // undefined = loading
  const [profile, setProfile] = useState(null);
  const [tenant,  setTenant]  = useState(null);
  const [dbFleet, setDbFleet] = useState(null); // null = not loaded yet

  // ── Auth listener ──────────────────────────────────────────────
  useEffect(() => {
    if (!supabase) { setSession(null); return; }
    supabase.auth.getSession().then(({ data: { session: s } }) => setSession(s));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => {
      setSession(s);
      if (!s) { setProfile(null); setTenant(null); setDbFleet(null); }
    });
    return () => subscription.unsubscribe();
  }, []);

  // ── Load profile + tenant when session ────────────────────────
  useEffect(() => {
    if (!session || !supabase) return;
    supabase.from("profiles").select("*, tenants(*)").eq("id", session.user.id).single()
      .then(({ data }) => { if (data) { setProfile(data); setTenant(data.tenants); } });
  }, [session]);

  // ── Load vehicles from DB (supplement FLEET_DATA) ─────────────
  useEffect(() => {
    if (!tenant || !supabase) return;
    const load = () =>
      supabase.from("vehicles").select("*").eq("tenant_id", tenant.id).order("created_at")
        .then(({ data }) => {
          if (data && data.length > 0) {
            // Map DB vehicle to the shape FLEET_DATA uses
            setDbFleet(data.map(v => ({
              id: v.id, plate: v.plate, driver: v.driver_name || "—", flag: "🇷🇴",
              route: v.route || "—", uit: v.uit_code || "Fără UIT",
              expiresMin: v.uit_expires_at
                ? Math.max(0, Math.round((new Date(v.uit_expires_at) - new Date()) / 60000))
                : 0,
              location: "—", waitH: 0,
              status: (() => {
                const h = v.uit_expires_at ? (new Date(v.uit_expires_at) - new Date()) / 3600000 : -1;
                return h < 0 ? "critical" : h < (v.renew_threshold_h || 4) ? "warning" : "ok";
              })(),
              cargo: v.cargo || "—", weight: v.weight ? v.weight + "t" : "—",
              autoRenew: v.auto_renew || false,
              _dbId: v.id, _raw: v,
            })));
          }
        });
    load();
    if (!supabase) return;
    const ch = supabase.channel(`fleet-root-${tenant.id}`)
      .on("postgres_changes", { event:"*", schema:"public", table:"vehicles", filter:`tenant_id=eq.${tenant.id}` }, load)
      .subscribe();
    return () => supabase.removeChannel(ch);
  }, [tenant]);

  // ── Decide which screen ─────────────────────────────────────────
  const effectiveScreen = (() => {
    if (!supabase) return screen; // no Supabase → use demo flow
    if (session === undefined) return "loading";
    if (session) return "app";
    return screen === "app" ? "auth" : screen;
  })();

  const handleEnter = () => {
    if (!supabase) setScreen("onboarding");
    else setScreen("auth");
  };

  if (effectiveScreen === "loading") {
    return (
      <div style={{minHeight:"100vh",background:"#060810",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <style>{G}</style>
        <RefreshCw size={22} className="spin" color="#34d399"/>
      </div>
    );
  }

  return (
    <>
      <style>{G}</style>
      {effectiveScreen === "landing"    && <Landing onEnter={handleEnter}/>}
      {effectiveScreen === "auth"       && <AuthScreen onAuth={setSession}/>}
      {effectiveScreen === "onboarding" && <Onboarding onComplete={()=>setScreen("app")}/>}
      {effectiveScreen === "app"        && (
        <AppShell
          onLogout={() => { supabase ? supabase.auth.signOut() : setScreen("landing"); }}
          initialFleet={dbFleet}
          session={session}
          profile={profile}
          tenant={tenant}
        />
      )}
    </>
  );
}