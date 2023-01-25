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
    res.json(res.user)
}

async function deleteUser(req, res) {
    try {
        await User.deleteOne({openID: req.wxUser.openID})
        res.status(204).json({ message: `User with id: ${req.wxUser.openID} deleted`})
    } catch(e) {
        res.status(500).json({ message: e.message })
    }
}

async function createUser(req, res) {

    try {

        User.create({
            openID: req.body.openID,
            pictures: []
        })

        res.status(201).json({message: `created ${req.body.openID} successfully`})

    } catch (e) {
        res.status(400).json({ message: e.message })
    }
}

async function getUserByOpenID(req, res, next) {
    let user
    try {
        user = await User.findOne({openID: req.wxUser.openID})
        // TODO: automatically register should be implement here
        if (user == null) return res.status(404).json({ message: `User with OpenID: ${req.wxUser.openID} not fount`})
    } catch (e) {
        res.status(500).json({ message: e.message })
    }

    res.user = user
    next()
}

module.exports = {
    getUsers: getUsers,
    getUser: getUser,
    deleteUser: deleteUser,
    getUserByOpenID: getUserByOpenID,
    createUser: createUser,
}
