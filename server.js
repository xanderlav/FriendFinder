// Declaring global variables
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();

var PORT = process.env.PORT || 7000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use('/static', express.static(path.join(__dirname, 'app/public')))

// ================================================================================
require("./app/routing/api-routes.js")(app);
require("./app/routing/html-routes.js")(app);

// The below code effectively "starts" our server
app.listen(PORT, function() {
  console.log(`Friend-Finder App listening on PORT: ${PORT}`);
});