const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const { User, Profile, Post, Student, Course } = require("./models")
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
// app.use("/api", userRoutes);
// (async () => {
//     await sequelize.sync();
//     const user = await User.create({ username: "wolf_test"});
//     const post1 = await Post.create({
//         title: "num 1 Post",
//         content: "This is content of post 1."
//     });
//     const post2 = await Post.create({
//         title: "num 2 Post",
//         content: "This is content of post 2."
//     });
//     const post3 = await Post.create({
//         title: "num 3 Post",
//         content: "This is content of post 3."
//     });

//     // Associate the posts with the user
//     await user.addPosts([post1, post2, post3]);

//     // Retrieve user with associated profile
//     const userWithPosts = await User.findOne({
//         where: { username: "wolf_test" },
//         include: Post // Include the associated Post model
//     });
//     console.log(userWithPosts.toJSON());
// })();

// Add Students and Courses
app.use("/api", userRoutes);
// (async () => {
//     try {
//     await sequelize.sync({ force: true });

//     console.log("Database sync successfully");

//     // Create students
//     // const student1 = await Student.create({ name: "wolf" });
//     // const student2 = await Student.create({ name: "wolf2" });

//     // // Create courses
//     // const course1 = await Course.create({ title: "cour1" });
//     // const course2 = await Course.create({ title: "cour2" });

//     // // Associate the posts with the user
//     // await student1.addCourse(course1);
//     // await student1.addCourse(course2);
//     // await student2.addCourse(course2);
    
//      console.log("Dummy data added successfully");
//      } catch (error) {
//          console.error("Error syncing database:", error);
//      }
// })();

// Soft Delete

// (async () => {
//     try {
//         const studentToDelete = await Student.findByPk(1);
//         if (studentToDelete) {
//             await studentToDelete.destroy({ force: false });
//             console.log("Student marked as deleted.");
//         } else {
//             console.log("Student not found.");
//         }
//     } catch (error) {
//         console.error("Error deleting student:", error);
//     }
// })();

// Test Paranoid

// (async () => {
//     const students = await Student.findAll({ paranoid: false });
//     console.log("students", students);
// })();

// Paranoid Restore methode
//V1
// (async () => {
//     //await Student.restore({ where: 1 });
//     try {
//         const studentToRestore = await Student.findByPk(1, { paranoid: false });
//         console.log(studentToRestore);
//         if (studentToRestore) {
//             await studentToRestore.restore();
//             console.log("Student restored.");
//         } else {
//             console.log("Student not found.");
//         }
//     } catch (error) {
//         console.error("Error restoring student:", error);
//     }
// })();


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server is running on port", port);
});