const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const { Users } = require("../models");

// Registration API
router.post("/register", async(req, res, next) => {
    try {
        const { username, email, password } = req.body;
        if(!username || !email || !password) throw createError.BadRequest();

        const existingUser = await Users.findOne({ where: {email} });
        if(existingUser) throw createError.Conflict(`${email} is alerdy Registred`);

        const user = await Users.create({
            username: username,
            email: email,
            password: password,
        }).then( user => {
            res.status(200).send(user);
        })

    } catch (error) {
        next(error);

    }
})

router.post("/login", async(req, res, next) => {
    res.send("Login Route");
})

router.post("/refresh-token", async(req, res, next) => {
    res.send("Refresh token Route");
})

router.delete("/logout", async(req, res, next) => {
    res.send("Logout Route");
})

module.exports = router;