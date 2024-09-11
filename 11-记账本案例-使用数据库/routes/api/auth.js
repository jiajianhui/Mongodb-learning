var express = require("express");
var router = express.Router();

// 导入用户模型
const userModel = require('../../userModel')

// 导入md5
const md5 = require('md5')
// 导入jwt
const jwt = require('jsonwebtoken')
const { secret } = require("../../config");

// 登录操作
router.post("/login", async (req, res) => {
    // 1、获取响应体
    const {username, password} = req.body
    // 2、查询数据库
    try {
        //findOne 是异步操作，因此需要使用 await 等待查询结果；否则会始终显示登录成功
        const data = await userModel.findOne({username: username, password: md5(password)})
        console.log(data);
        // 3、判断
        if (data) {
            // 4、为当前用户创建token
            let token = jwt.sign(
              {
                username: data.username,
                _id: data._id,
              },
              secret,
              {
                expiresIn: 60 * 60 * 24 * 7,
              }
            );
            // 5、响应token
            res.json({
                code: '0000',
                msg: '登录成功',
                data: token
            })
        } else {
            res.json({
              code: "2002",
              msg: "用户名或密码错误～",
              data: null,
            });
        }

     } catch (error) {
        res.json({
            code: '2001',
            msg: '数据库读取失败～',
            data: null
        })
     }
});

// 退出登录；使用post请求，防止CSRF跨站请求
router.post("/logout", (req, res) => {
    // 销毁session
    req.session.destroy(() => {
        res.render('success', {msg: '退出成功', url: '/login'})
    })
    
});


module.exports = router;
