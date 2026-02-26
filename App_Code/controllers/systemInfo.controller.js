const { NotFoundError } = require("../helpers/utility"); 
const si = require("systeminformation");
// --------------------------------------------
// RESPONSE COLLECTION
// --------------------------------------------
function sendJSON(res, success, message, responseCode=500, data = []) {
    if(success){
        console.log(message);
    }else{
        console.error(message);
    }
    return res.status(responseCode).json({ success, message, data });
}

exports.getOsData = async (req, res, next) => {  
    try{ 
        const stats = await si.osInfo();  
        return sendJSON(res, true, "✅ Get os details",200, stats);    

	}catch (err) { 
		return next(err);
    } 
} 

exports.getCpuData = async (req, res, next) => { 
    try{ 
        const stats = await si.cpu(); 
        delete stats.cache; 
        return sendJSON(res, true, "✅ Get CPU details",200, stats);    

	}catch (err) { 
		return next(err);
    } 
}  

exports.getMemData = async (req, res, next) => {  
    try{ 
        const stats = await si.mem();  
        return sendJSON(res, true, "✅ Get Memory details",200, stats);    

	}catch (err) { 
		return next(err);
    } 
}  

exports.getProcessData = async (req, res, next) => {  
    try{ 
        const stats = await si.processes();  
        return sendJSON(res, true, "✅ Get Process details",200, stats);    

	}catch (err) { 
		return next(err);
    } 
}  

exports.getNetworkData = async (req, res, next) => {  
    try{ 
        const stats = await si.networkConnections();  
        return sendJSON(res, true, "✅ Get Network details",200, stats);    

	}catch (err) { 
		return next(err);
    } 
} 

exports.getNetworkStats = async (req, res, next) => {  
    try{ 
        const stats = await si.networkStats();  
        return sendJSON(res, true, "✅ Get Network stats details",200, stats);    

	}catch (err) { 
		return next(err);
    } 
} 

exports.getWifiNetworks = async (req, res, next) => {  
    try{ 
        const stats = await si.wifiNetworks();  
        return sendJSON(res, true, "✅ Get Wifi Network details",200, stats);    

	}catch (err) { 
		return next(err);
    } 
} 

exports.getWifiConnections = async (req, res, next) => {  
    try{ 
        const stats = await si.wifiConnections();  
        return sendJSON(res, true, "✅ Get Wifi connection details",200, stats);    

	}catch (err) { 
		return next(err);
    } 
} 

exports.getUserData = async (req, res, next) => {  
    try{ 
        const stats = await si.users();   
        return sendJSON(res, true, "✅ Get Users details",200, stats);    

	}catch (err) { 
		return next(err);
    } 
}

exports.getBatteryData = async (req, res, next) => {  
    try{    
        const stats = await si.battery();   
        return sendJSON(res, true, "✅ Get battery details",200, stats);    

	}catch (err) { 
		return next(err);
    } 
}

exports.getDiskData = async (req, res, next) => {  
    try{    
        const stats = await si.fsSize();   
        return sendJSON(res, true, "✅ Get Disk details",200, stats);    

	}catch (err) { 
		return next(err);
    } 
}

exports.getGraphicsData = async (req, res, next) => {  
    try{    
        const stats = await si.graphics();   
        return sendJSON(res, true, "✅ Get Graphics details",200, stats);    

	}catch (err) { 
		return next(err);
    } 
}

exports.getSystemData = async (req, res, next) => {  
    try{    
        const stats = await si.system();   
        return sendJSON(res, true, "✅ Get System details",200, stats);    

	}catch (err) { 
		return next(err);
    } 
}  

exports.getBTData = async (req, res, next) => {  
    try{    
        const stats = await si.bluetoothDevices();   
        return sendJSON(res, true, "✅ Get BT details",200, stats);    

	}catch (err) { 
		return next(err);
    } 
}  

exports.getAudioData = async (req, res, next) => {  
    try{    
        const stats = await si.audio();   
        return sendJSON(res, true, "✅ Get audio details",200, stats);    

	}catch (err) { 
		return next(err);
    } 
} 

exports.getUsbData = async (req, res, next) => {  
    try{    
        const stats = await si.usb();   
        return sendJSON(res, true, "✅ Get usb details",200, stats);    

	}catch (err) { 
		return next(err);
    } 
} 

exports.getPrinterData = async (req, res, next) => {  
    try{    
        const stats = await si.printer();   
        return sendJSON(res, true, "✅ Get printer details",200, stats);    

	}catch (err) { 
		return next(err);
    } 
}


