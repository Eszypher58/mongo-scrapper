//var cheerio = require("cheerio");
//var request = require("request");
var express = require("express");
//var mongojs = require("mongojs");
var mongoose = require("mongoose");
var db = require("./../models");

var router = express.Router();

router.post("/save/:id", function(req, res){

    console.log("hit /save/ with post");

    var id = req.params.id;

    console.log(id);

    //var objID = mongoose.Types.ObjectId(id);

    db.Article.findByIdAndUpdate(id, { $set: {saved: true}}, function(err, data){

        res.redirect(req.get('referer'));

    })

});

router.post("/remove/:id", function(req, res){
    
        console.log("hit /remove/ with post");
    
        var id = req.params.id;
    
        console.log(id);
    
        //var objID = mongoose.Types.ObjectId(id);
    
        db.Article.findByIdAndUpdate(id, { $set: {saved: false}}, function(err, data){
    
            res.redirect(req.get('referer'));
    
        })
    
});

router.get("/save", function(req, res){
    
        console.log("hit /save with get");
    
        db.Article.find({ saved: true}, function(err, data){
    
            res.render("save",{data: data});
    
        })
    
    })

module.exports = router;