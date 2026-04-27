const mongoose = require('mongoose')


const votesmodel = mongoose.Schema({
    user_id : {type : mongoose.Schema.Types.ObjectId , ref:'User', required: true},
    post_id : {type : mongoose.Schema.Types.ObjectId , ref:'Posts', required:true},
    vote_type : {type :Number , enum : [1,-1] , required: true }
})

module.exports = mongoose.model('Votes',votesmodel)