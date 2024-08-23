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

  // 1、字段筛选（只读取某些属性，提高读取效率）——只返回数据中的name和author
  //   try {
  //     const data = await BookModel.find().select({ name: 1, author: 1, _id: 0 }); //属性值为1就是显示该属性，为0则不显示（_id默认显示）
  //     console.log(data);
  //   } catch (error) {
  //     console.log("查询失败……");
  //   }

  // 2、数据排序——只返回数据中的name和author，按价格升序排序
  //   try {
  //     const data = await BookModel.find()
  //       .select({ name: 1, price: 1, _id: 0 })
  //       .sort({ price: 1 }); //1——升序，-1——降序
  //     console.log(data);
  //   } catch (error) {
  //     console.log("查询失败……");
  //   }

  // 3.1、数据截取——只返回数据中的name和author，按价格降序排序，截取前三个
//   try {
//     const data = await BookModel.find()
//       .select({ name: 1, price: 1, _id: 0 })
//       .sort({ price: -1 })
//       .limit(3);
//     console.log(data);
//   } catch (error) {
//     console.log("查询失败……");
//   }

  // 3.2、数据截取——只返回数据中的name和author，按价格降序排序，截取第4个至第6个
  try {
    const data = await BookModel.find()
      .select({ name: 1, price: 1, _id: 0 })
      .sort({ price: -1 })
      .skip(3)
      .limit(3);
    console.log(data);
  } catch (error) {
    console.log("查询失败……");
  }
}
