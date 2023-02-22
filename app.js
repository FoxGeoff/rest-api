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

mongoose.connect('mongodb://127.0.0.1:27017/bookAPI');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Connected to MongoDb');
  /*
  app.listen(app.get('port'), () => {
    console.log(`API Server Listening on port ${app.get('port')}!`);
  });
  */
});

const bookRouter = express.Router();
const port = process.env.PORT || 3001;

/* http://localhost:4200/api/books */
bookRouter.route('/books').get(cors(), (req, res) => {
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
