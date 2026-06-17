const { DataTypes } = require("sequelize");
const sequelize = require("../config/db")

const Volunteer = sequelize.define("Volunteer", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  email: {
    type: DataTypes.STRING,
    unique: true
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false
  },

  phone: {
    type: DataTypes.STRING
  },

  skills: {
    type: DataTypes.STRING
  },

  availability: {
    type: DataTypes.STRING
  },

  reason: {
    type: DataTypes.TEXT
  },

  role: {
    type: DataTypes.STRING,
    defaultValue: "volunteer"
  },

  status: {
    type: DataTypes.STRING,
    defaultValue: "pending"
  }
});

module.exports = Volunteer;