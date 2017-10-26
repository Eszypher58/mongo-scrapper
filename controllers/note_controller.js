//var cheerio = require("cheerio");
//var request = require("request");
var express = require("express");
//var mongojs = require("mongojs");
var mongoose = require("mongoose");
var db = require("./../models");

var router = express.Router();

router.post("/note/:id", function(req, res){

    console.log("hit /note/ with post");

    var id = req.params.id;

    console.log(id);
    console.log(req.body);

    var objID = mongoose.Types.ObjectId(id);

    db.Comments.create(req.body).then(function(dbNote){

        return db.Article.findOneAndUpdate({_id: objID}, { $push: { comment: dbNote._id } }, { new: true });


    })

});

router.get("/note/:id", function(req, res){

    console.log("hit /note/ with get");
    
        var id = req.params.id;
    
        console.log(id);
        //console.log(req.body);
    
        var objID = mongoose.Types.ObjectId(id);
    

    
    db.Article.findById(id).populate("comment").then(function(data){
    
        //res.render("save", {data: data});
        console.log(data);
        res.json(data);
    
     })


});

router.delete("/note/:id", function(req, res){
    
        console.log("hit /note/ with delete");
    
        var id = req.params.id;
    
        console.log(id);
        //console.log(req.body);
    
        var objID = mongoose.Types.ObjectId(id);
    
        db.Comments.findById(id).remove(function(data){

            console.log(data);
            res.json(data);

        })
    
    });

module.exports = router;