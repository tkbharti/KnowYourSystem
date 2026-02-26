import React, {useState,useCallback, useEffect} from 'react';
import { Cpu , Database, Monitor ,BatteryCharging, Wifi , WifiOff , Volume2, VolumeX, Bluetooth, 
  Laptop , Signal, Usb   } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {systemService} from "../../services/apiService";
import { useTheme } from '../../context/ThemeContext'; 
import { useLoading } from '../../context/LoadingContext'; 

const DashboardPage = ({setNav}) => {  
 
  const [error, setError] = useState("");   
	const navigate          = useNavigate();
  const { theme }         = useTheme();
  const { setLoading }    = useLoading();
  const [usrdetails, setUsrData]        = useState("");   
  const [batterydetails, setBatteryData]= useState("");   
  const [diskdetails, setDiskData]        = useState({});   
  const [graphicsdetails, setGraphiceData]= useState({});   
  const [osdetails, setOsData]        = useState(""); 
  const [systemdetails, setSystemData]= useState({});  
  const [cpudetails, setCpuData]= useState({});   
  const [wifidetails, setWifiData]= useState({});   
  const [netdetails, setNetData]= useState({});   

  const handleError = async (error) =>{
		if (error.response) { 
			setError(error.response.data.message); 
		} else if (error.request) { 
			setError('Network Error:', error.request);
		} else { 
			setError('Unknown Error:', error.message);
		}
	} 
 
  const usr = useCallback(async () => {
        setError(null); 
        try {
            setLoading(true);  
           
            const response1 = await systemService.getUserData();
            setUsrData(response1.data[0].user); 
            
            const response3 = await systemService.getDiskData();
            setDiskData(response3.data[0]); 
                        
            const response4 = await systemService.getGraphicsData();   
            setGraphiceData(response4.data);   

            const response = await systemService.getOsData();
            setOsData(response.data.distro);

            const response5 = await systemService.getSystemData();  
            setSystemData(response5.data);            

            const response6 = await systemService.getCpuData();  
            setCpuData(response6.data);    
           
            console.log('System data request completed');   

        } catch (error) { 
            handleError(error);
        }finally{
           setLoading(false);
        } 
    }, []); 
  
    useEffect( () => {  
      usr();  
    },[]);
 

    useEffect(() => { 
      const interval = setInterval( async ()=>{
          const response2 = await systemService.getBatteryData();
          setBatteryData(response2.data); 
        }, 5000);
      return () => clearInterval(interval);
    }, []);
  

    useEffect(() => {  
      let prevStats = null;
      let prevTime = Date.now();

      const interval = setInterval( async ()=>{
        const response7 = await systemService.getNetworkStats();

        const response8 = await systemService.getWifiNetworks();
        if(response8.data.length>0){
           setWifiData(response8.data[0]);
        } 

        const stats = response7.data; 
        const curr = stats[0];
        const now = Date.now();
      
        if (prevStats) {
          const timeDiff = (now - prevTime) / 1000; // seconds
      
          const rxSpeedMbps =
            ((curr.rx_bytes - prevStats.rx_bytes) * 8) / (timeDiff * 1e6);
      
          const txSpeedMbps =
            ((curr.tx_bytes - prevStats.tx_bytes) * 8) / (timeDiff * 1e6); 

          response7.data[0].Download = `${rxSpeedMbps.toFixed(2)} Mbps`;
          response7.data[0].Upload = `${txSpeedMbps.toFixed(2)} Mbps`;
        }

        setNetData(response7.data[0]);   
        prevStats = curr;
        prevTime = now;
      }, 5000); 
 
      return () => clearInterval(interval);
    }, []);

  const accesPage = (page)=>{ 
    navigate(page);
  } 
 
  return (
     
       <div className="p-0">
          <div className="d-flex justify-content-between align-items-center mb-0"> 
          <h6 className={`txt-${theme.color}`}>Dashboard </h6> 
          </div> 
        <div className="dashboard-container">  
          <div className="dashboard-main"> 	  

            <div className="row">

                  <div className="col-3" style={{display: 'flex', minWidth:'200px', marginTop: '5px'}}> 
                      <div
                        className="card"
                        style={{
                          width: "230px",
                          borderRadius: "16px",  
                        }}
                      > 
                        <div
                          className={`card-body d-flex flex-column align-items-center justify-content-center`}
                          style={{ 
                            borderRadius: "16px 16px 0 0",
                            padding: "20px",
                          }}
                          onClick={()=>{accesPage('/osdata');setNav('osdata');}}
                        >
                          <Laptop  size={100} className={`txt-${theme.color}`}  />
                        </div>

                        <div
                          className="text-center fw-semibold"
                          style={{
                            padding: "12px",
                            fontSize: "10px",
                            letterSpacing: "0.5px",
                          }}
                        >
                          
                          <div className="dash-info">System User</div>
                          <div className="dash-dots">{usrdetails?usrdetails:"..."} </div> 

                          <div className="dash-info">OS</div>
                          <div className='dash-dots' title={osdetails?`${osdetails}`:"..."}>{osdetails?`${osdetails}`:"..."} </div> 
 
                          <div className="dash-info">Manufacturer</div>
                          <div className="dash-dots">{systemdetails.manufacturer??'...'}</div>  

                         <div className="dash-info">Model</div>
                        <div className='dash-dots' title={systemdetails.model??'...'}>{systemdetails.model??'...'} </div> 
 
                        </div>
                      </div>
                  </div>   

                  <div className="col-3" style={{display: 'flex', minWidth:'200px', marginTop: '5px'}}> 
                      <div
                        className="card"
                        style={{
                          width: "230px",
                          borderRadius: "16px",  
                        }}
                      > 
                        <div
                          className={`card-body d-flex flex-column align-items-center justify-content-center`}
                          style={{  
                            borderRadius: "16px 16px 0 0",
                            padding: "20px",
                          }}
                          onClick={()=>{accesPage('/cpudata');setNav('cpudata');}}
                        >
                          <Cpu size={100}  className={`txt-${theme.color}`} />
                        </div>

                        <div
                          className="text-center fw-semibold"
                          style={{
                            padding: "12px",
                            fontSize: "10px",
                            letterSpacing: "0.5px",
                          }}
                        >
                           
                          <div className="dash-info">Brand</div>
                          <div className="dash-dots">{cpudetails.brand ?`${cpudetails.brand}`:"..."} </div> 

                          <div className="dash-info">Cores</div>
                          <div className="dash-dots">{cpudetails.cores ?`${cpudetails.cores}`:"..."} </div> 
                          
                          <div className="dash-info">Vendor</div>
                          <div className="dash-dots">{graphicsdetails.controllers?`${graphicsdetails.controllers[0].vendor}`:"..."} </div> 

                          <div className="dash-info">Resolution</div>
                          <div className="dash-dots">{graphicsdetails.displays?`${graphicsdetails.displays[0].resolutionX}x${graphicsdetails.displays[0].resolutionY}`:"..."} </div> 
 
                          
                          
                        </div> 
                      </div>
                  </div>  

                  <div className="col-3" style={{display: 'flex', minWidth:'200px', marginTop: '5px'}}> 
                      <div
                        className="card"
                        style={{
                          width: "230px",
                          borderRadius: "16px",  
                        }}
                      > 
                        <div
                          className={`card-body d-flex flex-column align-items-center justify-content-center`}
                          style={{  
                            borderRadius: "16px 16px 0 0",
                            padding: "20px",
                          }}
                         onClick={()=>{accesPage('/memdata');setNav('memdata');}}  
                        > 
                        <Database  size={100} className={`txt-${theme.color}`}  />
                           
                        </div>

                        <div
                          className="text-center fw-semibold"
                          style={{
                            padding: "12px",
                            fontSize: "10px",
                            letterSpacing: "0.5px", 
                          }}
                        >
                       
                          <div className="dash-info2">Capacity</div>
                          <div className="dash-dots2">{diskdetails.size ?`${Math.round(diskdetails.size / 1073741824)} GB` : '...'} </div> 

                          <div className="dash-info2">Available</div>
                          <div className="dash-dots2">{diskdetails.available?`${Math.round(diskdetails.available/1073741824)} GB`:'...'}</div> 

                          <div className="dash-info2">Used</div>
                          <div className="dash-dots2">{diskdetails.used?`${Math.round(diskdetails.used/1073741824)} GB`:'...'}</div> 

                          <div className="dash-info2">Type</div>
                          <div className="dash-dots2">{diskdetails?.type} </div> 

                          

                        </div>
                      </div>
                  </div>   
                          
                  <div className="col-3" style={{display: 'flex', minWidth:'200px', marginTop: '5px'}}> 
                      <div
                        className="card"
                        style={{
                          width: "230px",
                          borderRadius: "16px", 
                           
                        }}
                      > 
                        <div
                          className={`card-body d-flex flex-column align-items-center justify-content-center`}
                          style={{ 
                            
                            borderRadius: "16px 16px 0 0",
                            padding: "10px",
                          }} 
                        >
                          {
                              batterydetails ? (
                                batterydetails.isCharging ? (
                                  <BatteryCharging size={120} className={`txt-${theme.color}`}  />
                                ) : (
                                  <BatteryCharging size={120} color="#ff4d4d" />
                                )
                              ) : (
                                <BatteryCharging size={120} className={`txt-${theme.color}`}  />
                              )
                            }
                        </div>

                        <div
                          className="text-center fw-semibold"
                          style={{
                            padding: "12px",
                            fontSize: "10px",
                            letterSpacing: "0.5px", 
                          }}
                        >
                          <div className="dash-info2">Percent</div>
                          <div className="dash-dots2">{batterydetails.percent?`${batterydetails.percent} %` : '...'} </div> 

                          <div className="dash-info2">Charging</div>
                          <div className="dash-dots2">{batterydetails?`${batterydetails.isCharging?'Yes':'No'}` : '...'}</div> 
                          
                          <div className="dash-info2">Voltage</div>
                          <div className="dash-dots2">{batterydetails.voltage?`${Math.round(batterydetails.voltage)} volt` : '...'}</div> 
                          
                          <div className="dash-info2">Capacity</div>
                          <div className="dash-dots2">{batterydetails.maxCapacity?`${Math.round(batterydetails.maxCapacity)} ${batterydetails.capacityUnit}` : '...'}</div> 
                            
                        </div>
                      </div>
                  </div>       
                  
                  <div className="col-3" style={{display: 'flex', minWidth:'200px', marginTop: '5px'}}> 
                      <div
                        className="card"
                        style={{
                          width: "230px",
                          borderRadius: "16px", 
                           
                        }}
                      >  
                    
                        <div
                          className={`card-body d-flex flex-column align-items-center justify-content-center`}
                          style={{  
                            borderRadius: "16px 16px 0 0",
                            padding: "10px",
                          }} 
                        >
                          {
                              netdetails ? (
                                netdetails.iface==="Wi-Fi" ? (
                                  netdetails.operstate==='up'? (
                                  <Wifi size={100} className={`txt-${theme.color}`}  />
                                  ):(
                                  <WifiOff size={100} color="#ff4d4d" />  
                                  )
                                ) : (
                                  netdetails.operstate==='up'? (
                                    <Signal  size={100} className={`txt-${theme.color}`}  />
                                  ):(
                                    <Signal size={100} color="#ff4d4d" />    
                                  )

                                )
                              ) : (
                                <Signal  size={100} />
                              )
                            }
                        </div>

                        <div
                          className="text-center fw-semibold"
                          style={{
                            padding: "12px",
                            fontSize: "10px",
                            letterSpacing: "0.5px", 
                          }}
                        >
                         
                          <div className="dash-info2">Status</div>
                          <div className="dash-dots2">{netdetails.operstate?`${netdetails.operstate}` : '...'} </div> 

                          <div className="dash-info2">Ssid</div>
                          <div className="dash-dots2">{wifidetails.ssid?`${wifidetails.ssid}` : '...'} </div> 
                          
                          <div className="dash-info2">Download</div>
                          <div className="dash-dots2">{netdetails.Download?`${netdetails.Download} ⬇` : '...'}</div> 
                          
                          <div className="dash-info2">Upload</div>
                          <div className="dash-dots2">{netdetails.Upload?`${netdetails.Upload} ⬆` : '...'}</div>  
                             
                        </div>
                      </div>
                  </div>  

                  <div className="col-3" style={{display: 'flex', minWidth:'200px', marginTop: '5px'}}> 
                      <div
                        className="card"
                        style={{
                          width: "230px",
                          borderRadius: "16px", 
                           
                        }}
                      > 
                        <div
                          className={`card-body d-flex flex-column align-items-center justify-content-center`}
                          style={{ 
                            
                            borderRadius: "16px 16px 0 0",
                            padding: "10px",
                          }} 
                        >
                           <Volume2 size={100} color="#D3D3D3"  />
                        </div>

                        <div
                          className="text-center fw-semibold"
                          style={{
                            padding: "12px",
                            fontSize: "10px",
                            letterSpacing: "0.5px", 
                          }}
                        >
                          <div className="dash-info2">...</div>
                          <div className="dash-dots2">...</div> 

                          <div className="dash-info2">...</div>
                          <div className="dash-dots2">...</div> 
                          
                          <div className="dash-info2">...</div>
                          <div className="dash-dots2">...</div> 
                          
                          <div className="dash-info2">...</div>
                          <div className="dash-dots2">...</div> 
                            
                        </div>
                      </div>
                  </div>  

                  <div className="col-3" style={{display: 'flex', minWidth:'200px', marginTop: '5px'}}> 
                      <div
                        className="card"
                        style={{
                          width: "230px",
                          borderRadius: "16px", 
                           
                        }}
                      > 
                        <div
                          className={`card-body d-flex flex-column align-items-center justify-content-center`}
                          style={{ 
                            
                            borderRadius: "16px 16px 0 0",
                            padding: "10px",
                          }} 
                        >
                           <Bluetooth size={100} color="#D3D3D3"  />
                        </div>

                        <div
                          className="text-center fw-semibold"
                          style={{
                            padding: "12px",
                            fontSize: "10px",
                            letterSpacing: "0.5px", 
                          }}
                        >
                          <div className="dash-info2">...</div>
                          <div className="dash-dots2">...</div> 

                          <div className="dash-info2">...</div>
                          <div className="dash-dots2">...</div> 
                          
                          <div className="dash-info2">...</div>
                          <div className="dash-dots2">...</div> 
                          
                          <div className="dash-info2">...</div>
                          <div className="dash-dots2">...</div> 
                            
                        </div>
                      </div>
                  </div>         
                  
                  <div className="col-3" style={{display: 'flex', minWidth:'200px', marginTop: '5px'}}> 
                      <div
                        className="card"
                        style={{
                          width: "230px",
                          borderRadius: "16px", 
                           
                        }}
                      > 
                        <div
                          className={`card-body d-flex flex-column align-items-center justify-content-center`}
                          style={{ 
                            
                            borderRadius: "16px 16px 0 0",
                            padding: "10px",
                          }} 
                        >
                           <Usb size={100} color="#D3D3D3"  />
                        </div>

                        <div
                          className="text-center fw-semibold"
                          style={{
                            padding: "12px",
                            fontSize: "10px",
                            letterSpacing: "0.5px", 
                          }}
                        >
                          <div className="dash-info2">...</div>
                          <div className="dash-dots2">...</div> 

                          <div className="dash-info2">...</div>
                          <div className="dash-dots2">...</div> 
                          
                          <div className="dash-info2">...</div>
                          <div className="dash-dots2">...</div> 
                          
                          <div className="dash-info2">...</div>
                          <div className="dash-dots2">...</div> 
                            
                        </div>
                      </div>
                  </div>  

              </div>  

          </div>
        </div> 
    </div>
  );
}

export default DashboardPage ;