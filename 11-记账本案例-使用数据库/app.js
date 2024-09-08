var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 导入express-session
const session = require('express-session')
const MongoStore = require("connect-mongo");

// 导入配置项
const { DBHOST, DBPORT, DBNAME } = require("./config");

// 导入相关api
var indexRouter = require('./routes/web/index');
var authRouter = require("./routes/web/auth");
const accountRouter = require('./routes/api/account')

var app = express();

// 设置 session 的中间件
app.use(
  session({
    name: "sid", //设置cookie的name，默认值是:connect.sid（服务器校验通过后会将session以cookie返回给浏览器，此处是cookie名称）
    secret: "jianhui", //参与加密的字符串(又称签名)  加盐
    saveUninitialized: false, //是否为每次请求都设置一个cookie用来存储session的id
    resave: true, //是否在每次请求时重新保存session   session也有生命周期（例如长时间不操作，会让用户重新登录）
    store: MongoStore.create({
      mongoUrl: `mongodb://${DBHOST}:${DBPORT}/${DBNAME}`, //数据库的连接配置
    }),

    // 设置浏览器端的cookie内容
    cookie: {
      httpOnly: true, // 开启后前端无法通过 JS 操作
      maxAge: 1000 * 300, // 设置cookie和session的生命周期
    },
  })
);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 路由
app.use('/', indexRouter);
app.use("/", authRouter);
app.use("/api", accountRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // 响应404页面
  res.render('404')
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
