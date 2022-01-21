const router = require('koa-router')()
const User = require('../db/user-db')
const config = require('../config')
const jwt = require("jsonwebtoken");
const httpRequest = require('../utils/httpRequest');

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  console.log('hahhahah');
  // ctx.body = 'koa2 string'
  ctx.body = {
    code: 200,
    success: true,
    message: 'ok',
    data: 'hahhahah'
  }
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.post('/login', async (ctx, next) => {

  console.log(ctx.path, ctx.method, ctx.request.body, 'kkkkkkkkkkkk');
  const {code, userInfo} = ctx.request.body;
  // ctx.app.context.le_code = code;
  // ctx.le_code = code;
  let result = {}
  try {
    result = await httpRequest({
      url: `https://api.weixin.qq.com/sns/jscode2session?appid=${config.APPID}&secret=${config.APP_SECRET}&js_code=${code}&grant_type=authorization_code`
    });
  } catch (error) {
    ctx.body = {
      code: 500,
      success: false,
      message: '微信获取openid错误',
      data: result
    }
  }
  

  console.log(result.result, 'login response');
  try {
    const userOne = new User({...userInfo, openid: result.result.openid})
    await userOne.save()
    console.log('入库成功')
  } catch (error) {
    ctx.body({
      code: 500,
      success: false,
      message: '入库有误',
      data: err
    });

  }

  // ctx.aaa = result.result.session_key;
  // ctx.openid = result.result.openid;
  // ctx.app.context.session_key = result.result.session_key;
  // ctx.app.context.openid = result.result.openid;

  const mini_token = jwt.sign({
    data: result.result,
    // 设置 token 过期时间，⼀一2days，秒为单位
    // exp: Math.floor(Date.now() / 1000) + 60 * 1 // 一分钟
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 2
  }, config.jwt_secret);
  // console.log(ctx.session.session_key, 'sessionsessionsession');
  result.result.token = mini_token;
  ctx.body = {
    code: 200,
    success: true,
    message: 'ok',
    data: result
  }
  // next();
  // ctx.body = '5566';
}, ctx => {
  // console.log(ctx.diyParam, ctx.session_key, 'diyParamdiyParamdiyParam');
  // => { id: 17, name: "Alex" }
});

// router.post('/decryptUser', async (ctx, next) => {
//   // ctx.router available

//   console.log(ctx.path, ctx.request.body, ctx.aaa, 'hhhhhhhhh');

//   const {encryptedData, iv} = ctx.request.body;
//   const pc = new WXBizDataCrypt(config.APPID, ctx.app.context.session_key);

//   const userData = pc.decryptData(encryptedData , iv);

//   console.log('解密后用户信息 data: ', userData);
//   // console.log(ctx.session.userinfo, 'ctx.session.userinfo');
//   // ctx.session.userinfo = result.result.session_key;
//   // ctx.session.userinfo = 'hgjghgh';
//   const inResult =  await ctx.DbHandle.insert(userData);
//   console.log(inResult, 'insertisnsnnsn');
//   if (inResult === 'success') {
//     ctx.body = {
//       code: 200,
//       success: true,
//       message: '入库成功',
//       data: []
//     };
//   } else {
//     ctx.body = {
//       code: 500,
//       success: true,
//       message: '入库失败',
//       data: []
//     };
//   }
//   // ctx.body = '5566';
// });

module.exports = router
