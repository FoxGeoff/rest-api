/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');
const Book = require('./models/bookModel');

const app = express();
// cors
// app.use(cors);

/* Used to fix warning */
mongoose.set('strictQuery', false);

const db = mongoose.connect('mongodb://127.0.0.1:27017/bookAPI');

db.then(
  () => console.log('DB Connection Successful '),
  (err) => console.log(`Error in connecting to DB${err}`)
);

const bookRouter = express.Router();
const port = process.env.PORT || 3001;

/* http://localhost:4201/api/books */
bookRouter.route('/books')
  .get(cors(), (req, res) => {
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

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Hello from my first API');
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
