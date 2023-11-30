const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    host: 'localhost',
    port: 5432,
    database: "FaMaS"
});

module.exports=pool;