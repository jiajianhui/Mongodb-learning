var express = require("express");
var router = express.Router();

// 导入moment
const moment = require("moment");
// console.log(moment("2022-03-01").toDate());

// 导入数据库相关方法
const {
  findAllaccounts,
  addAcount,
  deleteAcount,
  findOneaccount,
  updateAccount,
} = require("../../accountServer");

// 账单列表
router.get("/accountList", async function (req, res, next) {
  try {
    const accounts = await findAllaccounts();
    
    // 响应成功
    res.json({
        //响应编号
        code: '0000',
        //响应信息
        msg: '读取成功',
        //响应数据
        data: accounts
    })
  } catch (error) {
    res.json({
        code: '1001',
        msg: '读取失败',
        data: null
    })
  }
});


// 新增账单
router.post("/accountList", async function (req, res, next) {
  try {
    // 准备数据
    const newAccount = {
      ...req.body,
      // 转换时间格式——2024 - 08 - 26 —— moment —— new Date()
      time: moment(req.body.time).toDate(),
    };
    // 插入数据库
    await addAcount(newAccount);
    // 响应成功
    res.json({
      code: "0000",
      msg: "添加成功",
      data: newAccount,
    });
  } catch (error) {
    res.json({
      code: "1002",
      msg: "创建失败",
      data: null,
    });
  }
});

// 删除账单
router.delete("/accountList/:id", async function (req, res, next) {
  try {
    // 获取id
    let id = req.params.id;
    // 删除数据
    const data = await deleteAcount(id);
    // 响应成功
    res.json({
      code: "0000",
      msg: "删除成功",
      data: data
    });
  } catch (error) {
    res.json({
      code: "1003",
      msg: "删除失败",
      data: null
    });
  }
});

// 获取单条账单
router.get("/accountList/:id", async function (req, res, next) {
  try {
    // 获取id
    let id = req.params.id;
    // 获取数据
    const data = await findOneaccount(id)
    // 响应成功
    res.json({
      code: "0000",
      msg: "获取成功",
      data: data,
    });
  } catch (error) {
    res.json({
      code: "1004",
      msg: "获取失败",
      data: null,
    });
  }
});

// 更新单条账单
router.patch("/accountList/:id", async function (req, res, next) {
  try {
    // 获取id
    let id = req.params.id;
    let newData = req.body
    await updateAccount(id, newData);
    // 获取数据
    const data = await findOneaccount(id)
    // 响应成功
    res.json({
      code: "0000",
      msg: "更新成功",
      data: data,
    });
  } catch (error) {
    res.json({
      code: "1005",
      msg: "更新失败",
      data: null,
    });
  }
});

module.exports = router;
