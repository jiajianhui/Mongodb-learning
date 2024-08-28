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
       throw error; //确保抛出异常，供外部捕获
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
       throw error; //确保抛出异常，供外部捕获
     }
}

// 删除数据
async function deleteAcount(id) {
     try {
       const data = await accountModel.deleteOne({ _id: id });
       console.log("删除成功", data);
       return data
       
     } catch (error) {
       console.log("删除失败……", error);
       throw error; //确保抛出异常，供外部捕获
     }
}

// 获取单条数据
async function findOneaccount(id) {
  try {
    const data = await accountModel.findById(id)
    console.log("获取成功……", data);
    return data;
  } catch (error) {
    console.log("获取失败……", error);
    throw error; //确保抛出异常，供外部捕获
  }
}

// 更新单条数据
async function updateAccount(id, newData) {
  try {
    const data = await accountModel.updateOne({ _id: id }, newData);
    console.log("更新成功……", data);
    return data;
  } catch (error) {
    console.log("更新失败……", error);
    throw error; //确保抛出异常，供外部捕获
  }
}

// 导出相关api
module.exports = {
  findAllaccounts,
  addAcount,
  deleteAcount,
  findOneaccount,
  updateAccount,
};
