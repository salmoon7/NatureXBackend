require("dotenv").config();
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connectDB = mongoose.connection;

connectDB.on("error", console.error.bind("MongoDB connection error:"));
connectDB.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = connectDB; // Export the connection
