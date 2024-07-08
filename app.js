const express = require("express");
const bcrypt = require("bcrypt");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const pool = mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, 
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

app.use(express.json());

// Registration
app.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        pool.query(query, [username, email, hashedPassword], (err, results) => {
            if (err) {
                throw err;
            }
            res.status(201).json({ id: results.insertId, username, email });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const query = "SELECT * FROM users WHERE email = ?";
        pool.query(query, [email], async (err, results) => {
            if (err) {
                throw err;
            }

            if (results.length === 0) {
                return res.status(400).json({ message: "Invalid Credentials" });
            }

            const user = results[0];
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                return res.status(400).json({ message: "Invalid Credentials" });
            }

            const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
                expiresIn: "1h"
            });
            res.json({ token });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Missing token" });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return res.status(401).json({ message: "Invalid token" });
    }
}

// Protected route for user information
app.get("/userinfo", verifyToken, (req, res) => {
    res.json({ user: req.user });
});

// Start server 
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});