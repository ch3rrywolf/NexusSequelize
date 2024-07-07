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
    fullName: {
        type: DataTypes.VIRTUAL,
        get() {
            const firstName = this.getDataVAlue("firstName");
            const lastName = this.getDataVAlue("lastName");
            return `${firstName} ${lastName}`;
        }
    }
});

(async () => {
    await sequelize.sync();

    const user = await User.create({
        firstName: "wolf",
        lastName: "cherry",
        email: "gh@hj.com"
    });
    console.log(user.email);
})();

module.exports = User;