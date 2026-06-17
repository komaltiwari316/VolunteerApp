const Volunteer = require("../models/Volunteer");


// get all volunteers
exports.getAllVolunteers = async (req, res) => {
  try {

    const volunteers = await Volunteer.findAll();

    res.json(volunteers);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// approve / reject volunteer
exports.updateVolunteerStatus = async (req, res) => {
  try {

    const { id } = req.params;

    const { status } = req.body;

    await Volunteer.update(
      { status },
      {
        where: { id }
      }
    );

    res.json({
      message: "Volunteer status updated"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// delete volunteer
exports.deleteVolunteer = async (req, res) => {
  try {

    const { id } = req.params;

    await Volunteer.destroy({
      where: { id }
    });

    res.json({
      message: "Volunteer deleted"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};