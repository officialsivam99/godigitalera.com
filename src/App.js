// src/App.js

import React from 'react';
import Navbar from './components/navbar.js';
import HeroSection from './components/herosection.js'; // Import your new HeroSection
import { ThemeProvider } from './components/ThemeContext.js';

function App() {
  return (
    <ThemeProvider>
      <div style={{ minHeight: '100vh', backgroundColor: '#121212' }}> {/* Set a dark background for the whole app */}
        <Navbar />
        <HeroSection />
        {/* Your other page content would go here, perhaps in a different section or component */}
        <main style={{ padding: '2rem', color: '#E0E0E0' }}> {/* Example content below hero */}
          {/* <h2>Our Services</h2>
          <p>More content about your digital marketing services.</p> */}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;