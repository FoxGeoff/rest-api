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
