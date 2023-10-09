const express = require("express");
const connectDB = require("./mongoDb");
const { default: routes } = require("./routes");
const bodyParser = require("body-parser");
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "exp://172.20.10.3:8081",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
const port = 8000;
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));
app.use(bodyParser.json({ limit: "100mb" }));
routes(app);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  connectDB;
});
