// src/components/PostHeroSection.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Container, Row, Col, Card, Button, Badge, Stack, Image,
  Modal, Form, Table, Accordion, Alert, Carousel, CloseButton
} from "react-bootstrap";

export default function PostHeroSection() {
  /* ===================== THEME (inline) ===================== */
  const theme = {
    ink: "#0f172a",
    sub: "#64748b",
    line: "#e5e7eb",
    bgAlt: "#f8fafc",
    brandA: "#6d28d9",
    brandB: "#2563eb",
    grad: "linear-gradient(90deg,#6d28d9 0%,#2563eb 100%)",
  };

  // spacing & helpers
  const s = { section: { padding: "72px 0", position: "relative", background: "#fff" } };
  const sAlt = { ...s.section, background: theme.bgAlt };
  const chip = { fontSize: 12, padding: "6px 10px", borderRadius: 999, border: `1px solid ${theme.line}`, background: "#fff" };
  const pill = { padding: "6px 12px", borderRadius: 999, border: `1px solid ${theme.line}`, background: "#fff" };

  /* ===================== NEW CONTENT (aligned to your new nav/services) ===================== */
  const solutions = [
    {
      key: "traffic",
      tag: "Acquisition",
      icon: "bi-speedometer2",
      title: "Traffic Acceleration",
      desc: "Compounding qualified reach via SEO, Paid, and creator loops.",
      bullets: ["Topic clusters", "Guardrailed PMax", "UGC sprints"],
      img: "https://picsum.photos/seed/901/1200/800",
    },
    {
      key: "conversion",
      tag: "CRO",
      icon: "bi-bullseye",
      title: "Conversion Engine",
      desc: "Landing systems, heuristic+A/B sprints, funnel repair.",
      bullets: ["LP library", "A/B cadence", "Form & PDP fixes"],
      img: "https://picsum.photos/seed/902/1200/800",
    },
    {
      key: "ai",
      tag: "Automation",
      icon: "bi-cpu",
      title: "AI-Powered Marketing",
      desc: "Predictive audiences, AI message testing, creative scoring.",
      bullets: ["Predictive segments", "Variant generation", "Creative QA"],
      img: "https://picsum.photos/seed/903/1200/800",
    },
    {
      key: "retention",
      tag: "Lifecycle",
      icon: "bi-arrow-repeat",
      title: "Retention & Loyalty",
      desc: "Email/SMS flows, cohorts & LTV compounding playbooks.",
      bullets: ["RFM segments", "Template kits", "Deliverability ops"],
      img: "https://picsum.photos/seed/904/1200/800",
    },
    {
      key: "community",
      tag: "Social",
      icon: "bi-people",
      title: "Influencer & Community",
      desc: "Creator pods and social flywheels that sustain momentum.",
      bullets: ["Micro-KOL pods", "Ambassador kits", "UGC pipelines"],
      img: "https://picsum.photos/seed/905/1200/800",
    },
  ];

  const industries = [
    { tag: "SaaS", title: "SaaS Growth Lab", img: "https://picsum.photos/seed/ind1/1200/800" },
    { tag: "D2C", title: "eCommerce Accelerator", img: "https://picsum.photos/seed/ind2/1200/800" },
    { tag: "Care", title: "Healthcare Digital Trust", img: "https://picsum.photos/seed/ind3/1200/800" },
    { tag: "Prop", title: "Real Estate Funnels", img: "https://picsum.photos/seed/ind4/1200/800" },
    { tag: "Local", title: "Local Domination", img: "https://picsum.photos/seed/ind5/1200/800" },
    { tag: "B2B", title: "B2B Demand", img: "https://picsum.photos/seed/ind6/1200/800" },
  ];

  const kpis = [
    { k: "10–14 days", v: "To first ship", icon: "bi-rocket-takeoff" },
    { k: "3.0×", v: "Median ROAS uplift", icon: "bi-graph-up-arrow" },
    { k: "+2.1%", v: "CR uplift (CRO)", icon: "bi-bar-chart" },
    { k: "18%", v: "Email revenue share", icon: "bi-envelope-paper" },
  ];

  const testimonials = [
    { name: "Priya Sharma", role: "Head of Growth", text: "Traffic + Conversion gave us momentum in 2 weeks—weekly ships, no fluff." },
    { name: "Arjun Mehta", role: "Founder, SaaS", text: "AI-assisted messaging stabilized CAC. Finally scalable." },
    { name: "Neha Gupta", role: "Marketing Lead", text: "Lifecycle + CRO compounded revenue with clean dashboards." },
  ];

  const plans = [
    { name: "Starter",    price: 24000, points: ["1 pod", "SEO or Paid basic", "Monthly readout", "Email support"] },
    { name: "Growth",     price: 59000, points: ["2–3 pods", "CRO tests", "Lifecycle flows", "Weekly dashboard"], popular: true },
    { name: "Enterprise", price: 0,     points: ["Custom pods", "Server-side tagging", "Looker boards", "SLA & security"] },
  ];

  const faqs = [
    { q: "Where do I start?", a: "Need pipeline now? Start with Traffic + Conversion. Add pods as ROI compounds." },
    { q: "What do you report?", a: "Revenue, ROAS/CAC, CR, cohorts/LTV, channel KPIs—one weekly board." },
    { q: "Pods vs full service?", a: "Begin lean with 1 pod. We integrate with in-house teams cleanly." },
    { q: "Speed to launch?", a: "First shippables within 10–14 days after access and audit." },
  ];

  /* ===================== STATE ===================== */
  const [open, setOpen] = useState(null);            // solution modal data
  const [billing, setBilling] = useState("Monthly"); // toggle pricing
  const [toast, setToast] = useState("");
  const [sticky, setSticky] = useState(true);

  const priceLabel = (p) => (p === 0 ? "Custom" : `₹${(billing === "Monthly" ? p : Math.round(p*0.85)).toLocaleString()}/mo`);

  /* ===================== RENDER ===================== */
  return (
    <>
      {/* —————————— Stripe Stats (new look) —————————— */}
      <section style={{ ...sAlt, padding: "56px 0" }}>
  <Container>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(0,1fr))",
        gap: 20,
      }}
    >
      {kpis.map((i, idx) => {
        // --- auto dynamic bars (stable per card)
        const bars = Array.from({ length: 6 }, (_, j) =>
          Math.round(30 + 60 * Math.abs(Math.sin((idx + 1) * (j + 1) * 1.35)))
        );
        const delta = bars[bars.length - 1] - bars[0];
        const up = delta >= 0;

        return (
          <div
            key={idx}
            className="kpiCard"
            style={{
              position: "relative",
              borderRadius: 16,
              background: "#fff",
              padding: "18px 18px 18px 18px",
              boxShadow: "0 10px 26px rgba(11,18,32,.06)",
              border: `1.5px solid ${theme.line}`,
              display: "grid",
              gridTemplateColumns: "1fr 120px",
              gap: 14,
              alignItems: "center",
            }}
          >
            {/* Left: icon + values */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: theme.grad,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 6px 16px rgba(124,58,237,.28)",
                  flexShrink: 0,
                }}
              >
                <i className={`bi ${i.icon}`} />
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 20,
                    letterSpacing: "-.3px",
                    color: "#0b1220",
                  }}
                >
                  {i.k}
                </div>
                <div style={{ color: theme.sub, fontSize: 13 }}>{i.v}</div>
              </div>
            </div>

            {/* Right: animated mini bar chart */}
            <div className="kpiBarsWrap" style={{ position: "relative" }}>
              <div
                className="kpiBars"
                style={{
                  height: 64,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  gap: 8,
                  paddingLeft: 2,
                  position: "relative",
                }}
              >
                {bars.map((h, j) => (
                  <span
                    key={j}
                    className="kpiBar"
                    style={{
                      width: 10,
                      height: `${h}%`,
                      background:
                        "linear-gradient(180deg, rgba(124,58,237,1), rgba(59,130,246,1))",
                      borderRadius: 6,
                      transformOrigin: "bottom",
                      animation: "kpiGrow .65s ease-out both",
                      animationDelay: `${j * 90}ms`,
                      boxShadow: "0 4px 10px rgba(59,130,246,.25)",
                    }}
                  />
                ))}

                {/* gentle shine */}
                <div
                  className="kpiGlow"
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 10,
                    pointerEvents: "none",
                    background:
                      "radial-gradient(120% 80% at 80% 20%, rgba(124,58,237,.12), transparent 60%)",
                    animation: "kpiGlow 3s linear infinite",
                  }}
                />
              </div>
            </div>

            {/* vertical split to avoid “vacant” feel */}
            <div
              style={{
                position: "absolute",
                top: 10,
                bottom: 10,
                left: "calc(100% - 120px)",
                width: 1.5,
                background: theme.line,
                opacity: 0.85,
              }}
            />

            {/* delta chip (auto) */}
            <div
              className={`deltaChip ${up ? "up" : "down"}`}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                fontSize: 12,
                padding: "4px 8px",
                borderRadius: 999,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: up ? "#10b981" : "#ef4444",
                boxShadow: "0 6px 16px rgba(0,0,0,.12)",
              }}
              aria-label="period delta"
              title="Change vs baseline"
            >
              <i className={`bi ${up ? "bi-arrow-up-right" : "bi-arrow-down-right"}`} />
              {up ? "+" : ""}
              {Math.abs(delta)}%
            </div>
          </div>
        );
      })}
    </div>

    {/* Local styles for animation & motion prefs */}
    <style>{`
      .kpiCard { transition: transform .18s ease, box-shadow .18s ease; }
      .kpiCard:hover { transform: translateY(-2px); box-shadow: 0 14px 34px rgba(11,18,32,.10); }

      @keyframes kpiGrow {
        from { transform: scaleY(0.1); opacity: .6; }
        to   { transform: scaleY(1);   opacity: 1;  }
      }
      @keyframes kpiGlow {
        0% { opacity: .06; }
        50% { opacity: .12; }
        100% { opacity: .06; }
      }

      @media (max-width: 991.98px) {
        .kpiCard { grid-template-columns: 1fr; }
      }
      @media (prefers-reduced-motion: reduce) {
        .kpiBar, .kpiGlow { animation: none !important; }
        .kpiCard { transition: none !important; }
      }
    `}</style>
  </Container>
