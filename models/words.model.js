const mongoose = require('mongoose')

const wordSchema = new mongoose.Schema({
    content: { type: String, required: true }})

module.exports = mongoose.model('Word', wordSchema)