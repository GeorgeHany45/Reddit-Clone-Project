const postroutes = require('../controllers/post_controller')
const auth = require('../middlewares/authmiddleware')

const express = require('express')
const route = express.Router()

route.get('/community/:id/posts', postroutes.getpostsbycommunity)
route.get('/posts', auth, postroutes.getfeedposts)
route.get('/:id', postroutes.getpostbyid)
route.post('/createpost', auth, postroutes.createpost)

module.exports = route