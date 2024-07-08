
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
////////////////////////////////////////////////////////////////////
/*
#
# Validations
#
exmpls:
allowNull: ensures that the attribute is not null.
notEmpty: Ensures that the attribute is not an empty string.
isEmail: Validates that the attribute is a balid email address.
isNumeric: Validates that the attribute is a numeric value.
len: Validates the length of a string attribute.
isIn: Validates that the attribute's value is wwithin a predefind list of values.
isDate: Validates that the attribute is a valid date.


const User = sequelize.define('User', {
username: {
type: DataTypes.STRING,
allowNull: false,
unique: true,
validate: {
isAlphanumeric: true, // Validates that the username consists of only letters and numbers
len: [3, 20], // Validates that the usernaame length is vetween 3 and 20 charachters
},
},
email: {
type: DataTypes.STRING,
allowNull: false,
unique: true,
validate: {
isEmail: true, // Validate that the email is a valid email address
},
},
});
#
# Constraints
#
const User = sequelize.define('User', {
id: {
type: DataTypes.INTEGER,
primaryKey: true, // Specifies id as the primary key
autoIncrement: true, // Automatically generates a unique ID
},
username: {
type: DataTypes.STRING,
allowNull: false,
unique: true, // Enforces uniqueness on the username
},
postId: {
type: DataTypes.INTEGER,
references: {
model: 'Posts', // References the 'Posts' table
key: 'id', // References the 'id' column in the 'Posts' table
},
onUpdate: 'CASCADE', // Cascade updates to related records
onDelete: 'SET NULL', // Set postId to NULL on deletion of related record
},
});
*/
/////////////////////////////////////////////////////////////////////////////
/*
#
# Raw Queries
#
Using sequelize.query()

const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize('database', 'username', 'password', {
dialect: 'mysql',
host: '127.0.0.1',
});

// Define a model for demonstration
const User = sequelize.define('User', {
name: DataTypes.STRING,
});

(async () => {
    // Sunc the model with the database
    await sequelize.sync();
    
    // Insert a new record using a raw SQL query
    const [results, metadata] = await sequelize.query('SELECT * FROM Users', {
    type: Sequelize.QueryTypes.SELECT,
    });
    console.log(results);
    })();

Using Promises with sequelize.query()

sequelize
    .query('SELECT * FROM Users', { type: Sequelize.QueryTypes.SELECT })
    .then((results) => {
        console.log(results);
    })
    .catch((error) => {
        console.error(error);
    });

Executing Other SQL Commands

// Execute an UPDATE query
sequelize.query('UPDATE Users SET name = :newName WHERE id = :userId', {
    replacements: { newName: 'UpdatedName', userId: 1 },
    type: Sequelize.QueryTypes.UPDATE,
});

// Execute an DELETE query
sequelize.query('DELETE FROM Users WHERE id = :userId', {
    replacements: { userId: 2 },
    type: Sequelize.QueryTypes.DELETE,
});
*/

/* 
# Advanced Eager Loading
const Student = sequelize.define('Student), {
name: DataTypes.STRING,
});
const Course = sequelize.define('Course), {
name: DataTypes.STRING,
});
const Teacher = sequelize.define('Teacher), {
name: DataTypes.STRING,
});
// Associations
Student.belongsToMany(Course, { through: 'StudentCource' });
Course.belongsToMany(Student, { through: 'StudentCource' });
Course.belongsTo(Teacher); // Each course is associated with a teacher

const student = await Student.findByPk(1, {
    inculde: [
        {
            model: Course,
            incule: [
                {
                    model: Teacher,
                    attributes: ['name'], // Specify which teacher attributes to include
                },
            ],
        },
    ],
});
console.log(student.toJSON());
*/