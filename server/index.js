const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
// var path = require("path")
// require('dotenv').config({ path: __dirname + '/local.env' })

require('dotenv').config()



//连接数据库
require("./mongodb/db")(app);
//引入Schema
const SmsSchema = require('./mongodb/models/sms')


//middle
const createSmsCode = require("./middleware/createSmsCode")
const sendSms = require("./middleware/sendSms");
const createAccount = require("./middleware/createAccount");
const verifyCode = require("./middleware/verifyCode");
const sendEmail = require("./middleware/sendEmail");



//端口3001
app.listen(process.env.PORT || 3000, (req, res) => {
	console.log(`http://localhost:${process.env.PORT}`);
});



app.post("/api/sendSms", createSmsCode(), sendSms());
app.post("/api/verifySms", verifyCode(), createAccount());
app.post('/api/sendEmail', sendEmail())
app.post('/api/login')




console.log("🚀 ", process.env.NODE_ENV + '环境')
console.log("🚀 ", process.env.NODE_ENV + '环境')