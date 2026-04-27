const mongoose = require('mongoose')

const commentsmodel = mongoose.Schema({
    user_id : {type : mongoose.Schema.Types.ObjectId , ref : 'User', required: true},
    post_id : {type : mongoose.Schema.Types.ObjectId , ref : 'Posts', required: true},
    text : {type : String , required : true},
    created_at : {type : Date , default : Date.now}

})

module.exports = mongoose.model('Comments',commentsmodel)