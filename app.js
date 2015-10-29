//reuire modules
var express = require('express');
var app = express();
var ejs = require('ejs');

//variables

var root = __dirname;
var port = 3000;
//configure express

app.use(express.static(__dirname + "/public"));

//configure expres to use a views engine and establish the directotry they are stored in
app.set("views", root + "/views");
app.set("view engine", "ejs");

//make dynamic routes

app.get("/ejs_test", function ejs_testCallBack(req, res) {
 // res.send("why Hello!");
  res.render("test");
});


app.get("/someJSON", function someJSONCallback (req, res){
  res.json({
    "one": {
      "so": "cool"
    },
    "two": "supercool",
    "three": ["love", "json", "and", "javascript"]
  })
});

app.get("/beginning", function beginningCallback (req, res){
  res.send("<h1>This is just the start</h1><p><3</p>")
})
//app.post();



//start server
app.listen(port, function listenCallback() {
  console.log("express server on port" + port);
});



