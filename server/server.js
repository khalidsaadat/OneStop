const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

// const { connectToMongoDB } = require('./utilities/MongoDBConnection')

// API Routes
const manageRouter = require("./router/ManagementRoutes");

// Create an instance of Express
const app = express();
app.use(express.json());
app.use(cors());
const mongoose = require("mongoose");

// connectToMongoDB()

// Start the server
const port = process.env.PORT || 8080;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(port, () => console.log(`Server Port: ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

// Parse incoming JSON requests
app.use(express.json());

// Routes
app.use("/api/management", manageRouter);
