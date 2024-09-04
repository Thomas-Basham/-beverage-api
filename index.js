// Import Dotenv
require("dotenv").config();

// Import Express
const express = require("express");

// Import CORS
const cors = require("cors");

// Import Axios
const axios = require("axios");

// import our Supabase instance
const supabase = require("./supabaseInstance");

// create an express application
const app = express();

// define a port
const PORT = 4000;

const BEVERAGES = [
  {
    id: 1,
    name: "Orange Juice",
    description: "Freshly squeezed orange juice.",
    price: 3.99,
    category: "Juices",
    inStock: true,
  },
  {
    id: 2,
    name: "Espresso",
    description: "Strong and rich espresso shot.",
    price: 2.5,
    category: "Coffee",
    inStock: true,
  },
  {
    id: 3,
    name: "Green Tea",
    description: "Soothing and refreshing green tea.",
    price: 1.99,
    category: "Tea",
    inStock: false,
  },
  {
    id: 4,
    name: "Lemonade",
    description: "Chilled lemonade with a hint of mint.",
    price: 2.75,
    category: "Juices",
    inStock: true,
  },
  {
    id: 5,
    name: "Cappuccino",
    description: "Creamy cappuccino with frothy milk.",
    price: 3.5,
    category: "Coffee",
    inStock: true,
  },
  {
    id: 6,
    name: "Herbal Tea",
    description: "A calming blend of herbal teas.",
    price: 2.25,
    category: "Tea",
    inStock: true,
  },
  {
    id: 7,
    name: "Smoothie",
    description: "A thick and creamy fruit smoothie.",
    price: 4.99,
    category: "Juices",
    inStock: true,
  },
  {
    id: 8,
    name: "Iced Coffee",
    description: "Cold brewed iced coffee with a hint of vanilla.",
    price: 2.99,
    category: "Coffee",
    inStock: false,
  },
  {
    id: 9,
    name: "Black Tea",
    description: "Bold and robust black tea.",
    price: 1.75,
    category: "Tea",
    inStock: true,
  },
  {
    id: 10,
    name: "Apple Juice",
    description: "Refreshing apple juice made from fresh apples.",
    price: 3.5,
    category: "Juices",
    inStock: true,
  },
];

// Define our Middleware
// Use CORS Middleware
app.use(cors());

// Use JSON middleware to parse request bodies
app.use(express.json());

// Define our Routes
// Home Route
app.get("/", (request, response, next) => {
  response.json({ hello: "World!" });
});

// Route to Get all Beverages
app.get("/beverages", async (request, response, next) => {
  try {
    // response.json(BEVERAGES);
    const res = await supabase.get("/beverages");
    response.json(res.data);
  } catch (error) {
    next(error);
  }
});

// Route to get a single beverage by id
app.get("/beverages/:id", async (request, response, next) => {
  try {
    // const foundBeverage = BEVERAGES.find((value) => {
    //   return value.id === parseInt(request.params.id);
    // })

    const res = await supabase.get(`/beverages?id=eq.${request.params.id}`);

    //Error Handling
    if (!res.data.length) {
      return response.status(404).json({ message: "Beverage does not exist!" });
    }

    // send our beverage object
    response.json(res.data[0]);
  } catch (error) {
    next(error);
  }
});

// Route to add a beverage
app.post("/beverages", (request, response, next) => {
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
    const res = supabase.post("/beverages", newBeverage);

    response.status(201).json(newBeverage);
  } catch (error) {
    next(error);
  }
});

// Route to update a beverage by id
app.put("/beverages/:id", (request, response, next) => {
  try {
    const foundBeverage = BEVERAGES.find((value) => {
      return value.id === parseInt(request.params.id);
    });

    // destructure our request.body object so we can store the fields in variables
    const { name, description, price, category, inStock } = request.body;

    // error handling if request doesn't send all fields necessary
    if (!name || !description || !price || !category || !inStock) {
      return response
        .status(400)
        .json({ message: "Missing required fields!!" });
    }

    // set our found object's values to the ones sent in the request body
    foundBeverage.name = name;
    foundBeverage.description = description;
    foundBeverage.price = price;
    foundBeverage.category = category;
    foundBeverage.inStock = inStock;

    // send our updated item back in a response
    response.json(foundBeverage);

    console.log(BEVERAGES);
  } catch (error) {
    next(error);
  }
});

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
