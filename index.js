var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var ejsLayouts = require("express-ejs-layouts");
var peopleCtrl = require("./controllers/people");

var app = express();


app.set('view engine', 'ejs');

app.use(ejsLayouts);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
// Mongoose stuff
app.use("/people", peopleCtrl);


mongoose.connect('mongodb://localhost/jstc');


app.get("/", function(req, res) {
res.render("index", {title: "Favorite Foods", foods: ["sandwich", "corn dog"]})
});

app.get("/animals", function(req, res) {
res.render("animals", {title: "Favorite Animals", animals: ["sand crab", "corny joke dog"]}) });

app.listen(3000);