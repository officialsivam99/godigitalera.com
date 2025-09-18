// src/components/LandingPage/HeroSection.js
import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../ThemeContext.js";

function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

const ArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* =============================================================================
   GRAPH ILLUSTRATIONS — now with radiant green contrast
============================================================================= */

/** 1) Traffic Acceleration — line/area growth with green energy */
function TrafficChart({ w = 520, h = 260 }) {
  const pts = [8,12,11,15,18,16,21,25,24,29,34,33,38,43,41,48,55,60];
  const max = Math.max(...pts) * 1.2;
  const stepX = w / (pts.length - 1);
  const path = pts.map((v, i) => `${i === 0 ? "M" : "L"} ${i * stepX},${h - (v / max) * h}`).join(" ");
  const area = `${path} L ${w},${h} L 0,${h} Z`;

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Traffic growth chart">
      <defs>
        {/* radiant green line + area */}
        <linearGradient id="lineGradG" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <linearGradient id="areaGradG" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(34,197,94,0.30)" />
          <stop offset="100%" stopColor="rgba(16,185,129,0.06)" />
        </linearGradient>
        <pattern id="gridG" width="32" height="24" patternUnits="userSpaceOnUse">
          <path d={`M 32 0 L 0 0 0 24`} fill="none" stroke="rgba(148,163,184,.18)" strokeWidth="1"/>
        </pattern>
      </defs>

      <rect x="0" y="0" width={w} height={h} fill="url(#gridG)" />
      <path d={area} fill="url(#areaGradG)">
        <animate attributeName="opacity" from="0" to="1" dur="0.9s" fill="freeze"/>
      </path>
      <path d={path} fill="none" stroke="url(#lineGradG)" strokeWidth="4.5" strokeLinejoin="round" strokeLinecap="round" filter="url(#glowG)">
        <animate attributeName="stroke-dasharray" from="0,1000" to="1000,0" dur="1s" fill="freeze"/>
      </path>
      {/* markers */}
      {pts.map((v, i) => {
        const x = i * stepX, y = h - (v / max) * h;
        return <circle key={i} cx={x} cy={y} r="2.6" fill="#22c55e" opacity={i%2?0.65:1} />
      })}
      {/* KPI pill */}
      <g transform={`translate(${w-168},16)`}>
        <rect rx="12" width="160" height="28" fill="rgba(4,12,20,.78)" />
        <text x="12" y="19" fontSize="12" fill="#bbf7d0">+118% organic (90d)</text>
      </g>
    </svg>
  );
}

/** 2) Conversion Engine — professional stage bars (no pyramid) */
function ConversionFunnel({ w = 520, h = 260 }) {
  // staged flow with conversion %, animated fills
  const steps = [
    { label: "Visits",        rate: 100 },
    { label: "View Offer",    rate: 62 },
    { label: "Add to Cart",   rate: 38 },
    { label: "Checkout",      rate: 26 },
    { label: "Purchase",      rate: 19 },
  ];
  const pad = 16;
  const rowH = (h - pad*2) / steps.length - 6;

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Conversion flow">
      <defs>
        <linearGradient id="barGradG" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#22c55e"/>
          <stop offset="100%" stopColor="#10b981"/>
        </linearGradient>
        <filter id="softGlowG" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {steps.map((s, i) => {
        const y = pad + i * (rowH + 12);
        const x = pad + 108;
        const trackW = w - x - pad;
        const fillW = Math.max(10, (s.rate/100) * trackW);

        return (
          <g key={s.label}>
            {/* label */}
            <text x={pad} y={y + rowH/2 + 5} fontSize="13" fill="#e2e8f0">{s.label}</text>

            {/* track */}
            <rect x={x} y={y} width={trackW} height={rowH} rx={10} fill="#0b1220" stroke="#233046" />

            {/* fill */}
            <rect x={x} y={y} width={fillW} height={rowH} rx={10} fill="url(#barGradG)" filter="url(#softGlowG)">
              <animate attributeName="width" from={10} to={fillW} dur="0.6s" begin={`${i * 0.1}s`} fill="freeze" />
            </rect>

            {/* % */}
            <text x={x + trackW - 36} y={y + rowH/2 + 5} fontSize="12" fill="#86efac">{s.rate}%</text>
          </g>
        );
      })}

      {/* foot stat */}
      <g transform={`translate(${pad}, ${h - 8})`}>
        <text x="0" y="0" fontSize="12" fill="#93c5fd">Form drop-off improved by 28% (last 30d)</text>
      </g>
    </svg>
  );
}

