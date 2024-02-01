const Word = require("../models/words.model");

async function getWords(req, res) {
  try {
    const words = await Word.find();
    res.json(words);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

async function postWord(req, res) {
    try {
      const word = await Word.findOne({ content: req.body.content });
      if (word) {
        res
        .status(200)
        .json({ content: req.body.content });
      } else {
        Word.create({ content: req.body.content });
        res
          .status(201)
          .json({ content: req.body.content });
      }
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }

async function getWord(req, res) {
  try {
    const randomWord = await Word.aggregate([{ $sample: { size: 1 } }]);
    res.json(randomWord);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

async function deleteWord(req, res) {
  try {
    const deletedDocument = await Word.findOneAndDelete({ content: req.body.content }, { returnDocument: 'after' });
    res
      .status(200)
      .json(deletedDocument);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}



module.exports = {
    getWords: getWords,
    postWord: postWord,
    deleteWord: deleteWord,
    getWord: getWord
};
