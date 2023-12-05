const router = require("express").Router();
const pool = require("../../db.js");
const bcrypt = require("bcrypt");
const { DateTime } = require('luxon');
const jwtGenerator = require("../../utils/jwtGen.js");
const authorization = require("../../middleware/authorization.js");
const saltRounds = 10;
const cookieParser = require('cookie-parser');
const { serverlogger } = require('../../utils/serverlogger.js');

router.use(cookieParser());
const registerUser = async (req, res) => {
    try {
        const { email, password, phone, fname, lname, role } = req.body;
        const date = DateTime.now().setZone('Asia/Kolkata');
        const regdate = date.toISO();
        let newrole = role || "farmer";
        let newphone = phone || null;
        let newemail = email || null;

        if ((email || phone) && password) {
            const tuser = await pool.query(`SELECT * FROM users WHERE (email = $1 OR phone = $2)`, [email, phone]);
            if (tuser.rows.length > 0) {
                return res.status(409).json({ error: 'User already exists' });
            }

            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);

            const results = await pool.query(
                "INSERT INTO users (email, password, phone, fname, lname, role, regdate) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
                [newemail, hashedPassword, newphone, fname, lname, newrole, regdate]
            );

            const token = jwtGenerator(results.rows[0]);
            res.cookie('jwt', token, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: 'none'});
            res.status(201).json({ uid: results.rows[0].uid, role: results.rows[0].role});
            serverlogger(`User created with id ${results.rows[0].uid}`, DateTime.now().setZone('Asia/Kolkata').toISO());
        } else {
            return res.status(400).json({ error: 'Invalid request' });
        }
    } catch (error) {
        console.error(error.message);
        if (error.message === '') {
            return res.status(500).json({ error: `PostGRESQL server isn't running!`, details: error.message });
        }
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const loginUser = async (req, res) => {
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
            return res.status(400).send("Invalid request data");
        }

        const user = await pool.query(`SELECT * FROM users WHERE ${userColumn} = $1`, [userIdentifier]);
        if (user.rows.length === 0) {
            return res.status(401).send("User not found");
        }

        const dbUser = user.rows[0];
        const passwordMatch = await bcrypt.compare(password, dbUser.password);

        if (passwordMatch) {
            const date = DateTime.now().setZone('Asia/Kolkata');
            const lastlog = date.toISO();
            await pool.query(`UPDATE users SET lastlogin = $1 WHERE ${userColumn} = $2`, [lastlog, userIdentifier]);

            const token = jwtGenerator(dbUser);
            res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: 'none' });
            res.status(200).json({ uid: dbUser.uid, role: dbUser.role });
            serverlogger(`User ${dbUser.fname} ${dbUser.lname} logged in at ${lastlog}`, DateTime.now().setZone('Asia/Kolkata').toISO());
        } else {
            return res.status(401).send("Incorrect password");
        }
    } catch (error) {
        console.error(error.message);
        if (error.message === '') {
            return res.status(500).json({ error: `PostGRESQL server isn't running!`, details: error.message });
        }
        return res.status(500).send("Internal Server Error");
    }
};

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/getrole", authorization, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(200).json({ role: 'guest' });
        }

        const user = req.user;
        const userRole = req.role;
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3030');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.status(200).json({ uid: user, role: userRole });
    } catch (error) {
        console.error(error.message);
        return res.status(403).json({ error: `Not Authorized: ${error.message}` });
    }
});

module.exports = router;
