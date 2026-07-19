const request = require("supertest");
const app = require("./index");

test("returns holidays for India", async () => {
    const response = await request(app).get("/holidays?country=IN").set("x-api-key", "testkey123");
    expect(response.status).toBe(200);
});

test('returns 400 for invalid country', async () => {
  expect.assertions(1);
  const response = await request(app).get("/holidays?country=ZZ").set("x-api-key", "testkey123");
    expect(response.status).toBe(400);
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

test('returns 400 for invalid country', async () => {
  expect.assertions(1);
  try {
    await request(app).get("/holidays?country=IN").set("x-api-key", "testkey123");
  } catch (error) {
    expect(error).toMatch('{"error": "Country not found"}');
  }
});

test('returns 400 for invalid month', async () => {
  expect.assertions(1);
  try {
    await request(app).get("/holidays?country=IN").set("x-api-key", "testkey123");
  } catch (error) {
    expect(error).toMatch('{"error": "Month must be between 1 and 12"}');
  }
});