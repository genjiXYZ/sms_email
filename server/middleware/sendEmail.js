const nodemailer = require('nodemailer');
const Emailtemplate = require('../utils/emailTemlate')
const { testEmail } = require('../utils/Reg')

//setting
let transporter = nodemailer.createTransport({
	host: 'smtp.qq.com',    //发送端邮箱类型（QQ邮箱）
	port: 465,      //端口号
	secure: true,
	auth: {
		user: process.env.EMAIL_USER, // 发送方的邮箱地址（自己的）
		pass: process.env.EMAIL_SMTP // mtp 验证码
	}
});

module.exports = (option) => {
	return async (req, res, next) => {
		let mail = req.body.email
		if (!testEmail(mail)) {
			return res.send(200, { flag: false, message: '邮箱格式不对' })
		}
		let code = ("000000" + Math.floor(Math.random() * 999999)).slice(-6);
		let mailObj = {
			from: '"genji.xyz" <liulingyue@vip.qq.com>',   // 邮件名称和发件人邮箱地址
			to: mail,   //收件人邮箱地址（这里的mail是封装后方法的参数，代表收件人的邮箱地址）
			subject: '验证码',   //邮件标题
			text: '您的验证码是：' + code, // 邮件内容，这里的code是这个方法的参数，代表要发送的验证码信息，这里的内容可以自定义
			subject: 'Genji.xyz网站的验证码',
			html: Emailtemplate(`${code}`)
		}
		transporter.sendMail(mailObj, (err, data) => {
			if (err) {
				return console.log(err)
			} else {
				console.log(data)
			}
		})

		req.EmailCode = code
		res.send(200, { flag: true, message: "发送成功!" })
		next()


	}
}










// function send(mail, code) {
// 	let mailObj = {
// 		from: '"genji.xyz" <liulingyue@vip.qq.com>',   // 邮件名称和发件人邮箱地址
// 		to: mail,   //收件人邮箱地址（这里的mail是封装后方法的参数，代表收件人的邮箱地址）
// 		subject: '验证码',   //邮件标题
// 		text: '您的验证码是：' + code, // 邮件内容，这里的code是这个方法的参数，代表要发送的验证码信息，这里的内容可以自定义
// 		subject: '这是一个朴实无华的验证码',
// 		html: Emailtemplate('12345')
// 	}
// 	// 发送邮件(封装成一个promise对象)，方便后面调用该方法
// 	//这部分代码直接复制粘贴即可，但是注意发送邮件的请求对象名称要和上面声明的名称保持一致（这里我的名称是transporter）
// 	return new Promise((resolve, reject) => {
// 		if (!email(mail)) {
// 			reject(false)
// 		}else{

// 			transporter.sendMail(mailObj, (err, data) => {
// 				if(err){
// 					reject(false)    //出错
// 				}else{
// 					resolve(true)    //成功
// 				}
// 			})
// 		}
// 	})
// }
