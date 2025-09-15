// src/theme.js

export const theme = {
  colors: {
    primary: '#00BFA6',    // A professional, vibrant teal/green for buttons and highlights
    accent: '#007BFF',     // A secondary blue for links or other accents
    
    background: '#F7F8FA', // A soft, off-white for the main page background (easier on the eyes than pure white)
    cardBackground: '#FFFFFF', // Pure white for cards and containers to make them pop
    
    text: '#1D232A',       // A dark charcoal for primary text (better than pure black)
    secondary: '#5A6472',  // A medium grey for secondary text and descriptions
    
    white: '#FFFFFF',
    
    border: 'rgba(0, 0, 0, 0.1)', // A subtle, semi-transparent black for borders
    cardShadow: 'rgba(90, 100, 112, 0.1)', // A soft, neutral shadow for a lifting effect
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  fontSizes: {
    small: '0.8rem',
    medium: '1rem',
    large: '1.5rem',
    xlarge: '2.5rem',
    xxlarge: '3.5rem',
  },
  spacing: {
    xsmall: '4px',
    small: '8px',
    medium: '16px',
    large: '32px',
    xlarge: '64px',
    xxlarge: '96px',
  },
  borderRadius: '16px', // Modern, rounded edges
};