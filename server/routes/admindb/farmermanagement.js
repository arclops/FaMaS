const router = require("express").Router();
const pool = require("../../db");

// Get all farmers
router.get("/farmers", async (req, res) => {
    try {
        const farmersData = await pool.query('SELECT * FROM farmers');   
        if(farmersData.rows.length==0){
            return res.status(200).json({success:true,length:0, message:"No Farmers in Database"});
        }
        return res.status(404).json({success:true,length:farmersData.rows.length, data:farmersData.rows});
    } catch (error) {
        console.log(error.message);
        if (error.message === '') {
            return res.status(500).json({ error: `PostGRESQL server isn't running!`, details: error.message });
        }
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// Farm count for Farmer Management
router.get('/farmers/farms/:id', async (req,res) => {
    try {
        const farms = await pool.query('SELECT count(*) AS count FROM farm WHERE fid = $1', [req.params.id]);
        return res.status(200).json({data:farms.rows});
    } catch (error) {
        console.log(error.message);
        if (error.message === '') {
            return res.status(500).json({ error: `PostGRESQL server isn't running!`, details: error.message });
        }
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// Total Farmsize for Farmer Management
router.get('/farmers/farmsize/:id', async (req,res) => {
    try {
        const farmsize = await pool.query('SELECT sum(farmsize) AS size FROM farm WHERE fid = $1', [req.params.id]);
        return res.status(200).json({data:farmsize.rows});
    } catch (error) {
        console.log(error.message);
        if (error.message === '') {
            return res.status(500).json({ error: `PostGRESQL server isn't running!`, details: error.message });
        }
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

module.exports = router;