const express = require('express')
const router = express.Router()
const userCOntroller = require('../controllers/users.controller')
const picturesController = require('../controllers/pictures.controller')

const picturesRouter = express.Router({mergeParams: true});

picturesRouter.get('/', userCOntroller.getUserByID, picturesController.getPictures)

picturesRouter.get('/:picID', userCOntroller.getUserByID, picturesController.getPicByID, picturesController.getPicture)

picturesRouter.delete('/:picID', userCOntroller.getUserByID, picturesController.getPicByID, picturesController.deletePicture)

picturesRouter.post('/', userCOntroller.getUserByID, picturesController.postPicture)

module.exports = picturesRouter