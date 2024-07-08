const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const { Users } = require('../models');
const bcrypt = require("bcrypt");
const { authSchema, loginSchema } = require("../helpers/authValidation_schema");
const { singAccessToken, singRefreshToken, verifyRefreshToken } = require("../helpers/jwt_authentication");

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

        const user = await Users.create({
            username: result.username,
            email: result.email,
            password: hashpassword
        }); /*.then(user => {
            user.password = undefined;
            res.status(200).send(user);
        });*/
        const accessToken = await singAccessToken(user.id);
        const refreshToken = await singRefreshToken(user.id);

        res.status(200).send({accessToken, refreshToken});

    } catch (error) {
        if(error.isJoi === true ) error.status = 422;
        next(error); 
    }
});

router.post("/login", async (req, res, next) => {
    try {
      const result = await loginSchema.validateAsync(req.body);

      const user = await Users.findOne({where : {email: result.email}});

      if(!user) throw createError.NotFound("User is not registred");

      const isValidPassword = await bcrypt.compare(result.password, user.password);

      if(!isValidPassword) throw createError.Unauthorized("Email/password is not valid");

      const accessToken = await singAccessToken(user.id);
      const refreshToken = await singRefreshToken(user.id);

      res.status(200).send({accessToken, refreshToken});

    } catch (error) {
        if(error.isJoi === true ) throw next(createError.BadRequest("Invalid email/password"));
        next(error)
    }
});

router.post("/refresh-token", async(req, res, next) => {

    const { refreshToken } = req.body;
    if(!refreshToken) throw createError.BadRequest();

    const userId = await verifyRefreshToken(refreshToken);

    const accessToken = await singAccessToken(userId);
    const refToken = await singRefreshToken(userId);
    
    res.status(200).send({accessToken: accessToken, refreshToken: refToken});
})

module.exports = router;