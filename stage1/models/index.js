// models/index.js
const User = require("./user");
const Profile = require("./profile");
const Post = require("./post");
const Student = require("./Student");
const Course = require("./Course");
const File = require("./File");

//Define associations if needed

// One-To-One
User.hasOne(Profile);
Profile.belongsTo(User);

// One-To-Many
User.hasMany(Post);
Post.belongsTo(User);

// Many-To-Many
Student.belongsToMany(Course, { through: "StudentCourse" });
Course.belongsToMany(Student, { through: "StudentCourse" });

module.exports = {
  User,
  Profile,
  Post,
  Student,
  Course,
  File

};