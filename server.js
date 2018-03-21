// requires
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

// uses
// app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/*', function(req, res) {
  console.log('base url hit');
  res.sendFile(path.resolve('index.html'));
}); // end app.get for index.html

// globals
var port = process.env.PORT || 4001;

// spin up server
app.listen(port, function(){
  console.log('server up on:', port);
}); // end spin up server
