 
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ChevronDown, Settings, Users, Home, 
  LucideMonitorCheck , ArrowRight , ArrowLeft, MonitorPlay,Cpu , Database, Monitor ,
   ListChecks, Network, ArrowUpDown, Laptop  } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Sidebar({ collapsed, toggleSidebar, dashnav}) {
  const [openMenu, setOpenMenu] = useState(null);
  const { theme } = useTheme();
  const toggleSubmenu = (menu) => setOpenMenu(openMenu === menu ? null : menu);
  
  const styles = {
    dashboardGradient: {
      backgroundImage: `linear-gradient(45deg, black, transparent)`,
        },
      
    noGradient: {}
  } 
  const [bgnav, setBg] = useState(''); 
 

  const setTop = (nav)=>{
    setBg(nav); 
    localStorage.setItem('topnav',nav);  
  } 
 
  useEffect( () => { 
    setBg(localStorage.getItem('topnav')); 
  },[bgnav]);   
  
  useEffect( () => { 
    setTop(dashnav);
  },[dashnav]);   
    
  return (
    <aside
      className={`position-fixed bg-${theme.color} text-white`}
      style={{
        backgroundColor:`${theme.color}`,
        top: '50px',
        bottom: 0,
        left: 0,
        width: collapsed ? '60px' : '235px',
        overflowY: 'auto',
        transition: 'width 0.3s ease',
        zIndex: 1000,
      }}
    > 
      <div className="d-flex justify-content-between align-items-center p-2 border-bottom border-light">
        {!collapsed && <strong></strong>}
        <button className="btn btn-sm" 
        style={{color:"#FFF",'paddingLeft':'14px'}} 
        onClick={toggleSidebar}>
          <Menu size={16} />
        </button>
      </div>

      <nav className="nav flex-column mt-2">
        <Link to="/dashboard" className="nav-link text-white d-flex align-items-center" 
        onClick={()=>{setTop('dashboard');}}
         style={
              bgnav === 'dashboard'
                ? styles.dashboardGradient
                : styles.noGradient
            }
        >
          <Home size={18} /> {!collapsed && <span className="ms-2">Dashboard</span>} 

        </Link> 
         
         <Link to="/osdata" className="nav-link text-white d-flex align-items-center"
        onClick={()=>setTop('osdata')}
         style={
              bgnav === 'osdata'
                ? styles.dashboardGradient
                : styles.noGradient
            }>
          <Laptop  size={18} /> {!collapsed && <span className="ms-2">OS Data</span>}
        </Link>

        <Link to="/cpudata" className="nav-link text-white d-flex align-items-center"
        onClick={()=>setTop('cpudata')}
         style={
              bgnav === 'cpudata'
                ? styles.dashboardGradient
                : styles.noGradient
            }>
          <Cpu size={18} /> {!collapsed && <span className="ms-2">CPU Data</span>}
        </Link>


        <Link to="/memdata" className="nav-link text-white d-flex align-items-center"
        onClick={()=>setTop('memdata')}
         style={
              bgnav === 'memdata'
                ? styles.dashboardGradient
                : styles.noGradient
            }>
          <Database size={18} /> {!collapsed && <span className="ms-2">Memory Data</span>}
        </Link>    
        
        <Link to="/processes" className="nav-link text-white d-flex align-items-center"
        onClick={()=>setTop('processes')}
         style={
              bgnav === 'processes'
                ? styles.dashboardGradient
                : styles.noGradient
            }>
          <ListChecks size={18} /> {!collapsed && <span className="ms-2">Processes</span>}
        </Link>

          <Link to="/networkstats" className="nav-link text-white d-flex align-items-center"
        onClick={()=>setTop('networkstats')}
         style={
              bgnav === 'networkstats'
                ? styles.dashboardGradient
                : styles.noGradient
            }>
          <ArrowUpDown size={18} /> {!collapsed && <span className="ms-2">Network Stats</span>}
        </Link>

         
        <Link to="/network" className="nav-link text-white d-flex align-items-center"
        onClick={()=>setTop('network')}
         style={
              bgnav === 'network'
                ? styles.dashboardGradient
                : styles.noGradient
            }>
          <Network size={18} /> {!collapsed && <span className="ms-2">Network</span>}
        </Link>
 
            
        <Link to="/settings" className="nav-link text-white d-flex align-items-center"
        onClick={()=>setTop('settings')}
         style={
              bgnav === 'settings'
                ? styles.dashboardGradient
                : styles.noGradient
            }>
          <Settings size={18} /> {!collapsed && <span className="ms-2">Settings</span>}
        </Link>
      </nav>
    </aside>
  );
}
