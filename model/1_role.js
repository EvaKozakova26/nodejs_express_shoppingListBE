const Sequelize = require('sequelize');



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
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: Sequelize.STRING,
    },
    {
        tableName: 'roles'
    });

dbConnection.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true }).then ( function () {
    dbConnection.sync ().then ( function () {
        // Do something...
    });
});

module.exports = Role;


