const express = require("express");
const router = express.Router();

const authMiddleware = require("../Middleware/authMiddleware");
const adminMiddleware = require("../Middleware/adminMiddleware");

const {
  assignTask,
  getMyTasks,
  completeTask
} = require("../Controllers/taskController");


// admin assign task
router.post(
  "/assign",
  authMiddleware,
  adminMiddleware,
  assignTask
);


// volunteer sees tasks
router.get(
  "/mytasks",
  authMiddleware,
  getMyTasks
);


// volunteer complete task
router.put(
  "/complete/:id",
  authMiddleware,
  completeTask
);

module.exports = router;