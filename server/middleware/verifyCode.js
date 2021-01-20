const SmsSchema = require("../mongodb/models/sms");
module.exports = (option) => {
  return async (req, res, next) => {
    console.log("run: =>> verifyCode");
    let dbres = await SmsSchema.find({ phone: req.body.phone });
    if (dbres.length != 0) {
      console.log(
        "🚀 ~ file: verifyCode.js ~ line 11 ~ return ~ 验证码正确么?",
        dbres[0].code == req.body.code
      );
      if (dbres[0].code == req.body.code) {
        // res.send(200, { flag: true, message: "验证正确" })
        next();
      } else {
        res.send(200, { flag: false, message: "验证失败" });
      }
    } else {
      res.send(200, { flag: false, message: "验证失败" });
    }
  };
};
