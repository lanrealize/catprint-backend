const mongoose = require('mongoose')

const pictureSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    subTitle: { type: String, required: false },
    location: { type: String, required: false },
    timestamp: { type: String, required: false },
    imageUrl: { type: String, required: false },
    description: { type: String, required: false }
}, { _id : false })

const albumSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: false },
    subTitle: { type: String, required: false },
    description: { type: String, required: false },
    images: {type: [pictureSchema], required: false}
}, { _id : false })

const userSchema = new mongoose.Schema({
    openID: { type: String, required: true },
    createdAlbums: { type: [albumSchema], required: true },
    sharedAlbums: { type: [albumSchema], required: true }
})

module.exports = mongoose.model('User', userSchema)

