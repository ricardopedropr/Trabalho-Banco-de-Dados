/*const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
  })
 
module.exports = {
    Sequelize:Sequelize,
    sequelize:sequelize
};*/

// models/db.js
const Sequelize = require('sequelize');

// Configurando a conexão com o banco de dados SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite' // Caminho para o arquivo do banco de dados SQLite
});

// Exportando a conexão e a biblioteca Sequelize
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
};