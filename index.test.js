const request = require("supertest");
const app = require("./index");

test("returns holidays for India", async () => {
    const response = await request(app).get("/holidays?country=IN").set("x-api-key", "testkey123");
    expect(response.status).toBe(200);
});

test('returns 404 for invalid country', async () => {
  expect.assertions(1);
  const response = await request(app).get("/holidays?country=ZZ").set("x-api-key", "testkey123");
    expect(response.status).toBe(404);
});

test('returns 401 for unauthorized access', async () => {
  expect.assertions(1);
  const response = await request(app).get("/holidays?country=IN").set("x-api-key", "testkey124");
    expect(response.status).toBe(401);
});

test('returns 400 for invalid month', async () => {
  expect.assertions(1);
  const response = await request(app).get("/holidays?country=IN&month=13").set("x-api-key", "testkey123");
    expect(response.status).toBe(400);
});

test('returns correct holidays for India in January', async () => {
  expect.assertions(2);
  const response = await request(app).get("/holidays?country=IN&month=1").set("x-api-key", "testkey123");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
});