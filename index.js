const express = require("express");
const app = express();
const fs = require("fs");
const data = fs.readFileSync("holidays.json", "utf8");
const holidays = JSON.parse(data);

app.get("/holidays", (req, res) => {
    const country = req.query.country;
    const month = req.query.month;

    if (!country) {
        return res.json({ error: "Please provide a country code e.g. ?country=IN" });
    }

    const countryHolidays = holidays[country];

    if (!countryHolidays) {
        return res.json({ error: "Country not found" });
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