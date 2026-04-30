const mongoose = require('mongoose')


const communityschema = mongoose.Schema({
    name: {type: String , required:true, unique : true},
    description: {type: String , required : true},
     topic: { type: String, required: true },
    creator_id : {type : mongoose.Schema.Types.ObjectId , ref:'User',required:true},
    created_at : {type : Date , default: Date.now}


})

module.exports = mongoose.model('Communities',communityschema)