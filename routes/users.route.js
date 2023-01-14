const express = require('express')
const router = express.Router()
const userCOntroller = require('../controllers/users.controller')
const picturesRouter = require('./pictures.route')

router.use('/:openID/pictures', picturesRouter)

router.get('/', userCOntroller.getUsers)

router.get('/:openID', userCOntroller.getUserByID, userCOntroller.getUser)

router.delete('/:openID', userCOntroller.deleteUser)

router.post('/', userCOntroller.createUser)

module.exports = router