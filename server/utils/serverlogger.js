const pool = require("../db");

async function serverlogger(string,datetime){
    console.log(string);
    try{await pool.query(`INSERT INTO serverlogs (logs,datetime) VALUES ($1,$2)`, [string,datetime]);return "ok";}
    catch(error){return error.message;};
}

module.exports.serverlogger = serverlogger;