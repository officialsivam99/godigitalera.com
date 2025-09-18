// src/App.js

import React from 'react';
import Navbar from './components/navbar.js';
import HeroSection from './components/LandingPage/herosection.js'; // Import your new HeroSection
import { ThemeProvider } from './components/ThemeContext.js';
import LandingPage from './components/LandingPage.js';
import 'bootstrap/dist/css/bootstrap.min.css';

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
