const router = require("express").Router();
const pool = require("../../db");
const { serverlogger } = require('../../utils/serverlogger');
// Get all farmers
router.get("/farmers", async (req, res) => {
    try {
        const farmersData = await pool.query('SELECT * FROM farmers');   
        if(farmersData.rows.length==0){
            return res.status(200).json({success:true,length:0, message:"No Farmers in Database"});
        }
        return res.status(200).json({success:true,length:farmersData.rows.length, data:farmersData.rows});
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

// Ban Farmer
router.put('/farmers/ban/:id', async (req,res) => {
    try{
        const banfarmer = await pool.query(`UPDATE farmers SET status = 'banned' WHERE fid = $1`, [req.params.id]);
        await serverlogger(`Farmer with id ${req.params.id} has been banned`);
        return res.status(200).json({success:true});
    } catch (error) {
        console.log(error.message);
        if (error.message === '') {
            return res.status(500).json({ error: `PostGRESQL server isn't running!`, details: error.message });
        }
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
})

// UnBan Farmer
router.put('/farmers/unban/:id', async (req,res) => {
    try{
        const unbanfarmer = await pool.query(`UPDATE farmers SET status = 'inactive' WHERE fid = $1`, [req.params.id]);
        await serverlogger(`Farmer with id ${req.params.id} has been unbanned`);
        return res.status(200).json({success:true});
    } catch (error) {
        console.log(error.message);
        if (error.message === '') {
            return res.status(500).json({ error: `PostGRESQL server isn't running!`, details: error.message });
        }
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
})

// Get products of a farmer
router.get('/products/:id', async (req,res) => {
    try {
        const productsData = await pool.query('SELECT * FROM products WHERE fid = $1', [req.params.id]);   
        if(productsData.rows.length==0){
            return res.status(200).json({success:true,length:0, message:"No Products Listed on market!"});
        }
        return res.status(200).json({success:true,length:productsData.rows.length, data:productsData.rows});
    } catch (error) {
        console.log(error.message);
        if (error.message === '') {
            return res.status(500).json({ error: `PostGRESQL server isn't running!`, details: error.message });
        }
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// Add product on market
router.post('/products/add', async(req,res) => {
    try {
        const { pname, fid, variants, price, stock, img_url, sale_status, sale_price } = req.body;
        await pool.query("INSERT INTO products (pname, fid, variants, price, stock, image_url, sale_status, sale_price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [pname, fid, variants, price, stock, img_url, sale_status, sale_price]);
        return res.status(200).json({ success: true, message: "Product Added Successfully" });
    } catch (error) {
        console.log(error.message);
        if (error.message === '') {
            return res.status(500).json({ error: `PostGRESQL server isn't running!`, details: error.message });
        }
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
})

module.exports = router;