const express = require('express')
const picturesController = require('../controllers/pictures.controller')

const picturesRouter = express.Router({mergeParams: true});

picturesRouter.get('/', picturesController.getPictures)

// picturesRouter.get('/:picID', authController.authenticateToken, userCOntroller.getUserByOpenID, picturesController.getPicByID, picturesController.getPicture)

// picturesRouter.delete('/:picID', authController.authenticateToken, userCOntroller.getUserByOpenID, picturesController.getPicByID, picturesController.deletePicture)

// picturesRouter.post('/', authController.authenticateToken, userCOntroller.getUserByOpenID, picturesController.uploader.single('picture'), picturesController.postPicture)

module.exports = picturesRouter