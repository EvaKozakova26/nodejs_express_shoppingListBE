var express = require('express');
var app = express();
var mysql = require('mysql');
var User = require('../model/user.js');
var Item = require('../model/item.js');
var ShoppingList = require('../model/shopping_list.js');


// enble cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header( "Access-Control-Allow-Credentials", true);
    next();
});

var connectionDB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'demo',
});
connectionDB.connect();


app.post("/api/newItem", (req, res, next) => {
    let newItem = {
        count: req.body.count,
        created_at: new Date().toLocaleString(),
        name: req.body.name,
        state: req.body.state
    }

    Item.create({ count: newItem.count, created_at: newItem.created_at, name: newItem.name, state: newItem.state }).then(task => {
        console.log("created item hoho " + task);
        res.send(task);
    });

});

app.post("/api/saveList", (req, res, next) => {
    let newList = {
        created_at: new Date().toLocaleString(),
    }

    ShoppingList.create({ created_at: newList.created_at}).then(createdList => {
        console.log("created  hoho " + createdList)

        req.body.forEach(function (item) {
            Item.update({
                shopping_list_id: createdList.id,
            }, {
                where: { id: item.id },
            })
                .then(function (result) {
                    console.log(result);
                })
        })

    })
});

module.exports = app;
