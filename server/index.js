const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const fs = require("fs");
const bcrypt = require("bcrypt");

// //Create Hashed
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const plainPassword = 'myPassword123';

// bcrypt.genSalt(saltRounds, function(err, salt) {
//   bcrypt.hash(plainPassword, salt, function(err, hash) {
//     // Store the hash in your database or use it as needed
//     console.log('Hashed Password:', hash);
//   });
// });

// //Check Hashed
// const plainPassword = 'myPassword123';
// const hashedPassword = '$2a$10$...'; // Retrieved from your database

// bcrypt.compare(plainPassword, hashedPassword, function(err, result) {
//   if (result) {
//     // Passwords match
//     console.log('Passwords match');
//   } else {
//     // Passwords do not match
//     console.log('Passwords do not match');
//   }
// });

//middleware
app.use(cors());
app.use(express.json());

//Registration Routes
app.get("/login", (req, res) => {
    try{
        const {email,password,phone} = req.body;
        if (email && password) {
            pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
                if (results.rows.length > 0) {
                    const user = results.rows[0];
                    bcrypt.compare(password, user.password, function(err, result) {
                        if (result) {
                            res.json(user);
                        }
                        else {
                            res.status(401).send('Incorrect password');
                        }
                    })
                } else {
                    res.status(401).send('User not found, check entered email');
                }
            });
        }
        if (phone && password) {
            pool.query('SELECT * FROM users WHERE phone = $1', [phone], (error, results) => {
                if (results.rows.length > 0) {
                    const user = results.rows[0];
                    bcrypt.compare(password, user.password, function(err, result) {
                        if (result) {
                            res.json(user);
                        }
                        else {
                            res.status(401).send('Incorrect password');
                        }
                    })
                } else {
                    res.status(401).send('User not found, check entered phone');
                }
            })
        }
    } catch (error) {
        console.log(error.message);
    }
})

app.post("/register", async (req, res) => {
    try {
        const { email, password, phone } = req.body;
        if (email && password) {
            if(!phone) phone = null;
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    const hashedPassword = hash;
                    pool.query(
                        "INSERT INTO users (email, password,phone ) VALUES ($1, $2) RETURNING *",
                        [email, hashedPassword, phone],
                        (error, results) => {
                            if (error) {
                                throw error;
                            }
                            res.status(201).send(`User added with ID: ${results.rows[0].id}`);
                        }
                    );
                });
              });
        }
        if (phone && password) {
            if(!email) email = null;
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(plainPassword, salt, function(err, hash) {
                    const hashedPassword = hash;
                    pool.query(
                        "INSERT INTO users (phone, password, email) VALUES ($1, $2) RETURNING *",
                        [phone, hashedPassword, email],
                        (error, results) => {
                            if (error) {
                                throw error;
                            }
                            res.status(201).send(`User added with ID: ${results.rows[0].id}`);
                        }
                    );
                });
              });
        }
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(5000, () => {
    console.log("server has started on port 5000");
})