const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/index");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

mongoose
  .connect("mongodb://localhost/itStudio-Assignment")
  .then(() => console.log("Connected to MongoDB Database"))
  .catch((error) => console.log(error));

app.use(routes);

app.get("/", (req, res) => {
  res.send("Home Page 🏠");
});

app.listen(PORT, (req, res) => {
  console.log("Listening on PORT : ", PORT);
});
