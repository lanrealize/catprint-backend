const mongoose = require('mongoose')

const pictureSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    subTitle: { type: String, required: true },
    location: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true }
}, { _id : false })

const albumSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    subTitle: { type: String, required: true },
    description: { type: String, required: true },
    Images: {type: [pictureSchema], required: true},
    mainImage: {type: pictureSchema, required: true},
    subImages: {type: [pictureSchema], required: true}
}, { _id : false })

const userSchema = new mongoose.Schema({
    openID: { type: String, required: true },
    createdAlbums: { type: [albumSchema], required: true },
    sharedAlbums: { type: [albumSchema], required: true }
})

module.exports = mongoose.model('User', userSchema)

