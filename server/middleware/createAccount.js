const UserSchema = require("../mongodb/models/user");
const setToken = require("../utils/jwt");
const hidePhoneNumber = require("../utils/hidePhoneNumber");

module.exports = (options) => {
  return async (req, res, next) => {
    console.log("run : =>>> createAccount");
    let userRes = await UserSchema.find({ phone: req.body.phone });
    let userModel;
    userRes.length === 0
      ? (userModel = await UserSchema.create({ phone: req.body.phone }))
      : (userModel = await UserSchema.findOne({ phone: req.body.phone }));
    let { phone, createAt, _id } = { ...userModel._doc };
    phone = hidePhoneNumber(phone);
    const user = { phone, createAt, token: setToken(_id) };
    console.log("user: ", user);
    res.send(200, { flag: true, message: "验证码正确 ,正在登陆...", user });
  };
};
