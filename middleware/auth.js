const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = (req, res, next) => {
    // Get the token from the headers
    const token = req.header('x-auth-token');

    // Check if not token
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' }) 
    }

    try {

        const decoded = jwt.verify(token, process.env.jwtSecret);
        // Once it gets verified the payload is put in decoded so we take the user out
        req.user = decoded.user;
        next();

    } catch(err) {
        res.status(401).json({ msg: 'Token not valid' })
    }
}