const User = require("../models/user");

// Create a new user
async function createUser(req, res) {
    try {
        const { firstName, lastName, email } = req.body;
        const user = await User.create({ firstName, lastName, email });
        res.status(201).json(user);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internet Server Error" });
    }
}