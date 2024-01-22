const express = require('express')
const albumsController = require('../controllers/albums.controller')


const albumsRouter = express.Router({mergeParams: true})
albumsRouter.get('/', albumsController.getAlbums)
albumsRouter.post('/', albumsController.createAlbums)
albumsRouter.get('/:albumID', albumsController.getAlbum)


module.exports = albumsRouter