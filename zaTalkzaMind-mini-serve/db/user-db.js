const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  openid: String,
  nickName: String,
  // age: Number,
  city: String,
  province: String,
  country: String,
  language: String,
  gender: String,
  // watermark: Object,
  date: { type: Date, default: Date.now }, // 指定默认值
  avatarUrl: String
});


module.exports = mongoose.model("User",userSchema);
