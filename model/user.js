const Sequelize = require('sequelize')
var Role = require('../model/role.js');



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
    name: Sequelize.STRING,
    password: Sequelize.STRING
},
    {
        tableName: 'user'
    });
User.belongsTo(Role, {foreignKey: 'role_id'})

module.exports = User


