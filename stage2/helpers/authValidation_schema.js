const Joi = require("joi");

const authSchema = Joi.object({
    username: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(2).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(2).required()
});

module.exports = { authSchema, loginSchema }