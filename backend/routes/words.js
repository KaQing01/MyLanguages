const express = require('express');
const Word = require('../models/Word');
const router = express.Router();

// GET all words or filter by word, language, type, or favorite
router.get('/', async (req, res) => {
  try {
    const { word, language, type, isFavorite } = req.query;
    const filter = {};

    if (word) filter.word = { $regex: word, $options: 'i' };
    if (language) filter.language = language;
    if (type) filter.type = type;
    if (isFavorite !== undefined) filter.isFavorite = isFavorite === 'true';

    const words = await Word.find(filter);
    res.json(words);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a specific word by ID
router.get('/:id', async (req, res) => {
  try {
    const word = await Word.findById(req.params.id);
    if (!word) {
      return res.status(404).json({ message: 'No word with the given ID!' });
    }
    res.json(word);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message });
  }
});

// CREATE a new word
router.post('/', async (req, res) => {
  const word = new Word({
    word: req.body.word,
    definition: req.body.definition,
    language: req.body.language,
    type: req.body.type,
    isFavorite: req.body.isFavorite || false,
  });

  try {
    const newWord = await word.save();
    res.status(201).json(newWord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE an existing word
router.patch('/:id', async (req, res) => {
  try {
    const updatedWord = await Word.findByIdAndUpdate(
      req.params.id,
      {
        word: req.body.word,
        definition: req.body.definition,
        language: req.body.language,
        type: req.body.type,
        isFavorite: req.body.isFavorite,
      },
      { new: true }
    );

    if (!updatedWord) {
      return res.status(404).json({ message: 'Word not found' });
    }

    res.json(updatedWord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a word
router.delete('/:id', async (req, res) => {
  try {
    await Word.findByIdAndDelete(req.params.id);
    res.json({ message: 'Word deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
