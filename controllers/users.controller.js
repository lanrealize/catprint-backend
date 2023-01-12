const User = require('../models/users.model')
const mongoose = require('mongoose')


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
        res.user.remove()
        res.json({ message: `User with id: ${req.params._id} deleted`})
    } catch(e) {
        res.status(500).json({ message: e.message })
    }
}

async function createUser(req, res) {

    try {

        User.create({
            _id: mongoose.Types.ObjectId(req.body._id),
            pictures: []
        })

        res.status(201).json({message: `created ${req.body._id} successfully`})

    } catch (e) {
        res.status(400).json({ message: e.message })
    }
}

async function getUserByID(req, res, next) {
    let user
    try {
        user = await User.findById(req.params._id)
        if (user == null) return res.status(404).json({ message: `User with id: ${req.params._id} not fount`})
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

    getUserByID: getUserByID,

    createUser: createUser
}