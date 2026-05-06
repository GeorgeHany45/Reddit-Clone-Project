const comments = require('../models/comments_model')

exports.createcomment = async (req, res) => {
    try {
        const { text } = req.body
        if (!text || !text.trim()) {
            return res.status(400).json({ message: 'Comment text is required' })
        }

        const newcomment = await comments.create({
            text: text.trim(),
            user_id: req.user.id,
            post_id: req.params.id
        })
        res.status(201).json({
            message: 'comment created successfully',
            data: newcomment
        })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.getcommentsbypost = async (req, res) => {
    try {
        const postcomments = await comments.find({ post_id: req.params.id })
          .sort({ created_at: -1 })
          .populate('user_id', 'username')
        res.status(200).json({ data: postcomments })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}