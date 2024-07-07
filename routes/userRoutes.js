const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//Define API routes for the User resource
router.post('/user', userController.createUser);

module.exports = router;