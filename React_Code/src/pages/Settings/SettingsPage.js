import React from 'react';
import { useTheme } from '../../context/ThemeContext';

 
import "../../index.css";  
export default function SettingsPage() {
  const { theme, toggleTheme, setColorTheme } = useTheme();
  const themes     = ['default','primary', 'dark', 'secondary','info']; 
  const themesname = ['Theme 1','Theme 2', 'Theme 3', 'Theme 4', 'Theme 5']; 
   
 return (
     
        <div className="p-0">
          <div className="d-flex justify-content-between align-items-center mb-1">
          <h6 className={`txt-${theme.color}`}>Settings</h6>
            
        </div>  
 
        <div className="dashboard-container">  
            <div className="dashboard-main"> 	 
              <div className="dashboard-content">  

                  <div className="card" style={{width: "300px"}}>  
                       
                      <div id="cardsRow" className="row g-3 mb-3"></div> 
                        <div className="row g-3">
                          <div className="col-lg-12">
                              
                              <div className="card-body p-3">
                                <div className="history-table p-2">

                                    
                                  {themes.map((color,i) => (
                                        <button 
                                          key={color}
                                          className={`btn btn-${color} me-2 setting-btn`}
                                          onClick={() => setColorTheme(color)}>
                                          
                                        </button>
                                      ))} 
                                  </div>

                                <div
                                  className="text-center fw-semibold"
                                  style={{
                                    padding: "12px",
                                    fontSize: "14px",
                                    letterSpacing: "0.5px",
                                  }}
                                >
                                Select Theme
                                    
                                      </div>
                                    </div> 
                                </div> 
                              </div>  
                        </div>

                   
                  
              </div>
            </div>
          </div> 

        </div>
    );  
  
}
