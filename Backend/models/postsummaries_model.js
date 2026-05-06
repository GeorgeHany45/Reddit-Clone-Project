const mongoose = require('mongoose')

const postsummaryschema = mongoose.Schema({
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Posts', required: true },
    summary_text: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('PostSummaries', postsummaryschema)