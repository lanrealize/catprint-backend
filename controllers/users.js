const Cat = require('../models/user')


async function getUserPicByID(req, res) {
    try {
        const cats = await Cat.find()
        res.json(cats)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

module.exports = {
    getUserPicByID: getUserPicByID
}