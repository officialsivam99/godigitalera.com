// src/components/PostHeroSection.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Container, Row, Col, Card, Button, Badge, Stack, Image,
  Modal, Form, Table, Accordion, Alert, Carousel, CloseButton
} from "react-bootstrap";

export default function PostHeroSection() {
  /* ===================== THEME (inline) ===================== */
  const theme = {
    grad: "linear-gradient(90deg, #7c3aed 0%, #4761ff 100%)",
    gradAlt: "linear-gradient(90deg, #ff4d8d 0%, #7c3aed 100%)",
    darkBg: "#0b0b12",
    ink: "#111827",
    sub: "#6b7280",
  };

  const section = { padding: "84px 0", background: "#ffffff", position: "relative", overflow: "hidden" };
  const sectionAlt = { padding: "84px 0", background: "linear-gradient(180deg, #fbfbff 0%, #f7f7fd 100%)", position: "relative", overflow: "hidden" };
  const headline = { letterSpacing: "-0.3px" };
  const subText = { color: theme.sub };

  const chip = {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 999,
    background: "#f4f4ff",
    border: "1px solid #e8e8ff",
    fontSize: 12,
  };

  const glassCard = {
    borderRadius: 18,
    background: "rgba(255,255,255,0.62)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(0,0,0,.06)",
    boxShadow: "0 14px 40px rgba(2,6,23,0.14)",
  };

  const darkGlass = {
    borderRadius: 18,
    background: "rgba(17,24,39,0.72)",
    backdropFilter: "blur(8px)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,.12)",
    boxShadow: "0 14px 44px rgba(0,0,0,.35)",
  };

  const gradBorder = {
    background: "linear-gradient(#fff,#fff) padding-box, linear-gradient(135deg,#7c3aed,#4761ff,#ff4d8d) border-box",
    border: "1px solid transparent",
    borderRadius: 16,
  };

  const gradBtn = { background: theme.grad, border: "none" };
  const ghostBtn = { border: "1px solid #e5e7eb", background: "#fff" };

  /* ===================== DATA ===================== */
  const brands = [
    ["Acme", 1], ["Nova", 2], ["Axis", 3], ["Helio", 4],
    ["Vertex", 5], ["Orion", 6], ["Pulse", 7],
  ];

  const kpis = [
    { icon: "bi-lightning-charge", label: "Avg. Time to Ship", value: "10–14 days", trend: [40,54,66,80,92,95] },
    { icon: "bi-graph-up-arrow", label: "Median ROAS Uplift", value: "3.2×", trend: [1.2,1.4,1.8,2.4,2.9,3.2] },
    { icon: "bi-star", label: "Satisfaction", value: "4.9/5", trend: [4.5,4.6,4.7,4.8,4.9,4.9] },
    { icon: "bi-people", label: "Clients Served", value: "120+", trend: [20,44,66,84,102,120] },
  ];

  const services = [
    {
      icon: "bi-columns-gap",
      title: "Web Development",
      desc: "Ultra-fast React/Next builds with conversion-first UX and A/B ready sections.",
      bullets: ["Design system", "Headless CMS", "CWV 90+ targets"],
      img: "https://picsum.photos/seed/401/1200/800",
    },
    {
      icon: "bi-search",
      title: "Search Engine Optimization",
      desc: "Technical foundation + topical authority + smart internal links.",
      bullets: ["Topic clusters", "Schema/Entities", "CWV fixes"],
      img: "https://picsum.photos/seed/402/1200/800",
    },
    {
      icon: "bi-bullseye",
      title: "PPC & Performance",
      desc: "Google/META with guardrails, creative loops, and proper attribution.",
      bullets: ["PMax guardrails", "UGC sprints", "Budget pacing"],
      img: "https://picsum.photos/seed/403/1200/800",
    },
    {
      icon: "bi-envelope-paper",
      title: "Email & Lifecycle",
      desc: "Flows + campaigns that compound. Segments, templates, deliverability.",
      bullets: ["RFM segments", "Template system", "Seed testing"],
      img: "https://picsum.photos/seed/404/1200/800",
    },
    {
      icon: "bi-bar-chart-line",
      title: "Analytics & BI",
      desc: "GA4 + server-side tagging + BigQuery models + Looker revenue boards.",
      bullets: ["Event spec", "S2S tagging", "Cohorts/LTV"],
      img: "https://picsum.photos/seed/405/1200/800",
    },
    {
      icon: "bi-stars",
      title: "Creative Studio",
      desc: "Hooks matrices, motion/UGC, and on-brand visuals built to test fast.",
      bullets: ["Ad sets", "LP visuals", "UGC"],
      img: "https://picsum.photos/seed/406/1200/800",
    },
  ];

  const showcase = [
    { title: "SaaS Landing System", tag: "Web • CRO", img: "https://picsum.photos/seed/501/1200/800" },
    { title: "D2C Growth Engine", tag: "SEO • Email", img: "https://picsum.photos/seed/502/1200/800" },
    { title: "Marketplace PMax", tag: "PPC • Feed", img: "https://picsum.photos/seed/503/1200/800" },
    { title: "Analytics Overhaul", tag: "GA4 • Looker", img: "https://picsum.photos/seed/504/1200/800" },
    { title: "B2B Demand Gen", tag: "Paid Social", img: "https://picsum.photos/seed/505/1200/800" },
    { title: "Email Revenue Lift", tag: "Flows • Templates", img: "https://picsum.photos/seed/506/1200/800" },
  ];

  const steps = [
    { icon: "bi-clipboard-check", title: "Audit & Strategy", text: "Quick wins + 90-day plan mapped to revenue KPIs." },
    { icon: "bi-rocket-takeoff", title: "Build & Ship", text: "Weekly increments—pages, campaigns, creatives." },
    { icon: "bi-bar-chart", title: "Measure & Learn", text: "Clean tracking, dashboards, readouts, alerts." },
    { icon: "bi-arrow-repeat", title: "Optimize & Scale", text: "A/Bs, budget shifts, creative loops, CRO." },
  ];

  const plans = [
    { name: "Starter",    m: 24000, feat: ["1 website/LP", "SEO basics", "1 ad channel", "Monthly report"] },
    { name: "Growth",     m: 59000, feat: ["2–3 channels", "CRO tests", "Flows + templates", "Weekly dashboard"], popular: true },
    { name: "Enterprise", m: 0,     feat: ["PMax guardrails", "Server-side", "Looker suite", "SLA & security"] },
  ];

  const faqs = [
    { q: "What industries do you specialize in?", a: "D2C, SaaS, marketplaces, and services. We adapt playbooks to your reality." },
    { q: "How fast do you launch?", a: "First shippables go live within 10–14 days after access and audit." },
    { q: "Can you integrate with our in-house team?", a: "Yes—pods integrate with your dev/design/marketing and provide clean handovers." },
    { q: "How do you measure success?", a: "Revenue, ROAS/CAC, conversion rate, LTV/cohorts, and channel KPIs." },
  ];

  /* ===================== NEW DATA (for added sections) ===================== */
  const marqueeWins = [
    { k: "+218%", v: "Organic clicks", s: "90 days" },
    { k: "3.4×",  v: "ROAS on META", s: "PMax assist" },
    { k: "-42%",  v: "CPA drop", s: "Paid Search" },
    { k: "+68%",  v: "Email rev share", s: "Flows" },
    { k: "92%",   v: "CWV score", s: "Core Web Vitals" },
    { k: "+2.1%", v: "CR uplift", s: "CRO sprints" },
  ];

  const testimonials = [
    {
      quote: "They ship every week. We finally have a clean growth loop—ads, landing pages, and analytics working together.",
      name: "Priya Sharma",
      role: "Head of Growth, D2C",
      img: "https://i.pravatar.cc/120?img=5",
    },
    {
      quote: "Attribution went from guesswork to clarity. Our CAC is stable and creative testing is painless now.",
      name: "Arjun Mehta",
      role: "Founder, SaaS",
      img: "https://i.pravatar.cc/120?img=11",
    },
    {
      quote: "The SEO roadmap + technical fixes moved the needle fast. We saw compounding gains within two months.",
      name: "Neha Gupta",
      role: "Marketing Lead, Marketplace",
      img: "https://i.pravatar.cc/120?img=21",
    },
  ];

  const studies = [
    {
      tag: "PPC • CRO",
      title: "Fintech Leads at 38% Lower CPA",
      img: "https://picsum.photos/seed/cs1/1200/800",
      bullets: ["Creative matrix", "PMax guardrails", "Funnel-specific LPs"],
    },
    {
      tag: "SEO • Content",
      title: "SaaS Trials +162% with Topic Clusters",
      img: "https://picsum.photos/seed/cs2/1200/800",
      bullets: ["Entity mapping", "Internals", "Programmatic pages"],
    },
    {
      tag: "Analytics",
      title: "Looker Boards for Real-Time ROAS",
      img: "https://picsum.photos/seed/cs3/1200/800",
      bullets: ["Event spec", "BigQuery", "LTV cohorts"],
    },
  ];

  const posts = [
    { title: "Airtight Event Specs: Stop Losing Data", tag: "Analytics", img: "https://picsum.photos/seed/b1/1200/800" },
    { title: "CRO Checklist for D2C PDPs", tag: "CRO", img: "https://picsum.photos/seed/b2/1200/800" },
    { title: "SEO Topic Clusters that Actually Scale", tag: "SEO", img: "https://picsum.photos/seed/b3/1200/800" },
  ];

  /* ===================== STATE ===================== */
  const [hoverIdx, setHoverIdx] = useState(null);
  const [serviceModal, setServiceModal] = useState(null);
  const [quoteMsg, setQuoteMsg] = useState("");
  const [billing, setBilling] = useState("Monthly"); // 'Monthly' | 'Yearly (-15%)'
  const [showSticky, setShowSticky] = useState(true);

  const priceLabel = (p) => {
    if (p === 0) return "Custom";
    if (billing.startsWith("Yearly")) return `₹${Math.round(p * 0.85).toLocaleString()}/mo`;
    return `₹${p.toLocaleString()}/mo`;
  };

  /* ===================== UTIL: Sparkline ===================== */
  const Spark = ({ data = [], w = 120, h = 36 }) => {
    if (!data.length) return null;
    const min = Math.min(...data), max = Math.max(...data);
    const pad = 4, step = (w - pad*2) / (data.length - 1 || 1);
    const y = (v) => max === min ? h/2 : h - pad - ((v - min) / (max - min)) * (h - pad*2);
    const pts = data.map((v,i)=>`${pad + i*step},${y(v)}`).join(" ");
    return (
      <svg width={w} height={h}>
        <defs>
          <linearGradient id="sparkGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#4761ff" />
          </linearGradient>
        </defs>
        <polyline fill="none" stroke="url(#sparkGrad)" strokeWidth="2" points={pts} strokeLinejoin="round" strokeLinecap="round"/>
      </svg>
    );
  };

  /* ===================== RENDER ===================== */
  return (
    <>
      {/* Hairline gradient divider to mark start (no angled bars) */}
      <div style={{ height: 1, background: "linear-gradient(90deg,#ecebfd,#f1f5f9)" }} />

      {/* BRAND STRIP */}
      <section style={{ ...sectionAlt, padding: "48px 0" }}>
        <Container>
          <Row className="g-3 align-items-center">
            <Col lg={4}>
              <div className="d-flex align-items-center gap-2">
                <span className="badge rounded-3" style={{ background: theme.grad, color: "#fff" }}>Trusted by</span>
                <span className="small" style={subText}>teams who value speed, clarity & results</span>
              </div>
            </Col>
            <Col lg={8}>
              <div className="d-flex flex-wrap justify-content-lg-end gap-4">
                {brands.map(([name, seed]) => (
                  <div key={name} className="d-flex align-items-center gap-2 brand-chip">
                    <div
                      style={{
                        width: 28, height: 28, borderRadius: 8,
                        background: `url(https://picsum.photos/seed/brand${seed}/100/100) center/cover`,
                        border: "1px solid #ecebfd",
                        filter: "grayscale(100%)",
                        opacity: .8,
                        transition: "filter .25s ease, opacity .25s ease"
                      }}
                      className="brand-logo"
                    />
                    <span className="small fw-medium" style={{ color: theme.ink }}>{name}</span>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* KPIs */}
      <section style={section}>
        <DecorativeOrbs />
        <Container>
          <Row className="g-3 text-center">
            {kpis.map((k, i) => (
              <Col xs={6} md={3} key={i}>
                <Card style={glassCard}>
                  <Card.Body className="py-3">
                    <i className={`bi ${k.icon} fs-5`} />
                    <div className="small mt-1" style={subText}>{k.label}</div>
                    <div className="fs-5 fw-semibold" style={{ background: theme.grad, WebkitBackgroundClip: "text", color: "transparent" }}>
                      {k.value}
                    </div>
                    <div className="d-flex justify-content-center mt-1">
                      <Spark data={k.trend} />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* SERVICES */}
      <section style={sectionAlt}>
        <SectionHeader eyebrow="What we do" title="End-to-end growth services" subtitle="Build, grow, and measure—one accountable team." />
        <Container>
          <Row className="g-4">
            {services.map((s, i) => (
              <Col md={6} lg={4} key={i}>
                <Card
                  style={{ ...gradBorder, overflow: "hidden", boxShadow: "0 16px 40px rgba(2,6,23,0.08)" }}
                  onMouseEnter={() => setHoverIdx(i)}
                  onMouseLeave={() => setHoverIdx(null)}
                  className="h-100 reveal"
                >
                  <div className="ratio ratio-16x9">
                    <Image
                      src={s.img}
                      alt={s.title}
                      className="w-100 h-100"
                      style={{ objectFit: "cover", transform: hoverIdx===i ? "scale(1.03)" : "scale(1)", transition: "transform .3s ease" }}
                    />
                  </div>
                  <Card.Body>
                    <div className="d-flex align-items-center gap-2">
                      <div className="d-inline-flex align-items-center justify-content-center text-white"
                           style={{ background: theme.grad, borderRadius: 10, padding: 8 }}>
                        <i className={`bi ${s.icon}`} />
                      </div>
                      <Card.Title className="mb-0 fs-5">{s.title}</Card.Title>
                    </div>
                    <Card.Text className="small mt-2" style={subText}>{s.desc}</Card.Text>
                    <Stack direction="horizontal" gap={2} className="flex-wrap">
                      {s.bullets.map((b, idx) => <span key={idx} style={chip}>{b}</span>)}
                    </Stack>
                    <div className="d-flex gap-2 mt-3">
                      <Button size="sm" style={gradBtn} onClick={() => setServiceModal(s)}>
                        Learn more <i className="bi bi-arrow-right ms-1" />
                      </Button>
                      <a href="#quote" className="btn btn-sm" style={ghostBtn}>Get started</a>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        <Divider />
      </section>

      {/* SHOWCASE */}
      <section style={section}>
        <SectionHeader eyebrow="Work" title="Recent highlights" />
        <Container>
          <Row className="g-4">
            {showcase.map((it, i) => (
              <Col md={6} lg={4} key={i}>
                <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", border: "1px solid #ecebfd", boxShadow: "0 20px 46px rgba(2,6,23,.18)" }} className="reveal">
                  <Image src={it.img} alt={it.title} className="w-100" style={{ display: "block" }} />
                  <div className="hover-overlay-pro">
                    <div style={{ ...darkGlass, padding: 14 }}>
                      <div className="small text-uppercase">{it.tag}</div>
                      <div className="fw-semibold">{it.title}</div>
                      <a href="#quote" className="btn btn-sm mt-2" style={gradBtn}>
                        Request a similar build
                      </a>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* PROCESS (icons and content center aligned in a row) */}
      <section style={sectionAlt}>
        <SectionHeader eyebrow="Process" title="Simple, fast, accountable" />
        <Container>
          <Row className="g-4 justify-content-center">
            {steps.map((s, i) => (
              <Col md={6} lg={3} key={i}>
                <Card
                  style={{
                    borderRadius: 16,
                    background: "#f6f7f9",
                    border: "1px solid #ecebfd",
                    boxShadow: "0 2px 12px rgba(44,62,80,0.07)",
                    minHeight: 120,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "24px 12px",
                    textAlign: "left"
                  }}
                  className="h-100"
                >
                  <div className="d-flex align-items-center justify-content-center w-100">
                    <div
                      className="d-inline-flex align-items-center justify-content-center me-3 flex-shrink-0"
                      style={{
                        background: theme.grad,
                        borderRadius: 12,
                        width: 56,
                        height: 56,
                        color: "#fff",
                        fontSize: 28
                      }}
                    >
                      <i className={`bi ${s.icon}`} />
                    </div>
                    <div>
                      <h6 className="mb-2 fw-semibold" style={{ fontSize: "1.1rem" }}>{s.title}</h6>
                      <p className="small mb-0" style={{ color: "#6b7280" }}>{s.text}</p>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        <Divider />
      </section>

      {/* PRICING */}
      <section style={section}>
        <SectionHeader eyebrow="Pricing" title="Plans that scale with you" subtitle="Transparent, flexible—pick your lane." />
        <Container>
          <div className="d-flex justify-content-center mb-4">
            <div className="d-inline-flex align-items-center gap-2 px-2 py-1 rounded-5" style={{ ...glassCard, padding: 8 }}>
              <Button size="sm" variant={billing==="Monthly"?"dark":"outline-secondary"} onClick={()=>setBilling("Monthly")}>Monthly</Button>
              <Button size="sm" variant={billing!=="Monthly"?"dark":"outline-secondary"} onClick={()=>setBilling("Yearly (-15%)")}>
                Yearly <span className="badge text-bg-success ms-1">-15%</span>
              </Button>
            </div>
          </div>

          <Row className="g-4">
            {plans.map((p, i) => (
              <Col md={6} lg={4} key={i}>
                <Card
                  style={{
                    ...gradBorder,
                    background: "linear-gradient(#fff,#fff) padding-box, linear-gradient(135deg, #7c3aed 0%, #4761ff 50%, #ff4d8d 100%) border-box",
                    boxShadow: p.popular ? "0 20px 54px rgba(124,58,237,.25)" : "0 14px 46px rgba(2,6,23,.12)",
                  }}
                  className="h-100 reveal"
                >
                  <Card.Body>
                    {p.popular && (
                      <span className="badge rounded-pill mb-2" style={{ background: theme.grad, color: "#fff" }}>
                        Most Popular
                      </span>
                    )}
                    <Card.Title className="fs-5">{p.name}</Card.Title>
                    <div className="h2 mt-1" style={{ background: theme.gradAlt, WebkitBackgroundClip: "text", color: "transparent" }}>
                      {priceLabel(p.m)}
                    </div>
                    <ul className="small mt-2" style={{ color: "#475569" }}>
                      {p.feat.map((f, idx)=>(
                        <li key={idx} className="mb-1"><i className="bi bi-check2-circle text-success me-2" />{f}</li>
                      ))}
                    </ul>
                    <a href="#quote" className="btn btn-dark">Choose plan</a>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* FAQ */}
      <section style={sectionAlt}>
        <SectionHeader eyebrow="FAQ" title="Answers to common questions" />
        <Container>
          <Accordion className="mx-auto" style={{ maxWidth: 960 }}>
            {faqs.map((f, i) => (
              <Accordion.Item eventKey={String(i)} key={i}>
                <Accordion.Header>{f.q}</Accordion.Header>
                <Accordion.Body className="text-secondary small">{f.a}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Container>
      </section>

      {/* ===================== 🔥 NEW SECTIONS START ===================== */}

      {/* RESULTS MARQUEE (auto-scrolling wins) */}
      <section style={{ ...section, padding: "32px 0" }}>
        <Container>
          <div className="marquee-wrap">
            <div className="marquee-track">
              {[...marqueeWins, ...marqueeWins].map((w, i) => (
                <div key={i} className="marquee-item">
                  <span className="kpi-val">{w.k}</span>
                  <span className="kpi-lbl">{w.v}</span>
                  <span className="kpi-sub">{w.s}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* TESTIMONIALS (auto-play, pause on hover) */}
      <section style={sectionAlt}>
        <SectionHeader eyebrow="What clients say" title="Testimonials" />
        <Container>
          <Carousel className="reveal" interval={4500} pause="hover" controls indicators>
            {testimonials.map((t, i) => (
              <Carousel.Item key={i}>
                <Row className="justify-content-center">
                  <Col md={9} lg={8}>
                    <Card style={glassCard}>
                      <Card.Body className="p-4">
                        <div className="d-flex align-items-center gap-3">
                          <Image roundedCircle src={t.img} alt={t.name} width={60} height={60} />
                          <div>
                            <div className="fw-semibold">{t.name}</div>
                            <div className="small text-secondary">{t.role}</div>
                          </div>
                        </div>
                        <p className="mt-3 mb-0 fs-6" style={{ color: "#111827" }}>
                          “{t.quote}”
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
      </section>

      {/* CASE STUDIES SPLIT */}
      <section style={section}>
        <SectionHeader eyebrow="Case studies" title="Proven playbooks" subtitle="A snapshot of recent outcomes." />
        <Container>
          <Row className="g-4">
            {studies.map((c, i) => (
              <Col md={6} lg={4} key={i}>
                <Card className="h-100 cs-card reveal" style={{ border: "1px solid #ecebfd", borderRadius: 16, overflow: "hidden" }}>
                  <div className="ratio ratio-16x9">
                    <Image src={c.img} alt={c.title} className="w-100 h-100" style={{ objectFit: "cover" }} />
                  </div>
                  <Card.Body>
                    <div className="small text-uppercase text-secondary">{c.tag}</div>
                    <h6 className="mt-1">{c.title}</h6>
                    <ul className="small text-secondary mb-3">
                      {c.bullets.map((b, idx) => <li key={idx}>{b}</li>)}
                    </ul>
                    <a href="#quote" className="btn btn-sm btn-dark">
                      Get the playbook
                    </a>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* INSIGHTS / BLOG GRID */}
      <section style={sectionAlt}>
        <SectionHeader eyebrow="Insights" title="Ideas & resources" />
        <Container>
          <Row className="g-4">
            {posts.map((p, i) => (
              <Col md={6} lg={4} key={i}>
                <Card className="reveal blog-card" style={{ ...glassCard, overflow: "hidden" }}>
                  <div className="ratio ratio-16x9">
                    <Image src={p.img} alt={p.title} className="w-100 h-100" style={{ objectFit: "cover" }} />
                  </div>
                  <Card.Body>
                    <Badge bg="light" text="dark" className="mb-2">{p.tag}</Badge>
                    <h6 className="mb-2">{p.title}</h6>
                    <a href="#quote" className="btn btn-sm" style={ghostBtn}>
                      Request a PDF copy
                    </a>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ===================== 🔥 NEW SECTIONS END ===================== */}

      {/* QUOTE (anchor for hero button) — premium dark block */}
      <section id="quote" style={{ ...section, background: theme.darkBg }}>
        <NoiseOverlay />
        <Container>
          <Row className="g-4 align-items-stretch">
            <Col lg={6}>
              <Card style={darkGlass} className="h-100">
                <Card.Body>
                  <h3 className="fw-semibold">Request a Quote</h3>
                  <p className="small" style={{ color: "rgba(255,255,255,.72)" }}>
                    Share your goals—get a plan, timelines, and pricing.
                  </p>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setQuoteMsg("Thanks! We’ll get back within 24 hours.");
                      setTimeout(() => setQuoteMsg(""), 3000);
                      e.currentTarget.reset();
                    }}
                  >
                    <Row className="g-3">
                      <Col sm={6}><Form.Group><Form.Label className="small">Name</Form.Label><Form.Control required /></Form.Group></Col>
                      <Col sm={6}><Form.Group><Form.Label className="small">Work email</Form.Label><Form.Control type="email" required /></Form.Group></Col>
                      <Col xs={12}><Form.Group><Form.Label className="small">Website / App</Form.Label><Form.Control type="url" placeholder="https://yourdomain.com" required /></Form.Group></Col>
                      <Col sm={6}>
                        <Form.Group>
                          <Form.Label className="small">Service</Form.Label>
                          <Form.Select defaultValue="Web Development">
                            {["Web Development","SEO","PPC","Email Marketing","Analytics","Creative"].map(s=><option key={s} value={s}>{s}</option>)}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col sm={6}><Form.Group><Form.Label className="small">Monthly budget (₹)</Form.Label><Form.Control type="number" min={0} /></Form.Group></Col>
                      <Col xs={12}><Form.Group><Form.Label className="small">Notes</Form.Label><Form.Control as="textarea" rows={3} placeholder="Goals, timeline, anything else…" /></Form.Group></Col>
                    </Row>
                    <div className="d-flex gap-2 mt-3">
                      <Button type="submit" style={gradBtn}>Request quote <i className="bi bi-arrow-right ms-1" /></Button>
                      <Button variant="outline-light" onClick={() => { setQuoteMsg("Company profile downloaded."); setTimeout(()=>setQuoteMsg(""),2200); }}>
                        Download company profile
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={6}>
              <Card style={{ ...glassCard, background: "linear-gradient(180deg, rgba(255,255,255,.75), rgba(255,255,255,.6))", border: "1px solid rgba(255,255,255,.5)" }} className="h-100">
                <Card.Body>
                  <h5 className="fw-semibold">Why choose DigiSpark?</h5>
                  <ul className="small mt-2">
                    <li className="mb-2"><i className="bi bi-lightning-charge me-2" />Fast shipping: weekly increments, no long waits.</li>
                    <li className="mb-2"><i className="bi bi-bullseye me-2" />Revenue-first: everything mapped to KPIs.</li>
                    <li className="mb-2"><i className="bi bi-diagram-3 me-2" />Full-stack: build, grow, and measure.</li>
                    <li className="mb-2"><i className="bi bi-shield-check me-2" />Quality: code reviews, QA, and data validation.</li>
                  </ul>
                  <div className="mt-4">
                    <div className="small text-uppercase" style={{ opacity: 0.7 }}>Average outcomes (90-day)</div>
                    <Table bordered responsive size="sm" className="mt-2 mb-0">
                      <thead>
                        <tr><th>Metric</th><th>Baseline</th><th>Result</th></tr>
                      </thead>
                      <tbody>
                        <tr><td>Site speed (CWV)</td><td>58%</td><td>92%</td></tr>
                        <tr><td>Conversion rate</td><td>1.8%</td><td>2.9%</td></tr>
                        <tr><td>ROAS</td><td>1.6×</td><td>3.0×</td></tr>
                        <tr><td>Email revenue share</td><td>8%</td><td>18%</td></tr>
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {quoteMsg && (
            <div style={{ position: "fixed", bottom: 12, right: 12, zIndex: 1060 }}>
              <Alert variant="success" className="shadow-sm border">{quoteMsg}</Alert>
            </div>
          )}
        </Container>
      </section>

      {/* SERVICE MODAL */}
      <Modal show={!!serviceModal} onHide={() => setServiceModal(null)} centered>
        <Modal.Header closeButton><Modal.Title>{serviceModal?.title}</Modal.Title></Modal.Header>
        <Modal.Body>
          <p className="mb-2">{serviceModal?.desc}</p>
          <div className="mb-2">
            {(serviceModal?.bullets || []).map((b, i) => (
              <span key={i} style={{ ...chip, marginRight: 6, marginBottom: 6 }}>{b}</span>
            ))}
          </div>
          <div className="ratio ratio-16x9">
            <Image src={serviceModal?.img} alt={serviceModal?.title} className="w-100 h-100" style={{ objectFit: "cover" }} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <a href="#quote" className="btn btn-outline-secondary">Get started</a>
          <Button onClick={() => setServiceModal(null)} style={gradBtn}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* STICKY CONTACT BAR (dismissible) */}
      {showSticky && (
        <div className="sticky-bar">
          <div className="container d-flex align-items-center justify-content-between gap-2">
            <div className="d-flex align-items-center gap-2">
              <span className="pulse-dot" />
              <span className="small">Free teardown: get a 10-point growth audit within 48h.</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <a href="#quote" className="btn btn-sm btn-light">Get Free Audit</a>
              <CloseButton onClick={() => setShowSticky(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Local premium effects */}
      <style>{`
        .brand-chip:hover .brand-logo{ filter:none; opacity:1; }

        .hover-overlay-pro{
          position:absolute; inset:0; display:flex; align-items:flex-end; padding:12px;
          background: radial-gradient(120% 80% at 80% 20%, rgba(0,0,0,.0), rgba(0,0,0,.55));
          opacity:.0; transform: translateY(8px); transition: all .25s ease;
          backdrop-filter: blur(2px);
        }
        .hover-overlay-pro:hover{ opacity:1; transform: translateY(0); }

        /* process timeline accent inside cards */
        .timeline-dot::before{
          content:""; position:absolute; left:12px; top:-28px; bottom:-28px; width:2px;
          background: linear-gradient(180deg, #7c3aed, #4761ff);
          opacity:.4;
        }

        /* soft orbs for depth */
        .orb { position:absolute; filter: blur(40px); opacity:.28; pointer-events:none; }
        .orb.one { width:340px; height:340px; top:-80px; right:-60px; background: radial-gradient(circle at 30% 30%, #7c3aed, transparent 60%); }
        .orb.two { width:300px; height:300px; bottom:-80px; left:-60px; background: radial-gradient(circle at 70% 70%, #4761ff, transparent 60%); }

        /* subtle noise over dark */
        .noise::after{
          content:""; position:absolute; inset:0; pointer-events:none; opacity:.06;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 40 40"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23n)" opacity="0.9"/></svg>');
          mix-blend-mode: soft-light;
        }

        /* ===== New: Results marquee ===== */
        .marquee-wrap{
          overflow: hidden;
          border: 1px solid #ecebfd;
          border-radius: 14px;
          background: #fff;
          box-shadow: 0 8px 20px rgba(2,6,23,.06);
        }
        .marquee-track{
          display: flex;
          gap: 18px;
          padding: 10px 14px;
          animation: marquee 26s linear infinite;
          will-change: transform;
        }
        .marquee-item{
          display:flex; align-items:center; gap:8px;
          padding: 10px 14px;
          border: 1px solid #ecebfd;
          border-radius: 999px;
          background: linear-gradient(#fff,#fff) padding-box, linear-gradient(135deg,#7c3aed,#4761ff) border-box;
        }
        .marquee-item .kpi-val{ font-weight:700; }
        .marquee-item .kpi-lbl{ color:#334155; }
        .marquee-item .kpi-sub{ color:#64748b; font-size:.82rem; }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ===== New: reveal on scroll ===== */
        .reveal { opacity: 0; transform: translateY(16px); transition: opacity .5s ease, transform .5s ease; }
        .reveal.visible { opacity: 1; transform: none; }

        /* Blog/case hover */
        .blog-card:hover, .cs-card:hover { transform: translateY(-4px); transition: transform .25s ease; }

        /* Sticky CTA bar */
        .sticky-bar{
          position: sticky;
          bottom: 0;
          z-index: 1020;
          background: linear-gradient(90deg, rgba(124,58,237,.95), rgba(71,97,255,.95));
          color: #fff;
          padding: 10px 0;
          box-shadow: 0 -6px 18px rgba(2,6,23,.2);
        }
        .pulse-dot{
          width:10px; height:10px; border-radius:50%; background:#22c55e; display:inline-block; position:relative;
        }
        .pulse-dot::after{
          content:""; position:absolute; inset:-6px; border-radius:50%;
          border:2px solid rgba(34,197,94,.5);
          animation:pulse 1.6s infinite;
        }
        @keyframes pulse{ 0%{transform:scale(.6); opacity:.9} 100%{transform:scale(1.4); opacity:0} }
      `}</style>

      {/* IntersectionObserver to add 'visible' class */}
      <RevealOnScroll />
    </>
  );
}

/* ===== Subcomponents ===== */
function SectionHeader({ eyebrow, title, subtitle }) {
  const theme = { grad: "linear-gradient(90deg, #7c3aed 0%, #4761ff 100%)", sub: "#6b7280" };
  return (
    <Container className="mb-4">
      <div className="text-center">
        {eyebrow && (
          <Badge className="rounded-3" bg="light" text="dark" style={{ border: "1px solid #ecebfd" }}>
            {eyebrow}
          </Badge>
        )}
        <h2 className="mt-2 fw-semibold fs-1" style={{ letterSpacing: "-0.3px" }}>{title}</h2>
        {subtitle && <p style={{ color: theme.sub }}>{subtitle}</p>}
        <div style={{ height: 3, width: 120, margin: "10px auto 0", background: theme.grad, borderRadius: 999 }} />
      </div>
    </Container>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "linear-gradient(90deg,#ecebfd,#f1f5f9)", marginTop: 48 }} />;
}

function DecorativeOrbs() {
  return (
    <>
      <div className="orb one" />
      <div className="orb two" />
    </>
  );
}

function NoiseOverlay() {
  return <div className="noise" style={{ position: "absolute", inset: 0 }} />;
}

/* Attach 'visible' to .reveal elements on scroll */
function RevealOnScroll() {
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      }, { threshold: 0.12 }
    );
    const nodes = document.querySelectorAll(".reveal");
    nodes.forEach(n => io.observe(n));
    return () => io.disconnect();
  }, []);
  return null;
}
