const express = require('express')
const albumsController = require('../controllers/albums.controller')
const picturesRouter = require('./pictures.route')


const albumsRouter = express.Router({mergeParams: true})

albumsRouter.use('/:albumID/pictures', picturesRouter)

albumsRouter.get('/', albumsController.getAlbums)
albumsRouter.post('/', albumsController.createAlbums)
albumsRouter.get('/:albumID', albumsController.getAlbum)
albumsRouter.delete('/:albumID', albumsController.deleteAlbum)
albumsRouter.put('/:albumID', albumsController.updateAlbum)


module.exports = albumsRouter