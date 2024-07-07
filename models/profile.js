const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class Profile extends Model {}

Profile.init(
    {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
    },
    {
        sequelize,
        modelName: "Profile"
    }
);

module.exports = Profile;