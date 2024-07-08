const { Sequelize } = require('sequelize');

// Create a Sequelize instance
const sequelize = new Sequelize({
    database: "nexus_sequelize_db",
    username: "root",
    password: "pass",
    host: "127.0.0.1",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

module.exports = sequelize;

// Example of a graceful shutdown handler
process.on('SIGINT', () => {
    sequelize.close()
        .then(() => {
            console.log("Connection pool closed.");
            process.exit(0);
        })
        .catch((err) => {
            console.error("Error closing connection pool:", err);
            process.exit(1);
        });
});
