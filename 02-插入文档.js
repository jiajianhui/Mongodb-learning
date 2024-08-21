// 1、安装 Mongoose
// 2、导入 Mongoose
const mongoose = require("mongoose");

// 捕捉错误
main().catch((err) => console.log(err));

async function main() {
  // 3、连接 MongoDB 服务
  await mongoose.connect("mongodb://127.0.0.1:27017/hello"); //hello为数据库名称
  console.log('数据库连接成功');
  

  // 4、定义模型
  const bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
  });

  // 5、生成模型
  const Books = mongoose.model("Books", bookSchema);

  // 6、生成数据
  let sanguo = new Books({
    name: "三国演义",
    author: "罗贯中",
    price: 99,
  });

  // 7、保存到数据库
  await sanguo.save();
}






