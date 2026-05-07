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

exports.updateProfile = async (req, res) => {
    try {
        console.log('=== PUT /api/users/profile HIT ===');
        console.log('req.body:', req.body);
        console.log('req.headers.authorization:', req.headers.authorization);
        console.log('req.user:', req.user);

        const { username, bio } = req.body;
        const userId = req.user.id;

        // Validate inputs
        if (!username || username.trim() === '') {
            return res.status(400).json({ message: 'Username is required' });
        }

        if (username.length < 3 || username.length > 20) {
            return res.status(400).json({ message: 'Username must be between 3 and 20 characters' });
        }

        // Check if username already exists (case-insensitive, excluding current user)
        const existingUser = await users.findOne({
            username: { $regex: `^${username}$`, $options: 'i' },
            _id: { $ne: userId }
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        // Update user
        const updatedUser = await users.findByIdAndUpdate(
            userId,
            {
                username: username.trim(),
                bio: bio ? bio.trim().slice(0, 200) : ''
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'Profile updated successfully',
            data: {
                id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                bio: updatedUser.bio
            }
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: error.message });
    }
}