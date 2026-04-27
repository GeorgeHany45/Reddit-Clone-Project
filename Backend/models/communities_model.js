const mongoose = require('mongoose')


const communityschema = mongoose.Schema({
    name: {type: String , required:true},
    description: String,
    creator_id : {type : mongoose.Schema.Types.ObjectId , ref:'User'},
    created_at : {type : Date , default: Date.now}


})

module.exports = mongoose.model('Communities',communityschema)