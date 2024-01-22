const express = require('express')
const router = express.Router()
const userController = require('../controllers/users.controller')
const authController = require('../controllers/auth.controller')

// const picturesRouter = require('./pictures.route')

// router.use('/pictures', picturesRouter)

router.get('/', userController.getUsers)

router.get('/:userID', userController.getUser)

router.delete('/:userID', userController.deleteUser)

router.post('/:userID', userController.createUser)

module.exports = router