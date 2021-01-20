const SmsSchema = require("../mongodb/models/sms");
const { testPhone } = require('../utils/Reg')



module.exports = options => {
	return async (req, res, next) => {
		let phone = req.body.phone;
		//正则验证  手机号
		if (!testPhone(phone)) {
			return res.send(200, { flag: false, message: `${phone} 这个号码正确么?` });
		}
		//创建验证码
		let code = ("000000" + Math.floor(Math.random() * 999999)).slice(-6);
		//查看是否已经发过一次 (数据库有没有数据) 
		let findPhone = await SmsSchema.findOneAndUpdate({ phone }, { code, $inc: { times: 1 } },)
		// console.log('findPhone: ', findPhone);

		if (findPhone != null) {


			if (findPhone.times > 1) {
				return res.send(200, { flag: false, message: "过5分钟再来,您太快了" })
			}

			//发过 => 	req.SMS = { phone, code }

			req.SMS = { phone, code }

			next()
		} else {
			// 没有发过了
			try {
				//数据库创建   5m 失效
				let createPhone = await SmsSchema.create({ phone, code, res })

				if (createPhone != null) {
					//创建成功
					req.SMS = { phone, code }
					next()
				}
			} catch (err) {
				//创建失败
				//以防万一 数据库 的错误信息
				console.log('err: ', err);
				res.send(200, { flag: false, "message": err.message })
				return
			}
		}
	}
}
