const jwt = require('jsonwebtoken');
require('dotenv').config();


function jwtGen(user){
    const payload = {
        user: user.uid,
        userRole: user.role
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '2hr'});
}

module.exports = jwtGen;