</section>



      {/* —————————— Solutions: asymmetric grid (new) —————————— */}
     <section
  style={{
    ...s.section,
    background: "#0f172a",
    padding: "76px 0",
    position: "relative",
    overflow: "hidden",
  }}
>
  {/* Ambient gradient glows */}
  <div style={{
    position:"absolute", top:-120, left:-100, width:380, height:380, borderRadius:"50%",
    background:"radial-gradient(circle at 30% 30%, rgba(124,58,237,.35), transparent 70%)",
    filter:"blur(100px)", pointerEvents:"none"
  }}/>
  <div style={{
    position:"absolute", bottom:-140, right:-120, width:340, height:340, borderRadius:"50%",
    background:"radial-gradient(circle at 70% 70%, rgba(59,130,246,.35), transparent 70%)",
    filter:"blur(90px)", pointerEvents:"none"
  }}/>

  <Container>
    <Header
  eyebrow="Solutions"
  title={<span style={{ color: "#f1f5f6ff" }}>Pick a pod. Or stack them.</span>}
  sub={<span style={{ color: "#fdfcfeff" }}>Productized growth systems designed to ship fast and compound over time.</span>}
/>


    {/* UNIFORM GRID: 2 columns × 3 rows = 6 cards */}
    <Row className="g-4 align-items-stretch">
      {[...solutions, {
        key: "analytics",
        tag: "Analytics",
        icon: "bi-bar-chart-line",
        title: "Analytics & Attribution",
        desc: "GA4 + server-side tagging + clean models for confident decisions.",
        bullets: ["Event spec", "S2S tagging", "Cohorts / LTV"],
        img: "https://picsum.photos/seed/909/1200/800"
      }].slice(0, 6).map((sol, i) => (
        <Col lg={6} key={sol.key || i}>
          <div
            className="solution-card uniform"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              borderRadius: 18,
              background:
                "linear-gradient(180deg, rgba(255,255,255,.10), rgba(255,255,255,.06)) padding-box, linear-gradient(135deg,#7c3aed,#3b82f6) border-box",
              border: "1px solid transparent",
              color: "#fff",
              overflow: "hidden",
              boxShadow: "0 16px 40px rgba(0,0,0,.35)",
              height: "100%",
              transform: "translateY(0)",
              transition: "transform .28s ease, box-shadow .28s ease",
            }}
          >
            {/* Text column */}
            <div style={{ padding: 20, display:"flex", flexDirection:"column" }}>
              {/* Meta row — high contrast */}
              <div className="d-inline-flex align-items-center gap-2 mb-1">
                <span style={{
                  fontWeight:700, fontSize:12, padding:"6px 10px", borderRadius:999,
                  background:"#ffffff", color:"#0f172a"
                }}>{sol.tag}</span>
                <span style={{
                  width:28, height:28, borderRadius:8,
                  background:"linear-gradient(90deg,#7c3aed,#4761ff)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  color:"#fff"
                }}>
                  <i className={`bi ${sol.icon}`} />
                </span>
                <span style={{ fontSize:12, fontWeight:700, color:"#fff" }}>Pod</span>
              </div>

              <h5 style={{ margin:"10px 0 6px", letterSpacing:"-.2px", fontWeight:800, color:"#fff" }}>
                {sol.title}
              </h5>
              <p style={{ margin:"0 0 10px", color:"#fff", fontSize:14 }}>
                {sol.desc}
              </p>

              <div style={{
                height:1, background:"linear-gradient(90deg, rgba(255,255,255,.6), transparent)",
                margin:"8px 0 10px"
              }} />

              {/* Bullets */}
              <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:10 }}>
                {sol.bullets.map((b, j) => (
                  <span key={j} style={{
                    fontSize:12, padding:"6px 10px", borderRadius:999,
                    border:"1px solid rgba(255,255,255,.9)", color:"#fff",
                    background:"rgba(255,255,255,.12)"
                  }}>{b}</span>
                ))}
              </div>

              {/* CTA */}
              <div style={{ marginTop:"auto", display:"flex", gap:10 }}>
                <Button
                  size="sm"
                  onClick={() => setOpen(sol)}
                  style={{
                    background:"linear-gradient(90deg,#7c3aed,#4761ff)",
                    border:"none",
                    boxShadow:"0 10px 22px rgba(71,97,255,.35)"
                  }}
                >
                  Details <i className="bi bi-arrow-right ms-1" />
                </Button>
                <Button size="sm" variant="outline-light" href="#quote" style={{ borderColor:"#fff", color:"#fff" }}>
                  Start
                </Button>
              </div>
            </div>

            {/* Image column with glow + shimmer */}
            <div className="position-relative">
              <div className="ratio ratio-16x9 h-100">
                <Image
                  src={sol.img}
                  alt={sol.title}
                  className="w-100 h-100 sol-img"
                  style={{ objectFit: "cover", transition:"transform .45s ease", willChange:"transform" }}
                />
              </div>
              <div style={{
                position:"absolute", top:-30, right:-30, width:150, height:150, borderRadius:"50%",
                background:"radial-gradient(circle at 30% 30%, rgba(124,58,237,.45), transparent 60%)",
                filter:"blur(44px)", pointerEvents:"none"
              }}/>
              <div className="sol-shimmer" style={{
                position:"absolute", inset:0, pointerEvents:"none", opacity:.14,
                background:"linear-gradient(110deg, transparent 0%, rgba(255,255,255,.30) 35%, transparent 70%)",
                transform:"translateX(-120%)", animation:"solShimmer 3s linear infinite"
              }}/>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  </Container>

  {/* Hover & motion styles (scoped) */}
  <style>{`
    .solution-card.uniform:hover { transform: translateY(-6px); box-shadow: 0 22px 56px rgba(59,130,246,.35); }
    .solution-card.uniform:hover .sol-img { transform: scale(1.06); }

    @keyframes solShimmer { to { transform: translateX(120%); } }

    /* Keep cards uniform on mobile */
    @media (max-width: 991.98px) {
      .solution-card.uniform { grid-template-columns: 1fr !important; }
    }
    @media (prefers-reduced-motion: reduce) {
      .solution-card.uniform, .sol-img, .sol-shimmer { animation: none !important; transition: none !important; }
    }
  `}</style>
