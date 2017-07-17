// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8000;

// define the path to use style sheets & images - public folder
app.use(express.static(path.join(__dirname, '/public')));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Form Submission (DATA)
// =============================================================
var characters = [{
  routeName: "chris",
  name: "Chris",
  last: "Allen",
  email: "test@test.com",
  zip: 78741,
  driversLicense: "yes"
}, {
  routeName: "joe",
  name: "Joe",
  last: "Smith",
  email: "yahoo@yahoo.com",
  zip: 54321,
  driversLicense: "no"
}, {
  routeName: "sarah",
  name: "Sarah",
  last: "Parker",
  email: "sarah@gmail.com",
  zip: 11111,
  driversLicense: "yes"
}];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Form Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Get all form submissions
app.get("/all", function(req, res) {
  res.json(characters);
});
// Get all new submissions
app.get("/api/new", function(req, res) {
  res.json(newcharacter);
});

// Search for Specific Submission (or all submissions) - provides JSON
app.get("/api/:characters?", function(req, res) {
  var chosen = req.params.characters;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < characters.length; i++) {
      if (chosen === characters[i].routeName) {
        return res.json(characters[i]);
      }
    }
    return res.json(false);
  }
  return res.json(characters);
});

// Create New Characters - takes in JSON input
app.post("/api/new", function(req, res) {
  var newcharacter = req.body;
  newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();

  console.log(newcharacter);

  characters.push(newcharacter);

  res.json(newcharacter);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
