import React, { useEffect, useRef } from "react";

export default function ProcessSection({ brand = "Growth Co.", onCTAClick }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll("[data-reveal]") || [];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("reveal-in")),
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const steps = [
    {
      tag: "Audit & Plan",
      title: "90-Day Revenue Plan",
      desc:
        "Quick but deep audit across SEO, Paid, Analytics & Funnels. A prioritized 90-day plan tied to revenue KPIs.",
      bullets: ["KPI tree & north-star", "Channel mix & budgets", "Roadmap with owners"],
      link: "/playbooks",
    },
    {
      tag: "Build & Ship",
      title: "Conversion Engine",
      desc:
        "Weekly increments shipped: LPs, creatives, tracking fixes, and experiments to remove friction & lift CR.",
      bullets: ["LPs & CRO", "Offer & messaging tests", "Clean tracking"],
      link: "/solutions/conversion-engine",
    },
    {
      tag: "Measure & Learn",
      title: "Signal > Noise",
      desc:
        "Clean dashboards + readouts so you know what moved and why—tight feedback loops for faster learnings.",
      bullets: ["Attribution sanity", "Weekly readouts", "Learning backlog"],
      link: "/solutions/ai-marketing",
    },
    {
      tag: "Optimize & Scale",
      title: "Traffic Acceleration",
      desc:
        "Scale the proven: SEO sprints, paid efficiency, creators, and retention plays compounding AOV, ROAS & LTV.",
      bullets: ["SEO & paid scale", "Creators/influencers", "LTV & retention"],
      link: "/solutions/traffic-acceleration",
    },
  ];

  return (
    <section className="process-wrap" style={{ position: "relative", overflow: "hidden" }}>
  <style>{`
    .process-wrap{padding:84px 0;background:#ffffff;color:#333}
    .process-container{max-width:1200px;margin:0 auto;padding:0 16px}
    .process-eyebrow{display:inline-flex;gap:8px;align-items:center;padding:4px 10px;border-radius:999px;background:#f1f5f9;border:1px solid #e2e8f0;font-weight:400;font-size:14px;color:#334155}
    .dot{width:8px;height:8px;border-radius:50%;background:linear-gradient(90deg,#2563eb,#7c3aed)}
    .process-title{font-weight:400;letter-spacing:-.2px;line-height:1.2;margin:14px 0 10px;color:#111827}
    .process-sub{color:#475569;max-width:640px;font-weight:400}
    .process-grid{display:grid;grid-template-columns:320px 1fr;gap:28px;align-items:start;margin-top:36px}
    @media (max-width: 992px){.process-grid{grid-template-columns:1fr}}
    .kpi-card{position:sticky;top:84px;background:#f9fafb;border:1px solid #e2e8f0;border-radius:16px;padding:20px}
    .kpi-pill{display:flex;align-items:center;gap:8px;font-weight:400;color:#1e293b}
    .kpi-big{font-size:32px;font-weight:400;color:#0f172a;margin:8px 0 2px}
    .kpi-sub{color:#475569;font-size:14px}
    .kpi-divider{height:1px;background:#e2e8f0;margin:16px 0}
    .kpi-badges{display:flex;flex-wrap:wrap;gap:8px}
    .badge-chip{padding:6px 10px;border-radius:12px;background:#f1f5f9;border:1px solid #e2e8f0;color:#334155;font-weight:400;font-size:14px}
    .kpi-cta{display:flex;gap:10px;margin-top:12px}
    .btn-ghost{background:transparent;border:1px solid #cbd5e1;color:#334155;border-radius:8px;padding:8px 12px;font-weight:400;font-size:14px}
    .btn-ghost:hover{background:#f1f5f9}
    .btn-primary-soft{background:linear-gradient(90deg,#2563eb,#7c3aed);border:none;color:#fff;border-radius:8px;padding:8px 12px;font-weight:400;font-size:14px}
    .btn-primary-soft:hover{opacity:.9}
    .timeline{position:relative;padding-left:24px}
    .rail{position:absolute;left:8px;top:0;bottom:0;width:2px;background:#e2e8f0}
    .step{position:relative;margin-bottom:18px;opacity:0;transform:translateY(8px)}
    .step .node{position:absolute;left:-5px;top:20px;width:12px;height:12px;border-radius:50%;background:linear-gradient(90deg,#2563eb,#7c3aed)}
    .card{background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:16px;transition:box-shadow .2s ease}
    .card:hover{box-shadow:0 6px 16px rgba(0,0,0,.08)}
    .tag{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:400;padding:4px 8px;border-radius:999px;background:#eff6ff;color:#1d4ed8;border:1px solid #bfdbfe}
    .title{margin:10px 0 6px;font-weight:400;color:#111827}
    .desc{color:#475569;margin-bottom:10px;font-weight:400}
    .bullets{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}
    .pill{padding:6px 8px;border-radius:999px;background:#f1f5f9;border:1px solid #e2e8f0;color:#334155;font-weight:400;font-size:13px}
    .card-foot{display:flex;align-items:center;justify-content:space-between;gap:12px}
    .foot-link{font-weight:400;color:#2563eb}
    .foot-meter{height:6px;border-radius:999px;background:#f1f5f9;position:relative;overflow:hidden;flex:1}
    .foot-meter > span{position:absolute;left:0;top:0;bottom:0;width:0%;background:linear-gradient(90deg,#2563eb,#7c3aed)}
    [data-reveal]{opacity:0;transform:translateY(10px)}
    .reveal-in{opacity:1 !important;transform:translateY(0) !important;transition:opacity .6s ease, transform .6s ease}
    .reveal-in .foot-meter > span{animation:loadbar 1.2s ease forwards .2s}
    @keyframes loadbar{from{width:0%}to{width:92%}}
  `}</style>

  <div className="process-container">
    <div className="text-center" data-reveal>
      <span className="process-eyebrow"><span className="dot"/> Our Process</span>
      <h2 className="process-title display-6">Ship. Measure. Optimize. Repeat.</h2>
      <p className="process-sub mx-auto">
        A focused cadence that compounds growth. Fewer slides, more shipping—always tied to revenue.
      </p>
    </div>

    <div className="process-grid">
      <aside className="kpi-card" data-reveal>
        <div className="kpi-pill"><span className="dot" /> Growth Co.</div>
        <div className="kpi-big">+32% avg. CR</div>
        <div className="kpi-sub">after 90 days across LPs</div>
        <div className="kpi-divider"/>
        <div className="kpi-badges">
          <span className="badge-chip">SEO + Paid + Creators</span>
          <span className="badge-chip">CRO / LP sprints</span>
          <span className="badge-chip">Clean tracking</span>
          <span className="badge-chip">LTV & retention</span>
        </div>
        <div className="kpi-cta">
          <a href="/playbooks" className="btn-ghost">View playbooks</a>
          <a href="/book-a-call" className="btn-primary-soft">Book a strategy call</a>
        </div>
      </aside>

      <div className="timeline">
        <div className="rail"/>
        <div className="step" data-reveal>
          <div className="node"/>
          <div className="card">
            <div className="tag">Audit & Plan</div>
            <h5 className="title">90-Day Revenue Plan</h5>
            <p className="desc">Quick audit across SEO, Paid, Analytics & Funnels. Prioritized 90-day plan tied to revenue KPIs.</p>
            <div className="bullets">
              <span className="pill">• KPI tree & north-star</span>
              <span className="pill">• Channel mix & budgets</span>
              <span className="pill">• Roadmap with owners</span>
            </div>
            <div className="card-foot">
              <a className="foot-link text-decoration-none" href="/playbooks">Learn more →</a>
              <div className="foot-meter" aria-label="progress"><span/></div>
            </div>
          </div>
        </div>

        <div className="step" data-reveal>
          <div className="node"/>
          <div className="card">
            <div className="tag">Build & Ship</div>
            <h5 className="title">Conversion Engine</h5>
            <p className="desc">Weekly increments shipped: LPs, creatives, tracking fixes, experiments to lift CR.</p>
            <div className="bullets">
              <span className="pill">• LPs & CRO</span>
              <span className="pill">• Offer & messaging tests</span>
              <span className="pill">• Clean tracking</span>
            </div>
            <div className="card-foot">
              <a className="foot-link text-decoration-none" href="/solutions/conversion-engine">Learn more →</a>
              <div className="foot-meter" aria-label="progress"><span/></div>
            </div>
          </div>
        </div>

        <div className="step" data-reveal>
          <div className="node"/>
          <div className="card">
            <div className="tag">Measure & Learn</div>
            <h5 className="title">Signal  Noise</h5>
            <p className="desc">Clean dashboards so you know what moved and why—tight feedback loops.</p>
            <div className="bullets">
              <span className="pill">• Attribution sanity</span>
              <span className="pill">• Weekly readouts</span>
              <span className="pill">• Learning backlog</span>
            </div>
            <div className="card-foot">
              <a className="foot-link text-decoration-none" href="/solutions/ai-marketing">Learn more →</a>
              <div className="foot-meter" aria-label="progress"><span/></div>
            </div>
          </div>
        </div>

        <div className="step" data-reveal>
          <div className="node"/>
          <div className="card">
            <div className="tag">Optimize & Scale</div>
            <h5 className="title">Traffic Acceleration</h5>
            <p className="desc">Scale the proven: SEO sprints, paid efficiency, creators, retention plays compounding AOV, ROAS & LTV.</p>
            <div className="bullets">
              <span className="pill">• SEO & paid scale</span>
              <span className="pill">• Creators/influencers</span>
              <span className="pill">• LTV & retention</span>
            </div>
            <div className="card-foot">
              <a className="foot-link text-decoration-none" href="/solutions/traffic-acceleration">Learn more →</a>
              <div className="foot-meter" aria-label="progress"><span/></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

  );
}
