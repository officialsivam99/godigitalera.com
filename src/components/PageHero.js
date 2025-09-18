import React from "react";
import { Link } from "react-router-dom";

/** Reusable hero with subtle gradient + regular weights */
export default function PageHero({ eyebrow="",
  title="", subtitle="", theme="light", ctas=[]
}) {
  const isDark = theme === "dark";
  return (
    <section className="pagehero-wrap" style={{ position:"relative", isolation:"isolate" }}>
      <style>{`
        .pagehero-wrap{padding:72px 0; overflow:hidden;}
        .ph-container{max-width:1200px;margin:0 auto;padding:0 16px}
        .ph-eyebrow{display:inline-flex;gap:8px;align-items:center;padding:6px 12px;border-radius:999px;
          font-size:14px;border:1px solid;
        }
        .ph-title{letter-spacing:-.2px;margin:12px 0 8px;font-weight:400;line-height:1.15}
        .ph-sub{max-width:760px;margin:0 auto 14px;font-weight:400}
        .ph-ctas{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:12px}
        .btn-pri, .btn-ghost{border-radius:12px;padding:10px 16px;text-decoration:none}
        .btn-pri{background:linear-gradient(90deg,#3b82f6,#a855f7);color:#fff;border:0;box-shadow:0 10px 24px rgba(59,130,246,.25)}
        .btn-pri:hover{opacity:.95;transform:translateY(-1px)}
        .btn-ghost{border:1px solid currentColor}
        .btn-ghost:hover{background:rgba(255,255,255,.06)}
        /* themes */
        .light{background:#ffffff;color:#0f172a}
        .light .ph-eyebrow{background:#e0f2fe;color:#075985;border-color:#bae6fd}
        .light .btn-ghost{color:#0f172a;border-color:#cbd5e1}
        .dark{background:#0b1020;color:#eef2ff}
        .dark .ph-eyebrow{background:rgba(59,130,246,.18);color:#bfdbfe;border-color:#334155}
        .dark .btn-ghost{color:#e2e8f0;border-color:#64748b}
        /* soft gradient backdrop */
        .pagehero-wrap:before{
          content:"";position:absolute;inset:-40% -10% 60% -10%;
          background:radial-gradient(40% 50% at 50% 20%, rgba(124,58,237,.18), transparent 60%),
                     radial-gradient(30% 50% at 70% 10%, rgba(59,130,246,.18), transparent 60%);
          pointer-events:none;z-index:0;filter:blur(20px);
        }
        .ph-inner{position:relative;z-index:1;text-align:center}
      `}</style>

      <div className={`ph-container ${isDark ? "dark" : "light"}`}>
        <div className="ph-inner">
          {eyebrow && <span className="ph-eyebrow">{eyebrow}</span>}
          <h1 className="ph-title display-6">{title}</h1>
          <p className="ph-sub">{subtitle}</p>
          {ctas?.length > 0 && (
            <div className="ph-ctas">
              {ctas.map((c,i) =>
                <Link key={i} to={c.to} className={c.variant==="ghost" ? "btn-ghost" : "btn-pri"}>
                  {c.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
