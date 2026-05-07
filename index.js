// require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

dotenv.config();

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log(`Connection to the DB secured !!!`);
  })
  .catch((e) => {
    console.log(`Error: ${e} !!!`);
  });

const app = express();

app.use(cors());

app.use(express.json());

app.use(userRoutes);

const port = 10000;

app.listen(port, () => {
  console.log(`The server is running on Port: ${port} !!!`);
});
