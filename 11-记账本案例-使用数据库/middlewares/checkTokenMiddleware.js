// 导入jwt
const jwt = require("jsonwebtoken");
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
  jwt.verify(token, "jianhui", async (err, data) => {
    if (err) {
      return res.json({
        code: "2004",
        msg: "token 校验失败",
        data: null,
      });
    }
  });

  // 4、校验成功
  next();
};
