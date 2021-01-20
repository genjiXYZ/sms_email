module.exports = (app) => {
  const mongoose = require("mongoose");
  mongoose.connect(process.env.MONGODB_LINK, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("连接 数据库成功");
    })
    .catch((err) => {
      console.log("连接 数据库失败");
    });
};
