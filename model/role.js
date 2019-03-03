const Sequelize = require('sequelize')
var ShoppingList = require('../model/shopping_list.js');



const dbConnection = new Sequelize('demo', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false //disable creating timestamps automatically
    },
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

const Role = dbConnection.define('role', {
        name: Sequelize.STRING,
    },
    {
        tableName: 'role'
    });

module.exports = Role


