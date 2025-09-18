// src/components/Footer.jsx
import React, { useState } from "react";
import {
  Container, Row, Col, Form, Button, InputGroup, Badge, Nav, Alert, Card
} from "react-bootstrap";
import { Link } from "react-router-dom"; // Add this import

export default function Footer() {
  /* ===== Theme (inline) ===== */
  const theme = {
    grad: "linear-gradient(90deg, #7c3aed 0%, #4761ff 100%)",
    gradAlt: "linear-gradient(90deg, #ff4d8d 0%, #7c3aed 100%)",
    darkBg: "#0b0b12",
    ink: "#111827",
    sub: "rgba(255,255,255,.72)",
    border: "1px solid rgba(255,255,255,.14)",
  };

  const wrap = { background: theme.darkBg, color: "#fff", position: "relative" };
  const hairline = { height: 1, background: "linear-gradient(90deg,#4338ca33,#8b5cf633,#0ea5e933)" };

  const glass = {
    borderRadius: 14,
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(8px)",
    border: theme.border,
  };

  const gradBtn = { background: theme.grad, border: "none" };
  const ghostBtn = { background: "transparent", border: "1px solid rgba(255,255,255,.2)", color: "#fff" };

  /* ===== State ===== */
  const [email, setEmail] = useState("");
  const [lang, setLang] = useState("en");
  const [ccy, setCcy] = useState("INR");
  const [msg, setMsg] = useState("");

  const subscribe = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setMsg("Please enter a valid email.");
      return;
    }
    setMsg("Subscribed! You’ll hear from us soon.");
    setEmail("");
    setTimeout(() => setMsg(""), 2500);
  };

  const backToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  /* ===== Data ===== */
  const links = {
    Services: [
      ["Web Development", "./WebDevelopmentService"],
      ["Social Media Marketing", "./SocialMediaMarketing"],
      ["Search Engine Optimization", "./SearchEngineOptimization"],
      ["PPC & Performance", "./PayPerClickMarketing"],
      ["Email Marketing", "./EmailMarketing"],
      ["Analytics", "./AnalyticsDashboard"],
      
    ],
    Company: [
      ["About", "#"],
      ["Careers", "#"],
      ["Partners", "#"],
      ["Contact", "#quote"],
    ],
    Resources: [
      ["Case Studies", "#"],
      ["Blog", "#"],
      ["Templates", "#"],
      ["Guides & Playbooks", "#"],
    ],
    Legal: [
      ["Privacy Policy", "./PrivacyPolicy"],
      ["Terms of Service", "./Terms"],
      ["Refund Policy", "./ReturnRefund"]
    ],
  };

  const year = new Date().getFullYear();

  return (
    <footer style={wrap}>
      {/* Top CTA */}
      <div style={{ padding: "28px 0", background: "rgba(255,255,255,.02)" }}>
        <Container>
          <Row className="align-items-center g-3">
            <Col md={7}>
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <Badge className="rounded-3" style={{ background: theme.grad }}>Let’s build</Badge>
                <h5 className="mb-0">Something iconic for your brand</h5>
              </div>
              <div className="small mt-1" style={{ color: theme.sub }}>
                Ship faster with conversion-first UX and clean analytics.
              </div>
            </Col>
            <Col md={5} className="text-md-end">
              <a href="#quote" className="btn btn-lg me-2" style={gradBtn}>
                Request a quote <i className="bi bi-arrow-right ms-1" />
              </a>
              <a href="#contact" className="btn btn-lg" style={ghostBtn}>
                Talk to us <i className="bi bi-telephone-outbound ms-1" />
              </a>
            </Col>
          </Row>
        </Container>
      </div>

      <div style={hairline} />

      {/* Main */}
      <section style={{ padding: "56px 0" }}>
        <Container>
          <Row className="g-4">
            {/* Brand + Social + Newsletter */}
            <Col lg={4}>
              <div className="d-flex align-items-center gap-2 mb-2">
                <div
                  style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: theme.grad,
                  }}
                />
                <div className="h4 mb-0">Digital Rise</div>
              </div>
              <p className="small" style={{ color: theme.sub }}>
                Full-stack digital growth—build, acquire, and measure.
                Websites, SEO, PPC, Email, and Analytics under one roof.
              </p>

              <div className="d-flex gap-2 mb-3">
                {[
                  ["twitter", "https://x.com/"], ["instagram", "https://instagram.com/"],
                  ["linkedin", "https://linkedin.com/"], ["youtube", "https://youtube.com/"]
                ].map(([k, href]) => (
                  <a key={k} href={href} target="_blank" rel="noreferrer"
                     className="btn btn-sm"
                     style={{ ...ghostBtn, width: 40, height: 40, borderRadius: 10, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                    <i className={`bi bi-${k}`} />
                  </a>
                ))}
              </div>

              <Card style={glass}>
                <Card.Body className="p-3">
                  <div className="fw-semibold mb-1">Subscribe to updates</div>
                  <div className="small mb-2" style={{ color: theme.sub }}>
                    Monthly case studies & playbooks. No spam.
                  </div>
                  <Form onSubmit={subscribe}>
                    <InputGroup>
                      <Form.Control
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ background: "rgba(255,255,255,.06)", color: "#fff", border: theme.border }}
                        required
                      />
                      <Button type="submit" style={gradBtn}>Subscribe</Button>
                    </InputGroup>
                  </Form>
                  {msg && <div className="small mt-2">{msg}</div>}
                </Card.Body>
              </Card>
            </Col>

            {/* Link Columns */}
            <Col lg={5}>
              <Row className="g-4">
                {Object.entries(links).map(([head, items]) => (
                  <Col xs={6} key={head}>
                    <div className="fw-semibold mb-2">{head}</div>
                    <Nav className="flex-column small">
                      {items.map(([label, href]) => (
                        <Nav.Link
                          key={label}
                          as={Link}
                          to={href.replace('./', '/')} // Convert './PrivacyPolicy' to '/PrivacyPolicy'
                          className="px-0 py-1"
                          style={{ color: theme.sub }}
                        >
                          {label}
                        </Nav.Link>
                      ))}
                    </Nav>
                  </Col>
                ))}
              </Row>
            </Col>

            {/* Contact + Prefs */}
            <Col lg={3} id="contact">
              <div className="fw-semibold mb-2">Contact</div>
              <div className="small" style={{ color: theme.sub }}>
                {/* <div className="mb-1"><i className="bi bi-geo-alt me-2" /> 221B Baker Street, Mumbai, IN</div>
                <div className="mb-1"><i className="bi bi-telephone me-2" /> +91 90000 00000</div> */}
                <div><i className="bi bi-envelope me-2" /> info@mydigitalrise.com</div>
              </div>

              <div className="fw-semibold mt-3 mb-2">Preferences</div>
              <div className="d-flex gap-2">
                <Form.Select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  size="sm"
                  style={{ background: "rgba(255,255,255,.06)", color: "#fff", border: theme.border }}
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                </Form.Select>
                <Form.Select
                  value={ccy}
                  onChange={(e) => setCcy(e.target.value)}
                  size="sm"
                  style={{ background: "rgba(255,255,255,.06)", color: "#fff", border: theme.border }}
                >
                  <option value="INR">INR ₹</option>
                  <option value="USD">USD $</option>
                </Form.Select>
              </div>

              <div className="small mt-3" style={{ color: theme.sub }}>
                <i className="bi bi-shield-check me-2" />
                ISO-friendly security & data handling
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <div style={hairline} />

      {/* Bottom bar */}
      <section style={{ padding: "16px 0" }}>
        <Container>
          <Row className="align-items-center gy-2">
            <Col md={4} className="small" style={{ color: theme.sub }}>
              © {year} Digital Rise — All rights reserved.
            </Col>
            <Col md={4} className="text-md-center">
              <Button variant="outline-light" size="sm" onClick={backToTop}
                      style={{ borderRadius: 999, border: "1px solid rgba(255,255,255,.25)" }}>
                <i className="bi bi-arrow-up" /> Back to top
              </Button>
            </Col>
            <Col md={4} className="text-md-end">
              <Nav className="justify-content-md-end small">
                {[
                  ["Privacy", "#"], ["Terms", "#"], ["Sitemap", "#"]
                ].map(([label, href]) => (
                  <Nav.Link key={label} href={href} className="px-2" style={{ color: theme.sub }}>
                    {label}
                  </Nav.Link>
                ))}
              </Nav>
            </Col>
          </Row>
        </Container>
      </section>

      {/* tiny local effects */}
      <style>{`
        footer a.nav-link:hover { color: #fff !important; }
        .btn:hover i { transform: translateX(2px); transition: transform .15s ease; }
      `}</style>

      {/* Toast area */}
      {msg && (
        <div style={{ position: "fixed", bottom: 12, right: 12, zIndex: 1060 }}>
          <Alert variant="success" className="shadow-sm border-0">{msg}</Alert>
        </div>
      )}
    </footer>
  );
}
