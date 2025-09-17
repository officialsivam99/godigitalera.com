import React, { useEffect } from "react";
import { Link } from "react-router-dom";

/**
 * Bootstrap 5 required:
 *  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
 *  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
 *
 * Add the CSS at the bottom to src/index.css (or global CSS).
 */

export default function Navbar() {
  useEffect(() => {
    // Hover open on desktop (lg+), click on mobile
    const mq = window.matchMedia("(min-width: 992px)");
    const dropdowns = document.querySelectorAll(".navbar .dropdown");

    function setup() {
      dropdowns.forEach((dd) => {
        const toggle = dd.querySelector("[data-bs-toggle='dropdown']");
        const menu = dd.querySelector(".dropdown-menu");
        if (!toggle || !menu) return;

        dd.onmouseenter = null;
        dd.onmouseleave = null;

        if (mq.matches) {
          dd.onmouseenter = () => {
            dd.classList.add("show");
            menu.classList.add("show");
            toggle.setAttribute("aria-expanded", "true");
          };
          dd.onmouseleave = () => {
            dd.classList.remove("show");
            menu.classList.remove("show");
            toggle.setAttribute("aria-expanded", "false");
          };
        }
      });
    }

    setup();
    mq.addEventListener("change", setup);
    return () => mq.removeEventListener("change", setup);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top" style={{ backdropFilter: "saturate(180%) blur(8px)" }}>
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-bold" to="/" style={{ letterSpacing: ".2px", textDecoration: "none" }}>
          Growth Co.
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Nav */}
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav mx-lg-auto align-items-lg-center gap-lg-2">
            {/* Solutions (Compact Mega) */}
            <li className="nav-item dropdown mega-parent position-relative">
              <button
                className="nav-link dropdown-toggle fw-semibold btn btn-link"
                id="solutionsMenu"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ textDecoration: "none" }}
              >
                Solutions
              </button>
              <div
                className="dropdown-menu mega-card start-50 translate-middle-x py-3"
                aria-labelledby="solutionsMenu"
              >
                <div className="mega-2col">
                  <Link className="mega-item text-decoration-none" to="/solutions/traffic-acceleration">
                    <div className="mega-title">Traffic Acceleration</div>
                    <div className="mega-desc">SEO + Paid + Creators to scale reach</div>
                  </Link>
                  <Link className="mega-item text-decoration-none" to="/solutions/conversion-engine">
                    <div className="mega-title">Conversion Engine</div>
                    <div className="mega-desc">CRO, landing pages, A/B testing</div>
                  </Link>
                  <Link className="mega-item text-decoration-none" to="/solutions/ai-marketing">
                    <div className="mega-title">AI-Powered Marketing</div>
                    <div className="mega-desc">Predictive targeting, AI copy, smart bids</div>
                  </Link>
                  <Link className="mega-item text-decoration-none" to="/solutions/retention">
                    <div className="mega-title">Retention & Loyalty</div>
                    <div className="mega-desc">Email/SMS automation, LTV growth</div>
                  </Link>
                  <Link className="mega-item text-decoration-none" to="/solutions/influencer-community">
                    <div className="mega-title">Influencer & Community</div>
                    <div className="mega-desc">Creators, social, community flywheels</div>
                  </Link>
                </div>
              </div>
            </li>

            {/* Industries (Compact Mega) */}
            <li className="nav-item dropdown mega-parent position-relative">
              <button
                className="nav-link dropdown-toggle fw-semibold btn btn-link"
                id="industriesMenu"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ textDecoration: "none" }}
              >
                Industries
              </button>
              <div
                className="dropdown-menu mega-card start-50 translate-middle-x py-3"
                aria-labelledby="industriesMenu"
              >
                <div className="mega-2col">
                  <Link className="mega-item text-decoration-none" to="/industries/saas">
                    <div className="mega-title">SaaS Growth Lab</div>
                    <div className="mega-desc">Trials, demos, MQL→SQL funnels</div>
                  </Link>
                  <Link className="mega-item text-decoration-none" to="/industries/ecommerce">
                    <div className="mega-title">eCommerce Accelerator</div>
                    <div className="mega-desc">AOV, ROAS & LTV compounding</div>
                  </Link>
                  <Link className="mega-item text-decoration-none" to="/industries/healthcare">
                    <div className="mega-title">Healthcare Digital Trust</div>
                    <div className="mega-desc">Local SEO, credibility, HIPAA-aware UX</div>
                  </Link>
                  <Link className="mega-item text-decoration-none" to="/industries/real-estate">
                    <div className="mega-title">Real Estate Funnels</div>
                    <div className="mega-desc">Lead gen, remarketing, nurturing</div>
                  </Link>
                  <Link className="mega-item text-decoration-none" to="/industries/local">
                    <div className="mega-title">Local Domination</div>
                    <div className="mega-desc">Maps, reviews, calls & bookings</div>
                  </Link>
                </div>
              </div>
            </li>

            {/* Playbooks */}
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/playbooks">Playbooks</Link>
            </li>

            {/* About */}
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/about">About</Link>
            </li>
          </ul>

          {/* CTA */}
          <div className="d-flex">
            <Link to="/book-a-call" className="btn btn-primary fw-bold rounded-4 px-3 px-lg-4">
              Book a Strategy Call
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
