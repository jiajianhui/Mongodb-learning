var express = require("express");
var router = express.Router();

// 导入用户模型
const userModel = require('../../userModel')

// 导入md5
const md5 = require('md5')

// 响应注册页面
router.get('/reg', (req, res) => {
    res.render('auth/reg')
})

// 注册用户
router.post("/reg", (req, res) => {
    try {
        const newUser = new userModel({ ...req.body, password: md5(req.body.password) });  //使用md5进行加密
        newUser.save();
        console.log("数据添加成功", newUser);
        res.render("success", { msg: "注册成功", url: "/login" });

     } catch (error) {

        res.status(500).send('注册失败，稍后重试')
        console.log("添加失败……", error);
     }
});

module.exports = router;
