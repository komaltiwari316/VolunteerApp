const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Admin = require("../Models/Admin");
const Volunteer = require("../Models/volunteer");

const Task = sequelize.define("Task", {

  title: {
    type: DataTypes.STRING,
    allowNull: false
  },

  description: {
    type: DataTypes.TEXT
  },

  deadline: {
    type: DataTypes.STRING
  },

  status: {
    type: DataTypes.STRING,
    defaultValue: "pending"
  }

});


// RELATIONS

Admin.hasMany(Task);
Task.belongsTo(Admin);

Volunteer.hasMany(Task);
Task.belongsTo(Volunteer);


module.exports = Task;