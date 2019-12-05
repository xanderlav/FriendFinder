// Declaring global variables
var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var PORT = process.env.PORT || 7000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use('/static', express.static(path.join(__dirname, 'app/public')));

require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

// The below code effectively "starts" our server
app.listen(PORT, function() {
  console.log(`Friend-Finder App listening on PORT: ${PORT}`);
});