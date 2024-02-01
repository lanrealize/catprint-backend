const express = require('express')
const router = express.Router()
const wordsController = require('../controllers/words.controller')

router.get('/', wordsController.getWords)
router.post('/', wordsController.postWord)
router.delete('/', wordsController.deleteWord)
router.get('/random', wordsController.getWord)

module.exports = router