/** 3) AI Marketing — donut with green emphasis */
function AIDonut({ w = 520, h = 260 }) {
  const cx = w/2, cy = h/2, r = 84, strokeW = 24;
  const segments = [
    { label: "ROAS", val: 40, color: "#22c55e" },
    { label: "LTV",  val: 35, color: "#10b981" },
    { label: "CTR",  val: 25, color: "#3b82f6" },
  ];
  const total = segments.reduce((a,b)=>a+b.val,0);
  let acc = 0;

  const arcs = segments.map((s, i) => {
    const start = (acc / total) * Math.PI * 2 - Math.PI/2;
    acc += s.val;
    const end = (acc / total) * Math.PI * 2 - Math.PI/2;
    const large = end - start > Math.PI ? 1 : 0;
    const sx = cx + r * Math.cos(start), sy = cy + r * Math.sin(start);
    const ex = cx + r * Math.cos(end),   ey = cy + r * Math.sin(end);
    const d = `M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`;
    const len = r * (end - start);

    return (
      <path key={s.label} d={d} fill="none" stroke={s.color} strokeWidth={strokeW} strokeLinecap="round">
        <animate attributeName="stroke-dasharray" from={`0 ${len* r}`} to={`${len* r} 0`} dur="0.7s" begin={`${i * 0.15}s`} fill="freeze"/>
      </path>
    );
  });

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} role="img" aria-label="AI marketing performance mix">
      <circle cx={cx} cy={cy} r={r} stroke="rgba(148,163,184,.18)" strokeWidth={strokeW} fill="none" />
      {arcs}
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize="18" fill="#22c55e" fontWeight="700">+34%</text>
      <text x={cx} y={cy + 16} textAnchor="middle" fontSize="12" fill="#94a3b8">LTV (90d)</text>
      {/* legend */}
      <g transform={`translate(${cx + r + 24}, ${cy - 28})`}>
        {segments.map((s, i) => (
          <g key={s.label} transform={`translate(0, ${i * 18})`}>
            <rect width="10" height="10" fill={s.color} rx="2"/>
            <text x="14" y="10" fontSize="12" fill="#cbd5e1">{s.label}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

/* =============================================================================
   CARD SHELL
============================================================================= */
function GraphCard({ title, description, kind = "line" }) {
  return (
    <div style={styles.cardShell}>
      <div style={styles.cardHeader}>
        <div style={styles.cardBadge}/>
        <h5 style={styles.cardTitle}>{title}</h5>
      </div>
      <p style={styles.cardDesc}>{description}</p>
      <div style={styles.cardGraph}>
        {kind === "line" && <TrafficChart />}
        {kind === "funnel" && <ConversionFunnel />}
        {kind === "donut" && <AIDonut />}
      </div>
      <div style={styles.cardFooter}>
        <span style={styles.metaChip}>Live demo</span>
        <span style={styles.metaChip}>Auto-animate</span>
        <span style={styles.metaChipGlow}>Signal Boost</span>
      </div>
    </div>
  );
}

/* =============================================================================
   HERO SECTION
============================================================================= */
const cardData = [
  {
    title: "Traffic Acceleration",
    description: "SEO + Paid + Creators to scale qualified reach. Clean tracking, predictable lift.",
    kind: "line",
    to: "/solutions/traffic-acceleration",
  },
  {
    title: "Conversion Engine",
    description: "Weekly CRO sprints: LPs, forms, offers, analytics hygiene. Fewer steps, higher CR.",
    kind: "funnel",
    to: "/solutions/conversion-engine",
  },
  {
    title: "AI-Powered Marketing",
    description: "Predictive audiences, AI copy, smart bids. Signal-driven budgets that compound ROAS.",
    kind: "donut",
    to: "/solutions/ai-marketing",
  },
];

const HeroSection = () => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const frameRef = useRef(null);
  const [frameW, setFrameW] = useState(1200);

  useEffect(() => {
    const id = setInterval(() => setActiveIndex((p) => (p + 1) % cardData.length), 3000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const measure = () => { if (frameRef.current) setFrameW(frameRef.current.clientWidth || 1200); };
    measure();
    const ro = new ResizeObserver(measure);
    if (frameRef.current) ro.observe(frameRef.current);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  const BP = useMemo(() => {
    const isMobile = frameW < 640;
    const isTablet = frameW >= 640 && frameW < 1024;
    const padX = isMobile ? 16 : isTablet ? 28 : 64;
    const padY = isMobile ? 20 : isTablet ? 28 : 64;
    const h1Size = isMobile ? 26 : isTablet ? 34 : 40;
    return { isMobile, isTablet, padX, padY, h1Size };
  }, [frameW]);

  const G = useMemo(() => {
    const n = cardData.length;
    const baseLarge = 1200;
    const baseSmall = 220;
    const baseGap = 20;
    const baseHeight = 540;
    const baseSpread = baseLarge + (n - 1) * (baseSmall + baseGap);
    const available = Math.max(320, frameW - 2 * BP.padX);
    const scale = clamp(available / baseSpread, 0.4, 1);
    const large = Math.round(baseLarge * scale);
    const small = clamp(Math.round(baseSmall * scale), 100, 340);
    const gap = clamp(Math.round(baseGap * scale), 8, 32);
    const height = clamp(Math.round(baseHeight * scale), 280, 560);
    return { large, small, gap, height };
  }, [frameW, BP.padX]);

  const getCardStyle = (index) => {
    const base = {
      position: "absolute",
      height: `${G.height}px`,
      transition: "all 0.8s cubic-bezier(0.86, 0, 0.07, 1)",
      willChange: "transform, width",
    };
    if (index === activeIndex) {
      return { ...base, width: `${G.large}px`, transform: `translateX(${activeIndex * (G.small + G.gap)}px)`, zIndex: 10 };
    } else if (index < activeIndex) {
      return { ...base, width: `${G.small}px`, transform: `translateX(${index * (G.small + G.gap)}px)`, zIndex: 9 - (activeIndex - index) };
    } else {
      const rightOffset = activeIndex * (G.small + G.gap) + G.large + G.gap;
      return { ...base, width: `${G.small}px`, transform: `translateX(${rightOffset + (index - activeIndex - 1) * (G.small + G.gap)}px)`, zIndex: 8 };
    }
  };

  return (
    <main style={styles.heroContainer(theme)}>
      <div style={styles.heroFrame(BP)} ref={frameRef}>
        {/* TOP */}
        <div style={styles.topSection(BP)}>
          <div style={{ flex: 1 }}>
            <p style={styles.subtleText(BP)}>GROWTH CO. PLAYBOOKS</p>
            <h1 style={styles.heading(BP, theme)}>
              We craft <span style={{ fontWeight: 600, color:"#000000ff" }}>Data Driven Strategies</span> that turn online presence into profit.
            </h1>
          </div>
          <div style={styles.ctaWrapper(BP)}>
            <p style={styles.ctaText(BP, theme)}>
              From traffic to conversion and retention—your complete digital marketing system, shipped weekly.
            </p>
            <Link to="/book-a-call" style={styles.demoButton(BP)}>
              Book a Strategy Call
              <span style={styles.arrowCircle(BP)}><ArrowIcon /></span>
            </Link>
          </div>
        </div>

        {/* BOTTOM: animated cards */}
        <div style={styles.cardsSectionContainer(G, BP)}>
          <div style={styles.cardsWrapper}>
            {cardData.map((card, index) => (
              <div key={index} style={getCardStyle(index)}>
                <Link to={card.to} style={{ display: "block", height: "100%", textDecoration: "none", color: "inherit" }}>
                  <GraphCard title={card.title} description={card.description} kind={card.kind} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

/* =============================================================================
   STYLES
============================================================================= */
const styles = {
  heroContainer: (theme) => ({
    width: "100%",
    minHeight: "93vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(90deg, #1e1330 0%, #090f1a 40%, #0b1220 60%, #05070c 100%)",
    fontFamily: theme.fonts.body,
    padding: "2rem",
    boxSizing: "border-box",
  }),
  heroFrame: (BP) => ({
    width: "100%",
    maxWidth: 1400,
    minHeight: 640,
    background: "#ffffff",
    borderRadius: "32px",
    boxShadow: "0 40px 80px -20px rgba(0, 0, 0, 0.12)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: `${BP.padY}px ${BP.padX}px`,
    boxSizing: "border-box",
    overflow: "hidden",
  }),
  topSection: (BP) => ({
    display: "flex",
    flexDirection: BP.isMobile ? "column" : "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: BP.isMobile ? 12 : 24,
    width: "100%",
  }),
  subtleText: (BP) => ({
    color: "#22c55e",
    background: "linear-gradient(90deg, rgba(34,197,94,.12), rgba(16,185,129,.12))",
    border: "1px solid rgba(34,197,94,.25)",
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 999,
    fontWeight: 600,
    letterSpacing: "0.02em",
    fontSize: BP.isMobile ? 12 : 13,
    marginBottom: BP.isMobile ? "0.5rem" : "1rem",
  }),
  heading: (BP, theme) => ({
    fontSize: `${BP.h1Size}px`,
    fontWeight: 400,
    lineHeight: 1.2,
    maxWidth: BP.isMobile ? "100%" : "820px",
    color: theme.colors.text,
    margin: 0,
  }),
  ctaWrapper: (BP) => ({
    textAlign: BP.isMobile ? "left" : "right",
    maxWidth: BP.isMobile ? "100%" : 320,
  }),
  ctaText: (BP, theme) => ({
    color: theme.colors.secondaryText,
    lineHeight: 1.6,
    marginBottom: "1rem",
    fontSize: BP.isMobile ? 14 : 16,
  }),
  demoButton: (BP) => ({
    display: "inline-flex",
    alignItems: "center",
    padding: BP.isMobile ? "0.5rem 0.75rem 0.5rem 1rem" : "0.5rem 0.5rem 0.5rem 1.5rem",
    background: "linear-gradient(90deg,#22c55e,#10b981)",
    color: "white",
    border: "none",
    borderRadius: 999,
    fontSize: BP.isMobile ? "0.95rem" : "1rem",
    fontWeight: 600,
    cursor: "pointer",
    textDecoration: "none",
    boxShadow: "0 12px 28px rgba(16,185,129,.35)",
  }),
  arrowCircle: (BP) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: BP.isMobile ? 36 : 40,
    height: BP.isMobile ? 36 : 40,
    borderRadius: "50%",
    background: "white",
    color: "black",
    marginLeft: "1rem",
    flexShrink: 0,
  }),
  cardsSectionContainer: (G, BP) => ({
    width: "100%",
    height: `${G.height}px`,
    position: "relative",
    display: "flex",
    alignItems: "center",
    marginTop: BP.isMobile ? "0.5rem" : "1.25rem",
    overflow: "hidden",
  }),
  cardsWrapper: { position: "relative", width: "100%", height: "100%" },

  /* Card styles */
  cardShell: {
    height: "100%",
    borderRadius: 24,
    background: "#0f172a",
    color: "#e2e8f0",
    border: "1px solid #1f2937",
    boxShadow: "0 24px 64px rgba(2,6,23,.35)",
    display: "flex",
    flexDirection: "column",
    padding: 18,
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 6,
  },
  cardBadge: {
    width: 12, height: 12, borderRadius: "50%",
    background: "linear-gradient(90deg,#22c55e,#10b981)",
    boxShadow: "0 0 0 6px rgba(34,197,94,.18)",
  },
  cardTitle: { margin: 0, fontWeight: 500, letterSpacing: "-.2px" },
  cardDesc: { margin: "4px 0 10px", color: "#cbd5e1", fontSize: 14, lineHeight: 1.5 },
  cardGraph: {
    flex: 1,
    background: "#0b1220",
    border: "1px solid #233046",
    borderRadius: 16,
    padding: 12,
    overflow: "hidden",
  },
  cardFooter: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    marginTop: 10,
  },
  metaChip: {
    fontSize: 12,
    padding: "6px 10px",
    borderRadius: 999,
    background: "#0b1020",
    border: "1px solid #334155",
    color: "#cfe2ff",
  },
  metaChipGlow: {
    fontSize: 12,
    padding: "6px 10px",
    borderRadius: 999,
    background: "linear-gradient(90deg, rgba(34,197,94,.16), rgba(16,185,129,.16))",
    border: "1px solid rgba(34,197,94,.35)",
    color: "#bbf7d0",
    boxShadow: "0 0 0 3px rgba(34,197,94,.08) inset",
  },
};

export default HeroSection;
