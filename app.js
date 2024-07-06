const Sequelize = require("sequelize");

//Create a Sequelize instance
const sequelize = new Sequelize({
    database: "nexus_sequelize_db",
    username: "root",
    password: "pass",
    host: "127.0.0.1",
    dialect: "mysql"
});

// Test the database connection
sequelize.authenticate().then(() => {
    console.log("Connection to the database has been established successfully.");
})

// Define a model (e.g., User)
const User = sequelize.define("customer", {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    }
})

// Synchronize the model with the database (create the table if it doesn't exist)
sequelize.sync().then(() => {
    console.log("Database synchronized.");
})
.catch(err => {
    console.error("Error synchronizing the database:", err);
});

User.create({
    firstName: "ch3rry",
    lastName: "Wolf",
    email: "ch3rrywolf111@gmail.com"
})
.then(user => {
    console.log("User created:", user.toJSON());
})
.catch(err => {
    console.error("Error creating user:", err);
});