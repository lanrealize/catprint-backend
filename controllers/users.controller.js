const User = require('../models/users.model')


async function getUsers(req, res) {
    try {
        const users = await User.find()
        res.json(users)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

async function getUser(req, res) {
    try {
        const user = await User.find({openID: req.params.userID})
        res.json(user)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

async function deleteUser(req, res) {
    try {
        await User.deleteOne({openID: req.params.userID})
        res.status(204).json({ message: `User with id: ${req.params.userID} deleted`})
    } catch(e) {
        res.status(500).json({ message: e.message })
    }
}

async function createUser(req, res) {

    try {
        User.create({openID: req.params.userID})
        res.status(201).json({message: `created ${req.params.userID} successfully`})

    } catch (e) {
        res.status(400).json({ message: e.message })
    }
}

module.exports = {
    getUsers: getUsers,
    getUser: getUser,
    deleteUser: deleteUser,
    createUser: createUser,
}
