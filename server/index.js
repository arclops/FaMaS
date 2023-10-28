const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const fs = require("fs");

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

app.post("/register", async (req, res) => {
    
})