module.exports = {
  // port: 3000,
  // session: {
  //   secret: 'myblog',
  //   key: 'myblog',
  //   maxAge: 2592000000
  // },
  jwt_secret: 'lalala', // jwt 密钥
  // APPID: 'wx53293bc7eae8f28d',
  // APP_SECRET: 'eb0cec75494510a0e6f38de2817f45b6', // 小程序密钥

  APPID: 'wx257ba6bdbc773ff8',
  APP_SECRET: '26782e589c8808f8b05100851e68a71d', // 小程序密钥
  mongodb: 'mongodb://0.0.0.0:27017/mon-mini',
  mongoConfig: {
    autoIndex: false,
    keepAlive: true,
    useNewUrlParser: true,
  }
};
