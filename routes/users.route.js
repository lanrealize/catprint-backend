const express = require('express')
const router = express.Router()
const userCOntroller = require('../controllers/users.controller')
const picturesRouter = require('./pictures.route')

router.use('/:_id/pictures', picturesRouter)

router.get('/', userCOntroller.getUsers)

router.get('/:_id', userCOntroller.getUserByID, userCOntroller.getUser)

router.delete('/:_id', userCOntroller.getUserByID, userCOntroller.deleteUser)

router.post('/', userCOntroller.createUser)

module.exports = router