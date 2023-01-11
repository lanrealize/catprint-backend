const express = require('express')
const router = express.Router()
const userCOntroller = require('../controllers/users')

router.get('/', userCOntroller.getUserPicByID)

module.exports = router