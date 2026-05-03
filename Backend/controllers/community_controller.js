
const community = require('../models/communities_model')
const communitymember = require('../models/communitymembers_model')
const jwt = require('jsonwebtoken')

exports.getallcommunities = async (req, res) => {
    try {
        const allcommunities = await community.find()
        const token = req.headers.authorization?.split(' ')[1]

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const userid = decoded.id

            const joinedcommunities = await communitymember.find({ user_id: userid })
            const joinedids = joinedcommunities.map(m => m.community_id.toString())

            const communitieswithflag = allcommunities.map(c => ({
                ...c._doc,
                isJoined: joinedids.includes(c._id.toString())
            }))

            return res.status(200).json({ data: communitieswithflag })
        }

        res.status(200).json({ data: allcommunities })
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

         // auto join creator
        await communitymember.create({
            user_id: req.user.id,
            community_id: newcommunity._id
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