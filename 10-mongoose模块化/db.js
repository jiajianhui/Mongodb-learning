// 数据库连接模块

// 导入 Mongoose
const mongoose = require("mongoose");


//连接数据库
async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/hello");
    console.log("数据库连接成功");
  } catch (error) {
    console.log("数据库连接失败：", error);
  }
}


// 导出
module.exports = connectDB;