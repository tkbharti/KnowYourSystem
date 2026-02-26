import React from 'react';
import { User, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from "react-router-dom";
import LiveClock from "./LiveClock";

export default function Header() {
  const { theme } = useTheme();
  const navigate = useNavigate();
	
	const handleLogout = async (e) => { 
		localStorage.removeItem('token'); 
		navigate('/'); 
	}

  return (
    <header
      className="d-flex justify-content-between align-items-center text-black px-3 shadow-sm"
      style={{
        height: '50px',
        backgroundColor: '#f8fafc',
        borderBottom: '1px solid #dee2e6',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2000,
      }}
    >
      <div className="d-flex align-items-center gap-2">
        <img src="logo.png" alt="logo" height="36" width="220" />
      </div>
       
       <div className="d-flex align-items-center gap-3" 
       style={{ minWidth: '100px', justifyContent: 'flex-end' }}>
           <LiveClock />
      </div> 
        

      <div className="d-flex align-items-center gap-3">
        <span className={`txt-${theme.color}`}>Admin</span>
        
        <User className={`txt-${theme.color}`} style={{"fontSize": "24px", 'cursor':'pointer'}} /> 
        <LogOut className={`txt-${theme.color}`} onClick={handleLogout}  
		       style={{"fontSize": "24px", 'cursor':'pointer'}}> 
        </LogOut>
      </div>
    </header>
  );
}
