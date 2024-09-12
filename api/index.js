// Import Dotenv
require("dotenv").config();

// Import Express
const express = require("express");

// Import CORS
const cors = require("cors");

// Import Axios
const axios = require("axios");

// import our Supabase instance
const supabase = require("../supabaseInstance");

// Import Our route functions
const getAll = require("./routes/getAll");
const getById = require("./routes/getById");
const deleteById = require("./routes/deleteById");
const updateById = require("./routes/updateById");
const addItem = require("./routes/addItem");
const docs = require("./routes/docs");
// create an express application
const app = express();

// define a port
const PORT = 4000;

// Define our Middleware
// Use CORS Middleware
const corsOptions = {
  origin: "https://example.com",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// Use JSON middleware to parse request bodies
app.use(express.json());

// middleware for api key security
app.use((request, response, next) => {
  const apiKey = request.headers["api-key"];

  if (apiKey !== process.env.ADMIN_API_KEY) {
    return response.status(403).json({
      message:
        "ACCESS DENIED! You need an API key for that. See our administrators",
    });
  }
  next();
});

// Define our Routes
// Home Route
app.get("/", (request, response, next) => {
  response.json(docs);
});

// Route to Get all Beverages
app.get("/beverages", getAll);

// Route to get a single beverage by id
app.get("/beverages/:id", getById);

// Route to delete a single beverage by id
app.delete("/beverages/:id", deleteById);

// Route to add a beverage
app.post("/beverages", addItem);

// Route to update a beverage by id
app.put("/beverages/:id", updateById);

// Error Handling
// Generic Error Handling
app.use((error, request, response, next) => {
  console.error(error.stack);
  response.status(500).json({
    error: "Something broke!",
    errorStack: error.stack,
    errorMessage: error.message,
  });
});

// 404 Resource not found Error Handling
app.use((request, response, next) => {
  response.status(404).json({
    error:
      "Resource not found. Are you sure you're looking in the right place?",
  });
});

// make the server listen on our port
app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});

// export our app for testing
module.exports = app;
