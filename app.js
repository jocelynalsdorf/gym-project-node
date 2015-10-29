


/**
* Express App
* @author Jason Hargrove <jason@objas.com>
**/


/** Require modules **/

var express = require("express");

var jade = require("jade");
var bodyParser = require('body-parser');
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

  res.render( "profile-form" );

});

app.post( "/settings/profile", urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  console.log( "POST RECEIVED!" );

  // report post data to console

  console.log( req.body );

  // reply to browser that something has happened and close the loop

  return res.json({
    "firstName": req.body.firstNameField,
    "lastName": req.body.lastNameField,
    "bio": req.body.bioField
  })

});


/** Start server on port 3000 **/

// Use a callback function to report status to the console

// The callback fires after the server is started

app.listen( port, function listenCallback () {
  console.log( "Express server is listening on port " + port );
  console.log( "To test, browse to http://localhost:" + port );
});






























