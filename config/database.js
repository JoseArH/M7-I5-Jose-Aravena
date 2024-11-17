require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NOMBRE, process.env.DB_USUARIO, process.env.DB_CONTRASENA, {
    host: process.env.DB_HOST,
    port: process.env.DB_PUERTO,
    dialect: 'postgres',
    logging: false
});

module.exports = sequelize;
