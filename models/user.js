const mongoose = require('mongoose')

const pictureSchema = new mongoose.Schema({
    url: { type: String, required: true },
    timeStamp: { type: String, required: true },
    description: { type: String, required: true } }, { _id : false })

const userSchema = new mongoose.Schema({
    openID: { type: String, required: true },
    pictures: [pictureSchema] }, { _id : false })

module.exports = mongoose.model('User', userSchema)

