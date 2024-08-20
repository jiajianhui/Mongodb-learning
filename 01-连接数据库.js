// 1、安装 Mongoose
// 2、导入 Mongoose
const mongoose = require('mongoose')

// 3、链接 MongoDB 服务
mongoose.connect('mongodb://127.0.0.1:27017/hello')  //hello为数据库名称

// 4、设置回调
mongoose.connection.on('open', () => {
    console.log('连接成功');
    
})

mongoose.connection.on("error", () => {
  console.log("连接失败");
});

mongoose.connection.on("close", () => {
  console.log("连接关闭");
});

// 测试关闭
setTimeout(() => {
    mongoose.disconnect()
}, 2000);