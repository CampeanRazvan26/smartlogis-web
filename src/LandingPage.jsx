/*
import { useState } from "react";
import {
  Truck, Zap, Shield, ScanLine, Navigation, BarChart3,
  ChevronRight, Check, ArrowRight, Star, Menu, X,
  Mail, Phone, MapPin, MessageSquare, Send, RefreshCw,
  CheckCircle, XCircle, Globe, Users, Clock, AlertTriangle
} from "lucide-react";

const G = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'DM Sans',sans-serif;background:#060810;color:#f9fafb;overflow-x:hidden;}
::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:#1e2535;border-radius:4px;}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
@keyframes pulseRing{0%{transform:scale(.8);opacity:1}100%{transform:scale(2.2);opacity:0}}
.fu{animation:fadeUp .5s ease both;}
.fu1{animation:fadeUp .5s .1s ease both;}
.fu2{animation:fadeUp .5s .2s ease both;}
.fu3{animation:fadeUp .5s .3s ease both;}
.fu4{animation:fadeUp .5s .4s ease both;}
.spin{animation:spin .7s linear infinite;}
.glass{background:rgba(255,255,255,.025);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.07);}
.ifield{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:10px;padding:11px 14px;font-size:13px;color:#f9fafb;outline:none;font-family:'DM Sans',sans-serif;transition:border-color .2s,box-shadow .2s;}
.ifield:focus{border-color:rgba(52,211,153,.35);box-shadow:0 0 0 3px rgba(52,211,153,.07);}
.ifield::placeholder{color:#374151;}
select.ifield option{background:#0b0f1a;}
.btn-primary{cursor:pointer;background:linear-gradient(135deg,#34d399,#10b981);color:#022c22;border:none;border-radius:12px;padding:13px 28px;font-size:14px;font-weight:700;display:inline-flex;align-items:center;gap:8px;transition:all .2s cubic-bezier(.34,1.56,.64,1);box-shadow:0 4px 20px rgba(16,185,129,.3);user-select:none;}
.btn-primary:hover{transform:translateY(-2px) scale(1.02);box-shadow:0 8px 32px rgba(16,185,129,.45);}
.btn-primary:active{transform:translateY(1px) scale(.97);}
.btn-ghost{cursor:pointer;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:10px 20px;font-size:13px;font-weight:600;color:#9ca3af;transition:all .2s;user-select:none;}
.btn-ghost:hover{background:rgba(255,255,255,.09);color:#e5e7eb;transform:translateY(-1px);}
.feature-card{background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07);border-radius:20px;padding:28px;transition:all .3s cubic-bezier(.4,0,.2,1);position:relative;overflow:hidden;}
.feature-card:hover{transform:translateY(-4px);border-color:rgba(255,255,255,.15);box-shadow:0 20px 60px rgba(0,0,0,.4);}
.plan-card{background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07);border-radius:22px;padding:32px;transition:all .3s;position:relative;overflow:hidden;}
.plan-card.popular{border-color:rgba(52,211,153,.4);animation:none;}
.plan-card:hover{transform:translateY(-4px);}
.nav-link{font-size:13px;font-weight:500;color:#6b7280;cursor:pointer;transition:color .15s;background:none;border:none;}
.nav-link:hover{color:#e5e7eb;}
.badge{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;}
`;

const FEATURES = [
  { icon: Zap, color: "#34d399", bg: "rgba(16,185,129,.1)", brd: "rgba(16,185,129,.2)", title: "Auto-Reînnoire UIT", desc: "Singura platformă din România care reînnoiește automat codul UIT înainte să expire. Zero click, zero amendă." },
  { icon: ScanLine, color: "#60a5fa", bg: "rgba(59,130,246,.1)", brd: "rgba(59,130,246,.2)", title: "OCR Documente AI", desc: "Fotografiezi CMR-ul sau factura, AI-ul extrage automat toate datele și generează codul NC8." },
  { icon: Navigation, color: "#a78bfa", bg: "rgba(167,139,250,.1)", brd: "rgba(167,139,250,.2)", title: "Tracking GPS Live", desc: "Hartă în timp real cu toată flota. Linkuri GPS pentru șoferi externi — funcționează din browser, fără aplicație." },
  { icon: Shield, color: "#fbbf24", bg: "rgba(245,158,11,.1)", brd: "rgba(245,158,11,.2)", title: "e-Factura ANAF", desc: "Generare XML UBL 2.1 și transmitere automată în SPV. Facturi acceptate ANAF fără bătăi de cap." },
  { icon: BarChart3, color: "#f87171", bg: "rgba(239,68,68,.1)", brd: "rgba(239,68,68,.2)", title: "Dashboard Flotă", desc: "KPI-uri live, status vamă în timp real, alerte critice și rapoarte complete — tot într-un singur loc." },
  { icon: Globe, color: "#34d399", bg: "rgba(16,185,129,.1)", brd: "rgba(16,185,129,.2)", title: "Stare Puncte Vamă", desc: "Timpii de așteptare la toate punctele de trecere a frontierei, actualizați automat la 15 minute." },
];

const PLANS = [
  { name: "Starter", monthly: 149, annual: 119, color: "#6b7280", vehicles: "până la 5 vehicule", popular: false,
    features: ["Dashboard flotă live", "Alerte UIT expirare", "OCR documente (50/lună)", "Dispecerat extern SMS", "Stare vamă live"],
    missing: ["Auto-reînnoire UIT", "API ANAF direct", "Rapoarte avansate"], cta: "Încearcă Gratuit 14 Zile" },
  { name: "Pro", monthly: 449, annual: 359, color: "#34d399", vehicles: "până la 25 vehicule", popular: true,
    features: ["Dashboard flotă live", "Alerte UIT expirare", "OCR documente (500/lună)", "Dispecerat SMS + WhatsApp", "Auto-reînnoire UIT ⚡", "API ANAF direct", "Rapoarte avansate + export", "5 utilizatori"],
    missing: [], cta: "Activează Pro" },
  { name: "Enterprise", monthly: null, annual: null, color: "#a78bfa", vehicles: "vehicule nelimitate", popular: false,
    features: ["Tot din Pro, plus:", "Vehicule nelimitate", "OCR nelimitat", "Utilizatori nelimitați", "Reguli auto-reînnoire custom", "Integrare ERP / TMS", "White-label dashboard", "SLA 99.9% + suport 24/7"],
    missing: [], cta: "Contactează Sales" },
];

const TESTIMONIALS = [
  { name: "Bogdan Mureșan", role: "Director Operațional, Trans Mureș SRL", text: "În 3 luni de SmartLogis nu am mai avut nicio amendă pentru UIT expirat. Motorul auto-reînnoire funcționează perfect chiar și noaptea.", stars: 5 },
  { name: "Ioana Constantin", role: "Dispecer, Euro Cargo Logistics", text: "OCR-ul AI ne-a salvat 2-3 ore pe zi. Fotografiem CMR-ul și în 10 secunde avem toate datele introduse automat.", stars: 5 },
  { name: "Marian Dumitrescu", role: "Administrator, MD Transport 2010 SRL", text: "Am integrat cu ANAF în mai puțin de o zi. Facturile merg automat în SPV, nu mai stau eu să le trimit manual.", stars: 5 },
];

export default function LandingPage({ onEnter }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [billing, setBilling] = useState("monthly");
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  const sendContact = async () => {
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setSending(true);
    await new Promise(r => setTimeout(r, 1200));
    setSent(true); setSending(false);
  };

  return (
    <div style={{ background: "#060810", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{G}</style>

      {/* ── NAVBAR ── }
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 999, background: "rgba(6,8,16,.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,.06)", height: 58 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          { Logo }
          <div style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer" }} onClick={() => scrollTo("hero")}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center" }}><Truck size={15} color="#060810" /></div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#f9fafb", letterSpacing: -0.5 }}>SmartLogis</div>
            <span className="badge" style={{ background: "rgba(16,185,129,.1)", color: "#34d399", border: "1px solid rgba(16,185,129,.2)", fontSize: 8 }}>BETA</span>
          </div>
          { Links desktop }
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {[["Funcții", "features"], ["Prețuri", "pricing"], ["Testimoniale", "testimonials"], ["Contact", "contact"]].map(([l, id]) => (
              <button key={id} className="nav-link" onClick={() => scrollTo(id)} style={{ padding: "7px 12px" }}>{l}</button>
            ))}
          </div>
          { CTA }
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <button className="btn-ghost" onClick={onEnter} style={{ padding: "7px 16px", fontSize: 12 }}>Autentificare</button>
            <button className="btn-primary" onClick={onEnter} style={{ padding: "8px 18px", fontSize: 12, borderRadius: 20 }}>Încearcă Gratuit</button>
          </div>
        </div>
      </nav>

      { ── HERO ── }
      <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 24px 40px", position: "relative", overflow: "hidden" }}>
        {BG orbs }
        <div style={{ position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, background: "radial-gradient(circle,rgba(16,185,129,.07),transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "30%", right: "10%", width: 300, height: 300, background: "radial-gradient(circle,rgba(59,130,246,.05),transparent 70%)", pointerEvents: "none" }} />
        { Grid }
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.012) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

        <div style={{ textAlign: "center", maxWidth: 760, position: "relative" }}>
          <div className="fu" style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(16,185,129,.08)", border: "1px solid rgba(16,185,129,.2)", borderRadius: 20, padding: "5px 14px", marginBottom: 24 }}>
            <div style={{ position: "relative", width: 7, height: 7 }}>
              <div style={{ width: 7, height: 7, background: "#34d399", borderRadius: "50%", position: "absolute" }} />
              <div style={{ width: 7, height: 7, background: "#34d399", borderRadius: "50%", position: "absolute", animation: "pulseRing 1.5s ease-out infinite" }} />
            </div>
            <span style={{ fontSize: 11, color: "#34d399", fontWeight: 600 }}>Prima platformă AI pentru transport rutier România</span>
          </div>

          <h1 className="fu1" style={{ fontFamily: "'Instrument Serif',serif", fontSize: "clamp(42px,6vw,78px)", fontWeight: 400, color: "#f9fafb", letterSpacing: -3, lineHeight: 1.05, marginBottom: 20 }}>
            Niciodată amendă<br />
            <span style={{ fontStyle: "italic", background: "linear-gradient(135deg,#34d399,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>pentru UIT expirat.</span>
          </h1>

          <p className="fu2" style={{ fontSize: 17, color: "#6b7280", lineHeight: 1.75, marginBottom: 36, maxWidth: 560, margin: "0 auto 36px" }}>
            SmartLogis reînnoiește automat codurile UIT, trimite facturi la ANAF și îți arată flota în timp real — tot ce ai nevoie pentru transport rutier legal în România.
          </p>

          <div className="fu3" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
            <button className="btn-primary" onClick={onEnter} style={{ fontSize: 14, padding: "14px 32px", borderRadius: 14 }}>
              Încearcă Gratuit 14 Zile <ArrowRight size={15} />
            </button>
            <button className="btn-ghost" onClick={() => scrollTo("features")} style={{ fontSize: 13, padding: "14px 24px" }}>
              Vezi Funcțiile
            </button>
          </div>

          { Stats }
          <div className="fu4" style={{ display: "flex", gap: 40, justifyContent: "center", flexWrap: "wrap" }}>
            {[["0", "Amenzi pentru clienții noștri"], ["15 min", "Interval scanare UIT"], ["< 3s", "Reînnoire automată ANAF"], ["99.9%", "Uptime garantat"]].map(([v, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 26, fontWeight: 800, color: "#f9fafb", letterSpacing: -1 }}>{v}</div>
                <div style={{ fontSize: 11, color: "#4b5563", marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      { ── FEATURES ── }
      <section id="features" style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div className="badge" style={{ background: "rgba(59,130,246,.08)", border: "1px solid rgba(59,130,246,.2)", color: "#60a5fa", marginBottom: 16 }}>Funcționalități</div>
          <h2 style={{ fontFamily: "'Instrument Serif',serif", fontSize: "clamp(32px,4vw,52px)", color: "#f9fafb", letterSpacing: -2, marginBottom: 12 }}>Tot ce ai nevoie.<br /><em style={{ fontStyle: "italic" }}>Nimic în plus.</em></h2>
          <p style={{ fontSize: 15, color: "#6b7280", maxWidth: 500, margin: "0 auto" }}>Construit specific pentru firmele de transport din România, cu integrări legale complete.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 16 }}>
          {FEATURES.map((f, i) => (
            <div key={f.title} className="feature-card" style={{ animationDelay: `${i * 0.08}s` }}>
              <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, background: `radial-gradient(circle,${f.bg},transparent 70%)`, pointerEvents: "none" }} />
              <div style={{ width: 44, height: 44, borderRadius: 13, background: f.bg, border: `1px solid ${f.brd}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, boxShadow: `0 8px 24px ${f.bg}` }}>
                <f.icon size={19} color={f.color} />
              </div>
              <div style={{ fontFamily: "'Instrument Serif',serif", fontSize: 20, color: "#f9fafb", marginBottom: 8, letterSpacing: -0.3 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      { ── PRICING ── 
      <section id="pricing" style={{ padding: "80px 24px", background: "rgba(255,255,255,.01)", borderTop: "1px solid rgba(255,255,255,.05)", borderBottom: "1px solid rgba(255,255,255,.05)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="badge" style={{ background: "rgba(167,139,250,.08)", border: "1px solid rgba(167,139,250,.2)", color: "#a78bfa", marginBottom: 16 }}>Prețuri</div>
            <h2 style={{ fontFamily: "'Instrument Serif',serif", fontSize: "clamp(32px,4vw,52px)", color: "#f9fafb", letterSpacing: -2, marginBottom: 16 }}>Simplu și transparent.</h2>
            <div style={{ display: "inline-flex", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 12, padding: 4, gap: 4 }}>
              {["monthly", "annual"].map(b => (
                <button key={b} onClick={() => setBilling(b)} style={{ padding: "7px 20px", borderRadius: 9, border: "none", cursor: "pointer", background: billing === b ? "rgba(255,255,255,.1)" : "none", color: billing === b ? "#f9fafb" : "#6b7280", fontSize: 12, fontWeight: 600, transition: "all .15s" }}>
                  {b === "monthly" ? "Lunar" : "Anual"}{b === "annual" && <span style={{ color: "#34d399", marginLeft: 5, fontSize: 10 }}>-20%</span>}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 16, alignItems: "start" }}>
            {PLANS.map((p, i) => (
              <div key={p.name} className={`plan-card${p.popular ? " popular" : ""}`} style={{ animationDelay: `${i * 0.1}s` }}>
                {p.popular && <div style={{ position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(90deg,#34d399,#10b981)", color: "#022c22", fontSize: 9, fontWeight: 800, padding: "3px 14px", borderRadius: "0 0 10px 10px", letterSpacing: ".06em", textTransform: "uppercase" }}>CEL MAI POPULAR</div>}
                <div style={{ marginTop: p.popular ? 12 : 0 }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: p.color, marginBottom: 4 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: "#4b5563", marginBottom: 20 }}>{p.vehicles}</div>
                  {p.monthly ? (
                    <div style={{ marginBottom: 24 }}>
                      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 38, fontWeight: 800, color: "#f9fafb", letterSpacing: -1 }}>{billing === "monthly" ? p.monthly : p.annual}</span>
                      <span style={{ fontSize: 13, color: "#6b7280", marginLeft: 4 }}>RON/lună</span>
                    </div>
                  ) : (
                    <div style={{ fontSize: 28, fontWeight: 800, color: "#f9fafb", marginBottom: 24, fontFamily: "'Instrument Serif',serif" }}>Preț personalizat</div>
                  )}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                    {p.features.map(f => <div key={f} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 12, color: "#9ca3af" }}><Check size={13} color={p.color} />{f}</div>)}
                    {p.missing.map(f => <div key={f} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 12, color: "#374151", textDecoration: "line-through" }}><X size={13} color="#374151" />{f}</div>)}
                  </div>
                  <button className={p.popular ? "btn-primary" : "btn-ghost"} onClick={onEnter} style={{ width: "100%", justifyContent: "center", borderRadius: 11, padding: "13px 0", fontSize: 13 }}>
                    {p.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {── TESTIMONIALS ── }
      <section id="testimonials" style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div className="badge" style={{ background: "rgba(245,158,11,.08)", border: "1px solid rgba(245,158,11,.2)", color: "#fbbf24", marginBottom: 16 }}>Testimoniale</div>
          <h2 style={{ fontFamily: "'Instrument Serif',serif", fontSize: "clamp(28px,4vw,48px)", color: "#f9fafb", letterSpacing: -1.5 }}>Ce spun clienții noștri</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 16 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 18, padding: "24px", display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", gap: 2 }}>{[...Array(t.stars)].map((_, j) => <Star key={j} size={13} fill="#fbbf24" color="#fbbf24" />)}</div>
              <p style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.75, flex: 1, fontStyle: "italic" }}>"{t.text}"</p>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#f9fafb" }}>{t.name}</div>
                <div style={{ fontSize: 11, color: "#4b5563" }}>{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      { ── CONTACT ── }
      <section id="contact" style={{ padding: "80px 24px", background: "rgba(255,255,255,.01)", borderTop: "1px solid rgba(255,255,255,.05)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 28, alignItems: "start" }}>
          <div>
            <div className="badge" style={{ background: "rgba(16,185,129,.08)", border: "1px solid rgba(16,185,129,.2)", color: "#34d399", marginBottom: 20 }}>Contact</div>
            <h2 style={{ fontFamily: "'Instrument Serif',serif", fontSize: "clamp(28px,3.5vw,44px)", color: "#f9fafb", letterSpacing: -1.5, marginBottom: 16, lineHeight: 1.1 }}>Suntem<br /><em style={{ fontStyle: "italic" }}>aici pentru tine.</em></h2>
            <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.75, marginBottom: 28 }}>Ai întrebări despre platformă, prețuri sau implementare? Echipa SmartLogis îți răspunde în maxim 2 ore.</p>
            {[{ icon: Mail, c: "#34d399", bg: "rgba(16,185,129,.1)", l: "Email", v: "contact@smartlogis.ro" }, { icon: Phone, c: "#60a5fa", bg: "rgba(59,130,246,.1)", l: "Telefon", v: "+40 264 000 123" }, { icon: MapPin, c: "#a78bfa", bg: "rgba(167,139,250,.1)", l: "Birou", v: "Cluj-Napoca, România" }].map(c => (
              <div key={c.l} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><c.icon size={15} color={c.c} /></div>
                <div><div style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#374151", marginBottom: 2 }}>{c.l}</div><div style={{ fontSize: 13, fontWeight: 600, color: "#e5e7eb" }}>{c.v}</div></div>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 20, padding: 28 }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(16,185,129,.1)", border: "2px solid rgba(16,185,129,.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><CheckCircle size={26} color="#34d399" /></div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#f9fafb", marginBottom: 8 }}>Mesaj trimis!</div>
                <div style={{ fontSize: 13, color: "#6b7280" }}>Îți răspundem în max. 2 ore în zilele lucrătoare.</div>
                <button className="btn-ghost" onClick={() => setSent(false)} style={{ marginTop: 20, fontSize: 12 }}>Trimite alt mesaj</button>
              </div>
            ) : (
              <>
                <div style={{ fontFamily: "'Instrument Serif',serif", fontSize: 20, color: "#f9fafb", marginBottom: 4 }}>Trimite un mesaj</div>
                <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 20 }}>Completează formularul și te contactăm noi.</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                  {[["Nume complet *", "Ion Popescu", "name", "text"], ["Email *", "ion@firma.ro", "email", "email"]].map(([l, ph, k, t]) => (
                    <div key={k}>
                      <label style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#4b5563", display: "block", marginBottom: 5 }}>{l}</label>
                      <input className="ifield" type={t} placeholder={ph} value={contactForm[k]} onChange={e => setContactForm(d => ({ ...d, [k]: e.target.value }))} />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#4b5563", display: "block", marginBottom: 5 }}>Mesaj *</label>
                    <textarea className="ifield" rows={4} placeholder="Descrie situația sau întrebarea ta..." value={contactForm.message} onChange={e => setContactForm(d => ({ ...d, message: e.target.value }))} style={{ resize: "vertical" }} />
                  </div>
                  <button className="btn-primary" onClick={sendContact} disabled={sending || !contactForm.name || !contactForm.email || !contactForm.message} style={{ width: "100%", justifyContent: "center", borderRadius: 11, padding: "13px 0", opacity: (!contactForm.name || !contactForm.email || !contactForm.message) ? 0.5 : 1 }}>
                    {sending ? <><RefreshCw size={13} className="spin" />Se trimite...</> : <><Send size={13} />Trimite Mesajul</>}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      { ── FOOTER ── }
      <footer style={{ borderTop: "1px solid rgba(255,255,255,.05)", padding: "32px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center" }}><Truck size={13} color="#060810" /></div>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#9ca3af" }}>SmartLogis</span>
          </div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {["Termeni și Condiții", "Politica de Confidențialitate", "GDPR", "Suport"].map(l => (
              <span key={l} style={{ fontSize: 11, color: "#374151", cursor: "pointer", transition: "color .15s" }}
                onMouseEnter={e => e.target.style.color = "#9ca3af"} onMouseLeave={e => e.target.style.color = "#374151"}>{l}</span>
            ))}
          </div>
          <div style={{ fontSize: 11, color: "#1f2937" }}>© 2025 SmartLogis SRL · Cluj-Napoca, România</div>
        </div>
      </footer>
    </div>
  );
}
*/