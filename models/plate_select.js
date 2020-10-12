var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})

var Schema = mongoose.Schema

var plateSchema = new Schema({
    platename: {
        type: String,
        require: true
    }
})

var plateModel = module.exports = mongoose.model('Plate', plateSchema)


//用于初始数据模型和添加数据
// var plates = ['分享', '问答', '招聘', '客户端测试']
// var iplates = new Array()
// for (var i = 0; i < plates.length; i++) {
//     let plate = new plateModel({
//         platename: plates[i]
//     })
//     iplates.push(plate)
// }
// plateModel.insertMany(iplates, function (err) {
//     if (err) {
//         console.log(err)
//     }
//     console.log('初始化成功....')
// })