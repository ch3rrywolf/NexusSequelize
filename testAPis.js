/*

#V1#
#
findAllRecords
const User = require('./models/user);
User.findAll()
    .then((users) => {
        console.log(users);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
#
findOneRecord
User.findOne({
where: {
id: 1,
},
})

#V2#
#
findOne
const user = await User.findOne({ where: { lastName: 'test' } });
#
findAll
const users = await User.findAll({ where: { age: { [Sequelize.Op.gt]: 18 } } });
#
findAndCountAll
const { rows, count } = await User.findAndCountAll({ where: { active: true } });
#
findByPk
const user = await User.findByPk(1);
#
findOrCreate
const [user, created] = await User.findOrCreate({
where: { lastName: 'test' },
defaults: {age: 30 }
 });
#
findOne with Associations
const user = await User.findOne({
where: { lastName: 'test },
include: [Post]
});

#
# Getters
#
const User = sequelize.define('User), {
fullName: {
type: DataTypes.STRING,
allowNull: false,
get() {
const firstName = this.getDataValue('firstName);
const lastName = this.getDataValue('lastName);
return `${firstName} ${lastName}`;
}}}
#
# Setters
#
const User = sequelize.define('User', {
email: {
type: DataTypes.STRING,
allowNull: false,
unique: true,
set(value) {
this.setDataValue('email', value.toLowerCase());
},
},
});
#
# Virtual Attribut
#
const User = sequelize.define('User', {
firstName: DataTypes.STRING,
lastName: DataTypes.STRING,
birthdate: DataTypes.DATE,
});
// Define a virtual attribute to calculate age 
User.prototype.getAge = function () {
const birthdate = this.getDataValue('birthdate');
if (!birthdate) return null;

const today = new Date();
const age = today.getFullYear() - birthdate.getFullYear();
return age;
};
*/