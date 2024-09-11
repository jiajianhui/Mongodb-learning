// 导入jwt
const jwt = require("jsonwebtoken");
const { secret } = require("../config");

module.exports = (req, res, next) => {
  // 1、获取token
  let token = req.get("token");
  // 2、判断是否存在token
  if (!token) {
    return res.json({
      code: "2003",
      msg: "token 缺失",
      data: null,
    });
  }

  // 3、校验token
  jwt.verify(token, secret, async (err, data) => {
    if (err) {
      return res.json({
        code: "2004",
        msg: "token 校验失败",
        data: null,
      });
    }

    // 保存用户信息；之后在路由回调中使用user中的数据进行数据库查询等操作
    req.user = data
  });

  // 4、校验成功
  next();
};
