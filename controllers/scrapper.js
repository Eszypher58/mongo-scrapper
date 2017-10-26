var cheerio = require("cheerio");
var request = require("request");
var express = require("express");
//var mongojs = require("mongojs");
var mongoose = require("mongoose");
var db = require("./../models");

// Database configuration
//var databaseUrl = "articleTest";
//var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
//var db = mongojs(databaseUrl, collections);
/*
db.on("error", function(error) {
    
    console.log("Database Error:", error);

});
*/
var router = express.Router();

router.get("/", function(req, res){

    //console.log(req.body.articleData);
/*
    db.scrapedData.find().sort({date: -1}, function(error, data){

        console.log(data);
    
                //console.log(array);
                //req.body.articleData = array;
                //res.redirect("/");
                //res.json(array);
        res.render("article",{data: data});
            
    })

    //res.render("article", {});
*/

    db.Article.find({}).then(function(data){

        console.log(data);
        res.render("article",{data: data});

    }).catch(function(err){

        console.log(err);

    })

})

router.get("/populate", function(req, res){

    console.log("hit populate");

    var array = [];
    var counter = 0;

    request("https://www.nature.com", function(error, response, html){
        
            if (error) {
        
                return console.log(error);
        
            }
        
            //console.log(response);

        
            var $ = cheerio.load(html);
        
            $("#latest-news").find("article").each(function(i, element){
        
                //console.log(element);
                //var link = $(element).children().attr("href");
                var article = $(element).children();
                var date = article.find("time").text();
                var title = article.find("h3").text();
                var summary = article.find(".mt4").text()
                var url = article.find("a").attr("href");
                var img = article.find("img").attr("src");
        
                //console.log(article.text());
        
        
                //console.log(date);
                //console.log(title);
                //console.log(summary);
                //console.log("https://www.nature.com" + url);
                //console.log("https://www.nature.com" + img);
                //console.log($(element).next().text());
        
                var item = {
        
                    title: title,
                    date: date,
                    summary: summary,
                    img: "https://www.nature.com" + img,
                    url: "https://www.nature.com" + url,
                    saved: false,
        
                }

                db.Article.findOne({title:title}).then(function(data){

                    console.log(data);

                    if (data === null) {

                        console.log("hit true: data is null");

                        db.Article.create(item).then(function(dbArticle){

                            console.log(dbArticle);
                            res.redirect("/");

                        })

                    }

                }).catch(function(err){

                    res.status(500).end();

                })
        
                //console.log(item);
                
                //array.push(item);
/*
                db.scrapedData.find(
                    {title: title},
                    function(error, data){

                        console.log("in db.scrapedData");
                        //console.log(data);

                        if (error){

                            console.log(error);

                        }
                    
                        if(data.length === 0 || !data) {

                            console.log("execute insert");
                            db.scrapedData.insert(item);
                            counter++;
                            
                        }
                    
                });
*/        
            })

            //res.end();
            //res.json(counter);
            //res.redirect("/")

            //console.log(array);
            //req.body.articleData = array;
            //res.redirect("/");
            //res.json(array);
            //res.render("article",{data: array});
        
        })



});

module.exports = router;

