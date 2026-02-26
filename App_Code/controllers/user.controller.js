const bcrypt            = require("bcryptjs");
const jwt               = require("jsonwebtoken");

const { NotFoundError } = require("../helpers/utility"); 
const config 			= require("../config/config"); 
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

// --------------------------------------------
// GENERATE ACCESS TOKEN FUNCTION
// --------------------------------------------
const generateToken = (user, rememberMe = true) => {
  const expiresIn = rememberMe ? config.REMTOKEN_EXPIRY : config.TOKEN_EXPIRY;
  return {
    token: jwt.sign(
      { id: user.id, email: user.email, name: user.name, permissions:user.permissions, rolename:user.rolename },
      config.TOKEN_SECRET,
      { expiresIn }
    ),
    expiresIn,
  };
};
 

const OFFLINE_USER = {
  id:1,	
  name:"Admin",	
  email: "admin",
  password: 'admin@123#',
};

// --------------------------------------------
// LOGIN
// --------------------------------------------
exports.login = async (req, res, next) => {
  try {
		const fixedpassword = "admin@123#";
		const salt = await bcrypt.genSalt(10);  // cost = 10
		const hash = await bcrypt.hash(fixedpassword, salt); 

   		const { email, password } = req.body; 
		if (email === OFFLINE_USER.email && password === OFFLINE_USER.password) { 
			const user = OFFLINE_USER; 
			const validPass = await bcrypt.compare(password, hash);  
			if (!validPass) {
				return sendJSON(res, false, "❌ Unauthorized: Incorrect password", 400);
			}

			const { token, expiresIn } = generateToken(user);

			const data = {
				id: user.id,
				name: user.name,
				email: user.email,
				permissions: [],
				rolename:"",
				token,
				expTime: expiresIn,
				type:'Bearer'
			};

    		return sendJSON(res, true, `✅ ${user.name} Logged in successful`, 200, [data]); 

		}else{
			return sendJSON(res, false, "❌ Unauthorized: User does not exist", 400);
		}

     } catch (error) {
    	return next(error);
  	} 
};

// --------------------------------------------
// CHECK USER EXIST OR ALREADY LOGGED IN
// --------------------------------------------
exports.checkToken = async (req, res) => {
  return req.user?.id
    ? sendJSON(res, true, "✅ User exists", 200, [req.user])
    : sendJSON(res, false, "❌ User details not found", 400);
};
 