const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getAllVolunteers,
  updateVolunteerStatus,
  deleteVolunteer
} = require("../controllers/adminController");


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