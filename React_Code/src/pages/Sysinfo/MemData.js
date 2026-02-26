import React, {useState,useCallback, useEffect} from 'react';

import {systemService} from "../../services/apiService";
import { useTheme } from '../../context/ThemeContext';
import { useLoading } from '../../context/LoadingContext'; 
 
const MemData = () => { 

  const [error, setError]= useState("");   
	const [memdetails, setMemData]= useState({});   

  const { theme } = useTheme();
  const { setLoading }  = useLoading();

  const handleError = async (error) =>{
		if (error.response) { 
			setError(error.response.data.message); 
		} else if (error.request) { 
			setError('Network Error:', error.request);
		} else { 
			setError('Unknown Error:', error.message);
		}
	}

  const mem = useCallback(async () => {
      setError(null); 
      try {
          setLoading(true);
          const response = await systemService.getMemData();
          setMemData(response.data);
          console.log('Os data request completed');   
      } catch (error) { 
          handleError(error);
      }finally{
         setLoading(false);
      } 
  }, []); 

  useEffect( () => {  
    mem();  
  },[mem]);
 
  return (
     
       <div className="p-0">
          <div className="d-flex justify-content-between align-items-center mb-1"> 
          <h6 className={`txt-${theme.color}`}>Memory Information </h6> 
        </div> 
        <div className="dashboard-container">  
          <div className="dashboard-main"> 	 
            <div className="dashboard-content">  
                  <div className="card">  
                    
                      <div id="cardsRow" className="row g-3 mb-3"></div> 
                        <div className="row g-3">
                          <div className="col-lg-12">
                              
                              <div className="card-body1 p-3">
                                <div className="history-table p-2">
                                  <table className="table table-hover">
                                    <thead> 
                                    </thead>
                                    <tbody>  
                                       {Object.entries(memdetails).map(([key, value]) => (
                                        <tr key={key}>
                                          <td style={{width:'50%'}}>{key}</td>
                                          <td>{value}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
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

export default MemData ;