// src/components/ThemeContext.js

import React, { createContext, useContext } from 'react';
import { theme } from '../theme.js'; // Correct, with .js
// 1. Create the context
const ThemeContext = createContext();

// 2. Create the provider component
export const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Create a custom hook for easy access to the theme
export const useTheme = () => {
  return useContext(ThemeContext);
};