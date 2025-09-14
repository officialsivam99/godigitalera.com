// src/theme.js

export const theme = {
  colors: {
    primary: '#007BFF', // Kept for consistency, though not heavily used here
    background: '#F0F2F5', // Light grey background
    text: '#1C1C1E',       // Almost black for main text
    secondaryText: '#6E6E73', // Grey for secondary text
    white: '#FFFFFF',
    cardShadow: 'rgba(0, 0, 0, 0.1)',
    // Gradients for the cards
    personalGradient: 'linear-gradient(135deg, #E0C3FC 0%, #8EC5FC 100%)',
    businessGradient: 'linear-gradient(135deg, #FFE985 0%, #FA742B 100%)',
    freelanceGradient: 'linear-gradient(135deg, #96E6A1 0%, #D4FC79 100%)',
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
    xxlarge: '3.5rem', // For the main hero heading
  },
  spacing: {
    xsmall: '4px',
    small: '8px',
    medium: '16px',
    large: '32px',
    xlarge: '64px',
    xxlarge: '96px',
  },
  borderRadius: '12px', // Slightly rounded edges for a sleek look
  // New: Specific styles for the card at the bottom
  card: {
    // CHANGED: Lowered the alpha from 0.8 to 0.15 for more transparency
    background: 'rgba(50, 50, 50, 0.05)', // Very transparent 
      borderColor: 'rgba(255, 255, 255, 0.2)',
 // This subtle border is perfect
  }
};