// 定义和导出模型

const mongoose = require("mongoose");

// 定义模型
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

// 生成模型对象用来管理数据                     novel为集合名名称
const UserModel = mongoose.model("users", userSchema);

// 导出
module.exports = UserModel