const User = require("../models/users.model");
const mongoose = require("mongoose");
const getUserByID = require("./users.controller").getUserByID;
const uuid = require("uuid");
const path = require("path");
const { PicGo } = require("picgo");
const picgo = new PicGo("./config.json");
const fsUtils = require("../utils/utils");
const sd = require("silly-datetime");
const picturesService = require("../services/pictures.service");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    req.filePath = "C:/Users/zgx/Desktop/github/catprint-backend/images";
    cb(null, req.filePath);
  },
  filename: (req, file, cb) => {
    const fileName =
      req.wxUser.openID + "-" + Date.now() + path.extname(file.originalname);
    console.log(fileName);
    req.fileName = fileName;
    cb(null, fileName);
  },
});
const uploader = multer({ storage: storage });

async function getPictures(req, res) {
  try {
    const user = await User.findOne({ openID: req.params.openID });
    const album = user[req.body.type].find(
      (album) => album.id === req.params.albumID
    );
    res.json(album.images);
  } catch (e) {
    console.log("Get pictures failed");
    res.status(500).json({ message: e.message });
  }
}

async function postPicture(req, res) {
  // try {
  //     const fullFilePath = req.filePath + '/' + req.fileName
  //     const picgoRes = await picgo.upload([fullFilePath])
  //     console.log(`Upload picture: ${picgoRes[0].imgUrl} via PicGo successfully.`)

  //     const pic = {
  //         id: uuid.v1(),
  //         url: picgoRes[0].imgUrl,
  //         width: picgoRes[0].width,
  //         height: picgoRes[0].height,
  //         timeStamp: sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
  //         description: 'This is a temp description'
  //     }

  //     res.user.pictures.push(pic)
  //     await res.user.save()
  //     console.log(`Save picture ${pic.id} to database successfully`)

  //     const deletion = await fsUtils.removeFile(fullFilePath)
  //     console.log(`delete local file: ${deletion} successfully`)

  //     res.status(201).json(pic)
  // } catch (e) {
  //     res.status(500).json({ message: e.message })
  // }
  try {
    console.log('called');
    const imageId = uuid.v1();
    const image = {
      id: imageId,
      title: "8月",
      subTitle: undefined,
      location: undefined,
      imageUrl: undefined,
      description: undefined,
    };

    console.log(req.params.openID)
    console.log(req.params.albumID)
    console.log(req.body)

    const updatedUser = await User.findOneAndUpdate(
      {
        openID: req.params.openID,
        [`${req.body.type}.id`]: req.params.albumID,
      },
      { $push: { [`${req.body.type}.$.images`]: image } },
      { new: true }
    );
    if (!updatedUser) {
      res.status(404).json("未找到符合条件的item");
    } else {
      res.json({id: imageId});
    }
  } catch (e) {
    console.log("Post pictures failed");
    res.status(500).json({ message: e.message });
  }
}

async function getPicture(req, res) {
  try {
    const image = await picturesService.getImageFromAlbum(
      req.params.openID,
      req.params.albumID,
      req.params.picID,
      req.body.type
    );
    res.json(image);
  } catch (e) {
    res.json({ message: e.message });
  }
}

async function deletePicture(req, res) {
  try {
    const updatedUser = await User.findOneAndUpdate(
      {
        openID: req.params.openID,
        [`${req.body.type}.id`]: req.params.albumID,
      },
      { $pull: { [`${req.body.type}.$.images`]: { id: req.params.picID } } },
      { new: true }
    );
    if (!updatedUser) {
      res.status(404).json("未找到符合条件的item");
    }
    res.json(updatedUser);
  } catch (e) {
    console.log("Delete picture failed");
    res.status(500).json({ message: e.message });
  }
}

module.exports = {
  getPictures: getPictures,
  postPicture: postPicture,
  getPicture: getPicture,
  deletePicture: deletePicture,
  uploader: uploader,
};
