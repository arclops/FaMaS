const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "kiakberry21",
    host: "localhost",
    port: 5432,
    database: "FaMaS"
});

module.exports=pool;