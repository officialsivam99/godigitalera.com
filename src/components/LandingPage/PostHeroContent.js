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
      <section style={s.section}>
        <Container>
          <Header eyebrow="Process" title="Ship. Measure. Optimize. Repeat." />
          <Row className="justify-content-center">
            <Col lg={10}>
              <div style={{ position: "relative", paddingLeft: 26 }}>
                <div style={{
                  position: "absolute", left: 8, top: 0, bottom: 0, width: 2,
                  background: theme.grad, opacity: 0.35, borderRadius: 2
                }} />
                {[
                  { h: "Audit & Plan", p: "90-day plan mapped to revenue KPIs + quick wins." },
                  { h: "Build & Ship", p: "Weekly increments—pages, ads, creatives, tracking." },
                  { h: "Measure & Learn", p: "Clean dashboards and readouts. What moved why." },
                  { h: "Optimize & Scale", p: "A/Bs, budget shifts, creative loops, CRO." },
                ].map((step, i) => (
                  <div key={i} style={{ marginBottom: 16, paddingLeft: 14 }}>
                    <div style={{
                      width: 14, height: 14, borderRadius: 999,
                      background: "white", border: `3px solid ${theme.brandB}`,
                      position: "absolute", left: 1, marginTop: 6
                    }} />
                    <div className="fw-semibold">{step.h}</div>
                    <div style={{ color: theme.sub, fontSize: 14 }}>{step.p}</div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* —————————— Pricing: compact comparison table (new) —————————— */}
      <section style={sAlt}>
        <Container>
          <Header eyebrow="Plans" title="Pods that scale with you" sub="Start lean. Add pods as ROI compounds." />
          <div className="d-flex justify-content-center mb-3">
            <div style={{ border: `1px solid ${theme.line}`, borderRadius: 999, padding: 6, background: "#fff" }}>
              <Button size="sm" variant={billing==="Monthly" ? "dark":"light"} onClick={()=>setBilling("Monthly")} className="me-1">Monthly</Button>
              <Button size="sm" variant={billing!=="Monthly" ? "dark":"light"} onClick={()=>setBilling("Yearly (-15%)")}>Yearly −15%</Button>
            </div>
          </div>

          <div style={{ overflowX: "auto", border: `1px solid ${theme.line}`, borderRadius: 12, background: "#fff" }}>
            <Table responsive borderless className="mb-0 align-middle">
              <thead>
                <tr style={{ borderBottom: `1px solid ${theme.line}` }}>
                  <th className="py-3">Plan</th>
                  {plans.map((p, i) => (
                    <th key={i} className="py-3 text-center">
                      <div className="fw-semibold">{p.name}</div>
                      <div style={{ background: theme.grad, WebkitBackgroundClip: "text", color: "transparent", fontWeight: 800, fontSize: 18 }}>
                        {priceLabel(p.price)}
                      </div>
                      {p.popular && <span className="badge text-bg-primary mt-1">Popular</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  "Channels / Pods", "CRO Tests", "Lifecycle (Email/SMS)", "Reporting", "Support"
                ].map((row, ridx) => (
                  <tr key={ridx} style={{ borderTop: `1px solid ${theme.line}` }}>
                    <td className="py-3">{row}</td>
                    {plans.map((p, i) => (
                      <td key={i} className="py-3 text-center">
                        {renderMatrix(row, p)}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr style={{ borderTop: `1px solid ${theme.line}` }}>
                  <td />
                  {plans.map((p, i) => (
                    <td key={i} className="py-3 text-center">
                      <a href="#quote" className="btn btn-dark btn-sm">Choose {p.name}</a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </Table>
          </div>
        </Container>
      </section>

      {/* —————————— Playbooks quick row —————————— */}
      <section style={s.section}>
        <Container>
          <Header eyebrow="Playbooks" title="Tools that make execution simple" />
          <Row className="g-3">
            {[
              { t: "Traffic Acceleration OS", tag: "Playbook" },
              { t: "Conversion Engine Sprints", tag: "Toolkit" },
              { t: "AI Creative Matrix", tag: "Template" },
            ].map((p, i) => (
              <Col lg={4} key={i}>
                <div style={{
                  border: `1px solid ${theme.line}`, background: "#fff",
                  borderRadius: 14, padding: 16, height: "100%"
                }}>
                  <Badge bg="light" text="dark" className="mb-2">{p.tag}</Badge>
                  <div className="fw-semibold">{p.t}</div>
                  <div className="mt-3">
                    <a href="#quote" style={{ ...pill, display: "inline-block" }}>Request a copy</a>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* —————————— Testimonials: slim rail —————————— */}
      <section style={sAlt}>
        <Container>
          <Header eyebrow="What clients say" title="Signal over noise." />
          <Row className="g-3">
            {testimonials.map((t, i) => (
              <Col lg={4} key={i}>
                <blockquote style={{
                  background: "#fff", border: `1px solid ${theme.line}`,
                  borderRadius: 14, padding: 16, height: "100%"
                }}>
                  <div style={{ color: theme.sub }}>&ldquo;{t.text}&rdquo;</div>
                  <div className="mt-3">
                    <span className="fw-semibold">{t.name}</span>
                    <span className="ms-1" style={{ color: theme.sub }}>— {t.role}</span>
                  </div>
                </blockquote>
              </Col>
            ))}
          </Row>
        </Container>
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
