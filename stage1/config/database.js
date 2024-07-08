const Sequelize = require('sequelize');

//Create a Sequelize instance
 const sequelize = new Sequelize({
     database: "nexus_sequelize_db",
     username: "root",
     password: "pass",
     host: "127.0.0.1",
     dialect: "mysql"
 });

// Test the database connection
sequelize
.authenticate()
.then(() => {
    console.log("Connection to the database has been established successfully.");
})
.catch(err => {
    console.error("Unable to connect to the database:", err);
});
module.exports = sequelize;