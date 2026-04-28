const express = require('express')
const route = express.Router()

const communitymemberroute = require('../controllers/communitymembers_controller')
const auth = require('../middlewares/authmiddleware')

route.post("/communities/:id/join",auth,communitymemberroute.joincommunity)
route.delete("/communities/:id/leave",auth,communitymemberroute.leavecommunity)


module.exports = route