const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  phone: { type: String, unique: true, require: true },
  code: {
    type: String,
    require: true,
  },
  times: { type: Number, default: 0 },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: "5m" },
  },
});

module.exports = mongoose.model("sms", schema);
