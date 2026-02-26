const router         = require('express').Router();
const {loggedIn}     = require('../helpers/auth.middleware');
const logMiddleware  = require("../helpers/log.middleware"); 

const systemInfoController = require('../controllers/systemInfo.controller'); 

router.get('/getosdata', loggedIn, logMiddleware, systemInfoController.getOsData); 
router.get('/getcpudata', loggedIn, logMiddleware, systemInfoController.getCpuData);  
router.get('/getmemdata', loggedIn, logMiddleware, systemInfoController.getMemData);
router.get('/getprocessdata', loggedIn, logMiddleware, systemInfoController.getProcessData);
router.get('/getnetworkdata', loggedIn, logMiddleware, systemInfoController.getNetworkData);
router.get('/getnetworkstats', loggedIn, logMiddleware, systemInfoController.getNetworkStats);
router.get('/getuserdata', loggedIn, logMiddleware, systemInfoController.getUserData);
router.get('/getbatterydata', loggedIn, logMiddleware, systemInfoController.getBatteryData);
router.get('/getdiskdata', loggedIn, logMiddleware, systemInfoController.getDiskData);
router.get('/getgraphicsdata', loggedIn, logMiddleware, systemInfoController.getGraphicsData);
router.get('/getsystemdata', loggedIn, logMiddleware, systemInfoController.getSystemData); 
router.get('/getsystemdata', loggedIn, logMiddleware, systemInfoController.getSystemData); 
router.get('/getwifinetworks', loggedIn, logMiddleware, systemInfoController.getWifiNetworks);
 

module.exports = router;