</section>




      {/* —————————— Industries: slim carousel rail —————————— */}
      


      {/* —————————— Process: vertical timeline —————————— */}
     {/* ==== PROCESS (LIGHT + VISIBLE, NO JS) ==== */}
{/* ==== PROCESS (LIGHT • BOOTSTRAP GRID • REGULAR WEIGHTS) ==== */}
{/* ==== PROCESS (LIGHT CONTRAST) ==== */}
<section className="process-wrap">
  <style>{`
    .process-wrap{padding:80px 0;background:#f9fafb;color:#1e293b}
    .process-container{max-width:1200px;margin:0 auto;padding:0 16px}
    .process-eyebrow{display:inline-flex;gap:8px;align-items:center;padding:4px 12px;border-radius:999px;background:#e0f2fe;border:1px solid #bae6fd;font-weight:400;font-size:14px;color:#075985}
    .dot{width:8px;height:8px;border-radius:50%;background:linear-gradient(90deg,#2563eb,#7c3aed)}
    .process-title{font-weight:400;letter-spacing:-.2px;line-height:1.2;margin:16px 0 12px;color:#0f172a}
    .process-sub{color:#475569;max-width:700px;font-weight:400;margin:0 auto}
    .visible-outline{margin-top:24px;border:1px solid #cbd5e1;border-radius:16px;background:#ffffff;box-shadow:0 4px 14px rgba(0,0,0,0.05)}
    /* Left summary card */
    .p-left{background:#f1f5f9;border:1px solid #cbd5e1;border-radius:14px;padding:20px}
    .p-pill{display:flex;align-items:center;gap:8px;font-weight:400;color:#1e293b}
    .p-big{font-size:30px;font-weight:400;color:#0f172a;margin:10px 0 4px}
    .p-sub{color:#475569;font-size:14px}
    .p-div{height:1px;background:#cbd5e1;margin:16px 0}
    .p-badges{display:flex;flex-wrap:wrap;gap:8px}
    .p-chip{padding:6px 12px;border-radius:10px;background:#e2e8f0;border:1px solid #cbd5e1;color:#1e293b;font-weight:400;font-size:13px}
    .p-cta{display:flex;gap:10px;margin-top:16px;flex-wrap:wrap}
    .btn-ghost{background:#ffffff;border:1px solid #94a3b8;color:#1e293b;border-radius:8px;padding:8px 14px;font-weight:400;font-size:14px;text-decoration:none}
    .btn-ghost:hover{background:#f1f5f9}
    .btn-primary-soft{background:linear-gradient(90deg,#2563eb,#7c3aed);border:none;color:#ffffff;border-radius:8px;padding:8px 14px;font-weight:400;font-size:14px;text-decoration:none;box-shadow:0 2px 6px rgba(37,99,235,0.3)}
    .btn-primary-soft:hover{opacity:.9}
    /* Right timeline */
    .p-timeline{position:relative;padding-left:28px}
    .p-rail{position:absolute;left:10px;top:0;bottom:0;width:2px;background:#cbd5e1}
    .p-step{position:relative;margin-bottom:20px}
    .p-node{position:absolute;left:-5px;top:20px;width:14px;height:14px;border-radius:50%;background:linear-gradient(90deg,#2563eb,#7c3aed);box-shadow:0 0 0 4px rgba(37,99,235,0.2)}
    .p-card{background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:18px;box-shadow:0 2px 8px rgba(0,0,0,0.04)}
    .p-tag{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:400;padding:4px 10px;border-radius:999px;background:#ede9fe;color:#5b21b6;border:1px solid #c4b5fd}
    .p-title{margin:10px 0 6px;font-weight:400;color:#111827}
    .p-desc{color:#475569;margin-bottom:10px;font-weight:400}
    .p-bullets{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}
    .p-pillb{padding:6px 10px;border-radius:999px;background:#f9fafb;border:1px solid #e2e8f0;color:#1e293b;font-weight:400;font-size:13px}
    .p-foot{display:flex;align-items:center;justify-content:space-between;gap:12px}
    .p-link{font-weight:400;color:#2563eb;text-decoration:none}
    .p-link:hover{text-decoration:underline}
    .p-meter{height:6px;border-radius:999px;background:#f1f5f9;position:relative;overflow:hidden;flex:1}
    .p-meter>span{position:absolute;left:0;top:0;bottom:0;width:75%;background:linear-gradient(90deg,#2563eb,#7c3aed)}
  `}</style>

  <div className="process-container">
    <div className="text-center">
      <span className="process-eyebrow"><span className="dot" /> Our Process</span>
      <h2 className="process-title h2">Ship. Measure. Optimize. Repeat.</h2>
      <p className="process-sub">A balanced cadence that compounds growth. Minimal slides, more output—always tied to revenue.</p>
    </div>

    <div className="visible-outline">
      <div className="row g-3 p-3">
        {/* LEFT */}
        <div className="col-lg-4">
          <aside className="p-left">
            <div className="p-pill"><span className="dot" /> Growth Co.</div>
            <div className="p-big">+32% avg. CR</div>
            <div className="p-sub">after 90 days across LPs</div>
            <div className="p-div" />
            <div className="p-badges">
              <span className="p-chip">SEO + Paid + Creators</span>
              <span className="p-chip">CRO / LP sprints</span>
              <span className="p-chip">Clean tracking</span>
              <span className="p-chip">LTV & retention</span>
            </div>
            <div className="p-cta">
              <a href="/playbooks" className="btn-ghost">View playbooks</a>
              <a href="/book-a-call" className="btn-primary-soft">Book a strategy call</a>
            </div>
          </aside>
        </div>

        {/* RIGHT */}
        <div className="col-lg-8">
          <div className="p-timeline">
            <div className="p-rail" />
            
            <div className="p-step">
              <div className="p-node" />
              <div className="p-card">
                <div className="p-tag">Audit & Plan</div>
                <h5 className="p-title">90-Day Revenue Plan</h5>
                <p className="p-desc">Audit SEO, Paid, Analytics & Funnels. A prioritized 90-day plan tied to revenue KPIs.</p>
                <div className="p-bullets">
                  <span className="p-pillb">• KPI tree & north-star</span>
                  <span className="p-pillb">• Channel mix & budgets</span>
                  <span className="p-pillb">• Roadmap with owners</span>
                </div>
                <div className="p-foot">
                  <a className="p-link" href="/playbooks">Learn more →</a>
                  <div className="p-meter"><span /></div>
                </div>
              </div>
            </div>

            <div className="p-step">
              <div className="p-node" />
              <div className="p-card">
                <div className="p-tag">Build & Ship</div>
                <h5 className="p-title">Conversion Engine</h5>
                <p className="p-desc">Weekly increments: LPs, creatives, tracking fixes—removing friction & lifting CR.</p>
                <div className="p-bullets">
                  <span className="p-pillb">• LPs & CRO</span>
                  <span className="p-pillb">• Offer & messaging tests</span>
                  <span className="p-pillb">• Clean tracking</span>
                </div>
                <div className="p-foot">
                  <a className="p-link" href="/solutions/conversion-engine">Learn more →</a>
                  <div className="p-meter"><span /></div>
                </div>
              </div>
            </div>

            <div className="p-step">
              <div className="p-node" />
              <div className="p-card">
                <div className="p-tag">Measure & Learn</div>
                <h5 className="p-title">Signal & Noise</h5>
                <p className="p-desc">Dashboards & readouts so you know what moved and why—tight feedback loops.</p>
                <div className="p-bullets">
                  <span className="p-pillb">• Attribution sanity</span>
                  <span className="p-pillb">• Weekly readouts</span>
                  <span className="p-pillb">• Learning backlog</span>
                </div>
                <div className="p-foot">
                  <a className="p-link" href="/solutions/ai-marketing">Learn more →</a>
                  <div className="p-meter"><span /></div>
                </div>
              </div>
            </div>

            <div className="p-step">
              <div className="p-node" />
              <div className="p-card">
                <div className="p-tag">Optimize & Scale</div>
                <h5 className="p-title">Traffic Acceleration</h5>
                <p className="p-desc">Scale SEO sprints, paid efficiency, creators, and retention—to grow AOV, ROAS & LTV.</p>
                <div className="p-bullets">
                  <span className="p-pillb">• SEO & paid scale</span>
                  <span className="p-pillb">• Creators/influencers</span>
                  <span className="p-pillb">• LTV & retention</span>
                </div>
                <div className="p-foot">
                  <a className="p-link" href="/solutions/traffic-acceleration">Learn more →</a>
                  <div className="p-meter"><span /></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>











      {/* —————————— Playbooks quick row —————————— */}
      {/* ==== PRICING (USD • MONTHLY↔QUARTERLY TOGGLE • UNIFORM BUTTONS • CUSTOM PLAN) ==== */}
{/* ==== PRICING (USD • TOGGLE • BUTTONS ALIGNED) ==== */}
<section className="pricing-wrap" style={{ position: "relative" }}>
  <style>{`
    .pricing-wrap{padding:90px 0;background:#0b1020;color:#eef2ff}
    .pricing-container{max-width:1200px;margin:0 auto;padding:0 16px}

    .pr-eyebrow{display:inline-flex;gap:8px;align-items:center;padding:6px 12px;border-radius:999px;background:rgba(59,130,246,.2);color:#bfdbfe;font-size:14px}
    .pr-dot{width:10px;height:10px;border-radius:50%;background:linear-gradient(90deg,#3b82f6,#a855f7)}
    .pr-title{color:#fff;letter-spacing:-.2px;margin:14px 0 8px;font-weight:400}
    .pr-sub{color:#c7d2fe;max-width:760px;margin:0 auto;font-weight:400}

    /* Toggle */
    .toggle-wrap{margin-top:18px}
    .pr-toggle{display:inline-flex;border:1px solid #334155;border-radius:12px;overflow:hidden}
    .pr-toggle input{display:none}
    .pr-toggle label{cursor:pointer;background:transparent;color:#cbd5e1;padding:10px 16px;font-weight:400;user-select:none}
    #cycle-m:checked ~ .toggle-wrap .pr-toggle label[for="cycle-m"],
    #cycle-q:checked ~ .toggle-wrap .pr-toggle label[for="cycle-q"]{background:#111836;color:#fff}

    /* Price toggle */
    .amt-m,.sub-m{display:none}
    #cycle-m:checked ~ .plans .amt-m, #cycle-m:checked ~ .plans .sub-m{display:inline}
    #cycle-m:checked ~ .plans .amt-q, #cycle-m:checked ~ .plans .sub-q{display:none}
    #cycle-q:checked ~ .plans .amt-q, #cycle-q:checked ~ .plans .sub-q{display:inline}
    #cycle-q:checked ~ .plans .amt-m, #cycle-q:checked ~ .plans .sub-m{display:none}

    /* Cards */
    .plans{margin-top:28px}
    .cardx{
      background:#0f1630;
      border:1px solid #334155;
      border-radius:16px;
      padding:20px;
      height:100%;
      box-shadow:0 10px 30px rgba(0,0,0,.35);
      transition:transform .2s ease, box-shadow .2s ease;
      display:flex;
      flex-direction:column;
    }
    .cardx:hover{transform:translateY(-4px);box-shadow:0 18px 40px rgba(0,0,0,.5)}
    .spotlight{background:linear-gradient(180deg,#111b3b 0%, #0f1630 100%);border:1px solid #4f46e5;box-shadow:0 18px 50px rgba(79,70,229,.35)}
    .badge-best{display:inline-block;background:linear-gradient(90deg,#3b82f6,#a855f7);color:#fff;padding:4px 10px;border-radius:999px;font-size:12px;margin-bottom:8px}

    .plan-name{font-size:18px;color:#e2e8f0;margin:6px 0 2px;font-weight:400}
    .tagline{color:#a5b4fc;font-size:14px;margin-bottom:12px}
    .price{display:flex;align-items:baseline;gap:8px;color:#fff}
    .price .amt{font-size:32px;font-weight:400}
    .price .sub{color:#93c5fd;font-size:14px}
    .bestfor{color:#94a3b8;font-size:13px;margin:8px 0 14px}

    .features{display:flex;flex-direction:column;gap:8px;margin:14px 0 16px;flex-grow:1}
    .f-row{display:flex;align-items:center;gap:10px}
    .f-yes{width:16px;height:16px;border-radius:4px;background:linear-gradient(90deg,#22c55e,#16a34a)}
    .f-no{width:16px;height:16px;border-radius:4px;background:#334155;position:relative}
    .f-no:after{content:"";position:absolute;inset:5px;background:#0b1020;border-radius:2px}
    .f-label{color:#e5e7eb;font-size:14px}

    .cta{margin-top:auto;display:flex;gap:10px;flex-wrap:wrap}
    .btn-ghost, .btn-primary{
      display:inline-block;text-decoration:none;border-radius:10px;padding:10px 16px;font-weight:400;
    }
    .btn-ghost{background:transparent;border:1px solid #64748b;color:#e2e8f0}
    .btn-ghost:hover{background:#162043}
    .btn-primary{background:linear-gradient(90deg,#3b82f6,#a855f7);border:0;color:#fff;box-shadow:0 6px 18px rgba(59,130,246,.4)}
    .btn-primary:hover{opacity:.95;transform:translateY(-1px)}

    .addons{margin-top:34px;background:#0f1630;border:1px solid #334155;border-radius:16px;padding:18px}
    .addons h5{color:#fff;font-weight:400;margin-bottom:12px}
    .addon{background:#0b1020;border:1px solid #334155;border-radius:12px;padding:12px}
    .addon .t{color:#e2e8f0}
    .addon .p{color:#93c5fd}

    .note{color:#9aa6ff;font-size:13px;margin-top:14px}
  `}</style>

  <div className="pricing-container">
    <div className="text-center">
      <span className="pr-eyebrow"><span className="pr-dot" /> Pricing</span>
      <h2 className="pr-title h2">Plans that map to how you grow</h2>
      <p className="pr-sub">
        Start where you are. Activate the Conversion Engine, scale Traffic Acceleration, add AI & Retention when it pays.
      </p>
    </div>

    {/* Radios before toggle */}
    <input type="radio" name="cycle" id="cycle-m" defaultChecked />
    <input type="radio" name="cycle" id="cycle-q" />

    <div className="toggle-wrap text-center">
      <div className="pr-toggle">
        <label htmlFor="cycle-m">Monthly</label>
        <label htmlFor="cycle-q">Quarterly (save more)</label>
      </div>
    </div>

    {/* Plans */}
    <div className="plans">
      <div className="row g-3">
        {/* Launch */}
        <div className="col-md-6 col-lg-3">
          <div className="cardx">
            <div>
              <div className="plan-name">Launch</div>
              <div className="tagline">Start strong, fix leaks, ship weekly</div>
              <div className="price">
                <span className="amt amt-m">$799</span><span className="sub sub-m">/month</span>
                <span className="amt amt-q">$2,099</span><span className="sub sub-q">/quarter</span>
              </div>
              <div className="bestfor">Best for: New funnels, early-stage, MVPs</div>
              <div className="features">
                <div className="f-row"><span className="f-yes"/><span className="f-label">CRO / LP sprint</span></div>
                <div className="f-row"><span className="f-yes"/><span className="f-label">SEO basics & setup</span></div>
                <div className="f-row"><span className="f-yes"/><span className="f-label">Paid setup + 1 creative</span></div>
                <div className="f-row"><span className="f-yes"/><span className="f-label">Analytics sanity (GA4 + pixels)</span></div>
                <div className="f-row"><span className="f-no"/><span className="f-label">Email/SMS automations</span></div>
              </div>
            </div>
            <div className="cta">
              <a href="/playbooks" className="btn-ghost">See deliverables</a>
              <a href="/book-a-call" className="btn-primary">Choose Launch</a>
            </div>
          </div>
        </div>

        {/* Growth */}
        <div className="col-md-6 col-lg-3">
          <div className="cardx spotlight">
            <div>
              <span className="badge-best">Most Popular</span>
              <div className="plan-name">Growth</div>
              <div className="tagline">Compound wins across channels</div>
              <div className="price">
                <span className="amt amt-m">$1,499</span><span className="sub sub-m">/month</span>
                <span className="amt amt-q">$4,099</span><span className="sub sub-q">/quarter</span>
              </div>
              <div className="bestfor">Best for: D2C, SaaS trials, lead-gen at scale</div>
              <div className="features">
                <div className="f-row"><span className="f-yes"/><span className="f-label">A/B tests + CRO velocity</span></div>
                <div className="f-row"><span className="f-yes"/><span className="f-label">SEO sprints</span></div>
                <div className="f-row"><span className="f-yes"/><span className="f-label">Paid performance + 3 creatives</span></div>
                <div className="f-row"><span className="f-yes"/><span className="f-label">AI-powered marketing</span></div>
                <div className="f-row"><span className="f-yes"/><span className="f-label">Email flows + LTV growth</span></div>
              </div>
            </div>
            <div className="cta">
              <a href="/playbooks" className="btn-ghost">See deliverables</a>
              <a href="/book-a-call" className="btn-primary">Choose Growth</a>
            </div>
          </div>
        </div>

        {/* Scale */}
        <div className="col-md-6 col-lg-3">
          <div className="cardx">
            <div>
              <div className="plan-name">Scale</div>
              <div className="tagline">Aggressive growth with creators</div>
              <div className="price">
                <span className="amt amt-m">$2,999</span><span className="sub sub-m">/month</span>
                <span className="amt amt-q">$8,199</span><span className="sub sub-q">/quarter</span>
              </div>
              <div className="bestfor">Best for: Brands with proven PMF</div>
              <div className="features">
                <div className="f-row"><span className="f-yes"/><span className="f-label">Full CRO program</span></div>
                <div className="f-row"><span className="f-yes"/><span className="f-label">SEO + Content ops</span></div>
                <div className="f-row"><span className="f-yes"/><span className="f-label">Paid efficiency + multi-platform</span></div>
                <div className="f-row"><span className="f-yes"/><span className="f-label">Advanced AI creatives</span></div>
                <div className="f-row"><span className="f-yes"/><span className="f-label">Influencer/community engine</span></div>
              </div>
            </div>
            <div className="cta">
              <a href="/playbooks" className="btn-ghost">See deliverables</a>
              <a href="/book-a-call" className="btn-primary">Choose Scale</a>
            </div>
          </div>
        </div>

        {/* Custom */}
        <div className="col-md-6 col-lg-3">
          <div className="cardx">
            <div>
              <div className="plan-name">Custom</div>
              <div className="tagline">Tailored scope for complex needs</div>
              <div className="price"><span className="amt">$ —</span><span className="sub">/custom</span></div>
              <div className="bestfor">Best for: Multi-market, heavy experimentation</div>
              <div className="features">
                <div className="f-row"><span className="f-yes"/><span className="f-label">Bespoke channel mix</span></div>
                <div className="f-row"><span className="f-yes"/><span className="f-label">Dedicated strategist & analyst</span></div>
                <div className="f-row"><span className="f-yes"/><span className="f-label">Creator program & partnerships</span></div>
                <div className="f-row"><span className="f-yes"/><span className="f-label">Advanced tracking & attribution</span></div>
              </div>
            </div>
            <div className="cta">
              <a href="/playbooks" className="btn-ghost">See deliverables</a>
              <a href="/contact" className="btn-primary">Contact Sales</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p className="note text-center">
      All plans include: strategy cadence, weekly exec readouts, dashboards & tracking hygiene. Pricing excludes ad spend & taxes.
    </p>
  </div>
