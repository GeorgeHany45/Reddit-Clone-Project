const users = require('../models/users_model')

exports.getallusers = async (req, res) => {
    try {
        const allusers = await users.find()
        res.status(200).json({ users: allusers })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}