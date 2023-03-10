# Project: RESTfull Web Services with Node.js and Express

## Introduction

1. Video Ref: <https://app.pluralsight.com/course-player?clipId=bd268f58-17a1-4dc5-937c-8221c2949ad4>

## Module 2: What is REST

### Kanban Task: Setup Your Enviroment

Use the bash shell for running the commands

1. Node version, Run(bash): 'node --version' => 'v16.15.0.'
2. Video Ref: <https://app.pluralsight.com/course-player?clipId=bd268f58-17a1-4dc5-937c-8221c2949ad4>
3. Run: 'npm init' => Setup for package.json file
4. Run: 'npm i express' (now no longer required --save) => package.json now has "express": "^4.18.2"
5. '^' means any version 4.x.x
6. Add file app.js

```javascript
/* file app.js */
const express = require('express');

const app = express();

const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Hello from my first API');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`running on port ${port}`);
});
```

## Kanban Task: Setting up some tools (video)

1. Run: 'npm i eslint -D'
2. Add to package.json

```json
"scripts": {
    "lint":"lint .", 
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  ...
  ```

1. Run: 'npm run lint -- --init'

### Task: Add nodemon

1. Run 'npm i nodemon'
2. Add to packaage.json scripts "start": "nodemon app.js"

```json
/* packeage.json */
...
},
  "nodemonConfig": {
    "restartable": "rs",
    "ignore": [
      "node_modules/**/node_modules"
    ],
    "delay": "2500",
    "env": {
      "NODE_ENV": "development",
      "port": 4201
    }
  }
  ...
  ```

## Module 3: Getting Data

### Task: impimenting http Get (Bookrouter)

```Javascript
/* Task: implimenting http Get (Bookrouter) */
const bookRouter = express.Router();

bookRouter.route('/books')
  .get((req, res) => {
    const response = { hello: 'This is my response!' };
    res.json(response);
  });
app.use('/api', bookRouter);
// END
```

## Kanban Task: Video Wiring up MongoDB

### Task: Import Books into Database

1. Create data file 'booksJson.js'

### FIX: Work around to upload books data

1. We will do this manually because fails @ video <https://app.pluralsight.com/course-player?clipId=9714f0a3-495d-4244-902c-5728ed011df1>
2. Time in video @ 2:40/10:33 continue after data is loaded into Db BookAPI/BOOKS collection

### Task: pull data fro MongoDB (2:35/10:33)

1. Run 'npm i mongoose'
2. Update app.js code
3. Add bookModel.js

```Javascript
const mongoose = require('mongoose');

const { Schema } = mongoose;

const book = new Schema({
  title: { type: String },
  author: { type: String },
  genre: { type: String },
  read: { type: Boolean, default: fasle },
});

module.exports = mongoose.model('Book,', bookModel);
```

### Task: GET with query string

1. video ref: <https://app.pluralsight.com/course-player?clipId=30f00928-05f6-4f89-8f8d-eb1b97ae9ffe>
2. Video @1:04/3:09
3. FIX returns all result if querystring fails

```Javascript
 // FIX returns all result if querystring fails
  const query = {};
  if (req.query.genre) {
    query.genre = req.query.genre;
  }
```

### Task: Getting a single item

1. video ref <https://app.pluralsight.com/course-player?clipId=386c084b-8589-4288-9d28-7140954bd401>

```javascript
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
```

## Task: Posting Data

1. video ref <https://app.pluralsight.com/course-player?clipId=ac8ab997-a18a-40e3-9758-c194d8d8b1bc>
