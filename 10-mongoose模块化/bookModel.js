// 定义和导出模型

const mongoose = require("mongoose");

// 定义模型
const bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    is_hot: Boolean,
});

// 生成模型对象用来管理数据                     novel为集合名名称
const BookModel = mongoose.model("novel", bookSchema);

// 导出
module.exports = BookModel