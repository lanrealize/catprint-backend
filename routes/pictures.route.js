const express = require('express')
const router = express.Router()
const userCOntroller = require('../controllers/users.controller')
const picturesController = require('../controllers/pictures.controller')
const authController = require('../controllers/auth.controller')

const picturesRouter = express.Router({mergeParams: true});

picturesRouter.get('/', authController.authenticateToken, userCOntroller.getUserByOpenID, picturesController.getPictures)

picturesRouter.get('/:picID', authController.authenticateToken, userCOntroller.getUserByOpenID, picturesController.getPicByID, picturesController.getPicture)

picturesRouter.delete('/:picID', authController.authenticateToken, userCOntroller.getUserByOpenID, picturesController.getPicByID, picturesController.deletePicture)

picturesRouter.post('/', authController.authenticateToken, userCOntroller.getUserByOpenID, picturesController.uploader.single('picture'), picturesController.postPicture)

module.exports = picturesRouter