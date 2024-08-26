var express = require('express');
var router = express.Router();

// 导入lowdb
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync(__dirname + "/../data/db.json");

// 获取db对象
const db = low(adapter);

// 导入shortid
const shortid = require("shortid");

// 导入moment
const moment = require('moment')
// console.log(moment("2022-03-01").toDate());

// 导入数据库相关方法 
const {addAcount} = require('../accountServer')

// 账单列表
router.get('/accountList', function(req, res, next) {
  let accounts = db.get("account").value();
  // console.log(accounts);
  res.render("list", { accounts });
});
// 添加账单
router.get("/accountList/creatAccount", function (req, res, next) {
  res.render("creat");
});

// 新增账单
router.post("/accountList", function (req, res, next) {
  // 打印账单数据
  console.log(req.body);

  // 插入数据库
  const newAccount = {
    ...req.body,
    // 转换时间格式——2024 - 08 - 26 —— moment —— new Date()
    time: moment(req.body.time).toDate(),
  };
  addAcount(newAccount);


  // 动态设置信息
  res.render("success", { msg: "添加成功", url: "/accountList" });
});

// 删除账单
router.get("/accountList/:id", function (req, res, next) {
  // 获取id
  let id = req.params.id;
  // 删除数据
  db.get("account").remove({ id: id }).write();
  // 动态设置信息
  res.render("success", { msg: "删除成功", url: "/accountList" });
});

module.exports = router;
