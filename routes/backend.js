
var express = require('express');
var app = express();
const passport = require('passport');
var cookieParser = require('cookie-parser');
const LocalStrategy = require('passport-local').Strategy;

var session = require("express-session");
var bodyParser = require("body-parser");

const bcrypt = require('bcrypt-nodejs');
const saltRounds = 10;
app.use(cookieParser('abcdefg'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

var mysql = require('mysql');
var User = require('../model/user.js');
var Item = require('../model/item.js');
var ShoppingList = require('../model/shopping_list.js');

passport.use('local', new LocalStrategy(
    {
        usernameField : 'name',
        passwordField : 'password'
    },
    function(username, password, done) {
        User.findAll({where: {
                name: username
            }}).then(user => {
            let isPasswordValid = bcrypt.compareSync(password, user[0].dataValues.password);
            if (isPasswordValid) {
                return done(null, user);
            } else {
                console.log("password not valid")
            }
        });
    }
));




// enble cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header( "Access-Control-Allow-Credentials", true);
    next();
});

passport.serializeUser(function(user, done) {
    console.log('serialize: ' + user[0].dataValues.id)
    done(null, user[0].dataValues.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id).then(function(user) {
        done(null, user);
    }).catch(function(err) {
        if (err) {
            throw err;
        }
    });
});

const connectionDB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'demo',
});
connectionDB.connect();


app.get('*', function(req, res,next){
    res.locals.user = req.user || null;
    next();
})
app.post('*', function(req, res,next){
    res.locals.user = req.user || null;
    next();
})

app.get("/api/getLists", (req, res, next) => {
    if (req.isAuthenticated()) {
        ShoppingList.findAll({where: {
                user_id: req.user.dataValues.id
            }}).then(lists => {
            console.log(req.user.name + " current user")
            res.send(lists)
        });
    } else {
        res.send([])
    }
});

app.post("/api/getItems", (req, res, next) => {
    Item.findAll({where: {
        shopping_list_id: req.body.id
        }}).then(items => {
        res.send(items)
    });
});

app.post("/api/saveList", (req, res, next) => {
    let newList = {
        created_at: new Date().toLocaleString(),
    }

    if (req.isAuthenticated()) {
        ShoppingList.create({ created_at: newList.created_at, user_id: req.user.dataValues.id}).then(createdList => {
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
    }
});


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

app.put("/api/checkItem", (req, res, next) => {

    Item.update({
        state: req.body.state
    }, {
        where: { id: req.body.id },
    }).then()

});


app.delete("/api/deleteItem", (req, res, next) => {

    Item.destroy({
        where: {
            id: req.body.id
        }
    })
    res.send(req.body)

});

app.delete("/api/deleteList", (req, res, next) => {

    ShoppingList.destroy({
        where: {
            id: req.body.id
        }
    })
    res.send(req.body)

});

app.post("/api/updateList", (req, res, next) => {

    req.body.items.forEach(function (item) {
        Item.update({
            shopping_list_id: req.body.shoppingList.id,
        }, {
            where: { id: item.id },
        })
            .then(function (result) {
                console.log(result);
            })
    })
    res.send(req.body.shoppingList)

});

//auth
app.post("/api/register", (req, res, next) => {
    let hash = bcrypt.hashSync(req.body.password);
    let newUser = {
        name: req.body.name,
        password: hash
    };
    return User.create({ name: newUser.name, password: newUser.password }).then(task => {
        res.send(task);
    });

});





app.post('/api/loginUser', function(req, res, next) {
    passport.authenticate('local', {session: true},function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
        });
        return res.send(user);
    })(req, res, next);
});


app.get('/api/logoutUser', function(req, res){
    req.logout();
    res.send([]);
});


module.exports = app;
