import React from "react";
import PageHero from "../components/PageHero";

export default function Playbooks() {
  const items = [
    { badge:"Acquisition", title:"Traffic Acceleration", desc:"SEO sprints + performance media + creators.", bullets:["Clusters","PMAX","UGC"] },
    { badge:"Conversion", title:"Conversion Engine", desc:"Ship weekly. A/Bs, LPs, forms, pricing.", bullets:["Hypotheses","Velocity","Readouts"] },
    { badge:"Retention", title:"LTV & Loyalty", desc:"Flows, segments, and offers that compound.", bullets:["Welcome","Winback","VIP"] },
  ];
  return (
    <main>
      <PageHero
        eyebrow="Playbooks"
        title="Repeatable systems that compound"
        subtitle="Choose a playbook, plug into ops, and watch the metrics move. Clear deliverables, weekly cadence."
        theme="dark"
        ctas={[
          { label: "Book a Call", to: "/book-a-call" },
          { label: "About Us", to: "/about", variant: "ghost" }
        ]}
      />
      <section className="pb-wrap">
        <style>{`
          .pb-wrap{padding:24px 0 70px;background:#0b1020;color:#eef2ff}
          .pb-container{max-width:1200px;margin:0 auto;padding:0 16px}
          .pb-card{background:#0f1630;border:1px solid #334155;border-radius:16px;padding:18px;height:100%;
            box-shadow:0 12px 28px rgba(2,6,23,.35)}
          .pb-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px}
          .pill{padding:6px 10px;border-radius:999px;background:#0b1020;border:1px solid #334155;color:#cfe2ff;font-size:12px;margin-right:6px}
          .pb-title{font-weight:500;margin:8px 0}
          .row-btns{display:flex;gap:10px;margin-top:12px}
          .btn{border-radius:10px;padding:10px 14px;text-decoration:none}
          .btn-pri{background:linear-gradient(90deg,#3b82f6,#a855f7);color:#fff}
          .btn-gst{border:1px solid #64748b;color:#e2e8f0}
        `}</style>
        <div className="pb-container">
          <div className="pb-grid">
            {items.map((it, idx) => (
              <article key={idx} className="pb-card">
                <span className="pill">{it.badge}</span>
                <h5 className="pb-title">{it.title}</h5>
                <p className="mb-2">{it.desc}</p>
                <div>{it.bullets.map((b,i)=><span className="pill" key={i}>{b}</span>)}</div>
                <div className="row-btns">
                  <a className="btn btn-pri" href="/book-a-call" onClick={(e)=>e.preventDefault()}>Use in call →</a>
                  <a className="btn btn-gst" href="/about" onClick={(e)=>e.preventDefault()}>Learn more</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
