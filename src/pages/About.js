import React from "react";
import PageHero from "../components/PageHero";

export default function About() {
  return (
    <main>
      <PageHero
        eyebrow="About"
        title="Operators who ship, not just advise"
        subtitle="We’re a cross-functional team across growth, data, and creative. Small on meetings, big on shipping."
        theme="light"
        ctas={[
          { label: "Playbooks", to: "/playbooks" },
          { label: "Book a Call", to: "/book-a-call", variant: "ghost" }
        ]}
      />
      <section className="about-wrap">
        <style>{`
          .about-wrap{padding:24px 0 70px;background:#ffffff;color:#0f172a}
          .about-container{max-width:1000px;margin:0 auto;padding:0 16px}
          .grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
          @media (max-width: 992px){.grid{grid-template-columns:1fr}}
          .card{background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:18px}
          .card h5{font-weight:500}
          .pill{padding:6px 10px;border-radius:999px;background:#e2e8f0;border:1px solid #cbd5e1;margin:4px;display:inline-block}
        `}</style>
        <div className="about-container">
          <div className="grid">
            <div className="card">
              <h5>What we believe</h5>
              <p>Velocity wins. Ship small improvements weekly, measure honestly, and double-down on signal.</p>
              <div>
                <span className="pill">Velocity</span>
                <span className="pill">Clarity</span>
                <span className="pill">Focus</span>
              </div>
            </div>
            <div className="card">
              <h5>How we work</h5>
              <p>Clear owners, weekly readouts, and a 90-day revenue plan. We align with your north-star KPI.</p>
              <div>
                <span className="pill">90-day plan</span>
                <span className="pill">Owner model</span>
                <span className="pill">Weekly readouts</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
