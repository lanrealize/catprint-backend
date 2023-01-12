const express = require('express')
const router = express.Router()
const userCOntroller = require('../controllers/users.controller')

router.get('/', userCOntroller.getUsers)

router.get('/:_id', userCOntroller.getUserByID, userCOntroller.getUser)

router.delete('/:_id', userCOntroller.getUserByID, userCOntroller.deleteUser)

router.post('/', userCOntroller.createUser)

module.exports = router