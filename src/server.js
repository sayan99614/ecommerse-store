require("dotenv").config({ path: "./config.env" });
const express = require("express");
const app = express();
require("../db/connection");

const port = process.env.port || 8000;

app.get("/", (req, res) => res.send("app is runneng properly 👍 "));

app.listen(port, () => {
  console.log(`Server running on port ${port} 🔥`);
});
