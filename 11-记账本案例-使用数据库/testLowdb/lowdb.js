// 导入lowdb
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");

// 获取db对象
const db = low(adapter);


// 初始化数据；write为写入
// db.defaults({ posts: [], user: {} }).write();

// 写入数据
// db.get('posts').push({id: 1, title: 'hello'}).write()
// db.get("posts").unshift({ id: 2, title: "hello" }).write();

// 获取数据
// console.log(db.get('posts').value());

// 获取单条数据
// let data = db.get('posts').find({id: 1}).value()
// console.log(data);


// 删除数据；返回删除的数据
// let data = db.get('posts').remove({id: 2}).write()
// console.log(data);

// 更新数据
db.get("posts").find({ id: 1 }).assign({title: 'world'}).write()


