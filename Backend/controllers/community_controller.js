
const community = require('../models/communities_model')

exports.getallcommunities = async (req, res) => {
    try {
        const communities = await community.find()
        res.status(200).json({
            data: communities
        })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.getcommunity = async (req, res) => {
    try {
        const singlecommunity = await community.findById(req.params.id)
        if (singlecommunity) {
            res.status(200).json({
                community: singlecommunity
            })
        }
        else {
            res.status(404).json({ message: 'The community is not found' })
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.createcommunity = async (req, res) => {
    try {
        const existingcommunity = await community.findOne({ name: req.body.name })
        if (existingcommunity) {
            return res.status(400).json({ message: 'Community name is already in use' })
        }

        const newcommunity = await community.create({
            ...req.body,
            creator_id: req.user.id
        })
        res.status(201).json({
            message: 'community created',
            community: newcommunity
        })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.getcommunitybyname = async (req, res) => {
    try {
        const singlecommunity = await community.findOne({ name: req.params.name })
        if (singlecommunity) {
            res.status(200).json({ community: singlecommunity })
        }
        else {
            res.status(404).json({ message: 'The community is not found' })
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}