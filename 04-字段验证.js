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
    // 1、必填项、唯一值（重建集合后，才有效果）
    name: {
      type: String,
      required: [true, "name 不能为空！！！"],
      unique: true
    },
    // 2、默认项
    author: {
      type: String,
      default: "匿名",
    },
    // 3、枚举值；插入数据时，只能使用枚举中的数据
    tags: {
      type: String,
      enum: ['悬疑', '动作', '科幻'],
    },
    price: Number,
  });

  // 生成模型
  const Books = mongoose.model("Books", bookSchema);

  // 生成数据
  let sanguo = new Books({
    name: "三国演义",
    // author: "罗贯中",
    tags: '科幻',
    price: 99
  });

  // 保存到数据库
  try {
    const data = await sanguo.save();
    console.log(data);
  } catch (error) {
    console.log("保存数据时出错：", error);
  }
}
