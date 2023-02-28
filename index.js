const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const moment = require("moment");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
mongoose.set("strictQuery", true);
// Define the schema for the data you want to store
const myDataSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  email: { type: String, default: "" },
  date: String,
  time: Number,
});

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

  // generate the documents for the next 30 days
  // const startDate = moment("2023-02-22").startOf("day").add(9, "hours");
  // const endDate = startDate.clone().add(30, "days");

  // const documents = [];

  // for (let date = startDate; date.isBefore(endDate); date.add(1, "day")) {
  //   for (
  //     let time = date.clone().startOf("day");
  //     time.isBefore(date.clone().startOf("day").add(8, "hours"));
  //     time.add(1, "hour")
  //   ) {
  //     documents.push({
  //       name: "",
  //       email: "",
  //       date: date.toDate(),
  //       time: time.toDate(),
  //       available: true,
  //     });
  //   }
  // }

  // // save the documents to the collection
  // MyNewCollModel.insertMany(documents)
  //   .then(() => {
  //     console.log("Documents inserted successfully!");
  //     mongoose.disconnect();
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     mongoose.disconnect();
  //   });
});

// Define the route handler for the form submission
app.post("/submit-form", (req, res) => {
  console.log("/submit-form: ", req.body);

  const myData = new MyData(req.body);
  myData
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({ message: error.message }));
});

//Define an endpoint to retrieve data from the MongoDB database
app.get("/data", (req, res) => {
  MyData.find()
    .then((data) => {
      res.json(data);
      console.log("/data  ********************", data);
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});

app.get("/data/:date", (req, res) => {
  const date = moment(req.params.date).startOf("day").toDate();
  console.log("/date:date1  ", date);
  MyData.find({ date: date })
    .then((data) => {
      res.json(data);
      console.log("/data/:date2  ********************", data);
    })

    .catch((error) => res.status(500).json({ message: error.message }));
});

// app.get('/users', (req, res) => {
//   axios.get('http://localhost:3000/api/users')
//     .then(response => {
//       res.send(response.data);
//     })
//     .catch(error => {
//       console.log(error);
//       res.status(500).send('Error retrieving users from MongoDB');
//     });
// });

// Start the server
app.listen(3001, () => console.log("Server started on port 3001"));

/////////////////////////////////////////////////////////

// define the schema

// create the model

// generate the documents for the next 30 days
