var mongoose = require("mongoose");

//mongoose.connect('mongod://localhost/articleTest');
//mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({

    title: {

        type: String,

    },
    date: {

        type: String,

    },
    summary: {

        type: String,

    },
    img: {

        type: String,

    },
    url: {

        type: String,

    },
    saved: {

        type: Boolean,

    },

    comment: [{

        type: Schema.Types.ObjectId,
        ref: 'Comments'

    }]


});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
