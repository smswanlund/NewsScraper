var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var Article = require("./models/Article");
var Note = require("./models/Note");
var Save = require("./models/Save");

var htmlRouter = require("./routes/html.js");
var articleRouter = require("./routes/scrape.js");

var request = require("request");
var cheerio = require("cheerio");

mongoose.Promise = Promise;

var port = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use("/", htmlRouter);
app.use("/", articleRouter);

var URI = process.env.MONGODB_URI || 'mongodb://smswanlund:ewolf116@ds253388.mlab.com:53388/heroku_3dv38w9r'; 
mongoose.connect(URI);
var db = mongoose.connection;

db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

db.once("open", function() {
    console.log("Mongoose connection successful.");
});

app.listen(port, function() {
    console.log("App running on port 3000!");
});