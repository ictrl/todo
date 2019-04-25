//jshint esversion : 6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/getDate.js");
const app = express();

let items = [];
let works = [];

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", function (req, res) {

    let day = date.getDate();
    // let day = date.getDay();

    res.render("list", {
        titleOfList: day,
        newItems: items,
    });
});

app.post('/', function (req, res) {

    let item = req.body.task;

    if (req.body.btn === 'Work') {
        works.push(item);
        res.redirect('/work');
    } else {
        items.push(item);
        res.redirect('/');
    }
});

app.get("/work", function (req, res) {
    res.render("list", {
        titleOfList: "Work",
        newItems: works,
    });

});

app.listen(3000, function () {
    console.log("SERVER IS RUNNING ON 3000 PORT.");
});