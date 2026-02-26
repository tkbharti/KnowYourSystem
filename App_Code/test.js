const express 		= require('express');
const compression 	= require('compression');
const helmet 		= require('helmet');
const bodyParser 	= require('body-parser'); 		 
const cors 			= require('cors');
const http 			= require('http');

require('nodemon');


const app = express();
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.json());  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

app.use(function (req, res, next) {  
    res.setHeader('Access-Control-Allow-Origin', '*');    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');   
    res.setHeader('Access-Control-Allow-Headers', '*');   
    res.setHeader('Access-Control-Allow-Credentials', true);   
    next();
})

app.get("/",(req,res)=>{
	console.log("hello");
	require('dotenv').config();
	console.log(process.env.PORT);
});

const server = http.createServer((req,res)=>{console.log("created");});

server.listen(3000,()=>{});

