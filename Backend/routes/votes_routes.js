const express = require('express')
const route = express.Router()
const votescontroller = require('../controllers/votes_controller')
const auth = require('../middlewares/authmiddleware')

route.post('/votes/:id', auth, votescontroller.togglevote)
route.get('/votes/:id', auth, votescontroller.getvotesbypost)

module.exports = route