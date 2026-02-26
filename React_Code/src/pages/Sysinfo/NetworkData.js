 
import React, {useState,useCallback, useEffect, useRef, useLayoutEffect } from 'react';

import {systemService} from "../../services/apiService";
import { useTheme } from '../../context/ThemeContext';
import { useLoading } from '../../context/LoadingContext'; 

import { TabulatorFull as Tabulator } from 'tabulator-tables';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'tabulator-tables/dist/css/tabulator.min.css'; 
import 'tabulator-tables/dist/css/tabulator_simple.min.css'; ///dist/css/tabulator_modern.min.css


Tabulator.registerModule([]);
 
const NetworkData = () => { 
  const tableRef 	= useRef(null);
  const [table, setTable] = useState(null);  
  const [error, setError]= useState("");   
  const [processdetails, setProcessesData]= useState([]);   
  const [column, setColumn]= useState([]);   
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

  const paramLookup = (cell)=>{
    var value = cell.getValue(); 
    var colum = cell.getField(); 
    if((colum==='cpu' || colum==='cpus') && Number(value)>20){
        return "<span style='color:red'>"+value+"</span>";
    }
    return value;
  }  

  useEffect(() => { 
    if (!table || column.length === 0) return;  
        table.setColumns(column);  
    }, [column, table]);

  const process = useCallback(async () => {
      setError(null); 
      try {  
        const response = await systemService.getNetworkData();   
        if (response.data?.length > 0) {
                if (column.length === 0) {
                    const cols = Object.keys(response.data[0]) 
                        .map((key) => ({
                        title: key,
                        field: key,
                        headerHozAlign: 'left',
                        hozAlign: 'left',  
                        width:120,
                        resizable:true,
                        headerSort:true,
                        visible:true,
                        sorter:"string", 
                        headerSortStartingDir:"asc" , 
                        formatter:paramLookup, 
                    })); 
                
                    setColumn(cols);
                }
            setProcessesData(response.data); 
        }
        console.log('Network data request completed');   
      } catch (error) { 
          handleError(error);
      }finally{
         setLoading(false);
      } 
  }, []); 

    useEffect(() => {
        process();
        const interval = setInterval(process, 5000);
        return () => clearInterval(interval);
    }, [process]);

    useLayoutEffect(() => {
        if (!tableRef.current) return; 
        const timeout = setTimeout(() => {
            const tableInstance = new Tabulator(tableRef.current, { 
                data: [],
                reactiveData: true, 
                height: "320px",
                verticalFillMode: "fill", 
                pagination: true,
                paginationSize: 8,
                layout: "fitColumns",
                placeholder: "Loading...",
                
                columns: column,
            }); 
            setTable(tableInstance);
           
         }, 100); 

             return () => {
                clearTimeout(timeout);  
            }

    }, []);
 
    useEffect(() => {
    if (!table) return; 
        table.replaceData(processdetails);
    }, [processdetails, table]);
 
  return (
     
       <div className="p-0">
          <div className="d-flex justify-content-between align-items-center mb-1"> 
          <h6 className={`txt-${theme.color}`}>Network </h6> 
          
        </div> 
        <div className="dashboard-container">  
          <div className="dashboard-main"> 	 
            <div className="dashboard-content">  
                  <div className="card">  
                    
                      <div id="cardsRow" className="row g-3 mb-3"></div> 
                        <div className="row g-3">
                          <div className="col-lg-12">
                              
                              <div className="card-body p-3">
                                <div className="history-table p-2">

                                    <div ref={tableRef}></div>
                                   
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

export default NetworkData ;