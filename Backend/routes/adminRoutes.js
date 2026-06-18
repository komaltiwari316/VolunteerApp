const express = require("express");
const router = express.Router();

const authMiddleware = require("../Middleware/authMiddleware");
const adminMiddleware = require("../Middleware/adminMiddleware");

const {
  getAllVolunteers,
  updateVolunteerStatus,
  deleteVolunteer
} = require("../Controllers/adminController");


// see all volunteers
router.get(
  "/volunteers",
  authMiddleware,
  adminMiddleware,
  getAllVolunteers
);


// approve / reject
router.put(
  "/status/:id",
  authMiddleware,
  adminMiddleware,
  updateVolunteerStatus
);


// delete volunteer
router.delete(
  "/delete/:id",
  authMiddleware,
  adminMiddleware,
  deleteVolunteer
);

module.exports = router;