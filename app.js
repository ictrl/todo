//jshint esversion : 6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/getDate.js");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;

// let items = [];
// let works = [];
mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});
const itemsSchema = {
    name : String
};

const Item = mongoose.model("Item", itemsSchema); 

const Bath = new Item({
    name : "Bath"
});

const Exercise = new Item({
    name : "Exercise"
});

const Breakfast = new Item({
    name : "Breakfast"
});

const defaultItems = [Bath, Exercise, Breakfast];

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", function (req, res) { 

    let day = date.getDate();
    // let day = date.getDay();

    Item.find({}, function(err, results){ 
   if (results.length === 0){
    Item.insertMany(defaultItems, function(err){
        if(err){
            console.log(err);
        }else{
            console.log("success");
        }
        res.redirect('/');
    });
   }else{
    res.render("list", {
        titleOfList: day,
        newItems: results,
    });
   }
    });
});

// app.post('/', function (req, res) {

//     let item = req.body.task;

//     if (req.body.btn === 'Work') {
//         works.push(item);
//         res.redirect('/work');
//     } else {
//         items.push(item);
//         res.redirect('/');
//     }
// });

app.post('/', function (req, res) {

    let item = req.body.task;
    Item.insertMany({name : item});
    res.redirect('/');
});

app.post("/delete", function(req, res){
    
    const chkID = req.body.checkID;

    Item.findByIdAndRemove(chkID, function(err){
        if(err){
            console.log(err);
            res.redirect("/");            
        }else{
            console.log("deleted");
            res.redirect("/");
        }
    });
});

app.get("/work", function (req, res) {
    res.render("list", {
        titleOfList: "Work",
        newItems: works,
    });

});

app.listen(PORT, function () {
    console.log("SERVER IS RUNNING ON " + PORT + " PORT.");
});