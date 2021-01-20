const Core = require("@alicloud/pop-core");
//方法
let requestOption = {
  method: "POST",
};
//基础配置
let params = {
  RegionId: "cn-hangzhou",
  SignName: "Genji网站",
  TemplateCode: "SMS_192576752",
  PhoneNumbers: "",
  TemplateParam: "",
};
//配置accessKey
let client = new Core({
  accessKeyId: process.env.SMS_ID,
  accessKeySecret: process.env.SMS_SECRET,
  endpoint: "https://dysmsapi.aliyuncs.com",
  apiVersion: "2017-05-25",
});
module.exports = (options) => {
  return async (req, res, next) => {
    let { phone, code } = req.SMS;
    console.log("phone,code: ", { phone, code });
    params.PhoneNumbers = `${phone}`;
    params.TemplateParam = `{"code":${code}}`;
    //不发送短信测试用
    res.send(200, { message: "test  going to try", phone, code, flag: true });

    // post 阿里 api
    // try {
    // 	let alires = await client.request('SendSms', params, requestOption)
    // 	console.log('alires: ', alires);
    // 	res.send(200, { code, message: `已发送,请在5分钟内 验证`, flag: true })

    // }
    // catch (err) {
    // 	res.send(200, { code, message: err, flag: false })

    // }
  };
};
