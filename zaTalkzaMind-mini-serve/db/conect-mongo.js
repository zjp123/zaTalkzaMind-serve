// import { join } from 'path'
const mongoose = require("mongoose");
// import glob from 'glob'
const config = require('../config')

mongoose.Promise = global.Promise
require('./user-db')
// glob.sync(join(__dirname, '../database/schema', '**/*.js')).forEach(require)

const database = app => {
    console.log('连接数据库了吗');
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
        console.log('Connected to MongoDB -> ')
    })

    if (process.env.NODE_ENV !== 'production') {
        console.log(process.env.NODE_ENV, 'process.env.NODE_ENV');
        mongoose.set('debug', true);
    }
}

module.exports = database
