const mongoose = require('mongoose');

const { Schema } = mongoose;

const book = new Schema({
  title: { type: String },
  author: { type: String },
  genre: { type: String },
  read: { type: Boolean, default: fasle },
});

module.exports = mongoose.model('Book,', bookModel);
