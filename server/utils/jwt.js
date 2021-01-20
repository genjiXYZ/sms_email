const jwt = require("jsonwebtoken");
const jwtSecret = "isAJwtSecret"


module.exports=(value)=>{
	// console.log('run: utils=>  setToken')
	return  jwt.sign({id: String(value),},jwtSecret)
	
}
