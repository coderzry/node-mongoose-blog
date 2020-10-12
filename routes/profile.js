var User = require('../models/user')
var express = require('express')
const {
    data
} = require('jquery')
const {
    route
} = require('../router')
var bodyParser = require('body-parser')
var fs = require('fs')
var formidable = require('formidable')
const md5 = require('blueimp-md5')
let cacheFolder = 'public/img/' //头像存放路径


var router = express.Router()


//设置信息  
router.get('/settings/profile', function (req, res, next) {
    var body = req.session.user

    User.findOne({
        email: body.email
    }, function (err, quser) {
        if (err) {
            return next(err)
        }
        res.render('./settings/profile.html', {
            user: quser
        })
    })


})

router.post('/settings/profile', function (req, res) {
    //1.获取表单数据
    //2.保存重新渲染页面
    var body = req.body
    console.log(body)
    // User.findOne({
    //     email:body.email
    // }, function (err, data) {
    //     if (err) {
    //         return next(err)
    //     }
    //     console.log(data)
    // })
    User.findOneAndUpdate({
        email: body.email
    }, body, function (err, data) {
        if (err) {
            return next(err)
        }
        // req.session.user = data
        res.status(200).json({
            err_code: 0,
            messagae: '修改信息成功'
        })
    })

})


router.get('/settings/admin', function (req, res) {
    var body = req.session.user

    User.findOne({
        email: body.email
    }, function (err, quser) {
        if (err) {
            return next(err)
        }
        res.render('./settings/admin.html', {
            user: quser
        })
    })
})

router.post('/settings/admin', function (req, res, next) {
    var suser = req.session.user //获取session.user 依据email进行查询
    var body = req.body //post表单的数据
    User.findOne({
        email: suser.email
    }, function (err, user) {
        if (err) {
            return next(err)
        }
        if (user.password != md5(md5(body.opassword))) {
            return res.status(200).json({
                err_code: 1,
                messagae: 'opassword is mistake..'
            })
        }
        if (user.password == md5(md5(body.npassword)) || user.password == md5(md5(body.cpassword))) {
            return res.status(200).json({
                err_code: 2,
                messagae: 'Cannot be the same as the old password'
            })
        }
        if (body.npassword != body.cpassword) {
            return res.status(200).json({
                err_code: -1,
                messagae: 'The two passwords do not match..'
            })
        }
    })
    User.findOneAndUpdate({
        email: suser.email
    }, {
        password: md5(md5(body.npassword))
    }, function (err, data) {
        if (err) {
            return next(err)
        }
        res.status(200).json({
            err_code: 0,
            messagae: 'change is ok !'
        })
    })
})




router.get('/logoff', function (req, res) {
    var user = req.session.user
    User.deleteOne({
        email: user.email
    }, function (err) {
        if (err) {
            return next(err)
        }
        req.session.destroy()
        return res.redirect('/')
    })
})

module.exports = router