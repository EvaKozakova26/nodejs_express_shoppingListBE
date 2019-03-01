var express = require('express');
var app = express();
var mysql = require('mysql');

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



app.get("/api/getLists", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});

app.post("/api/newItem", (req, res, next) => {
    let newItem = {
        count: req.body.count,
        created_At: new Date().toLocaleString(),
        name: req.body.name,
        state: req.body.state
    }
    var query = connectionDB.query('INSERT INTO item SET ?', newItem, function(err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });

});



module.exports = app;
