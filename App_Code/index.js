const express 		  = require('express');
const compression 	= require('compression');
const helmet 		    = require('helmet');
const bodyParser  	= require('body-parser'); 		 
const cors 			    = require('cors'); 
const path          = require('path');  

const config 		    = require("./config/config");
const logMiddleware = require("./helpers/log.middleware");  

const port 			    = config.API_PORT;

const appapi 			  = express(); 
appapi.use(compression());
appapi.use(helmet());
appapi.use(cors());

appapi.use(express.json());  
appapi.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
appapi.use(bodyParser.json({ limit: '50mb' }));  

appapi.use(function (req, res, next) {  
    res.setHeader('Access-Control-Allow-Origin', '*');    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');   
    res.setHeader('Access-Control-Allow-Headers', '*');   
    res.setHeader('Access-Control-Allow-Credentials', true);   
    next();
}); 
 
appapi.get('/', (req, resp) => {
	resp.send("<h1>Wow ! API Server Running &#128525;</h1>");
});

// Import Routes
const userRoute         = require('./routes/user.route');
const systeminfoRoute   = require('./routes/systeminfo.route');
 
// Route Middlewares
appapi.use('/api/user', userRoute);
appapi.use('/api/sysinfo', systeminfoRoute);
  
//write error logs
appapi.use(logMiddleware);
 
var options = {     
	 
}; 
  
var server = require('http').createServer(options, appapi);
server.listen(port, () => { 
	console.log(`API Server is connected and running on port number: ${port}`); 
 });

 
const { app, BrowserWindow, Menu } = require('electron');
const isDev = require('electron-is-dev');

let mainWindow;
 
function createWindow() {
	splash = new BrowserWindow({
		width: 400,
		height: 400,
		frame: false,
		alwaysOnTop: true,
		transparent: false,
		resizable: false,
	  });

	  splash.loadFile(path.join(__dirname, "public", "splash.html"));
  
    mainWindow = new BrowserWindow({
        width:1024,
        height:800,
        show: false, 
		    icon: path.join(__dirname, "assets", "icon.ico")
    });
	 
    const indexPath = path.join(__dirname, "build", "index.html");  
	  
    mainWindow.loadFile(indexPath); 
	  
	  const SPLASH_DELAY = 3000;

	  mainWindow.once("ready-to-show", () => {
		setTimeout(() => {
		  if (splash) splash.destroy();
		  mainWindow.maximize();
		  //mainWindow.webContents.openDevTools();
		  mainWindow.show();
		}, SPLASH_DELAY);
	  });
  
	
	const menu = Menu.buildFromTemplate([])
	Menu.setApplicationMenu(menu); 

  mainWindow.on('closed', () => {
      mainWindow = null;
  }); 
	
}

app.on('ready', createWindow);  
 
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});  