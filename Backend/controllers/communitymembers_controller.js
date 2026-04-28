const communitymember = require('../models/communitymembers_model')

exports.joincommunity = async (req, res) => {
    try {
        const existing = await communitymember.findOne({
            user_id: req.user.id,
            community_id: req.params.id
        })

        if (existing) {
            return res.status(400).json({ message: 'already a member' })
        }

        const newmember = await communitymember.create({
            user_id: req.user.id,
            community_id: req.params.id
        })

        res.status(201).json({
            message: 'user joined successfully',
            member: newmember
        })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.leavecommunity = async (req, res) => {
    try {
        const removemember = await communitymember.findOneAndDelete({
            user_id: req.user.id,
            community_id: req.params.id
        })

        if (!removemember) {
            return res.status(404).json({ message: 'you are not a member' })
        }

        res.status(200).json({
            message: 'user removed successfully'
        })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}