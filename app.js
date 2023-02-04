const express = require('express');
const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 3001;

// Task: impimenting http Get (Bookrouter)
/* http://localhost:4201/api/books */
const bookRouter = express.Router();

bookRouter.route('/books')
  .get((req, res) => {
    const response = { hello: 'This is my response!' };
    res.json(response);
  });
app.use('/api', bookRouter);
// END

app.get('/', (req, res) => {
  res.send('Hello from my first API');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`running on port ${port}`);
});
