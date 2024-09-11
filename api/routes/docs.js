const docs = {
  message: "Welcome to the Beverages API!",
  endpoints: {
    getAllBeverages: {
      method: "GET",
      route: "/beverages",
      description: "Fetches all beverages from the database.",
      exampleResponse: {
        beverages: [
          {
            id: 1,
            name: "Coke",
            description: "Refreshing soda",
            price: 1.5,
            category: "Soft Drinks",
            inStock: true,
          },
          {
            id: 2,
            name: "Lemonade",
            description: "Sweet and sour drink",
            price: 2.0,
            category: "Juices",
            inStock: true,
          },
        ],
      },
    },
    getBeverageById: {
      method: "GET",
      route: "/beverages/:id",
      description: "Fetches a single beverage by ID.",
      exampleResponse: {
        id: 1,
        name: "Coke",
        description: "Refreshing soda",
        price: 1.5,
        category: "Soft Drinks",
        inStock: true,
      },
    },
    addBeverage: {
      method: "POST",
      route: "/beverages",
      description: "Adds a new beverage to the database.",
      requiredFields: ["name", "description", "price", "category", "inStock"],
      exampleRequestBody: {
        name: "Orange Juice",
        description: "Freshly squeezed oranges",
        price: 3.0,
        category: "Juices",
        inStock: true,
      },
      exampleResponse: {
        id: 3,
        name: "Orange Juice",
        description: "Freshly squeezed oranges",
        price: 3.0,
        category: "Juices",
        inStock: true,
      },
    },
    updateBeverageById: {
      method: "PUT",
      route: "/beverages/:id",
      description: "Updates an existing beverage by ID.",
      requiredFields: ["name", "description", "price", "category", "inStock"],
      exampleRequestBody: {
        name: "Pepsi",
        description: "Popular soda",
        price: 1.5,
        category: "Soft Drinks",
        inStock: true,
      },
      exampleResponse: {
        message: "Beverage updated successfully.",
      },
    },
    deleteBeverageById: {
      method: "DELETE",
      route: "/beverages/:id",
      description: "Deletes a beverage by ID.",
      exampleResponse: {
        message: "Beverage deleted successfully.",
      },
    },
  },
};

module.exports = docs;
