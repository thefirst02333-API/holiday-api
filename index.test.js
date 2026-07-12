const request = require("supertest");
const app = require("./index");

test("returns holidays for India", async () => {
    const response = await request(app).get("/holidays?country=IN").set("x-api-key", "testkey123");
    expect(response.status).toBe(200);
});