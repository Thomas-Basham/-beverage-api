// Import Express
const express = require("express");

// Import CORS
const cors = require("cors");

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

// Define our Routes
app.get("/", (request, response, next) => {
  response.json({ hello: "World!" });
});

// Define our Middleware
// Use CORS Middleware
app.use(cors());

// Use JSON middleware to parse request bodies
app.use(express.json());

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
