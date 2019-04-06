const Sequelize = require('sequelize');
var Role = require('../model/1_role.js');



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

const User = dbConnection.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: Sequelize.STRING,
        password: Sequelize.STRING
    },
    {
        tableName: 'users'
    });
User.belongsTo(Role, {foreignKey: 'role_id'});

dbConnection.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true }).then ( function () {
    dbConnection.sync ().then ( function () {
        // Do something...
    });
});
module.exports = User;


