const express = require('express')
const route = express.Router()

const user = require('../controllers/users_controller')

route.get("/users",user.getallusers)

module.exports = route