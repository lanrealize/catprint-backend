const User = require('../models/users.model')
const uuid = require('uuid')

async function getAlbums(req, res) {
    try {
        const user = await User.findOne({openID: req.params.openID})
        switch (req.body.type) {
            case "createdAlbums":
                console.log("Albums type createdAlbums.");
                res.json(user.createdAlbums);
                break;
            case "sharedAlbums":
                console.log("Albums type sharedAlbums.");
                res.json(user.sharedAlbums);
                break;
            default:
                console.log("Albums type not specified.");
                res.status(200);
                break;
        }
    } catch (e) {
        console.log("Get albums failed")
        res.status(500).json({ message: e.message })
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
            subImages: undefined
        }

        const user = await User.findOne({openID: req.params.openID})
        switch (req.body.type) {
            case "createdAlbums":
                console.log("Albums type createdAlbums.");
                user.createdAlbums.push(album);
                await user.save();
                res.json(album);
                break;
            case "sharedAlbums":
                console.log("Albums type sharedAlbums.");
                user.sharedAlbums.push(album);
                await user.save();
                res.json(album);
                break;
            default:
                console.log("Albums type not specified.");
                res.status(200);
                break;
        }
    } catch (e) {
        console.log("Create album failed")
        res.status(500).json({ message: e.message })
    }
}

async function getAlbum(req, res) {
    try {
        const user = await User.findOne({openID: req.params.openID})
        switch (req.body.type) {
            case "createdAlbums":
                console.log("Albums type createdAlbums.");
                const createdAlbum = user.createdAlbums.find(album => album.id === req.params.albumID);
                res.json(createdAlbum);
                break;
            case "sharedAlbums":
                console.log("Albums type sharedAlbums.");
                const sharedAlbum = user.sharedAlbums.find(album => album.id === req.params.albumID);
                res.json(sharedAlbum);
                break;
            default:
                console.log("Albums type not specified.");
                res.status(200);
                break;
        }
    } catch (e) {
        console.log("Get album failed")
        res.status(500).json({ message: e.message })
    }
}

async function deleteAlbum(req, res) {
    try {
        switch (req.body.type) {
            case "createdAlbums":
                User.findOneAndUpdate(
                    { openID: req.params.openID },
                    { $pull: { 'createdAlbums': { id: req.params.albumID } } },
                    { new: true },
                    (err, updatedUser) => {
                        if (err) {
                          console.error(err);
                        } else {
                            res.json(updatedUser);
                        }
                    }
                )
                break;
            case "sharedAlbums":
                User.findOneAndUpdate(
                    { openID: req.params.openID },
                    { $pull: { 'sharedAlbums': { id: req.params.albumID } } },
                    { new: true },
                    (err, updatedUser) => {
                        if (err) {
                            console.error(err);
                        } else {
                            res.json(updatedUser);
                        }
                      }
                )
                break;
            default:
                console.log("Albums type not specified.");
                res.status(200);
                break;
        }
    } catch (e) {
        console.log("Delete album failed")
        res.status(500).json({ message: e.message })
    }
}


module.exports = {
    getAlbums: getAlbums,
    createAlbums: createAlbums,
    getAlbum: getAlbum,
    deleteAlbum: deleteAlbum
}