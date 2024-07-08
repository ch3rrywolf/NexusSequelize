const express = require('express');
const morgan = require('morgan');
const createError = require("http-errors");
require('dotenv').config();
const db = require("./models/index");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.get("/", (req, res, next) => {
    res.send("Welcome to hell");
});

const authRoutes = require("./Routes/Auth.routes");
app.use("/auth", authRoutes);

app.use( async (req, res, next) => {
    /*const error = new Error("Page not Found");
    error.status = 404;
    next(error);*/
    next(createError.NotFound("Sorry! Page not Found"));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status,
            message: err.message
        }
    })
})

db.sequelize.sync().then(() => {
    console.log('Database synchronized');
    app.listen(PORT, () => {
        console.log(`Server is running at the port ${PORT}`);
    });
}).catch(error => {
    console.error('Error synchronizing the database:', error);
});