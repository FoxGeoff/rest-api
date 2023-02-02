var express = require('express');

var app = express();

var port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('Hello from my first API');

});

app.listen(port, ()=>{
    console.log("running on port " + port);
});
