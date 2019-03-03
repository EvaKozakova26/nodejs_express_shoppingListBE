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

const Item = dbConnection.define('item', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        count: Sequelize.INTEGER,
        created_at: new Date().toLocaleString(),
        name: Sequelize.STRING,
        state: Sequelize.BOOLEAN
    },
    {
        tableName: 'item'
    });
Item.belongsTo(ShoppingList, {foreignKey: 'shopping_list_id'}, { onDelete: 'cascade' })

module.exports = Item


