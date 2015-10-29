


/**
* Express App
* @author Jason Hargrove <jason@objas.com>
**/


/** Require modules **/

var express = require("express");

var jade = require("jade");
var bodyParser = require('body-parser');
var fs = require('fs')
/** Initialize Express app object **/

var app = express();

/** Variables **/

// Server will be browsed at http://localhost:3000

var root = __dirname
  , port = 3000;

/** Configure Express app **/

app.use( express.static( root + "/public" ));

app.set( "views", root + "/views" );

app.set( "view engine", "jade" );

/** Add middleware that will look for data when requests are made **/

//create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/** Create some Express routes **/

app.get( "/settings/profile", function editProfileCb ( req, res ) {
//when you render templates you can pass variables as options
  res.render( "profile-form" );

});


app.post( "/settings/profile", urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  console.log( "POST RECEIVED!" );
  //fs write file is a core node method
  //** asynchronously writes data to a file
  //
  fs.writeFile("data.json", JSON.stringify(req.body, null, 2), function writeCb(err) {
    
    if (err) {
      res.json({err: true, msg: err.msg});
    }
    console.log("post data saved", req.body);
    res.redirect("/profile");

  });//end of cb
});//end of post

app.get("/profile", function profileCb (req, res) {

  fs.readFile( "data.json", function readCallback ( err, data ) {
    // Error handling
    if ( err ) {
      res.json({ err: true, msg: err.msg });
      return console.log( err )
    }
    // Convert JSON string to JavaScript object
    var profileData = JSON.parse( data );
    console.log( "Data read from file: ", profileData );

    // Render Jade view, and send data as options
    res.render( "profile", {
      firstname: profileData.firstNameField,
      lastname: profileData.lastNameField,
      bio: profileData.bioField
    });

  });//end of cb
});//end of get





/** Start server on port 3000 **/

// The callback fires after the server is started

app.listen( port, function listenCallback () {
  console.log( "Express server is listening on port " + port );
  console.log( "To test, browse to http://localhost:" + port );
});






























