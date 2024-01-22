const express = require('express')
const usersRouter = express.Router()
const userController = require('../controllers/users.controller')

const albumsRouter = require('./albums.route')

usersRouter.use('/:openID/albums', albumsRouter)

usersRouter.get('/', userController.getUsers)
usersRouter.get('/:openID', userController.getUser)
usersRouter.delete('/:openID', userController.deleteUser)
usersRouter.post('/:openID', userController.createUser)

module.exports = usersRouter