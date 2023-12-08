const pool = require("../db");
const { DateTime } = require('luxon');

async function serverlogger(string){
    console.log(string);
    const curtime = DateTime.now().setZone('Asia/Kolkata').toISO();
    try{await pool.query(`INSERT INTO serverlogs (logs,datetime) VALUES ($1,$2)`, [string,curtime]);return "ok";}
    catch(error){return error.message;};
}

module.exports.serverlogger = serverlogger;