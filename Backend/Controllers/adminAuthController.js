const Admin = require("../Models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// ADMIN REGISTER
exports.adminRegister = async (req, res) => {
  try {

    const { name, email, password, phone } = req.body;

    const existingAdmin = await Admin.findOne({
      where: { email }
    });

    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      phone
    });

    res.status(201).json({
      message: "Admin Registered Successfully",
      admin
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};



// ADMIN LOGIN
exports.adminLogin = async (req, res) => {
  try {

    const { email, password } = req.body;

    const admin = await Admin.findOne({
      where: { email }
    });

    if (!admin) {
      return res.status(400).json({
        message: "Admin not found"
      });
    }

    const match = await bcrypt.compare(
      password,
      admin.password
    );

    if (!match) {
      return res.status(400).json({
        message: "Wrong password"
      });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        role: "admin"
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      message: "Admin Login Success",
      token
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};