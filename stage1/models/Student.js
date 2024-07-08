// models/Student.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// const Student = sequelize.define(
//     "Student",
//     {
//         name: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         }
//     }
// );

const Student = sequelize.define(
    "Student",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
    paranoid: true // Enable soft delete
    }
);

module.exports = Student;