var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})

var Schema = mongoose.Schema

var commentSchema = new Schema({
    topic_id: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    from_id: {
        type: String,
        required: true,
    },
    from_nickname: {
        type: String
    },
    like: {
        type: Number
    }
})


var Comment = module.exports = mongoose.model('Comment', commentSchema)

// var content = new Comment({
//     topic_id: '你好',
//     content: 'sadadasad',
//     from_id: 'sdaas',
//     like:1
// })
// content.save().then(() => {
//     console.log('初始化成功。。。')
// })