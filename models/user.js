// models/user.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        set(value) {
            this.setDataValue("email", value.toLowerCase());
        }
        // validate: {
        //     isEmail: true,
        // }
    },
    birthdate: {
        type: DataTypes.DATE
    },
    fullName: {
        type: DataTypes.VIRTUAL,
        get() {
            const firstName = this.getDataVAlue("firstName");
            const lastName = this.getDataVAlue("lastName");
            return `${firstName} ${lastName}`;
        }
    }
});

User.prototype.getAge = function () {
    const birthdate = this.getDataValue("birthdate");
    if (!birthdate) return null;

    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear();
    return age;
};

(async () => {
    await sequelize.sync();

    const user = await User.create({
        firstName: "wolf",
        lastName: "cherry",
        birthdate: "1996-04-17",
        email: "gh@hj.com"
    });
    console.log(user.getAge());
})();

module.exports = User;