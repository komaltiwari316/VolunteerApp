const express = require("express");
const router = express.Router();

const {
  volunteerRegister,
  volunteerLogin
} = require("../Controllers/VolunteerAuthController");

router.post("/register", volunteerRegister);

router.post("/login", volunteerLogin);

module.exports = router;