const express = require('express')
const route = express.Router()

const auth = require('../controllers/auth_controller')
const authMiddleware = require('../middlewares/authmiddleware')

route.post("/register", auth.register)
route.post("/login", auth.login)
route.get("/me", authMiddleware, auth.getCurrentUser)
route.post("/forgot-password", auth.forgotPassword)
route.post("/reset-password", auth.resetPassword)

module.exports = route