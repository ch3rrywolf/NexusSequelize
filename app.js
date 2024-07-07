// const { User, Post } = require("./models");
// const sequelize = require("./config/database");

// // Synchronize the model with the database (create the table if it doesn't exist)
//  sequelize
//  .sync()
//  .then(() => {
//      console.log("All tables synchronized.");
//  })
//  .catch(err => {
//      console.error("Error synchronizing tables:", err);
//  });

const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const { User, Profile } = require("./models")
const sequelize = require('./config/database');

const app = express();

// Middleware
app.use(bodyParser.json());

// Use the User routes
app.use("/api", userRoutes);
(async () => {
    await sequelize.sync();
    const user = await User.create({ username: "ch3rry1_test"});
    const profile = await Profile.create({ firstName: "ch3rry", lastName: "ch3rry" });

    await user.setProfile(profile);

    // Retrieve user with associated profile
    const userWithProfile = await User.findOne({
        where: { username: "wolf_test" },
        include: Profile // Include the associated Profile model
    });
    console.log(userWithProfile.toJSON());
})();

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server is running on port", port);
});