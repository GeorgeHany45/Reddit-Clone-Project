const posts = require('../models/post_model')
const communitymember = require('../models/communitymembers_model')


exports.createpost = async(req , res)=>{
    try{
        const { title, content, media_url, media_type, community_id } = req.body
        if (!title || !title.trim()) {
            return res.status(400).json({ message: 'Title is required' })
        }

        // Allow empty content for text posts
        if (!media_url && !content && !title) {
            return res.status(400).json({ message: 'Post must have a title or content.' })
        }
        if (media_url && !['image','video'].includes(media_type)) {
            return res.status(400).json({ message: 'Invalid media type.' })
        }

        const createpost = await posts.create({
            title: title.trim(),
            content: content?.trim() || '',
            media_url: media_url || '',
            media_type: media_url ? media_type : '',
            community_id,
            user_id : req.user.id
        })
        res.status(201).json({
            message : 'post created successfully',
            data : createpost
        })
    }
    catch(error){
        res.status(400).json({message : error.message})
    }
}

exports.getfeedposts = async (req, res) => {
    try {
        console.log("=== GET FEED POSTS ===");
        console.log("User ID:", req.user.id);
        
        // get communities the user joined
        const joinedcommunities = await communitymember.find({ user_id: req.user.id })
        console.log("Joined communities:", joinedcommunities);
        console.log("Number of joined communities:", joinedcommunities.length);
        
        const communityids = joinedcommunities.map(m => m.community_id)
        console.log("Community IDs:", communityids);

        //sorted by most recent first
        const feedposts = await posts.find({ community_id: { $in: communityids } })
          .sort({ created_at: -1 })
          .populate('user_id', 'username')
          .populate('community_id', 'name')
          
        console.log("Feed posts found:", feedposts.length);
        console.log("Feed posts:", feedposts);
        
        res.status(200).json({ data: feedposts })
    }
    catch (error) {
        console.error("Error in getfeedposts:", error);
        res.status(400).json({ message: error.message })
    }
}

exports.getpostsbycommunity = async (req, res) => {
    try {
        const communityposts = await posts.find({ community_id: req.params.id })
          .sort({ created_at: -1 })
          .populate('user_id', 'username')
          .populate('community_id', 'name')
        res.status(200).json({ data: communityposts })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.getpostbyid = async (req, res) => {
    try {
        const post = await posts.findById(req.params.id)
          .populate('user_id', 'username')
          .populate('community_id', 'name description')

        if (!post) {
            return res.status(404).json({ message: 'Post not found' })
        }

        res.status(200).json({ data: post })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}