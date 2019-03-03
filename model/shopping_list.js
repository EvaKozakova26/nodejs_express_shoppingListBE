const Sequelize = require('sequelize')


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

const ShoppingList = dbConnection.define('shopping_list', {
        created_at: new Date(),
    },
    {
        tableName: 'shopping_list'
    });

module.exports = ShoppingList


