import React from "react";
import { Routes, Route } from "react-router-dom";

import { ThemeProvider } from "./components/ThemeContext.js";
import Navbar from "./components/navbar.js";
import LandingPage from "./components/LandingPage.js";
import Footer from "./components/footer.js";
import "bootstrap/dist/css/bootstrap.min.css";

// --- Solutions pages ---
import TrafficAcceleration from "./pages/solutions/TrafficAcceleration.js";
import ConversionEngine from "./pages/solutions/ConversionEngine.js";
import AIMarketing from "./pages/solutions/AIMarketing.js";
import Retention from "./pages/solutions/Retention.js";
import InfluencerCommunity from "./pages/solutions/InfluencerCommunity.js";

// --- Industries pages ---
import SaaS from "./pages/industries/SaaS.js";
import Ecommerce from "./pages/industries/Ecommerce.js";
import Healthcare from "./pages/industries/Healthcare.js";
import RealEstate from "./pages/industries/RealEstate.js";
import Local from "./pages/industries/Local.js";

// --- Top-level pages ---
import Playbooks from "./pages/Playbooks.js";
import About from "./pages/About.js";
import BookACall from "./pages/BookACall.js";
import NotFound from "./pages/NotFound.js";

function App() {
  return (
    <ThemeProvider>
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#121212",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />

        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />

            {/* Solutions */}
            <Route path="/solutions/traffic-acceleration" element={<TrafficAcceleration />} />
            <Route path="/solutions/conversion-engine" element={<ConversionEngine />} />
            <Route path="/solutions/ai-marketing" element={<AIMarketing />} />
            <Route path="/solutions/retention" element={<Retention />} />
            <Route path="/solutions/influencer-community" element={<InfluencerCommunity />} />

            {/* Industries */}
            <Route path="/industries/saas" element={<SaaS />} />
            <Route path="/industries/ecommerce" element={<Ecommerce />} />
            <Route path="/industries/healthcare" element={<Healthcare />} />
            <Route path="/industries/real-estate" element={<RealEstate />} />
            <Route path="/industries/local" element={<Local />} />

            {/* Other */}
            <Route path="/playbooks" element={<Playbooks />} />
            <Route path="/about" element={<About />} />
            <Route path="/book-a-call" element={<BookACall />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <footer style={{ padding: "2rem 0", color: "#E0E0E0" }}>
          <Footer />
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;