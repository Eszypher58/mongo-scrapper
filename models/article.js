var mongoose = require("mongoose");

mongoose.connect('mongod://localhost', { useMongoClient: true});
mongoose.Promise = global.Promise;

module.exports = mongoose.model(
    'Article', 
    { 
        headline: String,
        summary: String,
        URL: String

    });


