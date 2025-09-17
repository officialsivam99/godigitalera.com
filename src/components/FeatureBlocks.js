import React from "react";

export default function FeatureBlocks({ theme="light", items=[] }) {
  const isDark = theme === "dark";
  return (
    <section className="fblocks-wrap">
      <style>{`
        .fblocks-wrap{padding:24px 0 70px}
        .fb-container{max-width:1200px;margin:0 auto;padding:0 16px}
        .row.gx-3{--bs-gutter-x:1rem}
        .fcard{
          border-radius:16px;padding:18px;height:100%;
          transition:transform .2s ease, box-shadow .2s ease, border-color .2s ease;
          display:flex;flex-direction:column;gap:10px
        }
        .fcard:hover{transform:translateY(-4px)}
        .f-title{font-weight:500;margin:4px 0}
        .f-desc{opacity:.95}
        .f-bullets{display:flex;flex-wrap:wrap;gap:8px}
        .pill{padding:6px 10px;border-radius:999px;font-size:13px}
        .light .fcard{background:#f8fafc;border:1px solid #e2e8f0;box-shadow:0 6px 18px rgba(2,6,23,.06)}
        .light .pill{background:#e2e8f0;border:1px solid #cbd5e1}
        .dark .fcard{background:#0f1630;border:1px solid #334155;box-shadow:0 12px 28px rgba(2,6,23,.35);color:#e7ecff}
        .dark .pill{background:#0b1020;border:1px solid #334155;color:#cfe2ff}
        .chip{font-size:12px;align-self:flex-start;padding:4px 8px;border-radius:999px;
          background:linear-gradient(90deg,#3b82f6,#a855f7);color:#fff}
      `}</style>

      <div className={`fb-container ${isDark ? "dark" : "light"}`}>
        <div className="row g-3">
          {items.map((it, idx) => (
            <div key={idx} className="col-md-6 col-lg-4">
              <article className="fcard">
                {it.badge && <span className="chip">{it.badge}</span>}
                <h5 className="f-title">{it.title}</h5>
                <p className="f-desc">{it.desc}</p>
                {Array.isArray(it.bullets) && (
                  <div className="f-bullets">
                    {it.bullets.map((b,i)=><span key={i} className="pill">{b}</span>)}
                  </div>
                )}
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
