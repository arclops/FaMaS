const router = require("express").Router();
const pool = require("../../db");
const { DateTime } = require('luxon');
const { serverlogger } = require("../../utils/serverlogger");

router.post("/contact", async (req, res) => {
    try {
        const { fname, lname, email, phone, message } = req.body;
        const date = DateTime.now().setZone('Asia/Kolkata');
        const datetime = date.toISO();
        await pool.query("INSERT INTO contactus (fname, lname, email, phone, message, datetime) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [fname, lname, email, phone, message, datetime]);
        await serverlogger("New contact request submitted");
        return res.status(200);
    } catch (error) {
        console.log(error.message);
        if (error.message === '') {
            return res.status(500).json({ error: `PostGRESQL server isn't running!`, details: error.message });
        }
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

module.exports = router;