const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();


const app = express();

connectDB();
app.use(cors());
app.use(express.json());


app.use("/api/users",require("./routes/userRoutes"));
app.use("/api/user",require("./routes/projectRoutes"));
app.use("/api/tasks",require("./routes/taskRoutes"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Serveur lancé sur le port ${PORT}`));

