const request = require("supertest");
const app = require("../api/index");

describe("Beverages API", () => {
  // Test GET all beverages
  it("should return all beverages", async () => {
    const response = await request(app).get("/beverages");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  // Test GET a single beverage by id
  it("should return a beverage by ID", async () => {
    const beverageId = 10; // Change this ID based on your testing data
    const response = await request(app).get(`/beverages/${beverageId}`);
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
    const response = await request(app).post("/beverages").send(newBeverage);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("name", "description", "price");
  });

  // Test DELETE a beverage by id
  it("should delete a beverage by ID", async () => {
    const beverageId = 1; // Change this ID for testing purposes
    const response = await request(app).delete(`/beverages/${beverageId}`);
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
      .send(updatedBeverage);

    expect(response.status).toBe(200);
    // expect(response.body).toHaveProperty("name", "Dr. Peppers");
  });
});
