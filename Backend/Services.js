const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const sequelize = require("../Backend/config/db");

// Import models so Sequelize knows them
require("../Backend/Models/Admin");
require("../Backend/Models/volunteer");
require("../Backend/Models/Task");

const app = express();

app.use(cors());
app.use(express.json());


// DB connect
sequelize.sync()
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/adminauth", require("./routes/adminAuthRoutes"));

app.use("/api/volunteerauth", require("./routes/volunteerAuthRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.use("/api/tasks", require("./routes/taskRoutes"));


app.listen(process.env.PORT, () => {
  console.log("Server running on port 5000");
});