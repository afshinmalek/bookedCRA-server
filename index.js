const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(bodyParser.json());

mongoose.set("strictQuery", true);
// Define the schema for the data you want to store
const myDataSchema = new mongoose.Schema({
  name: String,
  email: String,
});

// Create a model for the data using the schema
const MyData = mongoose.model("MyData", myDataSchema);

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
  myData
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({ message: error.message }));
});

// Start the server
app.listen(3001, () => console.log("Server started on port 3001"));
console.log(process.env.MONGO);
