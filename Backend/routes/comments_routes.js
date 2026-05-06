const express = require('express')
const route = express.Router()
const commentscontroller = require('../controllers/comments_controller')
const auth = require('../middlewares/authmiddleware')

route.post('/comments/:id', auth, commentscontroller.createcomment)
route.get('/comments/:id', commentscontroller.getcommentsbypost)

module.exports = route