const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
// const fs = require("fs");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { DateTime } = require('luxon');
const NodeRSA = require("node-rsa");
// const { type } = require("os");

// const key = new NodeRSA({ b: 2048 }); 

// const privateKeyPem = key.exportKey('private');
// const publicKeyPem = key.exportKey('public');

//middleware
app.use(cors());
app.use(express.json());

// //RSA public key endpoint

// app.get('/api/public-key', (req, res) => {
//     res.json({ publicKey: publicKeyPem });
//   });

// Phone number string check
function isEmail(value) {
    // A simple check to determine if a string resembles an email
    return /.+@.+\..+/.test(value);
}

function isPhone(value) {
    // A simple check to determine if a string is a phone number
    return /^\d{10,}$/.test(value);
}

async function serverlogger(string,datetime){
    try{await pool.query(`INSERT INTO serverlogs (logs,datetime) VALUES ($1,$2)`, [string,datetime]);return "ok";}
    catch(error){return error.message;};
}
//Registration Routes

//Login Logic
app.post("/api/login", async (req, res) => {
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
                res.status(200).send({uid:user.rows[0].uid, role:user.rows[0].role});
                console.log(`User ${dbUser.fname} ${dbUser.lname} logged in at ${DateTime.now().setZone('Asia/Kolkata').toISO()}`);
                serverlogger(`User ${dbUser.fname} ${dbUser.lname} logged in`,DateTime.now().setZone('Asia/Kolkata').toISO());
            } else {
                res.status(401).send("Incorrect password");
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//Register Logic
app.post("/api/register", async (req, res) => {
    try {
        const { email, password, phone, fname, lname, role } = req.body;
        const date = DateTime.now().setZone('Asia/Kolkata');
        const regdate = date.toISO();
        let newrole;
        let newphone;
        let newemail;
        if(!role) newrole = "farmer";
        if(role) newrole = role;

        if ((email || phone) && password) {
            if (!email) newemail = null;
            else newemail = email;
            if (!phone) newphone = null;
            else newphone = phone;
            const tuser = await pool.query(`SELECT * FROM users WHERE (email = $1 OR phone = $2)`, [email, phone]);
            if (tuser.rows.length > 0) {
                return res.status(409).json({ error: 'User already exists' });
            }
            bcrypt.genSalt(saltRounds, function (_err, salt) {
                bcrypt.hash(password, salt, function (_err, hash) {
                    const hashedPassword = hash;
                    pool.query(
                        "INSERT INTO users (email, password, phone, fname, lname, role, regdate) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
                        [newemail, hashedPassword, newphone, fname, lname, newrole, regdate],
                        (error, results) => {
                            if (error) {
                                console.log(error.message);
                                console.log("Internal Server Error");
                                return res.status(500).json({ error: 'Failed to add user' });
                            }
                            res.status(201).send(`User created with id ${results.rows[0].uid}`);
                            serverlogger(`User ${results.rows[0].fname} ${results.rows[0].lname} created`,DateTime.now().setZone('Asia/Kolkata').toISO());
                        }
                    );
                });
            });
        } else {
            return res.status(400).json({ error: 'Invalid request' });
        }
    } catch (error) {
        console.log(error.message);
        console.log("Internal Server Error");
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.get("/api/userexists/:data", async (req, res) => {
    try {
        console.log(`Password reset request initiated for ${req.params.data} at time ${DateTime.now().setZone('Asia/Kolkata').toISO()}`);
        await serverlogger(`Password reset request initiated for ${req.params.data}`,DateTime.now().setZone('Asia/Kolkata').toISO());
        let data = req.params.data;

        if (isEmail(data)) {
            // It's an email
            // console.log(`Email: ${data}`);
            let user = await pool.query(`SELECT * FROM users WHERE email = $1`, [data]);
            if (user.rows.length > 0) {
                res.status(200).send(user.rows[0]);
            } else {
                res.status(404).send("User not found");
            }
        } else if (isPhone(data)) {
            // It's a phone number
            // console.log(`Phone number: ${data}`);
            let user = await pool.query(`SELECT * FROM users WHERE phone = $1`, [data]);
            if (user.rows.length > 0) {
                res.status(200).send(user.rows[0]);
            } else {
                res.status(404).send("User not found");
            }
        } else {
            res.status(400).send("Invalid data");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


//Password Reset Logic
app.put("/api/reset", async (req, res) => {
    try {
        const { uid, password} = req.body;
        if (uid && password) {
            const user = await pool.query(`SELECT * FROM users WHERE uid = $1`, [uid]);
            if (user.rows.length === 0) {
                res.status(401).send("User not found\nPlease try again");
                return;
            }
            bcrypt.genSalt(saltRounds, function (_err, salt) {
                bcrypt.hash(password, salt, function (_err, hash) {
                    const hashedPassword = hash;
                    pool.query(
                        "UPDATE users SET password = $1 WHERE uid = $2 RETURNING *",
                        [hashedPassword, uid],
                        (error, results) => {
                            if (error) {
                                console.log(error.message);
                                return res.status(500).json({ error: 'Failed to update user' });
                            }
                            res.status(200).send(`Password of User ${results.rows[0].fname} updated!`);
                            serverlogger(`Password of User ${results.rows[0].fname} updated`,DateTime.now().setZone('Asia/Kolkata').toISO());
                        }
                    );
                });
        ;})}} catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    };
});

app.listen(5000, () => {
    console.log("Server has started on port 5000");
    serverlogger("Server started",DateTime.now().setZone('Asia/Kolkata').toISO());
})