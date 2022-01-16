const mongoose = require("mongoose");
// mongoose自己实现的Promise与规范的Promise存在差异，在这里使用node.js实现的Promise global 是服务器端的全局对象
mongoose.Promise = global.Promise;
const config = require('../config');
// const logsUtil = require('../util/handle-logger');
mongoose.connect(config.mongodb, config.mongoConfig);
// localhost:27017 会在这个链接下 创建一个mon-mini数据库

mongoose.connection.on("connected", function () {
  console.log("MongoDB connected success.")
});

mongoose.connection.on("error", function () {
  console.log("MongoDB connected fail.")
});

mongoose.connection.on("disconnected", function () {
  console.log("MongoDB connected disconnected.")
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB -> ', db)
})

if (process.env.NODE_ENV !== 'production') {
  console.log(process.env.NODE_ENV, 'process.env.NODE_ENV');
  mongoose.set('debug', true);
}

const userSchema = mongoose.Schema({
  openId: String,
  nickName: String,
  age: Number,
  city: String,
  province: String,
  country: String,
  language: String,
  gender: String,
  watermark: Object,
  date: { type: Date, default: Date.now }, // 指定默认值
  avatarUrl: String
});


module.exports = mongoose.model("User",userSchema);
