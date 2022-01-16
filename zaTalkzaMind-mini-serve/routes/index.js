const router = require('koa-router')()
const User = require('../db/user-db')
const config = require('../config')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.post('/login', async (ctx, next) => {

  console.log(ctx.path, ctx.method, ctx.request.body, 'kkkkkkkkkkkk');
  const {code} = ctx.request.body;
  // ctx.app.context.le_code = code;
  ctx.le_code = code;
  const result = await httpRequest({
    url: `https://api.weixin.qq.com/sns/jscode2session?appid=${config.APPID}&secret=${config.APP_SECRET}&js_code=${code}&grant_type=authorization_code`
  });
  // const pc = new WXBizDataCrypt(config.APPID, config.APP_SECRET);

  // const userData = pc.decryptData(encryptedData , iv);

  // console.log('解密后用户信息 data: ', userData);
  // console.log(ctx.session.userinfo, 'ctx.session.userinfo');
  // ctx.session.userinfo = result.result.session_key;
  // ctx.session.userinfo = 'hgjghgh';
  console.log(result.result, 'login response');
  ctx.aaa = result.result.session_key;
  ctx.openid = result.result.openid;
  ctx.app.context.session_key = result.result.session_key;
  ctx.app.context.openid = result.result.openid;

  // ctx.diyParam = {
  //   session_key: result.result.session_key,
  //   openid: result.result.openid
  // };
  const le_token = jwt.sign({
    data: result.result,
    // 设置 token 过期时间，⼀一2days，秒为单位
    // exp: Math.floor(Date.now() / 1000) + 60 * 1 // 一分钟
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 2
  }, config.jwt_secret);
  // console.log(ctx.session.session_key, 'sessionsessionsession');
  result.token = le_token;
  ctx.body = result;
  // next();
  // ctx.body = '5566';
}, ctx => {
  // console.log(ctx.diyParam, ctx.session_key, 'diyParamdiyParamdiyParam');
  // => { id: 17, name: "Alex" }
});

module.exports = router
