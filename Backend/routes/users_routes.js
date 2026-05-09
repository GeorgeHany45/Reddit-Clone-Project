const express = require('express')
const route = express.Router()

const user = require('../controllers/users_controller')
const authMiddleware = require('../middlewares/authmiddleware')

route.get("/users", user.getallusers)
route.get("/user/:username", user.getUserByUsername)
route.put("/profile", authMiddleware, user.updateProfile)

console.log('Users routes loaded: GET /users, GET /user/:username, PUT /profile')

module.exports = route