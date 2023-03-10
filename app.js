/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');
const Book = require('./models/bookModel');

const app = express();

app.use(cors());

/* Used to fix warning */
mongoose.set('strictQuery', false);

mongoose.connect('mongodb://127.0.0.1:27017/bookAPI');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Connected to MongoDb');
});

const bookRouter = express.Router();
const port = process.env.PORT || 3001;

/* http://localhost:4200/api/books */
/* http://localhost:4200/api/books?genre=Fantasy */
/* http://localhost:4200/api/books?genre=Historical%20Fiction */
bookRouter.route('/books').get((req, res) => {
  // const { query } = req;
  // FIX returns all result if querystring fails
  const query = {};
  if (req.query.genre) {
    query.genre = req.query.genre;
  }
  Book.find(query, (err, books) => {
    if (err) {
      return res.send(err);
    }
    return res.json(books);
  });
});

/* Get a single book by id */
/* http://localhost:4200/api/books/63f57f5b5b1d562c5e3b49e0 */
bookRouter.route('/books/:id').get((req, res) => {
  Book.findById(req.params.id, (err, book) => {
    if (err) {
      return res.send(err);
    }
    return res.json(book);
  });
});

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Hello from my first API');
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
