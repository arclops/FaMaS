const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
    try {
        const jwtToken = req.cookies.jwt;

        if (!jwtToken) {
            req.user = 'NULL';
            req.role = 'guest';
            return next();
        }

        const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

        req.user = payload.user;
        req.role = payload.userRole;
        next();
    } catch (error) {
        console.error(error.message);
        return res.status(403).json("Not Authorized!");
    }
};
