// 定义和导出模型

const mongoose = require("mongoose");

// 定义模型
const accountSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    time: Date,
    type: {
        type: Number,
        default: -1
    },
    account: {
        type: Number,
        required: true
    },
    remark: String
});

// 生成模型对象用来管理数据                     novel为集合名名称
const AccountModel = mongoose.model("accounts", accountSchema);

// 导出
module.exports = AccountModel