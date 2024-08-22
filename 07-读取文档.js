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

  // 读取一条
  //   try {
  //     const data = await BookModel.findOne({ name: "狂飙" });
  //     console.log(data);
  //   } catch (error) {
  //     console.log("读取失败……");
  //   }

  // 根据id读取
  //   try {
  //     const data = await BookModel.findById("66c7153bb158509168ec9ffc");
  //     console.log(data);
  //   } catch (error) {
  //     console.log("读取失败……");
  //   }

  // 批量读取
//   try {
//     const data = await BookModel.find({ author: "余华" });
//     console.log(data);
//   } catch (error) {
//     console.log("读取失败……");
//   }

  // 全部读取
  try {
    const data = await BookModel.find();
    console.log(data);
  } catch (error) {
    console.log("读取失败……");
  }
}
