var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var session = require('express-session')
var router = require('./router')
var profile = require('./routes/profile')
var topic = require('./routes/topic')
const {
  settings
} = require('cluster')



var app = express()

app.use('/public', express.static(path.join(__dirname, './public')))
app.use('/node_modules', express.static(path.join(__dirname, './node_modules')))



app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views/')) //默认views目录

//配置 获取表单post请求体数据
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

//挂在路由到app
app.use(router)
app.use(profile)
app.use(topic)


//配置一个处理404得中间件
app.use(function (req, res, next) {
  res.render('404.html')
})

//配置全局错误处理中间件
app.use(function (err, req, res, next) {
  res.status(500).json({
    err_code: 500,
    message: err.message  
  })
})



app.listen(3000, function () {
  console.log('server is running 3000 .....')
})