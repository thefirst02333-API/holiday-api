require("dotenv").config();
const express = require("express");
const app = express();
const fs = require("fs");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 100,
    message: { error: "Too many requests, please try again later" }
});

const apiKeys = process.env.API_KEYS.split(",");

const validateApiKey = (req, res, next) => {
    const key = req.headers["x-api-key"];
    
    if (!key || !apiKeys.includes(key)) {
        return res.status(401).json({ error: "Invalid or missing API key" });
    }
    
    next();
};

app.use(validateApiKey);

app.use(limiter);
const data = fs.readFileSync("holidays.json", "utf8");
const holidays = JSON.parse(data);

app.get("/holidays", (req, res) => {
    const country = req.query.country;
    const month = req.query.month;

    if (!country) {
        return res.json({ error: "Please provide a country code e.g. ?country=IN" });
    }

    const countryHolidays = holidays[country];

    if (country.length !== 2) {
    return res.status(400).json({ error: "Country code must be 2 letters e.g. IN, US, GB" });
    }

    if (!countryHolidays) {
        return res.status(400).json({ error: "Country not found" });
    }

    if (month && isNaN(parseInt(month))) {
    return res.status(400).json({ error: "Month must be a number between 1 and 12" });
    }

    if (month && (parseInt(month) < 1 || parseInt(month) > 12)) {
    return res.status(400).json({ error: "Month must be between 1 and 12" });
    }

    if (month) {
    const filtered = countryHolidays.filter(holiday => {
        const parts = holiday.date.split("-");
        const holidayMonth = parseInt(parts[1]);
        return holidayMonth === parseInt(month);
    });
    return res.json(filtered);
}

    res.json(countryHolidays);
});

app.listen(3000, () => {
    console.log("Holiday API is running on port 3000");
});