const db = require('./db');

const Usuario = db.sequelize.define('usuario', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    createdAt: {
        type: db.Sequelize.DATE,
        allowNull: true
    },
    updatedAt: {
        type: db.Sequelize.DATE,
        allowNull: true
    }
});
module.exports = Usuario;
