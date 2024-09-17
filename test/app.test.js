// Import Dotenv
require("dotenv").config();

const request = require("supertest");
const  app = require("../api/index");
const PORT = 4001
const server = app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});

describe("Beverages API", () => {
  // Test GET all beverages
  it("should return all beverages", async () => {
    const response = await request(app)
      .get("/beverages")
      .set("api-key", process.env.ADMIN_API_KEY);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  // Test GET a single beverage by id
  it("should return a beverage by ID", async () => {
    const beverageId = 10; // Change this ID based on your testing data
    const response = await request(app)
      .get(`/beverages/${beverageId}`)
      .set("api-key", process.env.ADMIN_API_KEY);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", beverageId);
  });

  // Test POST a new beverage
  it("should add a new beverage", async () => {
    const newBeverage = {
      name: "Dr. Pepper",
      description: "It was made by a doctor",
      price: 3.5,
      category: "Sodas",
      inStock: true,
    };
    const response = await request(app)
      .post("/beverages")
      .set("api-key", process.env.ADMIN_API_KEY)
      .send(newBeverage);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("name", "description", "price");
  });

  // Test DELETE a beverage by id
  it("should delete a beverage by ID", async () => {
    const beverageId = 1; // Change this ID for testing purposes
    const response = await request(app)
      .delete(`/beverages/${beverageId}`)
      .set("api-key", process.env.ADMIN_API_KEY);
    expect(response.status).toBe(204);
  });

  // Test PUT to update a beverage by id
  it("should update a beverage by ID", async () => {
    const beverageId = 1; // Use a valid ID
    const updatedBeverage = {
      name: "Dr. Peppers",
      description: "It was made by a doctor",
      price: 3.5,
      category: "Sodas",
      inStock: true,
    };
    const response = await request(app)
      .put(`/beverages/${beverageId}`)
      .set("api-key", process.env.ADMIN_API_KEY)
      .send(updatedBeverage);

    expect(response.status).toBe(200);
    // expect(response.body).toHaveProperty("name", "Dr. Peppers");
  });

  // Close the server after all tests
  afterAll((done) => {
    server.close(done); // Ensure server is closed after tests
  });
});
