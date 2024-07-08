const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const { Users } = require('../models');

// Registration API
// POST /register endpoint
router.post("/register", async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) throw createError.BadRequest('Username, email, and password are required.');

        if (!Users) throw createError.InternalServerError('Users model is not defined.');

        const existingUser = await Users.findOne({ where: { email } });
        if (existingUser) throw createError.Conflict(`${email} is already registered.`);

        const user = await Users.create({
            username: username,
            email: email,
            password: password,
        }).then(user => {
            res.status(200).send(user);
        });

    } catch (error) {
        next(error); 
    }
});

module.exports = router;