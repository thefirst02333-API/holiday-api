const express = require("express");
const app = express();

const holidays = [
    { name: "Republic Day", month: 1, public: true },
    { name: "Holi", month: 3, public: true },
    { name: "Good Friday", month: 4, public: false },
    { name: "Diwali", month: 10, public: true }
];

app.get("/holidays", (req, res) => {
    const months = req.query.month;

    if (months) {
        const filtered = holidays.filter(holiday => {
            return holiday.month === parseInt(months);
        });
        res.json(filtered);
    } else {
        res.json(holidays);
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});