</section>



      {/* —————————— Testimonials: slim rail —————————— */}
      
{/* ==== TESTIMONIALS (LIGHT SECTION + SLIGHTLY DARK CARDS, 6 TOTAL) ==== */}
<section className="testimonials-wrap" style={{ position: "relative" }}>
  <style>{`
    .testimonials-wrap{
      padding:90px 0;background:#ffffff;color:#0f172a;
      position:relative;isolation:isolate
    }
    .t-container{max-width:1200px;margin:0 auto;padding:0 16px;position:relative;z-index:1}

    /* Header */
    .t-eyebrow{display:inline-flex;gap:8px;align-items:center;padding:6px 12px;border-radius:999px;background:#e0f2fe;border:1px solid #bae6fd;color:#075985;font-size:14px}
    .t-dot{width:10px;height:10px;border-radius:50%;background:linear-gradient(90deg,#3b82f6,#a855f7)}
    .t-title{color:#0b1220;letter-spacing:-.2px;margin:14px 0 8px;font-weight:400}
    .t-sub{color:#334155;max-width:780px;margin:0 auto 18px;font-weight:400}

    /* Logos */
    .logos{display:flex;gap:28px;flex-wrap:nowrap;overflow:auto;padding-bottom:4px;scrollbar-width:none}
    .logos::-webkit-scrollbar{display:none}
    .logos img{height:22px;filter:grayscale(100%) contrast(115%);opacity:.9;flex:0 0 auto}
    .logos img:hover{opacity:1}

    /* Cards */
    .t-grid{margin-top:28px}
    .t-card{
      background:#f8fafc;  /* subtle dark-light slate */
      border:1px solid #e2e8f0;
      border-radius:16px;
      padding:20px;height:100%;
      box-shadow:0 10px 26px rgba(2,6,23,.08);
      transition:transform .2s ease, box-shadow .2s ease, border-color .2s ease;
      display:flex;flex-direction:column;gap:14px
    }
    .t-card:hover{transform:translateY(-4px);box-shadow:0 16px 36px rgba(2,6,23,.12);border-color:#cbd5e1}

    .t-head{display:flex;align-items:center;gap:12px}
    .t-avatar{width:44px;height:44px;border-radius:50%;background:#e2e8f0;display:flex;align-items:center;justify-content:center;font-size:18px;color:#1d4ed8;border:1px solid #cbd5e1}

    .t-info{display:flex;flex-direction:column}
    .t-name{color:#0f172a;font-weight:500;line-height:1}
    .t-role{color:#475569;font-size:13px}

    .t-badge{display:inline-flex;gap:6px;align-items:center;font-size:12px;
      color:#fff;background:linear-gradient(90deg,#3b82f6,#a855f7);
      border-radius:999px;padding:4px 10px}

    .stars{display:flex;gap:3px}
    .star{width:14px;height:14px;background:linear-gradient(90deg,#f59e0b,#fbbf24);
      clip-path:polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)}

    .t-quote{color:#0f172a}
    .t-quote:before{content:"“";color:#94a3b8;margin-right:2px}
    .t-quote:after{content:"”";color:#94a3b8;margin-left:2px}

    .t-metrics{display:flex;flex-wrap:wrap;gap:8px}
    .chip{padding:6px 10px;border-radius:999px;background:#e2e8f0;border:1px solid #cbd5e1;color:#0b1220;font-size:12px}

    /* Stat bar */
    .statbar{height:8px;border-radius:999px;background:#e2e8f0;overflow:hidden}
    .statbar>span{display:block;height:100%;background:linear-gradient(90deg,#3b82f6,#a855f7);width:0}
    .to-80>span{animation:grow80 1.2s ease forwards}
    .to-84>span{animation:grow84 1.2s ease forwards}
    .to-86>span{animation:grow86 1.2s ease forwards}
    .to-88>span{animation:grow88 1.2s ease forwards}
    .to-90>span{animation:grow90 1.2s ease forwards}
    .to-92>span{animation:grow92 1.2s ease forwards}
    @keyframes grow80{to{width:80%}} @keyframes grow84{to{width:84%}}
    @keyframes grow86{to{width:86%}} @keyframes grow88{to{width:88%}}
    @keyframes grow90{to{width:90%}} @keyframes grow92{to{width:92%}}

    /* Buttons */
    .t-links{margin-top:auto;display:flex;gap:10px;flex-wrap:wrap}
    .btn-ghost,.btn-primary{display:inline-block;text-decoration:none;border-radius:10px;padding:9px 14px;font-weight:500}
    .btn-ghost{background:#f8fafc;border:1px solid #cbd5e1;color:#0f172a}
    .btn-ghost:hover{background:#e2e8f0}
    .btn-primary{background:linear-gradient(90deg,#3b82f6,#a855f7);border:0;color:#fff;box-shadow:0 6px 18px rgba(59,130,246,.25)}
    .btn-primary:hover{opacity:.95;transform:translateY(-1px)}

    .mini-kpi{font-size:12px;color:#475569}
    .mini-kpi strong{color:#0f172a}
  `}</style>

  <div className="t-container">
    <div className="text-center">
      <span className="t-eyebrow"><span className="t-dot" /> Testimonials</span>
      <h2 className="t-title h2">Outcomes our clients talk about</h2>
      <p className="t-sub">
        Proof across <strong>Traffic Acceleration</strong>, <strong>Conversion Engine</strong>, <strong>AI-Powered Marketing</strong>, <strong>Retention</strong>, and more.
      </p>
      <div className="logos">
        <img src="/logos/brand1.svg" alt="Brand 1" />
        <img src="/logos/brand2.svg" alt="Brand 2" />
        <img src="/logos/brand3.svg" alt="Brand 3" />
        <img src="/logos/brand4.svg" alt="Brand 4" />
        <img src="/logos/brand5.svg" alt="Brand 5" />
        <img src="/logos/brand6.svg" alt="Brand 6" />
      </div>
    </div>

    {/* Cards (6 total) */}
    <div className="t-grid">
      <div className="row g-3">
        {/* 1. Traffic Acceleration */}
        <div className="col-md-6 col-lg-4">
          <article className="t-card">
            <div className="t-head">
              <div className="t-avatar">S</div>
              <div className="t-info"><div className="t-name">Sofia Nguyen</div><div className="t-role">CMO, D2C Apparel</div></div>
              <span className="t-badge ms-auto">Traffic Acceleration</span>
            </div>
            <div className="stars"><span className="star"/><span className="star"/><span className="star"/><span className="star"/><span className="star"/></div>
            <p className="t-quote">Week 2 tracking was clean; by week 6, SEO + paid compounded. CPC down, forecasts finally reliable.</p>
            <div className="t-metrics"><span className="chip">+118% organic sessions</span><span className="chip">-27% blended CAC</span></div>
            <div className="statbar to-84"><span/></div>
            <div className="t-links"><a href="/playbooks" className="btn-ghost">See playbook</a><a href="/case-studies/traffic-acceleration" className="btn-primary">Read case study</a></div>
            <div className="mini-kpi">Last 90 days: <strong>+42%</strong> non-brand clicks</div>
          </article>
        </div>

        {/* 2. Conversion Engine */}
        <div className="col-md-6 col-lg-4">
          <article className="t-card">
            <div className="t-head">
              <div className="t-avatar">D</div>
              <div className="t-info"><div className="t-name">Diego Ramos</div><div className="t-role">Head of Growth, SaaS</div></div>
              <span className="t-badge ms-auto">Conversion Engine</span>
            </div>
            <div className="stars"><span className="star"/><span className="star"/><span className="star"/><span className="star"/><span className="star"/></div>
            <p className="t-quote">Weekly shipping—forms, offers, copy—pushed CR from 2.4% → 4.1%. Readouts kept everyone aligned.</p>
            <div className="t-metrics"><span className="chip">+71% signup CR</span><span className="chip">-35% time-to-test</span></div>
            <div className="statbar to-90"><span/></div>
            <div className="t-links"><a href="/solutions/conversion-engine" className="btn-ghost">See method</a><a href="/case-studies/conversion-engine" className="btn-primary">Read case study</a></div>
            <div className="mini-kpi">Form drop-off down <strong>28%</strong></div>
          </article>
        </div>

        {/* 3. AI & Retention */}
        <div className="col-md-6 col-lg-4">
          <article className="t-card">
            <div className="t-head">
              <div className="t-avatar">A</div>
              <div className="t-info"><div className="t-name">Amelia Clark</div><div className="t-role">Founder, Beauty eCom</div></div>
              <span className="t-badge ms-auto">AI & Retention</span>
            </div>
            <div className="stars"><span className="star"/><span className="star"/><span className="star"/><span className="star"/><span className="star"/></div>
            <p className="t-quote">Predictive audiences + smarter copy lifted CTR and LTV. Flows now drive revenue without discounting.</p>
            <div className="t-metrics"><span className="chip">+22% AOV</span><span className="chip">+34% LTV (90d)</span></div>
            <div className="statbar to-86"><span/></div>
            <div className="t-links"><a href="/solutions/ai-marketing" className="btn-ghost">See AI approach</a><a href="/case-studies/retention" className="btn-primary">Read case study</a></div>
            <div className="mini-kpi">Emails revenue share <strong>29%</strong></div>
          </article>
        </div>

        {/* 4. Local Domination */}
        <div className="col-md-6 col-lg-4">
          <article className="t-card">
            <div className="t-head">
              <div className="t-avatar">R</div>
              <div className="t-info"><div className="t-name">Ryan Patel</div><div className="t-role">Owner, Local Services</div></div>
              <span className="t-badge ms-auto">Local Domination</span>
            </div>
            <div className="stars"><span className="star"/><span className="star"/><span className="star"/><span className="star"/><span className="star"/></div>
            <p className="t-quote">Maps + reviews + remarketing. Calls doubled without extra spend. A system the team can sustain.</p>
            <div className="t-metrics"><span className="chip">2× inbound calls</span><span className="chip">Top 3 in Maps</span></div>
            <div className="statbar to-88"><span/></div>
            <div className="t-links"><a href="/industries/local" className="btn-ghost">See playbook</a><a href="/book-a-call" className="btn-primary">Book a call</a></div>
            <div className="mini-kpi">Review velocity <strong>+64%</strong></div>
          </article>
        </div>

        {/* 5. Healthcare Digital Trust */}
        <div className="col-md-6 col-lg-4">
          <article className="t-card">
            <div className="t-head">
              <div className="t-avatar">H</div>
              <div className="t-info"><div className="t-name">Dr. Leah Singh</div><div className="t-role">Director, Clinic Network</div></div>
              <span className="t-badge ms-auto">Healthcare Digital Trust</span>
            </div>
            <div className="stars"><span className="star"/><span className="star"/><span className="star"/><span className="star"/><span className="star"/></div>
            <p className="t-quote">Local SEO + HIPAA-aware UX lifted bookings while keeping trust front and center.</p>
            <div className="t-metrics"><span className="chip">+38% appointment requests</span><span className="chip">+24% calls from GMB</span></div>
            <div className="statbar to-80"><span/></div>
            <div className="t-links"><a href="/industries/healthcare" className="btn-ghost">See industry fit</a><a href="/case-studies/healthcare" className="btn-primary">Read case study</a></div>
            <div className="mini-kpi">Clinic finder conversions <strong>+18%</strong></div>
          </article>
        </div>

        {/* 6. Real Estate Funnels */}
        <div className="col-md-6 col-lg-4">
          <article className="t-card">
            <div className="t-head">
              <div className="t-avatar">E</div>
              <div className="t-info"><div className="t-name">Elena Brooks</div><div className="t-role">Broker, Realty Group</div></div>
              <span className="t-badge ms-auto">Real Estate Funnels</span>
            </div>
            <div className="stars"><span className="star"/><span className="star"/><span className="star"/><span className="star"/><span className="star"/></div>
            <p className="t-quote">Lead gen + remarketing + nurturing gave our pipeline consistency. Showings doubled in peak season.</p>
            <div className="t-metrics"><span className="chip">+61% qualified leads</span><span className="chip">CPL -22%</span></div>
            <div className="statbar to-92"><span/></div>
            <div className="t-links"><a href="/industries/real-estate" className="btn-ghost">See funnels</a><a href="/case-studies/real-estate" className="btn-primary">Read case study</a></div>
            <div className="mini-kpi">Follow-up reply rate <strong>+33%</strong></div>
          </article>
        </div>
      </div>
    </div>
  </div>
