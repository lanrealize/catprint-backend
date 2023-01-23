const express = require('express')
const router = express.Router()
const userController = require('../controllers/users.controller')
const authController = require('../controllers/auth.controller')

const picturesRouter = require('./pictures.route')

router.use('/user/pictures', picturesRouter)

router.get('/', userController.getUsers)

router.get('/user', authController.authenticateToken, userController.getUserByOpenID, userController.getUser)

router.delete('/user', authController.authenticateToken, userController.getUserByOpenID, userController.deleteUser)

router.post('/', userController.createUser)

module.exports = router