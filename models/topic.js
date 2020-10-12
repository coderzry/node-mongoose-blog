var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})

var Schema = mongoose.Schema

var topicSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    palte: {
        type: String
    },
    publisher_id: {
        type: String
    },
    publisher: {
        type: String
    },
    createtime: {
        type: String
    },
    readNum: {
        type: Number,
        default: 0
    },
    like: {
        type: Number
    },
    dislike: {
        type: Number
    }

})


var Topic = module.exports = mongoose.model('Topic', topicSchema)


// var content = new Topic({
//     title: '你好',
//     content: 'sadadasad',
//     palte: 'sdaas',
//     publisher:'1773189480@qq.com'
// })
// content.save().then(() => {
//     console.log('初始化成功。。。')
// })