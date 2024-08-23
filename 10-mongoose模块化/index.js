const connectDB = require('./db')
const {findAllBooks} = require("./bookService");

async function main() {
  // 连接数据库
  await connectDB();
  // 查找数据库
  try {
    await findAllBooks();
  } catch (error) {
    console.log(error);
    
  }
  
}

main().catch((err) => console.log(err));