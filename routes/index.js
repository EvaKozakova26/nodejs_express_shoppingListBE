var express = require('express');
var router = express.Router();
var cors = require('cors')
var app = express();

var corsOptions = {
    "origin": "http://localhost:3000",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "Access-Control-Allow-Credentials": true,
        "optionsSuccessStatus": 204
}



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header( "Access-Control-Allow-Credentials", true);
    next();
});



app.get("/api/getLists", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});


module.exports = app;
