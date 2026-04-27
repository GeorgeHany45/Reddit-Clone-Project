const mongoose = require('mongoose')

const communitymembersschema = mongoose.Schema({
    user_id : {type : mongoose.Schema.Types.ObjectId , ref:'User' , required : true},
    community_id : {type : mongoose.Schema.Types.ObjectId , ref:'Communities', required : true},
    joined_at : {type : Date , default : Date.now}
})

module.exports = mongoose.model('Communitymembers',communitymembersschema)