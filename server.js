var express = require("express");
var bodyParser = require("body-parser");
var express = require("express-handlebars");

var app = express();

app.use(bodyParser.urlencoded( {extended: false} ));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

