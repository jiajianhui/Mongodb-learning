// 业务逻辑模块;

const accountModel = require("./accountModel");

// 查看全部数据
async function findAllaccounts() {
     try {
       const data = await accountModel.find().sort({time: 1});
       console.log("读取成功……", data);
       return data
       
     } catch (error) {
       console.log("读取失败……", error);
       return [] //确保返回数据，不然会报错
     }
}

// 插入数据
async function addAcount(account) {
     try {
       const newAccount = new accountModel(account);
       await newAccount.save()
       console.log("数据添加成功", newAccount);
       
     } catch (error) {
       console.log("添加失败……", error);
     }
}

// 导出相关api
module.exports = {
  findAllaccounts,
  addAcount,
};
