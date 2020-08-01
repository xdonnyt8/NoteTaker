var express = require("express");
var path = require("path");
var db = require("./db/db.json")
var bodyParser = require('body-parser');


var app = express();

var PORT = process.env.PORT || 6969;

var rootPath = {root: __dirname + "/public"};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));




app.get("/notes", function (req, res) {
    res.sendFile("/notes.html", rootPath);
});

require("./api")(app);

app.get("/*", function (req, res) {
    res.sendFile("/index.html", rootPath);
});




app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});

