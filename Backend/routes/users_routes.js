const express = require('express')
const route = express.Router()

const user = require('../controllers/users_controller')
const authMiddleware = require('../middlewares/authmiddleware')

route.get("/users", user.getallusers)
route.put("/profile", authMiddleware, user.updateProfile)

console.log('Users routes loaded: GET /users, PUT /profile')

module.exports = route