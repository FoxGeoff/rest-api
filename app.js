/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/bookModel');

const app = express();
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
bookRouter.route('/books').get((req, res) => {
  Book.find((err, books) => {
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
