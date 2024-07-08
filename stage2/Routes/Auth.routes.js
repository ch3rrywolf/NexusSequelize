const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const { Users } = require('../models');
const bcrypt = require("bcrypt");
const { authSchema } = require("../helpers/authValidation_schema");

// Registration API
// POST /register endpoint
router.post("/register", async (req, res, next) => {
    try {
        // const { username, email, password } = req.body;
        // if (!username || !email || !password) throw createError.BadRequest('Username, email, and password are required.');

        const result = await authSchema.validateAsync(req.body);

        if (!Users) throw createError.InternalServerError('Users model is not defined.');

        const existingUser = await Users.findOne({ where: { email: result.email } });
        if (existingUser) throw createError.Conflict(`${result.email} is already registered.`);

        const hashpassword = await bcrypt.hash(result.password, 10);

        const user = await Users.create(result).then(user => {
            user.password = undefined;
            res.status(200).send(user);
        });

    } catch (error) {
        if(error.isJoi === true ) error.status = 422;
        next(error); 
    }
});

module.exports = router;