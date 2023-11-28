const router = require("express").Router();
const pool = require("../../db");

router.get("/:uid", async function (req, res) {
    try {
        const user = await pool.query("SELECT fname,lname,email,phone,role FROM users WHERE uid = $1", [req.params.uid]);
        return res.status(200).json({success:true, data:user.rows[0]});
    } catch (error) {
        console.log(error.message);
        if (error.message === '') {
            return res.status(500).json({ error: `PostGRESQL server isn't running!`, details: error.message });
        }
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

module.exports = router;