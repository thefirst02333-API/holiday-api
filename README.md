# Public Holidays API

A REST API serving public holiday data for 190+ countries, built with Node.js and Express, and published as a monetized product on [RapidAPI](https://rapidapi.com/).

**Live on RapidAPI:** `https://rapidapi.com/thefirst02333API/api/public-holidays-api-global-coverage`
**Base URL:** `https://holiday-api-production-5f73.up.railway.app`

---

## Overview

This API returns public holiday data — name, local name, date, and observance type — filterable by country code and optional month. Holiday data for 40+ countries was independently researched and cross-verified against official government sources before broader coverage (190+ countries) was added via a supplementary dataset.

Built as the first in a series of small, focused API products, with an emphasis on production-readiness: authentication, rate limiting, automated testing, and real deployment (not just a local prototype).

## Features

- Country + month filtering (`?country=IN&month=1`)
- Custom API key authentication middleware
- Rate limiting to prevent abuse
- Input validation with proper HTTP status codes (400, 401, 404)
- Automated test suite (Jest + Supertest)
- Deployed on Railway with environment-based configuration

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Testing:** Jest, Supertest
- **Deployment:** Railway
- **API Marketplace:** RapidAPI

## API Usage

### Get all holidays for a country

```
GET /holidays?country=US
```

### Filter by month

```
GET /holidays?country=US&month=7
```

### Authentication

Every request to `/holidays` requires an API key, passed as a header:

```
x-api-key: YOUR_API_KEY
```

### Example Response

**Request:** `GET /holidays?country=US&month=7`

```json
[
  {
    "date": "2026-07-04",
    "name": "Independence Day",
    "localName": "Independence Day",
    "public": true,
    "types": ["Public"]
  }
]
```

### Error Responses

| Status | Meaning                              |
| ------ | ------------------------------------ |
| 400    | Invalid month or country code format |
| 404    | Country not found                    |
| 401    | Missing or invalid API key           |

## Running Locally

```bash
git clone https://github.com/thefirst02333-API/holiday-api.git
cd holiday-api
npm install
```

Create a `.env` file in the root directory:

```
API_KEYS=your_key_here
PORT=3000
```

Start the development server:

```bash
npm run dev
```

The API will be running at `http://localhost:3000`.

## Running Tests

```bash
npm test
```

Test suite covers:

- Successful requests (valid country/month)
- Invalid country code (404)
- Invalid or missing API key (401)
- Invalid month value (400)
- Correctness of filtered results

## Project Structure

```
holiday-api/
├── index.js          # Express app, routes, middleware
├── index.test.js      # Jest + Supertest test suite
├── holidays.json       # Holiday data (190+ countries)
├── package.json
└── .env               # Environment variables (not committed)
```

## Notes

This was built as a learning project and a real shipped product simultaneously — every part of the codebase, from the Express middleware to the deployment configuration, was written and understood line-by-line rather than generated wholesale. Production issues (port-binding configuration, DNS resolution on Railway) were diagnosed and resolved as part of the build process.

## License

ISC
