//jshint esversion : 6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/getDate.js");
const mongoose = require("mongoose");
const app = express();
            
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
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

app.post('/', function (req, res) {

    let item = req.body.task;
    Item.insertMany({name : item});
    res.redirect('/');
});

app.post("/delete", function(req, res){
    
    let chkID = req.body.checkID;
    chkID = chkID.trim();

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

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
    console.log("SERVER IS RUNNING ON " + port + " PORT.");
});
