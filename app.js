const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

var items =["Buy Food","Cook Food","Eat Food"];
var worklists = [];

app.get("/",function(req, res){
    var today = new Date();
    var options = {
        weekday: "long",
        day : "numeric",
        month: "long"
    };
    var day = today.toLocaleDateString("en-US",options);
    res.render("list",{
        listTitle:day,
        newItem:items,
        ItemsLength: items.length
    });
})

app.post("/",function(req, res){
    var item = req.body.newItem;
    if(req.body.list === "Work"){
        worklists.push(item);
        res.redirect("/work")
    }else{
    items.push(item);
    res.redirect("/");
    }
})


app.get("/work",function(req, res){
    res.render("list", {
        listTitle: "Work List",
        newItem:worklists,
        ItemsLength: worklists.length
    });
})

app.listen(process.env.PORT || 3000)