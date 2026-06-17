const Volunteer = require("../Models/volunteer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// VOLUNTEER REGISTER
exports.volunteerRegister = async (req, res) => {
  try {

    const {
      name,
      email,
      password,
      phone,
      skills,
      availability,
      reason
    } = req.body;

    const existingVolunteer = await Volunteer.findOne({
      where: { email }
    });

    if (existingVolunteer) {
      return res.status(400).json({
        message: "Volunteer already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const volunteer = await Volunteer.create({
      name,
      email,
      password: hashedPassword,
      phone,
      skills,
      availability,
      reason
    });

    res.status(201).json({
      message: "Volunteer Registered Successfully",
      volunteer
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};



// VOLUNTEER LOGIN
exports.volunteerLogin = async (req, res) => {
  try {

    const { email, password } = req.body;

    const volunteer = await Volunteer.findOne({
      where: { email }
    });

    if (!volunteer) {
      return res.status(400).json({
        message: "Volunteer not found"
      });
    }

    const match = await bcrypt.compare(
      password,
      volunteer.password
    );

    if (!match) {
      return res.status(400).json({
        message: "Wrong password"
      });
    }

    const token = jwt.sign(
      {
        id: volunteer.id,
        role: "volunteer"
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      message: "Volunteer Login Success",
      token
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};