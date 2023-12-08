const router = require("express").Router();
const pool = require("../../db");

router.get('/products', async (_,res) => {
    try {
        const productsData = await pool.query('SELECT * FROM products');   
        if(productsData.rows.length==0){
            return res.status(200).json({success:true,length:0, message:"No Products in market!"});
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

module.exports = router;