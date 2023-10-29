const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const fs = require("fs");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { DateTime } = require('luxon');

//middleware
app.use(cors());
app.use(express.json());

//Registration Routes

//Login Logic
app.post("/login", async (req, res) => {
    try {
        const { email, password, phone } = req.body;
        let userColumn, userIdentifier;

        if (email && password) {
            userColumn = "email";
            userIdentifier = email;
        } else if (phone && password) {
            userColumn = "phone";
            userIdentifier = phone;
        } else {
            res.status(400).send("Invalid request data");
            return;
        }

        const user = await pool.query(`SELECT * FROM users WHERE ${userColumn} = $1`, [userIdentifier]);

        if (user.rows.length === 0) {
            res.status(401).send("User not found");
            return;
        }

        const dbUser = user.rows[0];

        bcrypt.compare(password, dbUser.password, (err, result) => {
            if (result) {
                const date = DateTime.now().setZone('Asia/Kolkata');
                let lastlog = date.toISO();
                pool.query(`UPDATE users SET lastlogin = $1 WHERE ${userColumn} = $2`, [lastlog, userIdentifier]);
                res.status(200).send("You've logged in!");
            } else {
                res.status(401).send("Incorrect password");
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});


app.post("/register", async (req, res) => {
    try {
        const { email, password, phone, fname, lname, role } = req.body;
        const date = DateTime.now().setZone('Asia/Kolkata');
        const regdate = date.toISO();

        if ((email || phone) && password) {
            if (!email) email = null;
            if (!phone) phone = null;
            if (!role) role = "farmer";

            bcrypt.genSalt(saltRounds, function (_err, salt) {
                bcrypt.hash(password, salt, function (_err, hash) {
                    const hashedPassword = hash;
                    pool.query(
                        "INSERT INTO users (email, password, phone, fname, lname, role, regdate) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
                        [email, hashedPassword, phone, fname, lname, role, regdate],
                        (error, results) => {
                            if (error) {
                                console.log(error.message);
                                return res.status(500).json({ error: 'Failed to add user' });
                            }
                            res.status(201).send(`User added with ID: ${results.rows[0].uid}`);
                        }
                    );
                });
            });
        } else {
            return res.status(400).json({ error: 'Invalid request' });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
});



app.listen(5000, () => {
    console.log("Server has started on port 5000");
})