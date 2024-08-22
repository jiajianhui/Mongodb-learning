// 1、安装 Mongoose
// 2、导入 Mongoose
const mongoose = require("mongoose");

// 捕捉错误
main().catch((err) => console.log(err));

async function main() {
  // 连接 MongoDB 服务
  await mongoose.connect("mongodb://127.0.0.1:27017/hello"); //hello为数据库名称
  console.log("数据库连接成功");

  // 定义模型
  const bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    is_hot: Boolean,
  });

  // 生成模型对象用来管理数据                     novel为集合名名称
  const BookModel = mongoose.model("novel", bookSchema);

  // 更新一条
//   try {
//     const data = await BookModel.updateOne({ name: "红楼梦"}, {price: 9.9 });
//     console.log(data);
//   } catch (error) {
//     console.log("更新出错……");
//   }


  // 更新多条
  try {
    const data = await BookModel.updateMany({ author: "余华"}, {is_hot: false });
    console.log(data);
  } catch (error) {
    console.log("更新出错……");
  }
}
