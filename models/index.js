// models/index.js
const User = require("./user");
const Profile = require("./profile");

//Define associations if needed
User.hasOne(Profile);
Profile.belongsTo(User);

module.exports = {
  User,
  Profile

};