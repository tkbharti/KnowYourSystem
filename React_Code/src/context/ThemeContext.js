import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({ mode: 'light', color: 'default' });

  useEffect(() => {
    const storedTheme = localStorage.getItem('dashboard-theme');
    if (storedTheme) setTheme(JSON.parse(storedTheme));
  }, []);

  useEffect(() => {
    localStorage.setItem('dashboard-theme', JSON.stringify(theme));
  }, [theme]);

  const toggleTheme = () =>{};

  /*
    setTheme(prev => ({
      ...prev,
      mode: prev.mode === 'dark' ? 'light' : 'dark',
    }));
  */

  const setColorTheme = (color) => setTheme(prev => ({ ...prev, color }));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
