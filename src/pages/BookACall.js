import React from "react";
import PageHero from "../components/PageHero";
import { Link } from "react-router-dom";

export default function BookACall() {
  return (
    <main>
      <PageHero
        eyebrow="Get Started"
        title="Book a Strategy Call"
        subtitle="Bring your goals, we’ll bring a clear 90-day plan. Zero fluff."
        theme="dark"
        ctas={[
          { label: "Playbooks", to: "/playbooks" },
          { label: "About Us", to: "/about", variant: "ghost" }
        ]}
      />
      <section className="call-wrap">
        <style>{`
          .call-wrap{padding:24px 0 80px;background:#0b1020;color:#eef2ff}
          .call-container{max-width:900px;margin:0 auto;padding:0 16px}
          .card{background:#0f1630;border:1px solid #334155;border-radius:16px;padding:20px;
            box-shadow:0 12px 28px rgba(2,6,23,.35)}
          .row-btns{display:flex;gap:10px;margin-top:12px;flex-wrap:wrap}
          .btn{border-radius:10px;padding:10px 14px;text-decoration:none}
          .btn-pri{background:linear-gradient(90deg,#3b82f6,#a855f7);color:#fff}
          .btn-gst{border:1px solid #64748b;color:#e2e8f0}
          .input{background:#0b1020;border:1px solid #334155;border-radius:10px;color:#e7ecff;padding:10px;width:100%}
          .grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
          @media (max-width: 768px){.grid{grid-template-columns:1fr}}
        `}</style>
        <div className="call-container">
          <div className="card">
            <div className="grid">
              <input className="input" placeholder="Your name" />
              <input className="input" placeholder="Work email" />
              <input className="input" placeholder="Company" />
              <input className="input" placeholder="Website" />
            </div>
            <textarea className="input" style={{marginTop:12}} rows="4" placeholder="Goals / where you need help" />
            <div className="row-btns">
              {/* Demo buttons (no backend) — navigate internally */}
              <Link to="/" className="btn btn-gst">Back to Home</Link>
              <Link to="/playbooks" className="btn btn-pri">See playbooks</Link>
            </div>
            <p className="mt-3 mb-0" style={{opacity:.8,fontSize:14}}>
              Prefer email? Reach us via <span style={{color:"#bfdbfe"}}>hello@growth.co</span>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
