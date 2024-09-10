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

// Define our Routes
// Home Route
app.get("/", (request, response, next) => {
  response.json({ hello: "World!" });
});

// Route to Get all Beverages
app.get("/beverages", getAll);

// Route to get a single beverage by id
app.get("/beverages/:id", getById);

// Route to delete a single beverage by id
app.delete("/beverages/:id", deleteById);

// Route to add a beverage
app.post("/beverages", async (request, response, next) => {
  try {
    // destructure our request.body object so we can store the fields in variables
    const { name, description, price, category, inStock } = request.body;

    // error handling if request doesn't send all fields necessary
    if (!name || !description || !price || !category || !inStock) {
      return response
        .status(400)
        .json({ message: "Missing required fields!!" });
    }

    // create a new object with a new ID
    const newBeverage = {
      // id: BEVERAGES.length + 1,
      name,
      description,
      price,
      category,
      inStock,
    };

    // send our object to our SQL db
    const res = await supabase.post("/beverages", newBeverage);

    response.status(201).json(newBeverage);
  } catch (error) {
    next(error);
  }
});

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
