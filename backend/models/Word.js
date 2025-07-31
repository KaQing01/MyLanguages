const mongoose = require('mongoose'); 
 
const wordSchema = new mongoose.Schema({ 
  word: { type: String, required: true }, 
  definition: { type: String, required: true }, 
  language: { type: String, required: true }, 
  type: { type: String, required: true }, 
  isFavorite: {type: Boolean, default: false}
}); 
 
const Word = mongoose.model('Word', wordSchema); 
 
module.exports = Word;