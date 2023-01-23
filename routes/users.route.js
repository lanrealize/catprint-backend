const express = require('express')
const router = express.Router()
const userCOntroller = require('../controllers/users.controller')
const authController = require('../controllers/auth.controller')

const picturesRouter = require('./pictures.route')

// router.use('/user/pictures', picturesRouter)

router.get('/', userCOntroller.getUsers)

router.get('/user', authController.authenticateToken, userCOntroller.getUserByOpenID, userCOntroller.getUser)

router.delete('/user', authController.authenticateToken, userCOntroller.getUserByOpenID, userCOntroller.deleteUser)

router.post('/', userCOntroller.createUser)

module.exports = router