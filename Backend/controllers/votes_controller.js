const votes = require('../models/votes_model')

exports.togglevote = async (req, res) => {
    try {
        const { vote_type } = req.body
        const post_id = req.params.id
        const user_id = req.user.id

        if (![1, -1].includes(vote_type)) {
            return res.status(400).json({ message: 'Invalid vote type' })
        }

        const existingvote = await votes.findOne({ user_id, post_id })

        if (existingvote) {
            if (existingvote.vote_type === vote_type) {
                await votes.findOneAndDelete({ user_id, post_id })
                return res.status(200).json({ message: 'vote removed', vote_type: 0 })
            }
            existingvote.vote_type = vote_type
            await existingvote.save()
            return res.status(200).json({ message: 'vote updated', data: existingvote, vote_type })
        }

        const newvote = await votes.create({ user_id, post_id, vote_type })
        res.status(201).json({ message: 'vote added', data: newvote, vote_type })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.getvotesbypost = async (req, res) => {
    try {
        const postvotes = await votes.find({ post_id: req.params.id })
        const score = postvotes.reduce((acc, vote) => acc + vote.vote_type, 0)
        const userVote = req.user ? postvotes.find(v => v.user_id.toString() === req.user.id)?.vote_type || 0 : 0
        res.status(200).json({ votes: postvotes, score, userVote })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}