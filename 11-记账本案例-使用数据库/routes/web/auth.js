var express = require("express");
var router = express.Router();

// 导入用户模型
const userModel = require('../../userModel')

// 导入md5
const md5 = require('md5')

// 注册页面
router.get('/reg', (req, res) => {
    res.render('auth/reg')
})

// 注册操作
router.post("/reg", async (req, res) => {
    try {
        const newUser = new userModel({ ...req.body, password: md5(req.body.password) });  //使用md5进行加密
        await newUser.save();
        console.log("数据添加成功", newUser);
        res.render("success", { msg: "注册成功", url: "/login" });

     } catch (error) {

        res.status(500).send('注册失败，稍后重试')
        console.log("添加失败……", error);
     }
});

// 登录页面
router.get('/login', (req, res) => {
    res.render('auth/login')
})

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
          // 4、服务端写入session信息
          req.session.username = data.username; // data是从数据库中拿到的数据
          req.session._id = data._id;

          res.render("success", { msg: "登录成功", url: "/accountList" });
        } else {
            res.send('账号密码错误～')
        }

     } catch (error) {
        res.status(500).send('登录失败，稍后重试……')
     }
});

// 退出登录
router.get("/logout", (req, res) => {
    // 销毁session
    req.session.destroy(() => {
        res.render('success', {msg: '退出成功', url: '/login'})
    })
    
});


module.exports = router;
