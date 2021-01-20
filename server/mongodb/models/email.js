const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  email: { type: String, unique: true, require: true },
  code: {
    type: String,
    require: true,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: "5m" },
  },
});

module.exports = mongoose.model("email", schema);
