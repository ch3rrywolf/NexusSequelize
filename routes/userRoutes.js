const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//Define API routes for the User resource
router.post('/user', userController.createUser);
router.get('/user', userController.getUsers);
router.get('/user/:id', userController.getUserById);

module.exports = router;