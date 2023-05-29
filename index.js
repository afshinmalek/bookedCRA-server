const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectToDatabase } = require("./database");
const authRoutes = require("./hanlders/auth");
const passport = require("passport");
require("./passport");

const getDataHandler = require("./hanlders/getDataHandler");
const submitFormHandler = require("./hanlders/submitFormHandler");
const cancelHandler = require("./hanlders/cancelHandler");
const submitEmailHandler = require("./hanlders/submitEmailHandler");
const getDateHandler = require("./hanlders/getDateHandler");
dotenv.config();

const app = express();
app.use(
  cors({
    origin: [
      "https://book-it.herokuapp.com",
      "https://book-it-backend.herokuapp.com/",
      "http://localhost:3000",
    ],
  })
);
app.use("/", authRoutes);
app.use(passport.initialize());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectToDatabase();

// Define the route handler for the form submission

app.post("/submit-form", submitFormHandler);
app.get("/data", getDataHandler);
app.get("/data/:date", getDateHandler);
app.get("/cancel", cancelHandler);
app.get("/submit-email/:email/:name/:date/:time", submitEmailHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
