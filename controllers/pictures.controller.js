const User = require('../models/users.model')
const mongoose = require('mongoose')
const getUserByID = require('./users.controller').getUserByID
const uuid = require('uuid')

async function getPictures(req, res) {
    res.json(res.user.pictures)
}

async function postPicture(req, res) {

    console.log(res.user[0])

    try {
        res.user.pictures.push({
            id: uuid.v1(),
            url: req.body.url,
            timeStamp: req.body.timeStamp,
            description: req.body.description
        })
        
        await res.user.save()

        res.status(201).json(res.user.pictures)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
    
}

async function getPicture(req, res) {
    res.status(200).json(res.pic)
}

async function deletePicture(req, res) {

    try {
        const idx = res.user.pictures.indexOf(res.pic)
        res.user.pictures.splice(idx, 1);
        await res.user.save(res.pic)
        res.status(200).json()
    } catch (e) {
        res.status(500).json({ message: e.message })
    }

}

async function getPicByID(req, res, next) {

    let pic

    try {
        const pictures = res.user.pictures
        pic = pictures.find(item => item.id === req.params.picID)
        if (!pic) return res.status(404).json({message: `Picture with id ${req.params.picID} not found`})
    } catch (e) {
        res.status(500).json({ message: e.message })
    }

    res.pic = pic
    next()
}



module.exports = {
    getPictures: getPictures,
    postPicture: postPicture,
    getPicture: getPicture,
    deletePicture: deletePicture,
    getPicByID: getPicByID
}
