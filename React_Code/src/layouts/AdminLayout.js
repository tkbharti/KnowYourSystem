import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

import LoginPage from "../pages/Login/LoginPage";  
import DashboardPage from '../pages/Dashboard/DashboardPage'; 
 
import OsData from '../pages/Sysinfo/OsData'; 
import CpuData from '../pages/Sysinfo/CpuData'; 
import MemData from '../pages/Sysinfo/MemData'; 
import Processes from '../pages/Sysinfo/Processes'; 
import NetworkData from '../pages/Sysinfo/NetworkData'; 
import NetworkStats from '../pages/Sysinfo/NetworkStats';  


import SettingsPage from '../pages/Settings/SettingsPage'; 

import PrivateRoute from "../route/PrivateRoute";

//theme, toggleTheme, setColorTheme

export default function AdminLayout({openMenu}) {
  const [collapsed, setCollapsed] = useState(false);
  const { theme } = useTheme();
  const sidebarWidth = collapsed ? 60 : 235;

  const [bgnav, setNav] = useState("");
  
   
  return (
    <div className={`${theme.mode === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <Header />
   
      <Sidebar collapsed={collapsed} toggleSidebar={() => setCollapsed(!collapsed)} dashnav={bgnav}  />

      <div
        className="d-flex flex-column"
        style={{
          marginTop: '50px',
          marginLeft: `${sidebarWidth}px`,
          minHeight: 'calc(100vh - 50px)',
          backgroundColor: '#fff',
          transition: 'margin-left 0.3s ease',
          overflowY: 'auto',
          height: 'calc(100vh - 50px)', 
        }}
      >
        <main className="flex-grow-1 p-3">
          <Routes>
            
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage setNav={setNav} />} />

            <Route path="/osdata" element={<OsData />} />  
            <Route path="/cpudata" element={<CpuData />} />
            <Route path="/memdata" element={<MemData />} />
            <Route path="/processes" element={<Processes />} />  
            <Route path="/networkstats" element={<NetworkStats />} />  
            <Route path="/network" element={<NetworkData />} />    
            
            
            <Route path="/settings" element={<SettingsPage />} /> 
            
            
          </Routes>
        </main>
 
        <Footer/>
      </div>
    </div>
  );
}
