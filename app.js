//reuire modules
var express = require('express');
var app = express();

//variables

var root = __dirname;
var port = 3000;
//configure express

app.use(express.static(__dirname + "/public"));

//start server
app.listen(port, function listenCallback() {
  console.log("express server on port" + port);
});
