require("dotenv").config({ path: "./config.env" });
const express = require("express");
const app = express();
require("../db/connection");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("../routes/Auth");

const port = process.env.port || 8000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Routes
app.use("/api", authRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port} 🔥`);
});
