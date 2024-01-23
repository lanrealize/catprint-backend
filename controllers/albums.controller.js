const User = require("../models/users.model");
const uuid = require("uuid");

async function getAlbums(req, res) {
  try {
    const user = await User.findOne({ openID: req.params.openID });
    res.json(user[req.body.type]);
  } catch (e) {
    console.log("Get albums failed");
    res.status(500).json({ message: e.message });
  }
}

async function createAlbums(req, res) {
  try {
    const album = {
      id: uuid.v1(),
      title: "8月",
      subTitle: "16日·广州",
      description: "我开始没有了期待，但如果你来，我一定会喜笑颜开。",
      Images: [],
      mainImage: undefined,
      subImages: undefined,
    };

    const updatedUser = await User.findOneAndUpdate(
      { openID: req.params.openID },
      { $push: { [`${req.body.type}`]: album } },
      { new: true }
    );
    if (!updatedUser) {
      res.status(404).json("未找到符合条件的item");
    }
    res.json(updatedUser);
  } catch (e) {
    console.log("Create album failed");
    res.status(500).json({ message: e.message });
  }
}

async function getAlbum(req, res) {
  try {
    const user = await User.findOne({ openID: req.params.openID });
    const album = user[`${req.body.type}`].find(
      (album) => album.id === req.params.albumID
    );
    res.json(album);
  } catch (e) {
    console.log("Get album failed");
    res.status(500).json({ message: e.message });
  }
}

async function deleteAlbum(req, res) {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { openID: req.params.openID },
      { $pull: { [`${req.body.type}`]: { id: req.params.albumID } } },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json("未找到符合条件的item");
    }

    res.json(updatedUser);
  } catch (e) {
    console.log("Delete album failed");
    res.status(500).json({ message: e.message });
  }
}

async function updateAlbum(req, res) {
    try {
        const album = {
            id: req.params.albumID,
            title: req.body.title,
            subTitle: req.body.subTitle,
            description: "我开始没有了期待，但如果你来，我一定会喜笑颜开。",
            Images: [],
            mainImage: undefined,
            subImages: undefined,
          };

        const updatedUser = await User.findOneAndUpdate(
            { openID: req.params.openID, [`${req.body.type}.id`]: req.params.albumID },
            { $set: { [`${req.body.type}.$`]: album } },
            { new: true }
          );
      
          if (!updatedUser) {
            res.status(404).json("未找到符合条件的item");
          }
      
          res.json(updatedUser);
    } catch (e) {
        console.log("Update album failed");
        res.status(500).json({ message: e.message });
    }
}

module.exports = {
  getAlbums: getAlbums,
  createAlbums: createAlbums,
  getAlbum: getAlbum,
  deleteAlbum: deleteAlbum,
  updateAlbum: updateAlbum
};
