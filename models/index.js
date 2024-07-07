// models/index.js
const User = require("./user");
const Post = require("./post");

//Define associations if needed
User.hasMany(Post);
Post.belongsTo(User);

module.exports = {
  User,
  Post

};