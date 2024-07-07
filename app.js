const { User, Post } = require("./models");
const sequelize = require("./config/database");

// Synchronize the model with the database (create the table if it doesn't exist)
 sequelize
 .sync()
 .then(() => {
     console.log("All tables synchronized.");
 })
 .catch(err => {
     console.error("Error synchronizing tables:", err);
 });
