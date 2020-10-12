var express = require('express')
var User = require('./models/user')
var md5 = require('blueimp-md5')
var session = require('express-session')
var Topic = require('./models/topic')
var moment = require('moment')




var router = express.Router()

router.get('/', function (req, res, next) {
  Topic.find(function (err, topics) {
    if (err) {
      return next(err)
    }
    
    // topics.createtime = moment(topics.createtime).format('YYYY-MM-DD HH:mm:ss')
    
    res.render('index.html', {
      user: req.session.user,
      topics: topics
    })
  })

})

router.get('/login', function (req, res) {
  res.render('login.html')
})

router.post('/login', function (req, res, next) {
  //1.获取表单数据
  //2.和数据库做比对
  //3.发送响应数据

  var body = req.body

  User.findOne({
    email: body.email,
    password: md5(md5(body.password))
  }, function (err, user) {
    if (err) {
      // return res.status(500).json({
      //   err_code: 500,
      //   message: err.message
      // })
      return next(err)
    }
    if (!user) {
      return res.status(200).json({
        err_code: 1,
        message: 'email or password is error'
      })
    }
    req.session.user = user
    res.status(200).json({
      err_code: 0,
      message: 'is ok'
    })
  })
})

router.get('/register', function (req, res) {
  res.render('register.html')
})

// router.post('/register', function (req, res) {
//   //1.获去表单 提交数据
//   //2.操作数据库
//   //3.发送响应
//   var body = req.body
//   User.findOne({
//     $or: [{
//         email: body.email
//       },
//       {
//         nickname: body.nickname
//       }
//     ]
//   }, function (err, data) {
//     if (err) {
//       return res.status(500).json({
//         success: false,
//         message: '服务端错误'
//       })
//     }
//     if (data) {
//       return res.status(200).json({
//         err_code: 1,
//         message: 'email or nickname is already exists...'
//       })
//     }
//     body.password = md5(md5(body.password))
//     var nuser = new User(body)
//     nuser.save(function (err, user) {
//       if (err) {
//         return res.status(500).json({
//           err_code: 500,
//           message: 'internal error...'
//         })
//       }
//       req.session.isLogin = true
//       res.status(200).json({
//         err_code: 0,
//         message: 'Ok'
//       })
//     })
//   })
// })

router.post('/register', async function (req, res, next) {
  var body = req.body
  try {
    if (await User.findOne({
        email: body.email
      })) {
      return res.status(200).json({
        err_code: 1,
        message: '邮箱已存在'
      })
    }

    if (await User.findOne({
        nickname: body.nickname
      })) {
      return res.status(200).json({
        err_code: 2,
        message: '昵称已存在'
      })
    }

    // 对密码进行 md5 重复加密
    body.password = md5(md5(body.password))

    // 创建用户，执行注册
    await new User(body).save()
    req.session.user = new User(body)

    res.status(200).json({
      err_code: 0,
      message: 'OK'
    })
  } catch (err) {
    // res.status(500).json({
    //   err_code: 500,
    //   message: err.message
    // })
    return next(err)
  }
})

router.get('/logout', function (req, res) {
  req.session.destroy()
  res.redirect('/')
})


module.exports = router