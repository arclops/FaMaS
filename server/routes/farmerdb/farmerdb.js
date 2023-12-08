const router = require("express").Router();
const pool = require("../../db");

router.get("/addprod", async (req, res) => {
    try {
        const { pname, fid, variants, price, stock, img_url, sale_status, sale_price } = req.body;
        await pool.query("INSERT INTO products VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [pname, fid, variants, price, stock, img_url, sale_status, sale_price]);
        return res.status(200).json({ success: true, message: "Product Added Successfully" });
    } catch (error) {
        console.log(error.message);
        if (error.message === '') {
            return res.status(500).json({ error: `PostGRESQL server isn't running!`, details: error.message });
        }
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

module.exports = router;