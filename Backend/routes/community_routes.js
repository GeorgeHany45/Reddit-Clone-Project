const express = require('express')
const route = express.Router()

const communityroute = require('../controllers/community_controller')
const auth = require('../middlewares/authmiddleware')

route.get("/communities", communityroute.getallcommunities)
route.get("/communities/name/:name", communityroute.getcommunitybyname)
route.get("/communities/:id", communityroute.getcommunity)
route.post("/communities", auth, communityroute.createcommunity)

module.exports = route