const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const { User, Profile, Post } = require("./models")
const sequelize = require('./config/database');

const app = express();

// Middleware
app.use(bodyParser.json());

// Use the User routes

// Add user & profile
// app.use("/api", userRoutes);
// (async () => {
//     await sequelize.sync();
//     const user = await User.create({ username: "ch3rry1_test"});
//     const profile = await Profile.create({ firstName: "ch3rry", lastName: "ch3rry" });

//     await user.setProfile(profile);

//     // Retrieve user with associated profile
//     const userWithProfile = await User.findOne({
//         where: { username: "wolf_test" },
//         include: Profile // Include the associated Profile model
//     });
//     console.log(userWithProfile.toJSON());
// })();

// Add posts
app.use("/api", userRoutes);
(async () => {
    await sequelize.sync();
    const user = await User.create({ username: "wolf_test"});
    const post1 = await Post.create({
        title: "num 1 Post",
        content: "This is content of post 1."
    });
    const post2 = await Post.create({
        title: "num 2 Post",
        content: "This is content of post 2."
    });
    const post3 = await Post.create({
        title: "num 3 Post",
        content: "This is content of post 3."
    });

    // Associate the posts with the user
    await user.addPosts([post1, post2, post3]);

    // Retrieve user with associated profile
    const userWithPosts = await User.findOne({
        where: { username: "wolf_test" },
        include: Post // Include the associated Post model
    });
    console.log(userWithPosts.toJSON());
})();

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server is running on port", port);
});