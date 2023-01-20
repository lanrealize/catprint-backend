const User = require('../models/users.model')
const request = require('request');


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
        await User.deleteOne({openID: req.params.openID})
        res.json({ message: `User with id: ${req.params.openID} deleted`})
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

async function getUserByID(req, res, next) {
    let user
    try {
        user = await User.findOne({openID: req.params.openID})
        if (user == null) return res.status(404).json({ message: `User with id: ${req.params._id} not fount`})
    } catch (e) {
        res.status(500).json({ message: e.message })
    }

    res.user = user
    next()
}

async function userLogin(req, res) {
    console.log(req.body.code)
    const url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + process.env.APP_ID + '&secret=' + process.env.APP_SECRET + '&js_code=' + req.body.code + '&grant_type=authorization_code'

    request(url, (err, response, body) => {
        const session = JSON.parse(body)
        console.log(session)
    })
}


module.exports = {
    getUsers: getUsers,

    getUser: getUser,

    deleteUser: deleteUser,

    getUserByID: getUserByID,

    createUser: createUser,

    userLogin: userLogin
}
