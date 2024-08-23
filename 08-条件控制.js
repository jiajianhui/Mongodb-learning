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

  // 1、运算符——价格小于20的书
  //   try {
  //     const data = await BookModel.find({ price: { $lt: 20 } }); // lt 是less then的缩写
  //     console.log(data);
  //   } catch (error) {
  //     console.log("查询失败……");
  //   }

  // 2.1、逻辑运算符——曹雪芹或者余华的书
  //   try {
  //     const data = await BookModel.find({
  //       $or: [{ author: "曹雪芹" }, { author: "余华" }],
  //     });
  //     console.log(data);
  //   } catch (error) {
  //     console.log("查询失败……");
  //   }

  // 2.1、逻辑运算符——价格大于30且小于70的书
  //   try {
  //     const data = await BookModel.find({
  //       $and: [{ price: { $gt: 30 } }, { price: { $lt: 70 } }],
  //     });
  //     console.log(data);
  //   } catch (error) {
  //     console.log("查询失败……");
  //   }

  // 3、正则表达式——查询书名中带有 三 的书
  //   try {
  //     const data = await BookModel.find({ name: /三/});  //当正则关键字为变量时，不能使用该方法
  //     console.log(data);
  //   } catch (error) {
  //     console.log("查询失败……");
  //   }

  // 3、正则表达式——查询书名中带有 三 的书
  try {
    const data = await BookModel.find({ name: new RegExp("三") }); //当正则关键字为变量时，使用该方法
    console.log(data);
  } catch (error) {
    console.log("查询失败……");
  }
}
