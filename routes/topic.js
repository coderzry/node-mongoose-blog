// 新建话题、删除话题、修改话题、查看话题列表。。。。
var Topic = require('../models/topic')
var User = require('../models/user')
var Comment = require('../models/comment')
var Plate = require('../models/plate_select')
var Fan = require('../models/fans')
var express = require('express')
var url = require('url')
const {
    data
} = require('jquery')
const {
    response,
    query
} = require('express')
const {
    dirname
} = require('path')
const user = require('../models/user')
const fans = require('../models/fans')


var router = express.Router()


router.get('/topic/new', function (req, res, next) {

    var body = req.session.user

    User.findOne({
        email: body.email
    }, function (err, quser) {
        if (err) {
            return next(err)
        }
        Plate.find(function (err, plates) {
            if (err) {
                return next(err)
            }
            res.render('./topic/new.html', {
                user: quser,
                plates: plates
            })
        })

    })

})


router.post('/topic/new', function (req, res, next) {
    var body = req.body

    var ncontent = new Topic(body)
    ncontent.save(function (err) {
        if (err) {
            return next(err)
        }
        res.status(200).json({
            err_code: 0,
            message: 'save is ok'
        })

    })
})


router.get('/topic/show', function (req, res, next) {

    if (req.session.user) {
        Topic.findById(req.query.id, function (err, topic) {
            if (err) {
                return next(err)
            }
            topic.readNum += 1
            Topic.updateOne({
                _id: req.query.id
            }, {
                readNum: topic.readNum
            }, function (err, message) {
                if (err) {
                    return next(err)
                }
            })
            User.findById(req.query.p_id, function (err, user, next) {
                if (err) {
                    return next(err)
                }

                Comment.find({
                    topic_id: req.query.id
                }, function (err, comments) {
                    if (err) {
                        return next(err)
                    }

                    // console.log(req.session.user)
                    res.render('./topic/show.html', {
                        topic: topic,
                        user: req.session.user,
                        quser: user,
                        comments: comments
                    })
                })

            })

        })
    } else {

        res.redirect('/login')
    }

    // res.render('./topic/show.html')
    // Topic.findById(req.body.id, function (err, topic) {
    //     if (err) {
    //         // return next(err)
    //         console.log(err)
    //     }
    //     topic.readNum += 1
    //     Topic.updateOne({
    //         _id: req.body.id
    //     }, {
    //         readNum: topic.readNum
    //     }, function (err, message) {
    //         if (err) {
    //             // return next(err)
    //             console.log(err)
    //         }
    //         console.log(topic)
    //         // res.send('server is ok ')
    //         // res.status(200).json({
    //         //     err_code: 0,
    //         //     message: 'is ok'
    //         // })
    //         res.render('./topic/show.html', {
    //             topic: topic
    //         })
    //     })

    // })
})




router.post('/comment', function (req, res, next) {

    var ncomment = new Comment(req.body)
    ncomment.save(function (err) {
        if (err) {
            return next(err)
        }
        res.status(200).json({
            err_code: 0,
            message: 'save comment is ok!'
        })
    })
})



router.get('/getfan', function (req, res, next) {
    // query = req.query
    console.log(req.query)
    console.log(req.session.user._id)
    Fan.findOne({
        fan_id: req.session.user._id
    }, function (err, fan) {
        if (err) {
            return next(err)
        }
        
        if (!fan) {
            User.findById(req.query.user_id, function (err, user) {
                if (err) {
                    return next(err)
                }
                user.fans += 1
                User.updateOne({
                    _id: req.query.user_id
                }, {
                    fans: user.fans
                }, function (err, message) {
                    if (err) {
                        return next(err)
                    }
                })
                var nfan = new Fan(req.query)
                nfan.save(req.query, function (err, message) {
                    if (err) {
                        return next(err)
                    }
                })
                res.status(200).json({
                    err_code: 0,
                    message: 'fan is success'
                })
            })
        } else {
            res.status(200).json({
                err_code: 1,
                message: 'Has been focused on'
            })
        }
    })



})



module.exports = router