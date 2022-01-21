const Koa = require('koa')
const app = new Koa()
// const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const config = require('./config')
const index = require('./routes/index')
const users = require('./routes/users')
const jwt = require("jsonwebtoken");

const db = require('./db/conect-mongo')
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }))

// 连接并创建数据库
app.use(async (ctx, next) => {
  db()
  await next()
})

app.use(async(ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Credentials', true);
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, zjp, ctt');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  ctx.set('Allow', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method === 'OPTIONS') {

      ctx.body = 200;

  }
  // ctx; // is the Context
  // ctx.request; // is a koa Request
  // ctx.response; // is a koa Response

  await next();
});

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// app.use(async(ctx, next) => {
//   if (ctx.url.indexOf('login') > -1 || ctx.url.indexOf('decryptUser') > -1) { // 如果是登陆和解密敏感数据
//     await next(); // 如果是login和decryptUser 不验证
//   } else {
//     let tokenObj = null;
//     console.log(ctx.request.header, 'heahdhdhhdhdhdhdh');
//     // console.log(app.context.openid, app.context.session_key, '之前保存的token');
//     try {
//       tokenObj = jwt.verify(ctx.request.header['authorization'].split(' ')[1], config.jwt_secret);
//       console.log(tokenObj, tokenObj.data.openid, '解析后的token');
//       app.context.openid = tokenObj.data.openid
//     } catch (error) {
//       // logsUtil.logError(ctx, error, Date.now());
//       console.log('token 过期请重新登录');
//       ctx.body = {
//         code: 403,
//         success: false,
//         message: 'token 过期请重新登录'
//       };
//     }
//     await next(); 

//   }
// });

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
