
import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import AdminLayout from "./layouts/AdminLayout";
import LoginPage from "./pages/Login/LoginPage";

import { LoadingProvider  } from "./context/LoadingContext"; 
import  TopStrip   from "./components/TopStrip"; 

function App() {
  return (
    <LoadingProvider>
    <TopStrip />
    <ThemeProvider>
      <HashRouter>
        <Routes>
          {/* Public route */}
          <Route path="/" element={<LoginPage />} /> 
          {/* Protected routes inside AdminLayout */}
          <Route path="/*" element={<AdminLayout />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
    </LoadingProvider>
  );
}

export default App;
