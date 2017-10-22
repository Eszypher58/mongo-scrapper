var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

var port = 3000;

var app = express();

//console.log(app);

app.use(express.static("public"));

app.use(bodyParser.urlencoded( {extended: false} ));



app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", function(req, res){

    res.render("index", {});

})

app.listen(port, function(error){

    if (error) {

        return console.log(error);

    }

    console.log("listening on port: " + port);

})

