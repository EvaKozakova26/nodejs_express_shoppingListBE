const Sequelize = require('sequelize');
const User = require('../model/2_user.js');


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
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        created_at: Sequelize.DATE
    },
    {
        tableName: 'shopping_lists'
    });
ShoppingList.belongsTo(User, {foreignKey: 'user_id'}, { onDelete: 'CASCADE' });

dbConnection.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true }).then ( function () {
    dbConnection.sync ().then ( function () {
        // Do something...
    });
});


module.exports = ShoppingList;


