const mongoose = require('mongoose')


const postschema = mongoose.Schema({
    title: {type : String , required: true},
    content: {type : String , required: true},
    user_id: {type : mongoose.Schema.Types.ObjectId, ref:'User' , required: true},
    community_id: {type : mongoose.Schema.Types.ObjectId , ref:'Communities'},
    created_at: {type : Date, default: Date.now}
})
module.exports = mongoose.model('Posts',postschema)