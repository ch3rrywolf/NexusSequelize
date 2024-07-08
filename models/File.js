// models/File.js

const { DataTypes } = require("sequelize");
const sequelize = require('../config/database');

const File = sequelize.define("File", {
    filename: DataTypes.STRING,
    path: DataTypes.STRING
});

module.exports = File;