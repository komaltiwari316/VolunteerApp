const Task = require("../models/Task");


// ADMIN assigns task
exports.assignTask = async (req, res) => {
  try {

    const {
      volunteerId,
      title,
      description,
      deadline
    } = req.body;

    const task = await Task.create({
      title,
      description,
      deadline,

      VolunteerId: volunteerId,

      AdminId: req.user.id
    });

    res.json({
      message: "Task assigned successfully",
      task
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};



// volunteer sees own tasks
exports.getMyTasks = async (req, res) => {
  try {

    const tasks = await Task.findAll({
      where: {
        VolunteerId: req.user.id
      }
    });

    res.json(tasks);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};



// volunteer marks task complete
exports.completeTask = async (req, res) => {
  try {

    const { id } = req.params;

    await Task.update(
      {
        status: "completed"
      },
      {
        where: { id }
      }
    );

    res.json({
      message: "Task completed"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};