const Sequelize = require("sequelize");

const sequelize = new Sequelize("rb-server-side", "postgres", "password", {
    dialect: "postgres",
    host: "localhost",
    logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user")(sequelize, Sequelize);


module.exports = db;