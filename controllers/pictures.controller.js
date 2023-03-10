const User = require('../models/users.model')
const mongoose = require('mongoose')
const getUserByID = require('./users.controller').getUserByID
const uuid = require('uuid')
const path = require('path')
const { PicGo } = require('picgo')
const picgo = new PicGo('./config.json')
const fsUtils = require('../utils/utils')
const sd = require('silly-datetime')


const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        req.filePath = 'C:/Users/zgx/Desktop/github/catprint-backend/images'
        cb(null, req.filePath)
    },
    filename: (req, file, cb) => {
        const fileName = req.wxUser.openID + '-' + Date.now() + path.extname(file.originalname)
        console.log(fileName)
        req.fileName = fileName
        cb(null, fileName)
    }
})
const uploader = multer({storage: storage})

async function getPictures(req, res) {
    res.json(res.user.pictures)
}

// async function postPicture(req, res) {

//     try {

//         const pic = {
//             id: uuid.v1(),
//             url: req.body.url,
//             timeStamp: req.body.timeStamp,
//             description: req.body.description
//         }

//         res.user.pictures.push(pic)
        
//         await res.user.save()

//         console.log(`Created picture ${pic.id} successfully`)

//         res.status(201).json(pic)
//     } catch (e) {
//         res.status(500).json({ message: e.message })
//     }
    
// }

async function postPicture(req, res) {
    try {
        const fullFilePath = req.filePath + '/' + req.fileName
        const picgoRes = await picgo.upload([fullFilePath])
        console.log(`Upload picture: ${picgoRes[0].imgUrl} via PicGo successfully.`) 

        const pic = {
            id: uuid.v1(),
            url: picgoRes[0].imgUrl,
            width: picgoRes[0].width,
            height: picgoRes[0].height,
            timeStamp: sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
            description: 'This is a temp description'
        }

        res.user.pictures.push(pic)
        await res.user.save()
        console.log(`Save picture ${pic.id} to database successfully`)

        const deletion = await fsUtils.removeFile(fullFilePath)
        console.log(`delete local file: ${deletion} successfully`)

        res.status(201).json(pic)
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
        res.status(204).json()
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
    getPicByID: getPicByID,
    uploader: uploader
}
