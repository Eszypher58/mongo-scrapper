var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");

var port = process.env.PORT || 3000;

var app = express();

var db = require("./models");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

app.use(express.static("public"));

app.use(bodyParser.urlencoded( {extended: false} ));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));




app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var scrapperRoutes = require("./controllers/scrapper.js");
var articleRoutes = require("./controllers/article_controller.js");
var noteRoutes = require("./controllers/note_controller.js");

app.use("/", scrapperRoutes);
app.use("/", articleRoutes);
app.use("/", noteRoutes);

/*
app.get("/", function(req, res){

    res.render("index", {});

})
*/

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useMongoClient: true });

app.listen(port, function(error){

    if (error) {

        return console.log(error);

    }

    console.log("listening on port: " + port);

})

