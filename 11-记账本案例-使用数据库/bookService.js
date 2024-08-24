// 业务逻辑模块;

const BookModel = require('./bookModel')

// 查看全部数据
async function findAllBooks() {
     try {
       const data = await BookModel.find();
       console.log(data);
     } catch (error) {
       console.log("读取失败……", error);
     }
}

// 导出相关api
module.exports = {
    findAllBooks,
}
