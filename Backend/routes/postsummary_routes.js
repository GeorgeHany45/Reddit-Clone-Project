const express = require('express')
const route = express.Router()
const postsummarycontroller = require('../controllers/postsummary_controller')
const auth = require('../middlewares/authmiddleware')

route.post('/summary/:id', auth, postsummarycontroller.summarizepost)
route.get('/summary/:id', postsummarycontroller.getsummarybypost)

module.exports = route