const express = require('express')
const router = express.Router()
const Cat = require('../models/user')

router.get('/', async (req, res) => {
    try {
        const cats = await Cat.find()
        res.json(cats)
    } catch (e) {
        res.status(500).json({ message: e.message})
    }
})

module.exports = router