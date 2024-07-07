// models/index.js
const User = require("./user");
const Profile = require("./profile");
const Post = require("./post");

//Define associations if needed

// One-To-One
User.hasOne(Profile);
Profile.belongsTo(User);

// One-To-Many
User.hasMany(Post);
Post.belongsTo(User);

module.exports = {
  User,
  Profile,
  Post

};