</section>








      {/* —————————— Quote band (dark) —————————— */}
      <section id="quote" style={{ ...s.section, background: theme.ink }}>
        <Container>
          <Row className="g-3 align-items-stretch">
            <Col lg={6}>
              <Card style={{ background: "transparent", color: "#fff", border: `1px solid rgba(255,255,255,.15)`, borderRadius: 16 }} className="h-100">
                <Card.Body>
                  <h3 className="fw-semibold">Request a Quote</h3>
                  <p className="small" style={{ color: "rgba(255,255,255,.75)" }}>Tell us your goals—get a plan, timelines, and pricing.</p>
                  <Form onSubmit={(e)=>{e.preventDefault(); setToast("Thanks! We’ll reply within 24 hours."); setTimeout(()=>setToast(""),2500); e.currentTarget.reset();}}>
                    <Row className="g-3">
                      <Col sm={6}><Form.Group><Form.Label className="small">Name</Form.Label><Form.Control required/></Form.Group></Col>
                      <Col sm={6}><Form.Group><Form.Label className="small">Work email</Form.Label><Form.Control type="email" required/></Form.Group></Col>
                      <Col xs={12}><Form.Group><Form.Label className="small">Website / App</Form.Label><Form.Control type="url" placeholder="https://yourdomain.com" required/></Form.Group></Col>
                      <Col sm={6}>
                        <Form.Group>
                          <Form.Label className="small">Solution</Form.Label>
                          <Form.Select defaultValue="Traffic Acceleration">
                            {["Traffic Acceleration","Conversion Engine","AI-Powered Marketing","Retention & Loyalty","Influencer & Community"].map(x => <option key={x}>{x}</option>)}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col sm={6}><Form.Group><Form.Label className="small">Monthly budget (₹)</Form.Label><Form.Control type="number" min={0}/></Form.Group></Col>
                      <Col xs={12}><Form.Group><Form.Label className="small">Notes</Form.Label><Form.Control as="textarea" rows={3} placeholder="Goals, timeline, anything else…"/></Form.Group></Col>
                    </Row>
                    <div className="d-flex gap-2 mt-3">
                      <Button type="submit" style={{ background: theme.grad, border: "none" }}>
                        Request quote <i className="bi bi-arrow-right ms-1"/>
                      </Button>
                      <Button variant="outline-light" onClick={()=>{setToast("Company profile downloaded."); setTimeout(()=>setToast(""),1800);}}>
                        Download company profile
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card style={{ background: "#fff", border: `1px solid ${theme.line}`, borderRadius: 16 }} className="h-100">
                <Card.Body>
                  <h5 className="fw-semibold">Why choose Growth Co.?</h5>
                  <ul className="small mt-2" style={{ color: theme.sub }}>
                    <li className="mb-2"><i className="bi bi-lightning-charge me-2"/>Weekly ships across pages, ads, creatives, and tracking.</li>
                    <li className="mb-2"><i className="bi bi-bullseye me-2"/>Revenue-first: actions mapped to KPIs.</li>
                    <li className="mb-2"><i className="bi bi-diagram-3 me-2"/>Pods you can stack as ROI compounds.</li>
                    <li className="mb-2"><i className="bi bi-shield-check me-2"/>QA for code, data, and deliverability.</li>
                  </ul>
                  <div className="small text-uppercase" style={{ opacity: .7 }}>Average 90-day outcomes</div>
                  <Table bordered responsive size="sm" className="mt-2 mb-0">
                    <thead><tr><th>Metric</th><th>Baseline</th><th>Result</th></tr></thead>
                    <tbody>
                      <tr><td>Core Web Vitals</td><td>58%</td><td>92%</td></tr>
                      <tr><td>Conversion rate</td><td>1.8%</td><td>2.9%</td></tr>
                      <tr><td>ROAS</td><td>1.6×</td><td>3.0×</td></tr>
                      <tr><td>Email revenue share</td><td>8%</td><td>18%</td></tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {toast && (
            <div style={{ position: "fixed", bottom: 14, right: 14, zIndex: 1060 }}>
              <Alert variant="success" className="shadow-sm border">{toast}</Alert>
            </div>
          )}
        </Container>
      </section>

      {/* —————————— FAQ —————————— */}
      <section style={s.section}>
        <Container>
          <Header eyebrow="FAQ" title="Quick answers" />
          <Accordion className="mx-auto" style={{ maxWidth: 920 }}>
            {faqs.map((f, i) => (
              <Accordion.Item eventKey={String(i)} key={i}>
                <Accordion.Header>{f.q}</Accordion.Header>
                <Accordion.Body className="text-secondary small">{f.a}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Container>
      </section>

      {/* —————————— Sticky bottom promo —————————— */}
      {sticky && (
        <div style={{
          position: "sticky", bottom: 0, zIndex: 1020,
          background: theme.grad, color: "#fff", padding: "10px 0",
          boxShadow: "0 -6px 18px rgba(2,6,23,.2)"
        }}>
          <div className="container d-flex align-items-center justify-content-between gap-2">
            <div className="d-flex align-items-center gap-2">
              <span style={{ width: 10, height: 10, background: "#22c55e", borderRadius: 999, display: "inline-block" }}/>
              <span className="small">Free teardown: 10-point audit in 48h.</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <a href="#quote" className="btn btn-sm btn-light">Get Free Audit</a>
              <CloseButton onClick={()=>setSticky(false)}/>
            </div>
          </div>
        </div>
      )}

      {/* —————————— Solution Modal —————————— */}
      <Modal show={!!open} onHide={()=>setOpen(null)} centered>
        <Modal.Header closeButton><Modal.Title>{open?.title}</Modal.Title></Modal.Header>
        <Modal.Body>
          <p className="mb-2">{open?.desc}</p>
          <div className="mb-2">
            {(open?.bullets||[]).map((b, i) => (
              <span key={i} style={{ ...chip, marginRight: 6, marginBottom: 6 }}>{b}</span>
            ))}
          </div>
          <div className="ratio ratio-16x9">
            <Image src={open?.img} alt={open?.title} className="w-100 h-100" style={{ objectFit: "cover" }}/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <a href="#quote" className="btn btn-outline-secondary">Get started</a>
          <Button onClick={()=>setOpen(null)} style={{ background: theme.grad, border: "none" }}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

/* ===================== Subcomponents ===================== */
function Header({ eyebrow, title, sub }) {
  const theme = { grad: "linear-gradient(90deg,#6d28d9 0%,#2563eb 100%)", sub: "#64748b" };
  return (
    <div className="text-center mb-4">
      {eyebrow && <Badge bg="light" text="dark" className="rounded-3">{eyebrow}</Badge>}
      <h2 className="mt-2 fw-semibold fs-1" style={{ letterSpacing: "-0.3px" }}>{title}</h2>
      {sub && <p className="mb-0" style={{ color: theme.sub }}>{sub}</p>}
      <div style={{ height: 3, width: 120, margin: "12px auto 0", background: theme.grad, borderRadius: 999 }} />
    </div>
  );
}

function SolutionPanel({ data, onOpen, theme, layout="std" }) {
  // two distinct visual templates to avoid resemblance to your previous section
  if (layout === "big") {
    return (
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.2fr 1fr",
        gap: 12,
        border: `1px solid ${theme.line}`,
        borderRadius: 16,
        overflow: "hidden",
        background: "#fff",
        height: "100%"
      }}>
        <div className="ratio ratio-16x9">
          <Image src={data.img} alt={data.title} className="w-100 h-100" style={{ objectFit: "cover" }}/>
        </div>
        <div style={{ padding: 16, display: "flex", flexDirection: "column" }}>
          <div className="d-inline-flex align-items-center gap-2 mb-1">
            <span className="badge text-bg-light">{data.tag}</span>
            <i className={`bi ${data.icon}`} />
          </div>
          <h5 className="mb-1">{data.title}</h5>
          <p style={{ color: "#64748b" }} className="mb-2">{data.desc}</p>
          <div className="mb-2">
            {data.bullets.map((b, i) => (
              <span key={i} style={{ fontSize: 12, padding: "6px 10px", borderRadius: 999, border: `1px solid ${theme.line}`, marginRight: 6, marginBottom: 6, display: "inline-block" }}>{b}</span>
            ))}
          </div>
          <div className="mt-auto d-flex gap-2">
            <Button size="sm" style={{ background: theme.grad, border: "none" }} onClick={()=>onOpen(data)}>
              See details <i className="bi bi-arrow-right ms-1"/>
            </Button>
            <a href="#quote" className="btn btn-sm btn-outline-secondary">Get started</a>
          </div>
        </div>
      </div>
    );
  }

  // compact template
  return (
    <div style={{
      border: `1px solid ${theme.line}`,
      borderRadius: 16,
      overflow: "hidden",
      background: "#fff",
      height: "100%",
      display: "grid",
      gridTemplateColumns: "1fr 1fr"
    }}>
      <div style={{ padding: 16 }}>
        <div className="d-inline-flex align-items-center gap-2 mb-1">
          <span className="badge text-bg-light">{data.tag}</span>
          <i className={`bi ${data.icon}`} />
        </div>
        <h6 className="mb-1">{data.title}</h6>
        <p style={{ color: "#64748b", fontSize: 14 }} className="mb-2">{data.desc}</p>
        <div className="mb-2">
          {data.bullets.map((b, i) => (
            <span key={i} style={{ fontSize: 12, padding: "6px 10px", borderRadius: 999, border: `1px solid ${theme.line}`, marginRight: 6, marginBottom: 6, display: "inline-block" }}>{b}</span>
          ))}
        </div>
        <div className="d-flex gap-2">
          <Button size="sm" style={{ background: theme.grad, border: "none" }} onClick={()=>onOpen(data)}>Details</Button>
          <a href="#quote" className="btn btn-sm btn-outline-secondary">Start</a>
        </div>
      </div>
      <div className="ratio ratio-16x9">
        <Image src={data.img} alt={data.title} className="w-100 h-100" style={{ objectFit: "cover" }}/>
      </div>
    </div>
  );
}

function renderMatrix(row, plan) {
  const iconY = <i className="bi bi-check2-circle text-success"/>;
  const iconN = <i className="bi bi-dash-lg text-muted"/>;
  switch (row) {
    case "Channels / Pods":
      return plan.name === "Starter" ? "1" : plan.name === "Growth" ? "2–3" : "Custom";
    case "CRO Tests":
      return plan.name === "Starter" ? iconN : iconY;
    case "Lifecycle (Email/SMS)":
      return plan.name !== "Starter" ? iconY : iconN;
    case "Reporting":
      return plan.name === "Enterprise" ? "Custom board" : plan.name === "Growth" ? "Weekly board" : "Monthly readout";
    case "Support":
      return plan.name === "Enterprise" ? "SLA" : "Email / chat";
    default:
      return "";
  }
}
