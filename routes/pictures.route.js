const express = require('express')
const router = express.Router()
const userCOntroller = require('../controllers/users.controller')
const picturesController = require('../controllers/pictures.controller')

const picturesRouter = express.Router({mergeParams: true});

picturesRouter.get('/', userCOntroller.getUserByOpenID, picturesController.getPictures)

picturesRouter.get('/:picID', userCOntroller.getUserByOpenID, picturesController.getPicByID, picturesController.getPicture)

picturesRouter.delete('/:picID', userCOntroller.getUserByOpenID, picturesController.getPicByID, picturesController.deletePicture)

picturesRouter.post('/', userCOntroller.getUserByOpenID, picturesController.postPicture)

module.exports = picturesRouter