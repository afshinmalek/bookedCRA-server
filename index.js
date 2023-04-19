const express = require("express");
const mongoose = require("mongoose");
const moment = require("moment");
const dotenv = require("dotenv");
const cors = require("cors");
const nodemailer = require("nodemailer");

dotenv.config();

const sgMail = require("@sendgrid/mail");
const sgKey = process.env.SENDGRID;
sgMail.setApiKey(sgKey);

const app = express();
app.use(cors());

app.use(express.json());
mongoose.set("strictQuery", true);
// Define the schema for the data you want to store
const myDataSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  email: { type: String, default: "" },
  date: { type: String, required: true },
  time: { type: Number, required: [true, "Please provide the time"] },
});

myDataSchema.index({ date: 1, time: 1 }, { unique: true });

const myNewCollSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  email: { type: String, default: "" },
  date: Date,
  time: Date,
  available: { type: Boolean, default: true },
});

// Create a model for the data using the schema
const MyData = mongoose.model("MyData", myDataSchema);
const MyNewCollModel = mongoose.model("MyNewCollModel", myNewCollSchema);

// Connect to your MongoDB database
let mongoURI = `mongodb+srv://afshinmalek2:${process.env.MONGO}@appointmentcluster.pro04ls.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Once the connection is established, run this code
db.once("open", async () => {
  // Get a list of the collections in the database
  const collections = await db.db.listCollections().toArray();

  // Log the names of the collections
  console.log(
    "Collections:",
    collections.map((c) => c.name)
  );

  const adminDb = db.db.admin();

  const result = await adminDb.listDatabases({ nameOnly: true });

  const clusters = result.databases
    .filter(
      (db) => db.name !== "admin" && db.name !== "config" && db.name !== "local"
    )
    .map((db) => db.name);

  console.log("Clusters:", clusters);
});

// Define the route handler for the form submission
app.post("/submit-form", (req, res) => {
  const myData = new MyData(req.body);
  if (!req.body.time) {
    return res.json({ message: "Please provide the time!" });
  }
  if (!req.body.name) {
    return res.json({ message: "Please provide a name!" });
  }
  if (!req.body.email) {
    return res.json({ message: "Please provide an email!" });
  }

  myData.save((err, data) => {
    if (err && err.code === 11000) {
      console.log("errorrrrrrr");
      return res.json({
        message: "Combination of date and time already exists",
      });
    }

    // send email
    const msg = {
      to: req.body.email,
      from: "your.confirmation.email.22@gmail.com",
      subject: "Appointment Confirmation",
      text: "Your appointment has been confirmed",
      html: "<strong>Your appointment has been confirmed</strong>",
    };

    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.log("gmail error");
        console.error(error);
      });

    //////////////////
    async function main() {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "your.confirmation.email.22@gmail.com", // generated ethereal user
          pass: process.env.GMAIL, // generated ethereal password
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <your.confirmation.email.22@gamil.com>', // sender address
        to: req.body.email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });

      console.log("Message sent from NNNNNNNN: %s", info.messageId);
    }

    main().catch(console.error);

    //////////////////
    return res.json({ message: "Data added successfully" });
  });
});

//Define an endpoint to retrieve data from the MongoDB database
app.get("/data", (req, res) => {
  MyData.find()
    .then((data) => {
      res.json(data);
      console.log("/data  ********************");
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});

app.get("/data/:date", (req, res) => {
  const timestamp = parseInt(req.params.date);
  //const date = req.params.date;

  const date = new Date(timestamp);
  const dateStr = date.toDateString();
  console.log("/date:date1  ", date);

  console.log("/date:date1  ", dateStr);
  MyData.find({ date: dateStr })
    .then((data) => {
      console.log("date:date1.5 ****************", JSON.stringify(data));
      res.json(data);
      console.log("/data/:date2  ********************", data);
    })

    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: error.message });
    });
});

// Start the server
app.listen(3001, () => console.log("Server started on port 3001"));
